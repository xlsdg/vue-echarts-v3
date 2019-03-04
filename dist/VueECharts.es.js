import _throttle from 'lodash.throttle';
import Resize from 'element-resize-detector';
import * as ECharts from 'echarts';

var ECHARTS_EVENTS = [
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
  'brushselected',
];

function wrapECharts(ECharts$$1) {
  return {
    name: 'IEcharts',
    props: {
      styles: {
        type: Object,
        required: false,
        default: function _default() {
          return {
            width: '100%',
            height: '100%',
          };
        },
      },
      theme: {
        type: [String, Object],
        required: false,
      },
      group: {
        type: String,
        required: false,
      },
      option: {
        type: Object,
        required: true,
      },
      initOpts: {
        type: Object,
        required: false,
      },
      notMerge: {
        type: Boolean,
        required: false,
        default: false,
      },
      lazyUpdate: {
        type: Boolean,
        required: false,
        default: false,
      },
      loading: {
        type: Boolean,
        required: false,
        default: false,
      },
      loadingOpts: {
        type: Object,
        required: false,
      },
      resizable: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data: function data() {
      return {
        fnResize: null,
        insResize: null,
        instance: null,
        watches: {
          loading: null,
          option: null,
          group: null,
        },
      };
    },
    computed: {
      width: {
        cache: false,
        get: function get() {
          return this.instance.getWidth();
        },
      },
      height: {
        cache: false,
        get: function get() {
          return this.instance.getHeight();
        },
      },
      isDisposed: {
        cache: false,
        get: function get() {
          return this.instance.isDisposed();
        },
      },
    },
    watch: {
      loading: {
        handler: function handler(loading) {
          var that = this;
          that.ifLoading(loading);
        },
        deep: false,
      },
      option: {
        handler: function handler(option) {
          var that = this;
          that.instance.setOption(option, that.notMerge, that.lazyUpdate);
        },
        deep: true,
      },
      group: {
        handler: function handler(group) {
          var that = this;
          that.instance.group = group;
        },
        deep: false,
      },
    },
    methods: {
      initResize: function initResize(dom) {
        var that = this;

        if (that.resizable) {
          that.insResize =
            that.insResize ||
            Resize({
              strategy: 'scroll', // <- For ultra performance.
            });
          that.fnResize =
            that.fnResize ||
            _throttle(that.resize, 250, {
              leading: true,
              trailing: true,
            });
          that.insResize.listenTo(dom, function(element) {
            var width = element.offsetWidth;
            var height = element.offsetHeight;
            that.fnResize({
              width: width,
              height: height,
              silent: false,
            });
          });
        }
      },
      init: function init() {
        var that = this;

        if (!that.instance) {
          var dom = that.$el;
          var instance = ECharts$$1.getInstanceByDom(dom);

          if (!instance) {
            instance = ECharts$$1.init(dom, that.theme, that.initOpts);
          }

          instance.group = that.group;
          that.instance = instance;
          that.$emit('ready', instance, ECharts$$1);
          that.$nextTick(function() {
            that.ifLoading(that.loading);
            that.update(); // that.watch();

            that.bind();
            that.initResize(dom);
          });
        }
      },
      bind: function bind() {
        var that = this;

        var _on = function _on(name) {
          that.instance.on(name, function(event) {
            that.$emit(name, event, that.instance, ECharts$$1);
          });
        };

        if (that._events) {
          for (var e in that._events) {
            if (Object.prototype.hasOwnProperty.call(that._events, e)) {
              var name = e.toLowerCase();

              if (ECHARTS_EVENTS.indexOf(name) > -1) {
                _on(name);
              }
            }
          }
        } else {
          for (var i = 0, len = ECHARTS_EVENTS.length; i < len; i++) {
            _on(ECHARTS_EVENTS[i]);
          }
        }
      },
      unbind: function unbind() {
        var that = this;

        if (that._events) {
          for (var e in that._events) {
            if (Object.prototype.hasOwnProperty.call(that._events, e)) {
              var name = e.toLowerCase();

              if (ECHARTS_EVENTS.indexOf(name) > -1) {
                that.instance.off(name);
              }
            }
          }
        } else {
          for (var i = 0, len = ECHARTS_EVENTS.length; i < len; i++) {
            that.instance.off(ECHARTS_EVENTS[i]);
          }
        }
      },
      ifLoading: function ifLoading(loading) {
        var that = this;

        if (loading) {
          that.showLoading();
        } else {
          that.hideLoading();
        }
      },
      watch: function watch() {
        var that = this;
        that.watches.loading = that.$watch('loading', function(loading) {
          that.ifLoading(loading);
        });
        that.watches.option = that.$watch(
          'option',
          function(option) {
            that.instance.setOption(option, that.notMerge, that.lazyUpdate);
          },
          {
            deep: true,
          }
        );
        that.watches.group = that.$watch('group', function(group) {
          that.instance.group = group;
        });
      },
      unwatch: function unwatch() {
        var that = this;

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
      resize: function resize(opts) {
        var that = this;

        if (that.instance) {
          var width = opts && opts.width;
          var height = opts && opts.height;
          that.$emit('resize', width, height);
          that.instance.resize(opts);
        }
      },
      update: function update() {
        var that = this;

        if (that.instance) {
          that.instance.setOption(that.option, that.notMerge, that.lazyUpdate);
          that.resize();
        }
      },
      mergeOption: function mergeOption(opts) {
        var that = this;

        if (that.instance) {
          that.instance.setOption(opts, false, that.lazyUpdate);
          that.resize();
        }
      },
      dispatchAction: function dispatchAction(payload) {
        var that = this;

        if (that.instance) {
          that.instance.dispatchAction(payload);
        }
      },
      convertToPixel: function convertToPixel(finder, value) {
        var that = this;
        return that.instance.convertToPixel(finder, value);
      },
      convertFromPixel: function convertFromPixel(finder, value) {
        var that = this;
        return that.instance.convertFromPixel(finder, value);
      },
      containPixel: function containPixel(finder, value) {
        var that = this;
        return that.instance.containPixel(finder, value);
      },
      showLoading: function showLoading() {
        var that = this;

        if (that.instance) {
          that.instance.showLoading('default', that.loadingOpts);
        }
      },
      hideLoading: function hideLoading() {
        var that = this;

        if (that.instance) {
          that.instance.hideLoading();
        }
      },
      getDataURL: function getDataURL(opts) {
        var that = this;
        return that.instance.getDataURL(opts);
      },
      getConnectedDataURL: function getConnectedDataURL(opts) {
        var that = this;
        return that.instance.getConnectedDataURL(opts);
      },
      clear: function clear() {
        var that = this;

        if (that.instance) {
          that.instance.clear();
        }
      },
      uninitResize: function uninitResize() {
        var that = this;

        if (that.insResize && that.insResize.uninstall) {
          that.insResize.uninstall(that.$el);
          that.insResize = null;
        }

        if (that.fnResize && that.fnResize.cancel) {
          that.fnResize.cancel();
          that.fnResize = null;
        }
      },
      uninit: function uninit() {
        var that = this;

        if (that.instance) {
          that.unbind(); // that.unwatch();

          that.uninitResize();
          that.instance.dispose();
          that.instance = null;
        }
      },
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
    mounted: function mounted() {
      var that = this; // console.log('mounted');

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
    beforeDestroy: function beforeDestroy() {
      var that = this; // console.log('beforeDestroy');

      that.uninit();
    },
    // destroyed() {
    // const that = this;
    // console.log('destroyed');
    // },
    connect: function connect(group) {
      return ECharts$$1.connect(group);
    },
    disConnect: function disConnect(group) {
      return ECharts$$1.disConnect(group);
    },
    dispose: function dispose(target) {
      return ECharts$$1.dispose(target);
    },
    getInstanceByDom: function getInstanceByDom(target) {
      return ECharts$$1.getInstanceByDom(target);
    },
    registerMap: function registerMap(mapName, geoJson, specialAreas) {
      return ECharts$$1.registerMap(mapName, geoJson, specialAreas);
    },
    getMap: function getMap(mapName) {
      return ECharts$$1.getMap(mapName);
    },
    registerTheme: function registerTheme(themeName, theme) {
      return ECharts$$1.registerTheme(themeName, theme);
    },
    render: function render(h) {
      var that = this;
      return h('div', {
        style: that.styles,
      });
    },
  };
}

var IEcharts = wrapECharts(ECharts);
IEcharts.__echarts__ = ECharts;
//   Vue.component(IEcharts.name, IEcharts);
// };
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }
// const API = {
//   // version: '2.7.0',
//   install,
//   IEcharts
// };
// export default API;

export default IEcharts;
