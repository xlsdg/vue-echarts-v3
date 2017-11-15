import Debounce from 'lodash.debounce';
// import Resize from 'element-resize-event';
import Resize from 'element-resize-detector';

const ECHARTS_EVENTS = [
  'click',
  'dblclick',
  'mouseover',
  'mouseout',
  'mousedown',
  'mouseup',
  'globalout',
  'legendselectchanged',
  'legendselected',
  'legendunselected',
  'datazoom',
  'datarangeselected',
  'timelinechanged',
  'timelineplaychanged',
  'restore',
  'dataviewchanged',
  'magictypechanged',
  'geoselectchanged',
  'geoselected',
  'geounselected',
  'pieselectchanged',
  'pieselected',
  'pieunselected',
  'mapselectchanged',
  'mapselected',
  'mapunselected',
  'axisareaselected',
  'brush',
  'brushselected'
];

function wrapECharts(ECharts) {
  return {
    name: 'IEcharts',
    props: {
      styles: {
        type: Object,
        required: false,
        default: () => ({
          width: '100%',
          height: '100%'
        })
      },
      theme: {
        type: String,
        required: false
      },
      group: {
        type: String,
        required: false
      },
      option: {
        type: Object,
        required: true
      },
      initOpts: {
        type: Object,
        required: false
      },
      notMerge: {
        type: Boolean,
        required: false,
        default: false
      },
      lazyUpdate: {
        type: Boolean,
        required: false,
        default: false
      },
      loading: {
        type: Boolean,
        required: false,
        default: false
      },
      loadingOpts: {
        type: Object,
        required: false
      },
      resizable: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        fnResize: null,
        insResize: null,
        instance: null,
        watches: {
          loading: null,
          option: null,
          group: null
        }
      };
    },
    computed: {
      width: {
        cache: false,
        get: function() {
          return this.instance.getWidth();
        }
      },
      height: {
        cache: false,
        get: function() {
          return this.instance.getHeight();
        }
      },
      isDisposed: {
        cache: false,
        get: function() {
          return this.instance.isDisposed();
        }
      }
    },
    watch: {
      loading: {
        handler: function(loading) {
          const that = this;
          that.ifLoading(loading);
        },
        deep: false
      },
      option: {
        handler: function(option) {
          const that = this;
          that.instance.setOption(option, that.notMerge, that.lazyUpdate);
        },
        deep: true
      },
      group: {
        handler: function(group) {
          const that = this;
          that.instance.group = group;
        },
        deep: false
      }
    },
    methods: {
      initResize: function(dom) {
        const that = this;
        if (that.resizable && typeof Resize === 'function') {
          // Resize(dom, that.resize);
          that.insResize = that.insResize || Resize({
            strategy: 'scroll' // <- For ultra performance.
          });
          that.fnResize = that.fnResize || Debounce(that.resize, 250, {
            'leading': true,
            'trailing': true
          });
          that.insResize.listenTo(dom, function(element) {
            // that.resize();
            that.fnResize();
          });
        }
      },
      init: function() {
        const that = this;
        if (!that.instance) {
          const dom = that.$el;
          let instance = ECharts.getInstanceByDom(dom);
          if (!instance) {
            instance = ECharts.init(dom, that.theme, that.initOpts);
          }
          instance.group = that.group;
          that.instance = instance;
          that.$emit('ready', instance, ECharts);
          that.$nextTick(function() {
            that.ifLoading(that.loading);
            that.update();
            // that.watch();
            that.bind();
            that.initResize(dom);
          });
        }
      },
      bind: function() {
        const that = this;
        const _on = function _on(name) {
          that.instance.on(name, function(event) {
            that.$emit(name, event, that.instance, ECharts);
          });
        };

        if (that._events) {
          for (let e in that._events) {
            if (Object.prototype.hasOwnProperty.call(that._events, e)) {
              const name = e.toLowerCase();
              if (ECHARTS_EVENTS.indexOf(name) > -1) {
                _on(name);
              }
            }
          }
        } else {
          for (let i = 0, len = ECHARTS_EVENTS.length; i < len; i++) {
            _on(ECHARTS_EVENTS[i]);
          }
        }
      },
      unbind: function() {
        const that = this;
        if (that._events) {
          for (let e in that._events) {
            if (Object.prototype.hasOwnProperty.call(that._events, e)) {
              const name = e.toLowerCase();
              if (ECHARTS_EVENTS.indexOf(name) > -1) {
                that.instance.off(name);
              }
            }
          }
        } else {
          for (let i = 0, len = ECHARTS_EVENTS.length; i < len; i++) {
            that.instance.off(ECHARTS_EVENTS[i]);
          }
        }
      },
      ifLoading: function(loading) {
        const that = this;
        if (loading) {
          that.showLoading();
        } else {
          that.hideLoading();
        }
      },
      watch: function() {
        const that = this;
        that.watches.loading = that.$watch('loading', function(loading) {
          that.ifLoading(loading);
        });
        that.watches.option = that.$watch('option', function(option) {
          that.instance.setOption(option, that.notMerge, that.lazyUpdate);
        }, {
          deep: true
        });
        that.watches.group = that.$watch('group', function(group) {
          that.instance.group = group;
        });
      },
      unwatch: function() {
        const that = this;
        if (that.watches.loading) {
          that.watches.loading();
          that.watches.loading = null;
        }
        if (that.watches.option) {
          that.watches.option();
          that.watches.option = null;
        }
        if (that.watches.group) {
          that.watches.group();
          that.watches.group = null;
        }
      },
      resize: function(opts) {
        const that = this;
        if (that.instance) {
          that.instance.resize(opts);
        }
      },
      update: function() {
        const that = this;
        if (that.instance) {
          that.instance.setOption(that.option, that.notMerge, that.lazyUpdate);
          that.resize();
        }
      },
      mergeOption: function(opts) {
        const that = this;
        if (that.instance) {
          that.instance.setOption(opts, false, that.lazyUpdate);
          that.resize();
        }
      },
      dispatchAction: function(payload) {
        const that = this;
        if (that.instance) {
          that.instance.dispatchAction(payload);
        }
      },
      convertToPixel: function(finder, value) {
        const that = this;
        return that.instance.convertToPixel(finder, value);
      },
      convertFromPixel: function(finder, value) {
        const that = this;
        return that.instance.convertFromPixel(finder, value);
      },
      containPixel: function(finder, value) {
        const that = this;
        return that.instance.containPixel(finder, value);
      },
      showLoading: function() {
        const that = this;
        if (that.instance) {
          that.instance.showLoading('default', that.loadingOpts);
        }
      },
      hideLoading: function() {
        const that = this;
        if (that.instance) {
          that.instance.hideLoading();
        }
      },
      getDataURL: function(opts) {
        const that = this;
        return that.instance.getDataURL(opts);
      },
      getConnectedDataURL: function(opts) {
        const that = this;
        return that.instance.getConnectedDataURL(opts);
      },
      clear: function() {
        const that = this;
        if (that.instance) {
          that.instance.clear();
        }
      },
      uninitResize: function() {
        const that = this;
        if (that.insResize && that.insResize.uninstall) {
          that.insResize.uninstall(that.$el);
          that.insResize = null;
        }
        if (that.fnResize && that.fnResize.cancel) {
          that.fnResize.cancel();
          that.fnResize = null;
        }
      },
      uninit: function() {
        const that = this;
        if (that.instance) {
          that.unbind();
          // that.unwatch();
          that.uninitResize();
          that.instance.dispose();
          that.instance = null;
        }
      }
    },
    // beforeCreate() {
      // const that = this;
      // console.log('beforeCreate');
    // },
    // created() {
      // const that = this;
      // console.log('created');
    // },
    // beforeMount() {
      // const that = this;
      // console.log('beforeMount');
    // },
    mounted() {
      const that = this;
      // console.log('mounted');
      that.init();
    },
    // beforeUpdate() {
      // const that = this;
      // console.log('beforeUpdate');
    // },
    // updated() {
      // const that = this;
      // console.log('updated');
    // },
    // activated() {
      // const that = this;
      // console.log('activated');
    // },
    // deactivated() {
      // const that = this;
      // console.log('deactivated');
    // },
    beforeDestroy() {
      const that = this;
      // console.log('beforeDestroy');
      that.uninit();
    },
    // destroyed() {
      // const that = this;
      // console.log('destroyed');
    // },
    connect(group) {
      return ECharts.connect(group);
    },
    disConnect(group) {
      return ECharts.disConnect(group);
    },
    dispose(target) {
      return ECharts.dispose(target);
    },
    getInstanceByDom(target) {
      return ECharts.getInstanceByDom(target);
    },
    registerMap(mapName, geoJson, specialAreas) {
      return ECharts.registerMap(mapName, geoJson, specialAreas);
    },
    getMap(mapName) {
      return ECharts.getMap(mapName);
    },
    registerTheme(themeName, theme) {
      return ECharts.registerTheme(themeName, theme);
    },
    render(h) {
      const that = this;
      return h('div', {
        style: that.styles
      });
    }
  };
}

export default wrapECharts;
