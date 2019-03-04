(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('echarts')))
    : typeof define === 'function' && define.amd
    ? define(['echarts'], factory)
    : (global.VueECharts = factory(global.echarts));
})(this, function(ECharts) {
  'use strict';

  var commonjsGlobal =
    typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : {};

  function createCommonjsModule(fn, module) {
    return (module = { exports: {} }), fn(module, module.exports), module.exports;
  }

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal =
    typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
    nativeMin = Math.min;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now = function() {
    return root.Date.now();
  };

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
        thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

      return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      );
    }

    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
      var time = now(),
        isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed `func` invocations and a `flush` method to
   * immediately invoke them. Provide `options` to indicate whether `func`
   * should be invoked on the leading and/or trailing edge of the `wait`
   * timeout. The `func` is invoked with the last arguments provided to the
   * throttled function. Subsequent calls to the throttled function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the throttled function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=true]
   *  Specify invoking on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // Avoid excessively updating the position while scrolling.
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
   * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
   * jQuery(element).on('click', throttled);
   *
   * // Cancel the trailing throttled invocation.
   * jQuery(window).on('popstate', throttled.cancel);
   */
  function throttle(func, wait, options) {
    var leading = true,
      trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    if (isObject(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
      leading: leading,
      maxWait: wait,
      trailing: trailing,
    });
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' || (isObjectLike(value) && objectToString.call(value) == symbolTag);
  }

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value)
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : reIsBadHex.test(value)
      ? NAN
      : +value;
  }

  var lodash_throttle = throttle;

  var collectionUtils = createCommonjsModule(function(module) {
    var utils = (module.exports = {});

    /**
     * Loops through the collection and calls the callback for each element. if the callback returns truthy, the loop is broken and returns the same value.
     * @public
     * @param {*} collection The collection to loop through. Needs to have a length property set and have indices set from 0 to length - 1.
     * @param {function} callback The callback to be called for each element. The element will be given as a parameter to the callback. If this callback returns truthy, the loop is broken and the same value is returned.
     * @returns {*} The value that a callback has returned (if truthy). Otherwise nothing.
     */
    utils.forEach = function(collection, callback) {
      for (var i = 0; i < collection.length; i++) {
        var result = callback(collection[i]);
        if (result) {
          return result;
        }
      }
    };
  });

  var elementUtils = function(options) {
    var getState = options.stateHandler.getState;

    /**
     * Tells if the element has been made detectable and ready to be listened for resize events.
     * @public
     * @param {element} The element to check.
     * @returns {boolean} True or false depending on if the element is detectable or not.
     */
    function isDetectable(element) {
      var state = getState(element);
      return state && !!state.isDetectable;
    }

    /**
     * Marks the element that it has been made detectable and ready to be listened for resize events.
     * @public
     * @param {element} The element to mark.
     */
    function markAsDetectable(element) {
      getState(element).isDetectable = true;
    }

    /**
     * Tells if the element is busy or not.
     * @public
     * @param {element} The element to check.
     * @returns {boolean} True or false depending on if the element is busy or not.
     */
    function isBusy(element) {
      return !!getState(element).busy;
    }

    /**
     * Marks the object is busy and should not be made detectable.
     * @public
     * @param {element} element The element to mark.
     * @param {boolean} busy If the element is busy or not.
     */
    function markBusy(element, busy) {
      getState(element).busy = !!busy;
    }

    return {
      isDetectable: isDetectable,
      markAsDetectable: markAsDetectable,
      isBusy: isBusy,
      markBusy: markBusy,
    };
  };

  var listenerHandler = function(idHandler) {
    var eventListeners = {};

    /**
     * Gets all listeners for the given element.
     * @public
     * @param {element} element The element to get all listeners for.
     * @returns All listeners for the given element.
     */
    function getListeners(element) {
      var id = idHandler.get(element);

      if (id === undefined) {
        return [];
      }

      return eventListeners[id] || [];
    }

    /**
     * Stores the given listener for the given element. Will not actually add the listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The callback that the element has added.
     */
    function addListener(element, listener) {
      var id = idHandler.get(element);

      if (!eventListeners[id]) {
        eventListeners[id] = [];
      }

      eventListeners[id].push(listener);
    }

    function removeListener(element, listener) {
      var listeners = getListeners(element);
      for (var i = 0, len = listeners.length; i < len; ++i) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }

    function removeAllListeners(element) {
      var listeners = getListeners(element);
      if (!listeners) {
        return;
      }
      listeners.length = 0;
    }

    return {
      get: getListeners,
      add: addListener,
      removeListener: removeListener,
      removeAllListeners: removeAllListeners,
    };
  };

  var idGenerator = function() {
    var idCount = 1;

    /**
     * Generates a new unique id in the context.
     * @public
     * @returns {number} A unique id in the context.
     */
    function generate() {
      return idCount++;
    }

    return {
      generate: generate,
    };
  };

  var idHandler = function(options) {
    var idGenerator = options.idGenerator;
    var getState = options.stateHandler.getState;

    /**
     * Gets the resize detector id of the element.
     * @public
     * @param {element} element The target element to get the id of.
     * @returns {string|number|null} The id of the element. Null if it has no id.
     */
    function getId(element) {
      var state = getState(element);

      if (state && state.id !== undefined) {
        return state.id;
      }

      return null;
    }

    /**
     * Sets the resize detector id of the element. Requires the element to have a resize detector state initialized.
     * @public
     * @param {element} element The target element to set the id of.
     * @returns {string|number|null} The id of the element.
     */
    function setId(element) {
      var state = getState(element);

      if (!state) {
        throw new Error('setId required the element to have a resize detection state.');
      }

      var id = idGenerator.generate();

      state.id = id;

      return id;
    }

    return {
      get: getId,
      set: setId,
    };
  };

  /* global console: false */

  /**
   * Reporter that handles the reporting of logs, warnings and errors.
   * @public
   * @param {boolean} quiet Tells if the reporter should be quiet or not.
   */
  var reporter = function(quiet) {
    function noop() {
      //Does nothing.
    }

    var reporter = {
      log: noop,
      warn: noop,
      error: noop,
    };

    if (!quiet && window.console) {
      var attachFunction = function(reporter, name) {
        //The proxy is needed to be able to call the method with the console context,
        //since we cannot use bind.
        reporter[name] = function reporterProxy() {
          var f = console[name];
          if (f.apply) {
            //IE9 does not support console.log.apply :)
            f.apply(console, arguments);
          } else {
            for (var i = 0; i < arguments.length; i++) {
              f(arguments[i]);
            }
          }
        };
      };

      attachFunction(reporter, 'log');
      attachFunction(reporter, 'warn');
      attachFunction(reporter, 'error');
    }

    return reporter;
  };

  var browserDetector = createCommonjsModule(function(module) {
    var detector = (module.exports = {});

    detector.isIE = function(version) {
      function isAnyIeVersion() {
        var agent = navigator.userAgent.toLowerCase();
        return agent.indexOf('msie') !== -1 || agent.indexOf('trident') !== -1 || agent.indexOf(' edge/') !== -1;
      }

      if (!isAnyIeVersion()) {
        return false;
      }

      if (!version) {
        return true;
      }

      //Shamelessly stolen from https://gist.github.com/padolsey/527683
      var ieVersion = (function() {
        var undef,
          v = 3,
          div = document.createElement('div'),
          all = div.getElementsByTagName('i');

        do {
          div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->';
        } while (all[0]);

        return v > 4 ? v : undef;
      })();

      return version === ieVersion;
    };

    detector.isLegacyOpera = function() {
      return !!window.opera;
    };
  });

  var utils_1 = createCommonjsModule(function(module) {
    var utils = (module.exports = {});

    utils.getOption = getOption;

    function getOption(options, name, defaultValue) {
      var value = options[name];

      if ((value === undefined || value === null) && defaultValue !== undefined) {
        return defaultValue;
      }

      return value;
    }
  });

  var batchProcessor = function batchProcessorMaker(options) {
    options = options || {};
    var reporter = options.reporter;
    var asyncProcess = utils_1.getOption(options, 'async', true);
    var autoProcess = utils_1.getOption(options, 'auto', true);

    if (autoProcess && !asyncProcess) {
      reporter &&
        reporter.warn('Invalid options combination. auto=true and async=false is invalid. Setting async=true.');
      asyncProcess = true;
    }

    var batch = Batch();
    var asyncFrameHandler;
    var isProcessing = false;

    function addFunction(level, fn) {
      if (!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
        // Since this is async, it is guaranteed to be executed after that the fn is added to the batch.
        // This needs to be done before, since we're checking the size of the batch to be 0.
        processBatchAsync();
      }

      batch.add(level, fn);
    }

    function processBatch() {
      // Save the current batch, and create a new batch so that incoming functions are not added into the currently processing batch.
      // Continue processing until the top-level batch is empty (functions may be added to the new batch while processing, and so on).
      isProcessing = true;
      while (batch.size()) {
        var processingBatch = batch;
        batch = Batch();
        processingBatch.process();
      }
      isProcessing = false;
    }

    function forceProcessBatch(localAsyncProcess) {
      if (isProcessing) {
        return;
      }

      if (localAsyncProcess === undefined) {
        localAsyncProcess = asyncProcess;
      }

      if (asyncFrameHandler) {
        cancelFrame(asyncFrameHandler);
        asyncFrameHandler = null;
      }

      if (localAsyncProcess) {
        processBatchAsync();
      } else {
        processBatch();
      }
    }

    function processBatchAsync() {
      asyncFrameHandler = requestFrame(processBatch);
    }

    function cancelFrame(listener) {
      // var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
      var cancel = clearTimeout;
      return cancel(listener);
    }

    function requestFrame(callback) {
      // var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) { return window.setTimeout(fn, 20); };
      var raf = function(fn) {
        return setTimeout(fn, 0);
      };
      return raf(callback);
    }

    return {
      add: addFunction,
      force: forceProcessBatch,
    };
  };

  function Batch() {
    var batch = {};
    var size = 0;
    var topLevel = 0;
    var bottomLevel = 0;

    function add(level, fn) {
      if (!fn) {
        fn = level;
        level = 0;
      }

      if (level > topLevel) {
        topLevel = level;
      } else if (level < bottomLevel) {
        bottomLevel = level;
      }

      if (!batch[level]) {
        batch[level] = [];
      }

      batch[level].push(fn);
      size++;
    }

    function process() {
      for (var level = bottomLevel; level <= topLevel; level++) {
        var fns = batch[level];

        for (var i = 0; i < fns.length; i++) {
          var fn = fns[i];
          fn();
        }
      }
    }

    function getSize() {
      return size;
    }

    return {
      add: add,
      process: process,
      size: getSize,
    };
  }

  var prop = '_erd';

  function initState(element) {
    element[prop] = {};
    return getState(element);
  }

  function getState(element) {
    return element[prop];
  }

  function cleanState(element) {
    delete element[prop];
  }

  var stateHandler = {
    initState: initState,
    getState: getState,
    cleanState: cleanState,
  };

  var object = function(options) {
    options = options || {};
    var reporter = options.reporter;
    var batchProcessor = options.batchProcessor;
    var getState = options.stateHandler.getState;

    if (!reporter) {
      throw new Error('Missing required dependency: reporter.');
    }

    /**
     * Adds a resize event listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
     */
    function addListener(element, listener) {
      if (!getObject(element)) {
        throw new Error('Element is not detectable by this strategy.');
      }

      function listenerProxy() {
        listener(element);
      }

      if (browserDetector.isIE(8)) {
        //IE 8 does not support object, but supports the resize event directly on elements.
        getState(element).object = {
          proxy: listenerProxy,
        };
        element.attachEvent('onresize', listenerProxy);
      } else {
        var object = getObject(element);
        object.contentDocument.defaultView.addEventListener('resize', listenerProxy);
      }
    }

    /**
     * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
     * @private
     * @param {object} options Optional options object.
     * @param {element} element The element to make detectable
     * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
     */
    function makeDetectable(options, element, callback) {
      if (!callback) {
        callback = element;
        element = options;
        options = null;
      }

      options = options || {};
      var debug = options.debug;

      function injectObject(element, callback) {
        var OBJECT_STYLE =
          'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; padding: 0; margin: 0; opacity: 0; z-index: -1000; pointer-events: none;';

        //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.

        // Position altering may be performed directly or on object load, depending on if style resolution is possible directly or not.
        var positionCheckPerformed = false;

        // The element may not yet be attached to the DOM, and therefore the style object may be empty in some browsers.
        // Since the style object is a reference, it will be updated as soon as the element is attached to the DOM.
        var style = window.getComputedStyle(element);
        var width = element.offsetWidth;
        var height = element.offsetHeight;

        getState(element).startSize = {
          width: width,
          height: height,
        };

        function mutateDom() {
          function alterPositionStyles() {
            if (style.position === 'static') {
              element.style.position = 'relative';

              var removeRelativeStyles = function(reporter, element, style, property) {
                function getNumericalValue(value) {
                  return value.replace(/[^-\d\.]/g, '');
                }

                var value = style[property];

                if (value !== 'auto' && getNumericalValue(value) !== '0') {
                  reporter.warn(
                    'An element that is positioned static has style.' +
                      property +
                      '=' +
                      value +
                      ' which is ignored due to the static positioning. The element will need to be positioned relative, so the style.' +
                      property +
                      ' will be set to 0. Element: ',
                    element
                  );
                  element.style[property] = 0;
                }
              };

              //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
              //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
              removeRelativeStyles(reporter, element, style, 'top');
              removeRelativeStyles(reporter, element, style, 'right');
              removeRelativeStyles(reporter, element, style, 'bottom');
              removeRelativeStyles(reporter, element, style, 'left');
            }
          }

          function onObjectLoad() {
            // The object has been loaded, which means that the element now is guaranteed to be attached to the DOM.
            if (!positionCheckPerformed) {
              alterPositionStyles();
            }

            /*jshint validthis: true */

            function getDocument(element, callback) {
              //Opera 12 seem to call the object.onload before the actual document has been created.
              //So if it is not present, poll it with an timeout until it is present.
              //TODO: Could maybe be handled better with object.onreadystatechange or similar.
              if (!element.contentDocument) {
                setTimeout(function checkForObjectDocument() {
                  getDocument(element, callback);
                }, 100);

                return;
              }

              callback(element.contentDocument);
            }

            //Mutating the object element here seems to fire another load event.
            //Mutating the inner document of the object element is fine though.
            var objectElement = this;

            //Create the style element to be added to the object.
            getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
              //Notify that the element is ready to be listened to.
              callback(element);
            });
          }

          // The element may be detached from the DOM, and some browsers does not support style resolving of detached elements.
          // The alterPositionStyles needs to be delayed until we know the element has been attached to the DOM (which we are sure of when the onObjectLoad has been fired), if style resolution is not possible.
          if (style.position !== '') {
            alterPositionStyles(style);
            positionCheckPerformed = true;
          }

          //Add an object element as a child to the target element that will be listened to for resize events.
          var object = document.createElement('object');
          object.style.cssText = OBJECT_STYLE;
          object.tabIndex = -1;
          object.type = 'text/html';
          object.setAttribute('aria-hidden', 'true');
          object.onload = onObjectLoad;

          //Safari: This must occur before adding the object to the DOM.
          //IE: Does not like that this happens before, even if it is also added after.
          if (!browserDetector.isIE()) {
            object.data = 'about:blank';
          }

          element.appendChild(object);
          getState(element).object = object;

          //IE: This must occur after adding the object to the DOM.
          if (browserDetector.isIE()) {
            object.data = 'about:blank';
          }
        }

        if (batchProcessor) {
          batchProcessor.add(mutateDom);
        } else {
          mutateDom();
        }
      }

      if (browserDetector.isIE(8)) {
        //IE 8 does not support objects properly. Luckily they do support the resize event.
        //So do not inject the object and notify that the element is already ready to be listened to.
        //The event handler for the resize event is attached in the utils.addListener instead.
        callback(element);
      } else {
        injectObject(element, callback);
      }
    }

    /**
     * Returns the child object of the target element.
     * @private
     * @param {element} element The target element.
     * @returns The object element of the target.
     */
    function getObject(element) {
      return getState(element).object;
    }

    function uninstall(element) {
      if (browserDetector.isIE(8)) {
        element.detachEvent('onresize', getState(element).object.proxy);
      } else {
        element.removeChild(getObject(element));
      }
      delete getState(element).object;
    }

    return {
      makeDetectable: makeDetectable,
      addListener: addListener,
      uninstall: uninstall,
    };
  };

  var forEach = collectionUtils.forEach;

  var scroll = function(options) {
    options = options || {};
    var reporter = options.reporter;
    var batchProcessor = options.batchProcessor;
    var getState = options.stateHandler.getState;
    var hasState = options.stateHandler.hasState;
    var idHandler = options.idHandler;

    if (!batchProcessor) {
      throw new Error('Missing required dependency: batchProcessor');
    }

    if (!reporter) {
      throw new Error('Missing required dependency: reporter.');
    }

    //TODO: Could this perhaps be done at installation time?
    var scrollbarSizes = getScrollbarSizes();

    // Inject the scrollbar styling that prevents them from appearing sometimes in Chrome.
    // The injected container needs to have a class, so that it may be styled with CSS (pseudo elements).
    var styleId = 'erd_scroll_detection_scrollbar_style';
    var detectionContainerClass = 'erd_scroll_detection_container';
    injectScrollStyle(styleId, detectionContainerClass);

    function getScrollbarSizes() {
      var width = 500;
      var height = 500;

      var child = document.createElement('div');
      child.style.cssText =
        'position: absolute; width: ' +
        width * 2 +
        'px; height: ' +
        height * 2 +
        'px; visibility: hidden; margin: 0; padding: 0;';

      var container = document.createElement('div');
      container.style.cssText =
        'position: absolute; width: ' +
        width +
        'px; height: ' +
        height +
        'px; overflow: scroll; visibility: none; top: ' +
        -width * 3 +
        'px; left: ' +
        -height * 3 +
        'px; visibility: hidden; margin: 0; padding: 0;';

      container.appendChild(child);

      document.body.insertBefore(container, document.body.firstChild);

      var widthSize = width - container.clientWidth;
      var heightSize = height - container.clientHeight;

      document.body.removeChild(container);

      return {
        width: widthSize,
        height: heightSize,
      };
    }

    function injectScrollStyle(styleId, containerClass) {
      function injectStyle(style, method) {
        method =
          method ||
          function(element) {
            document.head.appendChild(element);
          };

        var styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        styleElement.id = styleId;
        method(styleElement);
        return styleElement;
      }

      if (!document.getElementById(styleId)) {
        var containerAnimationClass = containerClass + '_animation';
        var containerAnimationActiveClass = containerClass + '_animation_active';
        var style = '/* Created by the element-resize-detector library. */\n';
        style += '.' + containerClass + ' > div::-webkit-scrollbar { display: none; }\n\n';
        style +=
          '.' +
          containerAnimationActiveClass +
          ' { -webkit-animation-duration: 0.1s; animation-duration: 0.1s; -webkit-animation-name: ' +
          containerAnimationClass +
          '; animation-name: ' +
          containerAnimationClass +
          '; }\n';
        style +=
          '@-webkit-keyframes ' +
          containerAnimationClass +
          ' { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n';
        style +=
          '@keyframes ' + containerAnimationClass + ' { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }';
        injectStyle(style);
      }
    }

    function addAnimationClass(element) {
      element.className += ' ' + detectionContainerClass + '_animation_active';
    }

    function addEvent(el, name, cb) {
      if (el.addEventListener) {
        el.addEventListener(name, cb);
      } else if (el.attachEvent) {
        el.attachEvent('on' + name, cb);
      } else {
        return reporter.error("[scroll] Don't know how to add event listeners.");
      }
    }

    function removeEvent(el, name, cb) {
      if (el.removeEventListener) {
        el.removeEventListener(name, cb);
      } else if (el.detachEvent) {
        el.detachEvent('on' + name, cb);
      } else {
        return reporter.error("[scroll] Don't know how to remove event listeners.");
      }
    }

    function getExpandElement(element) {
      return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
    }

    function getShrinkElement(element) {
      return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
    }

    /**
     * Adds a resize event listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
     */
    function addListener(element, listener) {
      var listeners = getState(element).listeners;

      if (!listeners.push) {
        throw new Error('Cannot add listener to an element that is not detectable.');
      }

      getState(element).listeners.push(listener);
    }

    /**
     * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
     * @private
     * @param {object} options Optional options object.
     * @param {element} element The element to make detectable
     * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
     */
    function makeDetectable(options, element, callback) {
      if (!callback) {
        callback = element;
        element = options;
        options = null;
      }

      options = options || {};

      function debug() {
        if (options.debug) {
          var args = Array.prototype.slice.call(arguments);
          args.unshift(idHandler.get(element), 'Scroll: ');
          if (reporter.log.apply) {
            reporter.log.apply(null, args);
          } else {
            for (var i = 0; i < args.length; i++) {
              reporter.log(args[i]);
            }
          }
        }
      }

      function isDetached(element) {
        function isInDocument(element) {
          return element === element.ownerDocument.body || element.ownerDocument.body.contains(element);
        }

        if (!isInDocument(element)) {
          return true;
        }

        // FireFox returns null style in hidden iframes. See https://github.com/wnr/element-resize-detector/issues/68 and https://bugzilla.mozilla.org/show_bug.cgi?id=795520
        if (window.getComputedStyle(element) === null) {
          return true;
        }

        return false;
      }

      function isUnrendered(element) {
        // Check the absolute positioned container since the top level container is display: inline.
        var container = getState(element).container.childNodes[0];
        var style = window.getComputedStyle(container);
        return !style.width || style.width.indexOf('px') === -1; //Can only compute pixel value when rendered.
      }

      function getStyle() {
        // Some browsers only force layouts when actually reading the style properties of the style object, so make sure that they are all read here,
        // so that the user of the function can be sure that it will perform the layout here, instead of later (important for batching).
        var elementStyle = window.getComputedStyle(element);
        var style = {};
        style.position = elementStyle.position;
        style.width = element.offsetWidth;
        style.height = element.offsetHeight;
        style.top = elementStyle.top;
        style.right = elementStyle.right;
        style.bottom = elementStyle.bottom;
        style.left = elementStyle.left;
        style.widthCSS = elementStyle.width;
        style.heightCSS = elementStyle.height;
        return style;
      }

      function storeStartSize() {
        var style = getStyle();
        getState(element).startSize = {
          width: style.width,
          height: style.height,
        };
        debug('Element start size', getState(element).startSize);
      }

      function initListeners() {
        getState(element).listeners = [];
      }

      function storeStyle() {
        debug('storeStyle invoked.');
        if (!getState(element)) {
          debug('Aborting because element has been uninstalled');
          return;
        }

        var style = getStyle();
        getState(element).style = style;
      }

      function storeCurrentSize(element, width, height) {
        getState(element).lastWidth = width;
        getState(element).lastHeight = height;
      }

      function getExpandChildElement(element) {
        return getExpandElement(element).childNodes[0];
      }

      function getWidthOffset() {
        return 2 * scrollbarSizes.width + 1;
      }

      function getHeightOffset() {
        return 2 * scrollbarSizes.height + 1;
      }

      function getExpandWidth(width) {
        return width + 10 + getWidthOffset();
      }

      function getExpandHeight(height) {
        return height + 10 + getHeightOffset();
      }

      function getShrinkWidth(width) {
        return width * 2 + getWidthOffset();
      }

      function getShrinkHeight(height) {
        return height * 2 + getHeightOffset();
      }

      function positionScrollbars(element, width, height) {
        var expand = getExpandElement(element);
        var shrink = getShrinkElement(element);
        var expandWidth = getExpandWidth(width);
        var expandHeight = getExpandHeight(height);
        var shrinkWidth = getShrinkWidth(width);
        var shrinkHeight = getShrinkHeight(height);
        expand.scrollLeft = expandWidth;
        expand.scrollTop = expandHeight;
        shrink.scrollLeft = shrinkWidth;
        shrink.scrollTop = shrinkHeight;
      }

      function injectContainerElement() {
        var container = getState(element).container;

        if (!container) {
          container = document.createElement('div');
          container.className = detectionContainerClass;
          container.style.cssText =
            'visibility: hidden; display: inline; width: 0px; height: 0px; z-index: -1; overflow: hidden; margin: 0; padding: 0;';
          getState(element).container = container;
          addAnimationClass(container);
          element.appendChild(container);

          var onAnimationStart = function() {
            getState(element).onRendered && getState(element).onRendered();
          };

          addEvent(container, 'animationstart', onAnimationStart);

          // Store the event handler here so that they may be removed when uninstall is called.
          // See uninstall function for an explanation why it is needed.
          getState(element).onAnimationStart = onAnimationStart;
        }

        return container;
      }

      function injectScrollElements() {
        function alterPositionStyles() {
          var style = getState(element).style;

          if (style.position === 'static') {
            element.style.position = 'relative';

            var removeRelativeStyles = function(reporter, element, style, property) {
              function getNumericalValue(value) {
                return value.replace(/[^-\d\.]/g, '');
              }

              var value = style[property];

              if (value !== 'auto' && getNumericalValue(value) !== '0') {
                reporter.warn(
                  'An element that is positioned static has style.' +
                    property +
                    '=' +
                    value +
                    ' which is ignored due to the static positioning. The element will need to be positioned relative, so the style.' +
                    property +
                    ' will be set to 0. Element: ',
                  element
                );
                element.style[property] = 0;
              }
            };

            //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
            //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
            removeRelativeStyles(reporter, element, style, 'top');
            removeRelativeStyles(reporter, element, style, 'right');
            removeRelativeStyles(reporter, element, style, 'bottom');
            removeRelativeStyles(reporter, element, style, 'left');
          }
        }

        function getLeftTopBottomRightCssText(left, top, bottom, right) {
          left = !left ? '0' : left + 'px';
          top = !top ? '0' : top + 'px';
          bottom = !bottom ? '0' : bottom + 'px';
          right = !right ? '0' : right + 'px';

          return 'left: ' + left + '; top: ' + top + '; right: ' + right + '; bottom: ' + bottom + ';';
        }

        debug('Injecting elements');

        if (!getState(element)) {
          debug('Aborting because element has been uninstalled');
          return;
        }

        alterPositionStyles();

        var rootContainer = getState(element).container;

        if (!rootContainer) {
          rootContainer = injectContainerElement();
        }

        // Due to this WebKit bug https://bugs.webkit.org/show_bug.cgi?id=80808 (currently fixed in Blink, but still present in WebKit browsers such as Safari),
        // we need to inject two containers, one that is width/height 100% and another that is left/top -1px so that the final container always is 1x1 pixels bigger than
        // the targeted element.
        // When the bug is resolved, "containerContainer" may be removed.

        // The outer container can occasionally be less wide than the targeted when inside inline elements element in WebKit (see https://bugs.webkit.org/show_bug.cgi?id=152980).
        // This should be no problem since the inner container either way makes sure the injected scroll elements are at least 1x1 px.

        var scrollbarWidth = scrollbarSizes.width;
        var scrollbarHeight = scrollbarSizes.height;
        var containerContainerStyle =
          'position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; width: 100%; height: 100%; left: 0px; top: 0px;';
        var containerStyle =
          'position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; ' +
          getLeftTopBottomRightCssText(
            -(1 + scrollbarWidth),
            -(1 + scrollbarHeight),
            -scrollbarHeight,
            -scrollbarWidth
          );
        var expandStyle =
          'position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;';
        var shrinkStyle =
          'position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;';
        var expandChildStyle = 'position: absolute; left: 0; top: 0;';
        var shrinkChildStyle = 'position: absolute; width: 200%; height: 200%;';

        var containerContainer = document.createElement('div');
        var container = document.createElement('div');
        var expand = document.createElement('div');
        var expandChild = document.createElement('div');
        var shrink = document.createElement('div');
        var shrinkChild = document.createElement('div');

        // Some browsers choke on the resize system being rtl, so force it to ltr. https://github.com/wnr/element-resize-detector/issues/56
        // However, dir should not be set on the top level container as it alters the dimensions of the target element in some browsers.
        containerContainer.dir = 'ltr';

        containerContainer.style.cssText = containerContainerStyle;
        containerContainer.className = detectionContainerClass;
        container.className = detectionContainerClass;
        container.style.cssText = containerStyle;
        expand.style.cssText = expandStyle;
        expandChild.style.cssText = expandChildStyle;
        shrink.style.cssText = shrinkStyle;
        shrinkChild.style.cssText = shrinkChildStyle;

        expand.appendChild(expandChild);
        shrink.appendChild(shrinkChild);
        container.appendChild(expand);
        container.appendChild(shrink);
        containerContainer.appendChild(container);
        rootContainer.appendChild(containerContainer);

        function onExpandScroll() {
          getState(element).onExpand && getState(element).onExpand();
        }

        function onShrinkScroll() {
          getState(element).onShrink && getState(element).onShrink();
        }

        addEvent(expand, 'scroll', onExpandScroll);
        addEvent(shrink, 'scroll', onShrinkScroll);

        // Store the event handlers here so that they may be removed when uninstall is called.
        // See uninstall function for an explanation why it is needed.
        getState(element).onExpandScroll = onExpandScroll;
        getState(element).onShrinkScroll = onShrinkScroll;
      }

      function registerListenersAndPositionElements() {
        function updateChildSizes(element, width, height) {
          var expandChild = getExpandChildElement(element);
          var expandWidth = getExpandWidth(width);
          var expandHeight = getExpandHeight(height);
          expandChild.style.width = expandWidth + 'px';
          expandChild.style.height = expandHeight + 'px';
        }

        function updateDetectorElements(done) {
          var width = element.offsetWidth;
          var height = element.offsetHeight;

          debug('Storing current size', width, height);

          // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
          // Otherwise the if-check in handleScroll is useless.
          storeCurrentSize(element, width, height);

          // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
          // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

          batchProcessor.add(0, function performUpdateChildSizes() {
            if (!getState(element)) {
              debug('Aborting because element has been uninstalled');
              return;
            }

            if (!areElementsInjected()) {
              debug('Aborting because element container has not been initialized');
              return;
            }

            if (options.debug) {
              var w = element.offsetWidth;
              var h = element.offsetHeight;

              if (w !== width || h !== height) {
                reporter.warn(idHandler.get(element), 'Scroll: Size changed before updating detector elements.');
              }
            }

            updateChildSizes(element, width, height);
          });

          batchProcessor.add(1, function updateScrollbars() {
            if (!getState(element)) {
              debug('Aborting because element has been uninstalled');
              return;
            }

            if (!areElementsInjected()) {
              debug('Aborting because element container has not been initialized');
              return;
            }

            positionScrollbars(element, width, height);
          });

          if (done) {
            batchProcessor.add(2, function() {
              if (!getState(element)) {
                debug('Aborting because element has been uninstalled');
                return;
              }

              if (!areElementsInjected()) {
                debug('Aborting because element container has not been initialized');
                return;
              }

              done();
            });
          }
        }

        function areElementsInjected() {
          return !!getState(element).container;
        }

        function notifyListenersIfNeeded() {
          function isFirstNotify() {
            return getState(element).lastNotifiedWidth === undefined;
          }

          debug('notifyListenersIfNeeded invoked');

          var state = getState(element);

          // Don't notify the if the current size is the start size, and this is the first notification.
          if (
            isFirstNotify() &&
            state.lastWidth === state.startSize.width &&
            state.lastHeight === state.startSize.height
          ) {
            return debug('Not notifying: Size is the same as the start size, and there has been no notification yet.');
          }

          // Don't notify if the size already has been notified.
          if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
            return debug('Not notifying: Size already notified');
          }

          debug('Current size not notified, notifying...');
          state.lastNotifiedWidth = state.lastWidth;
          state.lastNotifiedHeight = state.lastHeight;
          forEach(getState(element).listeners, function(listener) {
            listener(element);
          });
        }

        function handleRender() {
          debug('startanimation triggered.');

          if (isUnrendered(element)) {
            debug('Ignoring since element is still unrendered...');
            return;
          }

          debug('Element rendered.');
          var expand = getExpandElement(element);
          var shrink = getShrinkElement(element);
          if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
            debug('Scrollbars out of sync. Updating detector elements...');
            updateDetectorElements(notifyListenersIfNeeded);
          }
        }

        function handleScroll() {
          debug('Scroll detected.');

          if (isUnrendered(element)) {
            // Element is still unrendered. Skip this scroll event.
            debug('Scroll event fired while unrendered. Ignoring...');
            return;
          }

          var width = element.offsetWidth;
          var height = element.offsetHeight;

          if (width !== getState(element).lastWidth || height !== getState(element).lastHeight) {
            debug('Element size changed.');
            updateDetectorElements(notifyListenersIfNeeded);
          } else {
            debug('Element size has not changed (' + width + 'x' + height + ').');
          }
        }

        debug('registerListenersAndPositionElements invoked.');

        if (!getState(element)) {
          debug('Aborting because element has been uninstalled');
          return;
        }

        getState(element).onRendered = handleRender;
        getState(element).onExpand = handleScroll;
        getState(element).onShrink = handleScroll;

        var style = getState(element).style;
        updateChildSizes(element, style.width, style.height);
      }

      function finalizeDomMutation() {
        debug('finalizeDomMutation invoked.');

        if (!getState(element)) {
          debug('Aborting because element has been uninstalled');
          return;
        }

        var style = getState(element).style;
        storeCurrentSize(element, style.width, style.height);
        positionScrollbars(element, style.width, style.height);
      }

      function ready() {
        callback(element);
      }

      function install() {
        debug('Installing...');
        initListeners();
        storeStartSize();

        batchProcessor.add(0, storeStyle);
        batchProcessor.add(1, injectScrollElements);
        batchProcessor.add(2, registerListenersAndPositionElements);
        batchProcessor.add(3, finalizeDomMutation);
        batchProcessor.add(4, ready);
      }

      debug('Making detectable...');

      if (isDetached(element)) {
        debug('Element is detached');

        injectContainerElement();

        debug('Waiting until element is attached...');

        getState(element).onRendered = function() {
          debug('Element is now attached');
          install();
        };
      } else {
        install();
      }
    }

    function uninstall(element) {
      var state = getState(element);

      if (!state) {
        // Uninstall has been called on a non-erd element.
        return;
      }

      // Uninstall may have been called in the following scenarios:
      // (1) Right between the sync code and async batch (here state.busy = true, but nothing have been registered or injected).
      // (2) In the ready callback of the last level of the batch by another element (here, state.busy = true, but all the stuff has been injected).
      // (3) After the installation process (here, state.busy = false and all the stuff has been injected).
      // So to be on the safe side, let's check for each thing before removing.

      // We need to remove the event listeners, because otherwise the event might fire on an uninstall element which results in an error when trying to get the state of the element.
      state.onExpandScroll && removeEvent(getExpandElement(element), 'scroll', state.onExpandScroll);
      state.onShrinkScroll && removeEvent(getShrinkElement(element), 'scroll', state.onShrinkScroll);
      state.onAnimationStart && removeEvent(state.container, 'animationstart', state.onAnimationStart);

      state.container && element.removeChild(state.container);
    }

    return {
      makeDetectable: makeDetectable,
      addListener: addListener,
      uninstall: uninstall,
    };
  };

  var forEach$1 = collectionUtils.forEach;

  //Detection strategies.

  function isCollection(obj) {
    return Array.isArray(obj) || obj.length !== undefined;
  }

  function toArray(collection) {
    if (!Array.isArray(collection)) {
      var array = [];
      forEach$1(collection, function(obj) {
        array.push(obj);
      });
      return array;
    } else {
      return collection;
    }
  }

  function isElement(obj) {
    return obj && obj.nodeType === 1;
  }

  /**
   * @typedef idHandler
   * @type {object}
   * @property {function} get Gets the resize detector id of the element.
   * @property {function} set Generate and sets the resize detector id of the element.
   */

  /**
	 * @typedef Options
	 * @type {object}
	 * @property {boolean} callOnAdd    Determines if listeners should be called when they are getting added.
	                                    Default is true. If true, the listener is guaranteed to be called when it has been added.
	                                    If false, the listener will not be guarenteed to be called when it has been added (does not prevent it from being called).
	 * @property {idHandler} idHandler  A custom id handler that is responsible for generating, setting and retrieving id's for elements.
	                                    If not provided, a default id handler will be used.
	 * @property {reporter} reporter    A custom reporter that handles reporting logs, warnings and errors.
	                                    If not provided, a default id handler will be used.
	                                    If set to false, then nothing will be reported.
	 * @property {boolean} debug        If set to true, the the system will report debug messages as default for the listenTo method.
	 */

  /**
   * Creates an element resize detector instance.
   * @public
   * @param {Options?} options Optional global options object that will decide how this instance will work.
   */
  var elementResizeDetector = function(options) {
    options = options || {};

    //idHandler is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var idHandler$$1;

    if (options.idHandler) {
      // To maintain compatability with idHandler.get(element, readonly), make sure to wrap the given idHandler
      // so that readonly flag always is true when it's used here. This may be removed next major version bump.
      idHandler$$1 = {
        get: function(element) {
          return options.idHandler.get(element, true);
        },
        set: options.idHandler.set,
      };
    } else {
      var idGenerator$$1 = idGenerator();
      var defaultIdHandler = idHandler({
        idGenerator: idGenerator$$1,
        stateHandler: stateHandler,
      });
      idHandler$$1 = defaultIdHandler;
    }

    //reporter is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var reporter$$1 = options.reporter;

    if (!reporter$$1) {
      //If options.reporter is false, then the reporter should be quiet.
      var quiet = reporter$$1 === false;
      reporter$$1 = reporter(quiet);
    }

    //batchProcessor is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var batchProcessor$$1 = getOption(options, 'batchProcessor', batchProcessor({ reporter: reporter$$1 }));

    //Options to be used as default for the listenTo function.
    var globalOptions = {};
    globalOptions.callOnAdd = !!getOption(options, 'callOnAdd', true);
    globalOptions.debug = !!getOption(options, 'debug', false);

    var eventListenerHandler = listenerHandler(idHandler$$1);
    var elementUtils$$1 = elementUtils({
      stateHandler: stateHandler,
    });

    //The detection strategy to be used.
    var detectionStrategy;
    var desiredStrategy = getOption(options, 'strategy', 'object');
    var strategyOptions = {
      reporter: reporter$$1,
      batchProcessor: batchProcessor$$1,
      stateHandler: stateHandler,
      idHandler: idHandler$$1,
    };

    if (desiredStrategy === 'scroll') {
      if (browserDetector.isLegacyOpera()) {
        reporter$$1.warn('Scroll strategy is not supported on legacy Opera. Changing to object strategy.');
        desiredStrategy = 'object';
      } else if (browserDetector.isIE(9)) {
        reporter$$1.warn('Scroll strategy is not supported on IE9. Changing to object strategy.');
        desiredStrategy = 'object';
      }
    }

    if (desiredStrategy === 'scroll') {
      detectionStrategy = scroll(strategyOptions);
    } else if (desiredStrategy === 'object') {
      detectionStrategy = object(strategyOptions);
    } else {
      throw new Error('Invalid strategy name: ' + desiredStrategy);
    }

    //Calls can be made to listenTo with elements that are still being installed.
    //Also, same elements can occur in the elements list in the listenTo function.
    //With this map, the ready callbacks can be synchronized between the calls
    //so that the ready callback can always be called when an element is ready - even if
    //it wasn't installed from the function itself.
    var onReadyCallbacks = {};

    /**
     * Makes the given elements resize-detectable and starts listening to resize events on the elements. Calls the event callback for each event for each element.
     * @public
     * @param {Options?} options Optional options object. These options will override the global options. Some options may not be overriden, such as idHandler.
     * @param {element[]|element} elements The given array of elements to detect resize events of. Single element is also valid.
     * @param {function} listener The callback to be executed for each resize event for each element.
     */
    function listenTo(options, elements, listener) {
      function onResizeCallback(element) {
        var listeners = eventListenerHandler.get(element);
        forEach$1(listeners, function callListenerProxy(listener) {
          listener(element);
        });
      }

      function addListener(callOnAdd, element, listener) {
        eventListenerHandler.add(element, listener);

        if (callOnAdd) {
          listener(element);
        }
      }

      //Options object may be omitted.
      if (!listener) {
        listener = elements;
        elements = options;
        options = {};
      }

      if (!elements) {
        throw new Error('At least one element required.');
      }

      if (!listener) {
        throw new Error('Listener required.');
      }

      if (isElement(elements)) {
        // A single element has been passed in.
        elements = [elements];
      } else if (isCollection(elements)) {
        // Convert collection to array for plugins.
        // TODO: May want to check so that all the elements in the collection are valid elements.
        elements = toArray(elements);
      } else {
        return reporter$$1.error('Invalid arguments. Must be a DOM element or a collection of DOM elements.');
      }

      var elementsReady = 0;

      var callOnAdd = getOption(options, 'callOnAdd', globalOptions.callOnAdd);
      var onReadyCallback = getOption(options, 'onReady', function noop() {});
      var debug = getOption(options, 'debug', globalOptions.debug);

      forEach$1(elements, function attachListenerToElement(element) {
        if (!stateHandler.getState(element)) {
          stateHandler.initState(element);
          idHandler$$1.set(element);
        }

        var id = idHandler$$1.get(element);

        debug && reporter$$1.log('Attaching listener to element', id, element);

        if (!elementUtils$$1.isDetectable(element)) {
          debug && reporter$$1.log(id, 'Not detectable.');
          if (elementUtils$$1.isBusy(element)) {
            debug && reporter$$1.log(id, 'System busy making it detectable');

            //The element is being prepared to be detectable. Do not make it detectable.
            //Just add the listener, because the element will soon be detectable.
            addListener(callOnAdd, element, listener);
            onReadyCallbacks[id] = onReadyCallbacks[id] || [];
            onReadyCallbacks[id].push(function onReady() {
              elementsReady++;

              if (elementsReady === elements.length) {
                onReadyCallback();
              }
            });
            return;
          }

          debug && reporter$$1.log(id, 'Making detectable...');
          //The element is not prepared to be detectable, so do prepare it and add a listener to it.
          elementUtils$$1.markBusy(element, true);
          return detectionStrategy.makeDetectable({ debug: debug }, element, function onElementDetectable(element) {
            debug && reporter$$1.log(id, 'onElementDetectable');

            if (stateHandler.getState(element)) {
              elementUtils$$1.markAsDetectable(element);
              elementUtils$$1.markBusy(element, false);
              detectionStrategy.addListener(element, onResizeCallback);
              addListener(callOnAdd, element, listener);

              // Since the element size might have changed since the call to "listenTo", we need to check for this change,
              // so that a resize event may be emitted.
              // Having the startSize object is optional (since it does not make sense in some cases such as unrendered elements), so check for its existance before.
              // Also, check the state existance before since the element may have been uninstalled in the installation process.
              var state = stateHandler.getState(element);
              if (state && state.startSize) {
                var width = element.offsetWidth;
                var height = element.offsetHeight;
                if (state.startSize.width !== width || state.startSize.height !== height) {
                  onResizeCallback(element);
                }
              }

              if (onReadyCallbacks[id]) {
                forEach$1(onReadyCallbacks[id], function(callback) {
                  callback();
                });
              }
            } else {
              // The element has been unisntalled before being detectable.
              debug && reporter$$1.log(id, 'Element uninstalled before being detectable.');
            }

            delete onReadyCallbacks[id];

            elementsReady++;
            if (elementsReady === elements.length) {
              onReadyCallback();
            }
          });
        }

        debug && reporter$$1.log(id, 'Already detecable, adding listener.');

        //The element has been prepared to be detectable and is ready to be listened to.
        addListener(callOnAdd, element, listener);
        elementsReady++;
      });

      if (elementsReady === elements.length) {
        onReadyCallback();
      }
    }

    function uninstall(elements) {
      if (!elements) {
        return reporter$$1.error('At least one element is required.');
      }

      if (isElement(elements)) {
        // A single element has been passed in.
        elements = [elements];
      } else if (isCollection(elements)) {
        // Convert collection to array for plugins.
        // TODO: May want to check so that all the elements in the collection are valid elements.
        elements = toArray(elements);
      } else {
        return reporter$$1.error('Invalid arguments. Must be a DOM element or a collection of DOM elements.');
      }

      forEach$1(elements, function(element) {
        eventListenerHandler.removeAllListeners(element);
        detectionStrategy.uninstall(element);
        stateHandler.cleanState(element);
      });
    }

    return {
      listenTo: listenTo,
      removeListener: eventListenerHandler.removeListener,
      removeAllListeners: eventListenerHandler.removeAllListeners,
      uninstall: uninstall,
    };
  };

  function getOption(options, name, defaultValue) {
    var value = options[name];

    if ((value === undefined || value === null) && defaultValue !== undefined) {
      return defaultValue;
    }

    return value;
  }

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
              elementResizeDetector({
                strategy: 'scroll', // <- For ultra performance.
              });
            that.fnResize =
              that.fnResize ||
              lodash_throttle(that.resize, 250, {
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

  return IEcharts;
});
