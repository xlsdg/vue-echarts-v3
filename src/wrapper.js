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

exports = module.exports = function wrapECharts(ECharts, ResizeEvent) {
  return {
    name: 'IEcharts',
    props: {
      className: {
        type: String,
        required: false,
        default: 'vue-echarts'
      },
      style: {
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
        getter() {
          return this.instance.getWidth();
        }
      },
      height: {
        cache: false,
        getter() {
          return this.instance.getHeight();
        }
      },
      isDisposed: {
        cache: false,
        getter() {
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
      init() {
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
          });
          if (that.resizable) {
            ResizeEvent(dom, that._resize);
          }
        }
      },
      bind() {
        const that = this;
        if (that._events) {
          for (let e in that._events) {
            if (Object.prototype.hasOwnProperty.call(that._events, e)) {
              let name = e.toLowerCase();
              if (ECHARTS_EVENTS.indexOf(name) > -1) {
                that.instance.on(name, function(event) {
                  that.$emit(name, event, that.instance, ECharts);
                });
              }
            }
          }
        } else {
          for (let i = 0, len = ECHARTS_EVENTS.length; i < len; i++) {
            that.instance.on(ECHARTS_EVENTS[i], function(event) {
              that.$emit(ECHARTS_EVENTS[i], event, that.instance, ECharts);
            });
          }
        }
      },
      unbind() {
        const that = this;
        if (that._events) {
          for (let e in that._events) {
            if (Object.prototype.hasOwnProperty.call(that._events, e)) {
              let name = e.toLowerCase();
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
      ifLoading(loading) {
        const that = this;
        if (loading) {
          that.showLoading();
        } else {
          that.hideLoading();
        }
      },
      watch() {
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
      unwatch() {
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
      resize(opts) {
        const that = this;
        if (that.instance) {
          that.instance.resize(opts);
        }
      },
      update() {
        const that = this;
        if (that.instance) {
          that.instance.setOption(that.option, that.notMerge, that.lazyUpdate);
          that.resize();
        }
      },
      mergeOption(opts) {
        const that = this;
        if (that.instance) {
          that.instance.setOption(opts, false, that.lazyUpdate);
          that.resize();
        }
      },
      dispatchAction(payload) {
        const that = this;
        if (that.instance) {
          that.instance.dispatchAction(payload);
        }
      },
      convertToPixel(finder, value) {
        const that = this;
        return that.instance.convertToPixel(finder, value);
      },
      convertFromPixel(finder, value) {
        const that = this;
        return that.instance.convertFromPixel(finder, value);
      },
      containPixel(finder, value) {
        const that = this;
        return that.instance.containPixel(finder, value);
      },
      showLoading() {
        const that = this;
        if (that.instance) {
          that.instance.showLoading('default', that.loadingOpts);
        }
      },
      hideLoading() {
        const that = this;
        if (that.instance) {
          that.instance.hideLoading();
        }
      },
      getDataURL(opts) {
        const that = this;
        return that.instance.getDataURL(opts);
      },
      getConnectedDataURL(opts) {
        const that = this;
        return that.instance.getConnectedDataURL(opts);
      },
      clear() {
        const that = this;
        if (that.instance) {
          that.instance.clear();
        }
      },
      uninit() {
        const that = this;
        if (that.instance) {
          that.unbind();
          // that.unwatch();
          that.instance.dispose();
          that.instance = null;
        }
      },
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
      }
    },
    beforeCreate() {
      // const that = this;
      // console.log('beforeCreate');
    },
    created() {
      // const that = this;
      // console.log('created');
    },
    beforeMount() {
      // const that = this;
      // console.log('beforeMount');
    },
    mounted() {
      const that = this;
      // console.log('mounted');
      that.init();
    },
    beforeUpdate() {
      // const that = this;
      // console.log('beforeUpdate');
    },
    updated() {
      // const that = this;
      // console.log('updated');
    },
    activated() {
      // const that = this;
      // console.log('activated');
    },
    deactivated() {
      // const that = this;
      // console.log('deactivated');
    },
    beforeDestroy() {
      const that = this;
      // console.log('beforeDestroy');
      that.uninit();
    },
    destroyed() {
      // const that = this;
      // console.log('destroyed');
    }
  };
};
