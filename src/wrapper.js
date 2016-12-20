import ResizeEvent from 'element-resize-event';

const ACTION_EVENTS = [
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

const MOUSE_EVENTS = [
  'click',
  'dblclick',
  'mouseover',
  'mouseout',
  'mousedown',
  'mouseup',
  'globalout'
];

function wrapECharts(ECharts) {
  return {
    name: 'IECharts',
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
          that.$emit('ready', instance);
          that.$nextTick(() => {
            that.ifLoading(that.loading);
            that.update();
            that.watch();
            that.bind();
          });
          ResizeEvent(dom, that._resize);
        }
      },
      bind() {
        const that = this;
        let i = 0, len = 0;
        for (i = 0, len = ACTION_EVENTS.length; i < len; i++) {
          that.instance.on(ACTION_EVENTS[i], (event) => {
            that.$emit(ACTION_EVENTS[i], event);
          }, that);
        }
        for (i = 0, len = MOUSE_EVENTS.length; i < len; i++) {
          that.instance.on(MOUSE_EVENTS[i], (event) => {
            that.$emit(MOUSE_EVENTS[i], event);
          }, that);
        }
      },
      unbind() {
        const that = this;
        let i = 0, len = 0;
        for (i = 0, len = ACTION_EVENTS.length; i < len; i++) {
          that.instance.off(ACTION_EVENTS[i]);
        }
        for (i = 0, len = MOUSE_EVENTS.length; i < len; i++) {
          that.instance.off(MOUSE_EVENTS[i]);
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
        that.watches.loading = that.$watch('loading', (loading) => {
          that.ifLoading(loading);
        });
        that.watches.option = that.$watch('option', (option) => {
          that.instance.setOption(option, true, that.lazyUpdate);
        }, {
          deep: true
        });
        that.watches.group = that.$watch('group', (group) => {
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
      mergeOptions(opts) {
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
          that.unwatch();
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
}

export default wrapECharts;
