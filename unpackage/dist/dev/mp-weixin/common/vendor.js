(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue ) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!****************************************!*\
  !*** D:/wxxiaochenxu/text1/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/*!****************************************************!*\
  !*** D:/wxxiaochenxu/text1/echarts/echarts.min.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) { true ? e(exports) : undefined;}(this, function (t) {"use strict";function e(t) {var e = {},i = {},n = t.match(/Firefox\/([\d.]+)/),r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),a = t.match(/Edge\/([\d.]+)/),o = /micromessenger/i.test(t);return n && (i.firefox = !0, i.version = n[1]), r && (i.ie = !0, i.version = r[1]), a && (i.edge = !0, i.version = a[1]), o && (i.weChat = !0), { browser: i, os: e, node: !1, canvasSupported: !!document.createElement("canvas").getContext, svgSupported: "undefined" != typeof SVGRect, touchEventsSupported: "ontouchstart" in window && !i.ie && !i.edge, pointerEventsSupported: "onpointerdown" in window && (i.edge || i.ie && i.version >= 11), domSupported: "undefined" != typeof document };}function i(t, e) {"createCanvas" === t && (cp = null), up[t] = e;}function n(t) {if (null == t || "object" != typeof t) return t;var e = t,i = ip.call(t);if ("[object Array]" === i) {if (!B(t)) {e = [];for (var r = 0, a = t.length; a > r; r++) {e[r] = n(t[r]);}}} else if (ep[i]) {if (!B(t)) {var o = t.constructor;if (t.constructor.from) e = o.from(t);else {e = new o(t.length);for (var r = 0, a = t.length; a > r; r++) {e[r] = n(t[r]);}}}} else if (!tp[i] && !B(t) && !I(t)) {e = {};for (var s in t) {t.hasOwnProperty(s) && (e[s] = n(t[s]));}}return e;}function r(t, e, i) {if (!M(e) || !M(t)) return i ? n(e) : t;for (var a in e) {if (e.hasOwnProperty(a)) {var o = t[a],s = e[a];!M(s) || !M(o) || x(s) || x(o) || I(s) || I(o) || S(s) || S(o) || B(s) || B(o) ? !i && a in t || (t[a] = n(e[a], !0)) : r(o, s, i);}}return t;}function a(t, e) {for (var i = t[0], n = 1, a = t.length; a > n; n++) {i = r(i, t[n], e);}return i;}function o(t, e) {for (var i in e) {e.hasOwnProperty(i) && (t[i] = e[i]);}return t;}function s(t, e, i) {for (var n in e) {e.hasOwnProperty(n) && (i ? null != e[n] : null == t[n]) && (t[n] = e[n]);}return t;}function l() {return cp || (cp = hp().getContext("2d")), cp;}function u(t, e) {if (t) {if (t.indexOf) return t.indexOf(e);for (var i = 0, n = t.length; n > i; i++) {if (t[i] === e) return i;}}return -1;}function h(t, e) {function i() {}var n = t.prototype;i.prototype = e.prototype, t.prototype = new i();for (var r in n) {n.hasOwnProperty(r) && (t.prototype[r] = n[r]);}t.prototype.constructor = t, t.superClass = e;}function c(t, e, i) {t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, s(t, e, i);}function d(t) {return t ? "string" == typeof t ? !1 : "number" == typeof t.length : void 0;}function f(t, e, i) {if (t && e) if (t.forEach && t.forEach === rp) t.forEach(e, i);else if (t.length === +t.length) for (var n = 0, r = t.length; r > n; n++) {e.call(i, t[n], n, t);} else for (var a in t) {t.hasOwnProperty(a) && e.call(i, t[a], a, t);}}function p(t, e, i) {if (t && e) {if (t.map && t.map === sp) return t.map(e, i);for (var n = [], r = 0, a = t.length; a > r; r++) {n.push(e.call(i, t[r], r, t));}return n;}}function g(t, e, i, n) {if (t && e) {if (t.reduce && t.reduce === lp) return t.reduce(e, i, n);for (var r = 0, a = t.length; a > r; r++) {i = e.call(n, i, t[r], r, t);}return i;}}function v(t, e, i) {if (t && e) {if (t.filter && t.filter === ap) return t.filter(e, i);for (var n = [], r = 0, a = t.length; a > r; r++) {e.call(i, t[r], r, t) && n.push(t[r]);}return n;}}function m(t, e, i) {if (t && e) for (var n = 0, r = t.length; r > n; n++) {if (e.call(i, t[n], n, t)) return t[n];}}function y(t, e) {var i = op.call(arguments, 2);return function () {return t.apply(e, i.concat(op.call(arguments)));};}function _(t) {var e = op.call(arguments, 1);return function () {return t.apply(this, e.concat(op.call(arguments)));};}function x(t) {return "[object Array]" === ip.call(t);}function w(t) {return "function" == typeof t;}function b(t) {return "[object String]" === ip.call(t);}function M(t) {var e = typeof t;return "function" === e || !!t && "object" === e;}function S(t) {return !!tp[ip.call(t)];}function T(t) {return !!ep[ip.call(t)];}function I(t) {return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument;}function C(t) {return t !== t;}function D() {for (var t = 0, e = arguments.length; e > t; t++) {if (null != arguments[t]) return arguments[t];}}function k(t, e) {return null != t ? t : e;}function A(t, e, i) {return null != t ? t : null != e ? e : i;}function P() {return Function.call.apply(op, arguments);}function L(t) {if ("number" == typeof t) return [t, t, t, t];var e = t.length;return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t;}function O(t, e) {if (!t) throw new Error(e);}function R(t) {return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");}function z(t) {t[dp] = !0;}function B(t) {return t[dp];}function E(t) {function e(t, e) {i ? n.set(t, e) : n.set(e, t);}var i = x(t);this.data = {};var n = this;t instanceof E ? t.each(e) : t && f(t, e);}function N(t) {return new E(t);}function F(t, e) {for (var i = new t.constructor(t.length + e.length), n = 0; n < t.length; n++) {i[n] = t[n];}var r = t.length;for (n = 0; n < e.length; n++) {i[n + r] = e[n];}return i;}function V() {}function H(t, e) {var i = new pp(2);return null == t && (t = 0), null == e && (e = 0), i[0] = t, i[1] = e, i;}function W(t, e) {return t[0] = e[0], t[1] = e[1], t;}function G(t) {var e = new pp(2);return e[0] = t[0], e[1] = t[1], e;}function X(t, e, i) {return t[0] = e, t[1] = i, t;}function Y(t, e, i) {return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t;}function U(t, e, i, n) {return t[0] = e[0] + i[0] * n, t[1] = e[1] + i[1] * n, t;}function q(t, e, i) {return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t;}function j(t) {return Math.sqrt(Z(t));}function Z(t) {return t[0] * t[0] + t[1] * t[1];}function K(t, e, i) {return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t;}function $(t, e, i) {return t[0] = e[0] / i[0], t[1] = e[1] / i[1], t;}function Q(t, e) {return t[0] * e[0] + t[1] * e[1];}function J(t, e, i) {return t[0] = e[0] * i, t[1] = e[1] * i, t;}function te(t, e) {var i = j(e);return 0 === i ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / i, t[1] = e[1] / i), t;}function ee(t, e) {return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));}function ie(t, e) {return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);}function ne(t, e) {return t[0] = -e[0], t[1] = -e[1], t;}function re(t, e, i, n) {return t[0] = e[0] + n * (i[0] - e[0]), t[1] = e[1] + n * (i[1] - e[1]), t;}function ae(t, e, i) {var n = e[0],r = e[1];return t[0] = i[0] * n + i[2] * r + i[4], t[1] = i[1] * n + i[3] * r + i[5], t;}function oe(t, e, i) {return t[0] = Math.min(e[0], i[0]), t[1] = Math.min(e[1], i[1]), t;}function se(t, e, i) {return t[0] = Math.max(e[0], i[0]), t[1] = Math.max(e[1], i[1]), t;}function le() {this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this);}function ue(t, e) {return { target: t, topTarget: e && e.topTarget };}function he(t, e) {var i = t._$eventProcessor;return null != e && i && i.normalizeQuery && (e = i.normalizeQuery(e)), e;}function ce(t, e, i, n, r, a) {var o = t._$handlers;if ("function" == typeof i && (r = n, n = i, i = null), !n || !e) return t;i = he(t, i), o[e] || (o[e] = []);for (var s = 0; s < o[e].length; s++) {if (o[e][s].h === n) return t;}var l = { h: n, one: a, query: i, ctx: r || t, callAtLast: n.zrEventfulCallAtLast },u = o[e].length - 1,h = o[e][u];return h && h.callAtLast ? o[e].splice(u, 0, l) : o[e].push(l), t;}function de(t, e, i, n, r, a) {var o = n + "-" + r,s = t.length;if (a.hasOwnProperty(o)) return a[o];if (1 === e) {var l = Math.round(Math.log((1 << s) - 1 & ~r) / bp);return t[i][l];}for (var u = n | 1 << i, h = i + 1; n & 1 << h;) {h++;}for (var c = 0, d = 0, f = 0; s > d; d++) {var p = 1 << d;p & r || (c += (f % 2 ? -1 : 1) * t[i][d] * de(t, e - 1, h, u, r | p, a), f++);}return a[o] = c, c;}function fe(t, e) {var i = [[t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]], [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]], [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]], [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]], [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]], [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]], [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]], [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]]],n = {},r = de(i, 8, 0, 0, 0, n);if (0 !== r) {for (var a = [], o = 0; 8 > o; o++) {for (var s = 0; 8 > s; s++) {null == a[s] && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * de(i, 7, 0 === o ? 1 : 0, 1 << o, 1 << s, n) / r * e[o];}}return function (t, e, i) {var n = e * a[6] + i * a[7] + 1;t[0] = (e * a[0] + i * a[1] + a[2]) / n, t[1] = (e * a[3] + i * a[4] + a[5]) / n;};}}function pe(t, e, i, n, r) {return ge(Sp, e, n, r, !0) && ge(t, i, Sp[0], Sp[1]);}function ge(t, e, i, n, r) {if (e.getBoundingClientRect && Jf.domSupported && !ye(e)) {var a = e[Mp] || (e[Mp] = {}),o = ve(e, a),s = me(o, a, r);if (s) return s(t, i, n), !0;}return !1;}function ve(t, e) {var i = e.markers;if (i) return i;i = e.markers = [];for (var n = ["left", "right"], r = ["top", "bottom"], a = 0; 4 > a; a++) {var o = document.createElement("div"),s = o.style,l = a % 2,u = (a >> 1) % 2;s.cssText = ["position: absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "user-select: none", "width:0", "height:0", n[l] + ":0", r[u] + ":0", n[1 - l] + ":auto", r[1 - u] + ":auto", ""].join("!important;"), t.appendChild(o), i.push(o);}return i;}function me(t, e, i) {for (var n = i ? "invTrans" : "trans", r = e[n], a = e.srcCoords, o = !0, s = [], l = [], u = 0; 4 > u; u++) {var h = t[u].getBoundingClientRect(),c = 2 * u,d = h.left,f = h.top;s.push(d, f), o = o && a && d === a[c] && f === a[c + 1], l.push(t[u].offsetLeft, t[u].offsetTop);}return o && r ? r : (e.srcCoords = s, e[n] = i ? fe(l, s) : fe(s, l));}function ye(t) {return "CANVAS" === t.nodeName.toUpperCase();}function _e(t, e, i, n) {return i = i || {}, n || !Jf.canvasSupported ? xe(t, e, i) : Jf.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (i.zrX = e.layerX, i.zrY = e.layerY) : null != e.offsetX ? (i.zrX = e.offsetX, i.zrY = e.offsetY) : xe(t, e, i), i;}function xe(t, e, i) {if (Jf.domSupported && t.getBoundingClientRect) {var n = e.clientX,r = e.clientY;if (ye(t)) {var a = t.getBoundingClientRect();return i.zrX = n - a.left, void (i.zrY = r - a.top);}if (ge(Cp, t, n, r)) return i.zrX = Cp[0], void (i.zrY = Cp[1]);}i.zrX = i.zrY = 0;}function we(t) {return t || window.event;}function be(t, e, i) {if (e = we(e), null != e.zrX) return e;var n = e.type,r = n && n.indexOf("touch") >= 0;if (r) {var a = "touchend" !== n ? e.targetTouches[0] : e.changedTouches[0];a && _e(t, a, e, i);} else _e(t, e, e, i), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;var o = e.button;return null == e.which && void 0 !== o && Ip.test(e.type) && (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e;}function Me(t, e, i, n) {Tp ? t.addEventListener(e, i, n) : t.attachEvent("on" + e, i);}function Se(t, e, i, n) {Tp ? t.removeEventListener(e, i, n) : t.detachEvent("on" + e, i);}function Te(t) {return 2 === t.which || 3 === t.which;}function Ie(t) {var e = t[1][0] - t[0][0],i = t[1][1] - t[0][1];return Math.sqrt(e * e + i * i);}function Ce(t) {return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2];}function De(t, e, i) {return { type: t, event: i, target: e.target, topTarget: e.topTarget, cancelBubble: !1, offsetX: i.zrX, offsetY: i.zrY, gestureEvent: i.gestureEvent, pinchX: i.pinchX, pinchY: i.pinchY, pinchScale: i.pinchScale, wheelDelta: i.zrDelta, zrByTouch: i.zrByTouch, which: i.which, stop: ke };}function ke() {Dp(this.event);}function Ae() {}function Pe(t, e, i) {if (t[t.rectHover ? "rectContain" : "contain"](e, i)) {for (var n, r = t; r;) {if (r.clipPath && !r.clipPath.contain(e, i)) return !1;r.silent && (n = !0), r = r.parent;}return n ? Pp : !0;}return !1;}function Le(t, e, i) {var n = t.painter;return 0 > e || e > n.getWidth() || 0 > i || i > n.getHeight();}function Oe() {var t = new Rp(6);return Re(t), t;}function Re(t) {return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;}function ze(t, e) {return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;}function Be(t, e, i) {var n = e[0] * i[0] + e[2] * i[1],r = e[1] * i[0] + e[3] * i[1],a = e[0] * i[2] + e[2] * i[3],o = e[1] * i[2] + e[3] * i[3],s = e[0] * i[4] + e[2] * i[5] + e[4],l = e[1] * i[4] + e[3] * i[5] + e[5];return t[0] = n, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t;}function Ee(t, e, i) {return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + i[0], t[5] = e[5] + i[1], t;}function Ne(t, e, i) {var n = e[0],r = e[2],a = e[4],o = e[1],s = e[3],l = e[5],u = Math.sin(i),h = Math.cos(i);return t[0] = n * h + o * u, t[1] = -n * u + o * h, t[2] = r * h + s * u, t[3] = -r * u + h * s, t[4] = h * a + u * l, t[5] = h * l - u * a, t;}function Fe(t, e, i) {var n = i[0],r = i[1];return t[0] = e[0] * n, t[1] = e[1] * r, t[2] = e[2] * n, t[3] = e[3] * r, t[4] = e[4] * n, t[5] = e[5] * r, t;}function Ve(t, e) {var i = e[0],n = e[2],r = e[4],a = e[1],o = e[3],s = e[5],l = i * o - a * n;return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -n * l, t[3] = i * l, t[4] = (n * s - o * r) * l, t[5] = (a * r - i * s) * l, t) : null;}function He(t) {var e = Oe();return ze(e, t), e;}function We(t) {return t > Ep || -Ep > t;}function Ge(t) {this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null == t.loop ? !1 : t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1;}function Xe(t) {return t = Math.round(t), 0 > t ? 0 : t > 255 ? 255 : t;}function Ye(t) {return t = Math.round(t), 0 > t ? 0 : t > 360 ? 360 : t;}function Ue(t) {return 0 > t ? 0 : t > 1 ? 1 : t;}function qe(t) {return Xe(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10));}function je(t) {return Ue(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t));}function Ze(t, e, i) {return 0 > i ? i += 1 : i > 1 && (i -= 1), 1 > 6 * i ? t + (e - t) * i * 6 : 1 > 2 * i ? e : 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t;}function Ke(t, e, i) {return t + (e - t) * i;}function $e(t, e, i, n, r) {return t[0] = e, t[1] = i, t[2] = n, t[3] = r, t;}function Qe(t, e) {return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;}function Je(t, e) {$p && Qe($p, e), $p = Kp.put(t, $p || e.slice());}function ti(t, e) {if (t) {e = e || [];var i = Kp.get(t);if (i) return Qe(e, i);t += "";var n = t.replace(/ /g, "").toLowerCase();if (n in Zp) return Qe(e, Zp[n]), Je(t, e), e;if ("#" !== n.charAt(0)) {var r = n.indexOf("("),a = n.indexOf(")");if (-1 !== r && a + 1 === n.length) {var o = n.substr(0, r),s = n.substr(r + 1, a - (r + 1)).split(","),l = 1;switch (o) {case "rgba":if (4 !== s.length) return void $e(e, 0, 0, 0, 1);l = je(s.pop());case "rgb":return 3 !== s.length ? void $e(e, 0, 0, 0, 1) : ($e(e, qe(s[0]), qe(s[1]), qe(s[2]), l), Je(t, e), e);case "hsla":return 4 !== s.length ? void $e(e, 0, 0, 0, 1) : (s[3] = je(s[3]), ei(s, e), Je(t, e), e);case "hsl":return 3 !== s.length ? void $e(e, 0, 0, 0, 1) : (ei(s, e), Je(t, e), e);default:return;}}$e(e, 0, 0, 0, 1);} else {if (4 === n.length) {var u = parseInt(n.substr(1), 16);return u >= 0 && 4095 >= u ? ($e(e, (3840 & u) >> 4 | (3840 & u) >> 8, 240 & u | (240 & u) >> 4, 15 & u | (15 & u) << 4, 1), Je(t, e), e) : void $e(e, 0, 0, 0, 1);}if (7 === n.length) {var u = parseInt(n.substr(1), 16);return u >= 0 && 16777215 >= u ? ($e(e, (16711680 & u) >> 16, (65280 & u) >> 8, 255 & u, 1), Je(t, e), e) : void $e(e, 0, 0, 0, 1);}}}}function ei(t, e) {var i = (parseFloat(t[0]) % 360 + 360) % 360 / 360,n = je(t[1]),r = je(t[2]),a = .5 >= r ? r * (n + 1) : r + n - r * n,o = 2 * r - a;return e = e || [], $e(e, Xe(255 * Ze(o, a, i + 1 / 3)), Xe(255 * Ze(o, a, i)), Xe(255 * Ze(o, a, i - 1 / 3)), 1), 4 === t.length && (e[3] = t[3]), e;}function ii(t) {if (t) {var e,i,n = t[0] / 255,r = t[1] / 255,a = t[2] / 255,o = Math.min(n, r, a),s = Math.max(n, r, a),l = s - o,u = (s + o) / 2;if (0 === l) e = 0, i = 0;else {i = .5 > u ? l / (s + o) : l / (2 - s - o);var h = ((s - n) / 6 + l / 2) / l,c = ((s - r) / 6 + l / 2) / l,d = ((s - a) / 6 + l / 2) / l;n === s ? e = d - c : r === s ? e = 1 / 3 + h - d : a === s && (e = 2 / 3 + c - h), 0 > e && (e += 1), e > 1 && (e -= 1);}var f = [360 * e, i, u];return null != t[3] && f.push(t[3]), f;}}function ni(t, e) {var i = ti(t);if (i) {for (var n = 0; 3 > n; n++) {i[n] = 0 > e ? i[n] * (1 - e) | 0 : (255 - i[n]) * e + i[n] | 0, i[n] > 255 ? i[n] = 255 : t[n] < 0 && (i[n] = 0);}return ui(i, 4 === i.length ? "rgba" : "rgb");}}function ri(t) {var e = ti(t);return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0;}function ai(t, e, i) {if (e && e.length && t >= 0 && 1 >= t) {i = i || [];var n = t * (e.length - 1),r = Math.floor(n),a = Math.ceil(n),o = e[r],s = e[a],l = n - r;return i[0] = Xe(Ke(o[0], s[0], l)), i[1] = Xe(Ke(o[1], s[1], l)), i[2] = Xe(Ke(o[2], s[2], l)), i[3] = Ue(Ke(o[3], s[3], l)), i;}}function oi(t, e, i) {if (e && e.length && t >= 0 && 1 >= t) {var n = t * (e.length - 1),r = Math.floor(n),a = Math.ceil(n),o = ti(e[r]),s = ti(e[a]),l = n - r,u = ui([Xe(Ke(o[0], s[0], l)), Xe(Ke(o[1], s[1], l)), Xe(Ke(o[2], s[2], l)), Ue(Ke(o[3], s[3], l))], "rgba");return i ? { color: u, leftIndex: r, rightIndex: a, value: n } : u;}}function si(t, e, i, n) {return t = ti(t), t ? (t = ii(t), null != e && (t[0] = Ye(e)), null != i && (t[1] = je(i)), null != n && (t[2] = je(n)), ui(ei(t), "rgba")) : void 0;}function li(t, e) {return t = ti(t), t && null != e ? (t[3] = Ue(e), ui(t, "rgba")) : void 0;}function ui(t, e) {if (t && t.length) {var i = t[0] + "," + t[1] + "," + t[2];return ("rgba" === e || "hsva" === e || "hsla" === e) && (i += "," + t[3]), e + "(" + i + ")";}}function hi(t, e) {return t[e];}function ci(t, e, i) {t[e] = i;}function di(t, e, i) {return (e - t) * i + t;}function fi(t, e, i) {return i > .5 ? e : t;}function pi(t, e, i, n, r) {var a = t.length;if (1 === r) for (var o = 0; a > o; o++) {n[o] = di(t[o], e[o], i);} else for (var s = a && t[0].length, o = 0; a > o; o++) {for (var l = 0; s > l; l++) {n[o][l] = di(t[o][l], e[o][l], i);}}}function gi(t, e, i) {var n = t.length,r = e.length;if (n !== r) {var a = n > r;if (a) t.length = r;else for (var o = n; r > o; o++) {t.push(1 === i ? e[o] : eg.call(e[o]));}}for (var s = t[0] && t[0].length, o = 0; o < t.length; o++) {if (1 === i) isNaN(t[o]) && (t[o] = e[o]);else for (var l = 0; s > l; l++) {isNaN(t[o][l]) && (t[o][l] = e[o][l]);}}}function vi(t, e, i) {if (t === e) return !0;var n = t.length;if (n !== e.length) return !1;if (1 === i) {for (var r = 0; n > r; r++) {if (t[r] !== e[r]) return !1;}} else for (var a = t[0].length, r = 0; n > r; r++) {for (var o = 0; a > o; o++) {if (t[r][o] !== e[r][o]) return !1;}}return !0;}function mi(t, e, i, n, r, a, o, s, l) {var u = t.length;if (1 === l) for (var h = 0; u > h; h++) {s[h] = yi(t[h], e[h], i[h], n[h], r, a, o);} else for (var c = t[0].length, h = 0; u > h; h++) {for (var d = 0; c > d; d++) {s[h][d] = yi(t[h][d], e[h][d], i[h][d], n[h][d], r, a, o);}}}function yi(t, e, i, n, r, a, o) {var s = .5 * (i - t),l = .5 * (n - e);return (2 * (e - i) + s + l) * o + (-3 * (e - i) - 2 * s - l) * a + s * r + e;}function _i(t) {if (d(t)) {var e = t.length;if (d(t[0])) {for (var i = [], n = 0; e > n; n++) {i.push(eg.call(t[n]));}return i;}return eg.call(t);}return t;}function xi(t) {return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")";}function wi(t) {var e = t[t.length - 1].value;return d(e && e[0]) ? 2 : 1;}function bi(t, e, i, n, r, a) {var o = t._getter,s = t._setter,l = "spline" === e,u = n.length;if (u) {var h,c = n[0].value,f = d(c),p = !1,g = !1,v = f ? wi(n) : 0;n.sort(function (t, e) {return t.time - e.time;}), h = n[u - 1].time;for (var m = [], y = [], _ = n[0].value, x = !0, w = 0; u > w; w++) {m.push(n[w].time / h);var b = n[w].value;if (f && vi(b, _, v) || !f && b === _ || (x = !1), _ = b, "string" == typeof b) {var M = ti(b);M ? (b = M, p = !0) : g = !0;}y.push(b);}if (a || !x) {for (var S = y[u - 1], w = 0; u - 1 > w; w++) {f ? gi(y[w], S, v) : !isNaN(y[w]) || isNaN(S) || g || p || (y[w] = S);}f && gi(o(t._target, r), S, v);var T,I,C,D,k,A,P = 0,L = 0;if (p) var O = [0, 0, 0, 0];var R = function R(t, e) {var i;if (0 > e) i = 0;else if (L > e) {for (T = Math.min(P + 1, u - 1), i = T; i >= 0 && !(m[i] <= e); i--) {;}i = Math.min(i, u - 2);} else {for (i = P; u > i && !(m[i] > e); i++) {;}i = Math.min(i - 1, u - 2);}P = i, L = e;var n = m[i + 1] - m[i];if (0 !== n) if (I = (e - m[i]) / n, l) {if (D = y[i], C = y[0 === i ? i : i - 1], k = y[i > u - 2 ? u - 1 : i + 1], A = y[i > u - 3 ? u - 1 : i + 2], f) mi(C, D, k, A, I, I * I, I * I * I, o(t, r), v);else {var a;if (p) a = mi(C, D, k, A, I, I * I, I * I * I, O, 1), a = xi(O);else {if (g) return fi(D, k, I);a = yi(C, D, k, A, I, I * I, I * I * I);}s(t, r, a);}} else if (f) pi(y[i], y[i + 1], I, o(t, r), v);else {var a;if (p) pi(y[i], y[i + 1], I, O, 1), a = xi(O);else {if (g) return fi(y[i], y[i + 1], I);a = di(y[i], y[i + 1], I);}s(t, r, a);}},z = new Ge({ target: t._target, life: h, loop: t._loop, delay: t._delay, onframe: R, ondestroy: i });return e && "spline" !== e && (z.easing = e), z;}}}function Mi(t, e, i, n, r, a, o, s) {function l() {h--, h || a && a();}b(n) ? (a = r, r = n, n = 0) : w(r) ? (a = r, r = "linear", n = 0) : w(n) ? (a = n, n = 0) : w(i) ? (a = i, i = 500) : i || (i = 500), t.stopAnimation(), Si(t, "", t, e, i, n, s);var u = t.animators.slice(),h = u.length;h || a && a();for (var c = 0; c < u.length; c++) {u[c].done(l).start(r, o);}}function Si(t, e, i, n, r, a, o) {var s = {},l = 0;for (var u in n) {n.hasOwnProperty(u) && (null != i[u] ? M(n[u]) && !d(n[u]) ? Si(t, e ? e + "." + u : u, i[u], n[u], r, a, o) : (o ? (s[u] = i[u], Ti(t, e, u, n[u])) : s[u] = n[u], l++) : null == n[u] || o || Ti(t, e, u, n[u]));}l > 0 && t.animate(e, !1).when(null == r ? 500 : r, s).delay(a || 0);}function Ti(t, e, i, n) {if (e) {var r = {};r[e] = {}, r[e][i] = n, t.attr(r);} else t.attr(i, n);}function Ii(t, e, i, n) {0 > i && (t += i, i = -i), 0 > n && (e += n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n;}function Ci(t) {for (var e = 0; t >= pg;) {e |= 1 & t, t >>= 1;}return t + e;}function Di(t, e, i, n) {var r = e + 1;if (r === i) return 1;if (n(t[r++], t[e]) < 0) {for (; i > r && n(t[r], t[r - 1]) < 0;) {r++;}ki(t, e, r);} else for (; i > r && n(t[r], t[r - 1]) >= 0;) {r++;}return r - e;}function ki(t, e, i) {for (i--; i > e;) {var n = t[e];t[e++] = t[i], t[i--] = n;}}function Ai(t, e, i, n, r) {for (n === e && n++; i > n; n++) {for (var a, o = t[n], s = e, l = n; l > s;) {a = s + l >>> 1, r(o, t[a]) < 0 ? l = a : s = a + 1;}var u = n - s;switch (u) {case 3:t[s + 3] = t[s + 2];case 2:t[s + 2] = t[s + 1];case 1:t[s + 1] = t[s];break;default:for (; u > 0;) {t[s + u] = t[s + u - 1], u--;}}t[s] = o;}}function Pi(t, e, i, n, r, a) {var o = 0,s = 0,l = 1;if (a(t, e[i + r]) > 0) {for (s = n - r; s > l && a(t, e[i + r + l]) > 0;) {o = l, l = (l << 1) + 1, 0 >= l && (l = s);}l > s && (l = s), o += r, l += r;} else {for (s = r + 1; s > l && a(t, e[i + r - l]) <= 0;) {o = l, l = (l << 1) + 1, 0 >= l && (l = s);}l > s && (l = s);var u = o;o = r - l, l = r - u;}for (o++; l > o;) {var h = o + (l - o >>> 1);a(t, e[i + h]) > 0 ? o = h + 1 : l = h;}return l;}function Li(t, e, i, n, r, a) {var o = 0,s = 0,l = 1;if (a(t, e[i + r]) < 0) {for (s = r + 1; s > l && a(t, e[i + r - l]) < 0;) {o = l, l = (l << 1) + 1, 0 >= l && (l = s);}l > s && (l = s);var u = o;o = r - l, l = r - u;} else {for (s = n - r; s > l && a(t, e[i + r + l]) >= 0;) {o = l, l = (l << 1) + 1, 0 >= l && (l = s);}l > s && (l = s), o += r, l += r;}for (o++; l > o;) {var h = o + (l - o >>> 1);a(t, e[i + h]) < 0 ? l = h : o = h + 1;}return l;}function Oi(t, e) {function i(t, e) {l[c] = t, u[c] = e, c += 1;}function n() {for (; c > 1;) {var t = c - 2;if (t >= 1 && u[t - 1] <= u[t] + u[t + 1] || t >= 2 && u[t - 2] <= u[t] + u[t - 1]) u[t - 1] < u[t + 1] && t--;else if (u[t] > u[t + 1]) break;a(t);}}function r() {for (; c > 1;) {var t = c - 2;t > 0 && u[t - 1] < u[t + 1] && t--, a(t);}}function a(i) {var n = l[i],r = u[i],a = l[i + 1],h = u[i + 1];u[i] = r + h, i === c - 3 && (l[i + 1] = l[i + 2], u[i + 1] = u[i + 2]), c--;var d = Li(t[a], t, n, r, 0, e);n += d, r -= d, 0 !== r && (h = Pi(t[n + r - 1], t, a, h, h - 1, e), 0 !== h && (h >= r ? o(n, r, a, h) : s(n, r, a, h)));}function o(i, n, r, a) {var o = 0;for (o = 0; n > o; o++) {d[o] = t[i + o];}var s = 0,l = r,u = i;if (t[u++] = t[l++], 0 !== --a) {if (1 === n) {for (o = 0; a > o; o++) {t[u + o] = t[l + o];}return void (t[u + a] = d[s]);}for (var c, f, p, g = h;;) {c = 0, f = 0, p = !1;do {if (e(t[l], d[s]) < 0) {if (t[u++] = t[l++], f++, c = 0, 0 === --a) {p = !0;break;}} else if (t[u++] = d[s++], c++, f = 0, 1 === --n) {p = !0;break;}} while (g > (c | f));if (p) break;do {if (c = Li(t[l], d, s, n, 0, e), 0 !== c) {for (o = 0; c > o; o++) {t[u + o] = d[s + o];}if (u += c, s += c, n -= c, 1 >= n) {p = !0;break;}}if (t[u++] = t[l++], 0 === --a) {p = !0;break;}if (f = Pi(d[s], t, l, a, 0, e), 0 !== f) {for (o = 0; f > o; o++) {t[u + o] = t[l + o];}if (u += f, l += f, a -= f, 0 === a) {p = !0;break;}}if (t[u++] = d[s++], 1 === --n) {p = !0;break;}g--;} while (c >= gg || f >= gg);if (p) break;0 > g && (g = 0), g += 2;}if (h = g, 1 > h && (h = 1), 1 === n) {for (o = 0; a > o; o++) {t[u + o] = t[l + o];}t[u + a] = d[s];} else {if (0 === n) throw new Error();for (o = 0; n > o; o++) {t[u + o] = d[s + o];}}} else for (o = 0; n > o; o++) {t[u + o] = d[s + o];}}function s(i, n, r, a) {var o = 0;for (o = 0; a > o; o++) {d[o] = t[r + o];}var s = i + n - 1,l = a - 1,u = r + a - 1,c = 0,f = 0;if (t[u--] = t[s--], 0 !== --n) {if (1 === a) {for (u -= n, s -= n, f = u + 1, c = s + 1, o = n - 1; o >= 0; o--) {t[f + o] = t[c + o];}return void (t[u] = d[l]);}for (var p = h;;) {var g = 0,v = 0,m = !1;do {if (e(d[l], t[s]) < 0) {if (t[u--] = t[s--], g++, v = 0, 0 === --n) {m = !0;break;}} else if (t[u--] = d[l--], v++, g = 0, 1 === --a) {m = !0;break;}} while (p > (g | v));if (m) break;do {if (g = n - Li(d[l], t, i, n, n - 1, e), 0 !== g) {for (u -= g, s -= g, n -= g, f = u + 1, c = s + 1, o = g - 1; o >= 0; o--) {t[f + o] = t[c + o];}if (0 === n) {m = !0;break;}}if (t[u--] = d[l--], 1 === --a) {m = !0;break;}if (v = a - Pi(t[s], d, 0, a, a - 1, e), 0 !== v) {for (u -= v, l -= v, a -= v, f = u + 1, c = l + 1, o = 0; v > o; o++) {t[f + o] = d[c + o];}if (1 >= a) {m = !0;break;}}if (t[u--] = t[s--], 0 === --n) {m = !0;break;}p--;} while (g >= gg || v >= gg);if (m) break;0 > p && (p = 0), p += 2;}if (h = p, 1 > h && (h = 1), 1 === a) {for (u -= n, s -= n, f = u + 1, c = s + 1, o = n - 1; o >= 0; o--) {t[f + o] = t[c + o];}t[u] = d[l];} else {if (0 === a) throw new Error();for (c = u - (a - 1), o = 0; a > o; o++) {t[c + o] = d[o];}}} else for (c = u - (a - 1), o = 0; a > o; o++) {t[c + o] = d[o];}}var l,u,h = gg,c = 0,d = [];l = [], u = [], this.mergeRuns = n, this.forceMergeRuns = r, this.pushRun = i;}function Ri(t, e, i, n) {i || (i = 0), n || (n = t.length);var r = n - i;if (!(2 > r)) {var a = 0;if (pg > r) return a = Di(t, i, n, e), void Ai(t, i, n, i + a, e);var o = new Oi(t, e),s = Ci(r);do {if (a = Di(t, i, n, e), s > a) {var l = r;l > s && (l = s), Ai(t, i, i + l, i + a, e), a = l;}o.pushRun(i, a), o.mergeRuns(), r -= a, i += a;} while (0 !== r);o.forceMergeRuns();}}function zi(t, e) {return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel;}function Bi(t, e, i) {var n = null == e.x ? 0 : e.x,r = null == e.x2 ? 1 : e.x2,a = null == e.y ? 0 : e.y,o = null == e.y2 ? 0 : e.y2;e.global || (n = n * i.width + i.x, r = r * i.width + i.x, a = a * i.height + i.y, o = o * i.height + i.y), n = isNaN(n) ? 0 : n, r = isNaN(r) ? 1 : r, a = isNaN(a) ? 0 : a, o = isNaN(o) ? 0 : o;var s = t.createLinearGradient(n, a, r, o);return s;}function Ei(t, e, i) {var n = i.width,r = i.height,a = Math.min(n, r),o = null == e.x ? .5 : e.x,s = null == e.y ? .5 : e.y,l = null == e.r ? .5 : e.r;e.global || (o = o * n + i.x, s = s * r + i.y, l *= a);var u = t.createRadialGradient(o, s, 0, o, s, l);return u;}function Ni() {return !1;}function Fi(t, e, i) {var n = hp(),r = e.getWidth(),a = e.getHeight(),o = n.style;return o && (o.position = "absolute", o.left = 0, o.top = 0, o.width = r + "px", o.height = a + "px", n.setAttribute("data-zr-dom-id", t)), n.width = r * i, n.height = a * i, n;}function Vi(t) {if ("string" == typeof t) {var e = kg.get(t);return e && e.image;}return t;}function Hi(t, e, i, n, r) {if (t) {if ("string" == typeof t) {if (e && e.__zrImageSrc === t || !i) return e;var a = kg.get(t),o = { hostEl: i, cb: n, cbPayload: r };return a ? (e = a.image, !Gi(e) && a.pending.push(o)) : (e = new Image(), e.onload = e.onerror = Wi, kg.put(t, e.__cachedImgObj = { image: e, pending: [o] }), e.src = e.__zrImageSrc = t), e;}return t;}return e;}function Wi() {var t = this.__cachedImgObj;this.onload = this.onerror = this.__cachedImgObj = null;for (var e = 0; e < t.pending.length; e++) {var i = t.pending[e],n = i.cb;n && n(this, i.cbPayload), i.hostEl.dirty();}t.pending.length = 0;}function Gi(t) {return t && t.width && t.height;}function Xi(t, e) {e = e || Rg;var i = t + ":" + e;if (Ag[i]) return Ag[i];for (var n = (t + "").split("\n"), r = 0, a = 0, o = n.length; o > a; a++) {r = Math.max(nn(n[a], e).width, r);}return Pg > Lg && (Pg = 0, Ag = {}), Pg++, Ag[i] = r, r;}function Yi(t, e, i, n, r, a, o, s) {return o ? qi(t, e, i, n, r, a, o, s) : Ui(t, e, i, n, r, a, s);}function Ui(t, e, i, n, r, a, o) {var s = rn(t, e, r, a, o),l = Xi(t, e);r && (l += r[1] + r[3]);var u = s.outerHeight,h = ji(0, l, i),c = Zi(0, u, n),d = new Ii(h, c, l, u);return d.lineHeight = s.lineHeight, d;}function qi(t, e, i, n, r, a, o, s) {var l = an(t, { rich: o, truncate: s, font: e, textAlign: i, textPadding: r, textLineHeight: a }),u = l.outerWidth,h = l.outerHeight,c = ji(0, u, i),d = Zi(0, h, n);return new Ii(c, d, u, h);}function ji(t, e, i) {return "right" === i ? t -= e : "center" === i && (t -= e / 2), t;}function Zi(t, e, i) {return "middle" === i ? t -= e / 2 : "bottom" === i && (t -= e), t;}function Ki(t, e, i) {var n = e.textPosition,r = e.textDistance,a = i.x,o = i.y;r = r || 0;var s = i.height,l = i.width,u = s / 2,h = "left",c = "top";switch (n) {case "left":a -= r, o += u, h = "right", c = "middle";break;case "right":a += r + l, o += u, c = "middle";break;case "top":a += l / 2, o -= r, h = "center", c = "bottom";break;case "bottom":a += l / 2, o += s + r, h = "center";break;case "inside":a += l / 2, o += u, h = "center", c = "middle";break;case "insideLeft":a += r, o += u, c = "middle";break;case "insideRight":a += l - r, o += u, h = "right", c = "middle";break;case "insideTop":a += l / 2, o += r, h = "center";break;case "insideBottom":a += l / 2, o += s - r, h = "center", c = "bottom";break;case "insideTopLeft":a += r, o += r;break;case "insideTopRight":a += l - r, o += r, h = "right";break;case "insideBottomLeft":a += r, o += s - r, c = "bottom";break;case "insideBottomRight":a += l - r, o += s - r, h = "right", c = "bottom";}return t = t || {}, t.x = a, t.y = o, t.textAlign = h, t.textVerticalAlign = c, t;}function $i(t, e, i, n, r) {if (!e) return "";var a = (t + "").split("\n");r = Qi(e, i, n, r);for (var o = 0, s = a.length; s > o; o++) {a[o] = Ji(a[o], r);}return a.join("\n");}function Qi(t, e, i, n) {n = o({}, n), n.font = e;var i = k(i, "...");n.maxIterations = k(n.maxIterations, 2);var r = n.minChar = k(n.minChar, 0);n.cnCharWidth = Xi("国", e);var a = n.ascCharWidth = Xi("a", e);n.placeholder = k(n.placeholder, "");for (var s = t = Math.max(0, t - 1), l = 0; r > l && s >= a; l++) {s -= a;}var u = Xi(i, e);return u > s && (i = "", u = 0), s = t - u, n.ellipsis = i, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = t, n;}function Ji(t, e) {var i = e.containerWidth,n = e.font,r = e.contentWidth;if (!i) return "";var a = Xi(t, n);if (i >= a) return t;for (var o = 0;; o++) {if (r >= a || o >= e.maxIterations) {t += e.ellipsis;break;}var s = 0 === o ? tn(t, r, e.ascCharWidth, e.cnCharWidth) : a > 0 ? Math.floor(t.length * r / a) : 0;t = t.substr(0, s), a = Xi(t, n);}return "" === t && (t = e.placeholder), t;}function tn(t, e, i, n) {for (var r = 0, a = 0, o = t.length; o > a && e > r; a++) {var s = t.charCodeAt(a);r += s >= 0 && 127 >= s ? i : n;}return a;}function en(t) {return Xi("国", t);}function nn(t, e) {return zg.measureText(t, e);}function rn(t, e, i, n, r) {null != t && (t += "");var a = k(n, en(e)),o = t ? t.split("\n") : [],s = o.length * a,l = s,u = !0;if (i && (l += i[0] + i[2]), t && r) {u = !1;var h = r.outerHeight,c = r.outerWidth;if (null != h && l > h) t = "", o = [];else if (null != c) for (var d = Qi(c - (i ? i[1] + i[3] : 0), e, r.ellipsis, { minChar: r.minChar, placeholder: r.placeholder }), f = 0, p = o.length; p > f; f++) {o[f] = Ji(o[f], d);}}return { lines: o, height: s, outerHeight: l, lineHeight: a, canCacheByTextString: u };}function an(t, e) {var i = { lines: [], width: 0, height: 0 };if (null != t && (t += ""), !t) return i;for (var n, r = Og.lastIndex = 0; null != (n = Og.exec(t));) {var a = n.index;a > r && on(i, t.substring(r, a)), on(i, n[2], n[1]), r = Og.lastIndex;}r < t.length && on(i, t.substring(r, t.length));var o = i.lines,s = 0,l = 0,u = [],h = e.textPadding,c = e.truncate,d = c && c.outerWidth,f = c && c.outerHeight;h && (null != d && (d -= h[1] + h[3]), null != f && (f -= h[0] + h[2]));for (var p = 0; p < o.length; p++) {for (var g = o[p], v = 0, m = 0, y = 0; y < g.tokens.length; y++) {var _ = g.tokens[y],x = _.styleName && e.rich[_.styleName] || {},w = _.textPadding = x.textPadding,b = _.font = x.font || e.font,M = _.textHeight = k(x.textHeight, en(b));if (w && (M += w[0] + w[2]), _.height = M, _.lineHeight = A(x.textLineHeight, e.textLineHeight, M), _.textAlign = x && x.textAlign || e.textAlign, _.textVerticalAlign = x && x.textVerticalAlign || "middle", null != f && s + _.lineHeight > f) return { lines: [], width: 0, height: 0 };_.textWidth = Xi(_.text, b);var S = x.textWidth,T = null == S || "auto" === S;if ("string" == typeof S && "%" === S.charAt(S.length - 1)) _.percentWidth = S, u.push(_), S = 0;else {if (T) {S = _.textWidth;var I = x.textBackgroundColor,C = I && I.image;C && (C = Vi(C), Gi(C) && (S = Math.max(S, C.width * M / C.height)));}var D = w ? w[1] + w[3] : 0;S += D;var P = null != d ? d - m : null;null != P && S > P && (!T || D > P ? (_.text = "", _.textWidth = S = 0) : (_.text = $i(_.text, P - D, b, c.ellipsis, { minChar: c.minChar }), _.textWidth = Xi(_.text, b), S = _.textWidth + D));}m += _.width = S, x && (v = Math.max(v, _.lineHeight));}g.width = m, g.lineHeight = v, s += v, l = Math.max(l, m);}i.outerWidth = i.width = k(e.textWidth, l), i.outerHeight = i.height = k(e.textHeight, s), h && (i.outerWidth += h[1] + h[3], i.outerHeight += h[0] + h[2]);for (var p = 0; p < u.length; p++) {var _ = u[p],L = _.percentWidth;_.width = parseInt(L, 10) / 100 * l;}return i;}function on(t, e, i) {for (var n = "" === e, r = e.split("\n"), a = t.lines, o = 0; o < r.length; o++) {var s = r[o],l = { styleName: i, text: s, isLineHolder: !s && !n };if (o) a.push({ tokens: [l] });else {var u = (a[a.length - 1] || (a[0] = { tokens: [] })).tokens,h = u.length;1 === h && u[0].isLineHolder ? u[0] = l : (s || !h || n) && u.push(l);}}}function sn(t) {var e = (t.fontSize || t.fontFamily) && [t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif"].join(" ");return e && R(e) || t.textFont || t.font;}function ln(t, e) {var i,n,r,a,o = e.x,s = e.y,l = e.width,u = e.height,h = e.r;0 > l && (o += l, l = -l), 0 > u && (s += u, u = -u), "number" == typeof h ? i = n = r = a = h : h instanceof Array ? 1 === h.length ? i = n = r = a = h[0] : 2 === h.length ? (i = r = h[0], n = a = h[1]) : 3 === h.length ? (i = h[0], n = a = h[1], r = h[2]) : (i = h[0], n = h[1], r = h[2], a = h[3]) : i = n = r = a = 0;var c;i + n > l && (c = i + n, i *= l / c, n *= l / c), r + a > l && (c = r + a, r *= l / c, a *= l / c), n + r > u && (c = n + r, n *= u / c, r *= u / c), i + a > u && (c = i + a, i *= u / c, a *= u / c), t.moveTo(o + i, s), t.lineTo(o + l - n, s), 0 !== n && t.arc(o + l - n, s + n, n, -Math.PI / 2, 0), t.lineTo(o + l, s + u - r), 0 !== r && t.arc(o + l - r, s + u - r, r, 0, Math.PI / 2), t.lineTo(o + a, s + u), 0 !== a && t.arc(o + a, s + u - a, a, Math.PI / 2, Math.PI), t.lineTo(o, s + i), 0 !== i && t.arc(o + i, s + i, i, Math.PI, 1.5 * Math.PI);}function un(t) {return hn(t), f(t.rich, hn), t;}function hn(t) {if (t) {t.font = sn(t);var e = t.textAlign;"middle" === e && (e = "center"), t.textAlign = null == e || Eg[e] ? e : "left";var i = t.textVerticalAlign || t.textBaseline;"center" === i && (i = "middle"), t.textVerticalAlign = null == i || Ng[i] ? i : "top";var n = t.textPadding;n && (t.textPadding = L(t.textPadding));}}function cn(t, e, i, n, r, a) {n.rich ? fn(t, e, i, n, r, a) : dn(t, e, i, n, r, a);}function dn(t, e, i, n, r, a) {var o,s = mn(n),l = !1,u = e.__attrCachedBy === _g.PLAIN_TEXT;a !== xg ? (a && (o = a.style, l = !s && u && o), e.__attrCachedBy = s ? _g.NONE : _g.PLAIN_TEXT) : u && (e.__attrCachedBy = _g.NONE);var h = n.font || Bg;l && h === (o.font || Bg) || (e.font = h);var c = t.__computedFont;t.__styleFont !== h && (t.__styleFont = h, c = t.__computedFont = e.font);var d = n.textPadding,f = n.textLineHeight,p = t.__textCotentBlock;(!p || t.__dirtyText) && (p = t.__textCotentBlock = rn(i, c, d, f, n.truncate));var g = p.outerHeight,v = p.lines,m = p.lineHeight,y = xn(Hg, t, n, r),_ = y.baseX,x = y.baseY,w = y.textAlign || "left",b = y.textVerticalAlign;gn(e, n, r, _, x);var M = Zi(x, g, b),S = _,T = M;if (s || d) {var I = Xi(i, c),C = I;d && (C += d[1] + d[3]);var D = ji(_, C, w);s && yn(t, e, n, D, M, C, g), d && (S = Tn(_, w, d), T += d[0]);}e.textAlign = w, e.textBaseline = "middle", e.globalAlpha = n.opacity || 1;for (var k = 0; k < Fg.length; k++) {var A = Fg[k],P = A[0],L = A[1],O = n[P];l && O === o[P] || (e[L] = yg(e, L, O || A[2]));}T += m / 2;var R = n.textStrokeWidth,z = l ? o.textStrokeWidth : null,B = !l || R !== z,E = !l || B || n.textStroke !== o.textStroke,N = bn(n.textStroke, R),F = Mn(n.textFill);if (N && (B && (e.lineWidth = R), E && (e.strokeStyle = N)), F && (l && n.textFill === o.textFill || (e.fillStyle = F)), 1 === v.length) N && e.strokeText(v[0], S, T), F && e.fillText(v[0], S, T);else for (var k = 0; k < v.length; k++) {N && e.strokeText(v[k], S, T), F && e.fillText(v[k], S, T), T += m;}}function fn(t, e, i, n, r, a) {a !== xg && (e.__attrCachedBy = _g.NONE);var o = t.__textCotentBlock;(!o || t.__dirtyText) && (o = t.__textCotentBlock = an(i, n)), pn(t, e, o, n, r);}function pn(t, e, i, n, r) {var a = i.width,o = i.outerWidth,s = i.outerHeight,l = n.textPadding,u = xn(Hg, t, n, r),h = u.baseX,c = u.baseY,d = u.textAlign,f = u.textVerticalAlign;gn(e, n, r, h, c);var p = ji(h, o, d),g = Zi(c, s, f),v = p,m = g;l && (v += l[3], m += l[0]);var y = v + a;mn(n) && yn(t, e, n, p, g, o, s);for (var _ = 0; _ < i.lines.length; _++) {for (var x, w = i.lines[_], b = w.tokens, M = b.length, S = w.lineHeight, T = w.width, I = 0, C = v, D = y, k = M - 1; M > I && (x = b[I], !x.textAlign || "left" === x.textAlign);) {vn(t, e, x, n, S, m, C, "left"), T -= x.width, C += x.width, I++;}for (; k >= 0 && (x = b[k], "right" === x.textAlign);) {vn(t, e, x, n, S, m, D, "right"), T -= x.width, D -= x.width, k--;}for (C += (a - (C - v) - (y - D) - T) / 2; k >= I;) {x = b[I], vn(t, e, x, n, S, m, C + x.width / 2, "center"), C += x.width, I++;}m += S;}}function gn(t, e, i, n, r) {if (i && e.textRotation) {var a = e.textOrigin;"center" === a ? (n = i.width / 2 + i.x, r = i.height / 2 + i.y) : a && (n = a[0] + i.x, r = a[1] + i.y), t.translate(n, r), t.rotate(-e.textRotation), t.translate(-n, -r);}}function vn(t, e, i, n, r, a, o, s) {var l = n.rich[i.styleName] || {};
    l.text = i.text;var u = i.textVerticalAlign,h = a + r / 2;"top" === u ? h = a + i.height / 2 : "bottom" === u && (h = a + r - i.height / 2), !i.isLineHolder && mn(l) && yn(t, e, l, "right" === s ? o - i.width : "center" === s ? o - i.width / 2 : o, h - i.height / 2, i.width, i.height);var c = i.textPadding;c && (o = Tn(o, s, c), h -= i.height / 2 - c[2] - i.textHeight / 2), wn(e, "shadowBlur", A(l.textShadowBlur, n.textShadowBlur, 0)), wn(e, "shadowColor", l.textShadowColor || n.textShadowColor || "transparent"), wn(e, "shadowOffsetX", A(l.textShadowOffsetX, n.textShadowOffsetX, 0)), wn(e, "shadowOffsetY", A(l.textShadowOffsetY, n.textShadowOffsetY, 0)), wn(e, "textAlign", s), wn(e, "textBaseline", "middle"), wn(e, "font", i.font || Bg);var d = bn(l.textStroke || n.textStroke, p),f = Mn(l.textFill || n.textFill),p = k(l.textStrokeWidth, n.textStrokeWidth);d && (wn(e, "lineWidth", p), wn(e, "strokeStyle", d), e.strokeText(i.text, o, h)), f && (wn(e, "fillStyle", f), e.fillText(i.text, o, h));}function mn(t) {return !!(t.textBackgroundColor || t.textBorderWidth && t.textBorderColor);}function yn(t, e, i, n, r, a, o) {var s = i.textBackgroundColor,l = i.textBorderWidth,u = i.textBorderColor,h = b(s);if (wn(e, "shadowBlur", i.textBoxShadowBlur || 0), wn(e, "shadowColor", i.textBoxShadowColor || "transparent"), wn(e, "shadowOffsetX", i.textBoxShadowOffsetX || 0), wn(e, "shadowOffsetY", i.textBoxShadowOffsetY || 0), h || l && u) {e.beginPath();var c = i.textBorderRadius;c ? ln(e, { x: n, y: r, width: a, height: o, r: c }) : e.rect(n, r, a, o), e.closePath();}if (h) {if (wn(e, "fillStyle", s), null != i.fillOpacity) {var d = e.globalAlpha;e.globalAlpha = i.fillOpacity * i.opacity, e.fill(), e.globalAlpha = d;} else e.fill();} else if (M(s)) {var f = s.image;f = Hi(f, null, t, _n, s), f && Gi(f) && e.drawImage(f, n, r, a, o);}if (l && u) if (wn(e, "lineWidth", l), wn(e, "strokeStyle", u), null != i.strokeOpacity) {var d = e.globalAlpha;e.globalAlpha = i.strokeOpacity * i.opacity, e.stroke(), e.globalAlpha = d;} else e.stroke();}function _n(t, e) {e.image = t;}function xn(t, e, i, n) {var r = i.x || 0,a = i.y || 0,o = i.textAlign,s = i.textVerticalAlign;if (n) {var l = i.textPosition;if (l instanceof Array) r = n.x + Sn(l[0], n.width), a = n.y + Sn(l[1], n.height);else {var u = e && e.calculateTextPosition ? e.calculateTextPosition(Vg, i, n) : Ki(Vg, i, n);r = u.x, a = u.y, o = o || u.textAlign, s = s || u.textVerticalAlign;}var h = i.textOffset;h && (r += h[0], a += h[1]);}return t = t || {}, t.baseX = r, t.baseY = a, t.textAlign = o, t.textVerticalAlign = s, t;}function wn(t, e, i) {return t[e] = yg(t, e, i), t[e];}function bn(t, e) {return null == t || 0 >= e || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;}function Mn(t) {return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;}function Sn(t, e) {return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t;}function Tn(t, e, i) {return "right" === e ? t - i[1] : "center" === e ? t + i[3] / 2 - i[1] / 2 : t + i[3];}function In(t, e) {return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding);}function Cn(t) {t = t || {}, ug.call(this, t);for (var e in t) {t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);}this.style = new bg(t.style, this), this._rect = null, this.__clipPaths = null;}function Dn(t) {Cn.call(this, t);}function kn(t) {return parseInt(t, 10);}function An(t) {return t ? t.__builtin__ ? !0 : "function" != typeof t.resize || "function" != typeof t.refresh ? !1 : !0 : !1;}function Pn(t, e, i) {return jg.copy(t.getBoundingRect()), t.transform && jg.applyTransform(t.transform), Zg.width = e, Zg.height = i, !jg.intersect(Zg);}function Ln(t, e) {if (t === e) return !1;if (!t || !e || t.length !== e.length) return !0;for (var i = 0; i < t.length; i++) {if (t[i] !== e[i]) return !0;}return !1;}function On(t, e) {for (var i = 0; i < t.length; i++) {var n = t[i];n.setTransform(e), e.beginPath(), n.buildPath(e, n.shape), e.clip(), n.restoreTransform(e);}}function Rn(t, e) {var i = document.createElement("div");return i.style.cssText = ["position:relative", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", i;}function zn(t) {return "mousewheel" === t && Jf.browser.firefox ? "DOMMouseScroll" : t;}function Bn(t) {var e = t.pointerType;return "pen" === e || "touch" === e;}function En(t) {t.touching = !0, null != t.touchTimer && (clearTimeout(t.touchTimer), t.touchTimer = null), t.touchTimer = setTimeout(function () {t.touching = !1, t.touchTimer = null;}, 700);}function Nn(t) {t && (t.zrByTouch = !0);}function Fn(t, e) {return be(t.dom, new Hn(t, e), !0);}function Vn(t, e) {for (var i = e, n = !1; i && 9 !== i.nodeType && !(n = i.domBelongToZr || i !== e && i === t.painterRoot);) {i = i.parentNode;}return n;}function Hn(t, e) {this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;}function Wn(t, e) {var i = e.domHandlers;Jf.pointerEventsSupported ? f(tv.pointer, function (n) {Xn(e, n, function (e) {i[n].call(t, e);});}) : (Jf.touchEventsSupported && f(tv.touch, function (n) {Xn(e, n, function (r) {i[n].call(t, r), En(e);});}), f(tv.mouse, function (n) {Xn(e, n, function (r) {r = we(r), e.touching || i[n].call(t, r);});}));}function Gn(t, e) {function i(i) {function n(n) {n = we(n), Vn(t, n.target) || (n = Fn(t, n), e.domHandlers[i].call(t, n));}Xn(e, i, n, { capture: !0 });}Jf.pointerEventsSupported ? f(ev.pointer, i) : Jf.touchEventsSupported || f(ev.mouse, i);}function Xn(t, e, i, n) {t.mounted[e] = i, t.listenerOpts[e] = n, Me(t.domTarget, zn(e), i, n);}function Yn(t) {var e = t.mounted;for (var i in e) {e.hasOwnProperty(i) && Se(t.domTarget, zn(i), e[i], t.listenerOpts[i]);}t.mounted = {};}function Un(t, e) {if (t._mayPointerCapture = null, Jg && t._pointerCapturing ^ e) {t._pointerCapturing = e;var i = t._globalHandlerScope;e ? Gn(t, i) : Yn(i);}}function qn(t, e) {this.domTarget = t, this.domHandlers = e, this.mounted = {}, this.listenerOpts = {}, this.touchTimer = null, this.touching = !1;}function jn(t, e) {wp.call(this), this.dom = t, this.painterRoot = e, this._localHandlerScope = new qn(t, nv), Jg && (this._globalHandlerScope = new qn(document, rv)), this._pointerCapturing = !1, this._mayPointerCapture = null, Wn(this, this._localHandlerScope);}function Zn(t, e) {var i = new hv($f(), t, e);return lv[i.id] = i, i;}function Kn(t) {if (t) t.dispose();else {for (var e in lv) {lv.hasOwnProperty(e) && lv[e].dispose();}lv = {};}return this;}function $n(t) {return lv[t];}function Qn(t, e) {sv[t] = e;}function Jn(t) {delete lv[t];}function tr(t) {return t instanceof Array ? t : null == t ? [] : [t];}function er(t, e, i) {if (t) {t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};for (var n = 0, r = i.length; r > n; n++) {var a = i[n];!t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a]);}}}function ir(t) {return !fv(t) || pv(t) || t instanceof Date ? t : t.value;}function nr(t) {return fv(t) && !(t instanceof Array);}function rr(t, e) {e = (e || []).slice();var i = p(t || [], function (t) {return { exist: t };});return dv(e, function (t, n) {if (fv(t)) {for (var r = 0; r < i.length; r++) {if (!i[r].option && null != t.id && i[r].exist.id === t.id + "") return i[r].option = t, void (e[n] = null);}for (var r = 0; r < i.length; r++) {var a = i[r].exist;if (!(i[r].option || null != a.id && null != t.id || null == t.name || sr(t) || sr(a) || a.name !== t.name + "")) return i[r].option = t, void (e[n] = null);}}}), dv(e, function (t) {if (fv(t)) {for (var e = 0; e < i.length; e++) {var n = i[e].exist;if (!i[e].option && !sr(n) && null == t.id) {i[e].option = t;break;}}e >= i.length && i.push({ option: t });}}), i;}function ar(t) {var e = N();dv(t, function (t) {var i = t.exist;i && e.set(i.id, t);}), dv(t, function (t) {var i = t.option;O(!i || null == i.id || !e.get(i.id) || e.get(i.id) === t, "id duplicates: " + (i && i.id)), i && null != i.id && e.set(i.id, t), !t.keyInfo && (t.keyInfo = {});}), dv(t, function (t, i) {var n = t.exist,r = t.option,a = t.keyInfo;if (fv(r)) {if (a.name = null != r.name ? r.name + "" : n ? n.name : gv + i, n) a.id = n.id;else if (null != r.id) a.id = r.id + "";else {var o = 0;do {a.id = "\x00" + a.name + "\x00" + o++;} while (e.get(a.id));}e.set(a.id, t);}});}function or(t) {var e = t.name;return !(!e || !e.indexOf(gv));}function sr(t) {return fv(t) && t.id && 0 === (t.id + "").indexOf("\x00_ec_\x00");}function lr(t, e) {function i(t, e, i) {for (var n = 0, r = t.length; r > n; n++) {for (var a = t[n].seriesId, o = tr(t[n].dataIndex), s = i && i[a], l = 0, u = o.length; u > l; l++) {var h = o[l];s && s[h] ? s[h] = null : (e[a] || (e[a] = {}))[h] = 1;}}}function n(t, e) {var i = [];for (var r in t) {if (t.hasOwnProperty(r) && null != t[r]) if (e) i.push(+r);else {var a = n(t[r], !0);a.length && i.push({ seriesId: r, dataIndex: a });}}return i;}var r = {},a = {};return i(t || [], r), i(e || [], a, r), [n(r), n(a)];}function ur(t, e) {return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? x(e.dataIndex) ? p(e.dataIndex, function (e) {return t.indexOfRawIndex(e);}) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? x(e.name) ? p(e.name, function (e) {return t.indexOfName(e);}) : t.indexOfName(e.name) : void 0;}function hr() {var t = "__\x00ec_inner_" + mv++ + "_" + Math.random().toFixed(5);return function (e) {return e[t] || (e[t] = {});};}function cr(t, e, i) {if (b(e)) {var n = {};n[e + "Index"] = 0, e = n;}var r = i && i.defaultMainType;!r || dr(e, r + "Index") || dr(e, r + "Id") || dr(e, r + "Name") || (e[r + "Index"] = 0);var a = {};return dv(e, function (n, r) {var n = e[r];if ("dataIndex" === r || "dataIndexInside" === r) return void (a[r] = n);var o = r.match(/^(\w+)(Index|Id|Name)$/) || [],s = o[1],l = (o[2] || "").toLowerCase();if (!(!s || !l || null == n || "index" === l && "none" === n || i && i.includeMainTypes && u(i.includeMainTypes, s) < 0)) {var h = { mainType: s };("index" !== l || "all" !== n) && (h[l] = n);var c = t.queryComponents(h);a[s + "Models"] = c, a[s + "Model"] = c[0];}}), a;}function dr(t, e) {return t && t.hasOwnProperty(e);}function fr(t, e, i) {t.setAttribute ? t.setAttribute(e, i) : t[e] = i;}function pr(t, e) {return t.getAttribute ? t.getAttribute(e) : t[e];}function gr(t) {return "auto" === t ? Jf.domSupported ? "html" : "richText" : t || "html";}function vr(t) {var e = { main: "", sub: "" };return t && (t = t.split(yv), e.main = t[0] || "", e.sub = t[1] || ""), e;}function mr(t) {O(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal');}function yr(t) {t.$constructor = t, t.extend = function (t) {var e = this,i = function i() {t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments);};return o(i.prototype, t), i.extend = this.extend, i.superCall = xr, i.superApply = wr, h(i, this), i.superClass = e, i;};}function _r(t) {var e = ["__\x00is_clz", xv++, Math.random().toFixed(3)].join("_");t.prototype[e] = !0, t.isInstance = function (t) {return !(!t || !t[e]);};}function xr(t, e) {var i = P(arguments, 2);return this.superClass.prototype[e].apply(t, i);}function wr(t, e, i) {return this.superClass.prototype[e].apply(t, i);}function br(t, e) {function i(t) {var e = n[t.main];return e && e[_v] || (e = n[t.main] = {}, e[_v] = !0), e;}e = e || {};var n = {};if (t.registerClass = function (t, e) {if (e) if (mr(e), e = vr(e), e.sub) {if (e.sub !== _v) {var r = i(e);r[e.sub] = t;}} else n[e.main] = t;return t;}, t.getClass = function (t, e, i) {var r = n[t];if (r && r[_v] && (r = e ? r[e] : null), i && !r) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");return r;}, t.getClassesByMainType = function (t) {t = vr(t);var e = [],i = n[t.main];return i && i[_v] ? f(i, function (t, i) {i !== _v && e.push(t);}) : e.push(i), e;}, t.hasClass = function (t) {return t = vr(t), !!n[t.main];}, t.getAllClassMainTypes = function () {var t = [];return f(n, function (e, i) {t.push(i);}), t;}, t.hasSubTypes = function (t) {t = vr(t);var e = n[t.main];return e && e[_v];}, t.parseClassType = vr, e.registerWhenExtend) {var r = t.extend;r && (t.extend = function (e) {var i = r.call(this, e);return t.registerClass(i, e.type);});}return t;}function Mr(t) {return t > -Dv && Dv > t;}function Sr(t) {return t > Dv || -Dv > t;}function Tr(t, e, i, n, r) {var a = 1 - r;return a * a * (a * t + 3 * r * e) + r * r * (r * n + 3 * a * i);}function Ir(t, e, i, n, r) {var a = 1 - r;return 3 * (((e - t) * a + 2 * (i - e) * r) * a + (n - i) * r * r);}function Cr(t, e, i, n, r, a) {var o = n + 3 * (e - i) - t,s = 3 * (i - 2 * e + t),l = 3 * (e - t),u = t - r,h = s * s - 3 * o * l,c = s * l - 9 * o * u,d = l * l - 3 * s * u,f = 0;if (Mr(h) && Mr(c)) {if (Mr(s)) a[0] = 0;else {var p = -l / s;p >= 0 && 1 >= p && (a[f++] = p);}} else {var g = c * c - 4 * h * d;if (Mr(g)) {var v = c / h,p = -s / o + v,m = -v / 2;p >= 0 && 1 >= p && (a[f++] = p), m >= 0 && 1 >= m && (a[f++] = m);} else if (g > 0) {var y = Cv(g),_ = h * s + 1.5 * o * (-c + y),x = h * s + 1.5 * o * (-c - y);_ = 0 > _ ? -Iv(-_, Pv) : Iv(_, Pv), x = 0 > x ? -Iv(-x, Pv) : Iv(x, Pv);var p = (-s - (_ + x)) / (3 * o);p >= 0 && 1 >= p && (a[f++] = p);} else {var w = (2 * h * s - 3 * o * c) / (2 * Cv(h * h * h)),b = Math.acos(w) / 3,M = Cv(h),S = Math.cos(b),p = (-s - 2 * M * S) / (3 * o),m = (-s + M * (S + Av * Math.sin(b))) / (3 * o),T = (-s + M * (S - Av * Math.sin(b))) / (3 * o);p >= 0 && 1 >= p && (a[f++] = p), m >= 0 && 1 >= m && (a[f++] = m), T >= 0 && 1 >= T && (a[f++] = T);}}return f;}function Dr(t, e, i, n, r) {var a = 6 * i - 12 * e + 6 * t,o = 9 * e + 3 * n - 3 * t - 9 * i,s = 3 * e - 3 * t,l = 0;if (Mr(o)) {if (Sr(a)) {var u = -s / a;u >= 0 && 1 >= u && (r[l++] = u);}} else {var h = a * a - 4 * o * s;if (Mr(h)) r[0] = -a / (2 * o);else if (h > 0) {var c = Cv(h),u = (-a + c) / (2 * o),d = (-a - c) / (2 * o);u >= 0 && 1 >= u && (r[l++] = u), d >= 0 && 1 >= d && (r[l++] = d);}}return l;}function kr(t, e, i, n, r, a) {var o = (e - t) * r + t,s = (i - e) * r + e,l = (n - i) * r + i,u = (s - o) * r + o,h = (l - s) * r + s,c = (h - u) * r + u;a[0] = t, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = h, a[6] = l, a[7] = n;}function Ar(t, e, i, n, r, a, o, s, l, u, h) {var c,d,f,p,g,v = .005,m = 1 / 0;Lv[0] = l, Lv[1] = u;for (var y = 0; 1 > y; y += .05) {Ov[0] = Tr(t, i, r, o, y), Ov[1] = Tr(e, n, a, s, y), p = yp(Lv, Ov), m > p && (c = y, m = p);}m = 1 / 0;for (var _ = 0; 32 > _ && !(kv > v); _++) {d = c - v, f = c + v, Ov[0] = Tr(t, i, r, o, d), Ov[1] = Tr(e, n, a, s, d), p = yp(Ov, Lv), d >= 0 && m > p ? (c = d, m = p) : (Rv[0] = Tr(t, i, r, o, f), Rv[1] = Tr(e, n, a, s, f), g = yp(Rv, Lv), 1 >= f && m > g ? (c = f, m = g) : v *= .5);}return h && (h[0] = Tr(t, i, r, o, c), h[1] = Tr(e, n, a, s, c)), Cv(m);}function Pr(t, e, i, n) {var r = 1 - n;return r * (r * t + 2 * n * e) + n * n * i;}function Lr(t, e, i, n) {return 2 * ((1 - n) * (e - t) + n * (i - e));}function Or(t, e, i, n, r) {var a = t - 2 * e + i,o = 2 * (e - t),s = t - n,l = 0;if (Mr(a)) {if (Sr(o)) {var u = -s / o;u >= 0 && 1 >= u && (r[l++] = u);}} else {var h = o * o - 4 * a * s;if (Mr(h)) {var u = -o / (2 * a);u >= 0 && 1 >= u && (r[l++] = u);} else if (h > 0) {var c = Cv(h),u = (-o + c) / (2 * a),d = (-o - c) / (2 * a);u >= 0 && 1 >= u && (r[l++] = u), d >= 0 && 1 >= d && (r[l++] = d);}}return l;}function Rr(t, e, i) {var n = t + i - 2 * e;return 0 === n ? .5 : (t - e) / n;}function zr(t, e, i, n, r) {var a = (e - t) * n + t,o = (i - e) * n + e,s = (o - a) * n + a;r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = i;}function Br(t, e, i, n, r, a, o, s, l) {var u,h = .005,c = 1 / 0;Lv[0] = o, Lv[1] = s;for (var d = 0; 1 > d; d += .05) {Ov[0] = Pr(t, i, r, d), Ov[1] = Pr(e, n, a, d);var f = yp(Lv, Ov);c > f && (u = d, c = f);}c = 1 / 0;for (var p = 0; 32 > p && !(kv > h); p++) {var g = u - h,v = u + h;Ov[0] = Pr(t, i, r, g), Ov[1] = Pr(e, n, a, g);var f = yp(Ov, Lv);if (g >= 0 && c > f) u = g, c = f;else {Rv[0] = Pr(t, i, r, v), Rv[1] = Pr(e, n, a, v);var m = yp(Rv, Lv);1 >= v && c > m ? (u = v, c = m) : h *= .5;}}return l && (l[0] = Pr(t, i, r, u), l[1] = Pr(e, n, a, u)), Cv(c);}function Er(t, e, i) {if (0 !== t.length) {var n,r = t[0],a = r[0],o = r[0],s = r[1],l = r[1];for (n = 1; n < t.length; n++) {r = t[n], a = zv(a, r[0]), o = Bv(o, r[0]), s = zv(s, r[1]), l = Bv(l, r[1]);}e[0] = a, e[1] = s, i[0] = o, i[1] = l;}}function Nr(t, e, i, n, r, a) {r[0] = zv(t, i), r[1] = zv(e, n), a[0] = Bv(t, i), a[1] = Bv(e, n);}function Fr(t, e, i, n, r, a, o, s, l, u) {var h,c = Dr,d = Tr,f = c(t, i, r, o, Gv);for (l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0, h = 0; f > h; h++) {var p = d(t, i, r, o, Gv[h]);l[0] = zv(p, l[0]), u[0] = Bv(p, u[0]);}for (f = c(e, n, a, s, Xv), h = 0; f > h; h++) {var g = d(e, n, a, s, Xv[h]);l[1] = zv(g, l[1]), u[1] = Bv(g, u[1]);}l[0] = zv(t, l[0]), u[0] = Bv(t, u[0]), l[0] = zv(o, l[0]), u[0] = Bv(o, u[0]), l[1] = zv(e, l[1]), u[1] = Bv(e, u[1]), l[1] = zv(s, l[1]), u[1] = Bv(s, u[1]);}function Vr(t, e, i, n, r, a, o, s) {var l = Rr,u = Pr,h = Bv(zv(l(t, i, r), 1), 0),c = Bv(zv(l(e, n, a), 1), 0),d = u(t, i, r, h),f = u(e, n, a, c);o[0] = zv(t, r, d), o[1] = zv(e, a, f), s[0] = Bv(t, r, d), s[1] = Bv(e, a, f);}function Hr(t, e, i, n, r, a, o, s, l) {var u = oe,h = se,c = Math.abs(r - a);if (1e-4 > c % Fv && c > 1e-4) return s[0] = t - i, s[1] = e - n, l[0] = t + i, void (l[1] = e + n);if (Vv[0] = Nv(r) * i + t, Vv[1] = Ev(r) * n + e, Hv[0] = Nv(a) * i + t, Hv[1] = Ev(a) * n + e, u(s, Vv, Hv), h(l, Vv, Hv), r %= Fv, 0 > r && (r += Fv), a %= Fv, 0 > a && (a += Fv), r > a && !o ? a += Fv : a > r && o && (r += Fv), o) {var d = a;a = r, r = d;}for (var f = 0; a > f; f += Math.PI / 2) {f > r && (Wv[0] = Nv(f) * i + t, Wv[1] = Ev(f) * n + e, u(s, Wv, s), h(l, Wv, l));}}function Wr(t, e, i, n, r, a, o) {if (0 === r) return !1;var s = r,l = 0,u = t;if (o > e + s && o > n + s || e - s > o && n - s > o || a > t + s && a > i + s || t - s > a && i - s > a) return !1;if (t === i) return Math.abs(a - t) <= s / 2;l = (e - n) / (t - i), u = (t * n - i * e) / (t - i);var h = l * a - o + u,c = h * h / (l * l + 1);return s / 2 * s / 2 >= c;}function Gr(t, e, i, n, r, a, o, s, l, u, h) {if (0 === l) return !1;var c = l;if (h > e + c && h > n + c && h > a + c && h > s + c || e - c > h && n - c > h && a - c > h && s - c > h || u > t + c && u > i + c && u > r + c && u > o + c || t - c > u && i - c > u && r - c > u && o - c > u) return !1;var d = Ar(t, e, i, n, r, a, o, s, u, h, null);return c / 2 >= d;}function Xr(t, e, i, n, r, a, o, s, l) {if (0 === o) return !1;var u = o;if (l > e + u && l > n + u && l > a + u || e - u > l && n - u > l && a - u > l || s > t + u && s > i + u && s > r + u || t - u > s && i - u > s && r - u > s) return !1;var h = Br(t, e, i, n, r, a, s, l, null);return u / 2 >= h;}function Yr(t) {return t %= rm, 0 > t && (t += rm), t;}function Ur(t, e, i, n, r, a, o, s, l) {if (0 === o) return !1;var u = o;s -= t, l -= e;var h = Math.sqrt(s * s + l * l);if (h - u > i || i > h + u) return !1;if (Math.abs(n - r) % am < 1e-4) return !0;if (a) {var c = n;n = Yr(r), r = Yr(c);} else n = Yr(n), r = Yr(r);n > r && (r += am);var d = Math.atan2(l, s);return 0 > d && (d += am), d >= n && r >= d || d + am >= n && r >= d + am;}function qr(t, e, i, n, r, a) {if (a > e && a > n || e > a && n > a) return 0;if (n === e) return 0;var o = e > n ? 1 : -1,s = (a - e) / (n - e);(1 === s || 0 === s) && (o = e > n ? .5 : -.5);var l = s * (i - t) + t;return l === r ? 1 / 0 : l > r ? o : 0;}function jr(t, e) {return Math.abs(t - e) < lm;}function Zr() {var t = hm[0];hm[0] = hm[1], hm[1] = t;}function Kr(t, e, i, n, r, a, o, s, l, u) {if (u > e && u > n && u > a && u > s || e > u && n > u && a > u && s > u) return 0;var h = Cr(e, n, a, s, u, um);if (0 === h) return 0;for (var c, d, f = 0, p = -1, g = 0; h > g; g++) {var v = um[g],m = 0 === v || 1 === v ? .5 : 1,y = Tr(t, i, r, o, v);l > y || (0 > p && (p = Dr(e, n, a, s, hm), hm[1] < hm[0] && p > 1 && Zr(), c = Tr(e, n, a, s, hm[0]), p > 1 && (d = Tr(e, n, a, s, hm[1]))), f += 2 === p ? v < hm[0] ? e > c ? m : -m : v < hm[1] ? c > d ? m : -m : d > s ? m : -m : v < hm[0] ? e > c ? m : -m : c > s ? m : -m);}return f;}function $r(t, e, i, n, r, a, o, s) {if (s > e && s > n && s > a || e > s && n > s && a > s) return 0;var l = Or(e, n, a, s, um);if (0 === l) return 0;var u = Rr(e, n, a);if (u >= 0 && 1 >= u) {for (var h = 0, c = Pr(e, n, a, u), d = 0; l > d; d++) {var f = 0 === um[d] || 1 === um[d] ? .5 : 1,p = Pr(t, i, r, um[d]);o > p || (h += um[d] < u ? e > c ? f : -f : c > a ? f : -f);}return h;}var f = 0 === um[0] || 1 === um[0] ? .5 : 1,p = Pr(t, i, r, um[0]);return o > p ? 0 : e > a ? f : -f;}function Qr(t, e, i, n, r, a, o, s) {if (s -= e, s > i || -i > s) return 0;var l = Math.sqrt(i * i - s * s);um[0] = -l, um[1] = l;var u = Math.abs(n - r);if (1e-4 > u) return 0;if (1e-4 > u % sm) {n = 0, r = sm;var h = a ? 1 : -1;return o >= um[0] + t && o <= um[1] + t ? h : 0;}if (a) {var l = n;n = Yr(r), r = Yr(l);} else n = Yr(n), r = Yr(r);n > r && (r += sm);for (var c = 0, d = 0; 2 > d; d++) {var f = um[d];if (f + t > o) {var p = Math.atan2(s, f),h = a ? 1 : -1;0 > p && (p = sm + p), (p >= n && r >= p || p + sm >= n && r >= p + sm) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (h = -h), c += h);}}return c;}function Jr(t, e, i, n, r) {for (var a = 0, o = 0, s = 0, l = 0, u = 0, h = 0; h < t.length;) {var c = t[h++];switch (c === om.M && h > 1 && (i || (a += qr(o, s, l, u, n, r))), 1 === h && (o = t[h], s = t[h + 1], l = o, u = s), c) {case om.M:l = t[h++], u = t[h++], o = l, s = u;break;case om.L:if (i) {if (Wr(o, s, t[h], t[h + 1], e, n, r)) return !0;} else a += qr(o, s, t[h], t[h + 1], n, r) || 0;o = t[h++], s = t[h++];break;case om.C:if (i) {if (Gr(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], e, n, r)) return !0;} else a += Kr(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], n, r) || 0;o = t[h++], s = t[h++];break;case om.Q:if (i) {if (Xr(o, s, t[h++], t[h++], t[h], t[h + 1], e, n, r)) return !0;} else a += $r(o, s, t[h++], t[h++], t[h], t[h + 1], n, r) || 0;o = t[h++], s = t[h++];break;case om.A:var d = t[h++],f = t[h++],p = t[h++],g = t[h++],v = t[h++],m = t[h++];h += 1;var y = 1 - t[h++],_ = Math.cos(v) * p + d,x = Math.sin(v) * g + f;h > 1 ? a += qr(o, s, _, x, n, r) : (l = _, u = x);var w = (n - d) * g / p + d;if (i) {if (Ur(d, f, g, v, v + m, y, e, w, r)) return !0;} else a += Qr(d, f, g, v, v + m, y, w, r);o = Math.cos(v + m) * p + d, s = Math.sin(v + m) * g + f;break;case om.R:l = o = t[h++], u = s = t[h++];var b = t[h++],M = t[h++],_ = l + b,x = u + M;if (i) {if (Wr(l, u, _, u, e, n, r) || Wr(_, u, _, x, e, n, r) || Wr(_, x, l, x, e, n, r) || Wr(l, x, l, u, e, n, r)) return !0;} else a += qr(_, u, _, x, n, r), a += qr(l, x, l, u, n, r);break;case om.Z:if (i) {if (Wr(o, s, l, u, e, n, r)) return !0;} else a += qr(o, s, l, u, n, r);o = l, s = u;}}return i || jr(s, u) || (a += qr(o, s, l, u, n, r) || 0), 0 !== a;}function ta(t, e, i) {return Jr(t, 0, !1, e, i);}function ea(t, e, i, n) {return Jr(t, e, !0, i, n);}function ia(t) {Cn.call(this, t), this.path = null;}function na(t, e, i, n, r, a, o, s, l, u, h) {var c = l * (bm / 180),d = wm(c) * (t - i) / 2 + xm(c) * (e - n) / 2,f = -1 * xm(c) * (t - i) / 2 + wm(c) * (e - n) / 2,p = d * d / (o * o) + f * f / (s * s);p > 1 && (o *= _m(p), s *= _m(p));var g = (r === a ? -1 : 1) * _m((o * o * s * s - o * o * f * f - s * s * d * d) / (o * o * f * f + s * s * d * d)) || 0,v = g * o * f / s,m = g * -s * d / o,y = (t + i) / 2 + wm(c) * v - xm(c) * m,_ = (e + n) / 2 + xm(c) * v + wm(c) * m,x = Tm([1, 0], [(d - v) / o, (f - m) / s]),w = [(d - v) / o, (f - m) / s],b = [(-1 * d - v) / o, (-1 * f - m) / s],M = Tm(w, b);Sm(w, b) <= -1 && (M = bm), Sm(w, b) >= 1 && (M = 0), 0 === a && M > 0 && (M -= 2 * bm), 1 === a && 0 > M && (M += 2 * bm), h.addData(u, y, _, o, s, x, M, c, a);}function ra(t) {if (!t) return new nm();for (var e, i = 0, n = 0, r = i, a = n, o = new nm(), s = nm.CMD, l = t.match(Im), u = 0; u < l.length; u++) {for (var h, c = l[u], d = c.charAt(0), f = c.match(Cm) || [], p = f.length, g = 0; p > g; g++) {f[g] = parseFloat(f[g]);}for (var v = 0; p > v;) {var m,y,_,x,w,b,M,S = i,T = n;switch (d) {case "l":i += f[v++], n += f[v++], h = s.L, o.addData(h, i, n);break;case "L":i = f[v++], n = f[v++], h = s.L, o.addData(h, i, n);break;case "m":i += f[v++], n += f[v++], h = s.M, o.addData(h, i, n), r = i, a = n, d = "l";break;case "M":i = f[v++], n = f[v++], h = s.M, o.addData(h, i, n), r = i, a = n, d = "L";break;case "h":i += f[v++], h = s.L, o.addData(h, i, n);break;case "H":i = f[v++], h = s.L, o.addData(h, i, n);break;case "v":n += f[v++], h = s.L, o.addData(h, i, n);break;case "V":n = f[v++], h = s.L, o.addData(h, i, n);break;case "C":h = s.C, o.addData(h, f[v++], f[v++], f[v++], f[v++], f[v++], f[v++]), i = f[v - 2], n = f[v - 1];break;case "c":h = s.C, o.addData(h, f[v++] + i, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i, f[v++] + n), i += f[v - 2], n += f[v - 1];break;case "S":m = i, y = n;var I = o.len(),C = o.data;e === s.C && (m += i - C[I - 4], y += n - C[I - 3]), h = s.C, S = f[v++], T = f[v++], i = f[v++], n = f[v++], o.addData(h, m, y, S, T, i, n);break;case "s":m = i, y = n;var I = o.len(),C = o.data;e === s.C && (m += i - C[I - 4], y += n - C[I - 3]), h = s.C, S = i + f[v++], T = n + f[v++], i += f[v++], n += f[v++], o.addData(h, m, y, S, T, i, n);break;case "Q":S = f[v++], T = f[v++], i = f[v++], n = f[v++], h = s.Q, o.addData(h, S, T, i, n);break;case "q":S = f[v++] + i, T = f[v++] + n, i += f[v++], n += f[v++], h = s.Q, o.addData(h, S, T, i, n);break;case "T":m = i, y = n;var I = o.len(),C = o.data;e === s.Q && (m += i - C[I - 4], y += n - C[I - 3]), i = f[v++], n = f[v++], h = s.Q, o.addData(h, m, y, i, n);break;case "t":m = i, y = n;var I = o.len(),C = o.data;e === s.Q && (m += i - C[I - 4], y += n - C[I - 3]), i += f[v++], n += f[v++], h = s.Q, o.addData(h, m, y, i, n);break;case "A":_ = f[v++], x = f[v++], w = f[v++], b = f[v++], M = f[v++], S = i, T = n, i = f[v++], n = f[v++], h = s.A, na(S, T, i, n, b, M, _, x, w, h, o);break;case "a":_ = f[v++], x = f[v++], w = f[v++], b = f[v++], M = f[v++], S = i, T = n, i += f[v++], n += f[v++], h = s.A, na(S, T, i, n, b, M, _, x, w, h, o);}}("z" === d || "Z" === d) && (h = s.Z, o.addData(h), i = r, n = a), e = h;}return o.toStatic(), o;}function aa(t, e) {var i = ra(t);return e = e || {}, e.buildPath = function (t) {if (t.setData) {t.setData(i.data);var e = t.getContext();e && t.rebuildPath(e);} else {var e = t;i.rebuildPath(e);}}, e.applyTransform = function (t) {ym(i, t), this.dirty(!0);}, e;}function oa(t, e) {return new ia(aa(t, e));}function sa(t, e) {return ia.extend(aa(t, e));}function la(t, e) {for (var i = [], n = t.length, r = 0; n > r; r++) {var a = t[r];a.path || a.createPathProxy(), a.__dirtyPath && a.buildPath(a.path, a.shape, !0), i.push(a.path);}var o = new ia(e);return o.createPathProxy(), o.buildPath = function (t) {t.appendPath(i);var e = t.getContext();e && t.rebuildPath(e);}, o;}function ua(t, e, i, n, r, a, o) {var s = .5 * (i - t),l = .5 * (n - e);return (2 * (e - i) + s + l) * o + (-3 * (e - i) - 2 * s - l) * a + s * r + e;}function ha(t, e, i) {var n = e.points,r = e.smooth;if (n && n.length >= 2) {if (r && "spline" !== r) {var a = zm(n, r, i, e.smoothConstraint);t.moveTo(n[0][0], n[0][1]);for (var o = n.length, s = 0; (i ? o : o - 1) > s; s++) {var l = a[2 * s],u = a[2 * s + 1],h = n[(s + 1) % o];t.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);}} else {"spline" === r && (n = Rm(n, i)), t.moveTo(n[0][0], n[0][1]);for (var s = 1, c = n.length; c > s; s++) {t.lineTo(n[s][0], n[s][1]);}}i && t.closePath();}}function ca(t, e, i) {if (e) {var n = e.x1,r = e.x2,a = e.y1,o = e.y2;t.x1 = n, t.x2 = r, t.y1 = a, t.y2 = o;var s = i && i.lineWidth;s && (Nm(2 * n) === Nm(2 * r) && (t.x1 = t.x2 = fa(n, s, !0)), Nm(2 * a) === Nm(2 * o) && (t.y1 = t.y2 = fa(a, s, !0)));}}function da(t, e, i) {if (e) {var n = e.x,r = e.y,a = e.width,o = e.height;t.x = n, t.y = r, t.width = a, t.height = o;var s = i && i.lineWidth;s && (t.x = fa(n, s, !0), t.y = fa(r, s, !0), t.width = Math.max(fa(n + a, s, !1) - t.x, 0 === a ? 0 : 1), t.height = Math.max(fa(r + o, s, !1) - t.y, 0 === o ? 0 : 1));}}function fa(t, e, i) {if (!e) return t;var n = Nm(2 * t);return (n + Nm(e)) % 2 === 0 ? n / 2 : (n + (i ? 1 : -1)) / 2;}function pa(t, e, i) {var n = t.cpx2,r = t.cpy2;return null === n || null === r ? [(i ? Ir : Tr)(t.x1, t.cpx1, t.cpx2, t.x2, e), (i ? Ir : Tr)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(i ? Lr : Pr)(t.x1, t.cpx1, t.x2, e), (i ? Lr : Pr)(t.y1, t.cpy1, t.y2, e)];}function ga(t) {Cn.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.notClear = !0;}function va(t) {return ia.extend(t);}function ma(t, e) {return sa(t, e);}function ya(t, e) {oy[t] = e;}function _a(t) {return oy.hasOwnProperty(t) ? oy[t] : void 0;}function xa(t, e, i, n) {var r = oa(t, e);return i && ("center" === n && (i = ba(i, r.getBoundingRect())), Ma(r, i)), r;}function wa(t, e, i) {var n = new Dn({ style: { image: t, x: e.x, y: e.y, width: e.width, height: e.height }, onload: function onload(t) {if ("center" === i) {var r = { width: t.width, height: t.height };n.setStyle(ba(e, r));}} });return n;}function ba(t, e) {var i,n = e.width / e.height,r = t.height * n;r <= t.width ? i = t.height : (r = t.width, i = r / n);var a = t.x + t.width / 2,o = t.y + t.height / 2;return { x: a - r / 2, y: o - i / 2, width: r, height: i };}function Ma(t, e) {if (t.applyTransform) {var i = t.getBoundingRect(),n = i.calculateTransform(e);t.applyTransform(n);}}function Sa(t) {return ca(t.shape, t.shape, t.style), t;}function Ta(t) {return da(t.shape, t.shape, t.style), t;}function Ia(t) {return null != t && "none" !== t;}function Ca(t) {if ("string" != typeof t) return t;var e = uy.get(t);return e || (e = ni(t, -.1), 1e4 > hy && (uy.set(t, e), hy++)), e;}function Da(t) {if (t.__hoverStlDirty) {t.__hoverStlDirty = !1;var e = t.__hoverStl;if (!e) return void (t.__cachedNormalStl = t.__cachedNormalZ2 = null);var i = t.__cachedNormalStl = {};t.__cachedNormalZ2 = t.z2;var n = t.style;for (var r in e) {null != e[r] && (i[r] = n[r]);}i.fill = n.fill, i.stroke = n.stroke;}}function ka(t) {var e = t.__hoverStl;if (e && !t.__highlighted) {var i = t.__zr,n = t.useHoverLayer && i && "canvas" === i.painter.type;if (t.__highlighted = n ? "layer" : "plain", !(t.isGroup || !i && t.useHoverLayer)) {var r = t,a = t.style;n && (r = i.addHover(t), a = r.style), Qa(a), n || Da(r), a.extendFrom(e), Aa(a, e, "fill"), Aa(a, e, "stroke"), $a(a), n || (t.dirty(!1), t.z2 += ty);}}}function Aa(t, e, i) {!Ia(e[i]) && Ia(t[i]) && (t[i] = Ca(t[i]));}function Pa(t) {var e = t.__highlighted;if (e && (t.__highlighted = !1, !t.isGroup)) if ("layer" === e) t.__zr && t.__zr.removeHover(t);else {var i = t.style,n = t.__cachedNormalStl;n && (Qa(i), t.setStyle(n), $a(i));var r = t.__cachedNormalZ2;null != r && t.z2 - r === ty && (t.z2 = r);}}function La(t, e, i) {var n,r = ny,a = ny;t.__highlighted && (r = iy, n = !0), e(t, i), t.__highlighted && (a = iy, n = !0), t.isGroup && t.traverse(function (t) {!t.isGroup && e(t, i);}), n && t.__highDownOnUpdate && t.__highDownOnUpdate(r, a);}function Oa(t, e) {e = t.__hoverStl = e !== !1 && (t.hoverStyle || e || {}), t.__hoverStlDirty = !0, t.__highlighted && (t.__cachedNormalStl = null, Pa(t), ka(t));}function Ra(t) {!Na(this, t) && !this.__highByOuter && La(this, ka);}function za(t) {!Na(this, t) && !this.__highByOuter && La(this, Pa);}function Ba(t) {this.__highByOuter |= 1 << (t || 0), La(this, ka);}function Ea(t) {!(this.__highByOuter &= ~(1 << (t || 0))) && La(this, Pa);}function Na(t, e) {return t.__highDownSilentOnTouch && e.zrByTouch;}function Fa(t, e) {Va(t, !0), La(t, Oa, e);}function Va(t, e) {var i = e === !1;if (t.__highDownSilentOnTouch = t.highDownSilentOnTouch, t.__highDownOnUpdate = t.highDownOnUpdate, !i || t.__highDownDispatcher) {var n = i ? "off" : "on";t[n]("mouseover", Ra)[n]("mouseout", za), t[n]("emphasis", Ba)[n]("normal", Ea), t.__highByOuter = t.__highByOuter || 0, t.__highDownDispatcher = !i;}}function Ha(t) {return !(!t || !t.__highDownDispatcher);}function Wa(t) {var e = ay[t];return null == e && 32 >= ry && (e = ay[t] = ry++), e;}function Ga(t, e, i, n, r, a, o) {r = r || Jm;var s,l = r.labelFetcher,u = r.labelDataIndex,h = r.labelDimIndex,c = r.labelProp,d = i.getShallow("show"),f = n.getShallow("show");(d || f) && (l && (s = l.getFormattedLabel(u, "normal", null, h, c)), null == s && (s = w(r.defaultText) ? r.defaultText(u, r) : r.defaultText));var p = d ? s : null,g = f ? k(l ? l.getFormattedLabel(u, "emphasis", null, h, c) : null, s) : null;(null != p || null != g) && (Ya(t, i, a, r), Ya(e, n, o, r, !0)), t.text = p, e.text = g;}function Xa(t, e, i) {var n = t.style;e && (Qa(n), t.setStyle(e), $a(n)), n = t.__hoverStl, i && n && (Qa(n), o(n, i), $a(n));}function Ya(t, e, i, n, r) {return qa(t, e, n, r), i && o(t, i), t;}function Ua(t, e, i) {var n,r = { isRectText: !0 };i === !1 ? n = !0 : r.autoColor = i, qa(t, e, r, n);}function qa(t, e, i, n) {if (i = i || Jm, i.isRectText) {var r;i.getTextPosition ? r = i.getTextPosition(e, n) : (r = e.getShallow("position") || (n ? null : "inside"), "outside" === r && (r = "top")), t.textPosition = r, t.textOffset = e.getShallow("offset");var a = e.getShallow("rotate");null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = k(e.getShallow("distance"), n ? null : 5);}var o,s = e.ecModel,l = s && s.option.textStyle,u = ja(e);if (u) {o = {};for (var h in u) {if (u.hasOwnProperty(h)) {var c = e.getModel(["rich", h]);Za(o[h] = {}, c, l, i, n);}}}return t.rich = o, Za(t, e, l, i, n, !0), i.forceRich && !i.textStyle && (i.textStyle = {}), t;}function ja(t) {for (var e; t && t !== t.ecModel;) {var i = (t.option || Jm).rich;if (i) {e = e || {};for (var n in i) {i.hasOwnProperty(n) && (e[n] = 1);}}t = t.parentModel;}return e;}function Za(t, e, i, n, r, a) {i = !r && i || Jm, t.textFill = Ka(e.getShallow("color"), n) || i.color, t.textStroke = Ka(e.getShallow("textBorderColor"), n) || i.textBorderColor, t.textStrokeWidth = k(e.getShallow("textBorderWidth"), i.textBorderWidth), r || (a && (t.insideRollbackOpt = n, $a(t)), null == t.textFill && (t.textFill = n.autoColor)), t.fontStyle = e.getShallow("fontStyle") || i.fontStyle, t.fontWeight = e.getShallow("fontWeight") || i.fontWeight, t.fontSize = e.getShallow("fontSize") || i.fontSize, t.fontFamily = e.getShallow("fontFamily") || i.fontFamily, t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && n.disableBox || (t.textBackgroundColor = Ka(e.getShallow("backgroundColor"), n), t.textPadding = e.getShallow("padding"), t.textBorderColor = Ka(e.getShallow("borderColor"), n), t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), t.textShadowColor = e.getShallow("textShadowColor") || i.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || i.textShadowBlur, t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || i.textShadowOffsetX, t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || i.textShadowOffsetY;}function Ka(t, e) {return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null;}function $a(t) {var e,i = t.textPosition,n = t.insideRollbackOpt;if (n && null == t.textFill) {var r = n.autoColor,a = n.isRectText,o = n.useInsideStyle,s = o !== !1 && (o === !0 || a && i && "string" == typeof i && i.indexOf("inside") >= 0),l = !s && null != r;(s || l) && (e = { textFill: t.textFill, textStroke: t.textStroke, textStrokeWidth: t.textStrokeWidth }), s && (t.textFill = "#fff", null == t.textStroke && (t.textStroke = r, null == t.textStrokeWidth && (t.textStrokeWidth = 2))), l && (t.textFill = r);}t.insideRollback = e;}function Qa(t) {var e = t.insideRollback;e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth, t.insideRollback = null);}function Ja(t, e) {var i = e && e.getModel("textStyle");return R([t.fontStyle || i && i.getShallow("fontStyle") || "", t.fontWeight || i && i.getShallow("fontWeight") || "", (t.fontSize || i && i.getShallow("fontSize") || 12) + "px", t.fontFamily || i && i.getShallow("fontFamily") || "sans-serif"].join(" "));}function to(t, e, i, n, r, a) {"function" == typeof r && (a = r, r = null);var o = n && n.isAnimationEnabled();if (o) {var s = t ? "Update" : "",l = n.getShallow("animationDuration" + s),u = n.getShallow("animationEasing" + s),h = n.getShallow("animationDelay" + s);"function" == typeof h && (h = h(r, n.getAnimationDelayParams ? n.getAnimationDelayParams(e, r) : null)), "function" == typeof l && (l = l(r)), l > 0 ? e.animateTo(i, l, h || 0, u, a, !!a) : (e.stopAnimation(), e.attr(i), a && a());} else e.stopAnimation(), e.attr(i), a && a();}function eo(t, e, i, n, r) {to(!0, t, e, i, n, r);}function io(t, e, i, n, r) {to(!1, t, e, i, n, r);}function no(t, e) {for (var i = Re([]); t && t !== e;) {Be(i, t.getLocalTransform(), i), t = t.parent;}return i;}function ro(t, e, i) {return e && !d(e) && (e = Np.getLocalTransform(e)), i && (e = Ve([], e)), ae([], t, e);}function ao(t, e, i) {var n = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]),r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]),a = ["left" === t ? -n : "right" === t ? n : 0, "top" === t ? -r : "bottom" === t ? r : 0];return a = ro(a, e, i), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";}function oo(t, e, i) {function n(t) {var e = {};return t.traverse(function (t) {!t.isGroup && t.anid && (e[t.anid] = t);}), e;}function r(t) {var e = { position: G(t.position), rotation: t.rotation };return t.shape && (e.shape = o({}, t.shape)), e;}if (t && e) {var a = n(t);e.traverse(function (t) {if (!t.isGroup && t.anid) {var e = a[t.anid];if (e) {var n = r(t);t.attr(r(e)), eo(t, n, i, t.dataIndex);}}});}}function so(t, e) {return p(t, function (t) {var i = t[0];i = $m(i, e.x), i = Qm(i, e.x + e.width);var n = t[1];return n = $m(n, e.y), n = Qm(n, e.y + e.height), [i, n];});}function lo(t, e) {var i = $m(t.x, e.x),n = Qm(t.x + t.width, e.x + e.width),r = $m(t.y, e.y),a = Qm(t.y + t.height, e.y + e.height);return n >= i && a >= r ? { x: i, y: r, width: n - i, height: a - r } : void 0;}function uo(t, e, i) {e = o({ rectHover: !0 }, e);var n = e.style = { strokeNoScale: !0 };return i = i || { x: -1, y: -1, width: 2, height: 2 }, t ? 0 === t.indexOf("image://") ? (n.image = t.slice(8), s(n, i), new Dn(e)) : xa(t.replace("path://", ""), e, i, "center") : void 0;}function ho(t, e, i, n, r) {for (var a = 0, o = r[r.length - 1]; a < r.length; a++) {var s = r[a];if (co(t, e, i, n, s[0], s[1], o[0], o[1])) return !0;o = s;}}function co(t, e, i, n, r, a, o, s) {var l = i - t,u = n - e,h = o - r,c = s - a,d = fo(h, c, l, u);if (po(d)) return !1;var f = t - r,p = e - a,g = fo(f, p, l, u) / d;if (0 > g || g > 1) return !1;var v = fo(f, p, h, c) / d;return 0 > v || v > 1 ? !1 : !0;}function fo(t, e, i, n) {return t * n - i * e;
  }function po(t) {return 1e-6 >= t && t >= -1e-6;}function go(t, e, i) {this.parentModel = e, this.ecModel = i, this.option = t;}function vo(t, e, i) {for (var n = 0; n < e.length && (!e[n] || (t = t && "object" == typeof t ? t[e[n]] : null, null != t)); n++) {;}return null == t && i && (t = i.get(e)), t;}function mo(t, e) {var i = my(t).getParent;return i ? i.call(t, e) : t.parentModel;}function yo(t) {return [t || "", yy++, Math.random().toFixed(5)].join("_");}function _o(t) {var e = {};return t.registerSubTypeDefaulter = function (t, i) {t = vr(t), e[t.main] = i;}, t.determineSubType = function (i, n) {var r = n.type;if (!r) {var a = vr(i).main;t.hasSubTypes(i) && e[a] && (r = e[a](n));}return r;}, t;}function xo(t, e) {function i(t) {var i = {},a = [];return f(t, function (o) {var s = n(i, o),l = s.originalDeps = e(o),h = r(l, t);s.entryCount = h.length, 0 === s.entryCount && a.push(o), f(h, function (t) {u(s.predecessor, t) < 0 && s.predecessor.push(t);var e = n(i, t);u(e.successor, t) < 0 && e.successor.push(o);});}), { graph: i, noEntryList: a };}function n(t, e) {return t[e] || (t[e] = { predecessor: [], successor: [] }), t[e];}function r(t, e) {var i = [];return f(t, function (t) {u(e, t) >= 0 && i.push(t);}), i;}t.topologicalTravel = function (t, e, n, r) {function a(t) {l[t].entryCount--, 0 === l[t].entryCount && u.push(t);}function o(t) {h[t] = !0, a(t);}if (t.length) {var s = i(e),l = s.graph,u = s.noEntryList,h = {};for (f(t, function (t) {h[t] = !0;}); u.length;) {var c = u.pop(),d = l[c],p = !!h[c];p && (n.call(r, c, d.originalDeps.slice()), delete h[c]), f(d.successor, p ? o : a);}f(h, function () {throw new Error("Circle dependency may exists");});}};}function wo(t) {return t.replace(/^\s+|\s+$/g, "");}function bo(t, e, i, n) {var r = e[1] - e[0],a = i[1] - i[0];if (0 === r) return 0 === a ? i[0] : (i[0] + i[1]) / 2;if (n) {if (r > 0) {if (t <= e[0]) return i[0];if (t >= e[1]) return i[1];} else {if (t >= e[0]) return i[0];if (t <= e[1]) return i[1];}} else {if (t === e[0]) return i[0];if (t === e[1]) return i[1];}return (t - e[0]) / r * a + i[0];}function Mo(t, e) {switch (t) {case "center":case "middle":t = "50%";break;case "left":case "top":t = "0%";break;case "right":case "bottom":t = "100%";}return "string" == typeof t ? wo(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? 0 / 0 : +t;}function So(t, e, i) {return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), i ? t : +t;}function To(t) {return t.sort(function (t, e) {return t - e;}), t;}function Io(t) {if (t = +t, isNaN(t)) return 0;for (var e = 1, i = 0; Math.round(t * e) / e !== t;) {e *= 10, i++;}return i;}function Co(t) {var e = t.toString(),i = e.indexOf("e");if (i > 0) {var n = +e.slice(i + 1);return 0 > n ? -n : 0;}var r = e.indexOf(".");return 0 > r ? 0 : e.length - 1 - r;}function Do(t, e) {var i = Math.log,n = Math.LN10,r = Math.floor(i(t[1] - t[0]) / n),a = Math.round(i(Math.abs(e[1] - e[0])) / n),o = Math.min(Math.max(-r + a, 0), 20);return isFinite(o) ? o : 20;}function ko(t, e, i) {if (!t[e]) return 0;var n = g(t, function (t, e) {return t + (isNaN(e) ? 0 : e);}, 0);if (0 === n) return 0;for (var r = Math.pow(10, i), a = p(t, function (t) {return (isNaN(t) ? 0 : t) / n * r * 100;}), o = 100 * r, s = p(a, function (t) {return Math.floor(t);}), l = g(s, function (t, e) {return t + e;}, 0), u = p(a, function (t, e) {return t - s[e];}); o > l;) {for (var h = Number.NEGATIVE_INFINITY, c = null, d = 0, f = u.length; f > d; ++d) {u[d] > h && (h = u[d], c = d);}++s[c], u[c] = 0, ++l;}return s[e] / r;}function Ao(t) {var e = 2 * Math.PI;return (t % e + e) % e;}function Po(t) {return t > -_y && _y > t;}function Lo(t) {if (t instanceof Date) return t;if ("string" == typeof t) {var e = wy.exec(t);if (!e) return new Date(0 / 0);if (e[8]) {var i = +e[4] || 0;return "Z" !== e[8].toUpperCase() && (i -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, i, +(e[5] || 0), +e[6] || 0, +e[7] || 0));}return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0);}return new Date(null == t ? 0 / 0 : Math.round(t));}function Oo(t) {return Math.pow(10, Ro(t));}function Ro(t) {if (0 === t) return 0;var e = Math.floor(Math.log(t) / Math.LN10);return t / Math.pow(10, e) >= 10 && e++, e;}function zo(t, e) {var i,n = Ro(t),r = Math.pow(10, n),a = t / r;return i = e ? 1.5 > a ? 1 : 2.5 > a ? 2 : 4 > a ? 3 : 7 > a ? 5 : 10 : 1 > a ? 1 : 2 > a ? 2 : 3 > a ? 3 : 5 > a ? 5 : 10, t = i * r, n >= -20 ? +t.toFixed(0 > n ? -n : 0) : t;}function Bo(t, e) {var i = (t.length - 1) * e + 1,n = Math.floor(i),r = +t[n - 1],a = i - n;return a ? r + a * (t[n] - r) : r;}function Eo(t) {function e(t, i, n) {return t.interval[n] < i.interval[n] || t.interval[n] === i.interval[n] && (t.close[n] - i.close[n] === (n ? -1 : 1) || !n && e(t, i, 1));}t.sort(function (t, i) {return e(t, i, 0) ? -1 : 1;});for (var i = -1 / 0, n = 1, r = 0; r < t.length;) {for (var a = t[r].interval, o = t[r].close, s = 0; 2 > s; s++) {a[s] <= i && (a[s] = i, o[s] = s ? 1 : 1 - n), i = a[s], n = o[s];}a[0] === a[1] && o[0] * o[1] !== 1 ? t.splice(r, 1) : r++;}return t;}function No(t) {return t - parseFloat(t) >= 0;}function Fo(t) {return isNaN(t) ? "-" : (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""));}function Vo(t, e) {return t = (t || "").toLowerCase().replace(/-(.)/g, function (t, e) {return e.toUpperCase();}), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t;}function Ho(t) {return null == t ? "" : (t + "").replace(Sy, function (t, e) {return Ty[e];});}function Wo(t, e, i) {x(e) || (e = [e]);var n = e.length;if (!n) return "";for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {var o = Iy[a];t = t.replace(Cy(o), Cy(o, 0));}for (var s = 0; n > s; s++) {for (var l = 0; l < r.length; l++) {var u = e[s][r[l]];t = t.replace(Cy(Iy[l], s), i ? Ho(u) : u);}}return t;}function Go(t, e, i) {return f(e, function (e, n) {t = t.replace("{" + n + "}", i ? Ho(e) : e);}), t;}function Xo(t, e) {t = b(t) ? { color: t, extraCssText: e } : t || {};var i = t.color,n = t.type,e = t.extraCssText,r = t.renderMode || "html",a = t.markerId || "X";return i ? "html" === r ? "subItem" === n ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Ho(i) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + Ho(i) + ";" + (e || "") + '"></span>' : { renderMode: r, content: "{marker" + a + "|}  ", style: { color: i } } : "";}function Yo(t, e) {return t += "", "0000".substr(0, e - t.length) + t;}function Uo(t, e, i) {("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");var n = Lo(e),r = i ? "UTC" : "",a = n["get" + r + "FullYear"](),o = n["get" + r + "Month"]() + 1,s = n["get" + r + "Date"](),l = n["get" + r + "Hours"](),u = n["get" + r + "Minutes"](),h = n["get" + r + "Seconds"](),c = n["get" + r + "Milliseconds"]();return t = t.replace("MM", Yo(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", Yo(s, 2)).replace("d", s).replace("hh", Yo(l, 2)).replace("h", l).replace("mm", Yo(u, 2)).replace("m", u).replace("ss", Yo(h, 2)).replace("s", h).replace("SSS", Yo(c, 3));}function qo(t) {return t ? t.charAt(0).toUpperCase() + t.substr(1) : t;}function jo(t) {return Yi(t.text, t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich, t.truncate);}function Zo(t, e, i, n, r, a, o, s) {return Yi(t, e, i, n, r, s, a, o);}function Ko(t, e) {if ("_blank" === e || "blank" === e) {var i = window.open();i.opener = null, i.location = t;} else window.open(t, e);}function $o(t, e, i, n, r) {var a = 0,o = 0;null == n && (n = 1 / 0), null == r && (r = 1 / 0);var s = 0;e.eachChild(function (l, u) {var h,c,d = l.position,f = l.getBoundingRect(),p = e.childAt(u + 1),g = p && p.getBoundingRect();if ("horizontal" === t) {var v = f.width + (g ? -g.x + f.x : 0);h = a + v, h > n || l.newline ? (a = 0, h = v, o += s + i, s = f.height) : s = Math.max(s, f.height);} else {var m = f.height + (g ? -g.y + f.y : 0);c = o + m, c > r || l.newline ? (a += s + i, o = 0, c = m, s = f.width) : s = Math.max(s, f.width);}l.newline || (d[0] = a, d[1] = o, "horizontal" === t ? a = h + i : o = c + i);});}function Qo(t, e, i) {i = My(i || 0);var n = e.width,r = e.height,a = Mo(t.left, n),o = Mo(t.top, r),s = Mo(t.right, n),l = Mo(t.bottom, r),u = Mo(t.width, n),h = Mo(t.height, r),c = i[2] + i[0],d = i[1] + i[3],f = t.aspect;switch (isNaN(u) && (u = n - s - d - a), isNaN(h) && (h = r - l - c - o), null != f && (isNaN(u) && isNaN(h) && (f > n / r ? u = .8 * n : h = .8 * r), isNaN(u) && (u = f * h), isNaN(h) && (h = u / f)), isNaN(a) && (a = n - s - u - d), isNaN(o) && (o = r - l - h - c), t.left || t.right) {case "center":a = n / 2 - u / 2 - i[3];break;case "right":a = n - u - d;}switch (t.top || t.bottom) {case "middle":case "center":o = r / 2 - h / 2 - i[0];break;case "bottom":o = r - h - c;}a = a || 0, o = o || 0, isNaN(u) && (u = n - d - a - (s || 0)), isNaN(h) && (h = r - c - o - (l || 0));var p = new Ii(a + i[3], o + i[0], u, h);return p.margin = i, p;}function Jo(t, e, i, n, r) {var a = !r || !r.hv || r.hv[0],o = !r || !r.hv || r.hv[1],l = r && r.boundingMode || "all";if (a || o) {var u;if ("raw" === l) u = "group" === t.type ? new Ii(0, 0, +e.width || 0, +e.height || 0) : t.getBoundingRect();else if (u = t.getBoundingRect(), t.needLocalTransform()) {var h = t.getLocalTransform();u = u.clone(), u.applyTransform(h);}e = Qo(s({ width: u.width, height: u.height }, e), i, n);var c = t.position,d = a ? e.x - u.x : 0,f = o ? e.y - u.y : 0;t.attr("position", "raw" === l ? [d, f] : [c[0] + d, c[1] + f]);}}function ts(t, e, i) {function n(i, n) {var o = {},l = 0,u = {},h = 0,c = 2;if (Ay(i, function (e) {u[e] = t[e];}), Ay(i, function (t) {r(e, t) && (o[t] = u[t] = e[t]), a(o, t) && l++, a(u, t) && h++;}), s[n]) return a(e, i[1]) ? u[i[2]] = null : a(e, i[2]) && (u[i[1]] = null), u;if (h !== c && l) {if (l >= c) return o;for (var d = 0; d < i.length; d++) {var f = i[d];if (!r(o, f) && r(t, f)) {o[f] = t[f];break;}}return o;}return u;}function r(t, e) {return t.hasOwnProperty(e);}function a(t, e) {return null != t[e] && "auto" !== t[e];}function o(t, e, i) {Ay(t, function (t) {e[t] = i[t];});}!M(i) && (i = {});var s = i.ignoreSize;!x(s) && (s = [s, s]);var l = n(Ly[0], 0),u = n(Ly[1], 1);o(Ly[0], t, l), o(Ly[1], t, u);}function es(t) {return is({}, t);}function is(t, e) {return e && t && Ay(Py, function (i) {e.hasOwnProperty(i) && (t[i] = e[i]);}), t;}function ns(t) {var e = [];return f(By.getClassesByMainType(t), function (t) {e = e.concat(t.prototype.dependencies || []);}), e = p(e, function (t) {return vr(t).main;}), "dataset" !== t && u(e, "dataset") <= 0 && e.unshift("dataset"), e;}function rs(t, e) {for (var i = t.length, n = 0; i > n; n++) {if (t[n].length > e) return t[n];}return t[i - 1];}function as(t) {this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === Xy ? {} : []), this.sourceFormat = t.sourceFormat || Yy, this.seriesLayoutBy = t.seriesLayoutBy || qy, this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && N(t.encodeDefine), this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount;}function os(t) {var e = t.option.source,i = Yy;if (T(e)) i = Uy;else if (x(e)) {0 === e.length && (i = Wy);for (var n = 0, r = e.length; r > n; n++) {var a = e[n];if (null != a) {if (x(a)) {i = Wy;break;}if (M(a)) {i = Gy;break;}}}} else if (M(e)) {for (var o in e) {if (e.hasOwnProperty(o) && d(e[o])) {i = Xy;break;}}} else if (null != e) throw new Error("Invalid data");Ky(t).sourceFormat = i;}function ss(t) {return Ky(t).source;}function ls(t) {Ky(t).datasetMap = N();}function us(t) {var e = t.option,i = e.data,n = T(i) ? Uy : Hy,r = !1,a = e.seriesLayoutBy,o = e.sourceHeader,s = e.dimensions,l = vs(t);if (l) {var u = l.option;i = u.source, n = Ky(l).sourceFormat, r = !0, a = a || u.seriesLayoutBy, null == o && (o = u.sourceHeader), s = s || u.dimensions;}var h = hs(i, n, a, o, s);Ky(t).source = new as({ data: i, fromDataset: r, seriesLayoutBy: a, sourceFormat: n, dimensionsDefine: h.dimensionsDefine, startIndex: h.startIndex, dimensionsDetectCount: h.dimensionsDetectCount, encodeDefine: e.encode });}function hs(t, e, i, n, r) {if (!t) return { dimensionsDefine: cs(r) };var a, o;if (e === Wy) "auto" === n || null == n ? ds(function (t) {null != t && "-" !== t && (b(t) ? null == o && (o = 1) : o = 0);}, i, t, 10) : o = n ? 1 : 0, r || 1 !== o || (r = [], ds(function (t, e) {r[e] = null != t ? t : "";}, i, t)), a = r ? r.length : i === jy ? t.length : t[0] ? t[0].length : null;else if (e === Gy) r || (r = fs(t));else if (e === Xy) r || (r = [], f(t, function (t, e) {r.push(e);}));else if (e === Hy) {var s = ir(t[0]);a = x(s) && s.length || 1;}return { startIndex: o, dimensionsDefine: cs(r), dimensionsDetectCount: a };}function cs(t) {if (t) {var e = N();return p(t, function (t) {if (t = o({}, M(t) ? t : { name: t }), null == t.name) return t;t.name += "", null == t.displayName && (t.displayName = t.name);var i = e.get(t.name);return i ? t.name += "-" + i.count++ : e.set(t.name, { count: 1 }), t;});}}function ds(t, e, i, n) {if (null == n && (n = 1 / 0), e === jy) for (var r = 0; r < i.length && n > r; r++) {t(i[r] ? i[r][0] : null, r);} else for (var a = i[0] || [], r = 0; r < a.length && n > r; r++) {t(a[r], r);}}function fs(t) {for (var e, i = 0; i < t.length && !(e = t[i++]);) {;}if (e) {var n = [];return f(e, function (t, e) {n.push(e);}), n;}}function ps(t, e, i) {function n(t, e, i) {for (var n = 0; i > n; n++) {t.push(e + n);}}function r(t) {var e = t.dimsDef;return e ? e.length : 1;}var a = {},o = vs(e);if (!o || !t) return a;var s,l,u = [],h = [],c = e.ecModel,d = Ky(c).datasetMap,p = o.uid + "_" + i.seriesLayoutBy;t = t.slice(), f(t, function (e, i) {!M(e) && (t[i] = { name: e }), "ordinal" === e.type && null == s && (s = i, l = r(t[i])), a[e.name] = [];});var g = d.get(p) || d.set(p, { categoryWayDim: l, valueWayDim: 0 });return f(t, function (t, e) {var i = t.name,o = r(t);if (null == s) {var l = g.valueWayDim;n(a[i], l, o), n(h, l, o), g.valueWayDim += o;} else if (s === e) n(a[i], 0, o), n(u, 0, o);else {var l = g.categoryWayDim;n(a[i], l, o), n(h, l, o), g.categoryWayDim += o;}}), u.length && (a.itemName = u), h.length && (a.seriesName = h), a;}function gs(t, e, i) {var n = {},r = vs(t);if (!r) return n;var a,o = e.sourceFormat,s = e.dimensionsDefine;(o === Gy || o === Xy) && f(s, function (t, e) {"name" === (M(t) ? t.name : t) && (a = e);});var l = function () {function t(t) {return null != t.v && null != t.n;}for (var n = {}, r = {}, l = [], u = 0, h = Math.min(5, i); h > u; u++) {var c = ys(e.data, o, e.seriesLayoutBy, s, e.startIndex, u);l.push(c);var d = c === Zy.Not;if (d && null == n.v && u !== a && (n.v = u), (null == n.n || n.n === n.v || !d && l[n.n] === Zy.Not) && (n.n = u), t(n) && l[n.n] !== Zy.Not) return n;d || (c === Zy.Might && null == r.v && u !== a && (r.v = u), (null == r.n || r.n === r.v) && (r.n = u));}return t(n) ? n : t(r) ? r : null;}();if (l) {n.value = l.v;var u = null != a ? a : l.n;n.itemName = [u], n.seriesName = [u];}return n;}function vs(t) {var e = t.option,i = e.data;return i ? void 0 : t.ecModel.getComponent("dataset", e.datasetIndex || 0);}function ms(t, e) {return ys(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e);}function ys(t, e, i, n, r, a) {function o(t) {var e = b(t);return null != t && isFinite(t) && "" !== t ? e ? Zy.Might : Zy.Not : e && "-" !== t ? Zy.Must : void 0;}var s,l = 5;if (T(t)) return Zy.Not;var u, h;if (n) {var c = n[a];M(c) ? (u = c.name, h = c.type) : b(c) && (u = c);}if (null != h) return "ordinal" === h ? Zy.Must : Zy.Not;if (e === Wy) {if (i === jy) {for (var d = t[a], f = 0; f < (d || []).length && l > f; f++) {if (null != (s = o(d[r + f]))) return s;}} else for (var f = 0; f < t.length && l > f; f++) {var p = t[r + f];if (p && null != (s = o(p[a]))) return s;}} else if (e === Gy) {if (!u) return Zy.Not;for (var f = 0; f < t.length && l > f; f++) {var g = t[f];if (g && null != (s = o(g[u]))) return s;}} else if (e === Xy) {if (!u) return Zy.Not;var d = t[u];if (!d || T(d)) return Zy.Not;for (var f = 0; f < d.length && l > f; f++) {if (null != (s = o(d[f]))) return s;}} else if (e === Hy) for (var f = 0; f < t.length && l > f; f++) {var g = t[f],v = ir(g);if (!x(v)) return Zy.Not;if (null != (s = o(v[a]))) return s;}return Zy.Not;}function _s(t, e) {if (e) {var i = e.seiresIndex,n = e.seriesId,r = e.seriesName;return null != i && t.componentIndex !== i || null != n && t.id !== n || null != r && t.name !== r;}}function xs(t, e) {var i = t.color && !t.colorLayer;f(e, function (e, a) {"colorLayer" === a && i || By.hasClass(a) || ("object" == typeof e ? t[a] = t[a] ? r(t[a], e, !1) : n(e) : null == t[a] && (t[a] = e));});}function ws(t) {t = t, this.option = {}, this.option[$y] = 1, this._componentsMap = N({ series: [] }), this._seriesIndices, this._seriesIndicesMap, xs(t, this._theme.option), r(t, Ny, !1), this.mergeOption(t);}function bs(t, e) {x(e) || (e = e ? [e] : []);var i = {};return f(e, function (e) {i[e] = (t.get(e) || []).slice();}), i;}function Ms(t, e, i) {var n = e.type ? e.type : i ? i.subType : By.determineSubType(t, e);return n;}function Ss(t, e) {t._seriesIndicesMap = N(t._seriesIndices = p(e, function (t) {return t.componentIndex;}) || []);}function Ts(t, e) {return e.hasOwnProperty("subType") ? v(t, function (t) {return t.subType === e.subType;}) : t;}function Is(t) {f(Jy, function (e) {this[e] = y(t[e], t);}, this);}function Cs() {this._coordinateSystems = [];}function Ds(t) {this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption;}function ks(t, e, i) {var n,r,a = [],o = [],s = t.timeline;if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, a = (t.options || []).slice()), t.media) {r = r || {};var l = t.media;e_(l, function (t) {t && t.option && (t.query ? o.push(t) : n || (n = t));});}return r || (r = t), r.timeline || (r.timeline = s), e_([r].concat(a).concat(p(o, function (t) {return t.option;})), function (t) {e_(e, function (e) {e(t, i);});}), { baseOption: r, timelineOptions: a, mediaDefault: n, mediaList: o };}function As(t, e, i) {var n = { width: e, height: i, aspectratio: e / i },r = !0;return f(t, function (t, e) {var i = e.match(a_);if (i && i[1] && i[2]) {var a = i[1],o = i[2].toLowerCase();Ps(n[o], t, a) || (r = !1);}}), r;}function Ps(t, e, i) {return "min" === i ? t >= e : "max" === i ? e >= t : t === e;}function Ls(t, e) {return t.join(",") === e.join(",");}function Os(t, e) {e = e || {}, e_(e, function (e, i) {if (null != e) {var n = t[i];if (By.hasClass(i)) {e = tr(e), n = tr(n);var r = rr(n, e);t[i] = n_(r, function (t) {return t.option && t.exist ? r_(t.exist, t.option, !0) : t.exist || t.option;});} else t[i] = r_(n, e, !0);}});}function Rs(t) {var e = t && t.itemStyle;if (e) for (var i = 0, n = l_.length; n > i; i++) {var a = l_[i],o = e.normal,s = e.emphasis;o && o[a] && (t[a] = t[a] || {}, t[a].normal ? r(t[a].normal, o[a]) : t[a].normal = o[a], o[a] = null), s && s[a] && (t[a] = t[a] || {}, t[a].emphasis ? r(t[a].emphasis, s[a]) : t[a].emphasis = s[a], s[a] = null);}}function zs(t, e, i) {if (t && t[e] && (t[e].normal || t[e].emphasis)) {var n = t[e].normal,r = t[e].emphasis;n && (i ? (t[e].normal = t[e].emphasis = null, s(t[e], n)) : t[e] = n), r && (t.emphasis = t.emphasis || {}, t.emphasis[e] = r);}}function Bs(t) {zs(t, "itemStyle"), zs(t, "lineStyle"), zs(t, "areaStyle"), zs(t, "label"), zs(t, "labelLine"), zs(t, "upperLabel"), zs(t, "edgeLabel");}function Es(t, e) {var i = s_(t) && t[e],n = s_(i) && i.textStyle;if (n) for (var r = 0, a = vv.length; a > r; r++) {var e = vv[r];n.hasOwnProperty(e) && (i[e] = n[e]);}}function Ns(t) {t && (Bs(t), Es(t, "label"), t.emphasis && Es(t.emphasis, "label"));}function Fs(t) {if (s_(t)) {Rs(t), Bs(t), Es(t, "label"), Es(t, "upperLabel"), Es(t, "edgeLabel"), t.emphasis && (Es(t.emphasis, "label"), Es(t.emphasis, "upperLabel"), Es(t.emphasis, "edgeLabel"));var e = t.markPoint;e && (Rs(e), Ns(e));var i = t.markLine;i && (Rs(i), Ns(i));var n = t.markArea;n && Ns(n);var r = t.data;if ("graph" === t.type) {r = r || t.nodes;var a = t.links || t.edges;if (a && !T(a)) for (var o = 0; o < a.length; o++) {Ns(a[o]);}f(t.categories, function (t) {Bs(t);});}if (r && !T(r)) for (var o = 0; o < r.length; o++) {Ns(r[o]);}var e = t.markPoint;if (e && e.data) for (var s = e.data, o = 0; o < s.length; o++) {Ns(s[o]);}var i = t.markLine;if (i && i.data) for (var l = i.data, o = 0; o < l.length; o++) {x(l[o]) ? (Ns(l[o][0]), Ns(l[o][1])) : Ns(l[o]);}"gauge" === t.type ? (Es(t, "axisLabel"), Es(t, "title"), Es(t, "detail")) : "treemap" === t.type ? (zs(t.breadcrumb, "itemStyle"), f(t.levels, function (t) {Bs(t);})) : "tree" === t.type && Bs(t.leaves);}}function Vs(t) {return x(t) ? t : t ? [t] : [];}function Hs(t) {return (x(t) ? t[0] : t) || {};}function Ws(t, e) {e = e.split(",");for (var i = t, n = 0; n < e.length && (i = i && i[e[n]], null != i); n++) {;}return i;}function Gs(t, e, i, n) {e = e.split(",");for (var r, a = t, o = 0; o < e.length - 1; o++) {r = e[o], null == a[r] && (a[r] = {}), a = a[r];}(n || null == a[e[o]]) && (a[e[o]] = i);}function Xs(t) {f(h_, function (e) {e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]]);});}function Ys(t) {f(t, function (e, i) {var n = [],r = [0 / 0, 0 / 0],a = [e.stackResultDimension, e.stackedOverDimension],o = e.data,s = e.isStackedByIndex,l = o.map(a, function (a, l, u) {var h = o.get(e.stackedDimension, u);if (isNaN(h)) return r;var c, d;s ? d = o.getRawIndex(u) : c = o.get(e.stackedByDimension, u);for (var f = 0 / 0, p = i - 1; p >= 0; p--) {var g = t[p];if (s || (d = g.data.rawIndexOf(g.stackedByDimension, c)), d >= 0) {var v = g.data.getByRawIndex(g.stackResultDimension, d);if (h >= 0 && v > 0 || 0 >= h && 0 > v) {h += v, f = v;break;}}}return n[0] = h, n[1] = f, n;});o.hostModel.setData(l), e.data = l;});}function Us(t, e) {as.isInstance(t) || (t = as.seriesDataToSource(t)), this._source = t;var i = this._data = t.data,n = t.sourceFormat;n === Uy && (this._offset = 0, this._dimSize = e, this._data = i);var r = g_[n === Wy ? n + "_" + t.seriesLayoutBy : n];o(this, r);}function qs() {return this._data.length;}function js(t) {return this._data[t];}function Zs(t) {for (var e = 0; e < t.length; e++) {this._data.push(t[e]);}}function Ks(t, e, i) {return null != i ? t[i] : t;}function $s(t, e, i, n) {return Qs(t[n], this._dimensionInfos[e]);}function Qs(t, e) {var i = e && e.type;if ("ordinal" === i) {var n = e && e.ordinalMeta;return n ? n.parseAndCollect(t) : t;}return "time" === i && "number" != typeof t && null != t && "-" !== t && (t = +Lo(t)), null == t || "" === t ? 0 / 0 : +t;}function Js(t, e, i) {if (t) {var n = t.getRawDataItem(e);if (null != n) {var r,a,o = t.getProvider().getSource().sourceFormat,s = t.getDimensionInfo(i);return s && (r = s.name, a = s.index), v_[o](n, e, a, r);}}}function tl(t, e, i) {if (t) {var n = t.getProvider().getSource().sourceFormat;if (n === Hy || n === Gy) {var r = t.getRawDataItem(e);return n !== Hy || M(r) || (r = null), r ? r[i] : void 0;}}}function el(t) {return new il(t);}function il(t) {t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0, this.context;}function nl(t, e, i, n, r, a) {w_.reset(i, n, r, a), t._callingProgress = e, t._callingProgress({ start: i, end: n, count: n - i, next: w_.next }, t.context);}function rl(t, e) {t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null;var i, n;!e && t._reset && (i = t._reset(t.context), i && i.progress && (n = i.forceFirstProgress, i = i.progress), x(i) && !i.length && (i = null)), t._progress = i, t._modBy = t._modDataCount = null;var r = t._downstream;return r && r.dirty(), n;}function al(t) {var e = t.name;or(t) || (t.name = ol(t) || e);}function ol(t) {var e = t.getRawData(),i = e.mapDimension("seriesName", !0),n = [];return f(i, function (t) {var i = e.getDimensionInfo(t);i.displayName && n.push(i.displayName);}), n.join(" ");}function sl(t) {return t.model.getRawData().count();}function ll(t) {var e = t.model;return e.setData(e.getRawData().cloneShallow()), ul;}function ul(t, e) {e.outputData && t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData);}function hl(t, e) {f(t.CHANGABLE_METHODS, function (i) {t.wrapMethod(i, _(cl, e));});}function cl(t) {var e = dl(t);e && e.setOutputEnd(this.count());}function dl(t) {var e = (t.ecModel || {}).scheduler,i = e && e.getPipeline(t.uid);if (i) {var n = i.currentTask;if (n) {var r = n.agentStubMap;r && (n = r.get(t.uid));}return n;}}function fl() {this.group = new fg(), this.uid = yo("viewChart"), this.renderTask = el({ plan: vl, reset: ml }), this.renderTask.context = { view: this };}function pl(t, e, i) {if (t && (t.trigger(e, i), t.isGroup && !Ha(t))) for (var n = 0, r = t.childCount(); r > n; n++) {pl(t.childAt(n), e, i);}}function gl(t, e, i) {var n = ur(t, e),r = e && null != e.highlightKey ? Wa(e.highlightKey) : null;null != n ? f(tr(n), function (e) {pl(t.getItemGraphicEl(e), i, r);}) : t.eachItemGraphicEl(function (t) {pl(t, i, r);});}function vl(t) {return D_(t.model);}function ml(t) {var e = t.model,i = t.ecModel,n = t.api,r = t.payload,a = e.pipelineContext.progressiveRender,o = t.view,s = r && C_(r).updateMethod,l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";return "render" !== l && o[l](e, i, n, r), A_[l];}function yl(t, e, i) {function n() {h = new Date().getTime(), c = null, t.apply(o, s || []);}var r,a,o,s,l,u = 0,h = 0,c = null;e = e || 0;var d = function d() {r = new Date().getTime(), o = this, s = arguments;var t = l || e,d = l || i;l = null, a = r - (d ? u : h) - t, clearTimeout(c), d ? c = setTimeout(n, t) : a >= 0 ? n() : c = setTimeout(n, -a), u = r;};return d.clear = function () {c && (clearTimeout(c), c = null);}, d.debounceNextCall = function (t) {l = t;}, d;}function _l(t, e, i, n) {var r = t[e];if (r) {var a = r[P_] || r,o = r[O_],s = r[L_];if (s !== i || o !== n) {if (null == i || !n) return t[e] = a;r = t[e] = yl(a, i, "debounce" === n), r[P_] = a, r[O_] = n, r[L_] = i;}return r;}}function xl(t, e, i, n) {this.ecInstance = t, this.api = e, this.unfinished;var i = this._dataProcessorHandlers = i.slice(),n = this._visualHandlers = n.slice();this._allHandlers = i.concat(n), this._stageTaskMap = N();}function wl(t, e, i, n, r) {function a(t, e) {return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id));}r = r || {};var o;f(e, function (e) {if (!r.visualType || r.visualType === e.visualType) {var s = t._stageTaskMap.get(e.uid),l = s.seriesTaskMap,u = s.overallTask;if (u) {var h,c = u.agentStubMap;c.each(function (t) {a(r, t) && (t.dirty(), h = !0);}), h && u.dirty(), V_(u, n);var d = t.getPerformArgs(u, r.block);c.each(function (t) {t.perform(d);}), o |= u.perform(d);} else l && l.each(function (s) {a(r, s) && s.dirty();var l = t.getPerformArgs(s, r.block);l.skip = !e.performRawSeries && i.isSeriesFiltered(s.context.model), V_(s, n), o |= s.perform(l);});}}), t.unfinished |= o;}function bl(t, e, i, n, r) {function a(i) {var a = i.uid,s = o.get(a) || o.set(a, el({ plan: Dl, reset: kl, count: Pl }));s.context = { model: i, ecModel: n, api: r, useClearVisual: e.isVisual && !e.isLayout, plan: e.plan, reset: e.reset, scheduler: t }, Ll(t, i, s);}var o = i.seriesTaskMap || (i.seriesTaskMap = N()),s = e.seriesType,l = e.getTargetSeries;e.createOnAllSeries ? n.eachRawSeries(a) : s ? n.eachRawSeriesByType(s, a) : l && l(n, r).each(a);var u = t._pipelineMap;o.each(function (t, e) {u.get(e) || (t.dispose(), o.removeKey(e));});}function Ml(t, e, i, n, r) {function a(e) {var i = e.uid,n = s.get(i);n || (n = s.set(i, el({ reset: Tl, onDirty: Cl })), o.dirty()), n.context = { model: e, overallProgress: h, modifyOutputEnd: c }, n.agent = o, n.__block = h, Ll(t, e, n);}var o = i.overallTask = i.overallTask || el({ reset: Sl });o.context = { ecModel: n, api: r, overallReset: e.overallReset, scheduler: t };var s = o.agentStubMap = o.agentStubMap || N(),l = e.seriesType,u = e.getTargetSeries,h = !0,c = e.modifyOutputEnd;l ? n.eachRawSeriesByType(l, a) : u ? u(n, r).each(a) : (h = !1, f(n.getSeries(), a));var d = t._pipelineMap;s.each(function (t, e) {d.get(e) || (t.dispose(), o.dirty(), s.removeKey(e));});}function Sl(t) {t.overallReset(t.ecModel, t.api, t.payload);}function Tl(t) {return t.overallProgress && Il;}function Il() {this.agent.dirty(), this.getDownstream().dirty();}function Cl() {this.agent && this.agent.dirty();}function Dl(t) {return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload);}function kl(t) {t.useClearVisual && t.data.clearAllVisual();var e = t.resetDefines = tr(t.reset(t.model, t.ecModel, t.api, t.payload));return e.length > 1 ? p(e, function (t, e) {return Al(e);}) : H_;}function Al(t) {return function (e, i) {var n = i.data,r = i.resetDefines[t];if (r && r.dataEach) for (var a = e.start; a < e.end; a++) {r.dataEach(n, a);} else r && r.progress && r.progress(e, n);};}function Pl(t) {return t.data.count();}function Ll(t, e, i) {var n = e.uid,r = t._pipelineMap.get(n);!r.head && (r.head = i), r.tail && r.tail.pipe(i), r.tail = i, i.__idxInPipeline = r.count++, i.__pipeline = r;}function Ol(t) {W_ = null;try {t(G_, X_);} catch (e) {}return W_;}function Rl(t, e) {for (var i in e.prototype) {t[i] = V;}}function zl(t) {if (b(t)) {var e = new DOMParser();t = e.parseFromString(t, "text/xml");}for (9 === t.nodeType && (t = t.firstChild); "svg" !== t.nodeName.toLowerCase() || 1 !== t.nodeType;) {t = t.nextSibling;}return t;}function Bl() {this._defs = {}, this._root = null, this._isDefine = !1, this._isText = !1;}function El(t, e) {for (var i = t.firstChild; i;) {if (1 === i.nodeType) {var n = i.getAttribute("offset");n = n.indexOf("%") > 0 ? parseInt(n, 10) / 100 : n ? parseFloat(n) : 0;var r = i.getAttribute("stop-color") || "#000000";e.addColorStop(n, r);}i = i.nextSibling;}}function Nl(t, e) {t && t.__inheritedStyle && (e.__inheritedStyle || (e.__inheritedStyle = {}), s(e.__inheritedStyle, t.__inheritedStyle));}function Fl(t) {for (var e = R(t).split(Q_), i = [], n = 0; n < e.length; n += 2) {var r = parseFloat(e[n]),a = parseFloat(e[n + 1]);i.push([r, a]);}return i;}function Vl(t, e, i, n) {var r = e.__inheritedStyle || {},a = "text" === e.type;if (1 === t.nodeType && (Wl(t, e), o(r, Gl(t)), !n)) for (var s in ex) {if (ex.hasOwnProperty(s)) {var l = t.getAttribute(s);null != l && (r[ex[s]] = l);}}var u = a ? "textFill" : "fill",h = a ? "textStroke" : "stroke";e.style = e.style || new bg();var c = e.style;null != r.fill && c.set(u, Hl(r.fill, i)), null != r.stroke && c.set(h, Hl(r.stroke, i)), f(["lineWidth", "opacity", "fillOpacity", "strokeOpacity", "miterLimit", "fontSize"], function (t) {var e = "lineWidth" === t && a ? "textStrokeWidth" : t;null != r[t] && c.set(e, parseFloat(r[t]));}), r.textBaseline && "auto" !== r.textBaseline || (r.textBaseline = "alphabetic"), "alphabetic" === r.textBaseline && (r.textBaseline = "bottom"), "start" === r.textAlign && (r.textAlign = "left"), "end" === r.textAlign && (r.textAlign = "right"), f(["lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign", "textBaseline"], function (t) {null != r[t] && c.set(t, r[t]);}), r.lineDash && (e.style.lineDash = R(r.lineDash).split(Q_)), c[h] && "none" !== c[h] && (e[h] = !0), e.__inheritedStyle = r;}function Hl(t, e) {var i = e && t && t.match(ix);if (i) {var n = R(i[1]),r = e[n];return r;}return t;}function Wl(t, e) {var i = t.getAttribute("transform");if (i) {i = i.replace(/,/g, " ");var n = null,r = [];i.replace(nx, function (t, e, i) {r.push(e, i);});for (var a = r.length - 1; a > 0; a -= 2) {var o = r[a],s = r[a - 1];switch (n = n || Oe(), s) {case "translate":o = R(o).split(Q_), Ee(n, n, [parseFloat(o[0]), parseFloat(o[1] || 0)]);break;case "scale":o = R(o).split(Q_), Fe(n, n, [parseFloat(o[0]), parseFloat(o[1] || o[0])]);break;case "rotate":o = R(o).split(Q_), Ne(n, n, parseFloat(o[0]));break;case "skew":o = R(o).split(Q_), console.warn("Skew transform is not supported yet");break;case "matrix":var o = R(o).split(Q_);n[0] = parseFloat(o[0]), n[1] = parseFloat(o[1]), n[2] = parseFloat(o[2]), n[3] = parseFloat(o[3]), n[4] = parseFloat(o[4]), n[5] = parseFloat(o[5]);}}e.setLocalTransform(n);}}function Gl(t) {var e = t.getAttribute("style"),i = {};if (!e) return i;var n = {};rx.lastIndex = 0;for (var r; null != (r = rx.exec(e));) {n[r[1]] = r[2];}for (var a in ex) {ex.hasOwnProperty(a) && null != n[a] && (i[ex[a]] = n[a]);}return i;}function Xl(t, e, i) {var n = e / t.width,r = i / t.height,a = Math.min(n, r),o = [a, a],s = [-(t.x + t.width / 2) * a + e / 2, -(t.y + t.height / 2) * a + i / 2];return { scale: o, position: s };}function Yl(t, e) {var i = new Bl();return i.parse(t, e);}function Ul(t, e) {return function (i, n, r) {(e || !this._disposed) && (i = i && i.toLowerCase(), wp.prototype[t].call(this, i, n, r));};}function ql() {wp.call(this);}function jl(t, e, i) {function r(t, e) {return t.__prio - e.__prio;}i = i || {}, "string" == typeof e && (e = Hx[e]), this.id, this.group, this._dom = t;var a = "canvas",o = this._zr = Zn(t, { renderer: i.renderer || a, devicePixelRatio: i.devicePixelRatio, width: i.width, height: i.height });this._throttledZrFlush = yl(y(o.flush, o), 17);var e = n(e);e && d_(e, !0), this._theme = e, this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new Cs();var s = this._api = du(this);Ri(Vx, r), Ri(Ex, r), this._scheduler = new xl(this, s, Ex, Vx), wp.call(this, this._ecEventProcessor = new fu()), this._messageCenter = new ql(), this._initEvents(), this.resize = y(this.resize, this), this._pendingActions = [], o.animation.on("frame", this._onframe, this), iu(o, this), z(this);}function Zl(t, e, i) {if (!this._disposed) {var n,r = this._model,a = this._coordSysMgr.getCoordinateSystems();e = cr(r, e);for (var o = 0; o < a.length; o++) {var s = a[o];if (s[t] && null != (n = s[t](r, e, i))) return n;}}}function Kl(t) {var e = t._model,i = t._scheduler;i.restorePipelines(e), i.prepareStageTasks(), nu(t, "component", e, i), nu(t, "chart", e, i), i.plan();}function $l(t, e, i, n, r) {function a(n) {n && n.__alive && n[e] && n[e](n.__model, o, t._api, i);}var o = t._model;if (!n) return void ux(t._componentsViews.concat(t._chartsViews), a);var s = {};s[n + "Id"] = i[n + "Id"], s[n + "Index"] = i[n + "Index"], s[n + "Name"] = i[n + "Name"];var l = { mainType: n, query: s };r && (l.subType = r);var u = i.excludeSeriesId;null != u && (u = N(tr(u))), o && o.eachComponent(l, function (e) {u && null != u.get(e.id) || a(t["series" === n ? "_chartsMap" : "_componentsMap"][e.__viewId]);}, t);}function Ql(t, e) {var i = t._chartsMap,n = t._scheduler;e.eachSeries(function (t) {n.updateStreamModes(t, i[t.__viewId]);});}function Jl(t, e) {var i = t.type,n = t.escapeConnect,r = zx[i],a = r.actionInfo,l = (a.update || "update").split(":"),u = l.pop();l = null != l[0] && dx(l[0]), this[kx] = !0;var h = [t],c = !1;t.batch && (c = !0, h = p(t.batch, function (e) {return e = s(o({}, e), t), e.batch = null, e;}));var d,f = [],g = "highlight" === i || "downplay" === i;ux(h, function (t) {d = r.action(t, this._model, this._api), d = d || o({}, t), d.type = a.event || d.type, f.push(d), g ? $l(this, u, t, "series") : l && $l(this, u, t, l.main, l.sub);}, this), "none" === u || g || l || (this[Ax] ? (Kl(this), Ox.update.call(this, t), this[Ax] = !1) : Ox[u].call(this, t)), d = c ? { type: a.event || i, escapeConnect: n, batch: f } : f[0], this[kx] = !1, !e && this._messageCenter.trigger(d.type, d);}function tu(t) {for (var e = this._pendingActions; e.length;) {var i = e.shift();Jl.call(this, i, t);}}function eu(t) {!t && this.trigger("updated");}function iu(t, e) {t.on("rendered", function () {e.trigger("rendered"), !t.animation.isFinished() || e[Ax] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished");});}function nu(t, e, i, n) {function r(t) {var e = "_ec_" + t.id + "_" + t.type,r = s[e];if (!r) {var h = dx(t.type),c = a ? S_.getClass(h.main, h.sub) : fl.getClass(h.sub);r = new c(), r.init(i, u), s[e] = r, o.push(r), l.add(r.group);}t.__viewId = r.__id = e, r.__alive = !0, r.__model = t, r.group.__ecComponentInfo = { mainType: t.mainType, index: t.componentIndex }, !a && n.prepareView(r, t, i, u);}for (var a = "component" === e, o = a ? t._componentsViews : t._chartsViews, s = a ? t._componentsMap : t._chartsMap, l = t._zr, u = t._api, h = 0; h < o.length; h++) {o[h].__alive = !1;}a ? i.eachComponent(function (t, e) {"series" !== t && r(e);}) : i.eachSeries(r);for (var h = 0; h < o.length;) {var c = o[h];c.__alive ? h++ : (!a && c.renderTask.dispose(), l.remove(c.group), c.dispose(i, u), o.splice(h, 1), delete s[c.__id], c.__id = c.group.__ecComponentInfo = null);}}function ru(t) {t.clearColorPalette(), t.eachSeries(function (t) {t.clearColorPalette();});}function au(t, e, i, n) {ou(t, e, i, n), ux(t._chartsViews, function (t) {t.__alive = !1;}), su(t, e, i, n), ux(t._chartsViews, function (t) {t.__alive || t.remove(e, i);});}function ou(t, e, i, n, r) {ux(r || t._componentsViews, function (t) {var r = t.__model;t.render(r, e, i, n), cu(r, t);});}function su(t, e, i, n, r) {var a,o = t._scheduler;e.eachSeries(function (e) {var i = t._chartsMap[e.__viewId];i.__alive = !0;var s = i.renderTask;o.updatePayload(s, n), r && r.get(e.uid) && s.dirty(), a |= s.perform(o.getPerformArgs(s)), i.group.silent = !!e.get("silent"), cu(e, i), hu(e, i);}), o.unfinished |= a, uu(t, e), B_(t._zr.dom, e);}function lu(t, e) {ux(Fx, function (i) {i(t, e);});}function uu(t, e) {var i = t._zr,n = i.storage,r = 0;n.traverse(function () {r++;
    }), r > e.get("hoverLayerThreshold") && !Jf.node && e.eachSeries(function (e) {if (!e.preventUsingHoverLayer) {var i = t._chartsMap[e.__viewId];i.__alive && i.group.traverse(function (t) {t.useHoverLayer = !0;});}});}function hu(t, e) {var i = t.get("blendMode") || null;e.group.traverse(function (t) {t.isGroup || t.style.blend !== i && t.setStyle("blend", i), t.eachPendingDisplayable && t.eachPendingDisplayable(function (t) {t.setStyle("blend", i);});});}function cu(t, e) {var i = t.get("z"),n = t.get("zlevel");e.group.traverse(function (t) {"group" !== t.type && (null != i && (t.z = i), null != n && (t.zlevel = n));});}function du(t) {var e = t._coordSysMgr;return o(new Is(t), { getCoordinateSystems: y(e.getCoordinateSystems, e), getComponentByElement: function getComponentByElement(e) {for (; e;) {var i = e.__ecComponentInfo;if (null != i) return t._model.getComponent(i.mainType, i.index);e = e.parent;}} });}function fu() {this.eventInfo;}function pu(t) {function e(t, e) {for (var i = 0; i < t.length; i++) {var n = t[i];n[a] = e;}}var i = 0,n = 1,r = 2,a = "__connectUpdateStatus";ux(Bx, function (o, s) {t._messageCenter.on(s, function (o) {if (Xx[t.group] && t[a] !== i) {if (o && o.escapeConnect) return;var s = t.makeActionFromEvent(o),l = [];ux(Gx, function (e) {e !== t && e.group === t.group && l.push(e);}), e(l, i), ux(l, function (t) {t[a] !== n && t.dispatchAction(s);}), e(l, r);}});});}function gu(t, e, i) {var n = _u(t);if (n) return n;var r = new jl(t, e, i);return r.id = "ec_" + Yx++, Gx[r.id] = r, fr(t, qx, r.id), pu(r), r;}function vu(t) {if (x(t)) {var e = t;t = null, ux(e, function (e) {null != e.group && (t = e.group);}), t = t || "g_" + Ux++, ux(e, function (e) {e.group = t;});}return Xx[t] = !0, t;}function mu(t) {Xx[t] = !1;}function yu(t) {"string" == typeof t ? t = Gx[t] : t instanceof jl || (t = _u(t)), t instanceof jl && !t.isDisposed() && t.dispose();}function _u(t) {return Gx[pr(t, qx)];}function xu(t) {return Gx[t];}function wu(t, e) {Hx[t] = e;}function bu(t) {Nx.push(t);}function Mu(t, e) {Au(Ex, t, e, vx);}function Su(t) {Fx.push(t);}function Tu(t, e, i) {"function" == typeof e && (i = e, e = "");var n = cx(t) ? t.type : [t, t = { event: e }][0];t.event = (t.event || n).toLowerCase(), e = t.event, lx(Px.test(n) && Px.test(e)), zx[n] || (zx[n] = { action: i, actionInfo: t }), Bx[e] = n;}function Iu(t, e) {Cs.register(t, e);}function Cu(t) {var e = Cs.get(t);return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice() : void 0;}function Du(t, e) {Au(Vx, t, e, xx, "layout");}function ku(t, e) {Au(Vx, t, e, Sx, "visual");}function Au(t, e, i, n, r) {(hx(e) || cx(e)) && (i = e, e = n);var a = xl.wrapStageHandler(i, r);return a.__prio = e, a.__raw = i, t.push(a), a;}function Pu(t, e) {Wx[t] = e;}function Lu(t) {return By.extend(t);}function Ou(t) {return S_.extend(t);}function Ru(t) {return M_.extend(t);}function zu(t) {return fl.extend(t);}function Bu(t) {i("createCanvas", t);}function Eu(t, e, i) {ox.registerMap(t, e, i);}function Nu(t) {var e = ox.retrieveMap(t);return e && e[0] && { geoJson: e[0].geoJSON, specialAreas: e[0].specialAreas };}function Fu(t) {return t;}function Vu(t, e, i, n, r) {this._old = t, this._new = e, this._oldKeyGetter = i || Fu, this._newKeyGetter = n || Fu, this.context = r;}function Hu(t, e, i, n, r) {for (var a = 0; a < t.length; a++) {var o = "_ec_" + r[n](t[a], a),s = e[o];null == s ? (i.push(o), e[o] = a) : (s.length || (e[o] = s = [s]), s.push(a));}}function Wu(t) {var e = {},i = e.encode = {},n = N(),r = [],a = [],o = e.userOutput = { dimensionNames: t.dimensions.slice(), encode: {} };f(t.dimensions, function (e) {var s = t.getDimensionInfo(e),l = s.coordDim;if (l) {var u = s.coordDimIndex;Gu(i, l)[u] = e, s.isExtraCoord || (n.set(l, 1), Yu(s.type) && (r[0] = e), Gu(o.encode, l)[u] = s.index), s.defaultTooltip && a.push(e);}Kx.each(function (t, e) {var n = Gu(i, e),r = s.otherDims[e];null != r && r !== !1 && (n[r] = s.name);});});var s = [],l = {};n.each(function (t, e) {var n = i[e];l[e] = n[0], s = s.concat(n);}), e.dataDimsOnCoord = s, e.encodeFirstDimNotExtra = l;var u = i.label;u && u.length && (r = u.slice());var h = i.tooltip;return h && h.length ? a = h.slice() : a.length || (a = r.slice()), i.defaultedLabel = r, i.defaultedTooltip = a, e;}function Gu(t, e) {return t.hasOwnProperty(e) || (t[e] = []), t[e];}function Xu(t) {return "category" === t ? "ordinal" : "time" === t ? "time" : "float";}function Yu(t) {return !("ordinal" === t || "time" === t);}function Uu(t) {null != t && o(this, t), this.otherDims = {};}function qu(t) {return t._rawCount > 65535 ? iw : rw;}function ju(t) {var e = t.constructor;return e === Array ? t.slice() : new e(t);}function Zu(t, e) {f(aw.concat(e.__wrappedMethods || []), function (i) {e.hasOwnProperty(i) && (t[i] = e[i]);}), t.__wrappedMethods = e.__wrappedMethods, f(ow, function (i) {t[i] = n(e[i]);}), t._calculationInfo = o(e._calculationInfo);}function Ku(t, e, i, n, r) {var a = ew[e.type],o = n - 1,s = e.name,l = t[s][o];if (l && l.length < i) {for (var u = new a(Math.min(r - o * i, i)), h = 0; h < l.length; h++) {u[h] = l[h];}t[s][o] = u;}for (var c = n * i; r > c; c += i) {t[s].push(new a(Math.min(r - c, i)));}}function $u(t) {var e = t._invertedIndicesMap;f(e, function (i, n) {var r = t._dimensionInfos[n],a = r.ordinalMeta;if (a) {i = e[n] = new nw(a.categories.length);for (var o = 0; o < i.length; o++) {i[o] = Jx;}for (var o = 0; o < t._count; o++) {i[t.get(n, o)] = o;}}});}function Qu(t, e, i) {var n;if (null != e) {var r = t._chunkSize,a = Math.floor(i / r),o = i % r,s = t.dimensions[e],l = t._storage[s][a];if (l) {n = l[o];var u = t._dimensionInfos[s].ordinalMeta;u && u.categories.length && (n = u.categories[n]);}}return n;}function Ju(t) {return t;}function th(t) {return t < this._count && t >= 0 ? this._indices[t] : -1;}function eh(t, e) {var i = t._idList[e];return null == i && (i = Qu(t, t._idDimIdx, e)), null == i && (i = tw + e), i;}function ih(t) {return x(t) || (t = [t]), t;}function nh(t, e) {var i = t.dimensions,n = new sw(p(i, t.getDimensionInfo, t), t.hostModel);Zu(n, t);for (var r = n._storage = {}, a = t._storage, o = 0; o < i.length; o++) {var s = i[o];a[s] && (u(e, s) >= 0 ? (r[s] = rh(a[s]), n._rawExtent[s] = ah(), n._extent[s] = null) : r[s] = a[s]);}return n;}function rh(t) {for (var e = new Array(t.length), i = 0; i < t.length; i++) {e[i] = ju(t[i]);}return e;}function ah() {return [1 / 0, -1 / 0];}function oh(t, e, i) {function r(t, e, i) {null != Kx.get(e) ? t.otherDims[e] = i : (t.coordDim = e, t.coordDimIndex = i, u.set(e, !0));}as.isInstance(e) || (e = as.seriesDataToSource(e)), i = i || {}, t = (t || []).slice();for (var a = (i.dimsDef || []).slice(), l = N(), u = N(), h = [], c = sh(e, t, a, i.dimCount), d = 0; c > d; d++) {var p = a[d] = o({}, M(a[d]) ? a[d] : { name: a[d] }),g = p.name,v = h[d] = new Uu();null != g && null == l.get(g) && (v.name = v.displayName = g, l.set(g, d)), null != p.type && (v.type = p.type), null != p.displayName && (v.displayName = p.displayName);}var m = i.encodeDef;!m && i.encodeDefaulter && (m = i.encodeDefaulter(e, c)), m = N(m), m.each(function (t, e) {if (t = tr(t).slice(), 1 === t.length && !b(t[0]) && t[0] < 0) return void m.set(e, !1);var i = m.set(e, []);f(t, function (t, n) {b(t) && (t = l.get(t)), null != t && c > t && (i[n] = t, r(h[t], e, n));});});var y = 0;f(t, function (t) {var e, t, i, a;if (b(t)) e = t, t = {};else {e = t.name;var o = t.ordinalMeta;t.ordinalMeta = null, t = n(t), t.ordinalMeta = o, i = t.dimsDef, a = t.otherDims, t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null;}var l = m.get(e);if (l !== !1) {var l = tr(l);if (!l.length) for (var u = 0; u < (i && i.length || 1); u++) {for (; y < h.length && null != h[y].coordDim;) {y++;}y < h.length && l.push(y++);}f(l, function (n, o) {var l = h[n];if (r(s(l, t), e, o), null == l.name && i) {var u = i[o];!M(u) && (u = { name: u }), l.name = l.displayName = u.name, l.defaultTooltip = u.defaultTooltip;}a && s(l.otherDims, a);});}});var _ = i.generateCoord,x = i.generateCoordCount,w = null != x;x = _ ? x || 1 : 0;for (var S = _ || "value", T = 0; c > T; T++) {var v = h[T] = h[T] || new Uu(),I = v.coordDim;null == I && (v.coordDim = lh(S, u, w), v.coordDimIndex = 0, (!_ || 0 >= x) && (v.isExtraCoord = !0), x--), null == v.name && (v.name = lh(v.coordDim, l)), null != v.type || ms(e, T, v.name) !== Zy.Must && (!v.isExtraCoord || null == v.otherDims.itemName && null == v.otherDims.seriesName) || (v.type = "ordinal");}return h;}function sh(t, e, i, n) {var r = Math.max(t.dimensionsDetectCount || 1, e.length, i.length, n || 0);return f(e, function (t) {var e = t.dimsDef;e && (r = Math.max(r, e.length));}), r;}function lh(t, e, i) {if (i || null != e.get(t)) {for (var n = 0; null != e.get(t + n);) {n++;}t += n;}return e.set(t, !0), t;}function uh(t) {this.coordSysName = t, this.coordSysDims = [], this.axisMap = N(), this.categoryAxisMap = N(), this.firstCategoryDimIndex = null;}function hh(t) {var e = t.get("coordinateSystem"),i = new uh(e),n = cw[e];return n ? (n(t, i, i.axisMap, i.categoryAxisMap), i) : void 0;}function ch(t) {return "category" === t.get("type");}function dh(t, e, i) {i = i || {};var n,r,a,o,s = i.byIndex,l = i.stackedCoordDimension,u = !(!t || !t.get("stack"));if (f(e, function (t, i) {b(t) && (e[i] = t = { name: t }), u && !t.isExtraCoord && (s || n || !t.ordinalMeta || (n = t), r || "ordinal" === t.type || "time" === t.type || l && l !== t.coordDim || (r = t));}), !r || s || n || (s = !0), r) {a = "__\x00ecstackresult", o = "__\x00ecstackedover", n && (n.createInvertedIndices = !0);var h = r.coordDim,c = r.type,d = 0;f(e, function (t) {t.coordDim === h && d++;}), e.push({ name: a, coordDim: h, coordDimIndex: d, type: c, isExtraCoord: !0, isCalculationCoord: !0 }), d++, e.push({ name: o, coordDim: o, coordDimIndex: d, type: c, isExtraCoord: !0, isCalculationCoord: !0 });}return { stackedDimension: r && r.name, stackedByDimension: n && n.name, isStackedByIndex: s, stackedOverDimension: o, stackResultDimension: a };}function fh(t, e) {return !!e && e === t.getCalculationInfo("stackedDimension");}function ph(t, e) {return fh(t, e) ? t.getCalculationInfo("stackResultDimension") : e;}function gh(t, e, i) {i = i || {}, as.isInstance(t) || (t = as.seriesDataToSource(t));var n,r = e.get("coordinateSystem"),a = Cs.get(r),o = hh(e);o && (n = p(o.coordSysDims, function (t) {var e = { name: t },i = o.axisMap.get(t);if (i) {var n = i.get("type");e.type = Xu(n);}return e;})), n || (n = a && (a.getDimensionsInfo ? a.getDimensionsInfo() : a.dimensions.slice()) || ["x", "y"]);var s,l,u = hw(t, { coordDimensions: n, generateCoord: i.generateCoord, encodeDefaulter: i.useEncodeDefaulter ? _(ps, n, e) : null });o && f(u, function (t, e) {var i = t.coordDim,n = o.categoryAxisMap.get(i);n && (null == s && (s = e), t.ordinalMeta = n.getOrdinalMeta()), null != t.otherDims.itemName && (l = !0);}), l || null == s || (u[s].otherDims.itemName = 0);var h = dh(e, u),c = new sw(u, e);c.setCalculationInfo(h);var d = null != s && vh(t) ? function (t, e, i, n) {return n === s ? i : this.defaultDimValueGetter(t, e, i, n);} : null;return c.hasItemOption = !1, c.initData(t, null, d), c;}function vh(t) {if (t.sourceFormat === Hy) {var e = mh(t.data || []);return null != e && !x(ir(e));}}function mh(t) {for (var e = 0; e < t.length && null == t[e];) {e++;}return t[e];}function yh(t) {this._setting = t || {}, this._extent = [1 / 0, -1 / 0], this._interval = 0, this.init && this.init.apply(this, arguments);}function _h(t) {this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this._map;}function xh(t) {return t._map || (t._map = N(t.categories));}function wh(t) {return M(t) && null != t.value ? t.value : t + "";}function bh(t, e, i, n) {var r = {},a = t[1] - t[0],o = r.interval = zo(a / e, !0);null != i && i > o && (o = r.interval = i), null != n && o > n && (o = r.interval = n);var s = r.intervalPrecision = Mh(o),l = r.niceTickExtent = [gw(Math.ceil(t[0] / o) * o, s), gw(Math.floor(t[1] / o) * o, s)];return Th(l, t), r;}function Mh(t) {return Co(t) + 2;}function Sh(t, e, i) {t[e] = Math.max(Math.min(t[e], i[1]), i[0]);}function Th(t, e) {!isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), Sh(t, 0, e), Sh(t, 1, e), t[0] > t[1] && (t[0] = t[1]);}function Ih(t) {return t.get("stack") || yw + t.seriesIndex;}function Ch(t) {return t.dim + t.index;}function Dh(t, e) {var i = [];return e.eachSeriesByType(t, function (t) {Oh(t) && !Rh(t) && i.push(t);}), i;}function kh(t) {var e = {};f(t, function (t) {var i = t.coordinateSystem,n = i.getBaseAxis();if ("time" === n.type || "value" === n.type) for (var r = t.getData(), a = n.dim + "_" + n.index, o = r.mapDimension(n.dim), s = 0, l = r.count(); l > s; ++s) {var u = r.get(o, s);e[a] ? e[a].push(u) : e[a] = [u];}});var i = [];for (var n in e) {if (e.hasOwnProperty(n)) {var r = e[n];if (r) {r.sort(function (t, e) {return t - e;});for (var a = null, o = 1; o < r.length; ++o) {var s = r[o] - r[o - 1];s > 0 && (a = null === a ? s : Math.min(a, s));}i[n] = a;}}}return i;}function Ah(t) {var e = kh(t),i = [];return f(t, function (t) {var n,r = t.coordinateSystem,a = r.getBaseAxis(),o = a.getExtent();if ("category" === a.type) n = a.getBandWidth();else if ("value" === a.type || "time" === a.type) {var s = a.dim + "_" + a.index,l = e[s],u = Math.abs(o[1] - o[0]),h = a.scale.getExtent(),c = Math.abs(h[1] - h[0]);n = l ? u / c * l : u;} else {var d = t.getData();n = Math.abs(o[1] - o[0]) / d.count();}var f = Mo(t.get("barWidth"), n),p = Mo(t.get("barMaxWidth"), n),g = Mo(t.get("barMinWidth") || 1, n),v = t.get("barGap"),m = t.get("barCategoryGap");i.push({ bandWidth: n, barWidth: f, barMaxWidth: p, barMinWidth: g, barGap: v, barCategoryGap: m, axisKey: Ch(a), stackId: Ih(t) });}), Ph(i);}function Ph(t) {var e = {};f(t, function (t) {var i = t.axisKey,n = t.bandWidth,r = e[i] || { bandWidth: n, remainedWidth: n, autoWidthCount: 0, categoryGap: "20%", gap: "30%", stacks: {} },a = r.stacks;e[i] = r;var o = t.stackId;a[o] || r.autoWidthCount++, a[o] = a[o] || { width: 0, maxWidth: 0 };var s = t.barWidth;s && !a[o].width && (a[o].width = s, s = Math.min(r.remainedWidth, s), r.remainedWidth -= s);var l = t.barMaxWidth;l && (a[o].maxWidth = l);var u = t.barMinWidth;u && (a[o].minWidth = u);var h = t.barGap;null != h && (r.gap = h);var c = t.barCategoryGap;null != c && (r.categoryGap = c);});var i = {};return f(e, function (t, e) {i[e] = {};var n = t.stacks,r = t.bandWidth,a = Mo(t.categoryGap, r),o = Mo(t.gap, 1),s = t.remainedWidth,l = t.autoWidthCount,u = (s - a) / (l + (l - 1) * o);u = Math.max(u, 0), f(n, function (t) {var e = t.maxWidth,i = t.minWidth;if (t.width) {var n = t.width;e && (n = Math.min(n, e)), i && (n = Math.max(n, i)), t.width = n, s -= n + o * n, l--;} else {var n = u;e && n > e && (n = Math.min(e, s)), i && i > n && (n = i), n !== u && (t.width = n, s -= n + o * n, l--);}}), u = (s - a) / (l + (l - 1) * o), u = Math.max(u, 0);var h,c = 0;f(n, function (t) {t.width || (t.width = u), h = t, c += t.width * (1 + o);}), h && (c -= h.width * o);var d = -c / 2;f(n, function (t, n) {i[e][n] = i[e][n] || { bandWidth: r, offset: d, width: t.width }, d += t.width * (1 + o);});}), i;}function Lh(t, e, i) {if (t && e) {var n = t[Ch(e)];return null != n && null != i && (n = n[Ih(i)]), n;}}function Oh(t) {return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type;}function Rh(t) {return t.pipelineContext && t.pipelineContext.large;}function zh(t, e) {return e.toGlobalCoord(e.dataToCoord("log" === e.type ? 1 : 0));}function Bh(t, e) {return Rw(t, Ow(e));}function Eh(t, e) {var i,n,r,a = t.type,o = e.getMin(),s = e.getMax(),l = t.getExtent();"ordinal" === a ? i = e.getCategories().length : (n = e.get("boundaryGap"), x(n) || (n = [n || 0, n || 0]), "boolean" == typeof n[0] && (n = [0, 0]), n[0] = Mo(n[0], 1), n[1] = Mo(n[1], 1), r = l[1] - l[0] || Math.abs(l[0])), "dataMin" === o ? o = l[0] : "function" == typeof o && (o = o({ min: l[0], max: l[1] })), "dataMax" === s ? s = l[1] : "function" == typeof s && (s = s({ min: l[0], max: l[1] }));var u = null != o,h = null != s;null == o && (o = "ordinal" === a ? i ? 0 : 0 / 0 : l[0] - n[0] * r), null == s && (s = "ordinal" === a ? i ? i - 1 : 0 / 0 : l[1] + n[1] * r), (null == o || !isFinite(o)) && (o = 0 / 0), (null == s || !isFinite(s)) && (s = 0 / 0), t.setBlank(C(o) || C(s) || "ordinal" === a && !t.getOrdinalMeta().categories.length), e.getNeedCrossZero() && (o > 0 && s > 0 && !u && (o = 0), 0 > o && 0 > s && !h && (s = 0));var c = e.ecModel;if (c && "time" === a) {var d,p = Dh("bar", c);if (f(p, function (t) {d |= t.getBaseAxis() === e.axis;}), d) {var g = Ah(p),v = Nh(o, s, e, g);o = v.min, s = v.max;}}return { extent: [o, s], fixMin: u, fixMax: h };}function Nh(t, e, i, n) {var r = i.axis.getExtent(),a = r[1] - r[0],o = Lh(n, i.axis);if (void 0 === o) return { min: t, max: e };var s = 1 / 0;f(o, function (t) {s = Math.min(t.offset, s);});var l = -1 / 0;f(o, function (t) {l = Math.max(t.offset + t.width, l);}), s = Math.abs(s), l = Math.abs(l);var u = s + l,h = e - t,c = 1 - (s + l) / a,d = h / c - h;return e += d * (l / u), t -= d * (s / u), { min: t, max: e };}function Fh(t, e) {var i = Eh(t, e),n = i.extent,r = e.get("splitNumber");"log" === t.type && (t.base = e.get("logBase"));var a = t.type;t.setExtent(n[0], n[1]), t.niceExtent({ splitNumber: r, fixMin: i.fixMin, fixMax: i.fixMax, minInterval: "interval" === a || "time" === a ? e.get("minInterval") : null, maxInterval: "interval" === a || "time" === a ? e.get("maxInterval") : null });var o = e.get("interval");null != o && t.setInterval && t.setInterval(o);}function Vh(t, e) {if (e = e || t.get("type")) switch (e) {case "category":return new pw(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [1 / 0, -1 / 0]);case "value":return new mw();default:return (yh.getClass(e) || mw).create(t);}}function Hh(t) {var e = t.getLabelModel().get("formatter"),i = "category" === t.type ? t.scale.getExtent()[0] : null;return "string" == typeof e ? e = function (e) {return function (i) {return i = t.scale.getLabel(i), e.replace("{value}", null != i ? i : "");};}(e) : "function" == typeof e ? function (n, r) {return null != i && (r = n - i), e(Wh(t, n), r);} : function (e) {return t.scale.getLabel(e);};}function Wh(t, e) {return "category" === t.type ? t.scale.getLabel(e) : e;}function Gh(t) {var e = t.get("interval");return null == e ? "auto" : e;}function Xh(t) {return "category" === t.type && 0 === Gh(t.getLabelModel());}function Yh(t, e) {if ("image" !== this.type) {var i = this.style,n = this.shape;n && "line" === n.symbolType ? i.stroke = t : this.__isEmptyBrush ? (i.stroke = t, i.fill = e || "#fff") : (i.fill && (i.fill = t), i.stroke && (i.stroke = t)), this.dirty(!1);}}function Uh(t, e, i, n, r, a, o) {var s = 0 === t.indexOf("empty");s && (t = t.substr(5, 1).toLowerCase() + t.substr(6));var l;return l = 0 === t.indexOf("image://") ? wa(t.slice(8), new Ii(e, i, n, r), o ? "center" : "cover") : 0 === t.indexOf("path://") ? xa(t.slice(7), {}, new Ii(e, i, n, r), o ? "center" : "cover") : new jw({ shape: { symbolType: t, x: e, y: i, width: n, height: r } }), l.__isEmptyBrush = s, l.setColor = Yh, l.setColor(a), l;}function qh(t) {return gh(t.getSource(), t);}function jh(t, e) {var i = e;go.isInstance(e) || (i = new go(e), c(i, Vw));var n = Vh(i);return n.setExtent(t[0], t[1]), Fh(n, i), n;}function Zh(t) {c(t, Vw);}function Kh(t, e) {return Math.abs(t - e) < $w;}function $h(t, e, i) {var n = 0,r = t[0];if (!r) return !1;for (var a = 1; a < t.length; a++) {var o = t[a];n += qr(r[0], r[1], o[0], o[1], e, i), r = o;}var s = t[0];return Kh(r[0], s[0]) && Kh(r[1], s[1]) || (n += qr(r[0], r[1], s[0], s[1], e, i)), 0 !== n;}function Qh(t, e, i) {if (this.name = t, this.geometries = e, i) i = [i[0], i[1]];else {var n = this.getBoundingRect();i = [n.x + n.width / 2, n.y + n.height / 2];}this.center = i;}function Jh(t) {if (!t.UTF8Encoding) return t;var e = t.UTF8Scale;null == e && (e = 1024);for (var i = t.features, n = 0; n < i.length; n++) {for (var r = i[n], a = r.geometry, o = a.coordinates, s = a.encodeOffsets, l = 0; l < o.length; l++) {var u = o[l];if ("Polygon" === a.type) o[l] = tc(u, s[l], e);else if ("MultiPolygon" === a.type) for (var h = 0; h < u.length; h++) {var c = u[h];u[h] = tc(c, s[l][h], e);}}}return t.UTF8Encoding = !1, t;}function tc(t, e, i) {for (var n = [], r = e[0], a = e[1], o = 0; o < t.length; o += 2) {var s = t.charCodeAt(o) - 64,l = t.charCodeAt(o + 1) - 64;s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), s += r, l += a, r = s, a = l, n.push([s / i, l / i]);}return n;}function ec(t) {return "category" === t.type ? nc(t) : oc(t);}function ic(t, e) {return "category" === t.type ? ac(t, e) : { ticks: t.scale.getTicks() };}function nc(t) {var e = t.getLabelModel(),i = rc(t, e);return !e.get("show") || t.scale.isBlank() ? { labels: [], labelCategoryInterval: i.labelCategoryInterval } : i;}function rc(t, e) {var i = sc(t, "labels"),n = Gh(e),r = lc(i, n);if (r) return r;var a, o;return w(n) ? a = pc(t, n) : (o = "auto" === n ? hc(t) : n, a = fc(t, o)), uc(i, n, { labels: a, labelCategoryInterval: o });}function ac(t, e) {var i = sc(t, "ticks"),n = Gh(e),r = lc(i, n);if (r) return r;var a, o;if ((!e.get("show") || t.scale.isBlank()) && (a = []), w(n)) a = pc(t, n, !0);else if ("auto" === n) {var s = rc(t, t.getLabelModel());o = s.labelCategoryInterval, a = p(s.labels, function (t) {return t.tickValue;});} else o = n, a = fc(t, o, !0);return uc(i, n, { ticks: a, tickCategoryInterval: o });}function oc(t) {var e = t.scale.getTicks(),i = Hh(t);return { labels: p(e, function (e, n) {return { formattedLabel: i(e, n), rawLabel: t.scale.getLabel(e), tickValue: e };}) };}function sc(t, e) {return Jw(t)[e] || (Jw(t)[e] = []);}function lc(t, e) {for (var i = 0; i < t.length; i++) {if (t[i].key === e) return t[i].value;}}function uc(t, e, i) {return t.push({ key: e, value: i }), i;}function hc(t) {var e = Jw(t).autoInterval;return null != e ? e : Jw(t).autoInterval = t.calculateCategoryInterval();}function cc(t) {var e = dc(t),i = Hh(t),n = (e.axisRotate - e.labelRotate) / 180 * Math.PI,r = t.scale,a = r.getExtent(),o = r.count();if (a[1] - a[0] < 1) return 0;var s = 1;o > 40 && (s = Math.max(1, Math.floor(o / 40)));for (var l = a[0], u = t.dataToCoord(l + 1) - t.dataToCoord(l), h = Math.abs(u * Math.cos(n)), c = Math.abs(u * Math.sin(n)), d = 0, f = 0; l <= a[1]; l += s) {var p = 0,g = 0,v = Yi(i(l), e.font, "center", "top");p = 1.3 * v.width, g = 1.3 * v.height, d = Math.max(d, p, 7), f = Math.max(f, g, 7);}var m = d / h,y = f / c;isNaN(m) && (m = 1 / 0), isNaN(y) && (y = 1 / 0);var _ = Math.max(0, Math.floor(Math.min(m, y))),x = Jw(t.model),w = t.getExtent(),b = x.lastAutoInterval,M = x.lastTickCount;return null != b && null != M && Math.abs(b - _) <= 1 && Math.abs(M - o) <= 1 && b > _ && x.axisExtend0 === w[0] && x.axisExtend1 === w[1] ? _ = b : (x.lastTickCount = o, x.lastAutoInterval = _, x.axisExtend0 = w[0], x.axisExtend1 = w[1]), _;}function dc(t) {var e = t.getLabelModel();return { axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0, labelRotate: e.get("rotate") || 0, font: e.getFont() };}function fc(t, e, i) {function n(t) {l.push(i ? t : { formattedLabel: r(t), rawLabel: a.getLabel(t), tickValue: t });}var r = Hh(t),a = t.scale,o = a.getExtent(),s = t.getLabelModel(),l = [],u = Math.max((e || 0) + 1, 1),h = o[0],c = a.count();0 !== h && u > 1 && c / u > 2 && (h = Math.round(Math.ceil(h / u) * u));var d = Xh(t),f = s.get("showMinLabel") || d,p = s.get("showMaxLabel") || d;f && h !== o[0] && n(o[0]);for (var g = h; g <= o[1]; g += u) {n(g);}return p && g - u !== o[1] && n(o[1]), l;}function pc(t, e, i) {var n = t.scale,r = Hh(t),a = [];return f(n.getTicks(), function (t) {var o = n.getLabel(t);e(t, o) && a.push(i ? t : { formattedLabel: r(t), rawLabel: o, tickValue: t });}), a;}function gc(t, e) {var i = t[1] - t[0],n = e,r = i / n / 2;t[0] += r, t[1] -= r;}function vc(t, e, i, n) {function r(t, e) {return t = So(t), e = So(e), d ? t > e : e > t;}var a = e.length;if (t.onBand && !i && a) {var o,s,l = t.getExtent();if (1 === a) e[0].coord = l[0], o = e[1] = { coord: l[0] };else {var u = e[a - 1].tickValue - e[0].tickValue,h = (e[a - 1].coord - e[0].coord) / u;f(e, function (t) {t.coord -= h / 2;});var c = t.scale.getExtent();s = 1 + c[1] - e[a - 1].tickValue, o = { coord: e[a - 1].coord + h * s }, e.push(o);}var d = l[0] > l[1];r(e[0].coord, l[0]) && (n ? e[0].coord = l[0] : e.shift()), n && r(l[0], e[0].coord) && e.unshift({ coord: l[0] }), r(l[1], o.coord) && (n ? o.coord = l[1] : e.pop()), n && r(o.coord, l[1]) && e.push({ coord: l[1] });}}function mc(t, e) {this.getAllNames = function () {var t = e();return t.mapArray(t.getName);}, this.containName = function (t) {var i = e();return i.indexOfName(t) >= 0;}, this.indexOfName = function (e) {var i = t();return i.indexOfName(e);}, this.getItemVisual = function (e, i) {var n = t();return n.getItemVisual(e, i);};}function yc(t, e, i, n) {var r = e.getData(),a = this.dataIndex,o = r.getName(a),s = e.get("selectedOffset");n.dispatchAction({ type: "pieToggleSelect", from: t, name: o, seriesId: e.id }), r.each(function (t) {_c(r.getItemGraphicEl(t), r.getItemLayout(t), e.isSelected(r.getName(t)), s, i);});}function _c(t, e, i, n, r) {var a = (e.startAngle + e.endAngle) / 2,o = Math.cos(a),s = Math.sin(a),l = i ? n : 0,u = [o * l, s * l];r ? t.animate().when(200, { position: u }).start("bounceOut") : t.attr("position", u);}function xc(t, e) {fg.call(this);var i = new Lm({ z2: 2 }),n = new Em(),r = new Dm();this.add(i), this.add(n), this.add(r), this.updateData(t, e, !0);}function wc(t, e, i, n, r, a, o, s, l, u) {function h(e, i, n) {for (var r = e; i > r && !(t[r].y + n > l + o); r++) {if (t[r].y += n, r > e && i > r + 1 && t[r + 1].y > t[r].y + t[r].height) return void c(r, n / 2);}c(i - 1, n / 2);}function c(e, i) {for (var n = e; n >= 0 && !(t[n].y - i < l) && (t[n].y -= i, !(n > 0 && t[n].y > t[n - 1].y + t[n - 1].height)); n--) {;}}function d(t, e, i, n, r, a) {for (var o = a > 0 ? e ? Number.MAX_VALUE : 0 : e ? Number.MAX_VALUE : 0, s = 0, l = t.length; l > s; s++) {if ("none" === t[s].labelAlignTo) {var u = Math.abs(t[s].y - n),h = t[s].len,c = t[s].len2,d = r + h > u ? Math.sqrt((r + h + c) * (r + h + c) - u * u) : Math.abs(t[s].x - i);e && d >= o && (d = o - 10), !e && o >= d && (d = o + 10), t[s].x = i + d * a, o = d;}}}t.sort(function (t, e) {return t.y - e.y;});for (var f, p = 0, g = t.length, v = [], m = [], y = 0; g > y; y++) {if ("outer" === t[y].position && "labelLine" === t[y].labelAlignTo) {var _ = t[y].x - u;t[y].linePoints[1][0] += _, t[y].x = u;}f = t[y].y - p, 0 > f && h(y, g, -f, r), p = t[y].y + t[y].height;}0 > o - p && c(g - 1, p - o);for (var y = 0; g > y; y++) {t[y].y >= i ? m.push(t[y]) : v.push(t[y]);}d(v, !1, e, i, n, r), d(m, !0, e, i, n, r);}function bc(t, e, i, n, r, a, o, s) {for (var l = [], u = [], h = Number.MAX_VALUE, c = -Number.MAX_VALUE, d = 0; d < t.length; d++) {Mc(t[d]) || (t[d].x < e ? (h = Math.min(h, t[d].x), l.push(t[d])) : (c = Math.max(c, t[d].x), u.push(t[d])));}wc(u, e, i, n, 1, r, a, o, s, c), wc(l, e, i, n, -1, r, a, o, s, h);for (var d = 0; d < t.length; d++) {var f = t[d];if (!Mc(f)) {var p = f.linePoints;if (p) {var g,v = "edge" === f.labelAlignTo,m = f.textRect.width;g = v ? f.x < e ? p[2][0] - f.labelDistance - o - f.labelMargin : o + r - f.labelMargin - p[2][0] - f.labelDistance : f.x < e ? f.x - o - f.bleedMargin : o + r - f.x - f.bleedMargin, g < f.textRect.width && (f.text = $i(f.text, g, f.font), "edge" === f.labelAlignTo && (m = Xi(f.text, f.font)));var y = p[1][0] - p[2][0];v ? p[2][0] = f.x < e ? o + f.labelMargin + m + f.labelDistance : o + r - f.labelMargin - m - f.labelDistance : (p[2][0] = f.x < e ? f.x + f.labelDistance : f.x - f.labelDistance, p[1][0] = p[2][0] + y), p[1][1] = p[2][1] = f.y;}}}}function Mc(t) {return "center" === t.position;}function Sc(t, e) {return Qo(t.getBoxLayoutParams(), { width: e.getWidth(), height: e.getHeight() });}function Tc(t) {for (var e, i = 0; i < t.length; i++) {var n = t[i].getBoundingRect();e = e || n.clone(), e.union(n);}return e;}function Ic(t, e) {var i,n,r = t.svgXML;try {i = r && Yl(r, { ignoreViewBox: !0, ignoreRootClip: !0 }) || {}, n = i.root, O(null != n);} catch (a) {throw new Error("Invalid svg format\n" + a.message);}var o = i.width,s = i.height,l = i.viewBoxRect;if (e || (e = null == o || null == s ? n.getBoundingRect() : new Ii(0, 0, 0, 0), null != o && (e.width = o), null != s && (e.height = s)), l) {var u = Xl(l, e.width, e.height),h = n;n = new fg(), n.add(h), h.scale = u.scale, h.position = u.position;}return n.setClipPath(new Vm({ shape: e.plain() })), { root: n, boundingRect: e };}function Cc(t) {return function (e, i) {var n = Dc(e),r = [];return f(n, function (n) {var a = Lb[n.type][t];a && r.push(a(e, n, i));}), r;};}function Dc(t) {var e = ox.retrieveMap(t) || [];return e;}function kc(t, e) {return !!Ac(t)[e];}function Ac(t) {return t[zb] || (t[zb] = {});}function Pc(t) {this.pointerChecker, this._zr = t, this._opt = {};var e = y,i = e(Lc, this),r = e(Oc, this),a = e(Rc, this),o = e(zc, this),l = e(Bc, this);wp.call(this), this.setPointerChecker = function (t) {this.pointerChecker = t;}, this.enable = function (e, u) {this.disable(), this._opt = s(n(u) || {}, { zoomOnMouseWheel: !0, moveOnMouseMove: !0, moveOnMouseWheel: !1, preventDefaultMouseMove: !0 }), null == e && (e = !0), (e === !0 || "move" === e || "pan" === e) && (t.on("mousedown", i), t.on("mousemove", r), t.on("mouseup", a)), (e === !0 || "scale" === e || "zoom" === e) && (t.on("mousewheel", o), t.on("pinch", l));}, this.disable = function () {t.off("mousedown", i), t.off("mousemove", r), t.off("mouseup", a), t.off("mousewheel", o), t.off("pinch", l);}, this.dispose = this.disable, this.isDragging = function () {return this._dragging;}, this.isPinching = function () {return this._pinching;};}function Lc(t) {if (!(Te(t) || t.target && t.target.draggable)) {var e = t.offsetX,i = t.offsetY;this.pointerChecker && this.pointerChecker(t, e, i) && (this._x = e, this._y = i, this._dragging = !0);}}function Oc(t) {if (this._dragging && Fc("moveOnMouseMove", t, this._opt) && "pinch" !== t.gestureEvent && !kc(this._zr, "globalPan")) {var e = t.offsetX,i = t.offsetY,n = this._x,r = this._y,a = e - n,o = i - r;this._x = e, this._y = i, this._opt.preventDefaultMouseMove && Dp(t.event), Nc(this, "pan", "moveOnMouseMove", t, { dx: a, dy: o, oldX: n, oldY: r, newX: e, newY: i });}}function Rc(t) {Te(t) || (this._dragging = !1);}function zc(t) {var e = Fc("zoomOnMouseWheel", t, this._opt),i = Fc("moveOnMouseWheel", t, this._opt),n = t.wheelDelta,r = Math.abs(n),a = t.offsetX,o = t.offsetY;if (0 !== n && (e || i)) {if (e) {var s = r > 3 ? 1.4 : r > 1 ? 1.2 : 1.1,l = n > 0 ? s : 1 / s;Ec(this, "zoom", "zoomOnMouseWheel", t, { scale: l, originX: a, originY: o });}if (i) {var u = Math.abs(n),h = (n > 0 ? 1 : -1) * (u > 3 ? .4 : u > 1 ? .15 : .05);Ec(this, "scrollMove", "moveOnMouseWheel", t, { scrollDelta: h, originX: a, originY: o });}}}function Bc(t) {if (!kc(this._zr, "globalPan")) {var e = t.pinchScale > 1 ? 1.1 : 1 / 1.1;Ec(this, "zoom", null, t, { scale: e, originX: t.pinchX, originY: t.pinchY });}}function Ec(t, e, i, n, r) {t.pointerChecker && t.pointerChecker(n, r.originX, r.originY) && (Dp(n.event), Nc(t, e, i, n, r));}function Nc(t, e, i, n, r) {r.isAvailableBehavior = y(Fc, null, i, n), t.trigger(e, r);}function Fc(t, e, i) {var n = i[t];return !t || n && (!b(n) || e.event[n + "Key"]);}function Vc(t, e, i) {var n = t.target,r = n.position;r[0] += e, r[1] += i, n.dirty();}function Hc(t, e, i, n) {var r = t.target,a = t.zoomLimit,o = r.position,s = r.scale,l = t.zoom = t.zoom || 1;if (l *= e, a) {var u = a.min || 0,h = a.max || 1 / 0;l = Math.max(Math.min(h, l), u);}var c = l / t.zoom;t.zoom = l, o[0] -= (i - o[0]) * (c - 1), o[1] -= (n - o[1]) * (c - 1), s[0] *= c, s[1] *= c, r.dirty();}function Wc(t, e, i) {var n = e.getComponentByElement(t.topTarget),r = n && n.coordinateSystem;return n && n !== i && !Bb[n.mainType] && r && r.model !== i;}function Gc(t) {var e = t.getItemStyle(),i = t.get("areaColor");return null != i && (e.fill = i), e;}function Xc(t, e, i, n, r) {i.off("click"), i.off("mousedown"), e.get("selectedMode") && (i.on("mousedown", function () {t._mouseDownFlag = !0;}), i.on("click", function (a) {if (t._mouseDownFlag) {t._mouseDownFlag = !1;for (var o = a.target; !o.__regions;) {o = o.parent;}if (o) {var s = { type: ("geo" === e.mainType ? "geo" : "map") + "ToggleSelect", batch: p(o.__regions, function (t) {return { name: t.name, from: r.uid };}) };s[e.mainType + "Id"] = e.id, n.dispatchAction(s), Yc(e, i);}}}));}function Yc(t, e) {e.eachChild(function (e) {f(e.__regions, function (i) {e.trigger(t.isSelected(i.name) ? "emphasis" : "normal");});});}function Uc(t, e) {var i = new fg();this.uid = yo("ec_map_draw"), this._controller = new Pc(t.getZr()), this._controllerHost = { target: e ? i : null }, this.group = i, this._updateGroup = e, this._mouseDownFlag, this._mapName, this._initialized, i.add(this._regionsGroup = new fg()), i.add(this._backgroundGroup = new fg());}function qc(t) {var e = this[Eb];e && e.recordVersion === this[Nb] && jc(e, t);}function jc(t, e) {var i = t.circle,n = t.labelModel,r = t.hoverLabelModel,a = t.emphasisText,o = t.normalText;e ? (i.style.extendFrom(Ya({}, r, { text: r.get("show") ? a : null }, { isRectText: !0, useInsideStyle: !1 }, !0)), i.__mapOriginalZ2 = i.z2, i.z2 += ty) : (Ya(i.style, n, { text: n.get("show") ? o : null, textPosition: n.getShallow("position") || "bottom" }, { isRectText: !0, useInsideStyle: !1 }), i.dirty(!1), null != i.__mapOriginalZ2 && (i.z2 = i.__mapOriginalZ2, i.__mapOriginalZ2 = null));}function Zc(t, e, i) {var n = t.getZoom(),r = t.getCenter(),a = e.zoom,o = t.dataToPoint(r);if (null != e.dx && null != e.dy) {o[0] -= e.dx, o[1] -= e.dy;var r = t.pointToData(o);t.setCenter(r);}if (null != a) {if (i) {var s = i.min || 0,l = i.max || 1 / 0;a = Math.max(Math.min(n * a, l), s) / n;}t.scale[0] *= a, t.scale[1] *= a;var u = t.position,h = (e.originX - u[0]) * (a - 1),c = (e.originY - u[1]) * (a - 1);u[0] -= h, u[1] -= c, t.updateTransform();var r = t.pointToData(o);t.setCenter(r), t.setZoom(a * n);}return { center: t.getCenter(), zoom: t.getZoom() };}function Kc() {Np.call(this);}function $c(t) {this.name = t, this.zoomLimit, Np.call(this), this._roamTransformable = new Kc(), this._rawTransformable = new Kc(), this._center, this._zoom;}function Qc(t, e, i, n) {var r = i.seriesModel,a = r ? r.coordinateSystem : null;return a === this ? a[t](n) : null;}function Jc(t, e, i, n) {$c.call(this, t), this.map = e;var r = Ob.load(e, i);this._nameCoordMap = r.nameCoordMap, this._regionsMap = r.regionsMap, this._invertLongitute = null == n ? !0 : n, this.regions = r.regions, this._rect = r.boundingRect;}function td(t, e, i, n) {var r = i.geoModel,a = i.seriesModel,o = r ? r.coordinateSystem : a ? a.coordinateSystem || (a.getReferringComponents("geo")[0] || {}).coordinateSystem : null;return o === this ? o[t](n) : null;}function ed(t, e) {var i = t.get("boundingCoords");if (null != i) {var n = i[0],r = i[1];isNaN(n[0]) || isNaN(n[1]) || isNaN(r[0]) || isNaN(r[1]) || this.setBoundingRect(n[0], n[1], r[0] - n[0], r[1] - n[1]);}var a,o = this.getBoundingRect(),s = t.get("layoutCenter"),l = t.get("layoutSize"),u = e.getWidth(),h = e.getHeight(),c = o.width / o.height * this.aspectScale,d = !1;s && l && (s = [Mo(s[0], u), Mo(s[1], h)], l = Mo(l, Math.min(u, h)), isNaN(s[0]) || isNaN(s[1]) || isNaN(l) || (d = !0));var f;if (d) {var f = {};c > 1 ? (f.width = l, f.height = l / c) : (f.height = l, f.width = l * c), f.y = s[1] - f.height / 2, f.x = s[0] - f.width / 2;} else a = t.getBoxLayoutParams(), a.aspect = c, f = Qo(a, { width: u, height: h });this.setViewRect(f.x, f.y, f.width, f.height), this.setCenter(t.get("center")), this.setZoom(t.get("zoom"));}function id(t, e) {f(e.get("geoCoord"), function (e, i) {t.addGeoCoord(i, e);});}function nd(t, e) {var i = {};return f(t, function (t) {t.each(t.mapDimension("value"), function (e, n) {var r = "ec-" + t.getName(n);i[r] = i[r] || [], isNaN(e) || i[r].push(e);});}), t[0].map(t[0].mapDimension("value"), function (n, r) {for (var a = "ec-" + t[0].getName(r), o = 0, s = 1 / 0, l = -1 / 0, u = i[a].length, h = 0; u > h; h++) {s = Math.min(s, i[a][h]), l = Math.max(l, i[a][h]), o += i[a][h];}var c;return c = "min" === e ? s : "max" === e ? l : "average" === e ? o / u : o, 0 === u ? 0 / 0 : c;});}function rd(t, e) {e.update = "updateView", Tu(e, function (e, i) {var n = {};return i.eachComponent({ mainType: "geo", query: e }, function (i) {i[t](e.name);var r = i.coordinateSystem;f(r.regions, function (t) {n[t.name] = i.isSelected(t.name) || !1;});}), { selected: n, name: e.name };});}function ad(t, e) {var i = { axesInfo: {}, seriesInvolved: !1, coordSysAxesInfo: {}, coordSysMap: {} };return od(i, t, e), i.seriesInvolved && ld(i, t), i;}function od(t, e, i) {var n = e.getComponent("tooltip"),r = e.getComponent("axisPointer"),a = r.get("link", !0) || [],o = [];Ub(i.getCoordinateSystems(), function (i) {function s(n, s, l) {var h = l.model.getModel("axisPointer", r),d = h.get("show");if (d && ("auto" !== d || n || pd(h))) {null == s && (s = h.get("triggerTooltip")), h = n ? sd(l, c, r, e, n, s) : h;var f = h.get("snap"),p = gd(l.model),g = s || f || "category" === l.type,v = t.axesInfo[p] = { key: p, axis: l, coordSys: i, axisPointerModel: h, triggerTooltip: s, involveSeries: g, snap: f, useHandle: pd(h), seriesModels: [] };u[p] = v, t.seriesInvolved |= g;var m = ud(a, l);if (null != m) {var y = o[m] || (o[m] = { axesInfo: {} });y.axesInfo[p] = v, y.mapper = a[m].mapper, v.linkGroup = y;}}}if (i.axisPointerEnabled) {var l = gd(i.model),u = t.coordSysAxesInfo[l] = {};t.coordSysMap[l] = i;var h = i.model,c = h.getModel("tooltip", n);if (Ub(i.getAxes(), qb(s, !1, null)), i.getTooltipAxes && n && c.get("show")) {var d = "axis" === c.get("trigger"),f = "cross" === c.get("axisPointer.type"),p = i.getTooltipAxes(c.get("axisPointer.axis"));
          (d || f) && Ub(p.baseAxes, qb(s, f ? "cross" : !0, d)), f && Ub(p.otherAxes, qb(s, "cross", !1));}}});}function sd(t, e, i, r, a, o) {var l = e.getModel("axisPointer"),u = {};Ub(["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], function (t) {u[t] = n(l.get(t));}), u.snap = "category" !== t.type && !!o, "cross" === l.get("type") && (u.type = "line");var h = u.label || (u.label = {});if (null == h.show && (h.show = !1), "cross" === a) {var c = l.get("label.show");if (h.show = null != c ? c : !0, !o) {var d = u.lineStyle = l.get("crossStyle");d && s(h, d.textStyle);}}return t.model.getModel("axisPointer", new go(u, i, r));}function ld(t, e) {e.eachSeries(function (e) {var i = e.coordinateSystem,n = e.get("tooltip.trigger", !0),r = e.get("tooltip.show", !0);i && "none" !== n && n !== !1 && "item" !== n && r !== !1 && e.get("axisPointer.show", !0) !== !1 && Ub(t.coordSysAxesInfo[gd(i.model)], function (t) {var n = t.axis;i.getAxis(n.dim) === n && (t.seriesModels.push(e), null == t.seriesDataCount && (t.seriesDataCount = 0), t.seriesDataCount += e.getData().count());});}, this);}function ud(t, e) {for (var i = e.model, n = e.dim, r = 0; r < t.length; r++) {var a = t[r] || {};if (hd(a[n + "AxisId"], i.id) || hd(a[n + "AxisIndex"], i.componentIndex) || hd(a[n + "AxisName"], i.name)) return r;}}function hd(t, e) {return "all" === t || x(t) && u(t, e) >= 0 || t === e;}function cd(t) {var e = dd(t);if (e) {var i = e.axisPointerModel,n = e.axis.scale,r = i.option,a = i.get("status"),o = i.get("value");null != o && (o = n.parse(o));var s = pd(i);null == a && (r.status = s ? "show" : "hide");var l = n.getExtent().slice();l[0] > l[1] && l.reverse(), (null == o || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), r.value = o, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show");}}function dd(t) {var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;return e && e.axesInfo[gd(t)];}function fd(t) {var e = dd(t);return e && e.axisPointerModel;}function pd(t) {return !!t.get("handle.show");}function gd(t) {return t.type + "||" + t.id;}function vd(t, e, i, n, r) {var a = t.axis;if (!a.scale.isBlank() && a.containData(e)) {if (!t.involveSeries) return void i.showPointer(t, e);var s = md(e, t),l = s.payloadBatch,u = s.snapToValue;l[0] && null == r.seriesIndex && o(r, l[0]), !n && t.snap && a.containData(u) && null != u && (e = u), i.showPointer(t, e, l, r), i.showTooltip(t, s, u);}}function md(t, e) {var i = e.axis,n = i.dim,r = t,a = [],o = Number.MAX_VALUE,s = -1;return Zb(e.seriesModels, function (e) {var l,u,h = e.getData().mapDimension(n, !0);if (e.getAxisTooltipData) {var c = e.getAxisTooltipData(h, t, i);u = c.dataIndices, l = c.nestestValue;} else {if (u = e.getData().indicesOfNearest(h[0], t, "category" === i.type ? .5 : null), !u.length) return;l = e.getData().get(h[0], u[0]);}if (null != l && isFinite(l)) {var d = t - l,f = Math.abs(d);o >= f && ((o > f || d >= 0 && 0 > s) && (o = f, s = d, r = l, a.length = 0), Zb(u, function (t) {a.push({ seriesIndex: e.seriesIndex, dataIndexInside: t, dataIndex: e.getData().getRawIndex(t) });}));}}), { payloadBatch: a, snapToValue: r };}function yd(t, e, i, n) {t[e.key] = { value: i, payloadBatch: n };}function _d(t, e, i, n) {var r = i.payloadBatch,a = e.axis,o = a.model,s = e.axisPointerModel;if (e.triggerTooltip && r.length) {var l = e.coordSys.model,u = gd(l),h = t.map[u];h || (h = t.map[u] = { coordSysId: l.id, coordSysIndex: l.componentIndex, coordSysType: l.type, coordSysMainType: l.mainType, dataByAxis: [] }, t.list.push(h)), h.dataByAxis.push({ axisDim: a.dim, axisIndex: o.componentIndex, axisType: o.type, axisId: o.id, value: n, valueLabelOpt: { precision: s.get("label.precision"), formatter: s.get("label.formatter") }, seriesDataIndices: r.slice() });}}function xd(t, e, i) {var n = i.axesInfo = [];Zb(e, function (e, i) {var r = e.axisPointerModel.option,a = t[i];a ? (!e.useHandle && (r.status = "show"), r.value = a.value, r.seriesDataIndices = (a.payloadBatch || []).slice()) : !e.useHandle && (r.status = "hide"), "show" === r.status && n.push({ axisDim: e.axis.dim, axisIndex: e.axis.model.componentIndex, value: r.value });});}function wd(t, e, i, n) {if (Td(e) || !t.list.length) return void n({ type: "hideTip" });var r = ((t.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};n({ type: "showTip", escapeConnect: !0, x: e[0], y: e[1], tooltipOption: i.tooltipOption, position: i.position, dataIndexInside: r.dataIndexInside, dataIndex: r.dataIndex, seriesIndex: r.seriesIndex, dataByCoordSys: t.list });}function bd(t, e, i) {var n = i.getZr(),r = "axisPointerLastHighlights",a = $b(n)[r] || {},o = $b(n)[r] = {};Zb(t, function (t) {var e = t.axisPointerModel.option;"show" === e.status && Zb(e.seriesDataIndices, function (t) {var e = t.seriesIndex + " | " + t.dataIndex;o[e] = t;});});var s = [],l = [];f(a, function (t, e) {!o[e] && l.push(t);}), f(o, function (t, e) {!a[e] && s.push(t);}), l.length && i.dispatchAction({ type: "downplay", escapeConnect: !0, batch: l }), s.length && i.dispatchAction({ type: "highlight", escapeConnect: !0, batch: s });}function Md(t, e) {for (var i = 0; i < (t || []).length; i++) {var n = t[i];if (e.axis.dim === n.axisDim && e.axis.model.componentIndex === n.axisIndex) return n;}}function Sd(t) {var e = t.axis.model,i = {},n = i.axisDim = t.axis.dim;return i.axisIndex = i[n + "AxisIndex"] = e.componentIndex, i.axisName = i[n + "AxisName"] = e.name, i.axisId = i[n + "AxisId"] = e.id, i;}function Td(t) {return !t || null == t[0] || isNaN(t[0]) || null == t[1] || isNaN(t[1]);}function Id(t, e, i) {if (!Jf.node) {var n = e.getZr();Jb(n).records || (Jb(n).records = {}), Cd(n, e);var r = Jb(n).records[t] || (Jb(n).records[t] = {});r.handler = i;}}function Cd(t, e) {function i(i, n) {t.on(i, function (i) {var r = Pd(e);tM(Jb(t).records, function (t) {t && n(t, i, r.dispatchAction);}), Dd(r.pendings, e);});}Jb(t).initialized || (Jb(t).initialized = !0, i("click", _(Ad, "click")), i("mousemove", _(Ad, "mousemove")), i("globalout", kd));}function Dd(t, e) {var i,n = t.showTip.length,r = t.hideTip.length;n ? i = t.showTip[n - 1] : r && (i = t.hideTip[r - 1]), i && (i.dispatchAction = null, e.dispatchAction(i));}function kd(t, e, i) {t.handler("leave", null, i);}function Ad(t, e, i, n) {e.handler(t, i, n);}function Pd(t) {var e = { showTip: [], hideTip: [] },i = function i(n) {var r = e[n.type];r ? r.push(n) : (n.dispatchAction = i, t.dispatchAction(n));};return { dispatchAction: i, pendings: e };}function Ld(t, e) {if (!Jf.node) {var i = e.getZr(),n = (Jb(i).records || {})[t];n && (Jb(i).records[t] = null);}}function Od() {}function Rd(t, e, i, n) {zd(iM(i).lastProp, n) || (iM(i).lastProp = n, e ? eo(i, n, t) : (i.stopAnimation(), i.attr(n)));}function zd(t, e) {if (M(t) && M(e)) {var i = !0;return f(e, function (e, n) {i = i && zd(t[n], e);}), !!i;}return t === e;}function Bd(t, e) {t[e.get("label.show") ? "show" : "hide"]();}function Ed(t) {return { position: t.position.slice(), rotation: t.rotation || 0 };}function Nd(t, e, i) {var n = e.get("z"),r = e.get("zlevel");t && t.traverse(function (t) {"group" !== t.type && (null != n && (t.z = n), null != r && (t.zlevel = r), t.silent = i);});}function Fd(t, e, i, n) {var r,a,o = Ao(i - t.rotation),s = n[0] > n[1],l = "start" === e && !s || "start" !== e && s;return Po(o - aM / 2) ? (a = l ? "bottom" : "top", r = "center") : Po(o - 1.5 * aM) ? (a = l ? "top" : "bottom", r = "center") : (a = "middle", r = 1.5 * aM > o && o > aM / 2 ? l ? "left" : "right" : l ? "right" : "left"), { rotation: o, textAlign: r, textVerticalAlign: a };}function Vd(t, e, i) {if (!Xh(t.axis)) {var n = t.get("axisLabel.showMinLabel"),r = t.get("axisLabel.showMaxLabel");e = e || [], i = i || [];var a = e[0],o = e[1],s = e[e.length - 1],l = e[e.length - 2],u = i[0],h = i[1],c = i[i.length - 1],d = i[i.length - 2];n === !1 ? (Hd(a), Hd(u)) : Wd(a, o) && (n ? (Hd(o), Hd(h)) : (Hd(a), Hd(u))), r === !1 ? (Hd(s), Hd(c)) : Wd(l, s) && (r ? (Hd(l), Hd(d)) : (Hd(s), Hd(c)));}}function Hd(t) {t && (t.ignore = !0);}function Wd(t, e) {var i = t && t.getBoundingRect().clone(),n = e && e.getBoundingRect().clone();if (i && n) {var r = Re([]);return Ne(r, r, -t.rotation), i.applyTransform(Be([], r, t.getLocalTransform())), n.applyTransform(Be([], r, e.getLocalTransform())), i.intersect(n);}}function Gd(t) {return "middle" === t || "center" === t;}function Xd(t, e, i, n, r) {for (var a = [], o = [], s = [], l = 0; l < t.length; l++) {var u = t[l].coord;o[0] = u, o[1] = 0, s[0] = u, s[1] = i, e && (ae(o, o, e), ae(s, s, e));var h = new Wm({ anid: r + "_" + t[l].tickValue, subPixelOptimize: !0, shape: { x1: o[0], y1: o[1], x2: s[0], y2: s[1] }, style: n, z2: 2, silent: !0 });a.push(h);}return a;}function Yd(t, e, i) {var n = e.axis,r = e.getModel("axisTick");if (r.get("show") && !n.scale.isBlank()) {for (var a = r.getModel("lineStyle"), o = i.tickDirection * r.get("length"), l = n.getTicksCoords(), u = Xd(l, t._transform, o, s(a.getLineStyle(), { stroke: e.get("axisLine.lineStyle.color") }), "ticks"), h = 0; h < u.length; h++) {t.group.add(u[h]);}return u;}}function Ud(t, e, i) {var n = e.axis,r = e.getModel("minorTick");if (r.get("show") && !n.scale.isBlank()) {var a = n.getMinorTicksCoords();if (a.length) for (var o = r.getModel("lineStyle"), l = i.tickDirection * r.get("length"), u = s(o.getLineStyle(), s(e.getModel("axisTick").getLineStyle(), { stroke: e.get("axisLine.lineStyle.color") })), h = 0; h < a.length; h++) {for (var c = Xd(a[h], t._transform, l, u, "minorticks_" + h), d = 0; d < c.length; d++) {t.group.add(c[d]);}}}}function qd(t, e, i) {var n = e.axis,r = D(i.axisLabelShow, e.get("axisLabel.show"));if (r && !n.scale.isBlank()) {var a = e.getModel("axisLabel"),o = a.get("margin"),s = n.getViewLabels(),l = (D(i.labelRotate, a.get("rotate")) || 0) * aM / 180,u = uM(i.rotation, l, i.labelDirection),h = e.getCategories && e.getCategories(!0),c = [],d = hM(e),p = e.get("triggerEvent");return f(s, function (r, s) {var l = r.tickValue,f = r.formattedLabel,g = r.rawLabel,v = a;h && h[l] && h[l].textStyle && (v = new go(h[l].textStyle, a, e.ecModel));var m = v.getTextColor() || e.get("axisLine.lineStyle.color"),y = n.dataToCoord(l),_ = [y, i.labelOffset + i.labelDirection * o],x = new Dm({ anid: "label_" + l, position: _, rotation: u.rotation, silent: d, z2: 10 });Ya(x.style, v, { text: f, textAlign: v.getShallow("align", !0) || u.textAlign, textVerticalAlign: v.getShallow("verticalAlign", !0) || v.getShallow("baseline", !0) || u.textVerticalAlign, textFill: "function" == typeof m ? m("category" === n.type ? g : "value" === n.type ? l + "" : l, s) : m }), p && (x.eventData = lM(e), x.eventData.targetType = "axisLabel", x.eventData.value = g), t._dumbGroup.add(x), x.updateTransform(), c.push(x), t.group.add(x), x.decomposeTransform();}), c;}}function jd(t) {var e,i = t.get("type"),n = t.getModel(i + "Style");return "line" === i ? (e = n.getLineStyle(), e.fill = null) : "shadow" === i && (e = n.getAreaStyle(), e.stroke = null), e;}function Zd(t, e, i, n, r) {var a = i.get("value"),o = $d(a, e.axis, e.ecModel, i.get("seriesDataIndices"), { precision: i.get("label.precision"), formatter: i.get("label.formatter") }),s = i.getModel("label"),l = My(s.get("padding") || 0),u = s.getFont(),h = Yi(o, u),c = r.position,d = h.width + l[1] + l[3],f = h.height + l[0] + l[2],p = r.align;"right" === p && (c[0] -= d), "center" === p && (c[0] -= d / 2);var g = r.verticalAlign;"bottom" === g && (c[1] -= f), "middle" === g && (c[1] -= f / 2), Kd(c, d, f, n);var v = s.get("backgroundColor");v && "auto" !== v || (v = e.get("axisLine.lineStyle.color")), t.label = { shape: { x: 0, y: 0, width: d, height: f, r: s.get("borderRadius") }, position: c.slice(), style: { text: o, textFont: u, textFill: s.getTextColor(), textPosition: "inside", textPadding: l, fill: v, stroke: s.get("borderColor") || "transparent", lineWidth: s.get("borderWidth") || 0, shadowBlur: s.get("shadowBlur"), shadowColor: s.get("shadowColor"), shadowOffsetX: s.get("shadowOffsetX"), shadowOffsetY: s.get("shadowOffsetY") }, z2: 10 };}function Kd(t, e, i, n) {var r = n.getWidth(),a = n.getHeight();t[0] = Math.min(t[0] + e, r) - e, t[1] = Math.min(t[1] + i, a) - i, t[0] = Math.max(t[0], 0), t[1] = Math.max(t[1], 0);}function $d(t, e, i, n, r) {t = e.scale.parse(t);var a = e.scale.getLabel(t, { precision: r.precision }),o = r.formatter;if (o) {var s = { value: Wh(e, t), axisDimension: e.dim, axisIndex: e.index, seriesData: [] };f(n, function (t) {var e = i.getSeriesByIndex(t.seriesIndex),n = t.dataIndexInside,r = e && e.getDataParams(n);r && s.seriesData.push(r);}), b(o) ? a = o.replace("{value}", a) : w(o) && (a = o(s));}return a;}function Qd(t, e, i) {var n = Oe();return Ne(n, n, i.rotation), Ee(n, n, i.position), ro([t.dataToCoord(e), (i.labelOffset || 0) + (i.labelDirection || 1) * (i.labelMargin || 0)], n);}function Jd(t, e, i, n, r, a) {var o = oM.innerTextLayout(i.rotation, 0, i.labelDirection);i.labelMargin = r.get("label.margin"), Zd(e, n, r, a, { position: Qd(n.axis, t, i), align: o.textAlign, verticalAlign: o.textVerticalAlign });}function tf(t, e, i) {return i = i || 0, { x1: t[i], y1: t[1 - i], x2: e[i], y2: e[1 - i] };}function ef(t, e, i) {return i = i || 0, { x: t[i], y: t[1 - i], width: e[i], height: e[1 - i] };}function nf(t, e, i) {i = i || {};var n = t.coordinateSystem,r = e.axis,a = {},o = r.getAxesOnZeroOf()[0],s = r.position,l = o ? "onZero" : s,u = r.dim,h = n.getRect(),c = [h.x, h.x + h.width, h.y, h.y + h.height],d = { left: 0, right: 1, top: 0, bottom: 1, onZero: 2 },f = e.get("offset") || 0,p = "x" === u ? [c[2] - f, c[3] + f] : [c[0] - f, c[1] + f];if (o) {var g = o.toGlobalCoord(o.dataToCoord(0));p[d.onZero] = Math.max(Math.min(g, p[1]), p[0]);}a.position = ["y" === u ? p[d[l]] : c[0], "x" === u ? p[d[l]] : c[3]], a.rotation = Math.PI / 2 * ("x" === u ? 0 : 1);var v = { top: -1, bottom: 1, left: -1, right: 1 };a.labelDirection = a.tickDirection = a.nameDirection = v[s], a.labelOffset = o ? p[d[s]] - p[d.onZero] : 0, e.get("axisTick.inside") && (a.tickDirection = -a.tickDirection), D(i.labelInside, e.get("axisLabel.inside")) && (a.labelDirection = -a.labelDirection);var m = e.get("axisLabel.rotate");return a.labelRotate = "top" === l ? -m : m, a.z2 = 1, a;}function rf(t, e, i, n, r, a) {var o = cM.getAxisPointerClass(t.axisPointerClass);if (o) {var s = fd(e);s ? (t._axisPointer || (t._axisPointer = new o())).render(e, s, n, a) : af(t, n);}}function af(t, e, i) {var n = t._axisPointer;n && n.dispose(e, i), t._axisPointer = null;}function of(t, e) {var i = {};return i[e.dim + "AxisIndex"] = e.index, t.getCartesian(i);}function sf(t) {return "x" === t.dim ? 0 : 1;}function lf(t) {var e = "cubic-bezier(0.23, 1, 0.32, 1)",i = "left " + t + "s " + e + ",top " + t + "s " + e;return p(mM, function (t) {return t + "transition:" + i;}).join(";");}function uf(t) {var e = [],i = t.get("fontSize"),n = t.getTextColor();return n && e.push("color:" + n), e.push("font:" + t.getFont()), i && e.push("line-height:" + Math.round(3 * i / 2) + "px"), gM(["decoration", "align"], function (i) {var n = t.get(i);n && e.push("text-" + i + ":" + n);}), e.join(";");}function hf(t) {var e = [],i = t.get("transitionDuration"),n = t.get("backgroundColor"),r = t.getModel("textStyle"),a = t.get("padding");return i && e.push(lf(i)), n && (Jf.canvasSupported ? e.push("background-Color:" + n) : (e.push("background-Color:#" + ri(n)), e.push("filter:alpha(opacity=70)"))), gM(["width", "color", "radius"], function (i) {var n = "border-" + i,r = vM(n),a = t.get(r);null != a && e.push(n + ":" + a + ("color" === i ? "" : "px"));}), e.push(uf(r)), null != a && e.push("padding:" + My(a).join("px ") + "px"), e.join(";") + ";";}function cf(t, e, i, n, r) {var a = e && e.painter;if (i) {var o = a && a.getViewportRoot();o && pe(t, o, document.body, n, r);} else {t[0] = n, t[1] = r;var s = a && a.getViewportRootOffset();s && (t[0] += s.offsetLeft, t[1] += s.offsetTop);}}function df(t, e, i) {if (Jf.wxa) return null;var n = document.createElement("div");n.domBelongToZr = !0, this.el = n;var r = this._zr = e.getZr(),a = this._appendToBody = i && i.appendToBody;this._styleCoord = [0, 0], cf(this._styleCoord, r, a, e.getWidth() / 2, e.getHeight() / 2), a ? document.body.appendChild(n) : t.appendChild(n), this._container = t, this._show = !1, this._hideTimeout;var o = this;n.onmouseenter = function () {o._enterable && (clearTimeout(o._hideTimeout), o._show = !0), o._inContent = !0;}, n.onmousemove = function (t) {if (t = t || window.event, !o._enterable) {var e = r.handler,i = r.painter.getViewportRoot();be(i, t, !0), e.dispatch("mousemove", t);}}, n.onmouseleave = function () {o._enterable && o._show && o.hideLater(o._hideDelay), o._inContent = !1;};}function ff(t) {this._zr = t.getZr(), this._show = !1, this._hideTimeout;}function pf(t) {for (var e = t.pop(); t.length;) {var i = t.pop();i && (go.isInstance(i) && (i = i.get("tooltip", !0)), "string" == typeof i && (i = { formatter: i }), e = new go(i, e, e.ecModel));}return e;}function gf(t, e) {return t.dispatchAction || y(e.dispatchAction, e);}function vf(t, e, i, n, r, a, o) {var s = i.getOuterSize(),l = s.width,u = s.height;return null != a && (t + l + a > n ? t -= l + a : t += a), null != o && (e + u + o > r ? e -= u + o : e += o), [t, e];}function mf(t, e, i, n, r) {var a = i.getOuterSize(),o = a.width,s = a.height;return t = Math.min(t + o, n) - o, e = Math.min(e + s, r) - s, t = Math.max(t, 0), e = Math.max(e, 0), [t, e];}function yf(t, e, i) {var n = i[0],r = i[1],a = 5,o = 0,s = 0,l = e.width,u = e.height;switch (t) {case "inside":o = e.x + l / 2 - n / 2, s = e.y + u / 2 - r / 2;break;case "top":o = e.x + l / 2 - n / 2, s = e.y - r - a;break;case "bottom":o = e.x + l / 2 - n / 2, s = e.y + u + a;break;case "left":o = e.x - n - a, s = e.y + u / 2 - r / 2;break;case "right":o = e.x + l + a, s = e.y + u / 2 - r / 2;}return [o, s];}function _f(t) {return "center" === t || "middle" === t;}function xf(t, e) {return t && t.hasOwnProperty && t.hasOwnProperty(e);}function wf(t) {var e = t.pieceList;t.hasSpecialVisual = !1, f(e, function (e, i) {e.originIndex = i, null != e.visual && (t.hasSpecialVisual = !0);});}function bf(t) {var e = t.categories,i = t.visual,n = t.categoryMap = {};if (TM(e, function (t, e) {n[t] = e;}), !x(i)) {var r = [];M(i) ? TM(i, function (t, e) {var i = n[e];r[null != i ? i : CM] = t;}) : r[CM] = i, i = Pf(t, r);}for (var a = e.length - 1; a >= 0; a--) {null == i[a] && (delete n[e[a]], e.pop());}}function Mf(t, e) {var i = t.visual,n = [];M(i) ? TM(i, function (t) {n.push(t);}) : null != i && n.push(i);var r = { color: 1, symbol: 1 };e || 1 !== n.length || r.hasOwnProperty(t.type) || (n[1] = n[0]), Pf(t, n);}function Sf(t) {return { applyVisual: function applyVisual(e, i, n) {e = this.mapValueToVisual(e), n("color", t(i("color"), e));}, _doMap: kf([0, 1]) };}function Tf(t) {var e = this.option.visual;return e[Math.round(bo(t, [0, 1], [0, e.length - 1], !0))] || {};}function If(t) {return function (e, i, n) {n(t, this.mapValueToVisual(e));};}function Cf(t) {var e = this.option.visual;return e[this.option.loop && t !== CM ? t % e.length : t];}function Df() {return this.option.visual[0];}function kf(t) {return { linear: function linear(e) {return bo(e, t, this.option.visual, !0);}, category: Cf, piecewise: function piecewise(e, i) {var n = Af.call(this, i);return null == n && (n = bo(e, t, this.option.visual, !0)), n;}, fixed: Df };}function Af(t) {var e = this.option,i = e.pieceList;if (e.hasSpecialVisual) {var n = DM.findPieceIndex(t, i),r = i[n];if (r && r.visual) return r.visual[this.type];}}function Pf(t, e) {return t.visual = e, "color" === t.type && (t.parsedVisual = p(e, function (t) {return ti(t);})), e;}function Lf(t, e, i) {return t ? i >= e : i > e;}function Of(t) {if (t) for (var e in t) {if (t.hasOwnProperty(e)) return !0;}}function Rf(t, e, i) {function r() {var t = function t() {};t.prototype.__hidden = t.prototype;var e = new t();return e;}var a = {};return PM(e, function (e) {var o = a[e] = r();PM(t[e], function (t, r) {if (DM.isValidType(r)) {var a = { type: r, visual: t };i && i(a, e), o[r] = new DM(a), "opacity" === r && (a = n(a), a.type = "colorAlpha", o.__hidden.__alphaForOpacity = new DM(a));}});}), a;}function zf(t, e, i) {var r;f(i, function (t) {e.hasOwnProperty(t) && Of(e[t]) && (r = !0);}), r && f(i, function (i) {e.hasOwnProperty(i) && Of(e[i]) ? t[i] = n(e[i]) : delete t[i];});}function Bf(t, e, i, n) {function r(t, r) {function o(t) {return r.getItemVisual(l, t);}function s(t, e) {r.setItemVisual(l, t, e);}null != n && (n = r.getDimension(n));for (var l; null != (l = t.next());) {var u = r.getRawDataItem(l);if (!u || u.visualMap !== !1) for (var h = null != n ? r.get(n, l, !0) : l, c = i(h), d = e[c], f = a[c], p = 0, g = f.length; g > p; p++) {var v = f[p];d[v] && d[v].applyVisual(h, o, s);}}}var a = {};return f(t, function (t) {var i = DM.prepareVisualTypes(e[t]);a[t] = i;}), { progress: r };}function Ef(t, e, i, n) {function r(t) {return l[t];}function a(t, e) {l[t] = e;}for (var o = e.targetVisuals[n], s = DM.prepareVisualTypes(o), l = { color: t.getData().getVisual("color") }, u = 0, h = s.length; h > u; u++) {var c = s[u],d = o["opacity" === c ? "__alphaForOpacity" : c];d && d.applyVisual(i, r, a);}return l.color;}function Nf(t, e, i) {if (i[0] === i[1]) return i.slice();for (var n = 200, r = (i[1] - i[0]) / n, a = i[0], o = [], s = 0; n >= s && a < i[1]; s++) {o.push(a), a += r;}return o.push(i[1]), o;}function Ff(t, e) {var i = t[e] - t[1 - e];return { span: Math.abs(i), sign: i > 0 ? -1 : 0 > i ? 1 : e ? -1 : 1 };}function Vf(t, e) {return Math.min(null != e[1] ? e[1] : 1 / 0, Math.max(null != e[0] ? e[0] : -1 / 0, t));}function Hf(t, e, i) {var n = t.option,r = n.align;if (null != r && "auto" !== r) return r;for (var a = { width: e.getWidth(), height: e.getHeight() }, o = "horizontal" === n.orient ? 1 : 0, s = [["left", "right", "width"], ["top", "bottom", "height"]], l = s[o], u = [0, null, 10], h = {}, c = 0; 3 > c; c++) {h[s[1 - o][c]] = u[c], h[l[c]] = 2 === c ? i[0] : n[l[c]];}var d = [["x", "width", 3], ["y", "height", 0]][o],f = Qo(h, a, n.padding);return l[(f.margin[d[2]] || 0) + f[d[0]] + .5 * f[d[1]] < .5 * a[d[1]] ? 0 : 1];}function Wf(t, e) {return f(t || [], function (t) {null != t.dataIndex && (t.dataIndexInside = t.dataIndex, t.dataIndex = null), t.highlightKey = "visualMap" + (e ? e.componentIndex : "");}), t;}function Gf(t, e, i, n) {return new Bm({ shape: { points: t }, draggable: !!i, cursor: e, drift: i, onmousemove: function onmousemove(t) {Dp(t.event);}, ondragend: n });}function Xf(t, e) {return 0 === t ? [[0, 0], [e, 0], [e, -e]] : [[0, 0], [e, 0], [e, e]];}function Yf(t, e, i, n) {return t ? [[0, -ZM(e, KM(i, 0))], [QM, 0], [0, ZM(e, KM(n - i, 0))]] : [[0, 0], [5, -5], [5, 5]];}function Uf(t, e, i) {var n = $M / 2,r = t.get("hoverLinkDataSize");return r && (n = qM(r, e, i, !0) / 2), n;}function qf(t) {var e = t.get("hoverLinkOnHandle");return !!(null == e ? t.get("realtime") : e);}function jf(t) {return "vertical" === t ? "ns-resize" : "ew-resize";}function Zf(t, e) {var i = t.inverse;("vertical" === t.orient ? !i : i) && e.reverse();}var Kf = 2311,$f = function $f() {return Kf++;},Qf = {};Qf = "object" == typeof wx && "function" == typeof wx.getSystemInfoSync ? { browser: {}, os: {}, node: !1, wxa: !0, canvasSupported: !0, svgSupported: !1, touchEventsSupported: !0, domSupported: !1 } : "undefined" == typeof document && "undefined" != typeof self ? { browser: {}, os: {}, node: !1, worker: !0, canvasSupported: !0, domSupported: !1 } : "undefined" == typeof navigator ? { browser: {}, os: {}, node: !0, worker: !1, canvasSupported: !0, svgSupported: !0, domSupported: !1 } : e(navigator.userAgent);var Jf = Qf,tp = { "[object Function]": 1, "[object RegExp]": 1, "[object Date]": 1, "[object Error]": 1, "[object CanvasGradient]": 1, "[object CanvasPattern]": 1, "[object Image]": 1, "[object Canvas]": 1 },ep = { "[object Int8Array]": 1, "[object Uint8Array]": 1, "[object Uint8ClampedArray]": 1, "[object Int16Array]": 1, "[object Uint16Array]": 1, "[object Int32Array]": 1, "[object Uint32Array]": 1, "[object Float32Array]": 1, "[object Float64Array]": 1 },ip = Object.prototype.toString,np = Array.prototype,rp = np.forEach,ap = np.filter,op = np.slice,sp = np.map,lp = np.reduce,up = {},hp = function hp() {return up.createCanvas();};up.createCanvas = function () {return document.createElement("canvas");};var cp,dp = "__ec_primitive__";E.prototype = { constructor: E, get: function get(t) {return this.data.hasOwnProperty(t) ? this.data[t] : null;}, set: function set(t, e) {return this.data[t] = e;}, each: function each(t, e) {void 0 !== e && (t = y(t, e));for (var i in this.data) {this.data.hasOwnProperty(i) && t(this.data[i], i);}}, removeKey: function removeKey(t) {delete this.data[t];} };var fp = (Object.freeze || Object)({ $override: i, clone: n, merge: r, mergeAll: a, extend: o, defaults: s, createCanvas: hp, getContext: l, indexOf: u, inherits: h, mixin: c, isArrayLike: d, each: f, map: p, reduce: g, filter: v, find: m, bind: y, curry: _, isArray: x, isFunction: w, isString: b, isObject: M, isBuiltInObject: S, isTypedArray: T, isDom: I, eqNaN: C, retrieve: D, retrieve2: k, retrieve3: A, slice: P, normalizeCssArray: L, assert: O, trim: R, setAsPrimitive: z, isPrimitive: B, createHashMap: N, concatArray: F, noop: V }),pp = "undefined" == typeof Float32Array ? Array : Float32Array,gp = j,vp = Z,mp = ee,yp = ie,_p = (Object.freeze || Object)({ create: H, copy: W, clone: G, set: X, add: Y, scaleAndAdd: U, sub: q, len: j, length: gp, lenSquare: Z, lengthSquare: vp, mul: K, div: $, dot: Q, scale: J, normalize: te, distance: ee, dist: mp, distanceSquare: ie, distSquare: yp, negate: ne, lerp: re, applyTransform: ae, min: oe, max: se });le.prototype = { constructor: le, _dragStart: function _dragStart(t) {for (var e = t.target; e && !e.draggable;) {e = e.parent;}e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(ue(e, t), "dragstart", t.event));}, _drag: function _drag(t) {var e = this._draggingTarget;if (e) {var i = t.offsetX,n = t.offsetY,r = i - this._x,a = n - this._y;this._x = i, this._y = n, e.drift(r, a, t), this.dispatchToElement(ue(e, t), "drag", t.event);var o = this.findHover(i, n, e).target,s = this._dropTarget;this._dropTarget = o, e !== o && (s && o !== s && this.dispatchToElement(ue(s, t), "dragleave", t.event), o && o !== s && this.dispatchToElement(ue(o, t), "dragenter", t.event));}}, _dragEnd: function _dragEnd(t) {var e = this._draggingTarget;e && (e.dragging = !1), this.dispatchToElement(ue(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(ue(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;} };var xp = Array.prototype.slice,wp = function wp(t) {this._$handlers = {}, this._$eventProcessor = t;};wp.prototype = { constructor: wp, one: function one(t, e, i, n) {return ce(this, t, e, i, n, !0);}, on: function on(t, e, i, n) {return ce(this, t, e, i, n, !1);}, isSilent: function isSilent(t) {var e = this._$handlers;return !e[t] || !e[t].length;}, off: function off(t, e) {var i = this._$handlers;if (!t) return this._$handlers = {}, this;if (e) {if (i[t]) {for (var n = [], r = 0, a = i[t].length; a > r; r++) {i[t][r].h !== e && n.push(i[t][r]);}i[t] = n;}i[t] && 0 === i[t].length && delete i[t];} else delete i[t];return this;}, trigger: function trigger(t) {var e = this._$handlers[t],i = this._$eventProcessor;if (e) {var n = arguments,r = n.length;r > 3 && (n = xp.call(n, 1));for (var a = e.length, o = 0; a > o;) {var s = e[o];if (i && i.filter && null != s.query && !i.filter(t, s.query)) o++;else {switch (r) {case 1:s.h.call(s.ctx);break;case 2:s.h.call(s.ctx, n[1]);break;case 3:s.h.call(s.ctx, n[1], n[2]);break;default:s.h.apply(s.ctx, n);}s.one ? (e.splice(o, 1), a--) : o++;}}}return i && i.afterTrigger && i.afterTrigger(t), this;}, triggerWithContext: function triggerWithContext(t) {var e = this._$handlers[t],i = this._$eventProcessor;if (e) {var n = arguments,r = n.length;r > 4 && (n = xp.call(n, 1, n.length - 1));for (var a = n[n.length - 1], o = e.length, s = 0; o > s;) {var l = e[s];if (i && i.filter && null != l.query && !i.filter(t, l.query)) s++;else {switch (r) {case 1:l.h.call(a);break;case 2:l.h.call(a, n[1]);break;case 3:l.h.call(a, n[1], n[2]);break;default:l.h.apply(a, n);}l.one ? (e.splice(s, 1), o--) : s++;}}}return i && i.afterTrigger && i.afterTrigger(t), this;} };var bp = Math.log(2),Mp = "___zrEVENTSAVED",Sp = [],Tp = "undefined" != typeof window && !!window.addEventListener,Ip = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,Cp = [],Dp = Tp ? function (t) {t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0;} : function (t) {t.returnValue = !1, t.cancelBubble = !0;},kp = function kp() {this._track = [];};kp.prototype = { constructor: kp, recognize: function recognize(t, e, i) {return this._doTrack(t, e, i), this._recognize(t);}, clear: function clear() {return this._track.length = 0, this;}, _doTrack: function _doTrack(t, e, i) {var n = t.touches;if (n) {for (var r = { points: [], touches: [], target: e, event: t }, a = 0, o = n.length; o > a; a++) {var s = n[a],l = _e(i, s, {});r.points.push([l.zrX, l.zrY]), r.touches.push(s);}this._track.push(r);}}, _recognize: function _recognize(t) {for (var e in Ap) {if (Ap.hasOwnProperty(e)) {var i = Ap[e](this._track, t);if (i) return i;}}} };var Ap = { pinch: function pinch(t, e) {var i = t.length;if (i) {var n = (t[i - 1] || {}).points,r = (t[i - 2] || {}).points || n;if (r && r.length > 1 && n && n.length > 1) {var a = Ie(n) / Ie(r);!isFinite(a) && (a = 1), e.pinchScale = a;var o = Ce(n);return e.pinchX = o[0], e.pinchY = o[1], { type: "pinch", target: t[0].target, event: e };}}} },Pp = "silent";Ae.prototype.dispose = function () {};var Lp = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],Op = function Op(t, e, i, n) {wp.call(this), this.storage = t, this.painter = e, this.painterRoot = n, i = i || new Ae(), this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, this._gestureMgr, le.call(this), this.setHandlerProxy(i);};Op.prototype = { constructor: Op, setHandlerProxy: function setHandlerProxy(t) {this.proxy && this.proxy.dispose(), t && (f(Lp, function (e) {t.on && t.on(e, this[e], this);}, this), t.handler = this), this.proxy = t;}, mousemove: function mousemove(t) {var e = t.zrX,i = t.zrY,n = Le(this, e, i),r = this._hovered,a = r.target;a && !a.__zr && (r = this.findHover(r.x, r.y), a = r.target);var o = this._hovered = n ? { x: e, y: i } : this.findHover(e, i),s = o.target,l = this.proxy;l.setCursor && l.setCursor(s ? s.cursor : "default"), a && s !== a && this.dispatchToElement(r, "mouseout", t), this.dispatchToElement(o, "mousemove", t), s && s !== a && this.dispatchToElement(o, "mouseover", t);}, mouseout: function mouseout(t) {var e = t.zrEventControl,i = t.zrIsToLocalDOM;"only_globalout" !== e && this.dispatchToElement(this._hovered, "mouseout", t), "no_globalout" !== e && !i && this.trigger("globalout", { type: "globalout", event: t });}, resize: function resize() {this._hovered = {};}, dispatch: function dispatch(t, e) {var i = this[t];i && i.call(this, e);}, dispose: function dispose() {this.proxy.dispose(), this.storage = this.proxy = this.painter = null;}, setCursorStyle: function setCursorStyle(t) {var e = this.proxy;e.setCursor && e.setCursor(t);}, dispatchToElement: function dispatchToElement(t, e, i) {t = t || {};var n = t.target;if (!n || !n.silent) {for (var r = "on" + e, a = De(e, t, i); n && (n[r] && (a.cancelBubble = n[r].call(n, a)), n.trigger(e, a), n = n.parent, !a.cancelBubble);) {;}a.cancelBubble || (this.trigger(e, a), this.painter && this.painter.eachOtherLayer(function (t) {"function" == typeof t[r] && t[r].call(t, a), t.trigger && t.trigger(e, a);}));}}, findHover: function findHover(t, e, i) {for (var n = this.storage.getDisplayList(), r = { x: t, y: e }, a = n.length - 1; a >= 0; a--) {var o;if (n[a] !== i && !n[a].ignore && (o = Pe(n[a], t, e)) && (!r.topTarget && (r.topTarget = n[a]), o !== Pp)) {r.target = n[a];break;}}return r;}, processGesture: function processGesture(t, e) {this._gestureMgr || (this._gestureMgr = new kp());var i = this._gestureMgr;"start" === e && i.clear();var n = i.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);if ("end" === e && i.clear(), n) {var r = n.type;t.gestureEvent = r, this.dispatchToElement({ target: n.target }, r, n.event);}} }, f(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {Op.prototype[t] = function (e) {var i,n,r = e.zrX,a = e.zrY,o = Le(this, r, a);if ("mouseup" === t && o || (i = this.findHover(r, a), n = i.target), "mousedown" === t) this._downEl = n, this._downPoint = [e.zrX, e.zrY], this._upEl = n;else if ("mouseup" === t) this._upEl = n;else if ("click" === t) {if (this._downEl !== this._upEl || !this._downPoint || mp(this._downPoint, [e.zrX, e.zrY]) > 4) return;this._downPoint = null;}this.dispatchToElement(i, t, e);};}), c(Op, wp), c(Op, le);var Rp = "undefined" == typeof Float32Array ? Array : Float32Array,zp = (Object.freeze || Object)({ create: Oe, identity: Re, copy: ze, mul: Be, translate: Ee, rotate: Ne, scale: Fe, invert: Ve, clone: He }),Bp = Re,Ep = 5e-5,Np = function Np(t) {t = t || {}, t.position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null;},Fp = Np.prototype;Fp.transform = null, Fp.needLocalTransform = function () {return We(this.rotation) || We(this.position[0]) || We(this.position[1]) || We(this.scale[0] - 1) || We(this.scale[1] - 1);};var Vp = [];Fp.updateTransform = function () {var t = this.parent,e = t && t.transform,i = this.needLocalTransform(),n = this.transform;if (!i && !e) return void (n && Bp(n));n = n || Oe(), i ? this.getLocalTransform(n) : Bp(n), e && (i ? Be(n, t.transform, n) : ze(n, t.transform)), this.transform = n;var r = this.globalScaleRatio;if (null != r && 1 !== r) {this.getGlobalScale(Vp);var a = Vp[0] < 0 ? -1 : 1,o = Vp[1] < 0 ? -1 : 1,s = ((Vp[0] - a) * r + a) / Vp[0] || 0,l = ((Vp[1] - o) * r + o) / Vp[1] || 0;n[0] *= s, n[1] *= s, n[2] *= l, n[3] *= l;}this.invTransform = this.invTransform || Oe(), Ve(this.invTransform, n);}, Fp.getLocalTransform = function (t) {return Np.getLocalTransform(this, t);}, Fp.setTransform = function (t) {var e = this.transform,i = t.dpr || 1;e ? t.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : t.setTransform(i, 0, 0, i, 0, 0);}, Fp.restoreTransform = function (t) {var e = t.dpr || 1;t.setTransform(e, 0, 0, e, 0, 0);};var Hp = [],Wp = Oe();Fp.setLocalTransform = function (t) {if (t) {var e = t[0] * t[0] + t[1] * t[1],i = t[2] * t[2] + t[3] * t[3],n = this.position,r = this.scale;We(e - 1) && (e = Math.sqrt(e)), We(i - 1) && (i = Math.sqrt(i)), t[0] < 0 && (e = -e), t[3] < 0 && (i = -i), n[0] = t[4], n[1] = t[5], r[0] = e, r[1] = i, this.rotation = Math.atan2(-t[1] / i, t[0] / e);}}, Fp.decomposeTransform = function () {if (this.transform) {var t = this.parent,e = this.transform;t && t.transform && (Be(Hp, t.invTransform, e), e = Hp);var i = this.origin;i && (i[0] || i[1]) && (Wp[4] = i[0], Wp[5] = i[1], Be(Hp, e, Wp), Hp[4] -= i[0], Hp[5] -= i[1], e = Hp), this.setLocalTransform(e);}}, Fp.getGlobalScale = function (t) {var e = this.transform;return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);}, Fp.transformCoordToLocal = function (t, e) {var i = [t, e],n = this.invTransform;return n && ae(i, i, n), i;}, Fp.transformCoordToGlobal = function (t, e) {var i = [t, e],n = this.transform;return n && ae(i, i, n), i;}, Np.getLocalTransform = function (t, e) {e = e || [], Bp(e);var i = t.origin,n = t.scale || [1, 1],r = t.rotation || 0,a = t.position || [0, 0];return i && (e[4] -= i[0], e[5] -= i[1]), Fe(e, e, n), r && Ne(e, e, r), i && (e[4] += i[0], e[5] += i[1]), e[4] += a[0], e[5] += a[1], e;};var Gp = { linear: function linear(t) {return t;}, quadraticIn: function quadraticIn(t) {return t * t;}, quadraticOut: function quadraticOut(t) {return t * (2 - t);}, quadraticInOut: function quadraticInOut(t) {return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);}, cubicIn: function cubicIn(t) {return t * t * t;}, cubicOut: function cubicOut(t) {return --t * t * t + 1;}, cubicInOut: function cubicInOut(t) {return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);}, quarticIn: function quarticIn(t) {return t * t * t * t;}, quarticOut: function quarticOut(t) {return 1 - --t * t * t * t;}, quarticInOut: function quarticInOut(t) {return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);}, quinticIn: function quinticIn(t) {return t * t * t * t * t;}, quinticOut: function quinticOut(t) {return --t * t * t * t * t + 1;}, quinticInOut: function quinticInOut(t) {return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);}, sinusoidalIn: function sinusoidalIn(t) {return 1 - Math.cos(t * Math.PI / 2);}, sinusoidalOut: function sinusoidalOut(t) {return Math.sin(t * Math.PI / 2);}, sinusoidalInOut: function sinusoidalInOut(t) {return .5 * (1 - Math.cos(Math.PI * t));}, exponentialIn: function exponentialIn(t) {return 0 === t ? 0 : Math.pow(1024, t - 1);}, exponentialOut: function exponentialOut(t) {return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);}, exponentialInOut: function exponentialInOut(t) {return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2);}, circularIn: function circularIn(t) {return 1 - Math.sqrt(1 - t * t);}, circularOut: function circularOut(t) {return Math.sqrt(1 - --t * t);}, circularInOut: function circularInOut(t) {return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);}, elasticIn: function elasticIn(t) {var e,i = .1,n = .4;return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = n / 4) : e = n * Math.asin(1 / i) / (2 * Math.PI), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / n)));
    }, elasticOut: function elasticOut(t) {var e,i = .1,n = .4;return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = n / 4) : e = n * Math.asin(1 / i) / (2 * Math.PI), i * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / n) + 1);}, elasticInOut: function elasticInOut(t) {var e,i = .1,n = .4;return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = n / 4) : e = n * Math.asin(1 / i) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / n) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / n) * .5 + 1);}, backIn: function backIn(t) {var e = 1.70158;return t * t * ((e + 1) * t - e);}, backOut: function backOut(t) {var e = 1.70158;return --t * t * ((e + 1) * t + e) + 1;}, backInOut: function backInOut(t) {var e = 2.5949095;return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);}, bounceIn: function bounceIn(t) {return 1 - Gp.bounceOut(1 - t);}, bounceOut: function bounceOut(t) {return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;}, bounceInOut: function bounceInOut(t) {return .5 > t ? .5 * Gp.bounceIn(2 * t) : .5 * Gp.bounceOut(2 * t - 1) + .5;} };Ge.prototype = { constructor: Ge, step: function step(t, e) {if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) return void (this._pausedTime += e);var i = (t - this._startTime - this._pausedTime) / this._life;if (!(0 > i)) {i = Math.min(i, 1);var n = this.easing,r = "string" == typeof n ? Gp[n] : n,a = "function" == typeof r ? r(i) : i;return this.fire("frame", a), 1 === i ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null;}}, restart: function restart(t) {var e = (t - this._startTime - this._pausedTime) % this._life;this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1;}, fire: function fire(t, e) {t = "on" + t, this[t] && this[t](this._target, e);}, pause: function pause() {this._paused = !0;}, resume: function resume() {this._paused = !1;} };var Xp = function Xp() {this.head = null, this.tail = null, this._len = 0;},Yp = Xp.prototype;Yp.insert = function (t) {var e = new Up(t);return this.insertEntry(e), e;}, Yp.insertEntry = function (t) {this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;}, Yp.remove = function (t) {var e = t.prev,i = t.next;e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--;}, Yp.len = function () {return this._len;}, Yp.clear = function () {this.head = this.tail = null, this._len = 0;};var Up = function Up(t) {this.value = t, this.next, this.prev;},qp = function qp(t) {this._list = new Xp(), this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null;},jp = qp.prototype;jp.put = function (t, e) {var i = this._list,n = this._map,r = null;if (null == n[t]) {var a = i.len(),o = this._lastRemovedEntry;if (a >= this._maxSize && a > 0) {var s = i.head;i.remove(s), delete n[s.key], r = s.value, this._lastRemovedEntry = s;}o ? o.value = e : o = new Up(e), o.key = t, i.insertEntry(o), n[t] = o;}return r;}, jp.get = function (t) {var e = this._map[t],i = this._list;return null != e ? (e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value) : void 0;}, jp.clear = function () {this._list.clear(), this._map = {};};var Zp = { transparent: [0, 0, 0, 0], aliceblue: [240, 248, 255, 1], antiquewhite: [250, 235, 215, 1], aqua: [0, 255, 255, 1], aquamarine: [127, 255, 212, 1], azure: [240, 255, 255, 1], beige: [245, 245, 220, 1], bisque: [255, 228, 196, 1], black: [0, 0, 0, 1], blanchedalmond: [255, 235, 205, 1], blue: [0, 0, 255, 1], blueviolet: [138, 43, 226, 1], brown: [165, 42, 42, 1], burlywood: [222, 184, 135, 1], cadetblue: [95, 158, 160, 1], chartreuse: [127, 255, 0, 1], chocolate: [210, 105, 30, 1], coral: [255, 127, 80, 1], cornflowerblue: [100, 149, 237, 1], cornsilk: [255, 248, 220, 1], crimson: [220, 20, 60, 1], cyan: [0, 255, 255, 1], darkblue: [0, 0, 139, 1], darkcyan: [0, 139, 139, 1], darkgoldenrod: [184, 134, 11, 1], darkgray: [169, 169, 169, 1], darkgreen: [0, 100, 0, 1], darkgrey: [169, 169, 169, 1], darkkhaki: [189, 183, 107, 1], darkmagenta: [139, 0, 139, 1], darkolivegreen: [85, 107, 47, 1], darkorange: [255, 140, 0, 1], darkorchid: [153, 50, 204, 1], darkred: [139, 0, 0, 1], darksalmon: [233, 150, 122, 1], darkseagreen: [143, 188, 143, 1], darkslateblue: [72, 61, 139, 1], darkslategray: [47, 79, 79, 1], darkslategrey: [47, 79, 79, 1], darkturquoise: [0, 206, 209, 1], darkviolet: [148, 0, 211, 1], deeppink: [255, 20, 147, 1], deepskyblue: [0, 191, 255, 1], dimgray: [105, 105, 105, 1], dimgrey: [105, 105, 105, 1], dodgerblue: [30, 144, 255, 1], firebrick: [178, 34, 34, 1], floralwhite: [255, 250, 240, 1], forestgreen: [34, 139, 34, 1], fuchsia: [255, 0, 255, 1], gainsboro: [220, 220, 220, 1], ghostwhite: [248, 248, 255, 1], gold: [255, 215, 0, 1], goldenrod: [218, 165, 32, 1], gray: [128, 128, 128, 1], green: [0, 128, 0, 1], greenyellow: [173, 255, 47, 1], grey: [128, 128, 128, 1], honeydew: [240, 255, 240, 1], hotpink: [255, 105, 180, 1], indianred: [205, 92, 92, 1], indigo: [75, 0, 130, 1], ivory: [255, 255, 240, 1], khaki: [240, 230, 140, 1], lavender: [230, 230, 250, 1], lavenderblush: [255, 240, 245, 1], lawngreen: [124, 252, 0, 1], lemonchiffon: [255, 250, 205, 1], lightblue: [173, 216, 230, 1], lightcoral: [240, 128, 128, 1], lightcyan: [224, 255, 255, 1], lightgoldenrodyellow: [250, 250, 210, 1], lightgray: [211, 211, 211, 1], lightgreen: [144, 238, 144, 1], lightgrey: [211, 211, 211, 1], lightpink: [255, 182, 193, 1], lightsalmon: [255, 160, 122, 1], lightseagreen: [32, 178, 170, 1], lightskyblue: [135, 206, 250, 1], lightslategray: [119, 136, 153, 1], lightslategrey: [119, 136, 153, 1], lightsteelblue: [176, 196, 222, 1], lightyellow: [255, 255, 224, 1], lime: [0, 255, 0, 1], limegreen: [50, 205, 50, 1], linen: [250, 240, 230, 1], magenta: [255, 0, 255, 1], maroon: [128, 0, 0, 1], mediumaquamarine: [102, 205, 170, 1], mediumblue: [0, 0, 205, 1], mediumorchid: [186, 85, 211, 1], mediumpurple: [147, 112, 219, 1], mediumseagreen: [60, 179, 113, 1], mediumslateblue: [123, 104, 238, 1], mediumspringgreen: [0, 250, 154, 1], mediumturquoise: [72, 209, 204, 1], mediumvioletred: [199, 21, 133, 1], midnightblue: [25, 25, 112, 1], mintcream: [245, 255, 250, 1], mistyrose: [255, 228, 225, 1], moccasin: [255, 228, 181, 1], navajowhite: [255, 222, 173, 1], navy: [0, 0, 128, 1], oldlace: [253, 245, 230, 1], olive: [128, 128, 0, 1], olivedrab: [107, 142, 35, 1], orange: [255, 165, 0, 1], orangered: [255, 69, 0, 1], orchid: [218, 112, 214, 1], palegoldenrod: [238, 232, 170, 1], palegreen: [152, 251, 152, 1], paleturquoise: [175, 238, 238, 1], palevioletred: [219, 112, 147, 1], papayawhip: [255, 239, 213, 1], peachpuff: [255, 218, 185, 1], peru: [205, 133, 63, 1], pink: [255, 192, 203, 1], plum: [221, 160, 221, 1], powderblue: [176, 224, 230, 1], purple: [128, 0, 128, 1], red: [255, 0, 0, 1], rosybrown: [188, 143, 143, 1], royalblue: [65, 105, 225, 1], saddlebrown: [139, 69, 19, 1], salmon: [250, 128, 114, 1], sandybrown: [244, 164, 96, 1], seagreen: [46, 139, 87, 1], seashell: [255, 245, 238, 1], sienna: [160, 82, 45, 1], silver: [192, 192, 192, 1], skyblue: [135, 206, 235, 1], slateblue: [106, 90, 205, 1], slategray: [112, 128, 144, 1], slategrey: [112, 128, 144, 1], snow: [255, 250, 250, 1], springgreen: [0, 255, 127, 1], steelblue: [70, 130, 180, 1], tan: [210, 180, 140, 1], teal: [0, 128, 128, 1], thistle: [216, 191, 216, 1], tomato: [255, 99, 71, 1], turquoise: [64, 224, 208, 1], violet: [238, 130, 238, 1], wheat: [245, 222, 179, 1], white: [255, 255, 255, 1], whitesmoke: [245, 245, 245, 1], yellow: [255, 255, 0, 1], yellowgreen: [154, 205, 50, 1] },Kp = new qp(20),$p = null,Qp = ai,Jp = oi,tg = (Object.freeze || Object)({ parse: ti, lift: ni, toHex: ri, fastLerp: ai, fastMapToColor: Qp, lerp: oi, mapToColor: Jp, modifyHSL: si, modifyAlpha: li, stringify: ui }),eg = Array.prototype.slice,ig = function ig(t, e, i, n) {this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = i || hi, this._setter = n || ci, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = [];};ig.prototype = { when: function when(t, e) {var i = this._tracks;for (var n in e) {if (e.hasOwnProperty(n)) {if (!i[n]) {i[n] = [];var r = this._getter(this._target, n);if (null == r) continue;0 !== t && i[n].push({ time: 0, value: _i(r) });}i[n].push({ time: t, value: e[n] });}}return this;}, during: function during(t) {return this._onframeList.push(t), this;}, pause: function pause() {for (var t = 0; t < this._clipList.length; t++) {this._clipList[t].pause();}this._paused = !0;}, resume: function resume() {for (var t = 0; t < this._clipList.length; t++) {this._clipList[t].resume();}this._paused = !1;}, isPaused: function isPaused() {return !!this._paused;}, _doneCallback: function _doneCallback() {this._tracks = {}, this._clipList.length = 0;for (var t = this._doneList, e = t.length, i = 0; e > i; i++) {t[i].call(this);}}, start: function start(t, e) {var i,n = this,r = 0,a = function a() {r--, r || n._doneCallback();};for (var o in this._tracks) {if (this._tracks.hasOwnProperty(o)) {var s = bi(this, t, a, this._tracks[o], o, e);s && (this._clipList.push(s), r++, this.animation && this.animation.addClip(s), i = s);}}if (i) {var l = i.onframe;i.onframe = function (t, e) {l(t, e);for (var i = 0; i < n._onframeList.length; i++) {n._onframeList[i](t, e);}};}return r || this._doneCallback(), this;}, stop: function stop(t) {for (var e = this._clipList, i = this.animation, n = 0; n < e.length; n++) {var r = e[n];t && r.onframe(this._target, 1), i && i.removeClip(r);}e.length = 0;}, delay: function delay(t) {return this._delay = t, this;}, done: function done(t) {return t && this._doneList.push(t), this;}, getClips: function getClips() {return this._clipList;} };var ng = 1;"undefined" != typeof window && (ng = Math.max(window.devicePixelRatio || 1, 1));var rg = 0,ag = ng,og = function og() {};1 === rg && (og = console.error);var sg = og,lg = function lg() {this.animators = [];};lg.prototype = { constructor: lg, animate: function animate(t, e) {var i,n = !1,r = this,a = this.__zr;if (t) {var o = t.split("."),s = r;n = "shape" === o[0];for (var l = 0, h = o.length; h > l; l++) {s && (s = s[o[l]]);}s && (i = s);} else i = r;if (!i) return void sg('Property "' + t + '" is not existed in element ' + r.id);var c = r.animators,d = new ig(i, e);return d.during(function () {r.dirty(n);}).done(function () {c.splice(u(c, d), 1);}), c.push(d), a && a.animation.addAnimator(d), d;}, stopAnimation: function stopAnimation(t) {for (var e = this.animators, i = e.length, n = 0; i > n; n++) {e[n].stop(t);}return e.length = 0, this;}, animateTo: function animateTo(t, e, i, n, r, a) {Mi(this, t, e, i, n, r, a);}, animateFrom: function animateFrom(t, e, i, n, r, a) {Mi(this, t, e, i, n, r, a, !0);} };var ug = function ug(t) {Np.call(this, t), wp.call(this, t), lg.call(this, t), this.id = t.id || $f();};ug.prototype = { type: "element", name: "", __zr: null, ignore: !1, clipPath: null, isGroup: !1, drift: function drift(t, e) {switch (this.draggable) {case "horizontal":e = 0;break;case "vertical":t = 0;}var i = this.transform;i || (i = this.transform = [1, 0, 0, 1, 0, 0]), i[4] += t, i[5] += e, this.decomposeTransform(), this.dirty(!1);}, beforeUpdate: function beforeUpdate() {}, afterUpdate: function afterUpdate() {}, update: function update() {this.updateTransform();}, traverse: function traverse() {}, attrKV: function attrKV(t, e) {if ("position" === t || "scale" === t || "origin" === t) {if (e) {var i = this[t];i || (i = this[t] = []), i[0] = e[0], i[1] = e[1];}} else this[t] = e;}, hide: function hide() {this.ignore = !0, this.__zr && this.__zr.refresh();}, show: function show() {this.ignore = !1, this.__zr && this.__zr.refresh();}, attr: function attr(t, e) {if ("string" == typeof t) this.attrKV(t, e);else if (M(t)) for (var i in t) {t.hasOwnProperty(i) && this.attrKV(i, t[i]);}return this.dirty(!1), this;}, setClipPath: function setClipPath(t) {var e = this.__zr;e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1);}, removeClipPath: function removeClipPath() {var t = this.clipPath;t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1));}, addSelfToZr: function addSelfToZr(t) {this.__zr = t;var e = this.animators;if (e) for (var i = 0; i < e.length; i++) {t.animation.addAnimator(e[i]);}this.clipPath && this.clipPath.addSelfToZr(t);}, removeSelfFromZr: function removeSelfFromZr(t) {this.__zr = null;var e = this.animators;if (e) for (var i = 0; i < e.length; i++) {t.animation.removeAnimator(e[i]);}this.clipPath && this.clipPath.removeSelfFromZr(t);} }, c(ug, lg), c(ug, Np), c(ug, wp);var hg = ae,cg = Math.min,dg = Math.max;Ii.prototype = { constructor: Ii, union: function union(t) {var e = cg(t.x, this.x),i = cg(t.y, this.y);this.width = dg(t.x + t.width, this.x + this.width) - e, this.height = dg(t.y + t.height, this.y + this.height) - i, this.x = e, this.y = i;}, applyTransform: function () {var t = [],e = [],i = [],n = [];return function (r) {if (r) {t[0] = i[0] = this.x, t[1] = n[1] = this.y, e[0] = n[0] = this.x + this.width, e[1] = i[1] = this.y + this.height, hg(t, t, r), hg(e, e, r), hg(i, i, r), hg(n, n, r), this.x = cg(t[0], e[0], i[0], n[0]), this.y = cg(t[1], e[1], i[1], n[1]);var a = dg(t[0], e[0], i[0], n[0]),o = dg(t[1], e[1], i[1], n[1]);this.width = a - this.x, this.height = o - this.y;}};}(), calculateTransform: function calculateTransform(t) {var e = this,i = t.width / e.width,n = t.height / e.height,r = Oe();return Ee(r, r, [-e.x, -e.y]), Fe(r, r, [i, n]), Ee(r, r, [t.x, t.y]), r;}, intersect: function intersect(t) {if (!t) return !1;t instanceof Ii || (t = Ii.create(t));var e = this,i = e.x,n = e.x + e.width,r = e.y,a = e.y + e.height,o = t.x,s = t.x + t.width,l = t.y,u = t.y + t.height;return !(o > n || i > s || l > a || r > u);}, contain: function contain(t, e) {var i = this;return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;}, clone: function clone() {return new Ii(this.x, this.y, this.width, this.height);}, copy: function copy(t) {this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height;}, plain: function plain() {return { x: this.x, y: this.y, width: this.width, height: this.height };} }, Ii.create = function (t) {return new Ii(t.x, t.y, t.width, t.height);};var fg = function fg(t) {t = t || {}, ug.call(this, t);for (var e in t) {t.hasOwnProperty(e) && (this[e] = t[e]);}this._children = [], this.__storage = null, this.__dirty = !0;};fg.prototype = { constructor: fg, isGroup: !0, type: "group", silent: !1, children: function children() {return this._children.slice();}, childAt: function childAt(t) {return this._children[t];}, childOfName: function childOfName(t) {for (var e = this._children, i = 0; i < e.length; i++) {if (e[i].name === t) return e[i];}}, childCount: function childCount() {return this._children.length;}, add: function add(t) {return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this;}, addBefore: function addBefore(t, e) {if (t && t !== this && t.parent !== this && e && e.parent === this) {var i = this._children,n = i.indexOf(e);n >= 0 && (i.splice(n, 0, t), this._doAdd(t));}return this;}, _doAdd: function _doAdd(t) {t.parent && t.parent.remove(t), t.parent = this;var e = this.__storage,i = this.__zr;e && e !== t.__storage && (e.addToStorage(t), t instanceof fg && t.addChildrenToStorage(e)), i && i.refresh();}, remove: function remove(t) {var e = this.__zr,i = this.__storage,n = this._children,r = u(n, t);return 0 > r ? this : (n.splice(r, 1), t.parent = null, i && (i.delFromStorage(t), t instanceof fg && t.delChildrenFromStorage(i)), e && e.refresh(), this);}, removeAll: function removeAll() {var t,e,i = this._children,n = this.__storage;for (e = 0; e < i.length; e++) {t = i[e], n && (n.delFromStorage(t), t instanceof fg && t.delChildrenFromStorage(n)), t.parent = null;}return i.length = 0, this;}, eachChild: function eachChild(t, e) {for (var i = this._children, n = 0; n < i.length; n++) {var r = i[n];t.call(e, r, n);}return this;}, traverse: function traverse(t, e) {for (var i = 0; i < this._children.length; i++) {var n = this._children[i];t.call(e, n), "group" === n.type && n.traverse(t, e);}return this;}, addChildrenToStorage: function addChildrenToStorage(t) {for (var e = 0; e < this._children.length; e++) {var i = this._children[e];t.addToStorage(i), i instanceof fg && i.addChildrenToStorage(t);}}, delChildrenFromStorage: function delChildrenFromStorage(t) {for (var e = 0; e < this._children.length; e++) {var i = this._children[e];t.delFromStorage(i), i instanceof fg && i.delChildrenFromStorage(t);}}, dirty: function dirty() {return this.__dirty = !0, this.__zr && this.__zr.refresh(), this;}, getBoundingRect: function getBoundingRect(t) {for (var e = null, i = new Ii(0, 0, 0, 0), n = t || this._children, r = [], a = 0; a < n.length; a++) {var o = n[a];if (!o.ignore && !o.invisible) {var s = o.getBoundingRect(),l = o.getLocalTransform(r);l ? (i.copy(s), i.applyTransform(l), e = e || i.clone(), e.union(i)) : (e = e || s.clone(), e.union(s));}}return e || i;} }, h(fg, ug);var pg = 32,gg = 7,vg = function vg() {this._roots = [], this._displayList = [], this._displayListLen = 0;};vg.prototype = { constructor: vg, traverse: function traverse(t, e) {for (var i = 0; i < this._roots.length; i++) {this._roots[i].traverse(t, e);}}, getDisplayList: function getDisplayList(t, e) {return e = e || !1, t && this.updateDisplayList(e), this._displayList;}, updateDisplayList: function updateDisplayList(t) {this._displayListLen = 0;for (var e = this._roots, i = this._displayList, n = 0, r = e.length; r > n; n++) {this._updateAndAddDisplayable(e[n], null, t);}i.length = this._displayListLen, Jf.canvasSupported && Ri(i, zi);}, _updateAndAddDisplayable: function _updateAndAddDisplayable(t, e, i) {if (!t.ignore || i) {t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();var n = t.clipPath;if (n) {e = e ? e.slice() : [];for (var r = n, a = t; r;) {r.parent = a, r.updateTransform(), e.push(r), a = r, r = r.clipPath;}}if (t.isGroup) {for (var o = t._children, s = 0; s < o.length; s++) {var l = o[s];t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, i);}t.__dirty = !1;} else t.__clipPaths = e, this._displayList[this._displayListLen++] = t;}}, addRoot: function addRoot(t) {t.__storage !== this && (t instanceof fg && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(t));}, delRoot: function delRoot(t) {if (null == t) {for (var e = 0; e < this._roots.length; e++) {var i = this._roots[e];i instanceof fg && i.delChildrenFromStorage(this);}return this._roots = [], this._displayList = [], void (this._displayListLen = 0);}if (t instanceof Array) for (var e = 0, n = t.length; n > e; e++) {this.delRoot(t[e]);} else {var r = u(this._roots, t);r >= 0 && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof fg && t.delChildrenFromStorage(this));}}, addToStorage: function addToStorage(t) {return t && (t.__storage = this, t.dirty(!1)), this;}, delFromStorage: function delFromStorage(t) {return t && (t.__storage = null), this;}, dispose: function dispose() {this._renderList = this._roots = null;}, displayableSortFunc: zi };var mg = { shadowBlur: 1, shadowOffsetX: 1, shadowOffsetY: 1, textShadowBlur: 1, textShadowOffsetX: 1, textShadowOffsetY: 1, textBoxShadowBlur: 1, textBoxShadowOffsetX: 1, textBoxShadowOffsetY: 1 },yg = function yg(t, e, i) {return mg.hasOwnProperty(e) ? i *= t.dpr : i;},_g = { NONE: 0, STYLE_BIND: 1, PLAIN_TEXT: 2 },xg = 9,wg = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]],bg = function bg(t) {this.extendFrom(t, !1);};bg.prototype = { constructor: bg, fill: "#000", stroke: null, opacity: 1, fillOpacity: null, strokeOpacity: null, lineDash: null, lineDashOffset: 0, shadowBlur: 0, shadowOffsetX: 0, shadowOffsetY: 0, lineWidth: 1, strokeNoScale: !1, text: null, font: null, textFont: null, fontStyle: null, fontWeight: null, fontSize: null, fontFamily: null, textTag: null, textFill: "#000", textStroke: null, textWidth: null, textHeight: null, textStrokeWidth: 0, textLineHeight: null, textPosition: "inside", textRect: null, textOffset: null, textAlign: null, textVerticalAlign: null, textDistance: 5, textShadowColor: "transparent", textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textBoxShadowColor: "transparent", textBoxShadowBlur: 0, textBoxShadowOffsetX: 0, textBoxShadowOffsetY: 0, transformText: !1, textRotation: 0, textOrigin: null, textBackgroundColor: null, textBorderColor: null, textBorderWidth: 0, textBorderRadius: 0, textPadding: null, rich: null, truncate: null, blend: null, bind: function bind(t, e, i) {var n = this,r = i && i.style,a = !r || t.__attrCachedBy !== _g.STYLE_BIND;t.__attrCachedBy = _g.STYLE_BIND;for (var o = 0; o < wg.length; o++) {var s = wg[o],l = s[0];(a || n[l] !== r[l]) && (t[l] = yg(t, l, n[l] || s[1]));}if ((a || n.fill !== r.fill) && (t.fillStyle = n.fill), (a || n.stroke !== r.stroke) && (t.strokeStyle = n.stroke), (a || n.opacity !== r.opacity) && (t.globalAlpha = null == n.opacity ? 1 : n.opacity), (a || n.blend !== r.blend) && (t.globalCompositeOperation = n.blend || "source-over"), this.hasStroke()) {var u = n.lineWidth;t.lineWidth = u / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1);}}, hasFill: function hasFill() {var t = this.fill;return null != t && "none" !== t;}, hasStroke: function hasStroke() {var t = this.stroke;return null != t && "none" !== t && this.lineWidth > 0;}, extendFrom: function extendFrom(t, e) {if (t) for (var i in t) {!t.hasOwnProperty(i) || e !== !0 && (e === !1 ? this.hasOwnProperty(i) : null == t[i]) || (this[i] = t[i]);}}, set: function set(t, e) {"string" == typeof t ? this[t] = e : this.extendFrom(t, !0);}, clone: function clone() {var t = new this.constructor();return t.extendFrom(this, !0), t;}, getGradient: function getGradient(t, e, i) {for (var n = "radial" === e.type ? Ei : Bi, r = n(t, e, i), a = e.colorStops, o = 0; o < a.length; o++) {r.addColorStop(a[o].offset, a[o].color);}return r;} };for (var Mg = bg.prototype, Sg = 0; Sg < wg.length; Sg++) {var Tg = wg[Sg];Tg[0] in Mg || (Mg[Tg[0]] = Tg[1]);}bg.getGradient = Mg.getGradient;var Ig = function Ig(t, e) {this.image = t, this.repeat = e, this.type = "pattern";};Ig.prototype.getCanvasPattern = function (t) {return t.createPattern(this.image, this.repeat || "repeat");};var Cg = function Cg(t, e, i) {var n;i = i || ag, "string" == typeof t ? n = Fi(t, e, i) : M(t) && (n = t, t = n.id), this.id = t, this.dom = n;var r = n.style;r && (n.onselectstart = Ni, r["-webkit-user-select"] = "none", r["user-select"] = "none", r["-webkit-touch-callout"] = "none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", r.padding = 0, r.margin = 0, r["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = i;};Cg.prototype = { constructor: Cg, __dirty: !0, __used: !1, __drawIndex: 0, __startIndex: 0, __endIndex: 0, incremental: !1, getElementCount: function getElementCount() {return this.__endIndex - this.__startIndex;}, initContext: function initContext() {this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;}, createBackBuffer: function createBackBuffer() {var t = this.dpr;this.domBack = Fi("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 !== t && this.ctxBack.scale(t, t);}, resize: function resize(t, e) {var i = this.dpr,n = this.dom,r = n.style,a = this.domBack;r && (r.width = t + "px", r.height = e + "px"), n.width = t * i, n.height = e * i, a && (a.width = t * i, a.height = e * i, 1 !== i && this.ctxBack.scale(i, i));}, clear: function clear(t, e) {var i = this.dom,n = this.ctx,r = i.width,a = i.height,e = e || this.clearColor,o = this.motionBlur && !t,s = this.lastFrameAlpha,l = this.dpr;if (o && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(i, 0, 0, r / l, a / l)), n.clearRect(0, 0, r, a), e && "transparent" !== e) {var u;e.colorStops ? (u = e.__canvasGradient || bg.getGradient(n, e, { x: 0, y: 0, width: r, height: a }), e.__canvasGradient = u) : e.image && (u = Ig.prototype.getCanvasPattern.call(e, n)), n.save(), n.fillStyle = u || e, n.fillRect(0, 0, r, a), n.restore();}if (o) {var h = this.domBack;n.save(), n.globalAlpha = s, n.drawImage(h, 0, 0, r, a), n.restore();}} };var Dg = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (t) {setTimeout(t, 16);},kg = new qp(50),Ag = {},Pg = 0,Lg = 5e3,Og = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,Rg = "12px sans-serif",zg = {};zg.measureText = function (t, e) {var i = l();return i.font = e || Rg, i.measureText(t);};var Bg = Rg,Eg = { left: 1, right: 1, center: 1 },Ng = { top: 1, bottom: 1, middle: 1 },Fg = [["textShadowBlur", "shadowBlur", 0], ["textShadowOffsetX", "shadowOffsetX", 0], ["textShadowOffsetY", "shadowOffsetY", 0], ["textShadowColor", "shadowColor", "transparent"]],Vg = {},Hg = {},Wg = new Ii(),Gg = function Gg() {};Gg.prototype = { constructor: Gg, drawRectText: function drawRectText(t, e) {var i = this.style;e = i.textRect || e, this.__dirty && un(i, !0);var n = i.text;if (null != n && (n += ""), In(n, i)) {t.save();var r = this.transform;i.transformText ? this.setTransform(t) : r && (Wg.copy(e), Wg.applyTransform(r), e = Wg), cn(this, t, n, i, e, xg), t.restore();}} }, Cn.prototype = { constructor: Cn, type: "displayable", __dirty: !0, invisible: !1, z: 0, z2: 0, zlevel: 0, draggable: !1, dragging: !1, silent: !1, culling: !1, cursor: "pointer", rectHover: !1, progressive: !1, incremental: !1, globalScaleRatio: 1, beforeBrush: function beforeBrush() {}, afterBrush: function afterBrush() {}, brush: function brush() {}, getBoundingRect: function getBoundingRect() {}, contain: function contain(t, e) {return this.rectContain(t, e);}, traverse: function traverse(t, e) {t.call(e, this);}, rectContain: function rectContain(t, e) {var i = this.transformCoordToLocal(t, e),n = this.getBoundingRect();return n.contain(i[0], i[1]);}, dirty: function dirty() {this.__dirty = this.__dirtyText = !0, this._rect = null, this.__zr && this.__zr.refresh();}, animateStyle: function animateStyle(t) {return this.animate("style", t);}, attrKV: function attrKV(t, e) {"style" !== t ? ug.prototype.attrKV.call(this, t, e) : this.style.set(e);}, setStyle: function setStyle(t, e) {return this.style.set(t, e), this.dirty(!1), this;}, useStyle: function useStyle(t) {return this.style = new bg(t, this), this.dirty(!1), this;}, calculateTextPosition: null }, h(Cn, ug), c(Cn, Gg), Dn.prototype = { constructor: Dn, type: "image", brush: function brush(t, e) {var i = this.style,n = i.image;i.bind(t, this, e);var r = this._image = Hi(n, this._image, this, this.onload);if (r && Gi(r)) {var a = i.x || 0,o = i.y || 0,s = i.width,l = i.height,u = r.width / r.height;if (null == s && null != l ? s = l * u : null == l && null != s ? l = s / u : null == s && null == l && (s = r.width, l = r.height), this.setTransform(t), i.sWidth && i.sHeight) {var h = i.sx || 0,c = i.sy || 0;t.drawImage(r, h, c, i.sWidth, i.sHeight, a, o, s, l);} else if (i.sx && i.sy) {var h = i.sx,c = i.sy,d = s - h,f = l - c;t.drawImage(r, h, c, d, f, a, o, s, l);} else t.drawImage(r, a, o, s, l);null != i.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));}}, getBoundingRect: function getBoundingRect() {var t = this.style;return this._rect || (this._rect = new Ii(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect;} }, h(Dn, Cn);var Xg = 1e5,Yg = 314159,Ug = .01,qg = .001,jg = new Ii(0, 0, 0, 0),Zg = new Ii(0, 0, 0, 0),Kg = function Kg(t, e, i) {this.type = "canvas";var n = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();this._opts = i = o({}, i || {}), this.dpr = i.devicePixelRatio || ag, this._singleCanvas = n, this.root = t;var r = t.style;r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;var a = this._zlevelList = [],s = this._layers = {};if (this._layerConfig = {}, this._needsManuallyCompositing = !1, n) {var l = t.width,u = t.height;null != i.width && (l = i.width), null != i.height && (u = i.height), this.dpr = i.devicePixelRatio || 1, t.width = l * this.dpr, t.height = u * this.dpr, this._width = l, this._height = u;var h = new Cg(t, this, this.dpr);h.__builtin__ = !0, h.initContext(), s[Yg] = h, h.zlevel = Yg, a.push(Yg), this._domRoot = t;} else {this._width = this._getSize(0), this._height = this._getSize(1);var c = this._domRoot = Rn(this._width, this._height);t.appendChild(c);}this._hoverlayer = null, this._hoverElements = [];};Kg.prototype = { constructor: Kg, getType: function getType() {return "canvas";}, isSingleCanvas: function isSingleCanvas() {return this._singleCanvas;}, getViewportRoot: function getViewportRoot() {return this._domRoot;}, getViewportRootOffset: function getViewportRootOffset() {var t = this.getViewportRoot();return t ? { offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0 } : void 0;}, refresh: function refresh(t) {var e = this.storage.getDisplayList(!0),i = this._zlevelList;this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);for (var n = 0; n < i.length; n++) {var r = i[n],a = this._layers[r];if (!a.__builtin__ && a.refresh) {var o = 0 === n ? this._backgroundColor : null;a.refresh(o);}}return this.refreshHover(), this;}, addHover: function addHover(t, e) {if (!t.__hoverMir) {var i = new t.constructor({ style: t.style, shape: t.shape, z: t.z, z2: t.z2, silent: t.silent });return i.__from = t, t.__hoverMir = i, e && i.setStyle(e), this._hoverElements.push(i), i;}}, removeHover: function removeHover(t) {var e = t.__hoverMir,i = this._hoverElements,n = u(i, e);n >= 0 && i.splice(n, 1), t.__hoverMir = null;}, clearHover: function clearHover() {for (var t = this._hoverElements, e = 0; e < t.length; e++) {var i = t[e].__from;i && (i.__hoverMir = null);}t.length = 0;}, refreshHover: function refreshHover() {var t = this._hoverElements,e = t.length,i = this._hoverlayer;if (i && i.clear(), e) {Ri(t, this.storage.displayableSortFunc), i || (i = this._hoverlayer = this.getLayer(Xg));var n = {};i.ctx.save();for (var r = 0; e > r;) {var a = t[r],o = a.__from;o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths = o.__clipPaths, this._doPaintEl(a, i, !0, n))) : (t.splice(r, 1), o.__hoverMir = null, e--);}i.ctx.restore();}}, getHoverLayer: function getHoverLayer() {return this.getLayer(Xg);}, _paintList: function _paintList(t, e, i) {if (this._redrawId === i) {e = e || !1, this._updateLayerStatus(t);var n = this._doPaintList(t, e);if (this._needsManuallyCompositing && this._compositeManually(), !n) {var r = this;Dg(function () {r._paintList(t, e, i);});}}}, _compositeManually: function _compositeManually() {var t = this.getLayer(Yg).ctx,e = this._domRoot.width,i = this._domRoot.height;t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function (n) {n.virtual && t.drawImage(n.dom, 0, 0, e, i);});}, _doPaintList: function _doPaintList(t, e) {for (var i = [], n = 0; n < this._zlevelList.length; n++) {var r = this._zlevelList[n],a = this._layers[r];a.__builtin__ && a !== this._hoverlayer && (a.__dirty || e) && i.push(a);}for (var o = !0, s = 0; s < i.length; s++) {var a = i[s],l = a.ctx,u = {};l.save();var h = e ? a.__startIndex : a.__drawIndex,c = !e && a.incremental && Date.now,d = c && Date.now(),p = a.zlevel === this._zlevelList[0] ? this._backgroundColor : null;if (a.__startIndex === a.__endIndex) a.clear(!1, p);else if (h === a.__startIndex) {var g = t[h];g.incremental && g.notClear && !e || a.clear(!1, p);}-1 === h && (console.error("For some unknown reason. drawIndex is -1"), h = a.__startIndex);for (var v = h; v < a.__endIndex; v++) {var m = t[v];if (this._doPaintEl(m, a, e, u), m.__dirty = m.__dirtyText = !1, c) {var y = Date.now() - d;if (y > 15) break;}}a.__drawIndex = v, a.__drawIndex < a.__endIndex && (o = !1), u.prevElClipPaths && l.restore(), l.restore();}return Jf.wxa && f(this._layers, function (t) {t && t.ctx && t.ctx.draw && t.ctx.draw();}), o;}, _doPaintEl: function _doPaintEl(t, e, i, n) {var r = e.ctx,a = t.transform;if (!(!e.__dirty && !i || t.invisible || 0 === t.style.opacity || a && !a[0] && !a[3] || t.culling && Pn(t, this._width, this._height))) {var o = t.__clipPaths,s = n.prevElClipPaths;(!s || Ln(o, s)) && (s && (r.restore(), n.prevElClipPaths = null, n.prevEl = null), o && (r.save(), On(o, r), n.prevElClipPaths = o)), t.beforeBrush && t.beforeBrush(r), t.brush(r, n.prevEl || null), n.prevEl = t, t.afterBrush && t.afterBrush(r);}}, getLayer: function getLayer(t, e) {this._singleCanvas && !this._needsManuallyCompositing && (t = Yg);var i = this._layers[t];return i || (i = new Cg("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? r(i, this._layerConfig[t], !0) : this._layerConfig[t - Ug] && r(i, this._layerConfig[t - Ug], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;}, insertLayer: function insertLayer(t, e) {var i = this._layers,n = this._zlevelList,r = n.length,a = null,o = -1,s = this._domRoot;if (i[t]) return void sg("ZLevel " + t + " has been used already");if (!An(e)) return void sg("Layer of zlevel " + t + " is not valid");if (r > 0 && t > n[0]) {for (o = 0; r - 1 > o && !(n[o] < t && n[o + 1] > t); o++) {;}a = i[n[o]];}if (n.splice(o + 1, 0, t), i[t] = e, !e.virtual) if (a) {var l = a.dom;l.nextSibling ? s.insertBefore(e.dom, l.nextSibling) : s.appendChild(e.dom);} else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom);}, eachLayer: function eachLayer(t, e) {var i,n,r = this._zlevelList;for (n = 0; n < r.length; n++) {i = r[n], t.call(e, this._layers[i], i);}}, eachBuiltinLayer: function eachBuiltinLayer(t, e) {var i,n,r,a = this._zlevelList;for (r = 0; r < a.length; r++) {n = a[r], i = this._layers[n], i.__builtin__ && t.call(e, i, n);}}, eachOtherLayer: function eachOtherLayer(t, e) {var i,n,r,a = this._zlevelList;for (r = 0; r < a.length; r++) {n = a[r], i = this._layers[n], i.__builtin__ || t.call(e, i, n);}}, getLayers: function getLayers() {return this._layers;}, _updateLayerStatus: function _updateLayerStatus(t) {function e(t) {a && (a.__endIndex !== t && (a.__dirty = !0), a.__endIndex = t);}if (this.eachBuiltinLayer(function (t) {t.__dirty = t.__used = !1;}), this._singleCanvas) for (var i = 1; i < t.length; i++) {var n = t[i];if (n.zlevel !== t[i - 1].zlevel || n.incremental) {this._needsManuallyCompositing = !0;break;}}for (var r, a = null, o = 0, i = 0; i < t.length; i++) {var s,n = t[i],l = n.zlevel;r !== l && (r = l, o = 0), n.incremental ? (s = this.getLayer(l + qg, this._needsManuallyCompositing), s.incremental = !0, o = 1) : s = this.getLayer(l + (o > 0 ? Ug : 0), this._needsManuallyCompositing), s.__builtin__ || sg("ZLevel " + l + " has been used by unkown layer " + s.id), s !== a && (s.__used = !0, s.__startIndex !== i && (s.__dirty = !0), s.__startIndex = i, s.__drawIndex = s.incremental ? -1 : i, e(i), a = s), n.__dirty && (s.__dirty = !0, s.incremental && s.__drawIndex < 0 && (s.__drawIndex = i));}e(i), this.eachBuiltinLayer(function (t) {!t.__used && t.getElementCount() > 0 && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex);});}, clear: function clear() {return this.eachBuiltinLayer(this._clearLayer), this;}, _clearLayer: function _clearLayer(t) {t.clear();}, setBackgroundColor: function setBackgroundColor(t) {this._backgroundColor = t;}, configLayer: function configLayer(t, e) {if (e) {var i = this._layerConfig;i[t] ? r(i[t], e, !0) : i[t] = e;for (var n = 0; n < this._zlevelList.length; n++) {var a = this._zlevelList[n];if (a === t || a === t + Ug) {var o = this._layers[a];r(o, i[t], !0);}}}}, delLayer: function delLayer(t) {var e = this._layers,i = this._zlevelList,n = e[t];n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(u(i, t), 1));}, resize: function resize(t, e) {if (this._domRoot.style) {var i = this._domRoot;i.style.display = "none";var n = this._opts;if (null != t && (n.width = t), null != e && (n.height = e), t = this._getSize(0), e = this._getSize(1), i.style.display = "", this._width !== t || e !== this._height) {i.style.width = t + "px", i.style.height = e + "px";for (var r in this._layers) {this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);}f(this._progressiveLayers, function (i) {i.resize(t, e);}), this.refresh(!0);}this._width = t, this._height = e;} else {if (null == t || null == e) return;this._width = t, this._height = e, this.getLayer(Yg).resize(t, e);}return this;}, clearLayer: function clearLayer(t) {var e = this._layers[t];e && e.clear();}, dispose: function dispose() {this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;}, getRenderedCanvas: function getRenderedCanvas(t) {if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[Yg].dom;var e = new Cg("image", this, t.pixelRatio || this.dpr);if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {this.refresh();var i = e.dom.width,n = e.dom.height,r = e.ctx;this.eachLayer(function (t) {t.__builtin__ ? r.drawImage(t.dom, 0, 0, i, n) : t.renderToCanvas && (e.ctx.save(), t.renderToCanvas(e.ctx), e.ctx.restore());});} else for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {var l = o[s];this._doPaintEl(l, e, !0, a);}return e.dom;}, getWidth: function getWidth() {return this._width;}, getHeight: function getHeight() {return this._height;}, _getSize: function _getSize(t) {var e = this._opts,i = ["width", "height"][t],n = ["clientWidth", "clientHeight"][t],r = ["paddingLeft", "paddingTop"][t],a = ["paddingRight", "paddingBottom"][t];if (null != e[i] && "auto" !== e[i]) return parseFloat(e[i]);var o = this.root,s = document.defaultView.getComputedStyle(o);
      return (o[n] || kn(s[i]) || kn(o.style[i])) - (kn(s[r]) || 0) - (kn(s[a]) || 0) | 0;}, pathToImage: function pathToImage(t, e) {e = e || this.dpr;var i = document.createElement("canvas"),n = i.getContext("2d"),r = t.getBoundingRect(),a = t.style,o = a.shadowBlur * e,s = a.shadowOffsetX * e,l = a.shadowOffsetY * e,u = a.hasStroke() ? a.lineWidth : 0,h = Math.max(u / 2, -s + o),c = Math.max(u / 2, s + o),d = Math.max(u / 2, -l + o),f = Math.max(u / 2, l + o),p = r.width + h + c,g = r.height + d + f;i.width = p * e, i.height = g * e, n.scale(e, e), n.clearRect(0, 0, p, g), n.dpr = e;var v = { position: t.position, rotation: t.rotation, scale: t.scale };t.position = [h - r.x, d - r.y], t.rotation = 0, t.scale = [1, 1], t.updateTransform(), t && t.brush(n);var m = Dn,y = new m({ style: { x: 0, y: 0, image: i } });return null != v.position && (y.position = t.position = v.position), null != v.rotation && (y.rotation = t.rotation = v.rotation), null != v.scale && (y.scale = t.scale = v.scale), y;} };var $g = function $g(t) {t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {}, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, wp.call(this);};$g.prototype = { constructor: $g, addClip: function addClip(t) {this._clips.push(t);}, addAnimator: function addAnimator(t) {t.animation = this;for (var e = t.getClips(), i = 0; i < e.length; i++) {this.addClip(e[i]);}}, removeClip: function removeClip(t) {var e = u(this._clips, t);e >= 0 && this._clips.splice(e, 1);}, removeAnimator: function removeAnimator(t) {for (var e = t.getClips(), i = 0; i < e.length; i++) {this.removeClip(e[i]);}t.animation = null;}, _update: function _update() {for (var t = new Date().getTime() - this._pausedTime, e = t - this._time, i = this._clips, n = i.length, r = [], a = [], o = 0; n > o; o++) {var s = i[o],l = s.step(t, e);l && (r.push(l), a.push(s));}for (var o = 0; n > o;) {i[o]._needsRemove ? (i[o] = i[n - 1], i.pop(), n--) : o++;}n = r.length;for (var o = 0; n > o; o++) {a[o].fire(r[o]);}this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update();}, _startLoop: function _startLoop() {function t() {e._running && (Dg(t), !e._paused && e._update());}var e = this;this._running = !0, Dg(t);}, start: function start() {this._time = new Date().getTime(), this._pausedTime = 0, this._startLoop();}, stop: function stop() {this._running = !1;}, pause: function pause() {this._paused || (this._pauseStart = new Date().getTime(), this._paused = !0);}, resume: function resume() {this._paused && (this._pausedTime += new Date().getTime() - this._pauseStart, this._paused = !1);}, clear: function clear() {this._clips = [];}, isFinished: function isFinished() {return !this._clips.length;}, animate: function animate(t, e) {e = e || {};var i = new ig(t, e.loop, e.getter, e.setter);return this.addAnimator(i), i;} }, c($g, wp);var Qg = 300,Jg = Jf.domSupported,tv = function () {var t = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],e = ["touchstart", "touchend", "touchmove"],i = { pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1 },n = p(t, function (t) {var e = t.replace("mouse", "pointer");return i.hasOwnProperty(e) ? e : t;});return { mouse: t, touch: e, pointer: n };}(),ev = { mouse: ["mousemove", "mouseup"], pointer: ["pointermove", "pointerup"] },iv = Hn.prototype;iv.stopPropagation = iv.stopImmediatePropagation = iv.preventDefault = V;var nv = { mousedown: function mousedown(t) {t = be(this.dom, t), this._mayPointerCapture = [t.zrX, t.zrY], this.trigger("mousedown", t);}, mousemove: function mousemove(t) {t = be(this.dom, t);var e = this._mayPointerCapture;!e || t.zrX === e[0] && t.zrY === e[1] || Un(this, !0), this.trigger("mousemove", t);}, mouseup: function mouseup(t) {t = be(this.dom, t), Un(this, !1), this.trigger("mouseup", t);}, mouseout: function mouseout(t) {t = be(this.dom, t), this._pointerCapturing && (t.zrEventControl = "no_globalout");var e = t.toElement || t.relatedTarget;t.zrIsToLocalDOM = Vn(this, e), this.trigger("mouseout", t);}, touchstart: function touchstart(t) {t = be(this.dom, t), Nn(t), this._lastTouchMoment = new Date(), this.handler.processGesture(t, "start"), nv.mousemove.call(this, t), nv.mousedown.call(this, t);}, touchmove: function touchmove(t) {t = be(this.dom, t), Nn(t), this.handler.processGesture(t, "change"), nv.mousemove.call(this, t);}, touchend: function touchend(t) {t = be(this.dom, t), Nn(t), this.handler.processGesture(t, "end"), nv.mouseup.call(this, t), +new Date() - this._lastTouchMoment < Qg && nv.click.call(this, t);}, pointerdown: function pointerdown(t) {nv.mousedown.call(this, t);}, pointermove: function pointermove(t) {Bn(t) || nv.mousemove.call(this, t);}, pointerup: function pointerup(t) {nv.mouseup.call(this, t);}, pointerout: function pointerout(t) {Bn(t) || nv.mouseout.call(this, t);} };f(["click", "mousewheel", "dblclick", "contextmenu"], function (t) {nv[t] = function (e) {e = be(this.dom, e), this.trigger(t, e);};});var rv = { pointermove: function pointermove(t) {Bn(t) || rv.mousemove.call(this, t);}, pointerup: function pointerup(t) {rv.mouseup.call(this, t);}, mousemove: function mousemove(t) {this.trigger("mousemove", t);}, mouseup: function mouseup(t) {var e = this._pointerCapturing;Un(this, !1), this.trigger("mouseup", t), e && (t.zrEventControl = "only_globalout", this.trigger("mouseout", t));} },av = jn.prototype;av.dispose = function () {Yn(this._localHandlerScope), Jg && Yn(this._globalHandlerScope);}, av.setCursor = function (t) {this.dom.style && (this.dom.style.cursor = t || "default");}, c(jn, wp);var ov = !Jf.canvasSupported,sv = { canvas: Kg },lv = {},uv = "4.3.1",hv = function hv(t, e, i) {i = i || {}, this.dom = e, this.id = t;var n = this,r = new vg(),a = i.renderer;if (ov) {if (!sv.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");a = "vml";} else a && sv[a] || (a = "canvas");var o = new sv[a](e, r, i, t);this.storage = r, this.painter = o;var s = Jf.node || Jf.worker ? null : new jn(o.getViewportRoot(), o.root);this.handler = new Op(r, o, s, o.root), this.animation = new $g({ stage: { update: y(this.flush, this) } }), this.animation.start(), this._needsRefresh;var l = r.delFromStorage,u = r.addToStorage;r.delFromStorage = function (t) {l.call(r, t), t && t.removeSelfFromZr(n);}, r.addToStorage = function (t) {u.call(r, t), t.addSelfToZr(n);};};hv.prototype = { constructor: hv, getId: function getId() {return this.id;}, add: function add(t) {this.storage.addRoot(t), this._needsRefresh = !0;}, remove: function remove(t) {this.storage.delRoot(t), this._needsRefresh = !0;}, configLayer: function configLayer(t, e) {this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0;}, setBackgroundColor: function setBackgroundColor(t) {this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0;}, refreshImmediately: function refreshImmediately() {this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh(), this._needsRefresh = this._needsRefreshHover = !1;}, refresh: function refresh() {this._needsRefresh = !0;}, flush: function flush() {var t;this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, this.refreshHoverImmediately()), t && this.trigger("rendered");}, addHover: function addHover(t, e) {if (this.painter.addHover) {var i = this.painter.addHover(t, e);return this.refreshHover(), i;}}, removeHover: function removeHover(t) {this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover());}, clearHover: function clearHover() {this.painter.clearHover && (this.painter.clearHover(), this.refreshHover());}, refreshHover: function refreshHover() {this._needsRefreshHover = !0;}, refreshHoverImmediately: function refreshHoverImmediately() {this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover();}, resize: function resize(t) {t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize();}, clearAnimation: function clearAnimation() {this.animation.clear();}, getWidth: function getWidth() {return this.painter.getWidth();}, getHeight: function getHeight() {return this.painter.getHeight();}, pathToImage: function pathToImage(t, e) {return this.painter.pathToImage(t, e);}, setCursorStyle: function setCursorStyle(t) {this.handler.setCursorStyle(t);}, findHover: function findHover(t, e) {return this.handler.findHover(t, e);}, on: function on(t, e, i) {this.handler.on(t, e, i);}, off: function off(t, e) {this.handler.off(t, e);}, trigger: function trigger(t, e) {this.handler.trigger(t, e);}, clear: function clear() {this.storage.delRoot(), this.painter.clear();}, dispose: function dispose() {this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, Jn(this.id);} };var cv = (Object.freeze || Object)({ version: uv, init: Zn, dispose: Kn, getInstance: $n, registerPainter: Qn }),dv = f,fv = M,pv = x,gv = "series\x00",vv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"],mv = 0,yv = ".",_v = "___EC__COMPONENT__CONTAINER___",xv = 0,wv = function wv(t) {for (var e = 0; e < t.length; e++) {t[e][1] || (t[e][1] = t[e][0]);}return function (e, i, n) {for (var r = {}, a = 0; a < t.length; a++) {var o = t[a][1];if (!(i && u(i, o) >= 0 || n && u(n, o) < 0)) {var s = e.getShallow(o);null != s && (r[t[a][0]] = s);}}return r;};},bv = wv([["lineWidth", "width"], ["stroke", "color"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]),Mv = { getLineStyle: function getLineStyle(t) {var e = bv(this, t);return e.lineDash = this.getLineDash(e.lineWidth), e;}, getLineDash: function getLineDash(t) {null == t && (t = 1);var e = this.get("type"),i = Math.max(t, 2),n = 4 * t;return "solid" === e || null == e ? !1 : "dashed" === e ? [n, n] : [i, i];} },Sv = wv([["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["opacity"], ["shadowColor"]]),Tv = { getAreaStyle: function getAreaStyle(t, e) {return Sv(this, t, e);} },Iv = Math.pow,Cv = Math.sqrt,Dv = 1e-8,kv = 1e-4,Av = Cv(3),Pv = 1 / 3,Lv = H(),Ov = H(),Rv = H(),zv = Math.min,Bv = Math.max,Ev = Math.sin,Nv = Math.cos,Fv = 2 * Math.PI,Vv = H(),Hv = H(),Wv = H(),Gv = [],Xv = [],Yv = { M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7 },Uv = [],qv = [],jv = [],Zv = [],Kv = Math.min,$v = Math.max,Qv = Math.cos,Jv = Math.sin,tm = Math.sqrt,em = Math.abs,im = "undefined" != typeof Float32Array,nm = function nm(t) {this._saveData = !t, this._saveData && (this.data = []), this._ctx = null;};nm.prototype = { constructor: nm, _xi: 0, _yi: 0, _x0: 0, _y0: 0, _ux: 0, _uy: 0, _len: 0, _lineDash: null, _dashOffset: 0, _dashIdx: 0, _dashSum: 0, setScale: function setScale(t, e, i) {i = i || 0, this._ux = em(i / ag / t) || 0, this._uy = em(i / ag / e) || 0;}, getContext: function getContext() {return this._ctx;}, beginPath: function beginPath(t) {return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this;}, moveTo: function moveTo(t, e) {return this.addData(Yv.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;}, lineTo: function lineTo(t, e) {var i = em(t - this._xi) > this._ux || em(e - this._yi) > this._uy || this._len < 5;return this.addData(Yv.L, t, e), this._ctx && i && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), i && (this._xi = t, this._yi = e), this;}, bezierCurveTo: function bezierCurveTo(t, e, i, n, r, a) {return this.addData(Yv.C, t, e, i, n, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, i, n, r, a) : this._ctx.bezierCurveTo(t, e, i, n, r, a)), this._xi = r, this._yi = a, this;}, quadraticCurveTo: function quadraticCurveTo(t, e, i, n) {return this.addData(Yv.Q, t, e, i, n), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, i, n) : this._ctx.quadraticCurveTo(t, e, i, n)), this._xi = i, this._yi = n, this;}, arc: function arc(t, e, i, n, r, a) {return this.addData(Yv.A, t, e, i, i, n, r - n, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, r, a), this._xi = Qv(r) * i + t, this._yi = Jv(r) * i + e, this;}, arcTo: function arcTo(t, e, i, n, r) {return this._ctx && this._ctx.arcTo(t, e, i, n, r), this;}, rect: function rect(t, e, i, n) {return this._ctx && this._ctx.rect(t, e, i, n), this.addData(Yv.R, t, e, i, n), this;}, closePath: function closePath() {this.addData(Yv.Z);var t = this._ctx,e = this._x0,i = this._y0;return t && (this._needsDash() && this._dashedLineTo(e, i), t.closePath()), this._xi = e, this._yi = i, this;}, fill: function fill(t) {t && t.fill(), this.toStatic();}, stroke: function stroke(t) {t && t.stroke(), this.toStatic();}, setLineDash: function setLineDash(t) {if (t instanceof Array) {this._lineDash = t, this._dashIdx = 0;for (var e = 0, i = 0; i < t.length; i++) {e += t[i];}this._dashSum = e;}return this;}, setLineDashOffset: function setLineDashOffset(t) {return this._dashOffset = t, this;}, len: function len() {return this._len;}, setData: function setData(t) {var e = t.length;this.data && this.data.length === e || !im || (this.data = new Float32Array(e));for (var i = 0; e > i; i++) {this.data[i] = t[i];}this._len = e;}, appendPath: function appendPath(t) {t instanceof Array || (t = [t]);for (var e = t.length, i = 0, n = this._len, r = 0; e > r; r++) {i += t[r].len();}im && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));for (var r = 0; e > r; r++) {for (var a = t[r].data, o = 0; o < a.length; o++) {this.data[n++] = a[o];}}this._len = n;}, addData: function addData(t) {if (this._saveData) {var e = this.data;this._len + arguments.length > e.length && (this._expandData(), e = this.data);for (var i = 0; i < arguments.length; i++) {e[this._len++] = arguments[i];}this._prevCmd = t;}}, _expandData: function _expandData() {if (!(this.data instanceof Array)) {for (var t = [], e = 0; e < this._len; e++) {t[e] = this.data[e];}this.data = t;}}, _needsDash: function _needsDash() {return this._lineDash;}, _dashedLineTo: function _dashedLineTo(t, e) {var i,n,r = this._dashSum,a = this._dashOffset,o = this._lineDash,s = this._ctx,l = this._xi,u = this._yi,h = t - l,c = e - u,d = tm(h * h + c * c),f = l,p = u,g = o.length;for (h /= d, c /= d, 0 > a && (a = r + a), a %= r, f -= a * h, p -= a * c; h > 0 && t >= f || 0 > h && f >= t || 0 === h && (c > 0 && e >= p || 0 > c && p >= e);) {n = this._dashIdx, i = o[n], f += h * i, p += c * i, this._dashIdx = (n + 1) % g, h > 0 && l > f || 0 > h && f > l || c > 0 && u > p || 0 > c && p > u || s[n % 2 ? "moveTo" : "lineTo"](h >= 0 ? Kv(f, t) : $v(f, t), c >= 0 ? Kv(p, e) : $v(p, e));}h = f - t, c = p - e, this._dashOffset = -tm(h * h + c * c);}, _dashedBezierTo: function _dashedBezierTo(t, e, i, n, r, a) {var o,s,l,u,h,c = this._dashSum,d = this._dashOffset,f = this._lineDash,p = this._ctx,g = this._xi,v = this._yi,m = Tr,y = 0,_ = this._dashIdx,x = f.length,w = 0;for (0 > d && (d = c + d), d %= c, o = 0; 1 > o; o += .1) {s = m(g, t, i, r, o + .1) - m(g, t, i, r, o), l = m(v, e, n, a, o + .1) - m(v, e, n, a, o), y += tm(s * s + l * l);}for (; x > _ && (w += f[_], !(w > d)); _++) {;}for (o = (w - d) / y; 1 >= o;) {u = m(g, t, i, r, o), h = m(v, e, n, a, o), _ % 2 ? p.moveTo(u, h) : p.lineTo(u, h), o += f[_] / y, _ = (_ + 1) % x;}_ % 2 !== 0 && p.lineTo(r, a), s = r - u, l = a - h, this._dashOffset = -tm(s * s + l * l);}, _dashedQuadraticTo: function _dashedQuadraticTo(t, e, i, n) {var r = i,a = n;i = (i + 2 * t) / 3, n = (n + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, i, n, r, a);}, toStatic: function toStatic() {var t = this.data;t instanceof Array && (t.length = this._len, im && (this.data = new Float32Array(t)));}, getBoundingRect: function getBoundingRect() {Uv[0] = Uv[1] = jv[0] = jv[1] = Number.MAX_VALUE, qv[0] = qv[1] = Zv[0] = Zv[1] = -Number.MAX_VALUE;for (var t = this.data, e = 0, i = 0, n = 0, r = 0, a = 0; a < t.length;) {var o = t[a++];switch (1 === a && (e = t[a], i = t[a + 1], n = e, r = i), o) {case Yv.M:n = t[a++], r = t[a++], e = n, i = r, jv[0] = n, jv[1] = r, Zv[0] = n, Zv[1] = r;break;case Yv.L:Nr(e, i, t[a], t[a + 1], jv, Zv), e = t[a++], i = t[a++];break;case Yv.C:Fr(e, i, t[a++], t[a++], t[a++], t[a++], t[a], t[a + 1], jv, Zv), e = t[a++], i = t[a++];break;case Yv.Q:Vr(e, i, t[a++], t[a++], t[a], t[a + 1], jv, Zv), e = t[a++], i = t[a++];break;case Yv.A:var s = t[a++],l = t[a++],u = t[a++],h = t[a++],c = t[a++],d = t[a++] + c;a += 1;var f = 1 - t[a++];1 === a && (n = Qv(c) * u + s, r = Jv(c) * h + l), Hr(s, l, u, h, c, d, f, jv, Zv), e = Qv(d) * u + s, i = Jv(d) * h + l;break;case Yv.R:n = e = t[a++], r = i = t[a++];var p = t[a++],g = t[a++];Nr(n, r, n + p, r + g, jv, Zv);break;case Yv.Z:e = n, i = r;}oe(Uv, Uv, jv), se(qv, qv, Zv);}return 0 === a && (Uv[0] = Uv[1] = qv[0] = qv[1] = 0), new Ii(Uv[0], Uv[1], qv[0] - Uv[0], qv[1] - Uv[1]);}, rebuildPath: function rebuildPath(t) {for (var e, i, n, r, a, o, s = this.data, l = this._ux, u = this._uy, h = this._len, c = 0; h > c;) {var d = s[c++];switch (1 === c && (n = s[c], r = s[c + 1], e = n, i = r), d) {case Yv.M:e = n = s[c++], i = r = s[c++], t.moveTo(n, r);break;case Yv.L:a = s[c++], o = s[c++], (em(a - n) > l || em(o - r) > u || c === h - 1) && (t.lineTo(a, o), n = a, r = o);break;case Yv.C:t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), n = s[c - 2], r = s[c - 1];break;case Yv.Q:t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), n = s[c - 2], r = s[c - 1];break;case Yv.A:var f = s[c++],p = s[c++],g = s[c++],v = s[c++],m = s[c++],y = s[c++],_ = s[c++],x = s[c++],w = g > v ? g : v,b = g > v ? 1 : g / v,M = g > v ? v / g : 1,S = Math.abs(g - v) > .001,T = m + y;S ? (t.translate(f, p), t.rotate(_), t.scale(b, M), t.arc(0, 0, w, m, T, 1 - x), t.scale(1 / b, 1 / M), t.rotate(-_), t.translate(-f, -p)) : t.arc(f, p, w, m, T, 1 - x), 1 === c && (e = Qv(m) * g + f, i = Jv(m) * v + p), n = Qv(T) * g + f, r = Jv(T) * v + p;break;case Yv.R:e = n = s[c], i = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);break;case Yv.Z:t.closePath(), n = e, r = i;}}} }, nm.CMD = Yv;var rm = 2 * Math.PI,am = 2 * Math.PI,om = nm.CMD,sm = 2 * Math.PI,lm = 1e-4,um = [-1, -1, -1],hm = [-1, -1],cm = Ig.prototype.getCanvasPattern,dm = Math.abs,fm = new nm(!0);ia.prototype = { constructor: ia, type: "path", __dirtyPath: !0, strokeContainThreshold: 5, segmentIgnoreThreshold: 0, subPixelOptimize: !1, brush: function brush(t, e) {var i = this.style,n = this.path || fm,r = i.hasStroke(),a = i.hasFill(),o = i.fill,s = i.stroke,l = a && !!o.colorStops,u = r && !!s.colorStops,h = a && !!o.image,c = r && !!s.image;if (i.bind(t, this, e), this.setTransform(t), this.__dirty) {var d;l && (d = d || this.getBoundingRect(), this._fillGradient = i.getGradient(t, o, d)), u && (d = d || this.getBoundingRect(), this._strokeGradient = i.getGradient(t, s, d));}l ? t.fillStyle = this._fillGradient : h && (t.fillStyle = cm.call(o, t)), u ? t.strokeStyle = this._strokeGradient : c && (t.strokeStyle = cm.call(s, t));var f = i.lineDash,p = i.lineDashOffset,g = !!t.setLineDash,v = this.getGlobalScale();if (n.setScale(v[0], v[1], this.segmentIgnoreThreshold), this.__dirtyPath || f && !g && r ? (n.beginPath(t), f && !g && (n.setLineDash(f), n.setLineDashOffset(p)), this.buildPath(n, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), a) if (null != i.fillOpacity) {var m = t.globalAlpha;t.globalAlpha = i.fillOpacity * i.opacity, n.fill(t), t.globalAlpha = m;} else n.fill(t);if (f && g && (t.setLineDash(f), t.lineDashOffset = p), r) if (null != i.strokeOpacity) {var m = t.globalAlpha;t.globalAlpha = i.strokeOpacity * i.opacity, n.stroke(t), t.globalAlpha = m;} else n.stroke(t);f && g && t.setLineDash([]), null != i.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));}, buildPath: function buildPath() {}, createPathProxy: function createPathProxy() {this.path = new nm();}, getBoundingRect: function getBoundingRect() {var t = this._rect,e = this.style,i = !t;if (i) {var n = this.path;n || (n = this.path = new nm()), this.__dirtyPath && (n.beginPath(), this.buildPath(n, this.shape, !1)), t = n.getBoundingRect();}if (this._rect = t, e.hasStroke()) {var r = this._rectWithStroke || (this._rectWithStroke = t.clone());if (this.__dirty || i) {r.copy(t);var a = e.lineWidth,o = e.strokeNoScale ? this.getLineScale() : 1;e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), o > 1e-10 && (r.width += a / o, r.height += a / o, r.x -= a / o / 2, r.y -= a / o / 2);}return r;}return t;}, contain: function contain(t, e) {var i = this.transformCoordToLocal(t, e),n = this.getBoundingRect(),r = this.style;if (t = i[0], e = i[1], n.contain(t, e)) {var a = this.path.data;if (r.hasStroke()) {var o = r.lineWidth,s = r.strokeNoScale ? this.getLineScale() : 1;if (s > 1e-10 && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), ea(a, o / s, t, e))) return !0;}if (r.hasFill()) return ta(a, t, e);}return !1;}, dirty: function dirty(t) {null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = this.__dirtyText = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty();}, animateShape: function animateShape(t) {return this.animate("shape", t);}, attrKV: function attrKV(t, e) {"shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : Cn.prototype.attrKV.call(this, t, e);}, setShape: function setShape(t, e) {var i = this.shape;if (i) {if (M(t)) for (var n in t) {t.hasOwnProperty(n) && (i[n] = t[n]);} else i[t] = e;this.dirty(!0);}return this;}, getLineScale: function getLineScale() {var t = this.transform;return t && dm(t[0] - 1) > 1e-10 && dm(t[3] - 1) > 1e-10 ? Math.sqrt(dm(t[0] * t[3] - t[2] * t[1])) : 1;} }, ia.extend = function (t) {var e = function e(_e2) {ia.call(this, _e2), t.style && this.style.extendFrom(t.style, !1);var i = t.shape;if (i) {this.shape = this.shape || {};var n = this.shape;for (var r in i) {!n.hasOwnProperty(r) && i.hasOwnProperty(r) && (n[r] = i[r]);}}t.init && t.init.call(this, _e2);};h(e, ia);for (var i in t) {"style" !== i && "shape" !== i && (e.prototype[i] = t[i]);}return e;}, h(ia, Cn);var pm = nm.CMD,gm = [[], [], []],vm = Math.sqrt,mm = Math.atan2,ym = function ym(t, e) {var i,n,r,a,o,s,l = t.data,u = pm.M,h = pm.C,c = pm.L,d = pm.R,f = pm.A,p = pm.Q;for (r = 0, a = 0; r < l.length;) {switch (i = l[r++], a = r, n = 0, i) {case u:n = 1;break;case c:n = 1;break;case h:n = 3;break;case p:n = 2;break;case f:var g = e[4],v = e[5],m = vm(e[0] * e[0] + e[1] * e[1]),y = vm(e[2] * e[2] + e[3] * e[3]),_ = mm(-e[1] / y, e[0] / m);l[r] *= m, l[r++] += g, l[r] *= y, l[r++] += v, l[r++] *= m, l[r++] *= y, l[r++] += _, l[r++] += _, r += 2, a = r;break;case d:s[0] = l[r++], s[1] = l[r++], ae(s, s, e), l[a++] = s[0], l[a++] = s[1], s[0] += l[r++], s[1] += l[r++], ae(s, s, e), l[a++] = s[0], l[a++] = s[1];}for (o = 0; n > o; o++) {var s = gm[o];s[0] = l[r++], s[1] = l[r++], ae(s, s, e), l[a++] = s[0], l[a++] = s[1];}}},_m = Math.sqrt,xm = Math.sin,wm = Math.cos,bm = Math.PI,Mm = function Mm(t) {return Math.sqrt(t[0] * t[0] + t[1] * t[1]);},Sm = function Sm(t, e) {return (t[0] * e[0] + t[1] * e[1]) / (Mm(t) * Mm(e));},Tm = function Tm(t, e) {return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(Sm(t, e));},Im = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,Cm = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g,Dm = function Dm(t) {Cn.call(this, t);};Dm.prototype = { constructor: Dm, type: "text", brush: function brush(t, e) {var i = this.style;this.__dirty && un(i, !0), i.fill = i.stroke = i.shadowBlur = i.shadowColor = i.shadowOffsetX = i.shadowOffsetY = null;var n = i.text;return null != n && (n += ""), In(n, i) ? (this.setTransform(t), cn(this, t, n, i, null, e), void this.restoreTransform(t)) : void (t.__attrCachedBy = _g.NONE);}, getBoundingRect: function getBoundingRect() {var t = this.style;if (this.__dirty && un(t, !0), !this._rect) {var e = t.text;null != e ? e += "" : e = "";var i = Yi(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich);if (i.x += t.x || 0, i.y += t.y || 0, bn(t.textStroke, t.textStrokeWidth)) {var n = t.textStrokeWidth;i.x -= n / 2, i.y -= n / 2, i.width += n, i.height += n;}this._rect = i;}return this._rect;} }, h(Dm, Cn);var km = ia.extend({ type: "circle", shape: { cx: 0, cy: 0, r: 0 }, buildPath: function buildPath(t, e, i) {i && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);} }),Am = [["shadowBlur", 0], ["shadowColor", "#000"], ["shadowOffsetX", 0], ["shadowOffsetY", 0]],Pm = function Pm(t) {return Jf.browser.ie && Jf.browser.version >= 11 ? function () {var e,i = this.__clipPaths,n = this.style;if (i) for (var r = 0; r < i.length; r++) {var a = i[r],o = a && a.shape,s = a && a.type;if (o && ("sector" === s && o.startAngle === o.endAngle || "rect" === s && (!o.width || !o.height))) {for (var l = 0; l < Am.length; l++) {Am[l][2] = n[Am[l][0]], n[Am[l][0]] = Am[l][1];}e = !0;break;}}if (t.apply(this, arguments), e) for (var l = 0; l < Am.length; l++) {n[Am[l][0]] = Am[l][2];}} : t;},Lm = ia.extend({ type: "sector", shape: { cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0 }, brush: Pm(ia.prototype.brush), buildPath: function buildPath(t, e) {var i = e.cx,n = e.cy,r = Math.max(e.r0 || 0, 0),a = Math.max(e.r, 0),o = e.startAngle,s = e.endAngle,l = e.clockwise,u = Math.cos(o),h = Math.sin(o);t.moveTo(u * r + i, h * r + n), t.lineTo(u * a + i, h * a + n), t.arc(i, n, a, o, s, !l), t.lineTo(Math.cos(s) * r + i, Math.sin(s) * r + n), 0 !== r && t.arc(i, n, r, s, o, l), t.closePath();} }),Om = ia.extend({ type: "ring", shape: { cx: 0, cy: 0, r: 0, r0: 0 }, buildPath: function buildPath(t, e) {var i = e.cx,n = e.cy,r = 2 * Math.PI;t.moveTo(i + e.r, n), t.arc(i, n, e.r, 0, r, !1), t.moveTo(i + e.r0, n), t.arc(i, n, e.r0, 0, r, !0);} }),Rm = function Rm(t, e) {for (var i = t.length, n = [], r = 0, a = 1; i > a; a++) {r += ee(t[a - 1], t[a]);}var o = r / 2;o = i > o ? i : o;for (var a = 0; o > a; a++) {var s,l,u,h = a / (o - 1) * (e ? i : i - 1),c = Math.floor(h),d = h - c,f = t[c % i];e ? (s = t[(c - 1 + i) % i], l = t[(c + 1) % i], u = t[(c + 2) % i]) : (s = t[0 === c ? c : c - 1], l = t[c > i - 2 ? i - 1 : c + 1], u = t[c > i - 3 ? i - 1 : c + 2]);var p = d * d,g = d * p;n.push([ua(s[0], f[0], l[0], u[0], d, p, g), ua(s[1], f[1], l[1], u[1], d, p, g)]);}return n;},zm = function zm(t, e, i, n) {var r,a,o,s,l = [],u = [],h = [],c = [];if (n) {o = [1 / 0, 1 / 0], s = [-1 / 0, -1 / 0];for (var d = 0, f = t.length; f > d; d++) {oe(o, o, t[d]), se(s, s, t[d]);}oe(o, o, n[0]), se(s, s, n[1]);}for (var d = 0, f = t.length; f > d; d++) {var p = t[d];if (i) r = t[d ? d - 1 : f - 1], a = t[(d + 1) % f];else {if (0 === d || d === f - 1) {l.push(G(t[d]));continue;}r = t[d - 1], a = t[d + 1];}q(u, a, r), J(u, u, e);var g = ee(p, r),v = ee(p, a),m = g + v;0 !== m && (g /= m, v /= m), J(h, u, -g), J(c, u, v);var y = Y([], p, h),_ = Y([], p, c);n && (se(y, y, o), oe(y, y, s), se(_, _, o), oe(_, _, s)), l.push(y), l.push(_);}return i && l.push(l.shift()), l;},Bm = ia.extend({ type: "polygon", shape: { points: null, smooth: !1, smoothConstraint: null }, buildPath: function buildPath(t, e) {ha(t, e, !0);} }),Em = ia.extend({ type: "polyline", shape: { points: null, smooth: !1, smoothConstraint: null }, style: { stroke: "#000", fill: null }, buildPath: function buildPath(t, e) {ha(t, e, !1);} }),Nm = Math.round,Fm = {},Vm = ia.extend({ type: "rect", shape: { r: 0, x: 0, y: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var i, n, r, a;this.subPixelOptimize ? (da(Fm, e, this.style), i = Fm.x, n = Fm.y, r = Fm.width, a = Fm.height, Fm.r = e.r, e = Fm) : (i = e.x, n = e.y, r = e.width, a = e.height), e.r ? ln(t, e) : t.rect(i, n, r, a), t.closePath();} }),Hm = {},Wm = ia.extend({ type: "line", shape: { x1: 0, y1: 0, x2: 0, y2: 0, percent: 1 }, style: { stroke: "#000", fill: null }, buildPath: function buildPath(t, e) {var i, n, r, a;this.subPixelOptimize ? (ca(Hm, e, this.style), i = Hm.x1, n = Hm.y1, r = Hm.x2, a = Hm.y2) : (i = e.x1, n = e.y1, r = e.x2, a = e.y2);var o = e.percent;0 !== o && (t.moveTo(i, n), 1 > o && (r = i * (1 - o) + r * o, a = n * (1 - o) + a * o), t.lineTo(r, a));}, pointAt: function pointAt(t) {var e = this.shape;return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t];} }),Gm = [],Xm = ia.extend({ type: "bezier-curve", shape: { x1: 0, y1: 0, x2: 0, y2: 0, cpx1: 0, cpy1: 0, percent: 1 }, style: { stroke: "#000", fill: null }, buildPath: function buildPath(t, e) {var i = e.x1,n = e.y1,r = e.x2,a = e.y2,o = e.cpx1,s = e.cpy1,l = e.cpx2,u = e.cpy2,h = e.percent;0 !== h && (t.moveTo(i, n), null == l || null == u ? (1 > h && (zr(i, o, r, h, Gm), o = Gm[1], r = Gm[2], zr(n, s, a, h, Gm), s = Gm[1], a = Gm[2]), t.quadraticCurveTo(o, s, r, a)) : (1 > h && (kr(i, o, l, r, h, Gm), o = Gm[1], l = Gm[2], r = Gm[3], kr(n, s, u, a, h, Gm), s = Gm[1], u = Gm[2], a = Gm[3]), t.bezierCurveTo(o, s, l, u, r, a)));}, pointAt: function pointAt(t) {return pa(this.shape, t, !1);}, tangentAt: function tangentAt(t) {var e = pa(this.shape, t, !0);return te(e, e);} }),Ym = ia.extend({ type: "arc", shape: { cx: 0, cy: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0 }, style: { stroke: "#000", fill: null }, buildPath: function buildPath(t, e) {var i = e.cx,n = e.cy,r = Math.max(e.r, 0),a = e.startAngle,o = e.endAngle,s = e.clockwise,l = Math.cos(a),u = Math.sin(a);t.moveTo(l * r + i, u * r + n), t.arc(i, n, r, a, o, !s);} }),Um = ia.extend({ type: "compound", shape: { paths: null }, _updatePathDirty: function _updatePathDirty() {for (var t = this.__dirtyPath, e = this.shape.paths, i = 0; i < e.length; i++) {t = t || e[i].__dirtyPath;}this.__dirtyPath = t, this.__dirty = this.__dirty || t;}, beforeBrush: function beforeBrush() {this._updatePathDirty();for (var t = this.shape.paths || [], e = this.getGlobalScale(), i = 0; i < t.length; i++) {t[i].path || t[i].createPathProxy(), t[i].path.setScale(e[0], e[1], t[i].segmentIgnoreThreshold);}}, buildPath: function buildPath(t, e) {for (var i = e.paths || [], n = 0; n < i.length; n++) {i[n].buildPath(t, i[n].shape, !0);}}, afterBrush: function afterBrush() {for (var t = this.shape.paths || [], e = 0; e < t.length; e++) {t[e].__dirtyPath = !1;}}, getBoundingRect: function getBoundingRect() {return this._updatePathDirty(), ia.prototype.getBoundingRect.call(this);} }),qm = function qm(t) {this.colorStops = t || [];};qm.prototype = { constructor: qm, addColorStop: function addColorStop(t, e) {this.colorStops.push({ offset: t, color: e });} };var jm = function jm(t, e, i, n, r, a) {this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == i ? 1 : i, this.y2 = null == n ? 0 : n, this.type = "linear", this.global = a || !1, qm.call(this, r);};jm.prototype = { constructor: jm }, h(jm, qm);var Zm = function Zm(t, e, i, n, r) {this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == i ? .5 : i, this.type = "radial", this.global = r || !1, qm.call(this, n);};Zm.prototype = { constructor: Zm }, h(Zm, qm), ga.prototype.incremental = !0, ga.prototype.clearDisplaybles = function () {this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), this.notClear = !1;}, ga.prototype.addDisplayable = function (t, e) {e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty();}, ga.prototype.addDisplayables = function (t, e) {e = e || !1;for (var i = 0; i < t.length; i++) {this.addDisplayable(t[i], e);}}, ga.prototype.eachPendingDisplayable = function (t) {for (var e = this._cursor; e < this._displayables.length; e++) {t && t(this._displayables[e]);}for (var e = 0; e < this._temporaryDisplayables.length; e++) {t && t(this._temporaryDisplayables[e]);}}, ga.prototype.update = function () {this.updateTransform();for (var t = this._cursor; t < this._displayables.length; t++) {var e = this._displayables[t];e.parent = this, e.update(), e.parent = null;}for (var t = 0; t < this._temporaryDisplayables.length; t++) {var e = this._temporaryDisplayables[t];e.parent = this, e.update(), e.parent = null;}}, ga.prototype.brush = function (t) {for (var e = this._cursor; e < this._displayables.length; e++) {var i = this._displayables[e];i.beforeBrush && i.beforeBrush(t), i.brush(t, e === this._cursor ? null : this._displayables[e - 1]), i.afterBrush && i.afterBrush(t);}this._cursor = e;for (var e = 0; e < this._temporaryDisplayables.length; e++) {var i = this._temporaryDisplayables[e];i.beforeBrush && i.beforeBrush(t), i.brush(t, 0 === e ? null : this._temporaryDisplayables[e - 1]), i.afterBrush && i.afterBrush(t);}this._temporaryDisplayables = [], this.notClear = !0;};var Km = [];ga.prototype.getBoundingRect = function () {if (!this._rect) {for (var t = new Ii(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {var i = this._displayables[e],n = i.getBoundingRect().clone();i.needLocalTransform() && n.applyTransform(i.getLocalTransform(Km)), t.union(n);}this._rect = t;}return this._rect;}, ga.prototype.contain = function (t, e) {var i = this.transformCoordToLocal(t, e),n = this.getBoundingRect();if (n.contain(i[0], i[1])) for (var r = 0; r < this._displayables.length; r++) {var a = this._displayables[r];if (a.contain(t, e)) return !0;}return !1;}, h(ga, Cn);var $m = Math.max,Qm = Math.min,Jm = {},ty = 1,ey = { color: "textFill", textBorderColor: "textStroke", textBorderWidth: "textStrokeWidth" },iy = "emphasis",ny = "normal",ry = 1,ay = {},oy = {},sy = la,ly = fa,uy = N(),hy = 0;ya("circle", km), ya("sector", Lm), ya("ring", Om), ya("polygon", Bm), ya("polyline", Em), ya("rect", Vm), ya("line", Wm), ya("bezierCurve", Xm), ya("arc", Ym);var cy = (Object.freeze || Object)({ Z2_EMPHASIS_LIFT: ty, CACHED_LABEL_STYLE_PROPERTIES: ey, extendShape: va, extendPath: ma, registerShape: ya, getShapeClass: _a, makePath: xa, makeImage: wa, mergePath: sy, resizePath: Ma, subPixelOptimizeLine: Sa, subPixelOptimizeRect: Ta, subPixelOptimize: ly, setElementHoverStyle: Oa, setHoverStyle: Fa, setAsHighDownDispatcher: Va, isHighDownDispatcher: Ha, getHighlightDigit: Wa, setLabelStyle: Ga, modifyLabelStyle: Xa, setTextStyle: Ya, setText: Ua, getFont: Ja, updateProps: eo, initProps: io, getTransform: no, applyTransform: ro, transformDirection: ao, groupTransition: oo, clipPointsByRect: so, clipRectByRect: lo, createIcon: uo, linePolygonIntersect: ho, lineLineIntersect: co, Group: fg, Image: Dn, Text: Dm, Circle: km, Sector: Lm, Ring: Om, Polygon: Bm, Polyline: Em, Rect: Vm, Line: Wm, BezierCurve: Xm, Arc: Ym, IncrementalDisplayable: ga, CompoundPath: Um, LinearGradient: jm, RadialGradient: Zm, BoundingRect: Ii }),dy = ["textStyle", "color"],fy = { getTextColor: function getTextColor(t) {var e = this.ecModel;return this.getShallow("color") || (!t && e ? e.get(dy) : null);}, getFont: function getFont() {return Ja({ fontStyle: this.getShallow("fontStyle"), fontWeight: this.getShallow("fontWeight"), fontSize: this.getShallow("fontSize"), fontFamily: this.getShallow("fontFamily") }, this.ecModel);}, getTextRect: function getTextRect(t) {return Yi(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow("truncateText"));} },py = wv([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["textPosition"], ["textAlign"]]),gy = { getItemStyle: function getItemStyle(t, e) {var i = py(this, t, e),n = this.getBorderLineDash();return n && (i.lineDash = n), i;}, getBorderLineDash: function getBorderLineDash() {var t = this.get("borderType");return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1];} },vy = c,my = hr();go.prototype = { constructor: go, init: null, mergeOption: function mergeOption(t) {r(this.option, t, !0);}, get: function get(t, e) {return null == t ? this.option : vo(this.option, this.parsePath(t), !e && mo(this, t));}, getShallow: function getShallow(t, e) {var i = this.option,n = null == i ? i : i[t],r = !e && mo(this, t);return null == n && r && (n = r.getShallow(t)), n;}, getModel: function getModel(t, e) {var i,n = null == t ? this.option : vo(this.option, t = this.parsePath(t));return e = e || (i = mo(this, t)) && i.getModel(t), new go(n, e, this.ecModel);}, isEmpty: function isEmpty() {return null == this.option;}, restoreData: function restoreData() {}, clone: function clone() {var t = this.constructor;return new t(n(this.option));}, setReadOnly: function setReadOnly() {}, parsePath: function parsePath(t) {return "string" == typeof t && (t = t.split(".")), t;}, customizeGetParent: function customizeGetParent(t) {my(this).getParent = t;}, isAnimationEnabled: function isAnimationEnabled() {if (!Jf.node) {if (null != this.option.animation) return !!this.option.animation;if (this.parentModel) return this.parentModel.isAnimationEnabled();}} }, yr(go), _r(go), vy(go, Mv), vy(go, Tv), vy(go, fy), vy(go, gy);var yy = 0,_y = 1e-4,xy = 9007199254740991,wy = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,by = (Object.freeze || Object)({ linearMap: bo, parsePercent: Mo, round: So, asc: To, getPrecision: Io, getPrecisionSafe: Co, getPixelPrecision: Do, getPercentWithPrecision: ko, MAX_SAFE_INTEGER: xy, remRadian: Ao, isRadianAroundZero: Po, parseDate: Lo, quantity: Oo, quantityExponent: Ro, nice: zo, quantile: Bo, reformIntervals: Eo, isNumeric: No }),My = L,Sy = /([&<>"'])/g,Ty = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },Iy = ["a", "b", "c", "d", "e", "f", "g"],Cy = function Cy(t, e) {return "{" + t + (null == e ? "" : e) + "}";},Dy = $i,ky = (Object.freeze || Object)({ addCommas: Fo, toCamelCase: Vo, normalizeCssArray: My, encodeHTML: Ho, formatTpl: Wo, formatTplSimple: Go, getTooltipMarker: Xo, formatTime: Uo, capitalFirst: qo, truncateText: Dy, getTextBoundingRect: jo, getTextRect: Zo, windowOpen: Ko }),Ay = f,Py = ["left", "right", "top", "bottom", "width", "height"],Ly = [["width", "left", "right"], ["height", "top", "bottom"]],Oy = $o,Ry = (_($o, "vertical"), _($o, "horizontal"), { getBoxLayoutParams: function getBoxLayoutParams() {return { left: this.get("left"), top: this.get("top"), right: this.get("right"), bottom: this.get("bottom"), width: this.get("width"), height: this.get("height") };} }),zy = hr(),By = go.extend({ type: "component", id: "", name: "", mainType: "", subType: "", componentIndex: 0, defaultOption: null, ecModel: null, dependentModels: [], uid: null, layoutMode: null, $constructor: function $constructor(t, e, i, n) {go.call(this, t, e, i, n), this.uid = yo("ec_cpt_model");
    }, init: function init(t, e, i) {this.mergeDefaultAndTheme(t, i);}, mergeDefaultAndTheme: function mergeDefaultAndTheme(t, e) {var i = this.layoutMode,n = i ? es(t) : {},a = e.getTheme();r(t, a.get(this.mainType)), r(t, this.getDefaultOption()), i && ts(t, n, i);}, mergeOption: function mergeOption(t) {r(this.option, t, !0);var e = this.layoutMode;e && ts(this.option, t, e);}, optionUpdated: function optionUpdated() {}, getDefaultOption: function getDefaultOption() {var t = zy(this);if (!t.defaultOption) {for (var e = [], i = this.constructor; i;) {var n = i.prototype.defaultOption;n && e.push(n), i = i.superClass;}for (var a = {}, o = e.length - 1; o >= 0; o--) {a = r(a, e[o], !0);}t.defaultOption = a;}return t.defaultOption;}, getReferringComponents: function getReferringComponents(t) {return this.ecModel.queryComponents({ mainType: t, index: this.get(t + "Index", !0), id: this.get(t + "Id", !0) });} });br(By, { registerWhenExtend: !0 }), _o(By), xo(By, ns), c(By, Ry);var Ey = "";"undefined" != typeof navigator && (Ey = navigator.platform || "");var Ny = { color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"], gradientColor: ["#f6efa6", "#d88273", "#bf444c"], textStyle: { fontFamily: Ey.match(/^Win/) ? "Microsoft YaHei" : "sans-serif", fontSize: 12, fontStyle: "normal", fontWeight: "normal" }, blendMode: null, animation: "auto", animationDuration: 1e3, animationDurationUpdate: 300, animationEasing: "exponentialOut", animationEasingUpdate: "cubicOut", animationThreshold: 2e3, progressiveThreshold: 3e3, progressive: 400, hoverLayerThreshold: 3e3, useUTC: !1 },Fy = hr(),Vy = { clearColorPalette: function clearColorPalette() {Fy(this).colorIdx = 0, Fy(this).colorNameMap = {};}, getColorFromPalette: function getColorFromPalette(t, e, i) {e = e || this;var n = Fy(e),r = n.colorIdx || 0,a = n.colorNameMap = n.colorNameMap || {};if (a.hasOwnProperty(t)) return a[t];var o = tr(this.get("color", !0)),s = this.get("colorLayer", !0),l = null != i && s ? rs(s, i) : o;if (l = l || o, l && l.length) {var u = l[r];return t && (a[t] = u), n.colorIdx = (r + 1) % l.length, u;}} },Hy = "original",Wy = "arrayRows",Gy = "objectRows",Xy = "keyedColumns",Yy = "unknown",Uy = "typedArray",qy = "column",jy = "row";as.seriesDataToSource = function (t) {return new as({ data: t, sourceFormat: T(t) ? Uy : Hy, fromDataset: !1 });}, _r(as);var Zy = { Must: 1, Might: 2, Not: 3 },Ky = hr(),$y = "\x00_ec_inner",Qy = go.extend({ init: function init(t, e, i, n) {i = i || {}, this.option = null, this._theme = new go(i), this._optionManager = n;}, setOption: function setOption(t, e) {O(!($y in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption(null);}, resetOption: function resetOption(t) {var e = !1,i = this._optionManager;if (!t || "recreate" === t) {var n = i.mountOption("recreate" === t);this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(n)) : ws.call(this, n), e = !0;}if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {var r = i.getTimelineOption(this);r && (this.mergeOption(r), e = !0);}if (!t || "recreate" === t || "media" === t) {var a = i.getMediaOption(this, this._api);a.length && f(a, function (t) {this.mergeOption(t, e = !0);}, this);}return e;}, mergeOption: function mergeOption(t) {function e(e, n) {var r = tr(t[e]),s = rr(a.get(e), r);ar(s), f(s, function (t) {var i = t.option;M(i) && (t.keyInfo.mainType = e, t.keyInfo.subType = Ms(e, i, t.exist));});var l = bs(a, n);i[e] = [], a.set(e, []), f(s, function (t, n) {var r = t.exist,s = t.option;if (O(M(s) || r, "Empty component definition"), s) {var u = By.getClass(e, t.keyInfo.subType, !0);if (r && r.constructor === u) r.name = t.keyInfo.name, r.mergeOption(s, this), r.optionUpdated(s, !1);else {var h = o({ dependentModels: l, componentIndex: n }, t.keyInfo);r = new u(s, this, this, h), o(r, h), r.init(s, this, this, h), r.optionUpdated(null, !0);}} else r.mergeOption({}, this), r.optionUpdated({}, !1);a.get(e)[n] = r, i[e][n] = r.option;}, this), "series" === e && Ss(this, a.get("series"));}var i = this.option,a = this._componentsMap,s = [];ls(this), f(t, function (t, e) {null != t && (By.hasClass(e) ? e && s.push(e) : i[e] = null == i[e] ? n(t) : r(i[e], t, !0));}), By.topologicalTravel(s, By.getAllClassMainTypes(), e, this), this._seriesIndicesMap = N(this._seriesIndices = this._seriesIndices || []);}, getOption: function getOption() {var t = n(this.option);return f(t, function (e, i) {if (By.hasClass(i)) {for (var e = tr(e), n = e.length - 1; n >= 0; n--) {sr(e[n]) && e.splice(n, 1);}t[i] = e;}}), delete t[$y], t;}, getTheme: function getTheme() {return this._theme;}, getComponent: function getComponent(t, e) {var i = this._componentsMap.get(t);return i ? i[e || 0] : void 0;}, queryComponents: function queryComponents(t) {var e = t.mainType;if (!e) return [];var i = t.index,n = t.id,r = t.name,a = this._componentsMap.get(e);if (!a || !a.length) return [];var o;if (null != i) x(i) || (i = [i]), o = v(p(i, function (t) {return a[t];}), function (t) {return !!t;});else if (null != n) {var s = x(n);o = v(a, function (t) {return s && u(n, t.id) >= 0 || !s && t.id === n;});} else if (null != r) {var l = x(r);o = v(a, function (t) {return l && u(r, t.name) >= 0 || !l && t.name === r;});} else o = a.slice();return Ts(o, t);}, findComponents: function findComponents(t) {function e(t) {var e = r + "Index",i = r + "Id",n = r + "Name";return !t || null == t[e] && null == t[i] && null == t[n] ? null : { mainType: r, index: t[e], id: t[i], name: t[n] };}function i(e) {return t.filter ? v(e, t.filter) : e;}var n = t.query,r = t.mainType,a = e(n),o = a ? this.queryComponents(a) : this._componentsMap.get(r);return i(Ts(o, t));}, eachComponent: function eachComponent(t, e, i) {var n = this._componentsMap;if ("function" == typeof t) i = e, e = t, n.each(function (t, n) {f(t, function (t, r) {e.call(i, n, t, r);});});else if (b(t)) f(n.get(t), e, i);else if (M(t)) {var r = this.findComponents(t);f(r, e, i);}}, getSeriesByName: function getSeriesByName(t) {var e = this._componentsMap.get("series");return v(e, function (e) {return e.name === t;});}, getSeriesByIndex: function getSeriesByIndex(t) {return this._componentsMap.get("series")[t];}, getSeriesByType: function getSeriesByType(t) {var e = this._componentsMap.get("series");return v(e, function (e) {return e.subType === t;});}, getSeries: function getSeries() {return this._componentsMap.get("series").slice();}, getSeriesCount: function getSeriesCount() {return this._componentsMap.get("series").length;}, eachSeries: function eachSeries(t, e) {f(this._seriesIndices, function (i) {var n = this._componentsMap.get("series")[i];t.call(e, n, i);}, this);}, eachRawSeries: function eachRawSeries(t, e) {f(this._componentsMap.get("series"), t, e);}, eachSeriesByType: function eachSeriesByType(t, e, i) {f(this._seriesIndices, function (n) {var r = this._componentsMap.get("series")[n];r.subType === t && e.call(i, r, n);}, this);}, eachRawSeriesByType: function eachRawSeriesByType(t, e, i) {return f(this.getSeriesByType(t), e, i);}, isSeriesFiltered: function isSeriesFiltered(t) {return null == this._seriesIndicesMap.get(t.componentIndex);}, getCurrentSeriesIndices: function getCurrentSeriesIndices() {return (this._seriesIndices || []).slice();}, filterSeries: function filterSeries(t, e) {var i = v(this._componentsMap.get("series"), t, e);Ss(this, i);}, restoreData: function restoreData(t) {var e = this._componentsMap;Ss(this, e.get("series"));var i = [];e.each(function (t, e) {i.push(e);}), By.topologicalTravel(i, By.getAllClassMainTypes(), function (i) {f(e.get(i), function (e) {("series" !== i || !_s(e, t)) && e.restoreData();});});} });c(Qy, Vy);var Jy = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"],t_ = {};Cs.prototype = { constructor: Cs, create: function create(t, e) {var i = [];f(t_, function (n) {var r = n.create(t, e);i = i.concat(r || []);}), this._coordinateSystems = i;}, update: function update(t, e) {f(this._coordinateSystems, function (i) {i.update && i.update(t, e);});}, getCoordinateSystems: function getCoordinateSystems() {return this._coordinateSystems.slice();} }, Cs.register = function (t, e) {t_[t] = e;}, Cs.get = function (t) {return t_[t];};var e_ = f,i_ = n,n_ = p,r_ = r,a_ = /^(min|max)?(.+)$/;Ds.prototype = { constructor: Ds, setOption: function setOption(t, e) {t && f(tr(t.series), function (t) {t && t.data && T(t.data) && z(t.data);}), t = i_(t);var i = this._optionBackup,n = ks.call(this, t, e, !i);this._newBaseOption = n.baseOption, i ? (Os(i.baseOption, n.baseOption), n.timelineOptions.length && (i.timelineOptions = n.timelineOptions), n.mediaList.length && (i.mediaList = n.mediaList), n.mediaDefault && (i.mediaDefault = n.mediaDefault)) : this._optionBackup = n;}, mountOption: function mountOption(t) {var e = this._optionBackup;return this._timelineOptions = n_(e.timelineOptions, i_), this._mediaList = n_(e.mediaList, i_), this._mediaDefault = i_(e.mediaDefault), this._currentMediaIndices = [], i_(t ? e.baseOption : this._newBaseOption);}, getTimelineOption: function getTimelineOption(t) {var e,i = this._timelineOptions;if (i.length) {var n = t.getComponent("timeline");n && (e = i_(i[n.getCurrentIndex()], !0));}return e;}, getMediaOption: function getMediaOption() {var t = this._api.getWidth(),e = this._api.getHeight(),i = this._mediaList,n = this._mediaDefault,r = [],a = [];if (!i.length && !n) return a;for (var o = 0, s = i.length; s > o; o++) {As(i[o].query, t, e) && r.push(o);}return !r.length && n && (r = [-1]), r.length && !Ls(r, this._currentMediaIndices) && (a = n_(r, function (t) {return i_(-1 === t ? n.option : i[t].option);})), this._currentMediaIndices = r, a;} };var o_ = f,s_ = M,l_ = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"],u_ = function u_(t, e) {o_(Vs(t.series), function (t) {s_(t) && Fs(t);});var i = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];e && i.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), o_(i, function (e) {o_(Vs(t[e]), function (t) {t && (Es(t, "axisLabel"), Es(t.axisPointer, "label"));});}), o_(Vs(t.parallel), function (t) {var e = t && t.parallelAxisDefault;Es(e, "axisLabel"), Es(e && e.axisPointer, "label");}), o_(Vs(t.calendar), function (t) {zs(t, "itemStyle"), Es(t, "dayLabel"), Es(t, "monthLabel"), Es(t, "yearLabel");}), o_(Vs(t.radar), function (t) {Es(t, "name");}), o_(Vs(t.geo), function (t) {s_(t) && (Ns(t), o_(Vs(t.regions), function (t) {Ns(t);}));}), o_(Vs(t.timeline), function (t) {Ns(t), zs(t, "label"), zs(t, "itemStyle"), zs(t, "controlStyle", !0);var e = t.data;x(e) && f(e, function (t) {M(t) && (zs(t, "label"), zs(t, "itemStyle"));});}), o_(Vs(t.toolbox), function (t) {zs(t, "iconStyle"), o_(t.feature, function (t) {zs(t, "iconStyle");});}), Es(Hs(t.axisPointer), "label"), Es(Hs(t.tooltip).axisPointer, "label");},h_ = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]],c_ = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],d_ = function d_(t, e) {u_(t, e), t.series = tr(t.series), f(t.series, function (t) {if (M(t)) {var e = t.type;if ("line" === e) null != t.clipOverflow && (t.clip = t.clipOverflow);else if ("pie" === e || "gauge" === e) null != t.clockWise && (t.clockwise = t.clockWise);else if ("gauge" === e) {var i = Ws(t, "pointer.color");null != i && Gs(t, "itemStyle.color", i);}Xs(t);}}), t.dataRange && (t.visualMap = t.dataRange), f(c_, function (e) {var i = t[e];i && (x(i) || (i = [i]), f(i, function (t) {Xs(t);}));});},f_ = function f_(t) {var e = N();t.eachSeries(function (t) {var i = t.get("stack");if (i) {var n = e.get(i) || e.set(i, []),r = t.getData(),a = { stackResultDimension: r.getCalculationInfo("stackResultDimension"), stackedOverDimension: r.getCalculationInfo("stackedOverDimension"), stackedDimension: r.getCalculationInfo("stackedDimension"), stackedByDimension: r.getCalculationInfo("stackedByDimension"), isStackedByIndex: r.getCalculationInfo("isStackedByIndex"), data: r, seriesModel: t };if (!a.stackedDimension || !a.isStackedByIndex && !a.stackedByDimension) return;n.length && r.setCalculationInfo("stackedOnSeries", n[n.length - 1].seriesModel), n.push(a);}}), e.each(Ys);},p_ = Us.prototype;p_.pure = !1, p_.persistent = !0, p_.getSource = function () {return this._source;};var g_ = { arrayRows_column: { pure: !0, count: function count() {return Math.max(0, this._data.length - this._source.startIndex);}, getItem: function getItem(t) {return this._data[t + this._source.startIndex];}, appendData: Zs }, arrayRows_row: { pure: !0, count: function count() {var t = this._data[0];return t ? Math.max(0, t.length - this._source.startIndex) : 0;}, getItem: function getItem(t) {t += this._source.startIndex;for (var e = [], i = this._data, n = 0; n < i.length; n++) {var r = i[n];e.push(r ? r[t] : null);}return e;}, appendData: function appendData() {throw new Error('Do not support appendData when set seriesLayoutBy: "row".');} }, objectRows: { pure: !0, count: qs, getItem: js, appendData: Zs }, keyedColumns: { pure: !0, count: function count() {var t = this._source.dimensionsDefine[0].name,e = this._data[t];return e ? e.length : 0;}, getItem: function getItem(t) {for (var e = [], i = this._source.dimensionsDefine, n = 0; n < i.length; n++) {var r = this._data[i[n].name];e.push(r ? r[t] : null);}return e;}, appendData: function appendData(t) {var e = this._data;f(t, function (t, i) {for (var n = e[i] || (e[i] = []), r = 0; r < (t || []).length; r++) {n.push(t[r]);}});} }, original: { count: qs, getItem: js, appendData: Zs }, typedArray: { persistent: !1, pure: !0, count: function count() {return this._data ? this._data.length / this._dimSize : 0;}, getItem: function getItem(t, e) {t -= this._offset, e = e || [];for (var i = this._dimSize * t, n = 0; n < this._dimSize; n++) {e[n] = this._data[i + n];}return e;}, appendData: function appendData(t) {this._data = t;}, clean: function clean() {this._offset += this.count(), this._data = null;} } },v_ = { arrayRows: Ks, objectRows: function objectRows(t, e, i, n) {return null != i ? t[n] : t;}, keyedColumns: Ks, original: function original(t, e, i) {var n = ir(t);return null != i && n instanceof Array ? n[i] : n;}, typedArray: Ks },m_ = { arrayRows: $s, objectRows: function objectRows(t, e) {return Qs(t[e], this._dimensionInfos[e]);}, keyedColumns: $s, original: function original(t, e, i, n) {var r = t && (null == t.value ? t : t.value);return !this._rawData.pure && nr(t) && (this.hasItemOption = !0), Qs(r instanceof Array ? r[n] : r, this._dimensionInfos[e]);}, typedArray: function typedArray(t, e, i, n) {return t[n];} },y_ = /\{@(.+?)\}/g,__ = { getDataParams: function getDataParams(t, e) {var i = this.getData(e),n = this.getRawValue(t, e),r = i.getRawIndex(t),a = i.getName(t),o = i.getRawDataItem(t),s = i.getItemVisual(t, "color"),l = i.getItemVisual(t, "borderColor"),u = this.ecModel.getComponent("tooltip"),h = u && u.get("renderMode"),c = gr(h),d = this.mainType,f = "series" === d,p = i.userOutput;return { componentType: d, componentSubType: this.subType, componentIndex: this.componentIndex, seriesType: f ? this.subType : null, seriesIndex: this.seriesIndex, seriesId: f ? this.id : null, seriesName: f ? this.name : null, name: a, dataIndex: r, data: o, dataType: e, value: n, color: s, borderColor: l, dimensionNames: p ? p.dimensionNames : null, encode: p ? p.encode : null, marker: Xo({ color: s, renderMode: c }), $vars: ["seriesName", "name", "value"] };}, getFormattedLabel: function getFormattedLabel(t, e, i, n, r) {e = e || "normal";var a = this.getData(i),o = a.getItemModel(t),s = this.getDataParams(t, i);null != n && s.value instanceof Array && (s.value = s.value[n]);var l = o.get("normal" === e ? [r || "label", "formatter"] : [e, r || "label", "formatter"]);if ("function" == typeof l) return s.status = e, s.dimensionIndex = n, l(s);if ("string" == typeof l) {var u = Wo(l, s);return u.replace(y_, function (e, i) {var n = i.length;return "[" === i.charAt(0) && "]" === i.charAt(n - 1) && (i = +i.slice(1, n - 1)), Js(a, t, i);});}}, getRawValue: function getRawValue(t, e) {return Js(this.getData(e), t);}, formatTooltip: function formatTooltip() {} },x_ = il.prototype;x_.perform = function (t) {function e(t) {return !(t >= 1) && (t = 1), t;}var i = this._upstream,n = t && t.skip;if (this._dirty && i) {var r = this.context;r.data = r.outputData = i.context.outputData;}this.__pipeline && (this.__pipeline.currentTask = this);var a;this._plan && !n && (a = this._plan(this.context));var o = e(this._modBy),s = this._modDataCount || 0,l = e(t && t.modBy),u = t && t.modDataCount || 0;(o !== l || s !== u) && (a = "reset");var h;(this._dirty || "reset" === a) && (this._dirty = !1, h = rl(this, n)), this._modBy = l, this._modDataCount = u;var c = t && t.step;if (this._dueEnd = i ? i._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {var d = this._dueIndex,f = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);if (!n && (h || f > d)) {var p = this._progress;if (x(p)) for (var g = 0; g < p.length; g++) {nl(this, p[g], d, f, l, u);} else nl(this, p, d, f, l, u);}this._dueIndex = f;var v = null != this._settedOutputEnd ? this._settedOutputEnd : f;this._outputDueEnd = v;} else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;return this.unfinished();};var w_ = function () {function t() {return i > n ? n++ : null;}function e() {var t = n % o * r + Math.ceil(n / o),e = n >= i ? null : a > t ? t : n;return n++, e;}var i,n,r,a,o,s = { reset: function reset(l, u, h, c) {n = l, i = u, r = h, a = c, o = Math.ceil(a / r), s.next = r > 1 && a > 0 ? e : t;} };return s;}();x_.dirty = function () {this._dirty = !0, this._onDirty && this._onDirty(this.context);}, x_.unfinished = function () {return this._progress && this._dueIndex < this._dueEnd;}, x_.pipe = function (t) {(this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());}, x_.dispose = function () {this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);}, x_.getUpstream = function () {return this._upstream;}, x_.getDownstream = function () {return this._downstream;}, x_.setOutputEnd = function (t) {this._outputDueEnd = this._settedOutputEnd = t;};var b_ = hr(),M_ = By.extend({ type: "series.__base__", seriesIndex: 0, coordinateSystem: null, defaultOption: null, legendVisualProvider: null, visualColorAccessPath: "itemStyle.color", visualBorderColorAccessPath: "itemStyle.borderColor", layoutMode: null, init: function init(t, e, i) {this.seriesIndex = this.componentIndex, this.dataTask = el({ count: sl, reset: ll }), this.dataTask.context = { model: this }, this.mergeDefaultAndTheme(t, i), us(this);var n = this.getInitialData(t, i);hl(n, this), this.dataTask.context.data = n, b_(this).dataBeforeProcessed = n, al(this);}, mergeDefaultAndTheme: function mergeDefaultAndTheme(t, e) {var i = this.layoutMode,n = i ? es(t) : {},a = this.subType;By.hasClass(a) && (a += "Series"), r(t, e.getTheme().get(this.subType)), r(t, this.getDefaultOption()), er(t, "label", ["show"]), this.fillDataTextStyle(t.data), i && ts(t, n, i);}, mergeOption: function mergeOption(t, e) {t = r(this.option, t, !0), this.fillDataTextStyle(t.data);var i = this.layoutMode;i && ts(this.option, t, i), us(this);var n = this.getInitialData(t, e);hl(n, this), this.dataTask.dirty(), this.dataTask.context.data = n, b_(this).dataBeforeProcessed = n, al(this);}, fillDataTextStyle: function fillDataTextStyle(t) {if (t && !T(t)) for (var e = ["show"], i = 0; i < t.length; i++) {t[i] && t[i].label && er(t[i], "label", e);}}, getInitialData: function getInitialData() {}, appendData: function appendData(t) {var e = this.getRawData();e.appendData(t.data);}, getData: function getData(t) {var e = dl(this);if (e) {var i = e.context.data;return null == t ? i : i.getLinkedData(t);}return b_(this).data;}, setData: function setData(t) {var e = dl(this);if (e) {var i = e.context;i.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), i.outputData = t, e !== this.dataTask && (i.data = t);}b_(this).data = t;}, getSource: function getSource() {return ss(this);}, getRawData: function getRawData() {return b_(this).dataBeforeProcessed;}, getBaseAxis: function getBaseAxis() {var t = this.coordinateSystem;return t && t.getBaseAxis && t.getBaseAxis();}, formatTooltip: function formatTooltip(t, e, i, n) {function r(i) {function r(t, i) {var r = c.getDimensionInfo(i);if (r && r.otherDims.tooltip !== !1) {var d = r.type,f = "sub" + o.seriesIndex + "at" + h,p = Xo({ color: y, type: "subItem", renderMode: n, markerId: f }),g = "string" == typeof p ? p : p.content,v = (a ? g + Ho(r.displayName || "-") + ": " : "") + Ho("ordinal" === d ? t + "" : "time" === d ? e ? "" : Uo("yyyy/MM/dd hh:mm:ss", t) : Fo(t));v && s.push(v), l && (u[f] = y, ++h);}}var a = g(i, function (t, e, i) {var n = c.getDimensionInfo(i);return t |= n && n.tooltip !== !1 && null != n.displayName;}, 0),s = [];d.length ? f(d, function (e) {r(Js(c, t, e), e);}) : f(i, r);var p = a ? l ? "\n" : "<br/>" : "",v = p + s.join(p || ", ");return { renderMode: n, content: v, style: u };}function a(t) {return { renderMode: n, content: Ho(Fo(t)), style: u };}var o = this;n = n || "html";var s = "html" === n ? "<br/>" : "\n",l = "richText" === n,u = {},h = 0,c = this.getData(),d = c.mapDimension("defaultedTooltip", !0),p = d.length,v = this.getRawValue(t),m = x(v),y = c.getItemVisual(t, "color");M(y) && y.colorStops && (y = (y.colorStops[0] || {}).color), y = y || "transparent";var _ = p > 1 || m && !p ? r(v) : a(p ? Js(c, t, d[0]) : m ? v[0] : v),w = _.content,b = o.seriesIndex + "at" + h,S = Xo({ color: y, type: "item", renderMode: n, markerId: b });u[b] = y, ++h;var T = c.getName(t),I = this.name;or(this) || (I = ""), I = I ? Ho(I) + (e ? ": " : s) : "";var C = "string" == typeof S ? S : S.content,D = e ? C + I + w : I + C + (T ? Ho(T) + ": " + w : w);return { html: D, markers: u };}, isAnimationEnabled: function isAnimationEnabled() {if (Jf.node) return !1;var t = this.getShallow("animation");return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), t;}, restoreData: function restoreData() {this.dataTask.dirty();}, getColorFromPalette: function getColorFromPalette(t, e, i) {var n = this.ecModel,r = Vy.getColorFromPalette.call(this, t, e, i);return r || (r = n.getColorFromPalette(t, e, i)), r;}, coordDimToDataDim: function coordDimToDataDim(t) {return this.getRawData().mapDimension(t, !0);}, getProgressive: function getProgressive() {return this.get("progressive");}, getProgressiveThreshold: function getProgressiveThreshold() {return this.get("progressiveThreshold");}, getAxisTooltipData: null, getTooltipPosition: null, pipeTask: null, preventIncremental: null, pipelineContext: null });c(M_, __), c(M_, Vy);var S_ = function S_() {this.group = new fg(), this.uid = yo("viewComponent");};S_.prototype = { constructor: S_, init: function init() {}, render: function render() {}, dispose: function dispose() {}, filterForExposedEvent: null };var T_ = S_.prototype;T_.updateView = T_.updateLayout = T_.updateVisual = function () {}, yr(S_), br(S_, { registerWhenExtend: !0 });var I_ = function I_() {var t = hr();return function (e) {var i = t(e),n = e.pipelineContext,r = i.large,a = i.progressiveRender,o = i.large = n && n.large,s = i.progressiveRender = n && n.progressiveRender;return !!(r ^ o || a ^ s) && "reset";};},C_ = hr(),D_ = I_();fl.prototype = { type: "chart", init: function init() {}, render: function render() {}, highlight: function highlight(t, e, i, n) {gl(t.getData(), n, "emphasis");}, downplay: function downplay(t, e, i, n) {gl(t.getData(), n, "normal");}, remove: function remove() {this.group.removeAll();}, dispose: function dispose() {}, incrementalPrepareRender: null, incrementalRender: null, updateTransform: null, filterForExposedEvent: null };var k_ = fl.prototype;k_.updateView = k_.updateLayout = k_.updateVisual = function (t, e, i, n) {this.render(t, e, i, n);}, yr(fl, ["dispose"]), br(fl, { registerWhenExtend: !0 }), fl.markUpdateMethod = function (t, e) {C_(t).updateMethod = e;};var A_ = { incrementalPrepareRender: { progress: function progress(t, e) {e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload);} }, render: { forceFirstProgress: !0, progress: function progress(t, e) {e.view.render(e.model, e.ecModel, e.api, e.payload);} } },P_ = "\x00__throttleOriginMethod",L_ = "\x00__throttleRate",O_ = "\x00__throttleType",R_ = { createOnAllSeries: !0, performRawSeries: !0, reset: function reset(t, e) {var i = t.getData(),n = (t.visualColorAccessPath || "itemStyle.color").split("."),r = t.get(n),a = !w(r) || r instanceof qm ? null : r;(!r || a) && (r = t.getColorFromPalette(t.name, null, e.getSeriesCount())), i.setVisual("color", r);var o = (t.visualBorderColorAccessPath || "itemStyle.borderColor").split("."),s = t.get(o);if (i.setVisual("borderColor", s), !e.isSeriesFiltered(t)) {a && i.each(function (e) {i.setItemVisual(e, "color", a(t.getDataParams(e)));});var l = function l(t, e) {var i = t.getItemModel(e),r = i.get(n, !0),a = i.get(o, !0);null != r && t.setItemVisual(e, "color", r), null != a && t.setItemVisual(e, "borderColor", a);};return { dataEach: i.hasItemOption ? l : null };}} },z_ = { legend: { selector: { all: "全选", inverse: "反选" } }, toolbox: { brush: { title: { rect: "矩形选择", polygon: "圈选", lineX: "横向选择", lineY: "纵向选择", keep: "保持选择", clear: "清除选择" } }, dataView: { title: "数据视图", lang: ["数据视图", "关闭", "刷新"] }, dataZoom: { title: { zoom: "区域缩放", back: "区域缩放还原" } }, magicType: { title: { line: "切换为折线图", bar: "切换为柱状图", stack: "切换为堆叠", tiled: "切换为平铺" } }, restore: { title: "还原" }, saveAsImage: { title: "保存为图片", lang: ["右键另存为图片"] } }, series: { typeNames: { pie: "饼图", bar: "柱状图", line: "折线图", scatter: "散点图", effectScatter: "涟漪散点图", radar: "雷达图", tree: "树图", treemap: "矩形树图", boxplot: "箱型图", candlestick: "K线图", k: "K线图", heatmap: "热力图", map: "地图", parallel: "平行坐标图", lines: "线图", graph: "关系图", sankey: "桑基图", funnel: "漏斗图", gauge: "仪表盘图", pictorialBar: "象形柱图", themeRiver: "主题河流图", sunburst: "旭日图" } }, aria: { general: { withTitle: "这是一个关于“{title}”的图表。", withoutTitle: "这是一个图表，" }, series: { single: { prefix: "", withName: "图表类型是{seriesType}，表示{seriesName}。", withoutName: "图表类型是{seriesType}。" }, multiple: { prefix: "它由{seriesCount}个图表系列组成。", withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，", withoutName: "第{seriesId}个系列是一个{seriesType}，", separator: { middle: "；", end: "。" } } }, data: { allData: "其数据是——", partialData: "其中，前{displayCnt}项是——", withName: "{name}的数据是{value}", withoutName: "{value}", separator: { middle: "，", end: "" } } } },B_ = function B_(t, e) {function i(t, e) {if ("string" != typeof t) return t;var i = t;return f(e, function (t, e) {i = i.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t);}), i;}function n(t) {var e = o.get(t);if (null == e) {for (var i = t.split("."), n = z_.aria, r = 0; r < i.length; ++r) {n = n[i[r]];}return n;}return e;}function r() {var t = e.getModel("title").option;return t && t.length && (t = t[0]), t && t.text;}function a(t) {return z_.series.typeNames[t] || "自定义图";}var o = e.getModel("aria");if (o.get("show")) {if (o.get("description")) return void t.setAttribute("aria-label", o.get("description"));var s = 0;e.eachSeries(function () {++s;}, this);var l,u = o.get("data.maxCount") || 10,h = o.get("series.maxCount") || 10,c = Math.min(s, h);if (!(1 > s)) {var d = r();l = d ? i(n("general.withTitle"), { title: d }) : n("general.withoutTitle");var p = [],g = s > 1 ? "series.multiple.prefix" : "series.single.prefix";l += i(n(g), { seriesCount: s }), e.eachSeries(function (t, e) {if (c > e) {var r,o = t.get("name"),l = "series." + (s > 1 ? "multiple" : "single") + ".";r = n(o ? l + "withName" : l + "withoutName"), r = i(r, { seriesId: t.seriesIndex, seriesName: t.get("name"), seriesType: a(t.subType) });var h = t.getData();window.data = h, r += h.count() > u ? i(n("data.partialData"), { displayCnt: u }) : n("data.allData");for (var d = [], f = 0; f < h.count(); f++) {if (u > f) {var g = h.getName(f),v = Js(h, f);d.push(i(n(g ? "data.withName" : "data.withoutName"), { name: g, value: v }));}}r += d.join(n("data.separator.middle")) + n("data.separator.end"), p.push(r);}}), l += p.join(n("series.multiple.separator.middle")) + n("series.multiple.separator.end"), t.setAttribute("aria-label", l);}}},E_ = Math.PI,N_ = function N_(t, e) {e = e || {}, s(e, { text: "loading", textColor: "#000", fontSize: "12px", maskColor: "rgba(255, 255, 255, 0.8)", showSpinner: !0, color: "#c23531", spinnerRadius: 10, lineWidth: 5, zlevel: 0 });var i = new fg(),n = new Vm({ style: { fill: e.maskColor }, zlevel: e.zlevel, z: 1e4 });i.add(n);var r = e.fontSize + " sans-serif",a = new Vm({ style: { fill: "none", text: e.text, font: r, textPosition: "right", textDistance: 10, textFill: e.textColor }, zlevel: e.zlevel, z: 10001 });if (i.add(a), e.showSpinner) {var o = new Ym({ shape: { startAngle: -E_ / 2, endAngle: -E_ / 2 + .1, r: e.spinnerRadius }, style: { stroke: e.color, lineCap: "round", lineWidth: e.lineWidth }, zlevel: e.zlevel, z: 10001 });o.animateShape(!0).when(1e3, { endAngle: 3 * E_ / 2 }).start("circularInOut"), o.animateShape(!0).when(1e3, { startAngle: 3 * E_ / 2 }).delay(300).start("circularInOut"), i.add(o);}return i.resize = function () {var i = Xi(e.text, r),s = e.showSpinner ? e.spinnerRadius : 0,l = (t.getWidth() - 2 * s - (e.showSpinner && i ? 10 : 0) - i) / 2 - (e.showSpinner ? 0 : i / 2),u = t.getHeight() / 2;e.showSpinner && o.setShape({ cx: l, cy: u }), a.setShape({ x: l - s, y: u - s, width: 2 * s, height: 2 * s }), n.setShape({ x: 0, y: 0, width: t.getWidth(), height: t.getHeight() });}, i.resize(), i;},F_ = xl.prototype;F_.restoreData = function (t, e) {t.restoreData(e), this._stageTaskMap.each(function (t) {var e = t.overallTask;e && e.dirty();});}, F_.getPerformArgs = function (t, e) {if (t.__pipeline) {var i = this._pipelineMap.get(t.__pipeline.id),n = i.context,r = !e && i.progressiveEnabled && (!n || n.progressiveRender) && t.__idxInPipeline > i.blockIndex,a = r ? i.step : null,o = n && n.modDataCount,s = null != o ? Math.ceil(o / a) : null;return { step: a, modBy: s, modDataCount: o };}}, F_.getPipeline = function (t) {return this._pipelineMap.get(t);}, F_.updateStreamModes = function (t, e) {var i = this._pipelineMap.get(t.uid),n = t.getData(),r = n.count(),a = i.progressiveEnabled && e.incrementalPrepareRender && r >= i.threshold,o = t.get("large") && r >= t.get("largeThreshold"),s = "mod" === t.get("progressiveChunkMode") ? r : null;t.pipelineContext = i.context = { progressiveRender: a, modDataCount: s, large: o };}, F_.restorePipelines = function (t) {var e = this,i = e._pipelineMap = N();t.eachSeries(function (t) {var n = t.getProgressive(),r = t.uid;i.set(r, { id: r, head: null, tail: null, threshold: t.getProgressiveThreshold(), progressiveEnabled: n && !(t.preventIncremental && t.preventIncremental()), blockIndex: -1, step: Math.round(n || 700), count: 0 }), Ll(e, t, t.dataTask);});}, F_.prepareStageTasks = function () {var t = this._stageTaskMap,e = this.ecInstance.getModel(),i = this.api;f(this._allHandlers, function (n) {var r = t.get(n.uid) || t.set(n.uid, []);n.reset && bl(this, n, r, e, i), n.overallReset && Ml(this, n, r, e, i);}, this);}, F_.prepareView = function (t, e, i, n) {var r = t.renderTask,a = r.context;a.model = e, a.ecModel = i, a.api = n, r.__block = !t.incrementalPrepareRender, Ll(this, e, r);}, F_.performDataProcessorTasks = function (t, e) {wl(this, this._dataProcessorHandlers, t, e, { block: !0 });}, F_.performVisualTasks = function (t, e, i) {wl(this, this._visualHandlers, t, e, i);}, F_.performSeriesTasks = function (t) {var e;t.eachSeries(function (t) {e |= t.dataTask.perform();}), this.unfinished |= e;}, F_.plan = function () {this._pipelineMap.each(function (t) {var e = t.tail;do {if (e.__block) {t.blockIndex = e.__idxInPipeline;break;}e = e.getUpstream();} while (e);});};var V_ = F_.updatePayload = function (t, e) {"remain" !== e && (t.context.payload = e);},H_ = Al(0);xl.wrapStageHandler = function (t, e) {return w(t) && (t = { overallReset: t, seriesType: Ol(t) }), t.uid = yo("stageHandler"), e && (t.visualType = e), t;};var W_,G_ = {},X_ = {};Rl(G_, Qy), Rl(X_, Is), G_.eachSeriesByType = G_.eachRawSeriesByType = function (t) {W_ = t;}, G_.eachComponent = function (t) {"series" === t.mainType && t.subType && (W_ = t.subType);};var Y_ = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],U_ = { color: Y_, colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Y_] },q_ = "#eee",j_ = function j_() {return { axisLine: { lineStyle: { color: q_ } }, axisTick: { lineStyle: { color: q_ } }, axisLabel: { textStyle: { color: q_ } }, splitLine: { lineStyle: { type: "dashed", color: "#aaa" } }, splitArea: { areaStyle: { color: q_ } } };},Z_ = ["#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42"],K_ = { color: Z_, backgroundColor: "#333", tooltip: { axisPointer: { lineStyle: { color: q_ }, crossStyle: { color: q_ }, label: { color: "#000" } } }, legend: { textStyle: { color: q_ } }, textStyle: { color: q_ }, title: { textStyle: { color: q_ } }, toolbox: { iconStyle: { normal: { borderColor: q_ } } }, dataZoom: { textStyle: { color: q_ } }, visualMap: { textStyle: { color: q_ } }, timeline: { lineStyle: { color: q_ }, itemStyle: { normal: { color: Z_[1] } }, label: { normal: { textStyle: { color: q_ } } }, controlStyle: { normal: { color: q_, borderColor: q_ } } }, timeAxis: j_(), logAxis: j_(), valueAxis: j_(), categoryAxis: j_(), line: { symbol: "circle" }, graph: { color: Z_ }, gauge: { title: { textStyle: { color: q_ } } }, candlestick: { itemStyle: { normal: { color: "#FD1050", color0: "#0CF49B", borderColor: "#FD1050", borderColor0: "#0CF49B" } } } };K_.categoryAxis.splitLine.show = !1, By.extend({ type: "dataset", defaultOption: { seriesLayoutBy: qy, sourceHeader: null, dimensions: null, source: null }, optionUpdated: function optionUpdated() {os(this);} }), S_.extend({ type: "dataset" });var $_ = ia.extend({ type: "ellipse", shape: { cx: 0, cy: 0, rx: 0, ry: 0 }, buildPath: function buildPath(t, e) {var i = .5522848,n = e.cx,r = e.cy,a = e.rx,o = e.ry,s = a * i,l = o * i;t.moveTo(n - a, r), t.bezierCurveTo(n - a, r - l, n - s, r - o, n, r - o), t.bezierCurveTo(n + s, r - o, n + a, r - l, n + a, r), t.bezierCurveTo(n + a, r + l, n + s, r + o, n, r + o), t.bezierCurveTo(n - s, r + o, n - a, r + l, n - a, r), t.closePath();} }),Q_ = /[\s,]+/;Bl.prototype.parse = function (t, e) {e = e || {};var i = zl(t);if (!i) throw new Error("Illegal svg");var n = new fg();this._root = n;var r = i.getAttribute("viewBox") || "",a = parseFloat(i.getAttribute("width") || e.width),o = parseFloat(i.getAttribute("height") || e.height);isNaN(a) && (a = null), isNaN(o) && (o = null), Vl(i, n, null, !0);for (var s = i.firstChild; s;) {this._parseNode(s, n), s = s.nextSibling;}var l, u;if (r) {var h = R(r).split(Q_);h.length >= 4 && (l = { x: parseFloat(h[0] || 0), y: parseFloat(h[1] || 0), width: parseFloat(h[2]), height: parseFloat(h[3]) });}if (l && null != a && null != o && (u = Xl(l, a, o), !e.ignoreViewBox)) {var c = n;n = new fg(), n.add(c), c.scale = u.scale.slice(), c.position = u.position.slice();}return e.ignoreRootClip || null == a || null == o || n.setClipPath(new Vm({ shape: { x: 0, y: 0, width: a, height: o } })), { root: n, width: a, height: o, viewBoxRect: l, viewBoxTransform: u };}, Bl.prototype._parseNode = function (t, e) {var i = t.nodeName.toLowerCase();"defs" === i ? this._isDefine = !0 : "text" === i && (this._isText = !0);var n;if (this._isDefine) {var r = tx[i];if (r) {var a = r.call(this, t),o = t.getAttribute("id");o && (this._defs[o] = a);}} else {var r = J_[i];r && (n = r.call(this, t, e), e.add(n));}for (var s = t.firstChild; s;) {1 === s.nodeType && this._parseNode(s, n), 3 === s.nodeType && this._isText && this._parseText(s, n), s = s.nextSibling;}"defs" === i ? this._isDefine = !1 : "text" === i && (this._isText = !1);}, Bl.prototype._parseText = function (t, e) {if (1 === t.nodeType) {var i = t.getAttribute("dx") || 0,n = t.getAttribute("dy") || 0;this._textX += parseFloat(i), this._textY += parseFloat(n);}var r = new Dm({ style: { text: t.textContent, transformText: !0 }, position: [this._textX || 0, this._textY || 0] });Nl(e, r), Vl(t, r, this._defs);var a = r.style.fontSize;a && 9 > a && (r.style.fontSize = 9, r.scale = r.scale || [1, 1], r.scale[0] *= a / 9, r.scale[1] *= a / 9);var o = r.getBoundingRect();return this._textX += o.width, e.add(r), r;};var J_ = { g: function g(t, e) {var i = new fg();return Nl(e, i), Vl(t, i, this._defs), i;}, rect: function rect(t, e) {var i = new Vm();return Nl(e, i), Vl(t, i, this._defs), i.setShape({ x: parseFloat(t.getAttribute("x") || 0), y: parseFloat(t.getAttribute("y") || 0), width: parseFloat(t.getAttribute("width") || 0), height: parseFloat(t.getAttribute("height") || 0) }), i;}, circle: function circle(t, e) {var i = new km();return Nl(e, i), Vl(t, i, this._defs), i.setShape({ cx: parseFloat(t.getAttribute("cx") || 0), cy: parseFloat(t.getAttribute("cy") || 0), r: parseFloat(t.getAttribute("r") || 0) }), i;}, line: function line(t, e) {var i = new Wm();return Nl(e, i), Vl(t, i, this._defs), i.setShape({ x1: parseFloat(t.getAttribute("x1") || 0), y1: parseFloat(t.getAttribute("y1") || 0), x2: parseFloat(t.getAttribute("x2") || 0), y2: parseFloat(t.getAttribute("y2") || 0) }), i;
    }, ellipse: function ellipse(t, e) {var i = new $_();return Nl(e, i), Vl(t, i, this._defs), i.setShape({ cx: parseFloat(t.getAttribute("cx") || 0), cy: parseFloat(t.getAttribute("cy") || 0), rx: parseFloat(t.getAttribute("rx") || 0), ry: parseFloat(t.getAttribute("ry") || 0) }), i;}, polygon: function polygon(t, e) {var i = t.getAttribute("points");i && (i = Fl(i));var n = new Bm({ shape: { points: i || [] } });return Nl(e, n), Vl(t, n, this._defs), n;}, polyline: function polyline(t, e) {var i = new ia();Nl(e, i), Vl(t, i, this._defs);var n = t.getAttribute("points");n && (n = Fl(n));var r = new Em({ shape: { points: n || [] } });return r;}, image: function image(t, e) {var i = new Dn();return Nl(e, i), Vl(t, i, this._defs), i.setStyle({ image: t.getAttribute("xlink:href"), x: t.getAttribute("x"), y: t.getAttribute("y"), width: t.getAttribute("width"), height: t.getAttribute("height") }), i;}, text: function text(t, e) {var i = t.getAttribute("x") || 0,n = t.getAttribute("y") || 0,r = t.getAttribute("dx") || 0,a = t.getAttribute("dy") || 0;this._textX = parseFloat(i) + parseFloat(r), this._textY = parseFloat(n) + parseFloat(a);var o = new fg();return Nl(e, o), Vl(t, o, this._defs), o;}, tspan: function tspan(t, e) {var i = t.getAttribute("x"),n = t.getAttribute("y");null != i && (this._textX = parseFloat(i)), null != n && (this._textY = parseFloat(n));var r = t.getAttribute("dx") || 0,a = t.getAttribute("dy") || 0,o = new fg();return Nl(e, o), Vl(t, o, this._defs), this._textX += r, this._textY += a, o;}, path: function path(t, e) {var i = t.getAttribute("d") || "",n = oa(i);return Nl(e, n), Vl(t, n, this._defs), n;} },tx = { lineargradient: function lineargradient(t) {var e = parseInt(t.getAttribute("x1") || 0, 10),i = parseInt(t.getAttribute("y1") || 0, 10),n = parseInt(t.getAttribute("x2") || 10, 10),r = parseInt(t.getAttribute("y2") || 0, 10),a = new jm(e, i, n, r);return El(t, a), a;}, radialgradient: function radialgradient() {} },ex = { fill: "fill", stroke: "stroke", "stroke-width": "lineWidth", opacity: "opacity", "fill-opacity": "fillOpacity", "stroke-opacity": "strokeOpacity", "stroke-dasharray": "lineDash", "stroke-dashoffset": "lineDashOffset", "stroke-linecap": "lineCap", "stroke-linejoin": "lineJoin", "stroke-miterlimit": "miterLimit", "font-family": "fontFamily", "font-size": "fontSize", "font-style": "fontStyle", "font-weight": "fontWeight", "text-align": "textAlign", "alignment-baseline": "textBaseline" },ix = /url\(\s*#(.*?)\)/,nx = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g,rx = /([^\s:;]+)\s*:\s*([^:;]+)/g,ax = N(),ox = { registerMap: function registerMap(t, e, i) {var n;return x(e) ? n = e : e.svg ? n = [{ type: "svg", source: e.svg, specialAreas: e.specialAreas }] : (e.geoJson && !e.features && (i = e.specialAreas, e = e.geoJson), n = [{ type: "geoJSON", source: e, specialAreas: i }]), f(n, function (t) {var e = t.type;"geoJson" === e && (e = t.type = "geoJSON");var i = sx[e];i(t);}), ax.set(t, n);}, retrieveMap: function retrieveMap(t) {return ax.get(t);} },sx = { geoJSON: function geoJSON(t) {var e = t.source;t.geoJSON = b(e) ? "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")() : e;}, svg: function svg(t) {t.svgXML = zl(t.source);} },lx = O,ux = f,hx = w,cx = M,dx = By.parseClassType,fx = "4.8.0",px = { zrender: "4.3.1" },gx = 1,vx = 1e3,mx = 800,yx = 900,_x = 5e3,xx = 1e3,bx = 1100,Mx = 2e3,Sx = 3e3,Tx = 3500,Ix = 4e3,Cx = 5e3,Dx = { PROCESSOR: { FILTER: vx, SERIES_FILTER: mx, STATISTIC: _x }, VISUAL: { LAYOUT: xx, PROGRESSIVE_LAYOUT: bx, GLOBAL: Mx, CHART: Sx, POST_CHART_LAYOUT: Tx, COMPONENT: Ix, BRUSH: Cx } },kx = "__flagInMainProcess",Ax = "__optionUpdated",Px = /^[a-zA-Z0-9_]+$/;ql.prototype.on = Ul("on", !0), ql.prototype.off = Ul("off", !0), ql.prototype.one = Ul("one", !0), c(ql, wp);var Lx = jl.prototype;Lx._onframe = function () {if (!this._disposed) {var t = this._scheduler;if (this[Ax]) {var e = this[Ax].silent;this[kx] = !0, Kl(this), Ox.update.call(this), this[kx] = !1, this[Ax] = !1, tu.call(this, e), eu.call(this, e);} else if (t.unfinished) {var i = gx,n = this._model,r = this._api;t.unfinished = !1;do {var a = +new Date();t.performSeriesTasks(n), t.performDataProcessorTasks(n), Ql(this, n), t.performVisualTasks(n), su(this, this._model, r, "remain"), i -= +new Date() - a;} while (i > 0 && t.unfinished);t.unfinished || this._zr.flush();}}}, Lx.getDom = function () {return this._dom;}, Lx.getZr = function () {return this._zr;}, Lx.setOption = function (t, e, i) {if (!this._disposed) {var n;if (cx(e) && (i = e.lazyUpdate, n = e.silent, e = e.notMerge), this[kx] = !0, !this._model || e) {var r = new Ds(this._api),a = this._theme,o = this._model = new Qy();o.scheduler = this._scheduler, o.init(null, null, a, r);}this._model.setOption(t, Nx), i ? (this[Ax] = { silent: n }, this[kx] = !1) : (Kl(this), Ox.update.call(this), this._zr.flush(), this[Ax] = !1, this[kx] = !1, tu.call(this, n), eu.call(this, n));}}, Lx.setTheme = function () {console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0");}, Lx.getModel = function () {return this._model;}, Lx.getOption = function () {return this._model && this._model.getOption();}, Lx.getWidth = function () {return this._zr.getWidth();}, Lx.getHeight = function () {return this._zr.getHeight();}, Lx.getDevicePixelRatio = function () {return this._zr.painter.dpr || window.devicePixelRatio || 1;}, Lx.getRenderedCanvas = function (t) {if (Jf.canvasSupported) {t = t || {}, t.pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor");var e = this._zr;return e.painter.getRenderedCanvas(t);}}, Lx.getSvgDataURL = function () {if (Jf.svgSupported) {var t = this._zr,e = t.storage.getDisplayList();return f(e, function (t) {t.stopAnimation(!0);}), t.painter.toDataURL();}}, Lx.getDataURL = function (t) {if (!this._disposed) {t = t || {};var e = t.excludeComponents,i = this._model,n = [],r = this;ux(e, function (t) {i.eachComponent({ mainType: t }, function (t) {var e = r._componentsMap[t.__viewId];e.group.ignore || (n.push(e), e.group.ignore = !0);});});var a = "svg" === this._zr.painter.getType() ? this.getSvgDataURL() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));return ux(n, function (t) {t.group.ignore = !1;}), a;}}, Lx.getConnectedDataURL = function (t) {if (!this._disposed && Jf.canvasSupported) {var e = "svg" === t.type,i = this.group,r = Math.min,a = Math.max,o = 1 / 0;if (Xx[i]) {var s = o,l = o,u = -o,h = -o,c = [],d = t && t.pixelRatio || 1;f(Gx, function (o) {if (o.group === i) {var d = e ? o.getZr().painter.getSvgDom().innerHTML : o.getRenderedCanvas(n(t)),f = o.getDom().getBoundingClientRect();s = r(f.left, s), l = r(f.top, l), u = a(f.right, u), h = a(f.bottom, h), c.push({ dom: d, left: f.left, top: f.top });}}), s *= d, l *= d, u *= d, h *= d;var p = u - s,g = h - l,v = hp(),m = Zn(v, { renderer: e ? "svg" : "canvas" });if (m.resize({ width: p, height: g }), e) {var y = "";return ux(c, function (t) {var e = t.left - s,i = t.top - l;y += '<g transform="translate(' + e + "," + i + ')">' + t.dom + "</g>";}), m.painter.getSvgRoot().innerHTML = y, t.connectedBackgroundColor && m.painter.setBackgroundColor(t.connectedBackgroundColor), m.refreshImmediately(), m.painter.toDataURL();}return t.connectedBackgroundColor && m.add(new Vm({ shape: { x: 0, y: 0, width: p, height: g }, style: { fill: t.connectedBackgroundColor } })), ux(c, function (t) {var e = new Dn({ style: { x: t.left * d - s, y: t.top * d - l, image: t.dom } });m.add(e);}), m.refreshImmediately(), v.toDataURL("image/" + (t && t.type || "png"));}return this.getDataURL(t);}}, Lx.convertToPixel = _(Zl, "convertToPixel"), Lx.convertFromPixel = _(Zl, "convertFromPixel"), Lx.containPixel = function (t, e) {if (!this._disposed) {var i,n = this._model;return t = cr(n, t), f(t, function (t, n) {n.indexOf("Models") >= 0 && f(t, function (t) {var r = t.coordinateSystem;if (r && r.containPoint) i |= !!r.containPoint(e);else if ("seriesModels" === n) {var a = this._chartsMap[t.__viewId];a && a.containPoint && (i |= a.containPoint(e, t));}}, this);}, this), !!i;}}, Lx.getVisual = function (t, e) {var i = this._model;t = cr(i, t, { defaultMainType: "series" });var n = t.seriesModel,r = n.getData(),a = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? r.indexOfRawIndex(t.dataIndex) : null;return null != a ? r.getItemVisual(a, e) : r.getVisual(e);}, Lx.getViewOfComponentModel = function (t) {return this._componentsMap[t.__viewId];}, Lx.getViewOfSeriesModel = function (t) {return this._chartsMap[t.__viewId];};var Ox = { prepareAndUpdate: function prepareAndUpdate(t) {Kl(this), Ox.update.call(this, t);}, update: function update(t) {var e = this._model,i = this._api,n = this._zr,r = this._coordSysMgr,a = this._scheduler;if (e) {a.restoreData(e, t), a.performSeriesTasks(e), r.create(e, i), a.performDataProcessorTasks(e, t), Ql(this, e), r.update(e, i), ru(e), a.performVisualTasks(e, t), au(this, e, i, t);var o = e.get("backgroundColor") || "transparent";if (Jf.canvasSupported) n.setBackgroundColor(o);else {var s = ti(o);o = ui(s, "rgb"), 0 === s[3] && (o = "transparent");}lu(e, i);}}, updateTransform: function updateTransform(t) {var e = this._model,i = this,n = this._api;if (e) {var r = [];e.eachComponent(function (a, o) {var s = i.getViewOfComponentModel(o);if (s && s.__alive) if (s.updateTransform) {var l = s.updateTransform(o, e, n, t);l && l.update && r.push(s);} else r.push(s);});var a = N();e.eachSeries(function (r) {var o = i._chartsMap[r.__viewId];if (o.updateTransform) {var s = o.updateTransform(r, e, n, t);s && s.update && a.set(r.uid, 1);} else a.set(r.uid, 1);}), ru(e), this._scheduler.performVisualTasks(e, t, { setDirty: !0, dirtyMap: a }), su(i, e, n, t, a), lu(e, this._api);}}, updateView: function updateView(t) {var e = this._model;e && (fl.markUpdateMethod(t, "updateView"), ru(e), this._scheduler.performVisualTasks(e, t, { setDirty: !0 }), au(this, this._model, this._api, t), lu(e, this._api));}, updateVisual: function updateVisual(t) {Ox.update.call(this, t);}, updateLayout: function updateLayout(t) {Ox.update.call(this, t);} };Lx.resize = function (t) {if (!this._disposed) {this._zr.resize(t);var e = this._model;if (this._loadingFX && this._loadingFX.resize(), e) {var i = e.resetOption("media"),n = t && t.silent;this[kx] = !0, i && Kl(this), Ox.update.call(this), this[kx] = !1, tu.call(this, n), eu.call(this, n);}}}, Lx.showLoading = function (t, e) {if (!this._disposed && (cx(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), Wx[t])) {var i = Wx[t](this._api, e),n = this._zr;this._loadingFX = i, n.add(i);}}, Lx.hideLoading = function () {this._disposed || (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null);}, Lx.makeActionFromEvent = function (t) {var e = o({}, t);return e.type = Bx[t.type], e;}, Lx.dispatchAction = function (t, e) {if (!this._disposed && (cx(e) || (e = { silent: !!e }), zx[t.type] && this._model)) {if (this[kx]) return void this._pendingActions.push(t);Jl.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : e.flush !== !1 && Jf.browser.weChat && this._throttledZrFlush(), tu.call(this, e.silent), eu.call(this, e.silent);}}, Lx.appendData = function (t) {if (!this._disposed) {var e = t.seriesIndex,i = this.getModel(),n = i.getSeriesByIndex(e);n.appendData(t), this._scheduler.unfinished = !0;}}, Lx.on = Ul("on", !1), Lx.off = Ul("off", !1), Lx.one = Ul("one", !1);var Rx = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];Lx._initEvents = function () {ux(Rx, function (t) {var e = function e(_e3) {var i,n = this.getModel(),r = _e3.target,a = "globalout" === t;if (a) i = {};else if (r && null != r.dataIndex) {var s = r.dataModel || n.getSeriesByIndex(r.seriesIndex);i = s && s.getDataParams(r.dataIndex, r.dataType, r) || {};} else r && r.eventData && (i = o({}, r.eventData));if (i) {var l = i.componentType,u = i.componentIndex;("markLine" === l || "markPoint" === l || "markArea" === l) && (l = "series", u = i.seriesIndex);var h = l && null != u && n.getComponent(l, u),c = h && this["series" === h.mainType ? "_chartsMap" : "_componentsMap"][h.__viewId];i.event = _e3, i.type = t, this._ecEventProcessor.eventInfo = { targetEl: r, packedEvent: i, model: h, view: c }, this.trigger(t, i);}};e.zrEventfulCallAtLast = !0, this._zr.on(t, e, this);}, this), ux(Bx, function (t, e) {this._messageCenter.on(e, function (t) {this.trigger(e, t);}, this);}, this);}, Lx.isDisposed = function () {return this._disposed;}, Lx.clear = function () {this._disposed || this.setOption({ series: [] }, !0);}, Lx.dispose = function () {if (!this._disposed) {this._disposed = !0, fr(this.getDom(), qx, "");var t = this._api,e = this._model;ux(this._componentsViews, function (i) {i.dispose(e, t);}), ux(this._chartsViews, function (i) {i.dispose(e, t);}), this._zr.dispose(), delete Gx[this.id];}}, c(jl, wp), fu.prototype = { constructor: fu, normalizeQuery: function normalizeQuery(t) {var e = {},i = {},n = {};if (b(t)) {var r = dx(t);e.mainType = r.main || null, e.subType = r.sub || null;} else {var a = ["Index", "Name", "Id"],o = { name: 1, dataIndex: 1, dataType: 1 };f(t, function (t, r) {for (var s = !1, l = 0; l < a.length; l++) {var u = a[l],h = r.lastIndexOf(u);if (h > 0 && h === r.length - u.length) {var c = r.slice(0, h);"data" !== c && (e.mainType = c, e[u.toLowerCase()] = t, s = !0);}}o.hasOwnProperty(r) && (i[r] = t, s = !0), s || (n[r] = t);});}return { cptQuery: e, dataQuery: i, otherQuery: n };}, filter: function filter(t, e) {function i(t, e, i, n) {return null == t[i] || e[n || i] === t[i];}var n = this.eventInfo;if (!n) return !0;var r = n.targetEl,a = n.packedEvent,o = n.model,s = n.view;if (!o || !s) return !0;var l = e.cptQuery,u = e.dataQuery;return i(l, o, "mainType") && i(l, o, "subType") && i(l, o, "index", "componentIndex") && i(l, o, "name") && i(l, o, "id") && i(u, a, "name") && i(u, a, "dataIndex") && i(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, r, a));}, afterTrigger: function afterTrigger() {this.eventInfo = null;} };var zx = {},Bx = {},Ex = [],Nx = [],Fx = [],Vx = [],Hx = {},Wx = {},Gx = {},Xx = {},Yx = new Date() - 0,Ux = new Date() - 0,qx = "_echarts_instance_",jx = mu;ku(Mx, R_), bu(d_), Mu(yx, f_), Pu("default", N_), Tu({ type: "highlight", event: "highlight", update: "highlight" }, V), Tu({ type: "downplay", event: "downplay", update: "downplay" }, V), wu("light", U_), wu("dark", K_);var Zx = {};Vu.prototype = { constructor: Vu, add: function add(t) {return this._add = t, this;}, update: function update(t) {return this._update = t, this;}, remove: function remove(t) {return this._remove = t, this;}, execute: function execute() {var t,e = this._old,i = this._new,n = {},r = {},a = [],o = [];for (Hu(e, n, a, "_oldKeyGetter", this), Hu(i, r, o, "_newKeyGetter", this), t = 0; t < e.length; t++) {var s = a[t],l = r[s];if (null != l) {var u = l.length;u ? (1 === u && (r[s] = null), l = l.shift()) : r[s] = null, this._update && this._update(l, t);} else this._remove && this._remove(t);}for (var t = 0; t < o.length; t++) {var s = o[t];if (r.hasOwnProperty(s)) {var l = r[s];if (null == l) continue;if (l.length) for (var h = 0, u = l.length; u > h; h++) {this._add && this._add(l[h]);} else this._add && this._add(l);}}} };var Kx = N(["tooltip", "label", "itemName", "itemId", "seriesName"]),$x = M,Qx = "undefined",Jx = -1,tw = "e\x00\x00",ew = { "float": typeof Float64Array === Qx ? Array : Float64Array, "int": typeof Int32Array === Qx ? Array : Int32Array, ordinal: Array, number: Array, time: Array },iw = typeof Uint32Array === Qx ? Array : Uint32Array,nw = typeof Int32Array === Qx ? Array : Int32Array,rw = typeof Uint16Array === Qx ? Array : Uint16Array,aw = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx"],ow = ["_extent", "_approximateExtent", "_rawExtent"],sw = function sw(t, e) {t = t || ["x", "y"];for (var i = {}, n = [], r = {}, a = 0; a < t.length; a++) {var o = t[a];b(o) ? o = new Uu({ name: o }) : o instanceof Uu || (o = new Uu(o));var s = o.name;o.type = o.type || "float", o.coordDim || (o.coordDim = s, o.coordDimIndex = 0), o.otherDims = o.otherDims || {}, n.push(s), i[s] = o, o.index = a, o.createInvertedIndices && (r[s] = []);}this.dimensions = n, this._dimensionInfos = i, this.hostModel = e, this.dataType, this._indices = null, this._count = 0, this._rawCount = 0, this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [], this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = Wu(this), this._invertedIndicesMap = r, this._calculationInfo = {}, this.userOutput = this._dimensionsSummary.userOutput;},lw = sw.prototype;lw.type = "list", lw.hasItemOption = !0, lw.getDimension = function (t) {return ("number" == typeof t || !isNaN(t) && !this._dimensionInfos.hasOwnProperty(t)) && (t = this.dimensions[t]), t;}, lw.getDimensionInfo = function (t) {return this._dimensionInfos[this.getDimension(t)];}, lw.getDimensionsOnCoord = function () {return this._dimensionsSummary.dataDimsOnCoord.slice();}, lw.mapDimension = function (t, e) {var i = this._dimensionsSummary;if (null == e) return i.encodeFirstDimNotExtra[t];var n = i.encode[t];return e === !0 ? (n || []).slice() : n && n[e];}, lw.initData = function (t, e, i) {var n = as.isInstance(t) || d(t);n && (t = new Us(t, this.dimensions.length)), this._rawData = t, this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], this._nameRepeatCount = {}, i || (this.hasItemOption = !1), this.defaultDimValueGetter = m_[this._rawData.getSource().sourceFormat], this._dimValueGetter = i = i || this.defaultDimValueGetter, this._dimValueGetterArrayRows = m_.arrayRows, this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1);}, lw.getProvider = function () {return this._rawData;}, lw.appendData = function (t) {var e = this._rawData,i = this.count();e.appendData(t);var n = e.count();e.persistent || (n += i), this._initDataFromProvider(i, n);}, lw.appendValues = function (t, e) {for (var i = this._chunkSize, n = this._storage, r = this.dimensions, a = r.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e ? e.length : 0), u = this._chunkCount, h = 0; a > h; h++) {var c = r[h];o[c] || (o[c] = ah()), n[c] || (n[c] = []), Ku(n, this._dimensionInfos[c], i, u, l), this._chunkCount = n[c].length;}for (var d = new Array(a), f = s; l > f; f++) {for (var p = f - s, g = Math.floor(f / i), v = f % i, m = 0; a > m; m++) {var c = r[m],y = this._dimValueGetterArrayRows(t[p] || d, c, p, m);n[c][g][v] = y;var _ = o[c];y < _[0] && (_[0] = y), y > _[1] && (_[1] = y);}e && (this._nameList[f] = e[p]);}this._rawCount = this._count = l, this._extent = {}, $u(this);}, lw._initDataFromProvider = function (t, e) {if (!(t >= e)) {for (var i, n = this._chunkSize, r = this._rawData, a = this._storage, o = this.dimensions, s = o.length, l = this._dimensionInfos, u = this._nameList, h = this._idList, c = this._rawExtent, d = this._nameRepeatCount = {}, f = this._chunkCount, p = 0; s > p; p++) {var g = o[p];c[g] || (c[g] = ah());var v = l[g];0 === v.otherDims.itemName && (i = this._nameDimIdx = p), 0 === v.otherDims.itemId && (this._idDimIdx = p), a[g] || (a[g] = []), Ku(a, v, n, f, e), this._chunkCount = a[g].length;}for (var m = new Array(s), y = t; e > y; y++) {m = r.getItem(y, m);for (var _ = Math.floor(y / n), x = y % n, w = 0; s > w; w++) {var g = o[w],b = a[g][_],M = this._dimValueGetter(m, g, y, w);b[x] = M;var S = c[g];M < S[0] && (S[0] = M), M > S[1] && (S[1] = M);}if (!r.pure) {var T = u[y];if (m && null == T) if (null != m.name) u[y] = T = m.name;else if (null != i) {var I = o[i],C = a[I][_];if (C) {T = C[x];var D = l[I].ordinalMeta;D && D.categories.length && (T = D.categories[T]);}}var k = null == m ? null : m.id;null == k && null != T && (d[T] = d[T] || 0, k = T, d[T] > 0 && (k += "__ec__" + d[T]), d[T]++), null != k && (h[y] = k);}}!r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, $u(this);}}, lw.count = function () {return this._count;}, lw.getIndices = function () {var t,e = this._indices;if (e) {var i = e.constructor,n = this._count;if (i === Array) {t = new i(n);for (var r = 0; n > r; r++) {t[r] = e[r];}} else t = new i(e.buffer, 0, n);} else for (var i = qu(this), t = new i(this.count()), r = 0; r < t.length; r++) {t[r] = r;}return t;}, lw.get = function (t, e) {if (!(e >= 0 && e < this._count)) return 0 / 0;var i = this._storage;if (!i[t]) return 0 / 0;e = this.getRawIndex(e);var n = Math.floor(e / this._chunkSize),r = e % this._chunkSize,a = i[t][n],o = a[r];return o;}, lw.getByRawIndex = function (t, e) {if (!(e >= 0 && e < this._rawCount)) return 0 / 0;var i = this._storage[t];if (!i) return 0 / 0;var n = Math.floor(e / this._chunkSize),r = e % this._chunkSize,a = i[n];return a[r];}, lw._getFast = function (t, e) {var i = Math.floor(e / this._chunkSize),n = e % this._chunkSize,r = this._storage[t][i];return r[n];}, lw.getValues = function (t, e) {var i = [];x(t) || (e = t, t = this.dimensions);for (var n = 0, r = t.length; r > n; n++) {i.push(this.get(t[n], e));}return i;}, lw.hasValue = function (t) {for (var e = this._dimensionsSummary.dataDimsOnCoord, i = 0, n = e.length; n > i; i++) {if (isNaN(this.get(e[i], t))) return !1;}return !0;}, lw.getDataExtent = function (t) {t = this.getDimension(t);var e = this._storage[t],i = ah();if (!e) return i;var n,r = this.count(),a = !this._indices;if (a) return this._rawExtent[t].slice();if (n = this._extent[t]) return n.slice();n = i;for (var o = n[0], s = n[1], l = 0; r > l; l++) {var u = this._getFast(t, this.getRawIndex(l));o > u && (o = u), u > s && (s = u);}return n = [o, s], this._extent[t] = n, n;}, lw.getApproximateExtent = function (t) {return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t);}, lw.setApproximateExtent = function (t, e) {e = this.getDimension(e), this._approximateExtent[e] = t.slice();}, lw.getCalculationInfo = function (t) {return this._calculationInfo[t];}, lw.setCalculationInfo = function (t, e) {$x(t) ? o(this._calculationInfo, t) : this._calculationInfo[t] = e;}, lw.getSum = function (t) {var e = this._storage[t],i = 0;if (e) for (var n = 0, r = this.count(); r > n; n++) {var a = this.get(t, n);isNaN(a) || (i += a);}return i;}, lw.getMedian = function (t) {var e = [];this.each(t, function (t) {isNaN(t) || e.push(t);});var i = [].concat(e).sort(function (t, e) {return t - e;}),n = this.count();return 0 === n ? 0 : n % 2 === 1 ? i[(n - 1) / 2] : (i[n / 2] + i[n / 2 - 1]) / 2;}, lw.rawIndexOf = function (t, e) {var i = t && this._invertedIndicesMap[t],n = i[e];return null == n || isNaN(n) ? Jx : n;}, lw.indexOfName = function (t) {for (var e = 0, i = this.count(); i > e; e++) {if (this.getName(e) === t) return e;}return -1;}, lw.indexOfRawIndex = function (t) {if (t >= this._rawCount || 0 > t) return -1;if (!this._indices) return t;var e = this._indices,i = e[t];if (null != i && i < this._count && i === t) return t;for (var n = 0, r = this._count - 1; r >= n;) {var a = (n + r) / 2 | 0;if (e[a] < t) n = a + 1;else {if (!(e[a] > t)) return a;r = a - 1;}}return -1;}, lw.indicesOfNearest = function (t, e, i) {var n = this._storage,r = n[t],a = [];if (!r) return a;null == i && (i = 1 / 0);for (var o = 1 / 0, s = -1, l = 0, u = 0, h = this.count(); h > u; u++) {var c = e - this.get(t, u),d = Math.abs(c);i >= d && ((o > d || d === o && c >= 0 && 0 > s) && (o = d, s = c, l = 0), c === s && (a[l++] = u));}return a.length = l, a;}, lw.getRawIndex = Ju, lw.getRawDataItem = function (t) {if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));for (var e = [], i = 0; i < this.dimensions.length; i++) {var n = this.dimensions[i];e.push(this.get(n, t));}return e;}, lw.getName = function (t) {var e = this.getRawIndex(t);return this._nameList[e] || Qu(this, this._nameDimIdx, e) || "";}, lw.getId = function (t) {return eh(this, this.getRawIndex(t));}, lw.each = function (t, e, i, n) {if (this._count) {"function" == typeof t && (n = i, i = e, e = t, t = []), i = i || n || this, t = p(ih(t), this.getDimension, this);for (var r = t.length, a = 0; a < this.count(); a++) {switch (r) {case 0:e.call(i, a);break;case 1:e.call(i, this.get(t[0], a), a);break;case 2:e.call(i, this.get(t[0], a), this.get(t[1], a), a);break;default:for (var o = 0, s = []; r > o; o++) {s[o] = this.get(t[o], a);}s[o] = a, e.apply(i, s);}}}}, lw.filterSelf = function (t, e, i, n) {if (this._count) {"function" == typeof t && (n = i, i = e, e = t, t = []), i = i || n || this, t = p(ih(t), this.getDimension, this);for (var r = this.count(), a = qu(this), o = new a(r), s = [], l = t.length, u = 0, h = t[0], c = 0; r > c; c++) {var d,f = this.getRawIndex(c);if (0 === l) d = e.call(i, c);else if (1 === l) {var g = this._getFast(h, f);d = e.call(i, g, c);} else {for (var v = 0; l > v; v++) {s[v] = this._getFast(h, f);}s[v] = c, d = e.apply(i, s);}d && (o[u++] = f);}return r > u && (this._indices = o), this._count = u, this._extent = {}, this.getRawIndex = this._indices ? th : Ju, this;}}, lw.selectRange = function (t) {if (this._count) {var e = [];for (var i in t) {t.hasOwnProperty(i) && e.push(i);}var n = e.length;if (n) {var r = this.count(),a = qu(this),o = new a(r),s = 0,l = e[0],u = t[l][0],h = t[l][1],c = !1;if (!this._indices) {var d = 0;if (1 === n) {for (var f = this._storage[e[0]], p = 0; p < this._chunkCount; p++) {for (var g = f[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {var y = g[m];(y >= u && h >= y || isNaN(y)) && (o[s++] = d), d++;}}c = !0;} else if (2 === n) {for (var f = this._storage[l], _ = this._storage[e[1]], x = t[e[1]][0], w = t[e[1]][1], p = 0; p < this._chunkCount; p++) {for (var g = f[p], b = _[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {var y = g[m],M = b[m];(y >= u && h >= y || isNaN(y)) && (M >= x && w >= M || isNaN(M)) && (o[s++] = d), d++;}}c = !0;}}if (!c) if (1 === n) for (var m = 0; r > m; m++) {var S = this.getRawIndex(m),y = this._getFast(l, S);(y >= u && h >= y || isNaN(y)) && (o[s++] = S);} else for (var m = 0; r > m; m++) {for (var T = !0, S = this.getRawIndex(m), p = 0; n > p; p++) {var I = e[p],y = this._getFast(i, S);(y < t[I][0] || y > t[I][1]) && (T = !1);}T && (o[s++] = this.getRawIndex(m));}return r > s && (this._indices = o), this._count = s, this._extent = {}, this.getRawIndex = this._indices ? th : Ju, this;}}}, lw.mapArray = function (t, e, i, n) {"function" == typeof t && (n = i, i = e, e = t, t = []), i = i || n || this;var r = [];return this.each(t, function () {r.push(e && e.apply(this, arguments));}, i), r;}, lw.map = function (t, e, i, n) {i = i || n || this, t = p(ih(t), this.getDimension, this);var r = nh(this, t);r._indices = this._indices, r.getRawIndex = r._indices ? th : Ju;for (var a = r._storage, o = [], s = this._chunkSize, l = t.length, u = this.count(), h = [], c = r._rawExtent, d = 0; u > d; d++) {for (var f = 0; l > f; f++) {h[f] = this.get(t[f], d);}h[l] = d;var g = e && e.apply(i, h);if (null != g) {"object" != typeof g && (o[0] = g, g = o);for (var v = this.getRawIndex(d), m = Math.floor(v / s), y = v % s, _ = 0; _ < g.length; _++) {var x = t[_],w = g[_],b = c[x],M = a[x];M && (M[m][y] = w), w < b[0] && (b[0] = w), w > b[1] && (b[1] = w);}}}return r;}, lw.downSample = function (t, e, i, n) {for (var r = nh(this, [t]), a = r._storage, o = [], s = Math.floor(1 / e), l = a[t], u = this.count(), h = this._chunkSize, c = r._rawExtent[t], d = new (qu(this))(u), f = 0, p = 0; u > p; p += s) {s > u - p && (s = u - p, o.length = s);for (var g = 0; s > g; g++) {var v = this.getRawIndex(p + g),m = Math.floor(v / h),y = v % h;o[g] = l[m][y];}var _ = i(o),x = this.getRawIndex(Math.min(p + n(o, _) || 0, u - 1)),w = Math.floor(x / h),b = x % h;l[w][b] = _, _ < c[0] && (c[0] = _), _ > c[1] && (c[1] = _), d[f++] = x;}return r._count = f, r._indices = d, r.getRawIndex = th, r;}, lw.getItemModel = function (t) {var e = this.hostModel;return new go(this.getRawDataItem(t), e, e && e.ecModel);}, lw.diff = function (t) {var e = this;return new Vu(t ? t.getIndices() : [], this.getIndices(), function (e) {return eh(t, e);}, function (t) {return eh(e, t);});}, lw.getVisual = function (t) {var e = this._visual;return e && e[t];}, lw.setVisual = function (t, e) {if ($x(t)) for (var i in t) {t.hasOwnProperty(i) && this.setVisual(i, t[i]);} else this._visual = this._visual || {}, this._visual[t] = e;}, lw.setLayout = function (t, e) {if ($x(t)) for (var i in t) {t.hasOwnProperty(i) && this.setLayout(i, t[i]);} else this._layout[t] = e;}, lw.getLayout = function (t) {return this._layout[t];}, lw.getItemLayout = function (t) {return this._itemLayouts[t];}, lw.setItemLayout = function (t, e, i) {this._itemLayouts[t] = i ? o(this._itemLayouts[t] || {}, e) : e;}, lw.clearItemLayouts = function () {this._itemLayouts.length = 0;}, lw.getItemVisual = function (t, e, i) {var n = this._itemVisuals[t],r = n && n[e];return null != r || i ? r : this.getVisual(e);}, lw.setItemVisual = function (t, e, i) {var n = this._itemVisuals[t] || {},r = this.hasItemVisual;if (this._itemVisuals[t] = n, $x(e)) for (var a in e) {e.hasOwnProperty(a) && (n[a] = e[a], r[a] = !0);} else n[e] = i, r[e] = !0;}, lw.clearAllVisual = function () {this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {};};var uw = function uw(t) {t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType;};lw.setItemGraphicEl = function (t, e) {var i = this.hostModel;e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = i && i.seriesIndex, "group" === e.type && e.traverse(uw, e)), this._graphicEls[t] = e;}, lw.getItemGraphicEl = function (t) {return this._graphicEls[t];}, lw.eachItemGraphicEl = function (t, e) {f(this._graphicEls, function (i, n) {i && t && t.call(e, i, n);});}, lw.cloneShallow = function (t) {if (!t) {var e = p(this.dimensions, this.getDimensionInfo, this);t = new sw(e, this.hostModel);}if (t._storage = this._storage, Zu(t, this), this._indices) {var i = this._indices.constructor;t._indices = new i(this._indices);} else t._indices = null;return t.getRawIndex = t._indices ? th : Ju, t;}, lw.wrapMethod = function (t, e) {var i = this[t];"function" == typeof i && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function () {var t = i.apply(this, arguments);return e.apply(this, [t].concat(P(arguments)));});}, lw.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], lw.CHANGABLE_METHODS = ["filterSelf", "selectRange"];var hw = function hw(t, e) {return e = e || {}, oh(e.coordDimensions || [], t, { dimsDef: e.dimensionsDefine || t.dimensionsDefine, encodeDef: e.encodeDefine || t.encodeDefine, dimCount: e.dimensionsCount, encodeDefaulter: e.encodeDefaulter, generateCoord: e.generateCoord, generateCoordCount: e.generateCoordCount });},cw = { cartesian2d: function cartesian2d(t, e, i, n) {var r = t.getReferringComponents("xAxis")[0],a = t.getReferringComponents("yAxis")[0];e.coordSysDims = ["x", "y"], i.set("x", r), i.set("y", a), ch(r) && (n.set("x", r), e.firstCategoryDimIndex = 0), ch(a) && (n.set("y", a), null == e.firstCategoryDimIndex & (e.firstCategoryDimIndex = 1));}, singleAxis: function singleAxis(t, e, i, n) {var r = t.getReferringComponents("singleAxis")[0];e.coordSysDims = ["single"], i.set("single", r), ch(r) && (n.set("single", r), e.firstCategoryDimIndex = 0);}, polar: function polar(t, e, i, n) {var r = t.getReferringComponents("polar")[0],a = r.findAxisModel("radiusAxis"),o = r.findAxisModel("angleAxis");e.coordSysDims = ["radius", "angle"], i.set("radius", a), i.set("angle", o), ch(a) && (n.set("radius", a), e.firstCategoryDimIndex = 0), ch(o) && (n.set("angle", o), null == e.firstCategoryDimIndex && (e.firstCategoryDimIndex = 1));}, geo: function geo(t, e) {e.coordSysDims = ["lng", "lat"];}, parallel: function parallel(t, e, i, n) {var r = t.ecModel,a = r.getComponent("parallel", t.get("parallelIndex")),o = e.coordSysDims = a.dimensions.slice();f(a.parallelAxisIndex, function (t, a) {var s = r.getComponent("parallelAxis", t),l = o[a];i.set(l, s), ch(s) && null == e.firstCategoryDimIndex && (n.set(l, s), e.firstCategoryDimIndex = a);});} };yh.prototype.parse = function (t) {return t;}, yh.prototype.getSetting = function (t) {return this._setting[t];}, yh.prototype.contain = function (t) {var e = this._extent;return t >= e[0] && t <= e[1];}, yh.prototype.normalize = function (t) {var e = this._extent;return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0]);}, yh.prototype.scale = function (t) {var e = this._extent;return t * (e[1] - e[0]) + e[0];}, yh.prototype.unionExtent = function (t) {var e = this._extent;t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);}, yh.prototype.unionExtentFromData = function (t, e) {this.unionExtent(t.getApproximateExtent(e));}, yh.prototype.getExtent = function () {return this._extent.slice();}, yh.prototype.setExtent = function (t, e) {var i = this._extent;isNaN(t) || (i[0] = t), isNaN(e) || (i[1] = e);}, yh.prototype.isBlank = function () {return this._isBlank;}, yh.prototype.setBlank = function (t) {this._isBlank = t;}, yh.prototype.getLabel = null, yr(yh), br(yh, { registerWhenExtend: !0 }), _h.createByAxisModel = function (t) {var e = t.option,i = e.data,n = i && p(i, wh);return new _h({ categories: n, needCollect: !n, deduplication: e.dedplication !== !1 });};var dw = _h.prototype;dw.getOrdinal = function (t) {return xh(this).get(t);}, dw.parseAndCollect = function (t) {var e,i = this._needCollect;if ("string" != typeof t && !i) return t;if (i && !this._deduplication) return e = this.categories.length, this.categories[e] = t, e;var n = xh(this);return e = n.get(t), null == e && (i ? (e = this.categories.length, this.categories[e] = t, n.set(t, e)) : e = 0 / 0), e;};var fw = yh.prototype,pw = yh.extend({ type: "ordinal", init: function init(t, e) {(!t || x(t)) && (t = new _h({ categories: t })), this._ordinalMeta = t, this._extent = e || [0, t.categories.length - 1];}, parse: function parse(t) {return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t);}, contain: function contain(t) {return t = this.parse(t), fw.contain.call(this, t) && null != this._ordinalMeta.categories[t];}, normalize: function normalize(t) {return fw.normalize.call(this, this.parse(t));}, scale: function scale(t) {return Math.round(fw.scale.call(this, t));}, getTicks: function getTicks() {for (var t = [], e = this._extent, i = e[0]; i <= e[1];) {t.push(i), i++;}return t;}, getLabel: function getLabel(t) {return this.isBlank() ? void 0 : this._ordinalMeta.categories[t];}, count: function count() {return this._extent[1] - this._extent[0] + 1;}, unionExtentFromData: function unionExtentFromData(t, e) {this.unionExtent(t.getApproximateExtent(e));}, getOrdinalMeta: function getOrdinalMeta() {return this._ordinalMeta;}, niceTicks: V, niceExtent: V });pw.create = function () {return new pw();};var gw = So,vw = So,mw = yh.extend({ type: "interval", _interval: 0, _intervalPrecision: 2, setExtent: function setExtent(t, e) {var i = this._extent;isNaN(t) || (i[0] = parseFloat(t)), isNaN(e) || (i[1] = parseFloat(e));}, unionExtent: function unionExtent(t) {var e = this._extent;t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), mw.prototype.setExtent.call(this, e[0], e[1]);}, getInterval: function getInterval() {return this._interval;}, setInterval: function setInterval(t) {this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Mh(t);}, getTicks: function getTicks(t) {var e = this._interval,i = this._extent,n = this._niceExtent,r = this._intervalPrecision,a = [];if (!e) return a;var o = 1e4;i[0] < n[0] && a.push(t ? vw(n[0] - e, r) : i[0]);for (var s = n[0]; s <= n[1] && (a.push(s), s = vw(s + e, r), s !== a[a.length - 1]);) {if (a.length > o) return [];}var l = a.length ? a[a.length - 1] : n[1];return i[1] > l && a.push(t ? vw(l + e, r) : i[1]), a;}, getMinorTicks: function getMinorTicks(t) {for (var e = this.getTicks(!0), i = [], n = this.getExtent(), r = 1; r < e.length; r++) {for (var a = e[r], o = e[r - 1], s = 0, l = [], u = a - o, h = u / t; t - 1 > s;) {var c = So(o + (s + 1) * h);c > n[0] && c < n[1] && l.push(c), s++;}i.push(l);}return i;}, getLabel: function getLabel(t, e) {if (null == t) return "";var i = e && e.precision;return null == i ? i = Co(t) || 0 : "auto" === i && (i = this._intervalPrecision), t = vw(t, i, !0), Fo(t);}, niceTicks: function niceTicks(t, e, i) {t = t || 5;var n = this._extent,r = n[1] - n[0];if (isFinite(r)) {0 > r && (r = -r, n.reverse());var a = bh(n, t, e, i);this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent;}}, niceExtent: function niceExtent(t) {var e = this._extent;if (e[0] === e[1]) if (0 !== e[0]) {var i = e[0];t.fixMax ? e[0] -= i / 2 : (e[1] += i / 2, e[0] -= i / 2);} else e[1] = 1;var n = e[1] - e[0];isFinite(n) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);var r = this._interval;t.fixMin || (e[0] = vw(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = vw(Math.ceil(e[1] / r) * r));} });mw.create = function () {return new mw();};var yw = "__ec_stack_",_w = .5,xw = "undefined" != typeof Float32Array ? Float32Array : Array,ww = ({ seriesType: "bar", plan: I_(), reset: function reset(t) {function e(t, e) {for (var i, d = t.count, f = new xw(2 * d), p = new xw(2 * d), g = new xw(d), v = [], m = [], y = 0, _ = 0; null != (i = t.next());) {m[h] = e.get(s, i), m[1 - h] = e.get(l, i), v = n.dataToPoint(m, null, v), p[y] = u ? r.x + r.width : v[0], f[y++] = v[0], p[y] = u ? v[1] : r.y + r.height, f[y++] = v[1], g[_++] = i;}
        e.setLayout({ largePoints: f, largeDataIndices: g, largeBackgroundPoints: p, barWidth: c, valueAxisStart: zh(a, o, !1), backgroundStart: u ? r.x : r.y, valueAxisHorizontal: u });}if (Oh(t) && Rh(t)) {var i = t.getData(),n = t.coordinateSystem,r = n.grid.getRect(),a = n.getBaseAxis(),o = n.getOtherAxis(a),s = i.mapDimension(o.dim),l = i.mapDimension(a.dim),u = o.isHorizontal(),h = u ? 0 : 1,c = Lh(Ah([t]), a, t).width;return c > _w || (c = _w), { progress: e };}} }, mw.prototype),bw = Math.ceil,Mw = Math.floor,Sw = 1e3,Tw = 60 * Sw,Iw = 60 * Tw,Cw = 24 * Iw,Dw = function Dw(t, e, i, n) {for (; n > i;) {var r = i + n >>> 1;t[r][1] < e ? i = r + 1 : n = r;}return i;},kw = mw.extend({ type: "time", getLabel: function getLabel(t) {var e = this._stepLvl,i = new Date(t);return Uo(e[0], i, this.getSetting("useUTC"));}, niceExtent: function niceExtent(t) {var e = this._extent;if (e[0] === e[1] && (e[0] -= Cw, e[1] += Cw), e[1] === -1 / 0 && 1 / 0 === e[0]) {var i = new Date();e[1] = +new Date(i.getFullYear(), i.getMonth(), i.getDate()), e[0] = e[1] - Cw;}this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);var n = this._interval;t.fixMin || (e[0] = So(Mw(e[0] / n) * n)), t.fixMax || (e[1] = So(bw(e[1] / n) * n));}, niceTicks: function niceTicks(t, e, i) {t = t || 10;var n = this._extent,r = n[1] - n[0],a = r / t;null != e && e > a && (a = e), null != i && a > i && (a = i);var o = Aw.length,s = Dw(Aw, a, 0, o),l = Aw[Math.min(s, o - 1)],u = l[1];if ("year" === l[0]) {var h = r / u,c = zo(h / t, !0);u *= c;}var d = this.getSetting("useUTC") ? 0 : 60 * new Date(+n[0] || +n[1]).getTimezoneOffset() * 1e3,f = [Math.round(bw((n[0] - d) / u) * u + d), Math.round(Mw((n[1] - d) / u) * u + d)];Th(f, n), this._stepLvl = l, this._interval = u, this._niceExtent = f;}, parse: function parse(t) {return +Lo(t);} });f(["contain", "normalize"], function (t) {kw.prototype[t] = function (e) {return ww[t].call(this, this.parse(e));};});var Aw = [["hh:mm:ss", Sw], ["hh:mm:ss", 5 * Sw], ["hh:mm:ss", 10 * Sw], ["hh:mm:ss", 15 * Sw], ["hh:mm:ss", 30 * Sw], ["hh:mm\nMM-dd", Tw], ["hh:mm\nMM-dd", 5 * Tw], ["hh:mm\nMM-dd", 10 * Tw], ["hh:mm\nMM-dd", 15 * Tw], ["hh:mm\nMM-dd", 30 * Tw], ["hh:mm\nMM-dd", Iw], ["hh:mm\nMM-dd", 2 * Iw], ["hh:mm\nMM-dd", 6 * Iw], ["hh:mm\nMM-dd", 12 * Iw], ["MM-dd\nyyyy", Cw], ["MM-dd\nyyyy", 2 * Cw], ["MM-dd\nyyyy", 3 * Cw], ["MM-dd\nyyyy", 4 * Cw], ["MM-dd\nyyyy", 5 * Cw], ["MM-dd\nyyyy", 6 * Cw], ["week", 7 * Cw], ["MM-dd\nyyyy", 10 * Cw], ["week", 14 * Cw], ["week", 21 * Cw], ["month", 31 * Cw], ["week", 42 * Cw], ["month", 62 * Cw], ["week", 70 * Cw], ["quarter", 95 * Cw], ["month", 31 * Cw * 4], ["month", 31 * Cw * 5], ["half-year", 380 * Cw / 2], ["month", 31 * Cw * 8], ["month", 31 * Cw * 10], ["year", 380 * Cw]];kw.create = function (t) {return new kw({ useUTC: t.ecModel.get("useUTC") });};var Pw = yh.prototype,Lw = mw.prototype,Ow = Co,Rw = So,zw = Math.floor,Bw = Math.ceil,Ew = Math.pow,Nw = Math.log,Fw = yh.extend({ type: "log", base: 10, $constructor: function $constructor() {yh.apply(this, arguments), this._originalScale = new mw();}, getTicks: function getTicks(t) {var e = this._originalScale,i = this._extent,n = e.getExtent();return p(Lw.getTicks.call(this, t), function (t) {var r = So(Ew(this.base, t));return r = t === i[0] && e.__fixMin ? Bh(r, n[0]) : r, r = t === i[1] && e.__fixMax ? Bh(r, n[1]) : r;}, this);}, getMinorTicks: Lw.getMinorTicks, getLabel: Lw.getLabel, scale: function scale(t) {return t = Pw.scale.call(this, t), Ew(this.base, t);}, setExtent: function setExtent(t, e) {var i = this.base;t = Nw(t) / Nw(i), e = Nw(e) / Nw(i), Lw.setExtent.call(this, t, e);}, getExtent: function getExtent() {var t = this.base,e = Pw.getExtent.call(this);e[0] = Ew(t, e[0]), e[1] = Ew(t, e[1]);var i = this._originalScale,n = i.getExtent();return i.__fixMin && (e[0] = Bh(e[0], n[0])), i.__fixMax && (e[1] = Bh(e[1], n[1])), e;}, unionExtent: function unionExtent(t) {this._originalScale.unionExtent(t);var e = this.base;t[0] = Nw(t[0]) / Nw(e), t[1] = Nw(t[1]) / Nw(e), Pw.unionExtent.call(this, t);}, unionExtentFromData: function unionExtentFromData(t, e) {this.unionExtent(t.getApproximateExtent(e));}, niceTicks: function niceTicks(t) {t = t || 10;var e = this._extent,i = e[1] - e[0];if (!(1 / 0 === i || 0 >= i)) {var n = Oo(i),r = t / i * n;for (.5 >= r && (n *= 10); !isNaN(n) && Math.abs(n) < 1 && Math.abs(n) > 0;) {n *= 10;}var a = [So(Bw(e[0] / n) * n), So(zw(e[1] / n) * n)];this._interval = n, this._niceExtent = a;}}, niceExtent: function niceExtent(t) {Lw.niceExtent.call(this, t);var e = this._originalScale;e.__fixMin = t.fixMin, e.__fixMax = t.fixMax;} });f(["contain", "normalize"], function (t) {Fw.prototype[t] = function (e) {return e = Nw(e) / Nw(this.base), Pw[t].call(this, e);};}), Fw.create = function () {return new Fw();};var Vw = { getMin: function getMin(t) {var e = this.option,i = t || null == e.rangeStart ? e.min : e.rangeStart;return this.axis && null != i && "dataMin" !== i && "function" != typeof i && !C(i) && (i = this.axis.scale.parse(i)), i;}, getMax: function getMax(t) {var e = this.option,i = t || null == e.rangeEnd ? e.max : e.rangeEnd;return this.axis && null != i && "dataMax" !== i && "function" != typeof i && !C(i) && (i = this.axis.scale.parse(i)), i;}, getNeedCrossZero: function getNeedCrossZero() {var t = this.option;return null != t.rangeStart || null != t.rangeEnd ? !1 : !t.scale;}, getCoordSysModel: V, setRange: function setRange(t, e) {this.option.rangeStart = t, this.option.rangeEnd = e;}, resetRange: function resetRange() {this.option.rangeStart = this.option.rangeEnd = null;} },Hw = va({ type: "triangle", shape: { cx: 0, cy: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var i = e.cx,n = e.cy,r = e.width / 2,a = e.height / 2;t.moveTo(i, n - a), t.lineTo(i + r, n + a), t.lineTo(i - r, n + a), t.closePath();} }),Ww = va({ type: "diamond", shape: { cx: 0, cy: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var i = e.cx,n = e.cy,r = e.width / 2,a = e.height / 2;t.moveTo(i, n - a), t.lineTo(i + r, n), t.lineTo(i, n + a), t.lineTo(i - r, n), t.closePath();} }),Gw = va({ type: "pin", shape: { x: 0, y: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var i = e.x,n = e.y,r = e.width / 5 * 3,a = Math.max(r, e.height),o = r / 2,s = o * o / (a - o),l = n - a + o + s,u = Math.asin(s / o),h = Math.cos(u) * o,c = Math.sin(u),d = Math.cos(u),f = .6 * o,p = .7 * o;t.moveTo(i - h, l + s), t.arc(i, l, o, Math.PI - u, 2 * Math.PI + u), t.bezierCurveTo(i + h - c * f, l + s + d * f, i, n - p, i, n), t.bezierCurveTo(i, n - p, i - h + c * f, l + s + d * f, i - h, l + s), t.closePath();} }),Xw = va({ type: "arrow", shape: { x: 0, y: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var i = e.height,n = e.width,r = e.x,a = e.y,o = n / 3 * 2;t.moveTo(r, a), t.lineTo(r + o, a + i), t.lineTo(r, a + i / 4 * 3), t.lineTo(r - o, a + i), t.lineTo(r, a), t.closePath();} }),Yw = { line: Wm, rect: Vm, roundRect: Vm, square: Vm, circle: km, diamond: Ww, pin: Gw, arrow: Xw, triangle: Hw },Uw = { line: function line(t, e, i, n, r) {r.x1 = t, r.y1 = e + n / 2, r.x2 = t + i, r.y2 = e + n / 2;}, rect: function rect(t, e, i, n, r) {r.x = t, r.y = e, r.width = i, r.height = n;}, roundRect: function roundRect(t, e, i, n, r) {r.x = t, r.y = e, r.width = i, r.height = n, r.r = Math.min(i, n) / 4;}, square: function square(t, e, i, n, r) {var a = Math.min(i, n);r.x = t, r.y = e, r.width = a, r.height = a;}, circle: function circle(t, e, i, n, r) {r.cx = t + i / 2, r.cy = e + n / 2, r.r = Math.min(i, n) / 2;}, diamond: function diamond(t, e, i, n, r) {r.cx = t + i / 2, r.cy = e + n / 2, r.width = i, r.height = n;}, pin: function pin(t, e, i, n, r) {r.x = t + i / 2, r.y = e + n / 2, r.width = i, r.height = n;}, arrow: function arrow(t, e, i, n, r) {r.x = t + i / 2, r.y = e + n / 2, r.width = i, r.height = n;}, triangle: function triangle(t, e, i, n, r) {r.cx = t + i / 2, r.cy = e + n / 2, r.width = i, r.height = n;} },qw = {};f(Yw, function (t, e) {qw[e] = new t();});var jw = va({ type: "symbol", shape: { symbolType: "", x: 0, y: 0, width: 0, height: 0 }, calculateTextPosition: function calculateTextPosition(t, e, i) {var n = Ki(t, e, i),r = this.shape;return r && "pin" === r.symbolType && "inside" === e.textPosition && (n.y = i.y + .4 * i.height), n;}, buildPath: function buildPath(t, e, i) {var n = e.symbolType;if ("none" !== n) {var r = qw[n];r || (n = "rect", r = qw[n]), Uw[n](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, i);}} }),Zw = { isDimensionStacked: fh, enableDataStack: dh, getStackedDimension: ph },Kw = (Object.freeze || Object)({ createList: qh, getLayoutRect: Qo, dataStack: Zw, createScale: jh, mixinAxisModelCommonMethods: Zh, completeDimensions: oh, createDimensions: hw, createSymbol: Uh }),$w = 1e-8;Qh.prototype = { constructor: Qh, properties: null, getBoundingRect: function getBoundingRect() {var t = this._rect;if (t) return t;for (var e = Number.MAX_VALUE, i = [e, e], n = [-e, -e], r = [], a = [], o = this.geometries, s = 0; s < o.length; s++) {if ("polygon" === o[s].type) {var l = o[s].exterior;Er(l, r, a), oe(i, i, r), se(n, n, a);}}return 0 === s && (i[0] = i[1] = n[0] = n[1] = 0), this._rect = new Ii(i[0], i[1], n[0] - i[0], n[1] - i[1]);}, contain: function contain(t) {var e = this.getBoundingRect(),i = this.geometries;if (!e.contain(t[0], t[1])) return !1;t: for (var n = 0, r = i.length; r > n; n++) {if ("polygon" === i[n].type) {var a = i[n].exterior,o = i[n].interiors;if ($h(a, t[0], t[1])) {for (var s = 0; s < (o ? o.length : 0); s++) {if ($h(o[s])) continue t;}return !0;}}}return !1;}, transformTo: function transformTo(t, e, i, n) {var r = this.getBoundingRect(),a = r.width / r.height;i ? n || (n = i / a) : i = a * n;for (var o = new Ii(t, e, i, n), s = r.calculateTransform(o), l = this.geometries, u = 0; u < l.length; u++) {if ("polygon" === l[u].type) {for (var h = l[u].exterior, c = l[u].interiors, d = 0; d < h.length; d++) {ae(h[d], h[d], s);}for (var f = 0; f < (c ? c.length : 0); f++) {for (var d = 0; d < c[f].length; d++) {ae(c[f][d], c[f][d], s);}}}}r = this._rect, r.copy(o), this.center = [r.x + r.width / 2, r.y + r.height / 2];}, cloneShallow: function cloneShallow(t) {null == t && (t = this.name);var e = new Qh(t, this.geometries, this.center);return e._rect = this._rect, e.transformTo = null, e;} };var Qw = function Qw(t, e) {return Jh(t), p(v(t.features, function (t) {return t.geometry && t.properties && t.geometry.coordinates.length > 0;}), function (t) {var i = t.properties,n = t.geometry,r = n.coordinates,a = [];"Polygon" === n.type && a.push({ type: "polygon", exterior: r[0], interiors: r.slice(1) }), "MultiPolygon" === n.type && f(r, function (t) {t[0] && a.push({ type: "polygon", exterior: t[0], interiors: t.slice(1) });});var o = new Qh(i[e || "name"], a, i.cp);return o.properties = i, o;});},Jw = hr(),tb = [0, 1],eb = function eb(t, e, i) {this.dim = t, this.scale = e, this._extent = i || [0, 0], this.inverse = !1, this.onBand = !1;};eb.prototype = { constructor: eb, contain: function contain(t) {var e = this._extent,i = Math.min(e[0], e[1]),n = Math.max(e[0], e[1]);return t >= i && n >= t;}, containData: function containData(t) {return this.scale.contain(t);}, getExtent: function getExtent() {return this._extent.slice();}, getPixelPrecision: function getPixelPrecision(t) {return Do(t || this.scale.getExtent(), this._extent);}, setExtent: function setExtent(t, e) {var i = this._extent;i[0] = t, i[1] = e;}, dataToCoord: function dataToCoord(t, e) {var i = this._extent,n = this.scale;return t = n.normalize(t), this.onBand && "ordinal" === n.type && (i = i.slice(), gc(i, n.count())), bo(t, tb, i, e);}, coordToData: function coordToData(t, e) {var i = this._extent,n = this.scale;this.onBand && "ordinal" === n.type && (i = i.slice(), gc(i, n.count()));var r = bo(t, i, tb, e);return this.scale.scale(r);}, pointToData: function pointToData() {}, getTicksCoords: function getTicksCoords(t) {t = t || {};var e = t.tickModel || this.getTickModel(),i = ic(this, e),n = i.ticks,r = p(n, function (t) {return { coord: this.dataToCoord(t), tickValue: t };}, this),a = e.get("alignWithLabel");return vc(this, r, a, t.clamp), r;}, getMinorTicksCoords: function getMinorTicksCoords() {if ("ordinal" === this.scale.type) return [];var t = this.model.getModel("minorTick"),e = t.get("splitNumber");e > 0 && 100 > e || (e = 5);var i = this.scale.getMinorTicks(e),n = p(i, function (t) {return p(t, function (t) {return { coord: this.dataToCoord(t), tickValue: t };}, this);}, this);return n;}, getViewLabels: function getViewLabels() {return ec(this).labels;}, getLabelModel: function getLabelModel() {return this.model.getModel("axisLabel");}, getTickModel: function getTickModel() {return this.model.getModel("axisTick");}, getBandWidth: function getBandWidth() {var t = this._extent,e = this.scale.getExtent(),i = e[1] - e[0] + (this.onBand ? 1 : 0);0 === i && (i = 1);var n = Math.abs(t[1] - t[0]);return Math.abs(n) / i;}, isHorizontal: null, getRotate: null, calculateCategoryInterval: function calculateCategoryInterval() {return cc(this);} };var ib = Qw,nb = {};f(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge"], function (t) {nb[t] = fp[t];});var rb = {};f(["extendShape", "extendPath", "makePath", "makeImage", "mergePath", "resizePath", "createIcon", "setHoverStyle", "setLabelStyle", "setTextStyle", "setText", "getFont", "updateProps", "initProps", "getTransform", "clipPointsByRect", "clipRectByRect", "registerShape", "getShapeClass", "Group", "Image", "Text", "Circle", "Sector", "Ring", "Polygon", "Polyline", "Rect", "Line", "BezierCurve", "Arc", "IncrementalDisplayable", "CompoundPath", "LinearGradient", "RadialGradient", "BoundingRect"], function (t) {rb[t] = cy[t];});var ab = function ab(t, e, i) {e = x(e) && { coordDimensions: e } || o({}, e);var n = t.getSource(),r = hw(n, e),a = new sw(r, t);return a.initData(n, i), a;},ob = { updateSelectedMap: function updateSelectedMap(t) {this._targetList = x(t) ? t.slice() : [], this._selectTargetMap = g(t || [], function (t, e) {return t.set(e.name, e), t;}, N());}, select: function select(t, e) {var i = null != e ? this._targetList[e] : this._selectTargetMap.get(t),n = this.get("selectedMode");"single" === n && this._selectTargetMap.each(function (t) {t.selected = !1;}), i && (i.selected = !0);}, unSelect: function unSelect(t, e) {var i = null != e ? this._targetList[e] : this._selectTargetMap.get(t);i && (i.selected = !1);}, toggleSelected: function toggleSelected(t, e) {var i = null != e ? this._targetList[e] : this._selectTargetMap.get(t);return null != i ? (this[i.selected ? "unSelect" : "select"](t, e), i.selected) : void 0;}, isSelected: function isSelected(t, e) {var i = null != e ? this._targetList[e] : this._selectTargetMap.get(t);return i && i.selected;} },sb = Ru({ type: "series.pie", init: function init(t) {sb.superApply(this, "init", arguments), this.legendVisualProvider = new mc(y(this.getData, this), y(this.getRawData, this)), this.updateSelectedMap(this._createSelectableList()), this._defaultLabelLine(t);}, mergeOption: function mergeOption(t) {sb.superCall(this, "mergeOption", t), this.updateSelectedMap(this._createSelectableList());}, getInitialData: function getInitialData() {return ab(this, { coordDimensions: ["value"], encodeDefaulter: _(gs, this) });}, _createSelectableList: function _createSelectableList() {for (var t = this.getRawData(), e = t.mapDimension("value"), i = [], n = 0, r = t.count(); r > n; n++) {i.push({ name: t.getName(n), value: t.get(e, n), selected: tl(t, n, "selected") });}return i;}, getDataParams: function getDataParams(t) {var e = this.getData(),i = sb.superCall(this, "getDataParams", t),n = [];return e.each(e.mapDimension("value"), function (t) {n.push(t);}), i.percent = ko(n, t, e.hostModel.get("percentPrecision")), i.$vars.push("percent"), i;}, _defaultLabelLine: function _defaultLabelLine(t) {er(t, "labelLine", ["show"]);var e = t.labelLine,i = t.emphasis.labelLine;e.show = e.show && t.label.show, i.show = i.show && t.emphasis.label.show;}, defaultOption: { zlevel: 0, z: 2, legendHoverLink: !0, hoverAnimation: !0, center: ["50%", "50%"], radius: [0, "75%"], clockwise: !0, startAngle: 90, minAngle: 0, minShowLabelAngle: 0, selectedOffset: 10, hoverOffset: 10, avoidLabelOverlap: !0, percentPrecision: 2, stillShowZeroSum: !0, left: 0, top: 0, right: 0, bottom: 0, width: null, height: null, label: { rotate: !1, show: !0, position: "outer", alignTo: "none", margin: "25%", bleedMargin: 10, distanceToLabelLine: 5 }, labelLine: { show: !0, length: 15, length2: 15, smooth: !1, lineStyle: { width: 1, type: "solid" } }, itemStyle: { borderWidth: 1 }, animationType: "expansion", animationTypeUpdate: "transition", animationEasing: "cubicOut" } });c(sb, ob);var lb = xc.prototype;lb.updateData = function (t, e, i) {var n = this.childAt(0),r = this.childAt(1),a = this.childAt(2),l = t.hostModel,u = t.getItemModel(e),h = t.getItemLayout(e),c = o({}, h);c.label = null;var d = l.getShallow("animationTypeUpdate");if (i) {n.setShape(c);var f = l.getShallow("animationType");"scale" === f ? (n.shape.r = h.r0, io(n, { shape: { r: h.r } }, l, e)) : (n.shape.endAngle = h.startAngle, eo(n, { shape: { endAngle: h.endAngle } }, l, e));} else "expansion" === d ? n.setShape(c) : eo(n, { shape: c }, l, e);var p = t.getItemVisual(e, "color");n.useStyle(s({ lineJoin: "bevel", fill: p }, u.getModel("itemStyle").getItemStyle())), n.hoverStyle = u.getModel("emphasis.itemStyle").getItemStyle();var g = u.getShallow("cursor");g && n.attr("cursor", g), _c(this, t.getItemLayout(e), l.isSelected(t.getName(e)), l.get("selectedOffset"), l.get("animation"));var v = !i && "transition" === d;this._updateLabel(t, e, v), this.highDownOnUpdate = l.get("silent") ? null : function (t, e) {var i = l.isAnimationEnabled() && u.get("hoverAnimation");"emphasis" === e ? (r.ignore = r.hoverIgnore, a.ignore = a.hoverIgnore, i && (n.stopAnimation(!0), n.animateTo({ shape: { r: h.r + l.get("hoverOffset") } }, 300, "elasticOut"))) : (r.ignore = r.normalIgnore, a.ignore = a.normalIgnore, i && (n.stopAnimation(!0), n.animateTo({ shape: { r: h.r } }, 300, "elasticOut")));}, Fa(this);}, lb._updateLabel = function (t, e, i) {var n = this.childAt(1),r = this.childAt(2),a = t.hostModel,o = t.getItemModel(e),s = t.getItemLayout(e),l = s.label,u = t.getItemVisual(e, "color");if (!l || isNaN(l.x) || isNaN(l.y)) return void (r.ignore = r.normalIgnore = r.hoverIgnore = n.ignore = n.normalIgnore = n.hoverIgnore = !0);var h = { points: l.linePoints || [[l.x, l.y], [l.x, l.y], [l.x, l.y]] },c = { x: l.x, y: l.y };i ? (eo(n, { shape: h }, a, e), eo(r, { style: c }, a, e)) : (n.attr({ shape: h }), r.attr({ style: c })), r.attr({ rotation: l.rotation, origin: [l.x, l.y], z2: 10 });var d = o.getModel("label"),f = o.getModel("emphasis.label"),p = o.getModel("labelLine"),g = o.getModel("emphasis.labelLine"),u = t.getItemVisual(e, "color");Ga(r.style, r.hoverStyle = {}, d, f, { labelFetcher: t.hostModel, labelDataIndex: e, defaultText: l.text, autoColor: u, useInsideStyle: !!l.inside }, { textAlign: l.textAlign, textVerticalAlign: l.verticalAlign, opacity: t.getItemVisual(e, "opacity") }), r.ignore = r.normalIgnore = !d.get("show"), r.hoverIgnore = !f.get("show"), n.ignore = n.normalIgnore = !p.get("show"), n.hoverIgnore = !g.get("show"), n.setStyle({ stroke: u, opacity: t.getItemVisual(e, "opacity") }), n.setStyle(p.getModel("lineStyle").getLineStyle()), n.hoverStyle = g.getModel("lineStyle").getLineStyle();var v = p.get("smooth");v && v === !0 && (v = .4), n.setShape({ smooth: v });}, h(xc, fg);var ub = (fl.extend({ type: "pie", init: function init() {var t = new fg();this._sectorGroup = t;}, render: function render(t, e, i, n) {if (!n || n.from !== this.uid) {var r = t.getData(),a = this._data,o = this.group,s = e.get("animation"),l = !a,u = t.get("animationType"),h = t.get("animationTypeUpdate"),c = _(yc, this.uid, t, s, i),d = t.get("selectedMode");if (r.diff(a).add(function (t) {var e = new xc(r, t);l && "scale" !== u && e.eachChild(function (t) {t.stopAnimation(!0);}), d && e.on("click", c), r.setItemGraphicEl(t, e), o.add(e);}).update(function (t, e) {var i = a.getItemGraphicEl(e);l || "transition" === h || i.eachChild(function (t) {t.stopAnimation(!0);}), i.updateData(r, t), i.off("click"), d && i.on("click", c), o.add(i), r.setItemGraphicEl(t, i);}).remove(function (t) {var e = a.getItemGraphicEl(t);o.remove(e);}).execute(), s && r.count() > 0 && (l ? "scale" !== u : "transition" !== h)) {for (var f = r.getItemLayout(0), p = 1; isNaN(f.startAngle) && p < r.count(); ++p) {f = r.getItemLayout(p);}var g = Math.max(i.getWidth(), i.getHeight()) / 2,v = y(o.removeClipPath, o);o.setClipPath(this._createClipPath(f.cx, f.cy, g, f.startAngle, f.clockwise, v, t, l));} else o.removeClipPath();this._data = r;}}, dispose: function dispose() {}, _createClipPath: function _createClipPath(t, e, i, n, r, a, o, s) {var l = new Lm({ shape: { cx: t, cy: e, r0: 0, r: i, startAngle: n, endAngle: n, clockwise: r } }),u = s ? io : eo;return u(l, { shape: { endAngle: n + (r ? 1 : -1) * Math.PI * 2 } }, o, a), l;}, containPoint: function containPoint(t, e) {var i = e.getData(),n = i.getItemLayout(0);if (n) {var r = t[0] - n.cx,a = t[1] - n.cy,o = Math.sqrt(r * r + a * a);return o <= n.r && o >= n.r0;}} }), function (t, e) {f(e, function (e) {e.update = "updateView", Tu(e, function (i, n) {var r = {};return n.eachComponent({ mainType: "series", subType: t, query: i }, function (t) {t[e.method] && t[e.method](i.name, i.dataIndex);var n = t.getData();n.each(function (e) {var i = n.getName(e);r[i] = t.isSelected(i) || !1;});}), { name: i.name, selected: r, seriesId: i.seriesId };});});}),hb = function hb(t) {return { getTargetSeries: function getTargetSeries(e) {var i = {},n = N();return e.eachSeriesByType(t, function (t) {t.__paletteScope = i, n.set(t.uid, t);}), n;}, reset: function reset(t) {var e = t.getRawData(),i = {},n = t.getData();n.each(function (t) {var e = n.getRawIndex(t);i[e] = t;}), e.each(function (r) {var a,o = i[r],s = null != o && n.getItemVisual(o, "color", !0),l = null != o && n.getItemVisual(o, "borderColor", !0);if (s && l || (a = e.getItemModel(r)), !s) {var u = a.get("itemStyle.color") || t.getColorFromPalette(e.getName(r) || r + "", t.__paletteScope, e.count());null != o && n.setItemVisual(o, "color", u);}if (!l) {var h = a.get("itemStyle.borderColor");null != o && n.setItemVisual(o, "borderColor", h);}});} };},cb = Math.PI / 180,db = function db(t, e, i, n, r, a) {var o,s,l = t.getData(),u = [],h = !1,c = (t.get("minShowLabelAngle") || 0) * cb;l.each(function (n) {var a = l.getItemLayout(n),d = l.getItemModel(n),f = d.getModel("label"),p = f.get("position") || d.get("emphasis.label.position"),g = f.get("distanceToLabelLine"),v = f.get("alignTo"),m = Mo(f.get("margin"), i),y = f.get("bleedMargin"),_ = f.getFont(),x = d.getModel("labelLine"),w = x.get("length");w = Mo(w, i);var b = x.get("length2");if (b = Mo(b, i), !(a.angle < c)) {var M,S,T,I,C = (a.startAngle + a.endAngle) / 2,D = Math.cos(C),k = Math.sin(C);o = a.cx, s = a.cy;var A = t.getFormattedLabel(n, "normal") || l.getName(n),P = Yi(A, _, I, "top"),L = "inside" === p || "inner" === p;if ("center" === p) M = a.cx, S = a.cy, I = "center";else {var O = (L ? (a.r + a.r0) / 2 * D : a.r * D) + o,R = (L ? (a.r + a.r0) / 2 * k : a.r * k) + s;if (M = O + 3 * D, S = R + 3 * k, !L) {var z = O + D * (w + e - a.r),B = R + k * (w + e - a.r),E = z + (0 > D ? -1 : 1) * b,N = B;M = "edge" === v ? 0 > D ? r + m : r + i - m : E + (0 > D ? -g : g), S = N, T = [[O, R], [z, B], [E, N]];}I = L ? "center" : "edge" === v ? D > 0 ? "right" : "left" : D > 0 ? "left" : "right";}var F,V = f.get("rotate");F = "number" == typeof V ? V * (Math.PI / 180) : V ? 0 > D ? -C + Math.PI : -C : 0, h = !!F, a.label = { x: M, y: S, position: p, height: P.height, len: w, len2: b, linePoints: T, textAlign: I, verticalAlign: "middle", rotation: F, inside: L, labelDistance: g, labelAlignTo: v, labelMargin: m, bleedMargin: y, textRect: P, text: A, font: _ }, L || u.push(a.label);}}), !h && t.get("avoidLabelOverlap") && bc(u, o, s, e, i, n, r, a);},fb = 2 * Math.PI,pb = Math.PI / 180,gb = function gb(t, e, i) {e.eachSeriesByType(t, function (t) {var e = t.getData(),n = e.mapDimension("value"),r = Sc(t, i),a = t.get("center"),o = t.get("radius");x(o) || (o = [0, o]), x(a) || (a = [a, a]);var s = Mo(r.width, i.getWidth()),l = Mo(r.height, i.getHeight()),u = Math.min(s, l),h = Mo(a[0], s) + r.x,c = Mo(a[1], l) + r.y,d = Mo(o[0], u / 2),f = Mo(o[1], u / 2),p = -t.get("startAngle") * pb,g = t.get("minAngle") * pb,v = 0;e.each(n, function (t) {!isNaN(t) && v++;});var m = e.getSum(n),y = Math.PI / (m || v) * 2,_ = t.get("clockwise"),w = t.get("roseType"),b = t.get("stillShowZeroSum"),M = e.getDataExtent(n);M[0] = 0;var S = fb,T = 0,I = p,C = _ ? 1 : -1;if (e.each(n, function (t, i) {var n;if (isNaN(t)) return void e.setItemLayout(i, { angle: 0 / 0, startAngle: 0 / 0, endAngle: 0 / 0, clockwise: _, cx: h, cy: c, r0: d, r: w ? 0 / 0 : f, viewRect: r });n = "area" !== w ? 0 === m && b ? y : t * y : fb / v, g > n ? (n = g, S -= g) : T += t;var a = I + C * n;e.setItemLayout(i, { angle: n, startAngle: I, endAngle: a, clockwise: _, cx: h, cy: c, r0: d, r: w ? bo(t, M, [d, f]) : f, viewRect: r }), I = a;}), fb > S && v) if (.001 >= S) {var D = fb / v;e.each(n, function (t, i) {if (!isNaN(t)) {var n = e.getItemLayout(i);n.angle = D, n.startAngle = p + C * i * D, n.endAngle = p + C * (i + 1) * D;}});} else y = S / T, I = p, e.each(n, function (t, i) {if (!isNaN(t)) {var n = e.getItemLayout(i),r = n.angle === g ? g : t * y;n.startAngle = I, n.endAngle = I + C * r, I += C * r;}});db(t, f, r.width, r.height, r.x, r.y);});},vb = function vb(t) {return { seriesType: t, reset: function reset(t, e) {var i = e.findComponents({ mainType: "legend" });if (i && i.length) {var n = t.getData();n.filterSelf(function (t) {for (var e = n.getName(t), r = 0; r < i.length; r++) {if (!i[r].isSelected(e)) return !1;}return !0;});}} };};ub("pie", [{ type: "pieToggleSelect", event: "pieselectchanged", method: "toggleSelected" }, { type: "pieSelect", event: "pieselected", method: "select" }, { type: "pieUnSelect", event: "pieunselected", method: "unSelect" }]), ku(hb("pie")), Du(_(gb, "pie")), Mu(vb("pie"));for (var mb = [126, 25], yb = [[[0, 3.5], [7, 11.2], [15, 11.9], [30, 7], [42, .7], [52, .7], [56, 7.7], [59, .7], [64, .7], [64, 0], [5, 0], [0, 3.5]], [[13, 16.1], [19, 14.7], [16, 21.7], [11, 23.1], [13, 16.1]], [[12, 32.2], [14, 38.5], [15, 38.5], [13, 32.2], [12, 32.2]], [[16, 47.6], [12, 53.2], [13, 53.2], [18, 47.6], [16, 47.6]], [[6, 64.4], [8, 70], [9, 70], [8, 64.4], [6, 64.4]], [[23, 82.6], [29, 79.8], [30, 79.8], [25, 82.6], [23, 82.6]], [[37, 70.7], [43, 62.3], [44, 62.3], [39, 70.7], [37, 70.7]], [[48, 51.1], [51, 45.5], [53, 45.5], [50, 51.1], [48, 51.1]], [[51, 35], [51, 28.7], [53, 28.7], [53, 35], [51, 35]], [[52, 22.4], [55, 17.5], [56, 17.5], [53, 22.4], [52, 22.4]], [[58, 12.6], [62, 7], [63, 7], [60, 12.6], [58, 12.6]], [[0, 3.5], [0, 93.1], [64, 93.1], [64, 0], [63, 0], [63, 92.4], [1, 92.4], [1, 3.5], [0, 3.5]]], _b = 0; _b < yb.length; _b++) {for (var xb = 0; xb < yb[_b].length; xb++) {yb[_b][xb][0] /= 10.5, yb[_b][xb][1] /= -14, yb[_b][xb][0] += mb[0], yb[_b][xb][1] += mb[1];}}var wb = function wb(t, e) {"china" === t && e.push(new Qh("南海诸岛", p(yb, function (t) {return { type: "polygon", exterior: t };}), mb));},bb = { "南海诸岛": [32, 80], "广东": [0, -10], "香港": [10, 5], "澳门": [-10, 10], "天津": [5, 5] },Mb = function Mb(t, e) {if ("china" === t) {var i = bb[e.name];if (i) {var n = e.center;n[0] += i[0] / 10.5, n[1] += -i[1] / 14;}}},Sb = { Russia: [100, 60], "United States": [-99, 38], "United States of America": [-99, 38] },Tb = function Tb(t, e) {if ("world" === t) {var i = Sb[e.name];if (i) {var n = e.center;n[0] = i[0], n[1] = i[1];}}},Ib = [[[123.45165252685547, 25.73527164402261], [123.49731445312499, 25.73527164402261], [123.49731445312499, 25.750734064600884], [123.45165252685547, 25.750734064600884], [123.45165252685547, 25.73527164402261]]],Cb = function Cb(t, e) {"china" === t && "台湾" === e.name && e.geometries.push({ type: "polygon", exterior: Ib[0] });},Db = hr(),kb = { load: function load(t, e, i) {var n = Db(e).parsed;if (n) return n;var r,a = e.specialAreas || {},o = e.geoJSON;try {r = o ? Qw(o, i) : [];} catch (s) {throw new Error("Invalid geoJson format\n" + s.message);}return wb(t, r), f(r, function (e) {var i = e.name;Mb(t, e), Tb(t, e), Cb(t, e);var n = a[i];n && e.transformTo(n.left, n.top, n.width, n.height);}), Db(e).parsed = { regions: r, boundingRect: Tc(r) };} },Ab = hr(),Pb = { load: function load(t, e) {var i = Ab(e).originRoot;if (i) return { root: i, boundingRect: Ab(e).boundingRect };var n = Ic(e);return Ab(e).originRoot = n.root, Ab(e).boundingRect = n.boundingRect, n;}, makeGraphic: function makeGraphic(t, e, i) {var n = Ab(e),r = n.rootMap || (n.rootMap = N()),a = r.get(i);if (a) return a;var o = n.originRoot,s = n.boundingRect;return n.originRootHostKey ? a = Ic(e, s).root : (n.originRootHostKey = i, a = o), r.set(i, a);}, removeGraphic: function removeGraphic(t, e, i) {var n = Ab(e),r = n.rootMap;r && r.removeKey(i), i === n.originRootHostKey && (n.originRootHostKey = null);} },Lb = { geoJSON: kb, svg: Pb },Ob = { load: function load(t, e, i) {var n,r = [],a = N(),o = N(),s = Dc(t);return f(s, function (s) {var l = Lb[s.type].load(t, s, i);f(l.regions, function (t) {var i = t.name;e && e.hasOwnProperty(i) && (t = t.cloneShallow(i = e[i])), r.push(t), a.set(i, t), o.set(i, t.center);});var u = l.boundingRect;u && (n ? n.union(u) : n = u.clone());}), { regions: r, regionsMap: a, nameCoordMap: o, boundingRect: n || new Ii(0, 0, 0, 0) };}, makeGraphic: Cc("makeGraphic"), removeGraphic: Cc("removeGraphic") },Rb = M_.extend({ type: "series.map", dependencies: ["geo"], layoutMode: "box", needsDrawMap: !1, seriesGroup: [], getInitialData: function getInitialData() {for (var t = ab(this, { coordDimensions: ["value"], encodeDefaulter: _(gs, this) }), e = t.mapDimension("value"), i = N(), n = [], r = [], a = 0, o = t.count(); o > a; a++) {var s = t.getName(a);i.set(s, !0), n.push({ name: s, value: t.get(e, a), selected: tl(t, a, "selected") });}var l = Ob.load(this.getMapType(), this.option.nameMap, this.option.nameProperty);return f(l.regions, function (t) {var e = t.name;i.get(e) || (n.push({ name: e }), r.push(e));}), this.updateSelectedMap(n), t.appendValues([], r), t;}, getHostGeoModel: function getHostGeoModel() {var t = this.option.geoIndex;return null != t ? this.dependentModels.geo[t] : null;}, getMapType: function getMapType() {return (this.getHostGeoModel() || this).option.map;}, getRawValue: function getRawValue(t) {var e = this.getData();return e.get(e.mapDimension("value"), t);}, getRegionModel: function getRegionModel(t) {var e = this.getData();return e.getItemModel(e.indexOfName(t));}, formatTooltip: function formatTooltip(t) {for (var e = this.getData(), i = Fo(this.getRawValue(t)), n = e.getName(t), r = this.seriesGroup, a = [], o = 0; o < r.length; o++) {var s = r[o].originalData.indexOfName(n),l = e.mapDimension("value");isNaN(r[o].originalData.get(l, s)) || a.push(Ho(r[o].name));}return a.join(", ") + "<br />" + Ho(n + " : " + i);}, getTooltipPosition: function getTooltipPosition(t) {if (null != t) {var e = this.getData().getName(t),i = this.coordinateSystem,n = i.getRegion(e);return n && i.dataToPoint(n.center);}}, setZoom: function setZoom(t) {this.option.zoom = t;}, setCenter: function setCenter(t) {this.option.center = t;}, defaultOption: { zlevel: 0, z: 2, coordinateSystem: "geo", map: "", left: "center", top: "center", aspectScale: .75, showLegendSymbol: !0, dataRangeHoverLink: !0, boundingCoords: null, center: null, zoom: 1, scaleLimit: null, label: { show: !1, color: "#000" }, itemStyle: { borderWidth: .5, borderColor: "#444", areaColor: "#eee" }, emphasis: { label: { show: !0, color: "rgb(100,0,0)" }, itemStyle: { areaColor: "rgba(255,215,0,0.8)" } }, nameProperty: "name" } });c(Rb, ob);var zb = "\x00_ec_interaction_mutex";Tu({ type: "takeGlobalCursor", event: "globalCursorTaken", update: "update" }, function () {}), c(Pc, wp);var Bb = { axisPointer: 1, tooltip: 1, brush: 1 };Uc.prototype = { constructor: Uc, draw: function draw(t, e, i, n, r) {var a = "geo" === t.mainType,o = t.getData && t.getData();a && e.eachComponent({ mainType: "series", subType: "map" }, function (e) {o || e.getHostGeoModel() !== t || (o = e.getData());});var s = t.coordinateSystem;this._updateBackground(s);var l,u = this._regionsGroup,h = this.group,c = s.getTransformInfo(),d = !u.childAt(0) || r;if (d) h.transform = c.roamTransform, h.decomposeTransform(), h.dirty();else {var p = new Np();p.transform = c.roamTransform, p.decomposeTransform();var g = { scale: p.scale, position: p.position };l = p.scale, eo(h, g, t);}var v = c.rawScale,m = c.rawPosition;u.removeAll();var y = ["itemStyle"],_ = ["emphasis", "itemStyle"],x = ["label"],w = ["emphasis", "label"],b = N();f(s.regions, function (e) {var i = b.get(e.name) || b.set(e.name, new fg()),n = new Um({ segmentIgnoreThreshold: 1, shape: { paths: [] } });i.add(n);var r,s = t.getRegionModel(e.name) || t,c = s.getModel(y),p = s.getModel(_),g = Gc(c),M = Gc(p),S = s.getModel(x),T = s.getModel(w);if (o) {r = o.indexOfName(e.name);var I = o.getItemVisual(r, "color", !0);I && (g.fill = I);}var C = function C(t) {return [t[0] * v[0] + m[0], t[1] * v[1] + m[1]];};f(e.geometries, function (t) {if ("polygon" === t.type) {for (var e = [], i = 0; i < t.exterior.length; ++i) {e.push(C(t.exterior[i]));}n.shape.paths.push(new Bm({ segmentIgnoreThreshold: 1, shape: { points: e } }));for (var i = 0; i < (t.interiors ? t.interiors.length : 0); ++i) {for (var r = t.interiors[i], e = [], a = 0; a < r.length; ++a) {e.push(C(r[a]));}n.shape.paths.push(new Bm({ segmentIgnoreThreshold: 1, shape: { points: e } }));}}}), n.setStyle(g), n.style.strokeNoScale = !0, n.culling = !0;var D = S.get("show"),k = T.get("show"),A = o && isNaN(o.get(o.mapDimension("value"), r)),P = o && o.getItemLayout(r);if (a || A && (D || k) || P && P.showLabel) {var L,O = a ? e.name : r;(!o || r >= 0) && (L = t);var R = new Dm({ position: C(e.center.slice()), scale: [1 / h.scale[0], 1 / h.scale[1]], z2: 10, silent: !0 });if (Ga(R.style, R.hoverStyle = {}, S, T, { labelFetcher: L, labelDataIndex: O, defaultText: e.name, useInsideStyle: !1 }, { textAlign: "center", textVerticalAlign: "middle" }), !d) {var z = [1 / l[0], 1 / l[1]];eo(R, { scale: z }, t);}i.add(R);}if (o) o.setItemGraphicEl(r, i);else {var s = t.getRegionModel(e.name);n.eventData = { componentType: "geo", componentIndex: t.componentIndex, geoIndex: t.componentIndex, name: e.name, region: s && s.option || {} };}var B = i.__regions || (i.__regions = []);B.push(e), i.highDownSilentOnTouch = !!t.get("selectedMode"), Fa(i, M), u.add(i);}), this._updateController(t, e, i), Xc(this, t, u, i, n), Yc(t, u);}, remove: function remove() {this._regionsGroup.removeAll(), this._backgroundGroup.removeAll(), this._controller.dispose(), this._mapName && Ob.removeGraphic(this._mapName, this.uid), this._mapName = null, this._controllerHost = {};}, _updateBackground: function _updateBackground(t) {var e = t.map;this._mapName !== e && f(Ob.makeGraphic(e, this.uid), function (t) {this._backgroundGroup.add(t);}, this), this._mapName = e;}, _updateController: function _updateController(t, e, i) {function n() {var e = { type: "geoRoam", componentType: l };return e[l + "Id"] = t.id, e;}var r = t.coordinateSystem,a = this._controller,s = this._controllerHost;s.zoomLimit = t.get("scaleLimit"), s.zoom = r.getZoom(), a.enable(t.get("roam") || !1);var l = t.mainType;a.off("pan").on("pan", function (t) {this._mouseDownFlag = !1, Vc(s, t.dx, t.dy), i.dispatchAction(o(n(), { dx: t.dx, dy: t.dy }));}, this), a.off("zoom").on("zoom", function (t) {if (this._mouseDownFlag = !1, Hc(s, t.scale, t.originX, t.originY), i.dispatchAction(o(n(), { zoom: t.scale, originX: t.originX, originY: t.originY })), this._updateGroup) {var e = this.group.scale;this._regionsGroup.traverse(function (t) {"text" === t.type && t.attr("scale", [1 / e[0], 1 / e[1]]);});}}, this), a.setPointerChecker(function (e, n, a) {return r.getViewRectAfterRoam().contain(n, a) && !Wc(e, i, t);});} };var Eb = "__seriesMapHighDown",Nb = "__seriesMapCallKey";zu({ type: "map", render: function render(t, e, i, n) {if (!n || "mapToggleSelect" !== n.type || n.from !== this.uid) {var r = this.group;if (r.removeAll(), !t.getHostGeoModel()) {if (n && "geoRoam" === n.type && "series" === n.componentType && n.seriesId === t.id) {var a = this._mapDraw;a && r.add(a.group);} else if (t.needsDrawMap) {var a = this._mapDraw || new Uc(i, !0);r.add(a.group), a.draw(t, e, i, this, n), this._mapDraw = a;} else this._mapDraw && this._mapDraw.remove(), this._mapDraw = null;t.get("showLegendSymbol") && e.getComponent("legend") && this._renderSymbols(t, e, i);}}}, remove: function remove() {this._mapDraw && this._mapDraw.remove(), this._mapDraw = null, this.group.removeAll();}, dispose: function dispose() {this._mapDraw && this._mapDraw.remove(), this._mapDraw = null;}, _renderSymbols: function _renderSymbols(t) {var e = t.originalData,i = this.group;e.each(e.mapDimension("value"), function (n, r) {if (!isNaN(n)) {var a = e.getItemLayout(r);if (a && a.point) {var s = a.point,l = a.offset,u = new km({ style: { fill: t.getData().getVisual("color") }, shape: { cx: s[0] + 9 * l, cy: s[1], r: 3 }, silent: !0, z2: 8 + (l ? 0 : ty + 1) });if (!l) {var h = t.mainSeries.getData(),c = e.getName(r),d = h.indexOfName(c),f = e.getItemModel(r),p = f.getModel("label"),g = f.getModel("emphasis.label"),v = h.getItemGraphicEl(d),m = k(t.getFormattedLabel(d, "normal"), c),y = k(t.getFormattedLabel(d, "emphasis"), m),x = v[Eb],w = Math.random();if (!x) {x = v[Eb] = {};var b = _(qc, !0),M = _(qc, !1);v.on("mouseover", b).on("mouseout", M).on("emphasis", b).on("normal", M);}v[Nb] = w, o(x, { recordVersion: w, circle: u, labelModel: p, hoverLabelModel: g, emphasisText: y, normalText: m }), jc(x, !1);}i.add(u);}}});} }), Tu({ type: "geoRoam", event: "geoRoam", update: "updateTransform" }, function (t, e) {var i = t.componentType || "series";e.eachComponent({ mainType: i, query: t }, function (e) {var n = e.coordinateSystem;if ("geo" === n.type) {var r = Zc(n, t, e.get("scaleLimit"));e.setCenter && e.setCenter(r.center), e.setZoom && e.setZoom(r.zoom), "series" === i && f(e.seriesGroup, function (t) {t.setCenter(r.center), t.setZoom(r.zoom);
        });}});});var Fb = ae;c(Kc, Np), $c.prototype = { constructor: $c, type: "view", dimensions: ["x", "y"], setBoundingRect: function setBoundingRect(t, e, i, n) {return this._rect = new Ii(t, e, i, n), this._rect;}, getBoundingRect: function getBoundingRect() {return this._rect;}, setViewRect: function setViewRect(t, e, i, n) {this.transformTo(t, e, i, n), this._viewRect = new Ii(t, e, i, n);}, transformTo: function transformTo(t, e, i, n) {var r = this.getBoundingRect(),a = this._rawTransformable;a.transform = r.calculateTransform(new Ii(t, e, i, n)), a.decomposeTransform(), this._updateTransform();}, setCenter: function setCenter(t) {t && (this._center = t, this._updateCenterAndZoom());}, setZoom: function setZoom(t) {t = t || 1;var e = this.zoomLimit;e && (null != e.max && (t = Math.min(e.max, t)), null != e.min && (t = Math.max(e.min, t))), this._zoom = t, this._updateCenterAndZoom();}, getDefaultCenter: function getDefaultCenter() {var t = this.getBoundingRect(),e = t.x + t.width / 2,i = t.y + t.height / 2;return [e, i];}, getCenter: function getCenter() {return this._center || this.getDefaultCenter();}, getZoom: function getZoom() {return this._zoom || 1;}, getRoamTransform: function getRoamTransform() {return this._roamTransformable.getLocalTransform();}, _updateCenterAndZoom: function _updateCenterAndZoom() {var t = this._rawTransformable.getLocalTransform(),e = this._roamTransformable,i = this.getDefaultCenter(),n = this.getCenter(),r = this.getZoom();n = ae([], n, t), i = ae([], i, t), e.origin = n, e.position = [i[0] - n[0], i[1] - n[1]], e.scale = [r, r], this._updateTransform();}, _updateTransform: function _updateTransform() {var t = this._roamTransformable,e = this._rawTransformable;e.parent = t, t.updateTransform(), e.updateTransform(), ze(this.transform || (this.transform = []), e.transform || Oe()), this._rawTransform = e.getLocalTransform(), this.invTransform = this.invTransform || [], Ve(this.invTransform, this.transform), this.decomposeTransform();}, getTransformInfo: function getTransformInfo() {var t = this._roamTransformable.transform,e = this._rawTransformable;return { roamTransform: t ? P(t) : Oe(), rawScale: P(e.scale), rawPosition: P(e.position) };}, getViewRect: function getViewRect() {return this._viewRect;}, getViewRectAfterRoam: function getViewRectAfterRoam() {var t = this.getBoundingRect().clone();return t.applyTransform(this.transform), t;}, dataToPoint: function dataToPoint(t, e, i) {var n = e ? this._rawTransform : this.transform;return i = i || [], n ? Fb(i, t, n) : W(i, t);}, pointToData: function pointToData(t) {var e = this.invTransform;return e ? Fb([], t, e) : [t[0], t[1]];}, convertToPixel: _(Qc, "dataToPoint"), convertFromPixel: _(Qc, "pointToData"), containPoint: function containPoint(t) {return this.getViewRectAfterRoam().contain(t[0], t[1]);} }, c($c, Np), Jc.prototype = { constructor: Jc, type: "geo", dimensions: ["lng", "lat"], containCoord: function containCoord(t) {for (var e = this.regions, i = 0; i < e.length; i++) {if (e[i].contain(t)) return !0;}return !1;}, transformTo: function transformTo(t, e, i, n) {var r = this.getBoundingRect(),a = this._invertLongitute;r = r.clone(), a && (r.y = -r.y - r.height);var o = this._rawTransformable;if (o.transform = r.calculateTransform(new Ii(t, e, i, n)), o.decomposeTransform(), a) {var s = o.scale;s[1] = -s[1];}o.updateTransform(), this._updateTransform();}, getRegion: function getRegion(t) {return this._regionsMap.get(t);}, getRegionByCoord: function getRegionByCoord(t) {for (var e = this.regions, i = 0; i < e.length; i++) {if (e[i].contain(t)) return e[i];}}, addGeoCoord: function addGeoCoord(t, e) {this._nameCoordMap.set(t, e);}, getGeoCoord: function getGeoCoord(t) {return this._nameCoordMap.get(t);}, getBoundingRect: function getBoundingRect() {return this._rect;}, dataToPoint: function dataToPoint(t, e, i) {return "string" == typeof t && (t = this.getGeoCoord(t)), t ? $c.prototype.dataToPoint.call(this, t, e, i) : void 0;}, convertToPixel: _(td, "dataToPoint"), convertFromPixel: _(td, "pointToData") }, c(Jc, $c);var Vb = { dimensions: Jc.prototype.dimensions, create: function create(t, e) {var i = [];t.eachComponent("geo", function (t, n) {var r = t.get("map"),a = t.get("aspectScale"),o = !0,s = ox.retrieveMap(r);s && s[0] && "svg" === s[0].type ? (null == a && (a = 1), o = !1) : null == a && (a = .75);var l = new Jc(r + n, r, t.get("nameMap"), o);l.aspectScale = a, l.zoomLimit = t.get("scaleLimit"), i.push(l), id(l, t), t.coordinateSystem = l, l.model = t, l.resize = ed, l.resize(t, e);}), t.eachSeries(function (t) {var e = t.get("coordinateSystem");if ("geo" === e) {var n = t.get("geoIndex") || 0;t.coordinateSystem = i[n];}});var n = {};return t.eachSeriesByType("map", function (t) {if (!t.getHostGeoModel()) {var e = t.getMapType();n[e] = n[e] || [], n[e].push(t);}}), f(n, function (t, n) {var r = p(t, function (t) {return t.get("nameMap");}),o = new Jc(n, n, a(r));o.zoomLimit = D.apply(null, p(t, function (t) {return t.get("scaleLimit");})), i.push(o), o.resize = ed, o.aspectScale = t[0].get("aspectScale"), o.resize(t[0], e), f(t, function (t) {t.coordinateSystem = o, id(o, t);});}), i;}, getFilledRegions: function getFilledRegions(t, e, i) {for (var n = (t || []).slice(), r = N(), a = 0; a < n.length; a++) {r.set(n[a].name, n[a]);}var o = Ob.load(e, i);return f(o.regions, function (t) {var e = t.name;!r.get(e) && n.push({ name: e });}), n;} };Iu("geo", Vb);var Hb = function Hb(t) {var e = {};t.eachSeriesByType("map", function (i) {var n = i.getMapType();if (!i.getHostGeoModel() && !e[n]) {var r = {};f(i.seriesGroup, function (e) {var i = e.coordinateSystem,n = e.originalData;e.get("showLegendSymbol") && t.getComponent("legend") && n.each(n.mapDimension("value"), function (t, e) {var a = n.getName(e),o = i.getRegion(a);if (o && !isNaN(t)) {var s = r[a] || 0,l = i.dataToPoint(o.center);r[a] = s + 1, n.setItemLayout(e, { point: l, offset: s });}});});var a = i.getData();a.each(function (t) {var e = a.getName(t),i = a.getItemLayout(t) || {};i.showLabel = !r[e], a.setItemLayout(t, i);}), e[n] = !0;}});},Wb = function Wb(t) {t.eachSeriesByType("map", function (t) {var e = t.get("color"),i = t.getModel("itemStyle"),n = i.get("areaColor"),r = i.get("color") || e[t.seriesIndex % e.length];t.getData().setVisual({ areaColor: n, color: r });});},Gb = function Gb(t) {var e = {};t.eachSeriesByType("map", function (t) {var i = t.getHostGeoModel(),n = i ? "o" + i.id : "i" + t.getMapType();(e[n] = e[n] || []).push(t);}), f(e, function (t) {for (var e = nd(p(t, function (t) {return t.getData();}), t[0].get("mapValueCalculation")), i = 0; i < t.length; i++) {t[i].originalData = t[i].getData();}for (var i = 0; i < t.length; i++) {t[i].seriesGroup = t, t[i].needsDrawMap = 0 === i && !t[i].getHostGeoModel(), t[i].setData(e.cloneShallow()), t[i].mainSeries = t[0];}});},Xb = function Xb(t) {var e = [];f(t.series, function (t) {t && "map" === t.type && (e.push(t), t.map = t.map || t.mapType, s(t, t.mapLocation));});};Du(Hb), ku(Wb), Mu(Dx.PROCESSOR.STATISTIC, Gb), bu(Xb), ub("map", [{ type: "mapToggleSelect", event: "mapselectchanged", method: "toggleSelected" }, { type: "mapSelect", event: "mapselected", method: "select" }, { type: "mapUnSelect", event: "mapunselected", method: "unSelect" }]);var Yb = By.extend({ type: "geo", coordinateSystem: null, layoutMode: "box", init: function init(t) {By.prototype.init.apply(this, arguments), er(t, "label", ["show"]);}, optionUpdated: function optionUpdated() {var t = this.option,e = this;t.regions = Vb.getFilledRegions(t.regions, t.map, t.nameMap), this._optionModelMap = g(t.regions || [], function (t, i) {return i.name && t.set(i.name, new go(i, e)), t;}, N()), this.updateSelectedMap(t.regions);}, defaultOption: { zlevel: 0, z: 0, show: !0, left: "center", top: "center", aspectScale: null, silent: !1, map: "", boundingCoords: null, center: null, zoom: 1, scaleLimit: null, label: { show: !1, color: "#000" }, itemStyle: { borderWidth: .5, borderColor: "#444", color: "#eee" }, emphasis: { label: { show: !0, color: "rgb(100,0,0)" }, itemStyle: { color: "rgba(255,215,0,0.8)" } }, regions: [] }, getRegionModel: function getRegionModel(t) {return this._optionModelMap.get(t) || new go(null, this, this.ecModel);}, getFormattedLabel: function getFormattedLabel(t, e) {var i = this.getRegionModel(t),n = i.get("label" + ("normal" === e ? "." : e + ".") + "formatter"),r = { name: t };return "function" == typeof n ? (r.status = e, n(r)) : "string" == typeof n ? n.replace("{a}", null != t ? t : "") : void 0;}, setZoom: function setZoom(t) {this.option.zoom = t;}, setCenter: function setCenter(t) {this.option.center = t;} });c(Yb, ob), Ou({ type: "geo", init: function init(t, e) {var i = new Uc(e, !0);this._mapDraw = i, this.group.add(i.group);}, render: function render(t, e, i, n) {if (!n || "geoToggleSelect" !== n.type || n.from !== this.uid) {var r = this._mapDraw;t.get("show") ? r.draw(t, e, i, this, n) : this._mapDraw.group.removeAll(), this.group.silent = t.get("silent");}}, dispose: function dispose() {this._mapDraw && this._mapDraw.remove();} }), rd("toggleSelected", { type: "geoToggleSelect", event: "geoselectchanged" }), rd("select", { type: "geoSelect", event: "geoselected" }), rd("unSelect", { type: "geoUnSelect", event: "geounselected" }), Lu({ type: "title", layoutMode: { type: "box", ignoreSize: !0 }, defaultOption: { zlevel: 0, z: 6, show: !0, text: "", target: "blank", subtext: "", subtarget: "blank", left: 0, top: 0, backgroundColor: "rgba(0,0,0,0)", borderColor: "#ccc", borderWidth: 0, padding: 5, itemGap: 10, textStyle: { fontSize: 18, fontWeight: "bolder", color: "#333" }, subtextStyle: { color: "#aaa" } } }), Ou({ type: "title", render: function render(t, e, i) {if (this.group.removeAll(), t.get("show")) {var n = this.group,r = t.getModel("textStyle"),a = t.getModel("subtextStyle"),o = t.get("textAlign"),s = k(t.get("textBaseline"), t.get("textVerticalAlign")),l = new Dm({ style: Ya({}, r, { text: t.get("text"), textFill: r.getTextColor() }, { disableBox: !0 }), z2: 10 }),u = l.getBoundingRect(),h = t.get("subtext"),c = new Dm({ style: Ya({}, a, { text: h, textFill: a.getTextColor(), y: u.height + t.get("itemGap"), textVerticalAlign: "top" }, { disableBox: !0 }), z2: 10 }),d = t.get("link"),f = t.get("sublink"),p = t.get("triggerEvent", !0);l.silent = !d && !p, c.silent = !f && !p, d && l.on("click", function () {Ko(d, "_" + t.get("target"));}), f && c.on("click", function () {Ko(d, "_" + t.get("subtarget"));}), l.eventData = c.eventData = p ? { componentType: "title", componentIndex: t.componentIndex } : null, n.add(l), h && n.add(c);var g = n.getBoundingRect(),v = t.getBoxLayoutParams();v.width = g.width, v.height = g.height;var m = Qo(v, { width: i.getWidth(), height: i.getHeight() }, t.get("padding"));o || (o = t.get("left") || t.get("right"), "middle" === o && (o = "center"), "right" === o ? m.x += m.width : "center" === o && (m.x += m.width / 2)), s || (s = t.get("top") || t.get("bottom"), "center" === s && (s = "middle"), "bottom" === s ? m.y += m.height : "middle" === s && (m.y += m.height / 2), s = s || "top"), n.attr("position", [m.x, m.y]);var y = { textAlign: o, textVerticalAlign: s };l.setStyle(y), c.setStyle(y), g = n.getBoundingRect();var _ = m.margin,x = t.getItemStyle(["color", "opacity"]);x.fill = t.get("backgroundColor");var w = new Vm({ shape: { x: g.x - _[3], y: g.y - _[0], width: g.width + _[1] + _[3], height: g.height + _[0] + _[2], r: t.get("borderRadius") }, style: x, subPixelOptimize: !0, silent: !0 });n.add(w);}} });var Ub = f,qb = _,jb = function jb(t, e) {var i,n = [],r = t.seriesIndex;if (null == r || !(i = e.getSeriesByIndex(r))) return { point: [] };var a = i.getData(),o = ur(a, t);if (null == o || 0 > o || x(o)) return { point: [] };var s = a.getItemGraphicEl(o),l = i.coordinateSystem;if (i.getTooltipPosition) n = i.getTooltipPosition(o) || [];else if (l && l.dataToPoint) n = l.dataToPoint(a.getValues(p(l.dimensions, function (t) {return a.mapDimension(t);}), o, !0)) || [];else if (s) {var u = s.getBoundingRect().clone();u.applyTransform(s.transform), n = [u.x + u.width / 2, u.y + u.height / 2];}return { point: n, el: s };},Zb = f,Kb = _,$b = hr(),Qb = function Qb(t, e, i) {var n = t.currTrigger,r = [t.x, t.y],a = t,o = t.dispatchAction || y(i.dispatchAction, i),s = e.getComponent("axisPointer").coordSysAxesInfo;if (s) {Td(r) && (r = jb({ seriesIndex: a.seriesIndex, dataIndex: a.dataIndex }, e).point);var l = Td(r),u = a.axesInfo,h = s.axesInfo,c = "leave" === n || Td(r),d = {},f = {},p = { list: [], map: {} },g = { showPointer: Kb(yd, f), showTooltip: Kb(_d, p) };Zb(s.coordSysMap, function (t, e) {var i = l || t.containPoint(r);Zb(s.coordSysAxesInfo[e], function (t) {var e = t.axis,n = Md(u, t);if (!c && i && (!u || n)) {var a = n && n.value;null != a || l || (a = e.pointToData(r)), null != a && vd(t, a, g, !1, d);}});});var v = {};return Zb(h, function (t, e) {var i = t.linkGroup;i && !f[e] && Zb(i.axesInfo, function (e, n) {var r = f[n];if (e !== t && r) {var a = r.value;i.mapper && (a = t.axis.scale.parse(i.mapper(a, Sd(e), Sd(t)))), v[t.key] = a;}});}), Zb(v, function (t, e) {vd(h[e], t, g, !0, d);}), xd(f, h, d), wd(p, r, t, o), bd(h, o, i), d;}},Jb = (Lu({ type: "axisPointer", coordSysAxesInfo: null, defaultOption: { show: "auto", triggerOn: null, zlevel: 0, z: 50, type: "line", snap: !1, triggerTooltip: !0, value: null, status: null, link: [], animation: null, animationDurationUpdate: 200, lineStyle: { color: "#aaa", width: 1, type: "solid" }, shadowStyle: { color: "rgba(150,150,150,0.3)" }, label: { show: !0, formatter: null, precision: "auto", margin: 3, color: "#fff", padding: [5, 7, 5, 7], backgroundColor: "auto", borderColor: null, borderWidth: 0, shadowBlur: 3, shadowColor: "#aaa" }, handle: { show: !1, icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", size: 45, margin: 50, color: "#333", shadowBlur: 3, shadowColor: "#aaa", shadowOffsetX: 0, shadowOffsetY: 2, throttle: 40 } } }), hr()),tM = f,eM = Ou({ type: "axisPointer", render: function render(t, e, i) {var n = e.getComponent("tooltip"),r = t.get("triggerOn") || n && n.get("triggerOn") || "mousemove|click";Id("axisPointer", i, function (t, e, i) {"none" !== r && ("leave" === t || r.indexOf(t) >= 0) && i({ type: "updateAxisPointer", currTrigger: t, x: e && e.offsetX, y: e && e.offsetY });});}, remove: function remove(t, e) {Ld(e.getZr(), "axisPointer"), eM.superApply(this._model, "remove", arguments);}, dispose: function dispose(t, e) {Ld("axisPointer", e), eM.superApply(this._model, "dispose", arguments);} }),iM = hr(),nM = n,rM = y;Od.prototype = { _group: null, _lastGraphicKey: null, _handle: null, _dragging: !1, _lastValue: null, _lastStatus: null, _payloadInfo: null, animationThreshold: 15, render: function render(t, e, i, n) {var r = e.get("value"),a = e.get("status");if (this._axisModel = t, this._axisPointerModel = e, this._api = i, n || this._lastValue !== r || this._lastStatus !== a) {this._lastValue = r, this._lastStatus = a;var o = this._group,s = this._handle;if (!a || "hide" === a) return o && o.hide(), void (s && s.hide());o && o.show(), s && s.show();var l = {};this.makeElOption(l, r, t, e, i);var u = l.graphicKey;u !== this._lastGraphicKey && this.clear(i), this._lastGraphicKey = u;var h = this._moveAnimation = this.determineAnimation(t, e);if (o) {var c = _(Rd, e, h);this.updatePointerEl(o, l, c, e), this.updateLabelEl(o, l, c, e);} else o = this._group = new fg(), this.createPointerEl(o, l, t, e), this.createLabelEl(o, l, t, e), i.getZr().add(o);Nd(o, e, !0), this._renderHandle(r);}}, remove: function remove(t) {this.clear(t);}, dispose: function dispose(t) {this.clear(t);}, determineAnimation: function determineAnimation(t, e) {var i = e.get("animation"),n = t.axis,r = "category" === n.type,a = e.get("snap");if (!a && !r) return !1;if ("auto" === i || null == i) {var o = this.animationThreshold;if (r && n.getBandWidth() > o) return !0;if (a) {var s = dd(t).seriesDataCount,l = n.getExtent();return Math.abs(l[0] - l[1]) / s > o;}return !1;}return i === !0;}, makeElOption: function makeElOption() {}, createPointerEl: function createPointerEl(t, e) {var i = e.pointer;if (i) {var n = iM(t).pointerEl = new cy[i.type](nM(e.pointer));t.add(n);}}, createLabelEl: function createLabelEl(t, e, i, n) {if (e.label) {var r = iM(t).labelEl = new Vm(nM(e.label));t.add(r), Bd(r, n);}}, updatePointerEl: function updatePointerEl(t, e, i) {var n = iM(t).pointerEl;n && e.pointer && (n.setStyle(e.pointer.style), i(n, { shape: e.pointer.shape }));}, updateLabelEl: function updateLabelEl(t, e, i, n) {var r = iM(t).labelEl;r && (r.setStyle(e.label.style), i(r, { shape: e.label.shape, position: e.label.position }), Bd(r, n));}, _renderHandle: function _renderHandle(t) {if (!this._dragging && this.updateHandleTransform) {var e = this._axisPointerModel,i = this._api.getZr(),n = this._handle,r = e.getModel("handle"),a = e.get("status");if (!r.get("show") || !a || "hide" === a) return n && i.remove(n), void (this._handle = null);var o;this._handle || (o = !0, n = this._handle = uo(r.get("icon"), { cursor: "move", draggable: !0, onmousemove: function onmousemove(t) {Dp(t.event);}, onmousedown: rM(this._onHandleDragMove, this, 0, 0), drift: rM(this._onHandleDragMove, this), ondragend: rM(this._onHandleDragEnd, this) }), i.add(n)), Nd(n, e, !1);var s = ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];n.setStyle(r.getItemStyle(null, s));var l = r.get("size");x(l) || (l = [l, l]), n.attr("scale", [l[0] / 2, l[1] / 2]), _l(this, "_doDispatchAxisPointer", r.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, o);}}, _moveHandleToValue: function _moveHandleToValue(t, e) {Rd(this._axisPointerModel, !e && this._moveAnimation, this._handle, Ed(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));}, _onHandleDragMove: function _onHandleDragMove(t, e) {var i = this._handle;if (i) {this._dragging = !0;var n = this.updateHandleTransform(Ed(i), [t, e], this._axisModel, this._axisPointerModel);this._payloadInfo = n, i.stopAnimation(), i.attr(Ed(n)), iM(i).lastProp = null, this._doDispatchAxisPointer();}}, _doDispatchAxisPointer: function _doDispatchAxisPointer() {var t = this._handle;if (t) {var e = this._payloadInfo,i = this._axisModel;this._api.dispatchAction({ type: "updateAxisPointer", x: e.cursorPoint[0], y: e.cursorPoint[1], tooltipOption: e.tooltipOption, axesInfo: [{ axisDim: i.axis.dim, axisIndex: i.componentIndex }] });}}, _onHandleDragEnd: function _onHandleDragEnd() {this._dragging = !1;var t = this._handle;if (t) {var e = this._axisPointerModel.get("value");this._moveHandleToValue(e), this._api.dispatchAction({ type: "hideTip" });}}, getHandleTransform: null, updateHandleTransform: null, clear: function clear(t) {this._lastValue = null, this._lastStatus = null;var e = t.getZr(),i = this._group,n = this._handle;e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle = null, this._payloadInfo = null);}, doClear: function doClear() {}, buildLabel: function buildLabel(t, e, i) {return i = i || 0, { x: t[i], y: t[1 - i], width: e[i], height: e[1 - i] };} }, Od.prototype.constructor = Od, yr(Od);var aM = Math.PI,oM = function oM(t, e) {this.opt = e, this.axisModel = t, s(e, { labelOffset: 0, nameDirection: 1, tickDirection: 1, labelDirection: 1, silent: !0 }), this.group = new fg();var i = new fg({ position: e.position.slice(), rotation: e.rotation });i.updateTransform(), this._transform = i.transform, this._dumbGroup = i;};oM.prototype = { constructor: oM, hasBuilder: function hasBuilder(t) {return !!sM[t];}, add: function add(t) {sM[t].call(this);}, getGroup: function getGroup() {return this.group;} };var sM = { axisLine: function axisLine() {var t = this.opt,e = this.axisModel;if (e.get("axisLine.show")) {var i = this.axisModel.axis.getExtent(),n = this._transform,r = [i[0], 0],a = [i[1], 0];n && (ae(r, r, n), ae(a, a, n));var s = o({ lineCap: "round" }, e.getModel("axisLine.lineStyle").getLineStyle());this.group.add(new Wm({ anid: "line", subPixelOptimize: !0, shape: { x1: r[0], y1: r[1], x2: a[0], y2: a[1] }, style: s, strokeContainThreshold: t.strokeContainThreshold || 5, silent: !0, z2: 1 }));var l = e.get("axisLine.symbol"),u = e.get("axisLine.symbolSize"),h = e.get("axisLine.symbolOffset") || 0;if ("number" == typeof h && (h = [h, h]), null != l) {"string" == typeof l && (l = [l, l]), ("string" == typeof u || "number" == typeof u) && (u = [u, u]);var c = u[0],d = u[1];f([{ rotate: t.rotation + Math.PI / 2, offset: h[0], r: 0 }, { rotate: t.rotation - Math.PI / 2, offset: h[1], r: Math.sqrt((r[0] - a[0]) * (r[0] - a[0]) + (r[1] - a[1]) * (r[1] - a[1])) }], function (e, i) {if ("none" !== l[i] && null != l[i]) {var n = Uh(l[i], -c / 2, -d / 2, c, d, s.stroke, !0),a = e.r + e.offset,o = [r[0] + a * Math.cos(t.rotation), r[1] - a * Math.sin(t.rotation)];n.attr({ rotation: e.rotate, position: o, silent: !0, z2: 11 }), this.group.add(n);}}, this);}}}, axisTickLabel: function axisTickLabel() {var t = this.axisModel,e = this.opt,i = Yd(this, t, e),n = qd(this, t, e);Vd(t, n, i), Ud(this, t, e);}, axisName: function axisName() {var t = this.opt,e = this.axisModel,i = D(t.axisName, e.get("name"));if (i) {var n,r = e.get("nameLocation"),a = t.nameDirection,s = e.getModel("nameTextStyle"),l = e.get("nameGap") || 0,u = this.axisModel.axis.getExtent(),h = u[0] > u[1] ? -1 : 1,c = ["start" === r ? u[0] - h * l : "end" === r ? u[1] + h * l : (u[0] + u[1]) / 2, Gd(r) ? t.labelOffset + a * l : 0],d = e.get("nameRotate");null != d && (d = d * aM / 180);var f;Gd(r) ? n = uM(t.rotation, null != d ? d : t.rotation, a) : (n = Fd(t, r, d || 0, u), f = t.axisNameAvailableWidth, null != f && (f = Math.abs(f / Math.sin(n.rotation)), !isFinite(f) && (f = null)));var p = s.getFont(),g = e.get("nameTruncate", !0) || {},v = g.ellipsis,m = D(t.nameTruncateMaxWidth, g.maxWidth, f),y = null != v && null != m ? Dy(i, m, p, v, { minChar: 2, placeholder: g.placeholder }) : i,_ = e.get("tooltip", !0),x = e.mainType,w = { componentType: x, name: i, $vars: ["name"] };w[x + "Index"] = e.componentIndex;var b = new Dm({ anid: "name", __fullText: i, __truncatedText: y, position: c, rotation: n.rotation, silent: hM(e), z2: 1, tooltip: _ && _.show ? o({ content: i, formatter: function formatter() {return i;}, formatterParams: w }, _) : null });Ya(b.style, s, { text: y, textFont: p, textFill: s.getTextColor() || e.get("axisLine.lineStyle.color"), textAlign: s.get("align") || n.textAlign, textVerticalAlign: s.get("verticalAlign") || n.textVerticalAlign }), e.get("triggerEvent") && (b.eventData = lM(e), b.eventData.targetType = "axisName", b.eventData.name = i), this._dumbGroup.add(b), b.updateTransform(), this.group.add(b), b.decomposeTransform();}} },lM = oM.makeAxisEventDataBase = function (t) {var e = { componentType: t.mainType, componentIndex: t.componentIndex };return e[t.mainType + "Index"] = t.componentIndex, e;},uM = oM.innerTextLayout = function (t, e, i) {var n,r,a = Ao(e - t);return Po(a) ? (r = i > 0 ? "top" : "bottom", n = "center") : Po(a - aM) ? (r = i > 0 ? "bottom" : "top", n = "center") : (r = "middle", n = a > 0 && aM > a ? i > 0 ? "right" : "left" : i > 0 ? "left" : "right"), { rotation: a, textAlign: n, textVerticalAlign: r };},hM = oM.isLabelSilent = function (t) {var e = t.get("tooltip");return t.get("silent") || !(t.get("triggerEvent") || e && e.show);},cM = Ou({ type: "axis", _axisPointer: null, axisPointerClass: null, render: function render(t, e, i, n) {this.axisPointerClass && cd(t), cM.superApply(this, "render", arguments), rf(this, t, e, i, n, !0);}, updateAxisPointer: function updateAxisPointer(t, e, i, n) {rf(this, t, e, i, n, !1);}, remove: function remove(t, e) {var i = this._axisPointer;i && i.remove(e), cM.superApply(this, "remove", arguments);}, dispose: function dispose(t, e) {af(this, e), cM.superApply(this, "dispose", arguments);} }),dM = [];cM.registerAxisPointerClass = function (t, e) {dM[t] = e;}, cM.getAxisPointerClass = function (t) {return t && dM[t];};var fM = Od.extend({ makeElOption: function makeElOption(t, e, i, n, r) {var a = i.axis,o = a.grid,s = n.get("type"),l = of(o, a).getOtherAxis(a).getGlobalExtent(),u = a.toGlobalCoord(a.dataToCoord(e, !0));if (s && "none" !== s) {var h = jd(n),c = pM[s](a, u, l);c.style = h, t.graphicKey = c.type, t.pointer = c;}var d = nf(o.model, i);Jd(e, t, d, i, n, r);}, getHandleTransform: function getHandleTransform(t, e, i) {var n = nf(e.axis.grid.model, e, { labelInside: !1 });return n.labelMargin = i.get("handle.margin"), { position: Qd(e.axis, t, n), rotation: n.rotation + (n.labelDirection < 0 ? Math.PI : 0) };}, updateHandleTransform: function updateHandleTransform(t, e, i) {var n = i.axis,r = n.grid,a = n.getGlobalExtent(!0),o = of(r, n).getOtherAxis(n).getGlobalExtent(),s = "x" === n.dim ? 0 : 1,l = t.position;l[s] += e[s], l[s] = Math.min(a[1], l[s]), l[s] = Math.max(a[0], l[s]);var u = (o[1] + o[0]) / 2,h = [u, u];h[s] = l[s];var c = [{ verticalAlign: "middle" }, { align: "center" }];return { position: l, rotation: t.rotation, cursorPoint: h, tooltipOption: c[s] };} }),pM = { line: function line(t, e, i) {var n = tf([e, i[0]], [e, i[1]], sf(t));return { type: "Line", subPixelOptimize: !0, shape: n };}, shadow: function shadow(t, e, i) {var n = Math.max(1, t.getBandWidth()),r = i[1] - i[0];return { type: "Rect", shape: ef([e - n / 2, i[0]], [n, r], sf(t)) };} };cM.registerAxisPointerClass("CartesianAxisPointer", fM), bu(function (t) {if (t) {(!t.axisPointer || 0 === t.axisPointer.length) && (t.axisPointer = {});var e = t.axisPointer.link;e && !x(e) && (t.axisPointer.link = [e]);}}), Mu(Dx.PROCESSOR.STATISTIC, function (t, e) {t.getComponent("axisPointer").coordSysAxesInfo = ad(t, e);}), Tu({ type: "updateAxisPointer", event: "updateAxisPointer", update: ":updateAxisPointer" }, Qb), Lu({ type: "tooltip", dependencies: ["axisPointer"], defaultOption: { zlevel: 0, z: 60, show: !0, showContent: !0, trigger: "item", triggerOn: "mousemove|click", alwaysShowContent: !1, displayMode: "single", renderMode: "auto", confine: !1, showDelay: 0, hideDelay: 100, transitionDuration: .4, enterable: !1, backgroundColor: "rgba(50,50,50,0.7)", borderColor: "#333", borderRadius: 4, borderWidth: 0, padding: 5, extraCssText: "", axisPointer: { type: "line", axis: "auto", animation: "auto", animationDurationUpdate: 200, animationEasingUpdate: "exponentialOut", crossStyle: { color: "#999", width: 1, type: "dashed", textStyle: {} } }, textStyle: { color: "#fff", fontSize: 14 } } });var gM = f,vM = Vo,mM = ["", "-webkit-", "-moz-", "-o-"],yM = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;";df.prototype = { constructor: df, _enterable: !0, update: function update() {var t = this._container,e = t.currentStyle || document.defaultView.getComputedStyle(t),i = t.style;"absolute" !== i.position && "absolute" !== e.position && (i.position = "relative");}, show: function show(t) {clearTimeout(this._hideTimeout);var e = this.el,i = this._styleCoord;e.style.cssText = yM + hf(t) + ";left:" + i[0] + "px;top:" + i[1] + "px;" + (t.get("extraCssText") || ""), e.style.display = e.innerHTML ? "block" : "none", e.style.pointerEvents = this._enterable ? "auto" : "none", this._show = !0;}, setContent: function setContent(t) {this.el.innerHTML = null == t ? "" : t;}, setEnterable: function setEnterable(t) {this._enterable = t;}, getSize: function getSize() {var t = this.el;return [t.clientWidth, t.clientHeight];}, moveTo: function moveTo(t, e) {var i = this._styleCoord;cf(i, this._zr, this._appendToBody, t, e);var n = this.el.style;n.left = i[0] + "px", n.top = i[1] + "px";}, hide: function hide() {this.el.style.display = "none", this._show = !1;}, hideLater: function hideLater(t) {!this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(y(this.hide, this), t)) : this.hide());}, isShow: function isShow() {return this._show;}, dispose: function dispose() {this.el.parentNode.removeChild(this.el);}, getOuterSize: function getOuterSize() {var t = this.el.clientWidth,e = this.el.clientHeight;if (document.defaultView && document.defaultView.getComputedStyle) {var i = document.defaultView.getComputedStyle(this.el);i && (t += parseInt(i.borderLeftWidth, 10) + parseInt(i.borderRightWidth, 10), e += parseInt(i.borderTopWidth, 10) + parseInt(i.borderBottomWidth, 10));}return { width: t, height: e };} }, ff.prototype = { constructor: ff, _enterable: !0, update: function update() {}, show: function show() {this._hideTimeout && clearTimeout(this._hideTimeout), this.el.attr("show", !0), this._show = !0;}, setContent: function setContent(t, e, i) {this.el && this._zr.remove(this.el);for (var n = {}, r = t, a = "{marker", o = "|}", s = r.indexOf(a); s >= 0;) {var l = r.indexOf(o),u = r.substr(s + a.length, l - s - a.length);n["marker" + u] = u.indexOf("sub") > -1 ? { textWidth: 4, textHeight: 4, textBorderRadius: 2, textBackgroundColor: e[u], textOffset: [3, 0] } : { textWidth: 10, textHeight: 10, textBorderRadius: 5, textBackgroundColor: e[u] }, r = r.substr(l + 1), s = r.indexOf("{marker");}this.el = new Dm({ style: { rich: n, text: t, textLineHeight: 20, textBackgroundColor: i.get("backgroundColor"), textBorderRadius: i.get("borderRadius"), textFill: i.get("textStyle.color"), textPadding: i.get("padding") }, z: i.get("z") }), this._zr.add(this.el);var h = this;this.el.on("mouseover", function () {h._enterable && (clearTimeout(h._hideTimeout), h._show = !0), h._inContent = !0;}), this.el.on("mouseout", function () {h._enterable && h._show && h.hideLater(h._hideDelay), h._inContent = !1;});}, setEnterable: function setEnterable(t) {this._enterable = t;}, getSize: function getSize() {var t = this.el.getBoundingRect();return [t.width, t.height];}, moveTo: function moveTo(t, e) {this.el && this.el.attr("position", [t, e]);}, hide: function hide() {this.el && this.el.hide(), this._show = !1;}, hideLater: function hideLater(t) {!this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(y(this.hide, this), t)) : this.hide());}, isShow: function isShow() {return this._show;}, getOuterSize: function getOuterSize() {var t = this.getSize();return { width: t[0], height: t[1] };} };var _M = y,xM = f,wM = Mo,bM = new Vm({ shape: { x: -1, y: -1, width: 2, height: 2 } });Ou({ type: "tooltip", init: function init(t, e) {if (!Jf.node) {var i = t.getComponent("tooltip"),n = i.get("renderMode");this._renderMode = gr(n);var r;"html" === this._renderMode ? (r = new df(e.getDom(), e, { appendToBody: i.get("appendToBody", !0) }), this._newLine = "<br/>") : (r = new ff(e), this._newLine = "\n"), this._tooltipContent = r;}}, render: function render(t, e, i) {if (!Jf.node) {this.group.removeAll(), this._tooltipModel = t, this._ecModel = e, this._api = i, this._lastDataByCoordSys = null, this._alwaysShowContent = t.get("alwaysShowContent");var n = this._tooltipContent;n.update(), n.setEnterable(t.get("enterable")), this._initGlobalListener(), this._keepShow();}}, _initGlobalListener: function _initGlobalListener() {var t = this._tooltipModel,e = t.get("triggerOn");Id("itemTooltip", this._api, _M(function (t, i, n) {"none" !== e && (e.indexOf(t) >= 0 ? this._tryShow(i, n) : "leave" === t && this._hide(n));}, this));}, _keepShow: function _keepShow() {var t = this._tooltipModel,e = this._ecModel,i = this._api;if (null != this._lastX && null != this._lastY && "none" !== t.get("triggerOn")) {var n = this;clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function () {!i.isDisposed() && n.manuallyShowTip(t, e, i, { x: n._lastX, y: n._lastY });});}}, manuallyShowTip: function manuallyShowTip(t, e, i, n) {if (n.from !== this.uid && !Jf.node) {var r = gf(n, i);this._ticket = "";var a = n.dataByCoordSys;if (n.tooltip && null != n.x && null != n.y) {var o = bM;o.position = [n.x, n.y], o.update(), o.tooltip = n.tooltip, this._tryShow({ offsetX: n.x, offsetY: n.y, target: o }, r);} else if (a) this._tryShow({ offsetX: n.x, offsetY: n.y, position: n.position, dataByCoordSys: n.dataByCoordSys, tooltipOption: n.tooltipOption }, r);else if (null != n.seriesIndex) {if (this._manuallyAxisShowTip(t, e, i, n)) return;var s = jb(n, e),l = s.point[0],u = s.point[1];null != l && null != u && this._tryShow({ offsetX: l, offsetY: u, position: n.position, target: s.el }, r);} else null != n.x && null != n.y && (i.dispatchAction({ type: "updateAxisPointer", x: n.x, y: n.y }), this._tryShow({ offsetX: n.x, offsetY: n.y, position: n.position, target: i.getZr().findHover(n.x, n.y).target }, r));}}, manuallyHideTip: function manuallyHideTip(t, e, i, n) {var r = this._tooltipContent;!this._alwaysShowContent && this._tooltipModel && r.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = null, n.from !== this.uid && this._hide(gf(n, i));}, _manuallyAxisShowTip: function _manuallyAxisShowTip(t, e, i, n) {var r = n.seriesIndex,a = n.dataIndex,o = e.getComponent("axisPointer").coordSysAxesInfo;if (null != r && null != a && null != o) {var s = e.getSeriesByIndex(r);if (s) {var l = s.getData(),t = pf([l.getItemModel(a), s, (s.coordinateSystem || {}).model, t]);if ("axis" === t.get("trigger")) return i.dispatchAction({ type: "updateAxisPointer", seriesIndex: r, dataIndex: a, position: n.position }), !0;}}}, _tryShow: function _tryShow(t, e) {var i = t.target,n = this._tooltipModel;if (n) {this._lastX = t.offsetX, this._lastY = t.offsetY;var r = t.dataByCoordSys;r && r.length ? this._showAxisTooltip(r, t) : i && null != i.dataIndex ? (this._lastDataByCoordSys = null, this._showSeriesItemTooltip(t, i, e)) : i && i.tooltip ? (this._lastDataByCoordSys = null, this._showComponentItemTooltip(t, i, e)) : (this._lastDataByCoordSys = null, this._hide(e));}}, _showOrMove: function _showOrMove(t, e) {var i = t.get("showDelay");e = y(e, this), clearTimeout(this._showTimout), i > 0 ? this._showTimout = setTimeout(e, i) : e();}, _showAxisTooltip: function _showAxisTooltip(t, e) {var i = this._ecModel,n = this._tooltipModel,a = [e.offsetX, e.offsetY],o = [],s = [],l = pf([e.tooltipOption, n]),u = this._renderMode,h = this._newLine,c = {};xM(t, function (t) {xM(t.dataByAxis, function (t) {var e = i.getComponent(t.axisDim + "Axis", t.axisIndex),n = t.value,a = [];if (e && null != n) {var l = $d(n, e.axis, i, t.seriesDataIndices, t.valueLabelOpt);f(t.seriesDataIndices, function (o) {var h = i.getSeriesByIndex(o.seriesIndex),d = o.dataIndexInside,f = h && h.getDataParams(d);if (f.axisDim = t.axisDim, f.axisIndex = t.axisIndex, f.axisType = t.axisType, f.axisId = t.axisId, f.axisValue = Wh(e.axis, n), f.axisValueLabel = l, f) {s.push(f);var p,g = h.formatTooltip(d, !0, null, u);if (M(g)) {p = g.html;var v = g.markers;r(c, v);} else p = g;a.push(p);}});var d = l;o.push("html" !== u ? a.join(h) : (d ? Ho(d) + h : "") + a.join(h));}});}, this), o.reverse(), o = o.join(this._newLine + this._newLine);var d = e.position;this._showOrMove(l, function () {this._updateContentNotChangedOnAxis(t) ? this._updatePosition(l, d, a[0], a[1], this._tooltipContent, s) : this._showTooltipContent(l, o, s, Math.random(), a[0], a[1], d, void 0, c);});}, _showSeriesItemTooltip: function _showSeriesItemTooltip(t, e, i) {var n = this._ecModel,r = e.seriesIndex,a = n.getSeriesByIndex(r),o = e.dataModel || a,s = e.dataIndex,l = e.dataType,u = o.getData(l),h = pf([u.getItemModel(s), o, a && (a.coordinateSystem || {}).model, this._tooltipModel]),c = h.get("trigger");if (null == c || "item" === c) {var d,f,p = o.getDataParams(s, l),g = o.formatTooltip(s, !1, l, this._renderMode);M(g) ? (d = g.html, f = g.markers) : (d = g, f = null);var v = "item_" + o.name + "_" + s;this._showOrMove(h, function () {this._showTooltipContent(h, d, p, v, t.offsetX, t.offsetY, t.position, t.target, f);}), i({ type: "showTip", dataIndexInside: s, dataIndex: u.getRawIndex(s), seriesIndex: r, from: this.uid });}}, _showComponentItemTooltip: function _showComponentItemTooltip(t, e, i) {var n = e.tooltip;if ("string" == typeof n) {var r = n;n = { content: r, formatter: r };}var a = new go(n, this._tooltipModel, this._ecModel),o = a.get("content"),s = Math.random();this._showOrMove(a, function () {this._showTooltipContent(a, o, a.get("formatterParams") || {}, s, t.offsetX, t.offsetY, t.position, e);}), i({ type: "showTip", from: this.uid });}, _showTooltipContent: function _showTooltipContent(t, e, i, n, r, a, o, s, l) {if (this._ticket = "", t.get("showContent") && t.get("show")) {var u = this._tooltipContent,h = t.get("formatter");o = o || t.get("position");var c = e;if (h && "string" == typeof h) c = Wo(h, i, !0);else if ("function" == typeof h) {var d = _M(function (e, n) {e === this._ticket && (u.setContent(n, l, t), this._updatePosition(t, o, r, a, u, i, s));}, this);this._ticket = n, c = h(i, n, d);}u.setContent(c, l, t), u.show(t), this._updatePosition(t, o, r, a, u, i, s);}}, _updatePosition: function _updatePosition(t, e, i, n, r, a, o) {var s = this._api.getWidth(),l = this._api.getHeight();e = e || t.get("position");var u = r.getSize(),h = t.get("align"),c = t.get("verticalAlign"),d = o && o.getBoundingRect().clone();if (o && d.applyTransform(o.transform), "function" == typeof e && (e = e([i, n], a, r.el, d, { viewSize: [s, l], contentSize: u.slice() })), x(e)) i = wM(e[0], s), n = wM(e[1], l);else if (M(e)) {e.width = u[0], e.height = u[1];var f = Qo(e, { width: s, height: l });i = f.x, n = f.y, h = null, c = null;} else if ("string" == typeof e && o) {var p = yf(e, d, u);i = p[0], n = p[1];} else {var p = vf(i, n, r, s, l, h ? null : 20, c ? null : 20);i = p[0], n = p[1];}if (h && (i -= _f(h) ? u[0] / 2 : "right" === h ? u[0] : 0), c && (n -= _f(c) ? u[1] / 2 : "bottom" === c ? u[1] : 0), t.get("confine")) {var p = mf(i, n, r, s, l);
        i = p[0], n = p[1];}r.moveTo(i, n);}, _updateContentNotChangedOnAxis: function _updateContentNotChangedOnAxis(t) {var e = this._lastDataByCoordSys,i = !!e && e.length === t.length;return i && xM(e, function (e, n) {var r = e.dataByAxis || {},a = t[n] || {},o = a.dataByAxis || [];i &= r.length === o.length, i && xM(r, function (t, e) {var n = o[e] || {},r = t.seriesDataIndices || [],a = n.seriesDataIndices || [];i &= t.value === n.value && t.axisType === n.axisType && t.axisId === n.axisId && r.length === a.length, i && xM(r, function (t, e) {var n = a[e];i &= t.seriesIndex === n.seriesIndex && t.dataIndex === n.dataIndex;});});}), this._lastDataByCoordSys = t, !!i;}, _hide: function _hide(t) {this._lastDataByCoordSys = null, t({ type: "hideTip", from: this.uid });}, dispose: function dispose(t, e) {Jf.node || (this._tooltipContent.dispose(), Ld("itemTooltip", e));} }), Tu({ type: "showTip", event: "showTip", update: "tooltip:manuallyShowTip" }, function () {}), Tu({ type: "hideTip", event: "hideTip", update: "tooltip:manuallyHideTip" }, function () {});var MM = f,SM = function SM(t) {var e = t && t.visualMap;x(e) || (e = e ? [e] : []), MM(e, function (t) {if (t) {xf(t, "splitList") && !xf(t, "pieces") && (t.pieces = t.splitList, delete t.splitList);var e = t.pieces;e && x(e) && MM(e, function (t) {M(t) && (xf(t, "start") && !xf(t, "min") && (t.min = t.start), xf(t, "end") && !xf(t, "max") && (t.max = t.end));});}});};By.registerSubTypeDefaulter("visualMap", function (t) {return t.categories || (t.pieces ? t.pieces.length > 0 : t.splitNumber > 0) && !t.calculable ? "piecewise" : "continuous";});var TM = f,IM = M,CM = -1,DM = function DM(t) {var e = t.mappingMethod,i = t.type,r = this.option = n(t);this.type = i, this.mappingMethod = e, this._normalizeData = AM[e];var a = kM[i];this.applyVisual = a.applyVisual, this.getColorMapper = a.getColorMapper, this._doMap = a._doMap[e], "piecewise" === e ? (Mf(r), wf(r)) : "category" === e ? r.categories ? bf(r) : Mf(r, !0) : (O("linear" !== e || r.dataExtent), Mf(r));};DM.prototype = { constructor: DM, mapValueToVisual: function mapValueToVisual(t) {var e = this._normalizeData(t);return this._doMap(e, t);}, getNormalizer: function getNormalizer() {return y(this._normalizeData, this);} };var kM = DM.visualHandlers = { color: { applyVisual: If("color"), getColorMapper: function getColorMapper() {var t = this.option;return y("category" === t.mappingMethod ? function (t, e) {return !e && (t = this._normalizeData(t)), Cf.call(this, t);} : function (e, i, n) {var r = !!n;return !i && (e = this._normalizeData(e)), n = ai(e, t.parsedVisual, n), r ? n : ui(n, "rgba");}, this);}, _doMap: { linear: function linear(t) {return ui(ai(t, this.option.parsedVisual), "rgba");}, category: Cf, piecewise: function piecewise(t, e) {var i = Af.call(this, e);return null == i && (i = ui(ai(t, this.option.parsedVisual), "rgba")), i;}, fixed: Df } }, colorHue: Sf(function (t, e) {return si(t, e);}), colorSaturation: Sf(function (t, e) {return si(t, null, e);}), colorLightness: Sf(function (t, e) {return si(t, null, null, e);}), colorAlpha: Sf(function (t, e) {return li(t, e);}), opacity: { applyVisual: If("opacity"), _doMap: kf([0, 1]) }, liftZ: { applyVisual: If("liftZ"), _doMap: { linear: Df, category: Df, piecewise: Df, fixed: Df } }, symbol: { applyVisual: function applyVisual(t, e, i) {var n = this.mapValueToVisual(t);if (b(n)) i("symbol", n);else if (IM(n)) for (var r in n) {n.hasOwnProperty(r) && i(r, n[r]);}}, _doMap: { linear: Tf, category: Cf, piecewise: function piecewise(t, e) {var i = Af.call(this, e);return null == i && (i = Tf.call(this, t)), i;}, fixed: Df } }, symbolSize: { applyVisual: If("symbolSize"), _doMap: kf([0, 1]) } },AM = { linear: function linear(t) {return bo(t, this.option.dataExtent, [0, 1], !0);}, piecewise: function piecewise(t) {var e = this.option.pieceList,i = DM.findPieceIndex(t, e, !0);return null != i ? bo(i, [0, e.length - 1], [0, 1], !0) : void 0;}, category: function category(t) {var e = this.option.categories ? this.option.categoryMap[t] : t;return null == e ? CM : e;}, fixed: V };DM.listVisualTypes = function () {var t = [];return f(kM, function (e, i) {t.push(i);}), t;}, DM.addVisualHandler = function (t, e) {kM[t] = e;}, DM.isValidType = function (t) {return kM.hasOwnProperty(t);}, DM.eachVisual = function (t, e, i) {M(t) ? f(t, e, i) : e.call(i, t);}, DM.mapVisual = function (t, e, i) {var n,r = x(t) ? [] : M(t) ? {} : (n = !0, null);return DM.eachVisual(t, function (t, a) {var o = e.call(i, t, a);n ? r = o : r[a] = o;}), r;}, DM.retrieveVisuals = function (t) {var e,i = {};return t && TM(kM, function (n, r) {t.hasOwnProperty(r) && (i[r] = t[r], e = !0);}), e ? i : null;}, DM.prepareVisualTypes = function (t) {if (IM(t)) {var e = [];TM(t, function (t, i) {e.push(i);}), t = e;} else {if (!x(t)) return [];t = t.slice();}return t.sort(function (t, e) {return "color" === e && "color" !== t && 0 === t.indexOf("color") ? 1 : -1;}), t;}, DM.dependsOn = function (t, e) {return "color" === e ? !(!t || 0 !== t.indexOf(e)) : t === e;}, DM.findPieceIndex = function (t, e, i) {function n(e, i) {var n = Math.abs(e - t);a > n && (a = n, r = i);}for (var r, a = 1 / 0, o = 0, s = e.length; s > o; o++) {var l = e[o].value;if (null != l) {if (l === t || "string" == typeof l && l === t + "") return o;i && n(l, o);}}for (var o = 0, s = e.length; s > o; o++) {var u = e[o],h = u.interval,c = u.close;if (h) {if (h[0] === -1 / 0) {if (Lf(c[1], t, h[1])) return o;} else if (1 / 0 === h[1]) {if (Lf(c[0], h[0], t)) return o;} else if (Lf(c[0], h[0], t) && Lf(c[1], t, h[1])) return o;i && n(h[0], o), i && n(h[1], o);}}return i ? 1 / 0 === t ? e.length - 1 : t === -1 / 0 ? 0 : r : void 0;};var PM = f,LM = Dx.VISUAL.COMPONENT;ku(LM, { createOnAllSeries: !0, reset: function reset(t, e) {var i = [];return e.eachComponent("visualMap", function (e) {var n = t.pipelineContext;!e.isTargetSeries(t) || n && n.large || i.push(Bf(e.stateList, e.targetVisuals, y(e.getValueState, e), e.getDataDimension(t.getData())));}), i;} }), ku(LM, { createOnAllSeries: !0, reset: function reset(t, e) {var i = t.getData(),n = [];e.eachComponent("visualMap", function (e) {if (e.isTargetSeries(t)) {var r = e.getVisualMeta(y(Ef, null, t, e)) || { stops: [], outerColors: [] },a = e.getDataDimension(i),o = i.getDimensionInfo(a);null != o && (r.dimension = o.index, n.push(r));}}), t.getData().setVisual("visualMeta", n);} });var OM = { get: function get(t, e, i) {var r = n((RM[t] || {})[e]);return i && x(r) ? r[r.length - 1] : r;} },RM = { color: { active: ["#006edd", "#e0ffff"], inactive: ["rgba(0,0,0,0)"] }, colorHue: { active: [0, 360], inactive: [0, 0] }, colorSaturation: { active: [.3, 1], inactive: [0, 0] }, colorLightness: { active: [.9, .5], inactive: [0, 0] }, colorAlpha: { active: [.3, 1], inactive: [0, 0] }, opacity: { active: [.3, 1], inactive: [0, 0] }, symbol: { active: ["circle", "roundRect", "diamond"], inactive: ["none"] }, symbolSize: { active: [10, 50], inactive: [0, 0] } },zM = DM.mapVisual,BM = DM.eachVisual,EM = x,NM = f,FM = To,VM = bo,HM = V,WM = Lu({ type: "visualMap", dependencies: ["series"], stateList: ["inRange", "outOfRange"], replacableOptionKeys: ["inRange", "outOfRange", "target", "controller", "color"], dataBound: [-1 / 0, 1 / 0], layoutMode: { type: "box", ignoreSize: !0 }, defaultOption: { show: !0, zlevel: 0, z: 4, seriesIndex: "all", min: 0, max: 200, dimension: null, inRange: null, outOfRange: null, left: 0, right: null, top: null, bottom: 0, itemWidth: null, itemHeight: null, inverse: !1, orient: "vertical", backgroundColor: "rgba(0,0,0,0)", borderColor: "#ccc", contentColor: "#5793f3", inactiveColor: "#aaa", borderWidth: 0, padding: 5, textGap: 10, precision: 0, color: null, formatter: null, text: null, textStyle: { color: "#333" } }, init: function init(t, e, i) {this._dataExtent, this.targetVisuals = {}, this.controllerVisuals = {}, this.textStyleModel, this.itemSize, this.mergeDefaultAndTheme(t, i);}, optionUpdated: function optionUpdated(t, e) {var i = this.option;Jf.canvasSupported || (i.realtime = !1), !e && zf(i, t, this.replacableOptionKeys), this.textStyleModel = this.getModel("textStyle"), this.resetItemSize(), this.completeVisualOption();}, resetVisual: function resetVisual(t) {var e = this.stateList;t = y(t, this), this.controllerVisuals = Rf(this.option.controller, e, t), this.targetVisuals = Rf(this.option.target, e, t);}, getTargetSeriesIndices: function getTargetSeriesIndices() {var t = this.option.seriesIndex,e = [];return null == t || "all" === t ? this.ecModel.eachSeries(function (t, i) {e.push(i);}) : e = tr(t), e;}, eachTargetSeries: function eachTargetSeries(t, e) {f(this.getTargetSeriesIndices(), function (i) {t.call(e, this.ecModel.getSeriesByIndex(i));}, this);}, isTargetSeries: function isTargetSeries(t) {var e = !1;return this.eachTargetSeries(function (i) {i === t && (e = !0);}), e;}, formatValueText: function formatValueText(t, e, i) {function n(t) {return t === l[0] ? "min" : t === l[1] ? "max" : (+t).toFixed(Math.min(s, 20));}var r,a,o = this.option,s = o.precision,l = this.dataBound,u = o.formatter;return i = i || ["<", ">"], x(t) && (t = t.slice(), r = !0), a = e ? t : r ? [n(t[0]), n(t[1])] : n(t), b(u) ? u.replace("{value}", r ? a[0] : a).replace("{value2}", r ? a[1] : a) : w(u) ? r ? u(t[0], t[1]) : u(t) : r ? t[0] === l[0] ? i[0] + " " + a[1] : t[1] === l[1] ? i[1] + " " + a[0] : a[0] + " - " + a[1] : a;}, resetExtent: function resetExtent() {var t = this.option,e = FM([t.min, t.max]);this._dataExtent = e;}, getDataDimension: function getDataDimension(t) {var e = this.option.dimension,i = t.dimensions;if (null != e || i.length) {if (null != e) return t.getDimension(e);for (var n = t.dimensions, r = n.length - 1; r >= 0; r--) {var a = n[r],o = t.getDimensionInfo(a);if (!o.isCalculationCoord) return a;}}}, getExtent: function getExtent() {return this._dataExtent.slice();}, completeVisualOption: function completeVisualOption() {function t(t) {EM(o.color) && !t.inRange && (t.inRange = { color: o.color.slice().reverse() }), t.inRange = t.inRange || { color: a.get("gradientColor") }, NM(this.stateList, function (e) {var i = t[e];if (b(i)) {var n = OM.get(i, "active", h);n ? (t[e] = {}, t[e][i] = n) : delete t[e];}}, this);}function e(t, e, i) {var n = t[e],r = t[i];n && !r && (r = t[i] = {}, NM(n, function (t, e) {if (DM.isValidType(e)) {var i = OM.get(e, "inactive", h);null != i && (r[e] = i, "color" !== e || r.hasOwnProperty("opacity") || r.hasOwnProperty("colorAlpha") || (r.opacity = [0, 0]));}}));}function i(t) {var e = (t.inRange || {}).symbol || (t.outOfRange || {}).symbol,i = (t.inRange || {}).symbolSize || (t.outOfRange || {}).symbolSize,r = this.get("inactiveColor");NM(this.stateList, function (a) {var o = this.itemSize,s = t[a];s || (s = t[a] = { color: h ? r : [r] }), null == s.symbol && (s.symbol = e && n(e) || (h ? "roundRect" : ["roundRect"])), null == s.symbolSize && (s.symbolSize = i && n(i) || (h ? o[0] : [o[0], o[0]])), s.symbol = zM(s.symbol, function (t) {return "none" === t || "square" === t ? "roundRect" : t;});var l = s.symbolSize;if (null != l) {var u = -1 / 0;BM(l, function (t) {t > u && (u = t);}), s.symbolSize = zM(l, function (t) {return VM(t, [0, u], [0, o[0]], !0);});}}, this);}var a = this.ecModel,o = this.option,s = { inRange: o.inRange, outOfRange: o.outOfRange },l = o.target || (o.target = {}),u = o.controller || (o.controller = {});r(l, s), r(u, s);var h = this.isCategory();t.call(this, l), t.call(this, u), e.call(this, l, "inRange", "outOfRange"), i.call(this, u);}, resetItemSize: function resetItemSize() {this.itemSize = [parseFloat(this.get("itemWidth")), parseFloat(this.get("itemHeight"))];}, isCategory: function isCategory() {return !!this.option.categories;}, setSelected: HM, getValueState: HM, getVisualMeta: HM }),GM = [20, 140],XM = WM.extend({ type: "visualMap.continuous", defaultOption: { align: "auto", calculable: !1, range: null, realtime: !0, itemHeight: null, itemWidth: null, hoverLink: !0, hoverLinkDataSize: null, hoverLinkOnHandle: null }, optionUpdated: function optionUpdated() {XM.superApply(this, "optionUpdated", arguments), this.resetExtent(), this.resetVisual(function (t) {t.mappingMethod = "linear", t.dataExtent = this.getExtent();}), this._resetRange();}, resetItemSize: function resetItemSize() {XM.superApply(this, "resetItemSize", arguments);var t = this.itemSize;"horizontal" === this._orient && t.reverse(), (null == t[0] || isNaN(t[0])) && (t[0] = GM[0]), (null == t[1] || isNaN(t[1])) && (t[1] = GM[1]);}, _resetRange: function _resetRange() {var t = this.getExtent(),e = this.option.range;!e || e.auto ? (t.auto = 1, this.option.range = t) : x(e) && (e[0] > e[1] && e.reverse(), e[0] = Math.max(e[0], t[0]), e[1] = Math.min(e[1], t[1]));}, completeVisualOption: function completeVisualOption() {WM.prototype.completeVisualOption.apply(this, arguments), f(this.stateList, function (t) {var e = this.option.controller[t].symbolSize;e && e[0] !== e[1] && (e[0] = 0);}, this);}, setSelected: function setSelected(t) {this.option.range = t.slice(), this._resetRange();}, getSelected: function getSelected() {var t = this.getExtent(),e = To((this.get("range") || []).slice());return e[0] > t[1] && (e[0] = t[1]), e[1] > t[1] && (e[1] = t[1]), e[0] < t[0] && (e[0] = t[0]), e[1] < t[0] && (e[1] = t[0]), e;}, getValueState: function getValueState(t) {var e = this.option.range,i = this.getExtent();return (e[0] <= i[0] || e[0] <= t) && (e[1] >= i[1] || t <= e[1]) ? "inRange" : "outOfRange";}, findTargetDataIndices: function findTargetDataIndices(t) {var e = [];return this.eachTargetSeries(function (i) {var n = [],r = i.getData();r.each(this.getDataDimension(r), function (e, i) {t[0] <= e && e <= t[1] && n.push(i);}, this), e.push({ seriesId: i.id, dataIndex: n });}, this), e;}, getVisualMeta: function getVisualMeta(t) {function e(e, i) {r.push({ value: e, color: t(e, i) });}for (var i = Nf(this, "outOfRange", this.getExtent()), n = Nf(this, "inRange", this.option.range.slice()), r = [], a = 0, o = 0, s = n.length, l = i.length; l > o && (!n.length || i[o] <= n[0]); o++) {i[o] < n[a] && e(i[o], "outOfRange");}for (var u = 1; s > a; a++, u = 0) {u && r.length && e(n[a], "outOfRange"), e(n[a], "inRange");}for (var u = 1; l > o; o++) {(!n.length || n[n.length - 1] < i[o]) && (u && (r.length && e(r[r.length - 1].value, "outOfRange"), u = 0), e(i[o], "outOfRange"));}var h = r.length;return { stops: r, outerColors: [h ? r[0].color : "transparent", h ? r[h - 1].color : "transparent"] };} }),YM = Ou({ type: "visualMap", autoPositionValues: { left: 1, right: 1, top: 1, bottom: 1 }, init: function init(t, e) {this.ecModel = t, this.api = e, this.visualMapModel;}, render: function render(t) {return this.visualMapModel = t, t.get("show") === !1 ? void this.group.removeAll() : void this.doRender.apply(this, arguments);}, renderBackground: function renderBackground(t) {var e = this.visualMapModel,i = My(e.get("padding") || 0),n = t.getBoundingRect();t.add(new Vm({ z2: -1, silent: !0, shape: { x: n.x - i[3], y: n.y - i[0], width: n.width + i[3] + i[1], height: n.height + i[0] + i[2] }, style: { fill: e.get("backgroundColor"), stroke: e.get("borderColor"), lineWidth: e.get("borderWidth") } }));}, getControllerVisual: function getControllerVisual(t, e, i) {function n(t) {return s[t];}function r(t, e) {s[t] = e;}i = i || {};var a = i.forceState,o = this.visualMapModel,s = {};if ("symbol" === e && (s.symbol = o.get("itemSymbol")), "color" === e) {var l = o.get("contentColor");s.color = l;}var u = o.controllerVisuals[a || o.getValueState(t)],h = DM.prepareVisualTypes(u);return f(h, function (a) {var o = u[a];i.convertOpacityToAlpha && "opacity" === a && (a = "colorAlpha", o = u.__alphaForOpacity), DM.dependsOn(a, e) && o && o.applyVisual(t, n, r);}), s[e];}, positionGroup: function positionGroup(t) {var e = this.visualMapModel,i = this.api;Jo(t, e.getBoxLayoutParams(), { width: i.getWidth(), height: i.getHeight() });}, doRender: V }),UM = function UM(t, e, i, n, r, a) {t = t || 0;var o = i[1] - i[0];if (null != r && (r = Vf(r, [0, o])), null != a && (a = Math.max(a, null != r ? r : 0)), "all" === n) {var s = Math.abs(e[1] - e[0]);s = Vf(s, [0, o]), r = a = Vf(s, [r, a]), n = 0;}e[0] = Vf(e[0], i), e[1] = Vf(e[1], i);var l = Ff(e, n);e[n] += t;var u = r || 0,h = i.slice();l.sign < 0 ? h[0] += u : h[1] -= u, e[n] = Vf(e[n], h);var c = Ff(e, n);null != r && (c.sign !== l.sign || c.span < r) && (e[1 - n] = e[n] + l.sign * r);var c = Ff(e, n);return null != a && c.span > a && (e[1 - n] = e[n] + c.sign * a), e;},qM = bo,jM = f,ZM = Math.min,KM = Math.max,$M = 12,QM = 6,JM = YM.extend({ type: "visualMap.continuous", init: function init() {JM.superApply(this, "init", arguments), this._shapes = {}, this._dataInterval = [], this._handleEnds = [], this._orient, this._useHandle, this._hoverLinkDataIndices = [], this._dragging, this._hovering;}, doRender: function doRender(t, e, i, n) {n && "selectDataRange" === n.type && n.from === this.uid || this._buildView();}, _buildView: function _buildView() {this.group.removeAll();var t = this.visualMapModel,e = this.group;this._orient = t.get("orient"), this._useHandle = t.get("calculable"), this._resetInterval(), this._renderBar(e);var i = t.get("text");this._renderEndsText(e, i, 0), this._renderEndsText(e, i, 1), this._updateView(!0), this.renderBackground(e), this._updateView(), this._enableHoverLinkToSeries(), this._enableHoverLinkFromSeries(), this.positionGroup(e);}, _renderEndsText: function _renderEndsText(t, e, i) {if (e) {var n = e[1 - i];n = null != n ? n + "" : "";var r = this.visualMapModel,a = r.get("textGap"),o = r.itemSize,s = this._shapes.barGroup,l = this._applyTransform([o[0] / 2, 0 === i ? -a : o[1] + a], s),u = this._applyTransform(0 === i ? "bottom" : "top", s),h = this._orient,c = this.visualMapModel.textStyleModel;this.group.add(new Dm({ style: { x: l[0], y: l[1], textVerticalAlign: "horizontal" === h ? "middle" : u, textAlign: "horizontal" === h ? u : "center", text: n, textFont: c.getFont(), textFill: c.getTextColor() } }));}}, _renderBar: function _renderBar(t) {var e = this.visualMapModel,i = this._shapes,n = e.itemSize,r = this._orient,a = this._useHandle,o = Hf(e, this.api, n),s = i.barGroup = this._createBarGroup(o);s.add(i.outOfRange = Gf()), s.add(i.inRange = Gf(null, a ? jf(this._orient) : null, y(this._dragHandle, this, "all", !1), y(this._dragHandle, this, "all", !0)));var l = e.textStyleModel.getTextRect("国"),u = KM(l.width, l.height);a && (i.handleThumbs = [], i.handleLabels = [], i.handleLabelPoints = [], this._createHandle(s, 0, n, u, r, o), this._createHandle(s, 1, n, u, r, o)), this._createIndicator(s, n, u, r), t.add(s);}, _createHandle: function _createHandle(t, e, i, n, r) {var a = y(this._dragHandle, this, e, !1),o = y(this._dragHandle, this, e, !0),s = Gf(Xf(e, n), jf(this._orient), a, o);s.position[0] = i[0], t.add(s);var l = this.visualMapModel.textStyleModel,u = new Dm({ draggable: !0, drift: a, onmousemove: function onmousemove(t) {Dp(t.event);}, ondragend: o, style: { x: 0, y: 0, text: "", textFont: l.getFont(), textFill: l.getTextColor() } });this.group.add(u);var h = ["horizontal" === r ? n / 2 : 1.5 * n, "horizontal" === r ? 0 === e ? -(1.5 * n) : 1.5 * n : 0 === e ? -n / 2 : n / 2],c = this._shapes;c.handleThumbs[e] = s, c.handleLabelPoints[e] = h, c.handleLabels[e] = u;}, _createIndicator: function _createIndicator(t, e, i, n) {var r = Gf([[0, 0]], "move");r.position[0] = e[0], r.attr({ invisible: !0, silent: !0 }), t.add(r);var a = this.visualMapModel.textStyleModel,o = new Dm({ silent: !0, invisible: !0, style: { x: 0, y: 0, text: "", textFont: a.getFont(), textFill: a.getTextColor() } });this.group.add(o);var s = ["horizontal" === n ? i / 2 : QM + 3, 0],l = this._shapes;l.indicator = r, l.indicatorLabel = o, l.indicatorLabelPoint = s;}, _dragHandle: function _dragHandle(t, e, i, n) {if (this._useHandle) {if (this._dragging = !e, !e) {var r = this._applyTransform([i, n], this._shapes.barGroup, !0);this._updateInterval(t, r[1]), this._updateView();}e === !this.visualMapModel.get("realtime") && this.api.dispatchAction({ type: "selectDataRange", from: this.uid, visualMapId: this.visualMapModel.id, selected: this._dataInterval.slice() }), e ? !this._hovering && this._clearHoverLinkToSeries() : qf(this.visualMapModel) && this._doHoverLinkToSeries(this._handleEnds[t], !1);}}, _resetInterval: function _resetInterval() {var t = this.visualMapModel,e = this._dataInterval = t.getSelected(),i = t.getExtent(),n = [0, t.itemSize[1]];this._handleEnds = [qM(e[0], i, n, !0), qM(e[1], i, n, !0)];}, _updateInterval: function _updateInterval(t, e) {e = e || 0;var i = this.visualMapModel,n = this._handleEnds,r = [0, i.itemSize[1]];UM(e, n, r, t, 0);var a = i.getExtent();this._dataInterval = [qM(n[0], r, a, !0), qM(n[1], r, a, !0)];}, _updateView: function _updateView(t) {var e = this.visualMapModel,i = e.getExtent(),n = this._shapes,r = [0, e.itemSize[1]],a = t ? r : this._handleEnds,o = this._createBarVisual(this._dataInterval, i, a, "inRange"),s = this._createBarVisual(i, i, r, "outOfRange");n.inRange.setStyle({ fill: o.barColor, opacity: o.opacity }).setShape("points", o.barPoints), n.outOfRange.setStyle({ fill: s.barColor, opacity: s.opacity }).setShape("points", s.barPoints), this._updateHandle(a, o);}, _createBarVisual: function _createBarVisual(t, e, i, n) {var r = { forceState: n, convertOpacityToAlpha: !0 },a = this._makeColorGradient(t, r),o = [this.getControllerVisual(t[0], "symbolSize", r), this.getControllerVisual(t[1], "symbolSize", r)],s = this._createBarPoints(i, o);return { barColor: new jm(0, 0, 0, 1, a), barPoints: s, handlesColor: [a[0].color, a[a.length - 1].color] };}, _makeColorGradient: function _makeColorGradient(t, e) {var i = 100,n = [],r = (t[1] - t[0]) / i;n.push({ color: this.getControllerVisual(t[0], "color", e), offset: 0 });for (var a = 1; i > a; a++) {var o = t[0] + r * a;if (o > t[1]) break;n.push({ color: this.getControllerVisual(o, "color", e), offset: a / i });}return n.push({ color: this.getControllerVisual(t[1], "color", e), offset: 1 }), n;}, _createBarPoints: function _createBarPoints(t, e) {var i = this.visualMapModel.itemSize;return [[i[0] - e[0], t[0]], [i[0], t[0]], [i[0], t[1]], [i[0] - e[1], t[1]]];}, _createBarGroup: function _createBarGroup(t) {var e = this._orient,i = this.visualMapModel.get("inverse");return new fg("horizontal" !== e || i ? "horizontal" === e && i ? { scale: "bottom" === t ? [-1, 1] : [1, 1], rotation: -Math.PI / 2 } : "vertical" !== e || i ? { scale: "left" === t ? [1, 1] : [-1, 1] } : { scale: "left" === t ? [1, -1] : [-1, -1] } : { scale: "bottom" === t ? [1, 1] : [-1, 1], rotation: Math.PI / 2 });}, _updateHandle: function _updateHandle(t, e) {if (this._useHandle) {var i = this._shapes,n = this.visualMapModel,r = i.handleThumbs,a = i.handleLabels;jM([0, 1], function (o) {var s = r[o];s.setStyle("fill", e.handlesColor[o]), s.position[1] = t[o];var l = ro(i.handleLabelPoints[o], no(s, this.group));a[o].setStyle({ x: l[0], y: l[1], text: n.formatValueText(this._dataInterval[o]), textVerticalAlign: "middle", textAlign: this._applyTransform("horizontal" === this._orient ? 0 === o ? "bottom" : "top" : "left", i.barGroup) });}, this);}}, _showIndicator: function _showIndicator(t, e, i, n) {var r = this.visualMapModel,a = r.getExtent(),o = r.itemSize,s = [0, o[1]],l = qM(t, a, s, !0),u = this._shapes,h = u.indicator;if (h) {h.position[1] = l, h.attr("invisible", !1), h.setShape("points", Yf(!!i, n, l, o[1]));var c = { convertOpacityToAlpha: !0 },d = this.getControllerVisual(t, "color", c);h.setStyle("fill", d);var f = ro(u.indicatorLabelPoint, no(h, this.group)),p = u.indicatorLabel;p.attr("invisible", !1);var g = this._applyTransform("left", u.barGroup),v = this._orient;p.setStyle({ text: (i ? i : "") + r.formatValueText(e), textVerticalAlign: "horizontal" === v ? g : "middle", textAlign: "horizontal" === v ? "center" : g, x: f[0], y: f[1] });}}, _enableHoverLinkToSeries: function _enableHoverLinkToSeries() {var t = this;this._shapes.barGroup.on("mousemove", function (e) {if (t._hovering = !0, !t._dragging) {var i = t.visualMapModel.itemSize,n = t._applyTransform([e.offsetX, e.offsetY], t._shapes.barGroup, !0, !0);n[1] = ZM(KM(0, n[1]), i[1]), t._doHoverLinkToSeries(n[1], 0 <= n[0] && n[0] <= i[0]);}}).on("mouseout", function () {t._hovering = !1, !t._dragging && t._clearHoverLinkToSeries();});}, _enableHoverLinkFromSeries: function _enableHoverLinkFromSeries() {var t = this.api.getZr();this.visualMapModel.option.hoverLink ? (t.on("mouseover", this._hoverLinkFromSeriesMouseOver, this), t.on("mouseout", this._hideIndicator, this)) : this._clearHoverLinkFromSeries();}, _doHoverLinkToSeries: function _doHoverLinkToSeries(t, e) {var i = this.visualMapModel,n = i.itemSize;if (i.option.hoverLink) {var r = [0, n[1]],a = i.getExtent();t = ZM(KM(r[0], t), r[1]);var o = Uf(i, a, r),s = [t - o, t + o],l = qM(t, r, a, !0),u = [qM(s[0], r, a, !0), qM(s[1], r, a, !0)];s[0] < r[0] && (u[0] = -1 / 0), s[1] > r[1] && (u[1] = 1 / 0), e && (u[0] === -1 / 0 ? this._showIndicator(l, u[1], "< ", o) : 1 / 0 === u[1] ? this._showIndicator(l, u[0], "> ", o) : this._showIndicator(l, l, "≈ ", o));var h = this._hoverLinkDataIndices,c = [];(e || qf(i)) && (c = this._hoverLinkDataIndices = i.findTargetDataIndices(u));var d = lr(h, c);this._dispatchHighDown("downplay", Wf(d[0], i)), this._dispatchHighDown("highlight", Wf(d[1], i));}}, _hoverLinkFromSeriesMouseOver: function _hoverLinkFromSeriesMouseOver(t) {var e = t.target,i = this.visualMapModel;if (e && null != e.dataIndex) {var n = this.ecModel.getSeriesByIndex(e.seriesIndex);if (i.isTargetSeries(n)) {var r = n.getData(e.dataType),a = r.get(i.getDataDimension(r), e.dataIndex, !0);isNaN(a) || this._showIndicator(a, a);}}}, _hideIndicator: function _hideIndicator() {var t = this._shapes;t.indicator && t.indicator.attr("invisible", !0), t.indicatorLabel && t.indicatorLabel.attr("invisible", !0);}, _clearHoverLinkToSeries: function _clearHoverLinkToSeries() {this._hideIndicator();var t = this._hoverLinkDataIndices;this._dispatchHighDown("downplay", Wf(t, this.visualMapModel)), t.length = 0;}, _clearHoverLinkFromSeries: function _clearHoverLinkFromSeries() {this._hideIndicator();var t = this.api.getZr();t.off("mouseover", this._hoverLinkFromSeriesMouseOver), t.off("mouseout", this._hideIndicator);}, _applyTransform: function _applyTransform(t, e, i, n) {var r = no(e, n ? null : this.group);return cy[x(t) ? "applyTransform" : "transformDirection"](t, r, i);}, _dispatchHighDown: function _dispatchHighDown(t, e) {e && e.length && this.api.dispatchAction({ type: t, batch: e });}, dispose: function dispose() {this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries();}, remove: function remove() {this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries();} }),tS = { type: "selectDataRange", event: "dataRangeSelected", update: "update" };Tu(tS, function (t, e) {e.eachComponent({ mainType: "visualMap", query: t }, function (e) {e.setSelected(t.selected);});}), bu(SM);{var eS = WM.extend({ type: "visualMap.piecewise", defaultOption: { selected: null, minOpen: !1, maxOpen: !1, align: "auto", itemWidth: 20, itemHeight: 14, itemSymbol: "roundRect", pieceList: null, categories: null, splitNumber: 5, selectedMode: "multiple", itemGap: 10, hoverLink: !0, showLabel: null }, optionUpdated: function optionUpdated(t, e) {eS.superApply(this, "optionUpdated", arguments), this._pieceList = [], this.resetExtent();var i = this._mode = this._determineMode();iS[this._mode].call(this), this._resetSelected(t, e);var r = this.option.categories;this.resetVisual(function (t, e) {"categories" === i ? (t.mappingMethod = "category", t.categories = n(r)) : (t.dataExtent = this.getExtent(), t.mappingMethod = "piecewise", t.pieceList = p(this._pieceList, function (t) {var t = n(t);return "inRange" !== e && (t.visual = null), t;}));});}, completeVisualOption: function completeVisualOption() {function t(t, e, i) {return t && t[e] && (M(t[e]) ? t[e].hasOwnProperty(i) : t[e] === i);}var e = this.option,i = {},n = DM.listVisualTypes(),r = this.isCategory();f(e.pieces, function (t) {f(n, function (e) {t.hasOwnProperty(e) && (i[e] = 1);});}), f(i, function (i, n) {var a = 0;f(this.stateList, function (i) {a |= t(e, i, n) || t(e.target, i, n);}, this), !a && f(this.stateList, function (t) {(e[t] || (e[t] = {}))[n] = OM.get(n, "inRange" === t ? "active" : "inactive", r);});}, this), WM.prototype.completeVisualOption.apply(this, arguments);}, _resetSelected: function _resetSelected(t, e) {var i = this.option,n = this._pieceList,r = (e ? i : t).selected || {};if (i.selected = r, f(n, function (t) {var e = this.getSelectedMapKey(t);r.hasOwnProperty(e) || (r[e] = !0);}, this), "single" === i.selectedMode) {var a = !1;f(n, function (t) {var e = this.getSelectedMapKey(t);r[e] && (a ? r[e] = !1 : a = !0);}, this);}}, getSelectedMapKey: function getSelectedMapKey(t) {return "categories" === this._mode ? t.value + "" : t.index + "";}, getPieceList: function getPieceList() {return this._pieceList;}, _determineMode: function _determineMode() {var t = this.option;return t.pieces && t.pieces.length > 0 ? "pieces" : this.option.categories ? "categories" : "splitNumber";}, setSelected: function setSelected(t) {this.option.selected = n(t);}, getValueState: function getValueState(t) {var e = DM.findPieceIndex(t, this._pieceList);return null != e && this.option.selected[this.getSelectedMapKey(this._pieceList[e])] ? "inRange" : "outOfRange";}, findTargetDataIndices: function findTargetDataIndices(t) {var e = [];return this.eachTargetSeries(function (i) {var n = [],r = i.getData();r.each(this.getDataDimension(r), function (e, i) {var r = DM.findPieceIndex(e, this._pieceList);r === t && n.push(i);}, this), e.push({ seriesId: i.id, dataIndex: n });}, this), e;}, getRepresentValue: function getRepresentValue(t) {var e;if (this.isCategory()) e = t.value;else if (null != t.value) e = t.value;else {var i = t.interval || [];e = i[0] === -1 / 0 && 1 / 0 === i[1] ? 0 : (i[0] + i[1]) / 2;}return e;}, getVisualMeta: function getVisualMeta(t) {function e(e, a) {var o = r.getRepresentValue({ interval: e });a || (a = r.getValueState(o));var s = t(o, a);e[0] === -1 / 0 ? n[0] = s : 1 / 0 === e[1] ? n[1] = s : i.push({ value: e[0], color: s }, { value: e[1], color: s });}if (!this.isCategory()) {var i = [],n = [],r = this,a = this._pieceList.slice();if (a.length) {var o = a[0].interval[0];o !== -1 / 0 && a.unshift({ interval: [-1 / 0, o] }), o = a[a.length - 1].interval[1], 1 / 0 !== o && a.push({ interval: [o, 1 / 0] });} else a.push({ interval: [-1 / 0, 1 / 0] });var s = -1 / 0;return f(a, function (t) {var i = t.interval;i && (i[0] > s && e([s, i[0]], "outOfRange"), e(i.slice()), s = i[1]);}, this), { stops: i, outerColors: n };}} }),iS = { splitNumber: function splitNumber() {var t = this.option,e = this._pieceList,i = Math.min(t.precision, 20),n = this.getExtent(),r = t.splitNumber;r = Math.max(parseInt(r, 10), 1), t.splitNumber = r;for (var a = (n[1] - n[0]) / r; +a.toFixed(i) !== a && 5 > i;) {i++;}t.precision = i, a = +a.toFixed(i), t.minOpen && e.push({ interval: [-1 / 0, n[0]], close: [0, 0] });for (var o = 0, s = n[0]; r > o; s += a, o++) {var l = o === r - 1 ? n[1] : s + a;e.push({ interval: [s, l], close: [1, 1] });}t.maxOpen && e.push({ interval: [n[1], 1 / 0], close: [0, 0] }), Eo(e), f(e, function (t, e) {t.index = e, t.text = this.formatValueText(t.interval);}, this);}, categories: function categories() {var t = this.option;f(t.categories, function (t) {this._pieceList.push({ text: this.formatValueText(t, !0), value: t });}, this), Zf(t, this._pieceList);}, pieces: function pieces() {var t = this.option,e = this._pieceList;f(t.pieces, function (t, i) {M(t) || (t = { value: t });var n = { text: "", index: i };if (null != t.label && (n.text = t.label), t.hasOwnProperty("value")) {var r = n.value = t.value;n.interval = [r, r], n.close = [1, 1];} else {for (var a = n.interval = [], o = n.close = [0, 0], s = [1, 0, 1], l = [-1 / 0, 1 / 0], u = [], h = 0; 2 > h; h++) {for (var c = [["gte", "gt", "min"], ["lte", "lt", "max"]][h], d = 0; 3 > d && null == a[h]; d++) {a[h] = t[c[d]], o[h] = s[d], u[h] = 2 === d;}null == a[h] && (a[h] = l[h]);}u[0] && 1 / 0 === a[1] && (o[0] = 0), u[1] && a[0] === -1 / 0 && (o[1] = 0), a[0] === a[1] && o[0] && o[1] && (n.value = a[0]);}n.visual = DM.retrieveVisuals(t), e.push(n);}, this), Zf(t, e), Eo(e), f(e, function (t) {var e = t.close,i = [["<", "≤"][e[1]], [">", "≥"][e[0]]];t.text = t.text || this.formatValueText(null != t.value ? t.value : t.interval, !1, i);}, this);} };YM.extend({ type: "visualMap.piecewise", doRender: function doRender() {function t(t) {var r = t.piece,u = new fg();u.onclick = y(this._onItemClick, this, r), this._enableHoverLink(u, t.indexInModelPieceList);var h = i.getRepresentValue(r);if (this._createItemSymbol(u, h, [0, 0, l[0], l[1]]), c) {var d = this.visualMapModel.getValueState(h);u.add(new Dm({ style: { x: "right" === s ? -n : l[0] + n, y: l[1] / 2, text: r.text, textVerticalAlign: "middle", textAlign: s, textFont: a, textFill: o, opacity: "outOfRange" === d ? .5 : 1 } }));}e.add(u);}var e = this.group;e.removeAll();var i = this.visualMapModel,n = i.get("textGap"),r = i.textStyleModel,a = r.getFont(),o = r.getTextColor(),s = this._getItemAlign(),l = i.itemSize,u = this._getViewData(),h = u.endsText,c = D(i.get("showLabel", !0), !h);h && this._renderEndsText(e, h[0], l, c, s), f(u.viewPieceList, t, this), h && this._renderEndsText(e, h[1], l, c, s), Oy(i.get("orient"), e, i.get("itemGap")), this.renderBackground(e), this.positionGroup(e);}, _enableHoverLink: function _enableHoverLink(t, e) {function i(t) {var i = this.visualMapModel;i.option.hoverLink && this.api.dispatchAction({ type: t, batch: Wf(i.findTargetDataIndices(e), i) });}t.on("mouseover", y(i, this, "highlight")).on("mouseout", y(i, this, "downplay"));}, _getItemAlign: function _getItemAlign() {var t = this.visualMapModel,e = t.option;if ("vertical" === e.orient) return Hf(t, this.api, t.itemSize);var i = e.align;return i && "auto" !== i || (i = "left"), i;}, _renderEndsText: function _renderEndsText(t, e, i, n, r) {if (e) {var a = new fg(),o = this.visualMapModel.textStyleModel;a.add(new Dm({ style: { x: n ? "right" === r ? i[0] : 0 : i[0] / 2, y: i[1] / 2, textVerticalAlign: "middle", textAlign: n ? r : "center", text: e, textFont: o.getFont(), textFill: o.getTextColor() } })), t.add(a);}}, _getViewData: function _getViewData() {var t = this.visualMapModel,e = p(t.getPieceList(), function (t, e) {return { piece: t, indexInModelPieceList: e };}),i = t.get("text"),n = t.get("orient"),r = t.get("inverse");return ("horizontal" === n ? r : !r) ? e.reverse() : i && (i = i.slice().reverse()), { viewPieceList: e, endsText: i };}, _createItemSymbol: function _createItemSymbol(t, e, i) {t.add(Uh(this.getControllerVisual(e, "symbol"), i[0], i[1], i[2], i[3], this.getControllerVisual(e, "color")));}, _onItemClick: function _onItemClick(t) {var e = this.visualMapModel,i = e.option,r = n(i.selected),a = e.getSelectedMapKey(t);"single" === i.selectedMode ? (r[a] = !0, f(r, function (t, e) {r[e] = e === a;})) : r[a] = !r[a], this.api.dispatchAction({ type: "selectDataRange", from: this.uid, visualMapId: this.visualMapModel.id, selected: r });} });}bu(SM), t.version = fx, t.dependencies = px, t.PRIORITY = Dx, t.init = gu, t.connect = vu, t.disConnect = mu, t.disconnect = jx, t.dispose = yu, t.getInstanceByDom = _u, t.getInstanceById = xu, t.registerTheme = wu, t.registerPreprocessor = bu, t.registerProcessor = Mu, t.registerPostUpdate = Su, t.registerAction = Tu, t.registerCoordinateSystem = Iu, t.getCoordinateSystemDimensions = Cu, t.registerLayout = Du, t.registerVisual = ku, t.registerLoading = Pu, t.extendComponentModel = Lu, t.extendComponentView = Ou, t.extendSeriesModel = Ru, t.extendChartView = zu, t.setCanvasCreator = Bu, t.registerMap = Eu, t.getMap = Nu, t.dataTool = Zx, t.zrender = cv, t.number = by, t.format = ky, t.throttle = yl, t.helper = Kw, t.matrix = zp, t.vector = _p, t.color = tg, t.parseGeoJSON = Qw, t.parseGeoJson = ib, t.util = nb, t.graphic = rb, t.List = sw, t.Model = go, t.Axis = eb, t.env = Jf;});

/***/ }),
/* 18 */
/*!*********************************************************!*\
  !*** D:/wxxiaochenxu/text1/echarts/map/json/china.json ***!
  \*********************************************************/
/*! exports provided: type, features, UTF8Encoding, default */
/***/ (function(module) {

module.exports = {"type":"FeatureCollection","features":[{"type":"Feature","id":"710000","properties":{"id":"710000","cp":[121.509062,24.044332],"name":"台湾","childNum":6},"geometry":{"type":"MultiPolygon","coordinates":[["@@°Ü¯Û"],["@@ƛĴÕƊÉɼģºðʀ\\ƎsÆNŌÔĚänÜƤɊĂǀĆĴĤǊŨxĚĮǂƺòƌâÔ®ĮXŦţƸZûÐƕƑGđ¨ĭMó·ęcëƝɉlÝƯֹÅŃ^Ó·śŃǋƏďíåɛGɉ¿@ăƑ¥ĘWǬÏĶŁâ"],["@@\\p|WoYG¿¥Ij@¢"],["@@¡@V^RqBbAnTXeRz¤L«³I"],["@@ÆEEkWqë @"],["@@fced"],["@@¯ɜÄèaì¯ØǓIġĽ"],["@@çûĖëĄhòř "]],"encodeOffsets":[[[122886,24033]],[[123335,22980]],[[122375,24193]],[[122518,24117]],[[124427,22618]],[[124862,26043]],[[126259,26318]],[[127671,26683]]]}},{"type":"Feature","id":"130000","properties":{"id":"130000","cp":[114.502461,38.045474],"name":"河北","childNum":3},"geometry":{"type":"MultiPolygon","coordinates":[["@@o~Z]ªrºc_ħ²G¼s`jÎŸnüsÂłNX_M`Ç½ÓnUKĜēs¤­©yrý§uģcJe"],["@@U`Ts¿mÂ"],["@@oºƋÄdeVDJj£J|ÅdzÂFt~KŨ¸IÆv|¢r}èonb}`RÎÄn°ÒdÞ²^®lnÐèĄlðÓ×]ªÆ}LiĂ±Ö`^°Ç¶p®đDcŋ`ZÔ¶êqvFÆN®ĆTH®¦O¾IbÐã´BĐɢŴÆíȦpĐÞXR·nndO¤OÀĈƒ­QgµFo|gȒęSWb©osx|hYhgŃfmÖĩnºTÌSp¢dYĤ¶UĈjlǐpäìë|³kÛfw²Xjz~ÂqbTÑěŨ@|oMzv¢ZrÃVw¬ŧĖ¸f°ÐTªqs{S¯r æÝlNd®²Ğ ǆiGĘJ¼lr}~K¨ŸƐÌWöÆzR¤lêmĞLÎ@¡|q]SvKÑcwpÏÏĿćènĪWlĄkT}J¤~ÈTdpddʾĬBVtEÀ¢ôPĎƗè@~kü\\rÊĔÖæW_§¼F´©òDòjYÈrbĞāøŀG{ƀ|¦ðrb|ÀH`pʞkvGpuARhÞÆǶgĘTǼƹS£¨¡ù³ŘÍ]¿ÂyôEP xX¶¹ÜO¡gÚ¡IwÃé¦ÅBÏ|Ç°N«úmH¯âDùyŜŲIÄuĐ¨D¸dɂFOhđ©OiÃ`ww^ÌkÑH«ƇǤŗĺtFu{Z}Ö@U´ʚLg®¯Oı°Ãw ^VbÉsmAê]]w§RRl£ȭµu¯b{ÍDěïÿȧuT£ġěŗƃĝQ¨fVƋƅn­a@³@ďyÃ½IĹÊKŭfċŰóxV@tƯJ]eR¾fe|rHA|h~Ėƍl§ÏlTíb ØoÅbbx³^zÃĶ¶Sj®AyÂhðk`«PËµEFÛ¬Y¨Ļrõqi¼Wi°§Ð±´°^[À|ĠO@ÆxO\\ta\\tĕtû{ġȧXýĪÓjùÎRb^ÎfK[ÝděYfíÙTyuUSyŌŏů@Oi½éŅ­aVcř§ax¹XŻácWU£ôãºQ¨÷Ñws¥qEHÙ|šYQoŕÇyáĂ£MÃ°oťÊP¡mWO¡v{ôvîēÜISpÌhp¨ jdeŔQÖjX³àĈ[n`Yp@UcM`RKhEbpŞlNut®EtqnsÁgAiúoHqCXhfgu~ÏWP½¢G^}¯ÅīGCÑ^ãziMáļMTÃƘrMc|O_¯Ŏ´|morDkO\\mĆJfl@cĢ¬¢aĦtRıÒ¾ùƀ^juųœK­UFyƝīÛ÷ąV×qƥV¿aȉd³BqPBmaËđŻģmÅ®V¹d^KKonYg¯XhqaLdu¥Ípǅ¡KąÅkĝęěhq}HyÃ]¹ǧ£Í÷¿qáµ§g¤o^á¾ZE¤i`ĳ{nOl»WÝĔįhgF[¿¡ßkOüš_ūiǱàUtėGyl}ÓM}jpEC~¡FtoQiHkk{Ãmï"]],"encodeOffsets":[[[119712,40641]],[[121616,39981]],[[116462,37237]]]}},{"type":"Feature","id":"140000","properties":{"id":"140000","cp":[111.849248,36.857014],"name":"山西","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@ÞĩÒSra}ÁyWix±Üe´lèßÓǏokćiµVZģ¡coTSË¹ĪmnÕńehZg{gtwªpXaĚThȑp{¶Eh®RćƑP¿£Pmc¸mQÝWďȥoÅîɡųAďä³aÏJ½¥PG­ąSM­EÅruµéYÓŌ_dĒCo­Èµ]¯_²ÕjāK~©ÅØ^ÔkïçămÏk]­±cÝ¯ÑÃmQÍ~_apm~ç¡qu{JÅŧ·Ls}EyÁÆcI{¤IiCfUcƌÃp§]ě«vD@¡SÀµMÅwuYY¡DbÑc¡h×]nkoQdaMç~eDÛtT©±@¥ù@É¡ZcW|WqOJmĩl«ħşvOÓ«IqăV¥D[mI~Ó¢cehiÍ]Ɠ~ĥqX·eƷn±}v[ěďŕ]_œ`¹§ÕōIo©b­s^}Ét±ū«³p£ÿ·Wµ|¡¥ăFÏs×¥ŅxÊdÒ{ºvĴÎêÌɊ²¶ü¨|ÞƸµȲLLúÉƎ¤ϊęĔV`_bªS^|dzY|dz¥pZbÆ£¶ÒK}tĦÔņƠPYznÍvX¶Ěn ĠÔzý¦ª÷ÑĸÙUȌ¸dòÜJð´ìúNM¬XZ´¤ŊǸ_tldI{¦ƀðĠȤ¥NehXnYGR° ƬDj¬¸|CĞKqºfƐiĺ©ª~ĆOQª ¤@ìǦɌ²æBÊTŸʂōĖĴŞȀÆÿȄlŤĒötÎ½î¼ĨXh|ªM¤Ðz"],"encodeOffsets":[[116874,41716]]}},{"type":"Feature","id":"150000","properties":{"id":"150000","cp":[111.670801,41.818311],"name":"内蒙古","childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@¯PqFB|S³C|kñHdiÄ¥sŉÅPóÑÑE^ÅPpy_YtShQ·aHwsOnŉÃs©iqjUSiº]ïW«gW¡ARë¥_sgÁnUI«m]jvV¼euhwqAaW_µj»çjioQR¹ēÃßt@r³[ÛlćË^ÍÉáGOUÛOB±XkÅ¹£k|e]olkVÍ¼ÕqtaÏõjgÁ£§U^RLËnX°ÇBz^~wfvypV ¯ƫĉ˭ȫƗŷɿÿĿƑ˃ĝÿÃǃßËőó©ǐȍŒĖM×ÍEyxþp]ÉvïèvƀnÂĴÖ@V~Ĉv¦wĖtējyÄDXÄxGQuv_i¦aBçw˛wD©{tāmQ{EJ§KPśƘƿ¥@sCTÉ}ɃwƇy±gÑ}T[÷kÐç¦«SÒ¥¸ëBX½HáÅµÀğtSÝÂa[ƣ°¯¦Pï¡]£ġÒk®G²èQ°óMq}EóƐÇ\\@áügQÍu¥FTÕ¿Jû]|mvāÎYua^WoÀa·­ząÒot×¶CLƗi¯¤mƎHǊ¤îìɾŊìTdåwsRÖgĒųúÍġäÕ}Q¶¿A[¡{d×uQAMxVvMOmăl«ct[wº_ÇÊjbÂ£ĦS_éQZ_lwgOiýe`YYLq§IÁǳ£ÙË[ÕªuƏ³ÍTs·bÁĽäė[b[ŗfãcn¥îC¿÷µ[ŏÀQ­ōĉm¿Á^£mJVmL[{Ï_£F¥Ö{ŹA}×Wu©ÅaųĳƳhB{·TQqÙIķËZđ©Yc|M¡LeVUóK_QWk_ĥ¿ãZ»X\\ĴuUèlG®ěłTĠğDŃOrÍdÆÍz]±ŭ©Å]ÅÐ}UË¥©TċïxgckfWgi\\ÏĒ¥HkµEë{»ÏetcG±ahUiñiWsɁ·cCÕk]wȑ|ća}wVaĚá G°ùnM¬¯{ÈÐÆA¥ÄêJxÙ¢hP¢ÛºµwWOóFÁz^ÀŗÎú´§¢T¤ǻƺSėǵhÝÅQgvBHouʝl_o¿Ga{ïq{¥|ſĿHĂ÷aĝÇqZñiñC³ª»E`¨åXēÕqÉû[l}ç@čƘóO¿¡FUsAʽīccocÇS}£IS~ălkĩXçmĈŀÐoÐdxÒuL^T{r@¢ÍĝKén£kQyÅõËXŷƏL§~}kq»IHėǅjĝ»ÑÞoå°qTt|r©ÏS¯·eŨĕx«È[eM¿yupN~¹ÏyN£{©għWí»Í¾səšǅ_ÃĀɗ±ąĳĉʍŌŷSÉA±åǥɋ@ë£R©ąP©}ĹªƏj¹erLDĝ·{i«ƫC£µsKCGS|úþXgp{ÁX¿ć{ƱȏñZáĔyoÁhA}ŅĆfdŉ_¹Y°ėǩÑ¡H¯¶oMQqð¡Ë|Ñ`ƭŁX½·óÛxğįÅcQs«tȋǅFù^it«Č¯[hAi©á¥ÇĚ×l|¹y¯YȵƓñǙµïċĻ|Düȭ¶¡oŽäÕG\\ÄT¿Òõr¯LguÏYęRƩɷŌO\\İÐ¢æ^Ŋ ĲȶȆbÜGĝ¬¿ĚVĎgª^íu½jÿĕęjık@Ľ]ėl¥ËĭûÁėéV©±ćn©­ȇÍq¯½YÃÔŉÉNÑÅÝy¹NqáʅDǡËñ­ƁYÅy̱os§ȋµʽǘǏƬɱàưN¢ƔÊuľýľώȪƺɂļxZĈ}ÌŉŪĺœĭFЛĽ̅ȣͽÒŵìƩÇϋÿȮǡŏçƑůĕ~Ç¼ȳÐUfdIxÿ\\G zâɏÙOº·pqy£@qþ@Ǟ˽IBäƣzsÂZÁàĻdñ°ŕzéØűzșCìDȐĴĺf®Àľưø@ɜÖÞKĊŇƄ§͑těï͡VAġÑÑ»d³öǍÝXĉĕÖ{þĉu¸ËʅğU̎éhɹƆ̗̮ȘǊ֥ड़ࡰţાíϲäʮW¬®ҌeרūȠkɬɻ̼ãüfƠSצɩςåȈHϚÎKǳͲOðÏȆƘ¼CϚǚ࢚˼ФÔ¤ƌĞ̪Qʤ´¼mȠJˀƲÀɠmǐnǔĎȆÞǠN~ʢĜ¶ƌĆĘźʆȬ˪ĚĒ¸ĞGȖƴƀj`ĢçĶāàŃºēĢĖćYÀŎüôQÐÂŎŞǆŞêƖoˆDĤÕºÑǘÛˤ³̀gńƘĔÀ^ªƂ`ªt¾äƚêĦĀ¼ÐĔǎ¨Ȕ»͠^ˮÊȦƤøxRrŜH¤¸ÂxDÄ|ø˂˜ƮÐ¬ɚwɲFjĔ²Äw°ǆdÀÉ_ĸdîàŎjÊêTĞªŌŜWÈ|tqĢUB~´°ÎFCU¼pĀēƄN¦¾O¶łKĊOjĚj´ĜYp{¦SĚÍ\\T×ªV÷Ší¨ÅDK°ßtŇĔK¨ǵÂcḷ̌ĚǣȄĽFlġUĵŇȣFʉɁMğįʏƶɷØŭOǽ«ƽū¹Ʊő̝Ȩ§ȞʘĖiɜɶʦ}¨֪ࠜ̀ƇǬ¹ǨE˦ĥªÔêFxúQEr´Wrh¤Ɛ \\talĈDJÜ|[Pll̚¸ƎGú´P¬W¦^¦H]prRn|or¾wLVnÇIujkmon£cX^Bh`¥V¦U¤¸}xRj[^xN[~ªxQ[`ªHÆÂExx^wN¶Ê|¨ìMrdYpoRzNyÀDs~bcfÌ`L¾n|¾T°c¨È¢ar¤`[|òDŞĔöxElÖdHÀI`Ď\\Àì~ÆR¼tf¦^¢ķ¶eÐÚMptgjɡČÅyġLûŇV®ÄÈƀĎ°P|ªVVªj¬ĚÒêp¬E|ŬÂc|ÀtƐK f{ĘFĒƌXƲąo½Ę\\¥o}Ûu£ç­kX{uĩ«āíÓUŅßŢqŤ¥lyň[oi{¦LńðFȪȖĒL¿Ìf£K£ʺoqNwğc`uetOj×°KJ±qÆġmĚŗos¬qehqsuH{¸kH¡ÊRǪÇƌbȆ¢´äÜ¢NìÉʖ¦â©Ġu¦öČ^â£ĂhĖMÈÄw\\fŦ°W ¢¾luŸDw\\̀ʉÌÛMĀ[bÓEn}¶Vcês"]],"encodeOffsets":[[[129102,52189]]]}},{"type":"Feature","id":"210000","properties":{"id":"210000","cp":[123.429096,41.796767],"name":"辽宁","childNum":16},"geometry":{"type":"MultiPolygon","coordinates":[["@@L@@sa"],["@@MnNm"],["@@dc"],["@@eÀC@b"],["@@fXwkbrÄ`qg"],["@@^jtWQ"],["@@~ Y]c"],["@@G`ĔN^_¿ZÃM"],["@@iX¶BY"],["@@YZ"],["@@L_{Epf"],["@@^WqCT\\"],["@@\\[§t|¤_"],["@@m`n_"],["@@Ïxǌ{q_×^Giip"],["@@@é^BntaÊU]x ¯ÄPĲ­°hʙK³VÕ@Y~|EvĹsÇ¦­L^pÃ²ŸÒG Ël]xxÄ_fT¤Ď¤cPC¨¸TVjbgH²sdÎdHt`B²¬GJję¶[ÐhjeXdlwhðSČ¦ªVÊÏÆZÆŶ®²^ÎyÅÎcPqńĚDMħĜŁH­kçvV[ĳ¼WYÀäĦ`XlR`ôLUVfK¢{NZdĒªYĸÌÚJRr¸SA|ƴgŴĴÆbvªØX~źB|¦ÕE¤Ð`\\|KUnnI]¤ÀÂĊnŎR®Ő¿¶\\ÀøíDm¦ÎbŨabaĘ\\ľãÂ¸atÎSƐ´©v\\ÖÚÌǴ¤Â¨JKrZ_ZfjþhPkx`YRIjJcVf~sCN¤ EhæmsHy¨SðÑÌ\\\\ĐRZk°IS§fqŒßýáĞÙÉÖ[^¯ǤŲê´\\¦¬ĆPM¯£»uïpùzExanµyoluqe¦W^£ÊL}ñrkqWňûPUP¡ôJoo·U}£[·¨@XĸDXm­ÛÝºGUCÁª½{íĂ^cjk¶Ã[q¤LÉö³cux«zZf²BWÇ®Yß½ve±ÃCý£W{Ú^q^sÑ·¨ÍOt¹·C¥GDrí@wÕKţÃ«V·i}xËÍ÷i©ĝɝǡ]{c±OW³Ya±_ç©HĕoƫŇqr³Lys[ñ³¯OSďOMisZ±ÅFC¥Pq{Ã[Pg}\\¿ghćOk^ģÁFıĉĥM­oEqqZûěŉ³F¦oĵhÕP{¯~TÍlªNßYÐ{Ps{ÃVUeĎwk±ŉVÓ½ŽJãÇÇ»Jm°dhcÀffdF~ĀeĖd`sx² ®EżĀdQÂd^~ăÔH¦\\LKpĄVez¤NP ǹÓRÆąJSh­a[¦´ÂghwmBÐ¨źhI|VV|p] Â¼èNä¶ÜBÖ¼L`¼bØæKVpoúNZÞÒKxpw|ÊEMnzEQIZZNBčÚFÜçmĩWĪñtÞĵÇñZ«uD±|Əlĳ¥ãn·±PmÍada CLǑkùó¡³Ï«QaċÏOÃ¥ÕđQȥċƭy³ÃA"]],"encodeOffsets":[[[123686,41445]],[[126019,40435]],[[124393,40128]],[[126117,39963]],[[125322,40140]],[[126686,40700]],[[126041,40374]],[[125584,40168]],[[125453,40165]],[[125362,40214]],[[125280,40291]],[[125774,39997]],[[125976,40496]],[[125822,39993]],[[125509,40217]],[[122731,40949]]]}},{"type":"Feature","id":"220000","properties":{"id":"220000","cp":[125.3245,43.886841],"name":"吉林","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@pä³PClFbbÍzwBGĭZÅi»lY­ċ²SgkÇ£^Sqd¯R©é£¯S\\cZ¹iűƏCuƍÓXoR}M^o£R}oªU­FuuXHlEÅÏ©¤ÛmTþ¤D²ÄufàÀ­XXÈ±AeyYw¬dvõ´KÊ£\\rµÄlidā]|î©¾DÂVH¹Þ®ÜWnCķ W§@\\¸~¤Vp¸póIO¢VOŇürXql~òÉK]¤¥Xrfkvzpm¶bwyFoúvð¼¤ N°ąO¥«³[éǡű_°Õ\\ÚÊĝþâőàerR¨­JYlďQ[ ÏYëÐ§TGztnß¡gFkMāGÁ¤ia ÉÈ¹`\\xs¬dĆkNnuNUuP@vRY¾\\¢GªóĄ~RãÖÎĢùđŴÕhQxtcæëSɽŉíëǉ£ƍG£nj°KƘµDsØÑpyĆ¸®¿bXp]vbÍZuĂ{n^IüÀSÖ¦EvRÎûh@â[ƏÈô~FNr¯ôçR±­HÑlĢ^¤¢OðævxsŒ]ÞÁTĠs¶¿âÆGW¾ìA¦·TÑ¬è¥ÏÐJ¨¼ÒÖ¼ƦɄxÊ~StD@Ă¼Ŵ¡jlºWvÐzƦZÐ²CH AxiukdGgetqmcÛ£Ozy¥cE}|¾cZk¿uŐã[oxGikfeäT@SUwpiÚFM©£è^Ú`@v¶eňf heP¶täOlÃUgÞzŸU`l}ÔÆUvØ_Ō¬Öi^ĉi§²ÃB~¡ĈÚEgc|DC_Ȧm²rBx¼MÔ¦ŮdĨÃâYxƘDVÇĺĿg¿cwÅ\\¹¥Yĭl¤OvLjM_a W`zļMž·\\swqÝSAqŚĳ¯°kRē°wx^ĐkǂÒ\\]nrĂ}²ĊŲÒøãh·M{yMzysěnĒġV·°G³¼XÀ¤¹i´o¤ŃÈ`ÌǲÄUĞd\\iÖmÈBĤÜɲDEh LG¾ƀÄ¾{WaYÍÈĢĘÔRîĐj}ÇccjoUb½{h§Ǿ{KƖµÎ÷GĀÖŠåưÎs­lyiē«`å§H¥Ae^§GK}iã\\c]v©ģZmÃ|[M}ģTɟĵÂÂ`ÀçmFK¥ÚíÁbX³ÌQÒHof{]ept·GŋĜYünĎųVY^ydõkÅZW«WUa~U·SbwGçǑiW^qFuNĝ·EwUtW·Ýďæ©PuqEzwAVXRãQ`­©GMehccďÏd©ÑW_ÏYƅ»é\\ɹ~ǙG³mØ©BšuT§Ĥ½¢Ã_Ã½L¡ýqT^rme\\PpZZbyuybQefµ]UhĿDCmûvaÙNSkCwncćfv~YÇG"],"encodeOffsets":[[130196,42528]]}},{"type":"Feature","id":"230000","properties":{"id":"230000","cp":[128.642464,46.756967],"name":"黑龙江","childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@UµNÿ¥īèçHÍøƕ¶Lǽ|g¨|a¾pVidd~ÈiíďÓQġėÇZÎXb½|ſÃH½KFgɱCģÛÇAnjÕc[VĝǱÃËÇ_ £ń³pj£º¿»WH´¯U¸đĢmtĜyzzNN|g¸÷äűÑ±ĉā~mq^[ǁÑďlw]¯xQĔ¯l°řĴrBÞTxr[tŽ¸ĻN_yX`biNKuP£kZĮ¦[ºxÆÀdhĹŀUÈƗCwáZħÄŭcÓ¥»NAw±qȥnD`{ChdÙFć}¢A±Äj¨]ĊÕjŋ«×`VuÓÅ~_kŷVÝyhVkÄãPsOµfgeŇµf@u_Ù ÙcªNªÙEojVxT@ãSefjlwH\\pŏäÀvlY½d{F~¦dyz¤PÜndsrhfHcvlwjF£G±DÏƥYyÏu¹XikĿ¦ÏqƗǀOŜ¨LI|FRĂn sª|C˜zxAè¥bfudTrFWÁ¹Am|ĔĕsķÆF´N}ćUÕ@Áĳſmuçuð^ÊýowFzØÎĕNőǏȎôªÌŒǄàĀÄ˄ĞŀƒʀĀƘŸˮȬƬĊ°Uzouxe]}AyÈW¯ÌmKQ]Īºif¸ÄX|sZt|½ÚUÎ lk^p{f¤lºlÆW A²PVÜPHÊâ]ÎĈÌÜk´\\@qàsĔÄQºpRij¼èi`¶bXrBgxfv»uUi^v~J¬mVp´£´VWrnP½ì¢BX¬hðX¹^TjVriªjtŊÄmtPGx¸bgRsT`ZozÆO]ÒFôÒOÆŊvÅpcGêsx´DR{AEOr°x|íb³Wm~DVjºéNNËÜ˛ɶ­GxŷCSt}]ûōSmtuÇÃĕNāg»íT«u}ç½BĵÞʣ¥ëÊ¡MÛ³ãȅ¡ƋaǩÈÉQG¢·lG|tvgrrf«ptęŘnÅĢrI²¯LiØsPf_vĠdxM prʹL¤¤eËÀđKïÙVY§]Ióáĥ]ķK¥j|pŇ\\kzţ¦šnņäÔVĂîĪ¬|vW®l¤èØrxm¶ă~lÄƯĄ̈́öȄEÔ¤ØQĄĄ»ƢjȦOǺ¨ìSŖÆƬyQv`cwZSÌ®ü±Ǆ]ŀç¬B¬©ńzƺŷɄeeOĨSfm ĊƀP̎ēz©ĊÄÕÊmgÇsJ¥ƔŊśæÎÑqv¿íUOµªÂnĦÁ_½ä@êí£P}Ġ[@gġ}gɊ×ûÏWXá¢užƻÌsNÍ½ƎÁ§čŐAēeL³àydl¦ĘVçŁpśǆĽĺſÊQíÜçÛġÔsĕ¬Ǹ¯YßċġHµ ¡eå`ļrĉŘóƢFìĎWøxÊkƈdƬv|I|·©NqńRŀ¤éeŊŀàŀU²ŕƀBQ£Ď}L¹Îk@©ĈuǰųǨÚ§ƈnTËÇéƟÊcfčŤ^XmHĊĕË«W·ċëx³ǔķÐċJāwİ_ĸȀ^ôWr­°oú¬ĦŨK~ȰCĐ´Ƕ£fNÎèâw¢XnŮeÂÆĶ¾¾xäLĴĘlļO¤ÒĨA¢Êɚ¨®ØCÔ ŬGƠƦYĜĘÜƬDJg_ͥœ@čŅĻA¶¯@wÎqC½Ĉ»NăëKďÍQÙƫ[«ÃígßÔÇOÝáWñuZ¯ĥŕā¡ÑķJu¤E å¯°WKÉ±_d_}}vyõu¬ï¹ÓU±½@gÏ¿rÃ½DgCdµ°MFYxw¿CG£Rƛ½Õ{]L§{qqą¿BÇƻğëܭǊË|c²}Fµ}ÙRsÓpg±QNqǫŋRwŕnéÑÉK«SeYRŋ@{¤SJ}D Ûǖ֍]gr¡µŷjqWÛham³~S«Þ]"]],"encodeOffsets":[[[134456,44547]]]}},{"type":"Feature","id":"320000","properties":{"id":"320000","cp":[119.767413,33.041544],"name":"江苏","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@cþÅPi`ZRu¥É\\]~°Y`µÓ^phÁbnÀşúòaĬºTÖŒbe¦¦{¸ZâćNp©Hr|^mjhSEb\\afv`sz^lkljÄtg¤D­¾X¿À|ĐiZȀåB·î}GL¢õcßjayBFµÏC^ĭcÙt¿sğH]j{s©HM¢QnDÀ©DaÜÞ·jgàiDbPufjDk`dPOîhw¡ĥ¥GP²ĐobºrYî¶aHŢ´ ]´rılw³r_{£DB_Ûdåuk|Ũ¯F Cºyr{XFye³Þċ¿ÂkĭB¿MvÛpm`rÚã@Ę¹hågËÖƿxnlč¶Åì½Ot¾dJlVJĂǀŞqvnO^JZż·Q}êÍÅmµÒ]ƍ¦Dq}¬R^èĂ´ŀĻĊIÔtĲyQŐĠMNtR®òLhĚs©»}OÓGZz¶A\\jĨFäOĤHYJvÞHNiÜaĎÉnFQlNM¤B´ĄNöɂtpŬdfåqm¿QûùŞÚb¤uŃJŴu»¹ĄlȖħŴw̌ŵ²ǹǠ͛hĭłƕrçü±Yxcitğ®jű¢KOķCoy`å®VTa­_Ā]ŐÝɞï²ʯÊ^]afYǸÃĆēĪȣJđ͍ôƋÄÄÍīçÛɈǥ£­ÛmY`ó£Z«§°Ó³QafusNıǅ_k}¢m[ÝóDµ¡RLčiXyÅNïă¡¸iĔÏNÌŕoēdōîåŤûHcs}~Ûwbù¹£¦ÓCtOPrE^ÒogĉIµÛÅʹK¤½phMü`oæŀ"],"encodeOffsets":[[121740,32276]]}},{"type":"Feature","id":"330000","properties":{"id":"330000","cp":[120.153576,29.287459],"name":"浙江","childNum":45},"geometry":{"type":"MultiPolygon","coordinates":[["@@E^dQ]K"],["@@jX^j"],["@@sfbU"],["@@qP\\xz[ck"],["@@R¢FX}°[s_"],["@@Cb\\}"],["@@e|v\\la{u"],["@@v~u}"],["@@QxÂF¯}"],["@@¹nvÞs¯o"],["@@rSkUEj"],["@@bi­ZP"],["@@p[}INf"],["@@À¿"],["@@¹dnb"],["@@rSBnR"],["@@g~h}"],["@@FlEk"],["@@OdPc"],["@@v[u\\"],["@@FjâL~wyoo~sµL\\"],["@@¬e¹aN"],["@@\\nÔ¡q]L³ë\\ÿ®QÖ"],["@@ÊA­©[¬"],["@@Kxv­"],["@@@hlIk]"],["@@pW{o||j"],["@@Md|_mC"],["@@¢X£ÏylD¼XtH"],["@@hlÜ[LykAvyfw^E¤"],["@@fp¤MusR"],["@@®_ma~LÁ¬Z"],["@@iMxZ"],["@@ZcYd"],["@@Z~dOSo|A¿qZv"],["@@@`EN¡v"],["@@|TY{"],["@@@n@m"],["@@XWkCT\\"],["@@ºwZRkĕWO¢"],["@@X®±GrÆª\\ÔáXq{"],["@@ůTG°ĄLHm°UC"],["@@¤aÜx~}dtüGæţŎíĔcŖpMËÐjē¢·ðĄÆMzjWKĎ¢Q¶À_ê_Bıi«pZgf¤Nrq]§ĂN®«H±yƳí¾×ŸīàLłčŴǝĂíÀBŖÕªÁŖHŗŉåqûõi¨hÜ·ñt»¹ýv_[«¸mYL¯QªmĉÅdMgÇjcº«ę¬­K­´B«Âącoċ\\xKd¡gěŧ«®á[~ıxu·ÅKsËÉc¢Ù\\ĭƛëbf¹­ģSĜkáƉÔ­ĈZB{aMµfzŉfåÂŧįƋǝÊĕġć£g³ne­ą»@­¦S®\\ßðChiqªĭiAuA­µ_W¥ƣO\\lċĢttC¨£t`PZäuXßBsĻyekOđġĵHuXBµ]×­­\\°®¬F¢¾pµ¼kŘó¬Wät¸|@L¨¸µrºù³Ù~§WIZW®±Ð¨ÒÉx`²pĜrOògtÁZ}þÙ]¡FKwsPlU[}¦Rvn`hq¬\\nQ´ĘRWb_ rtČFIÖkĦPJ¶ÖÀÖJĈĄTĚòC ²@PúØz©Pî¢£CÈÚĒ±hŖl¬â~nm¨f©iļ«mntuÖZÜÄjL®EÌFª²iÊxØ¨IÈhhst"],["@@o\\VzRZ}y"],["@@@°¡mÛGĕ¨§Ianá[ýƤjfæØLäGr"]],"encodeOffsets":[[[125592,31553]],[[125785,31436]],[[125729,31431]],[[125513,31380]],[[125223,30438]],[[125115,30114]],[[124815,29155]],[[124419,28746]],[[124095,28635]],[[124005,28609]],[[125000,30713]],[[125111,30698]],[[125078,30682]],[[125150,30684]],[[124014,28103]],[[125008,31331]],[[125411,31468]],[[125329,31479]],[[125626,30916]],[[125417,30956]],[[125254,30976]],[[125199,30997]],[[125095,31058]],[[125083,30915]],[[124885,31015]],[[125218,30798]],[[124867,30838]],[[124755,30788]],[[124802,30809]],[[125267,30657]],[[125218,30578]],[[125200,30562]],[[124968,30474]],[[125167,30396]],[[124955,29879]],[[124714,29781]],[[124762,29462]],[[124325,28754]],[[123990,28459]],[[125366,31477]],[[125115,30363]],[[125369,31139]],[[122495,31878]],[[125329,30690]],[[125192,30787]]]}},{"type":"Feature","id":"340000","properties":{"id":"340000","cp":[117.283042,31.26119],"name":"安徽","childNum":3},"geometry":{"type":"MultiPolygon","coordinates":[["@@^iuLX^"],["@@e©Ehl"],["@@°ZÆëĎµmkǀwÌÕæhºgBĝâqÙĊzÖgņtÀÁĂÆáhEz|WzqD¹°Eŧl{ævÜcA`¤C`|´qxĲkq^³³GšµbíZ¹qpa±ď OH¦Ħx¢gPícOl_iCveaOjChß¸iÝbÛªCC¿mRV§¢A|t^iĠGÀtÚsd]ĮÐDE¶zAb àiödK¡~H¸íæAǿYj{ď¿À½W®£ChÃsikkly]_teu[bFaTign{]GqªoĈMYá|·¥f¥őaSÕėNµñĞ«Im_m¿Âa]uĜp Z_§{Cäg¤°r[_YjÆOdý[I[á·¥Q_nùgL¾mvˊBÜÆ¶ĊJhpc¹O]iŠ]¥ jtsggJÇ§w×jÉ©±EFË­KiÛÃÕYvsm¬njĻª§emná}k«ŕgđ²ÙDÇ¤í¡ªOy×Où±@DñSęćăÕIÕ¿IµĥOjNÕËT¡¿tNæŇàåyķrĕq§ÄĩsWÆßF¶X®¿mwRIÞfßoG³¾©uyHį{Ɓħ¯AFnuPÍÔzVdàôº^Ðæd´oG¤{S¬ćxã}ŧ×Kǥĩ«ÕOEÐ·ÖdÖsƘÑ¨[Û^Xr¢¼§xvÄÆµ`K§ tÒ´Cvlo¸fzŨð¾NY´ı~ÉĔēßúLÃÃ_ÈÏ|]ÂÏFlg`ben¾¢pUh~ƴĖ¶_r sĄ~cƈ]|r c~`¼{À{ȒiJjz`îÀT¥Û³]u}fïQl{skloNdjäËzDvčoQďHI¦rbtHĔ~BmlRV_ħTLnñH±DL¼Lªl§Ťa¸ĚlK²\\RòvDcÎJbt[¤D@®hh~kt°ǾzÖ@¾ªdbYhüóZ ň¶vHrľ\\ÊJuxAT|dmÀO[ÃÔG·ĚąĐlŪÚpSJ¨ĸLvÞcPæķŨ®mÐálwKhïgA¢ųÆ©Þ¤OÈm°K´"]],"encodeOffsets":[[[121722,32278]],[[119475,30423]],[[119168,35472]]]}},{"type":"Feature","id":"350000","properties":{"id":"350000","cp":[118.306239,26.075302],"name":"福建","childNum":18},"geometry":{"type":"MultiPolygon","coordinates":[["@@zht´]"],["@@aj^~ĆG©O"],["@@ed¨C}}i"],["@@@vPGsQ"],["@@sBzddW]Q"],["@@S¨Q{"],["@@NVucW"],["@@qptBAq"],["@@¸[mu"],["@@Q\\pD]_"],["@@jSwUadpF"],["@@eXª~"],["@@AjvFso"],["@@fT_Çí\\v|ba¦jZÆy°"],["@@IjJi"],["@@wJIx«¼AoNe{M­"],["@@K±¡ÓČäeZ"],["@@k¡¹Eh~c®wBkUplÀ¡I~Māe£bN¨gZý¡a±Öcp©PhI¢QqÇGj|¥U g[Ky¬ŏv@OptÉEF\\@ åA¬V{XģĐBycpě¼³Ăp·¤¥ohqqÚ¡ŅLs^Ã¡§qlÀhH¨MCe»åÇGD¥zPO£čÙkJA¼ßėuĕeûÒiÁŧSW¥Qûŗ½ùěcÝ§SùĩąSWó«íęACµeRåǃRCÒÇZÍ¢ź±^dlstjD¸ZpuÔâÃH¾oLUêÃÔjjēò´ĄWƛ^Ñ¥Ħ@ÇòmOw¡õyJyD}¢ďÑÈġfZda©º²z£NjD°Ötj¶¬ZSÎ~¾c°¶ÐmxO¸¢Pl´SL|¥AȪĖMņĲg®áIJČĒü` QF¬h|ĂJ@zµ |ê³È ¸UÖŬŬÀEttĸr]ðM¤ĶĲHtÏ AĬkvsq^aÎbvdfÊòSD´Z^xPsĂrvƞŀjJd×ŘÉ ®AÎ¦ĤdxĆqAZRÀMźnĊ»İÐZ YXæJyĊ²·¶q§·K@·{sXãô«lŗ¶»o½E¡­«¢±¨Y®Ø¶^AvWĶGĒĢPlzfļtàAvWYãO_¤sD§ssČġ[kƤPX¦`¶®BBvĪjv©jx[L¥àï[F¼ÍË»ğV`«Ip}ccÅĥZEãoP´B@D¸m±z«Ƴ¿å³BRØ¶Wlâþäą`]Z£Tc ĹGµ¶Hm@_©k¾xĨôȉðX«½đCIbćqK³ÁÄš¬OAwã»aLŉËĥW[ÂGIÂNxĳ¤D¢îĎÎB§°_JGs¥E@¤ućPåcuMuw¢BI¿]zG¹guĮck\\_"]],"encodeOffsets":[[[123250,27563]],[[122541,27268]],[[123020,27189]],[[122916,27125]],[[122887,26845]],[[122808,26762]],[[122568,25912]],[[122778,26197]],[[122515,26757]],[[122816,26587]],[[123388,27005]],[[122450,26243]],[[122578,25962]],[[121255,25103]],[[120987,24903]],[[122339,25802]],[[121042,25093]],[[122439,26024]]]}},{"type":"Feature","id":"360000","properties":{"id":"360000","cp":[115.592151,27.676493],"name":"江西","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@ĢĨƐgļ¼ÂMD~ņªe^\\^§ý©j×cZØ¨zdÒa¶lÒJìõ`oz÷@¤uŞ¸´ôęöY¼HČƶajlÞƩ¥éZ[|h}^U  ¥pĄžƦO lt¸Æ Q\\aÆ|CnÂOjt­ĚĤdÈF`¶@Ðë ¦ōÒ¨SêvHĢûXD®QgÄWiØPÞìºr¤ǆNĠ¢lĄtZoCƞÔºCxrpĠV®Ê{f_Y`_eq®Aot`@oDXfkp¨|s¬\\DÄSfè©Hn¬^DhÆyøJhØxĢĀLÊƠPżċĄwȠĚ¦G®ǒĤäTŠÆ~Ħw«|TF¡nc³Ïå¹]ĉđxe{ÎÓvOEm°BƂĨİ|Gvz½ª´HàpeJÝQxnÀW­EµàXÅĪt¨ÃĖrÄwÀFÎ|ňÓMå¼ibµ¯»åDT±m[r«_gmQu~¥V\\OkxtL E¢Ú^~ýêPóqoě±_Êw§ÑªåƗā¼mĉŹ¿NQYBąrwģcÍ¥B­ŗÊcØiIƝĿuqtāwO]³YCñTeÉcaubÍ]trluīBÐGsĵıN£ï^ķqss¿FūūVÕ·´Ç{éĈýÿOER_đûIċâJh­ŅıNȩĕB¦K{Tk³¡OP·wnµÏd¯}½TÍ«YiµÕsC¯iM¤­¦¯P|ÿUHvhe¥oFTuõ\\OSsMòđƇiaºćXĊĵà·çhƃ÷Ç{ígu^đgm[×zkKN¶Õ»lčÓ{XSÆv©_ÈëJbVkĔVÀ¤P¾ºÈMÖxlò~ªÚàGĂ¢B±ÌKyáV¼Ã~­`gsÙfIƋlę¹e|~udjuTlXµf`¿Jd[\\L²"],"encodeOffsets":[[116689,26234]]}},{"type":"Feature","id":"370000","properties":{"id":"370000","cp":[118.000923,36.275807],"name":"山东","childNum":13},"geometry":{"type":"MultiPolygon","coordinates":[["@@Xjd]{K"],["@@itbFHy"],["@@HlGk"],["@@TGy"],["@@K¬U"],["@@WdXc"],["@@PtOs"],["@@LnXhc"],["@@ppVu]Or"],["@@cdzAUa"],["@@udRhnCI"],["@@oIpR"],["@@Ľč{fzƤîKÎMĮ]ZF½Y]â£ph¶¨râøÀÎǨ¤^ºÄGz~grĚĜlĞÆLĆǆ¢Îo¦cvKbgr°WhmZp L]LºcUÆ­nżĤÌĒbAnrOA´ȊcÀbƦUØrĆUÜøĬƞEzVL®öØBkŖÝĐĖ¹ŧ̄±ÀbÎÉnb²ĦhņBĖįĦåXćì@L¯´ywƕCéÃµė ƿ¸lµ¾Z|ZWyFY¨Mf~C¿`à_RÇzwƌfQnny´INoƬèôº|sTJULîVjǎ¾ĒØDz²XPn±ŴPè¸ŔLƔÜƺ_TüÃĤBBċÈöA´faM¨{«M`¶d¡ôÖ°mȰBÔjj´PM|c^d¤u¤Û´ä«ƢfPk¶Môl]Lb}su^ke{lCMrDÇ­]NÑFsmoõľHyGă{{çrnÓEƕZGª¹Fj¢ïWuøCǷë¡ąuhÛ¡^KxC`C\\bÅxì²ĝÝ¿_NīCȽĿåB¥¢·IŖÕy\\¹kxÃ£Č×GDyÃ¤ÁçFQ¡KtŵƋ]CgÏAùSedcÚźuYfyMmhUWpSyGwMPqŀÁ¼zK¶G­Y§Ë@´śÇµƕBm@IogZ¯uTMx}CVKï{éƵP_K«pÛÙqċtkkù]gTğwoɁsMõ³ăAN£MRkmEÊčÛbMjÝGuIZGPģãħE[iµBEuDPÔ~ª¼ęt]ûG§¡QMsğNPŏįzs£Ug{đJĿļā³]ç«Qr~¥CƎÑ^n¶ÆéÎR~Ż¸YI] PumŝrƿIā[xeÇ³L¯v¯s¬ÁY~}ťuŁgƋpÝĄ_ņī¶ÏSR´ÁP~¿Cyċßdwk´SsX|t`Ä ÈðAªìÎT°¦Dda^lĎDĶÚY°`ĪŴǒàŠv\\ebZHŖR¬ŢƱùęOÑM­³FÛWp["]],"encodeOffsets":[[[123806,39303]],[[123821,39266]],[[123742,39256]],[[123702,39203]],[[123649,39066]],[[123847,38933]],[[123580,38839]],[[123894,37288]],[[123043,36624]],[[123344,38676]],[[123522,38857]],[[123628,38858]],[[118260,36742]]]}},{"type":"Feature","id":"410000","properties":{"id":"410000","cp":[113.665412,33.757975],"name":"河南","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@ýLùµP³swIÓxcŢĞð´E®ÚPtĴXØxÂ¶@«ŕŕQGYfa[şußǩđš_X³ĳÕčC]kbc¥CS¯ëÍB©÷³­Si_}mYTt³xlàcČzÀD}ÂOQ³ÐTĨ¯ƗòËŖ[hłŦv~}ÂZ«¤lPÇ£ªÝŴÅR§ØnhctâknÏ­ľŹUÓÝdKuķI§oTũÙďkęĆH¸Ó\\Ä¿PcnS{wBIvÉĽ[GqµuŇôYgûZca©@½Õǽys¯}lgg@­C\\£asIdÍuCQñ[L±ęk·ţb¨©kK»KC²òGKmĨS`UQnk}AGēsqaJ¥ĐGRĎpCuÌy ã iMcplk|tRkðev~^´¦ÜSí¿_iyjI|ȑ|¿_»d}q^{Ƈdă}tqµ`Ƴĕg}V¡om½faÇo³TTj¥tĠRyK{ùÓjuµ{t}uËRivGçJFjµÍyqÎàQÂFewixGw½Yŷpµú³XU½ġyłåkÚwZX·l¢Á¢KzOÎÎjc¼htoDHr|­J½}JZ_¯iPq{tę½ĕ¦Zpĵø«kQĹ¤]MÛfaQpě±ǽ¾]u­Fu÷nčÄ¯ADp}AjmcEÇaª³o³ÆÍSƇĈÙDIzËčľ^KLiÞñ[aA²zzÌ÷D|[íÄ³gfÕÞd®|`Ć~oĠƑô³ŊD×°¯CsøÀ«ìUMhTº¨¸ǡîSÔDruÂÇZÖEvPZW~ØÐtĄE¢¦Ðy¸bô´oŬ¬²Ês~]®tªapŎJ¨Öº_Ŕ`Ŗ^Đ\\Ĝu~m²Ƹ¸fWĦrƔ}Î^gjdfÔ¡J}\\n C¦þWxªJRÔŠu¬ĨĨmFdM{\\d\\YÊ¢ú@@¦ª²SÜsC}fNècbpRmlØ^gd¢aÒ¢CZZxvÆ¶N¿¢T@uC¬^ĊðÄn|lGlRjsp¢ED}Fio~ÔN~zkĘHVsǲßjŬŢ`Pûàl¢\\ÀEhİgÞē X¼Pk|m"],"encodeOffsets":[[118256,37017]]}},{"type":"Feature","id":"420000","properties":{"id":"420000","cp":[113.298572,30.684355],"name":"湖北","childNum":3},"geometry":{"type":"MultiPolygon","coordinates":[["@@AB"],["@@lskt"],["@@¾«}{ra®pîÃ\\{øCËyyB±b\\òÝjKL ]ĎĽÌJyÚCƈćÎT´Å´pb©ÈdFin~BCo°BĎÃømv®E^vǾ½Ĝ²RobÜeN^ĺ£R¬lĶ÷YoĖ¥Ě¾|sOr°jY`~I¾®I{GqpCgyl{£ÍÍyPLÂ¡¡¸kWxYlÙæŁĢz¾V´W¶ùŸo¾ZHxjwfxGNÁ³Xéæl¶EièIH ujÌQ~v|sv¶Ôi|ú¢FhQsğ¦SiŠBgÐE^ÁÐ{čnOÂÈUÎóĔÊēĲ}Z³½Mŧïeyp·uk³DsÑ¨L¶_ÅuÃ¨w»¡WqÜ]\\Ò§tƗcÕ¸ÕFÏǝĉăxŻČƟOKÉġÿ×wg÷IÅzCg]m«ªGeçÃTC«[t§{loWeC@ps_Bp­rf_``Z|ei¡oċMqow¹DƝÓDYpûsYkıǃ}s¥ç³[§cY§HK«Qy]¢wwö¸ïx¼ņ¾Xv®ÇÀµRĠÐHM±cÏdƒǍũȅȷ±DSyúĝ£ŤĀàtÖÿï[îb\\}pĭÉI±Ñy¿³x¯No|¹HÏÛmjúË~TuęjCöAwě¬Rđl¯ Ñb­ŇTĿ_[IčĄʿnM¦ğ\\É[T·k¹©oĕ@A¾wya¥Y\\¥Âaz¯ãÁ¡k¥ne£ÛwE©Êō¶˓uoj_U¡cF¹­[WvP©whuÕyBF`RqJUw\\i¡{jEPïÿ½fćQÑÀQ{°fLÔ~wXgītêÝ¾ĺHd³fJd]HJ²EoU¥HhwQsƐ»Xmg±çve]DmÍPoCc¾_hhøYrŊU¶eD°Č_N~øĹĚ·`z]Äþp¼äÌQv\\rCé¾TnkžŐÚÜa¼ÝƆĢ¶ÛodĔňÐ¢JqPb ¾|J¾fXƐîĨ_Z¯À}úƲN_ĒÄ^ĈaŐyp»CÇÄKñL³ġM²wrIÒŭxjb[n«øæà ^²­h¯ÚŐªÞ¸Y²ĒVø}Ā^İ´LÚm¥ÀJÞ{JVųÞŃx×sxxƈē ģMřÚðòIfĊŒ\\Ʈ±ŒdÊ§ĘDvČ_Àæ~Dċ´A®µ¨ØLV¦êHÒ¤"]],"encodeOffsets":[[[113712,34000]],[[115612,30507]],[[113649,34054]]]}},{"type":"Feature","id":"430000","properties":{"id":"430000","cp":[111.782279,28.09409],"name":"湖南","childNum":3},"geometry":{"type":"MultiPolygon","coordinates":[["@@nFTs"],["@@ßÅÆá½ÔXrCOËRïÿĩ­TooQyÓ[ŅBE¬ÎÓXaį§Ã¸G °ITxpúxÚĳ¥ÏĢ¾edÄ©ĸGàGhM¤Â_U}Ċ}¢pczfþg¤ÇòAVM"],["@@©KA·³CQ±Á«³BUƑ¹AtćOwD]JiØSm¯b£ylXHËÑ±H«C^õľAÅ§¤É¥ïyuǙuA¢^{ÌC´­¦ŷJ£^[ª¿ĕ~ƇN skóā¹¿ï]ă~÷O§­@Vm¡Qđ¦¢Ĥ{ºjÔª¥nf´~Õo×ÛąMąıuZmZcÒ ĲĪ²SÊǄŶ¨ƚCÖŎªQØ¼rŭ­«}NÏürÊ¬mjr@ĘrTW ­SsdHzƓ^ÇÂyUi¯DÅYlŹu{hT}mĉ¹¥ěDÿë©ıÓ[Oº£¥ótł¹MÕƪ`PDiÛU¾ÅâìUñBÈ£ýhedy¡oċ`pfmjP~kZaZsÐd°wj§@Ĵ®w~^kÀÅKvNmX\\¨aŃqvíó¿F¤¡@ũÑVw}S@j}¾«pĂrªg àÀ²NJ¶¶DôK|^ª°LX¾ŴäPĪ±£EXd^¶ĲÞÜ~u¸ǔMRhsRe`ÄofIÔ\\Ø  ićymnú¨cj ¢»GČìƊÿÐ¨XeĈĀ¾Oð Fi ¢|[jVxrIQ_EzAN¦zLU`cªxOTu RLÄ¢dVi`p˔vŎµªÉF~Ød¢ºgİàw¸Áb[¦Zb¦z½xBĖ@ªpºlS¸Ö\\Ĕ[N¥ˀmĎăJ\\ŀ`ňSÚĖÁĐiOĜ«BxDõĚivSÌ}iùÜnÐºG{p°M´wÀÒzJ²ò¨ oTçüöoÛÿñőĞ¤ùTz²CȆȸǎŪƑÐc°dPÎğË¶[È½u¯½WM¡­ÉB·rínZÒ `¨GA¾\\pēXhÃRC­üWGġuTé§ŎÑ©ò³I±³}_EÃħg®ęisÁPDmÅ{b[RÅs·kPŽƥóRoOV~]{g\\êYƪ¦kÝbiċƵGZ»Ěõó·³vŝ£ø@pyö_ëIkÑµbcÑ§y×dYØªiþ¨[]f]Ņ©C}ÁN»hĻħƏĩ"]],"encodeOffsets":[[[115640,30489]],[[112543,27312]],[[116690,26230]]]}},{"type":"Feature","id":"440000","properties":{"id":"440000","cp":[113.280637,23.125178],"name":"广东","childNum":24},"geometry":{"type":"MultiPolygon","coordinates":[["@@QdAua"],["@@lxDLo"],["@@sbhNLo"],["@@Ă ā"],["@@WltO[["],["@@Kr]S"],["@@eI]y"],["@@I|Mym"],["@@Û³LS¼Y"],["@@nvºBëui©`¾"],["@@zdÛJw®"],["@@°¯"],["@@a yAª¸ËJIxØ@ĀHAmÃV¡ofuo"],["@@sŗÃÔėAƁZÄ ~°ČPäh"],["@@¶ÝÌvmĞh­ıQ"],["@@HdSjĒ¢D}waru«ZqadYM"],["@@el\\LqqU"],["@@~rMo\\"],["@@f^C"],["@@øPªoj÷ÍÝħXČx°Q¨ıXNv"],["@@gÇƳo[~tly"],["@@EÆC¿"],["@@OP"],["@@wđógĝ[³¡VÙæÅöMÌ³¹pÁaËýý©D©ÜJŹƕģGą¤{ÙūÇO²«BƱéAÒĥ¡«BhlmtÃPµyU¯ucd·w_bŝcīímGO|KPȏŹãŝIŕŭŕ@Óoo¿ē±ß}ŭĲWÈCőâUâǙIğŉ©IĳE×Á³AówXJþ±ÌÜÓĨ£L]ĈÙƺZǾĆĖMĸĤfÎĵlŨnÈĐtFFĤêk¶^k°f¶g}®Faf`vXŲxl¦ÔÁ²¬Ð¦pqÊÌ²iXØRDÎ}Ä@ZĠsx®AR~®ETtĄZƈfŠŠHâÒÐAµ\\S¸^wĖkRzalŜ|E¨ÈNĀňZTpBh£\\ĎƀuXĖtKL¶G|»ĺEļĞ~ÜĢÛĊrOÙîvd]n¬VÊĜ°RÖpMƂªFbwEÀ©\\¤]ŸI®¥D³|Ë]CöAŤ¦æ´¥¸Lv¼¢ĽBaôF~®²GÌÒEYzk¤°ahlVÕI^CxĈPsBƒºV¸@¾ªR²ĨN]´_eavSivc}p}Đ¼ƌkJÚe th_¸ ºx±ò_xNË²@ă¡ßH©Ùñ}wkNÕ¹ÇO½¿£ĕ]ly_WìIÇª`uTÅxYĒÖ¼kÖµMjJÚwn\\hĒv]îh|ÈƄøèg¸Ķß ĉĈWb¹ƀdéĘNTtP[öSvrCZaGubo´ŖÒÇĐ~¡zCIözx¢PnÈñ @ĥÒ¦]ƞV}³ăĔñiiÄÓVépKG½ÄÓávYoC·sitiaÀyŧÎ¡ÈYDÑům}ý|m[węõĉZÅxUO}÷N¹³ĉo_qtăqwµŁYÙǝŕ¹tïÛUÃ¯mRCºĭ|µÕÊK½Rē ó]GªęAx»HO£|ām¡diď×YïYWªŉOeÚtĐ«zđ¹TāúEá²\\ķÍ}jYàÙÆſ¿Çdğ·ùTßÇţʄ¡XgWÀǇğ·¿ÃOj YÇ÷Qěi"]],"encodeOffsets":[[[117381,22988]],[[116552,22934]],[[116790,22617]],[[116973,22545]],[[116444,22536]],[[116931,22515]],[[116496,22490]],[[116453,22449]],[[113301,21439]],[[118726,21604]],[[118709,21486]],[[113210,20816]],[[115482,22082]],[[113171,21585]],[[113199,21590]],[[115232,22102]],[[115739,22373]],[[115134,22184]],[[113056,21175]],[[119573,21271]],[[119957,24020]],[[115859,22356]],[[116561,22649]],[[116285,22746]]]}},{"type":"Feature","id":"450000","properties":{"id":"450000","cp":[108.320004,22.82402],"name":"广西","childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@H TQ§A"],["@@ĨÊªLƊDÎĹĐCǦė¸zÚGn£¾rªŀÜt¬@ÖÚSx~øOŒŶÐÂæȠ\\ÈÜObĖw^oÞLf¬°bI lTØBÌF£Ć¹gñĤaYt¿¤VSñK¸¤nM¼JE±½¸ñoÜCƆæĪ^ĚQÖ¦^f´QüÜÊz¯lzUĺš@ìp¶n]sxtx¶@~ÒĂJb©gk{°~c°`Ô¬rV\\la¼¤ôá`¯¹LCÆbxEræOv[H­[~|aB£ÖsºdAĐzNÂðsÞÆĤªbab`ho¡³F«èVlo¤ÔRzpp®SĪº¨ÖºNĳd`a¦¤F³ºDÎńĀìCĜº¦Ċ~nS|gźvZkCÆj°zVÈÁƔ]LÊFZgčP­kini«qÇczÍY®¬Ů»qR×ō©DÕ§ƙǃŵTÉĩ±ıdÑnYYĲvNĆĆØÜ Öp}e³¦m©iÓ|¹ħņ|ª¦QF¢Â¬ʖovg¿em^ucà÷gÕuíÙćĝ}FĻ¼Ĺ{µHKsLSđƃrč¤[AgoSŇYMÿ§Ç{FśbkylQxĕ]T·¶[BÑÏGáşşƇeăYSs­FQ}­BwtYğÃ@~CÍQ ×WjË±rÉ¥oÏ ±«ÓÂ¥kwWűmcih³K~µh¯e]lµélEģEďsmÇŧē`ãògK_ÛsUʝćğ¶höO¤Ǜn³c`¡y¦CezYwa[ďĵűMę§]XÎ_íÛ]éÛUćİÕBƣ±dy¹T^dûÅÑŦ·PĻþÙ`K¦¢ÍeĥR¿³£[~äu¼dltW¸oRM¢ď\\z}Æzdvň{ÎXF¶°Â_ÒÂÏL©ÖTmu¼ãlīkiqéfA·Êµ\\őDc¥ÝFyÔćcűH_hLÜêĺĐ¨c}rn`½Ì@¸¶ªVLhŒ\\Ţĺk~Ġið°|gtTĭĸ^xvKVGréAébUuMJVÃO¡qĂXËSģãlýà_juYÛÒBG^éÖ¶§EGÅzěƯ¤EkN[kdåucé¬dnYpAyČ{`]þ¯TbÜÈk¡ĠvàhÂƄ¢Jî¶²"]],"encodeOffsets":[[[111707,21520]],[[107619,25527]]]}},{"type":"Feature","id":"460000","properties":{"id":"460000","cp":[109.83119,19.031971],"name":"海南","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@¦Ŝil¢XƦƞòïè§ŞCêɕrŧůÇąĻõ·ĉ³œ̅kÇm@ċȧŧĥĽʉ­ƅſȓÒË¦ŝE}ºƑ[ÍĜȋ gÎfǐÏĤ¨êƺ\\Ɔ¸ĠĎvʄȀÐ¾jNðĀÒRZǆzÐŘÎ°H¨Ƣb²_Ġ "],"encodeOffsets":[[112750,20508]]}},{"type":"Feature","id":"510000","properties":{"id":"510000","cp":[104.065735,30.659462],"name":"四川","childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@LqKr"],["@@[ĻéV£_ţġñpG réÏ·~ąSfy×Í·ºſƽiÍıƣıĻmHH}siaX@iÇ°ÁÃ×t«­T¤JJJyJÈ`Ohß¦¡uËhIyCjmÿwZGTiSsOB²fNmsPa{M{õE^Hj}gYpaeu¯oáwHjÁ½M¡pMuåmni{fk\\oÎqCwEZ¼KĝAy{m÷LwO×SimRI¯rKõBS«sFe]fµ¢óY_ÆPRcue°Cbo×bd£ŌIHgtrnyPt¦foaXďxlBowz_{ÊéWiêEGhÜ¸ºuFĈIxf®Y½ĀǙ]¤EyF²ċw¸¿@g¢§RGv»áW`ÃĵJwi]t¥wO­½a[×]`Ãi­üL¦LabbTÀåc}ÍhÆh®BHî|îºÉk­¤Sy£ia©taį·Ɖ`ō¥UhOĝLk}©Fos´JmµlŁuønÑJWÎªYÀïAetTŅÓGË«bo{ıwodƟ½OġÜÂµxàNÖ¾P²§HKv¾]|BÆåoZ`¡Ø`ÀmºĠ~ÌÐ§nÇ¿¤]wğ@srğu~Io[é±¹ ¿ſđÓ@qg¹zƱřaí°KtÇ¤V»Ã[ĩǭƑ^ÇÓ@áťsZÏÅĭƋěpwDóÖáŻneQËq·GCœýS]x·ýq³OÕ¶Qzßti{řáÍÇWŝŭñzÇWpç¿JXĩè½cFÂLiVjx}\\NŇĖ¥GeJA¼ÄHfÈu~¸Æ«dE³ÉMA|bÒćhG¬CMõƤąAvüVéŀ_VÌ³ĐwQj´·ZeÈÁ¨X´Æ¡Qu·»ÕZ³ġqDoy`L¬gdp°şp¦ėìÅĮZ°Iähzĵf²å ĚÑKpIN|Ñz]ń·FU×é»R³MÉ»GM«kiér}Ã`¹ăÞmÈnÁîRǀ³ĜoİzŔwǶVÚ£À]ɜ»ĆlƂ²ĠþTº·àUȞÏʦ¶I«dĽĢdĬ¿»Ĕ×h\\c¬ä²GêëĤł¥ÀǿżÃÆMº}BÕĢyFVvwxBèĻĒ©ĈtCĢɽŠȣ¦āæ·HĽîôNÔ~^¤Ɗu^s¼{TA¼ø°¢İªDè¾Ň¶ÝJ®Z´ğ~Sn|ªWÚ©òzPOȸbð¢|øĞŒQìÛÐ@ĞǎRS¤Á§di´ezÝúØã]HqkIþËQÇ¦ÃsÇ¤[E¬ÉŪÍxXƒ·ÖƁİlƞ¹ª¹|XÊwnÆƄmÀêErĒtD®ċæcQE®³^ĭ¥©l}äQtoŖÜqÆkµªÔĻĴ¡@Ċ°B²Èw^^RsºTĀ£ŚæQPJvÄz^Đ¹Æ¯fLà´GC²dt­ĀRt¼¤ĦOðğfÔðDŨŁĞƘïPÈ®âbMüÀXZ ¸£@Å»»QÉ­]dsÖ×_Í_ÌêŮPrĔĐÕGĂeZÜîĘqBhtO ¤tE[h|YÔZśÎs´xº±Uñt|OĩĠºNbgþJy^dÂY Į]Řz¦gC³R`Āz¢Aj¸CL¤RÆ»@­Ŏk\\Ç´£YW}z@Z}Ã¶oû¶]´^NÒ}èNªPÍy¹`S°´ATeVamdUĐwʄvĮÕ\\uÆŗ¨Yp¹àZÂmWh{á}WØǍÉüwga§áCNęÎ[ĀÕĪgÖÉªXøx¬½Ů¦¦[NÎLÜUÖ´òrÙŠxR^JkĳnDX{U~ET{ļº¦PZcjF²Ė@pg¨B{u¨ŦyhoÚD®¯¢ WòàFÎ¤¨GDäz¦kŮPġqË¥À]eâÚ´ªKxīPÖ|æ[xÃ¤JÞĥsNÖ½I¬nĨY´®ÐƐmDŝuäđđEbee_v¡}ìęǊē}qÉåT¯µRs¡M@}ůaa­¯wvƉåZw\\Z{åû^"]],"encodeOffsets":[[[108815,30935]],[[110617,31811]]]}},{"type":"Feature","id":"520000","properties":{"id":"520000","cp":[106.713478,26.578343],"name":"贵州","childNum":3},"geometry":{"type":"MultiPolygon","coordinates":[["@@G\\lY£in"],["@@q|mc¯tÏVSÎ"],["@@hÑ£IsNgßHHªķÃh_¹¡ĝÄ§ń¦uÙùgS¯JH|sÝÅtÁïyMDč»eÕtA¤{b\\}G®u\\åPFqwÅaDK°ºâ_£ùbµmÁÛĹM[q|hlaªāI}Ñµ@swtwm^oµDéĽŠyVky°ÉûÛR³e¥]RÕěħ[ƅåÛDpJiVÂF²I»mN·£LbÒYbWsÀbpkiTZĄă¶Hq`ĥ_J¯ae«KpÝx]aĕÛPÇȟ[ÁåŵÏő÷Pw}TÙ@Õs«ĿÛq©½m¤ÙH·yǥĘĉBµĨÕnđ]K©œáGçş§ÕßgǗĦTèƤƺ{¶ÉHÎd¾ŚÊ·OÐjXWrãLyzÉAL¾ę¢bĶėy_qMĔąro¼hĊw¶øV¤w²Ĉ]ÊKx|`ź¦ÂÈdrcÈbe¸`I¼čTF´¼Óýȃr¹ÍJ©k_șl³´_pĐ`oÒh¶pa^ÓĔ}D»^Xy`d[KvJPhèhCrĂĚÂ^Êƌ wZL­Ġ£ÁbrzOIlMMĪŐžËr×ÎeŦtw|¢mKjSǘňĂStÎŦEtqFT¾Eì¬¬ôxÌO¢ K³ŀºäYPVgŎ¦ŊmŞ¼VZwVlz¤£Tl®ctĽÚó{G­AÇge~Îd¿æaSba¥KKûj®_Ä^\\Ø¾bP®¦x^sxjĶI_Ä Xâ¼Hu¨Qh¡À@Ëô}±GNìĎlT¸`V~R°tbÕĊ`¸úÛtÏFDu[MfqGH·¥yAztMFe|R_GkChZeÚ°tov`xbDnÐ{E}ZèxNEÞREn[Pv@{~rĆAB§EO¿|UZ~ìUf¨J²ĂÝÆsªB`s¶fvö¦Õ~dÔq¨¸º»uù[[§´sb¤¢zþF¢ÆÀhÂW\\ıËIÝo±ĭŠ£þÊs}¡R]ěDg´VG¢j±®èºÃmpU[Áëº°rÜbNu¸}º¼`niºÔXĄ¤¼ÔdaµÁ_ÃftQQgR·Ǔv}Ý×ĵ]µWc¤F²OĩųãW½¯K©]{LóµCIµ±Mß¿h©āq¬o½~@i~TUxŪÒ¢@£ÀEîôruńb[§nWuMÆLl¿]x}ĳ­½"]],"encodeOffsets":[[[112158,27383]],[[112105,27474]],[[112095,27476]]]}},{"type":"Feature","id":"530000","properties":{"id":"530000","cp":[101.512251,24.740609],"name":"云南","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@[ùx½}ÑRHYīĺûsÍniEoã½Ya²ė{c¬ĝgĂsAØÅwďõzFjw}«Dx¿}Uũlê@HÅ­F¨ÇoJ´Ónũuą¡Ã¢pÒÅØ TF²xa²ËXcÊlHîAßËŁkŻƑŷÉ©hW­æßUËs¡¦}teèÆ¶StÇÇ}Fd£jĈZĆÆ¤Tč\\D}O÷£U§~ŃGåŃDĝ¸Tsd¶¶Bª¤u¢ŌĎo~t¾ÍŶÒtD¦ÚiôözØX²ghįh½Û±¯ÿm·zR¦Ɵ`ªŊÃh¢rOÔ´£Ym¼èêf¯ŪĽncÚbw\\zlvWªâ ¦gmĿBĹ£¢ƹřbĥkǫßeeZkÙIKueT»sVesbaĕ  ¶®dNĄÄpªy¼³BE®lGŭCǶwêżĔÂepÍÀQƞpC¼ŲÈ­AÎô¶RäQ^Øu¬°_Èôc´¹ò¨PÎ¢hlĎ¦´ĦÆ´sâÇŲPnÊD^¯°Upv}®BPÌªjǬxSöwlfòªvqĸ|`H­viļndĜ­Ćhňem·FyÞqóSį¯³X_ĞçêtryvL¤§z¦c¦¥jnŞklD¤øz½ĜàĂŧMÅ|áƆàÊcðÂFÜáŢ¥\\\\ºİøÒÐJĴîD¦zK²ǏÎEh~CD­hMn^ÌöÄ©ČZÀaüfɭyœpį´ěFűk]Ôě¢qlÅĆÙa¶~ÄqêljN¬¼HÊNQ´ê¼VØ¸E^ŃÒyM{JLoÒęæe±Ķygã¯JYÆĭĘëo¥Šo¯hcK«z_prC´ĢÖY¼ v¸¢RÅW³Â§fÇ¸Yi³xR´ďUË`êĿUûuĆBƣöNDH«ĈgÑaB{ÊNF´¬c·Åv}eÇÃGB»If¦HňĕM~[iwjUÁKE¾dĪçWIèÀoÈXòyŞŮÈXâÎŚj|àsRyµÖPr´þ ¸^wþTDŔHr¸RÌmfżÕâCôoxĜƌÆĮÐYtâŦÔ@]ÈǮƒ\\Ī¼Ä£UsÈ¯LbîƲŚºyhr@ĒÔƀÀ²º\\êpJ}ĠvqtĠ@^xÀ£È¨mËÏğ}n¹_¿¢×Y_æpÅA^{½Lu¨GO±Õ½ßM¶wÁĢÛPƢ¼pcĲx|apÌ¬HÐŊSfsðBZ¿©XÏÒKk÷Eû¿SrEFsÕūkóVǥŉiTL¡n{uxţÏhôŝ¬ğōNNJkyPaqÂğ¤K®YxÉƋÁ]āęDqçgOgILu\\_gz]W¼~CÔē]bµogpÑ_oď`´³Țkl`IªºÎȄqÔþ»E³ĎSJ»_f·adÇqÇc¥Á_Źw{L^É±ćxU£µ÷xgĉp»ĆqNē`rĘzaĵĚ¡K½ÊBzyäKXqiWPÏÉ¸½řÍcÊG|µƕƣGË÷k°_^ý|_zċBZocmø¯hhcæ\\lMFlư£ĜÆyHF¨µêÕ]HAàÓ^it `þßäkĤÎT~Wlÿ¨ÔPzUCNVv [jâôDôď[}z¿msSh¯{jïğl}šĹ[őgK©U·µË@¾m_~q¡f¹ÅË^»f³ø}Q¡ÖË³gÍ±^Ç\\ëÃA_¿bWÏ[¶ƛé£F{īZgm@|kHǭƁć¦UĔť×ë}ǝeďºȡȘÏíBÉ£āĘPªĳ¶ŉÿy©nď£G¹¡I±LÉĺÑdĉÜW¥}gÁ{aqÃ¥aıęÏZï`"],"encodeOffsets":[[104636,22969]]}},{"type":"Feature","id":"540000","properties":{"id":"540000","cp":[89.132212,30.860361],"name":"西藏","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@ÂhľxŖxÒVºÅâAĪÝȆµę¯Ňa±r_w~uSÕňqOj]ɄQ£ZUDûoY»©M[L¼qãË{VÍçWVi]ë©Ä÷àyƛhÚU°adcQ~Mx¥cc¡ÙaSyFÖk­uRýq¿ÔµQĽ³aG{¿FµëªéĜÿª@¬·K·àariĕĀ«V»ŶĴūgèLǴŇƶaftèBŚ£^âǐÝ®M¦ÁǞÿ¬LhJ¾óƾÆºcxwf]Y´¦|QLn°adĊ\\¨oǀÍŎ´ĩĀd`tÊQŞŕ|¨C^©Ĉ¦¦ÎJĊ{ëĎjª²rÐl`¼Ą[t|¦Stè¾PÜK¸dƄı]s¤î_v¹ÎVòŦj£Əsc¬_Ğ´|Ł¦Av¦w`ăaÝaa­¢e¤ı²©ªSªÈMĄwÉØŔì@T¤Ę\\õª@þo´­xA sÂtŎKzó´ÇĊµ¢r^nĊ­Æ¬×üG¢³ {âĊ]G~bÀgVjzlhǶfOfdªB]pjTOtĊn¤}®¦Č¥d¢¼»ddY¼t¢eȤJ¤}Ǿ¡°§¤AÐlc@ĝsªćļđAçwxUuzEÖġ~AN¹ÄÅȀŻ¦¿ģŁéì±Hãd«g[Ø¼ēÀcīľġ¬cJµÐʥVȝ¸ßS¹ý±ğkƁ¼ą^ɛ¤Ûÿb[}¬ōõÃ]ËNm®g@Bg}ÍF±ǐyL¥íCIĳÏ÷Ñį[¹¦[âšEÛïÁÉdƅß{âNÆāŨß¾ě÷yC£k­´ÓH@Â¹TZ¥¢į·ÌAÐ§®Zcv½Z­¹|ÅWZqgW|ieZÅYVÓqdqbc²R@c¥Rã»GeeƃīQ}J[ÒK¬Ə|oėjġĠÑN¡ð¯EBčnwôɍėª²CλŹġǝʅįĭạ̃ūȹ]ΓͧgšsgȽóϧµǛęgſ¶ҍć`ĘąŌJÞä¤rÅň¥ÖÁUětęuůÞiĊÄÀ\\Æs¦ÓRb|Â^řÌkÄŷ¶½÷f±iMÝ@ĥ°G¬ÃM¥n£Øąğ¯ß§aëbéüÑOčk£{\\eµª×MÉfm«Ƒ{Å×Gŏǩãy³©WÑăû··Qòı}¯ãIéÕÂZ¨īès¶ZÈsæĔTŘvgÌsN@îá¾ó@ÙwU±ÉTå»£TđWxq¹Zobs[×¯cĩvėŧ³BM|¹kªħ¥TzNYnÝßpęrñĠĉRS~½ěVVµõ«M££µBĉ¥áºae~³AuĐh`Ü³ç@BÛïĿa©|z²Ý¼D£àč²ŸIûI āóK¥}rÝ_Á´éMaň¨~ªSĈ½½KÙóĿeƃÆB·¬ën×W|Uº}LJrƳlŒµ`bÔ`QÐÓ@s¬ñIÍ@ûws¡åQÑßÁ`ŋĴ{ĪTÚÅTSÄ³Yo|Ç[Ç¾µMW¢ĭiÕØ¿@MhpÕ]jéò¿OƇĆƇpêĉâlØwěsǩĵ¸cbU¹ř¨WavquSMzeo_^gsÏ·¥Ó@~¯¿RiīB\\qTGªÇĜçPoÿfñòą¦óQīÈáPābß{ZŗĸIæÅhnszÁCËìñÏ·ąĚÝUm®ó­L·ăUÈíoù´Êj°ŁŤ_uµ^°ìÇ@tĶĒ¡ÆM³Ģ«İĨÅ®ğRāðggheÆ¢zÊ©Ô\\°ÝĎz~ź¤PnMĪÖB£kné§żćĆKĒ°¼L¶èâz¨u¦¥LDĘz¬ýÎmĘd¾ßFzhg²Fy¦ĝ¤ċņbÎ@yĄæm°NĮZRÖíJ²öLĸÒ¨Y®ƌÐVàtt_ÚÂyĠz]ŢhzĎ{ÂĢXc|ÐqfO¢¤ögÌHNPKŖUú´xx[xvĐCûĀìÖT¬¸^}Ìsòd´_KgžLĴÀBon|H@Êx¦BpŰŌ¿fµƌA¾zǈRx¶FkĄźRzŀ~¶[´HnªVƞuĒ­È¨ƎcƽÌm¸ÁÈM¦x͊ëÀxǆBú^´W£dkɾĬpw˂ØɦļĬIŚÊnŔa¸~J°îlɌxĤÊÈðhÌ®gT´øàCÀ^ªerrƘd¢İP|Ė ŸWªĦ^¶´ÂLaT±üWƜǀRÂŶUńĖ[QhlLüAÜ\\qRĄ©"],"encodeOffsets":[[90849,37210]]}},{"type":"Feature","id":"610000","properties":{"id":"610000","cp":[108.948024,34.263161],"name":"陕西","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@p¢ȮµûGĦ}Ħðǚ¶òƄjɂz°{ºØkÈęâ¦jªBg\\ċ°s¬]jú EȌǆ¬stRÆdĠİwÜ¸ôW¾ƮłÒ_{Ìû¼jº¹¢GǪÒ¯ĘZ`ºŊecņą~BÂgzpâēòYǠȰÌTÎ¨ÂW|fcă§uF@N¢XLRMº[ğȣſï|¥Jkc`sŉǷY¹W@µ÷Kãï³ÛIcñ·VȋÚÒķø©þ¥yÓğęmWµÎumZyOŅƟĥÓ~sÑL¤µaÅY¦ocyZ{y c]{Ta©`U_Ěē£ωÊƍKùK¶ȱÝƷ§{û»ÅÁȹÍéuĳ|¹cÑdìUYOuFÕÈYvÁCqÓTǢí§·S¹NgV¬ë÷Át°DØ¯C´ŉƒópģ}ċcEËFéGU¥×K§­¶³BČ}C¿åċ`wġB·¤őcƭ²ő[Å^axwQOÿEËßŚĤNĔwƇÄńwĪ­o[_KÓª³ÙnKÇěÿ]ďă_d©·©Ýŏ°Ù®g]±ßå¬÷m\\iaǑkěX{¢|ZKlçhLtŇîŵœè[É@ƉĄEtƇÏ³­ħZ«mJ×¾MtÝĦ£IwÄå\\Õ{OwĬ©LÙ³ÙgBƕŀrÌĢŭO¥lãyC§HÍ£ßEñX¡­°ÙCgpťzb`wIvA|§hoĕ@E±iYd¥OĻ¹S|}F@¾oAO²{tfÜ¢FǂÒW²°BĤh^Wx{@¬­F¸¡ķn£P|ªĴ@^ĠĈæbÔc¶lYi^MicĎ°Â[ävï¶gv@ÀĬ·lJ¸sn|¼u~a]ÆÈtŌºJpþ£KKf~¦UbyäIĺãnÔ¿^­ŵMThĠÜ¤ko¼Ŏìąǜh`[tRd²Ĳ_XPrɲlXiL§à¹H°Ȧqº®QCbAŌJ¸ĕÚ³ĺ§ `d¨YjiZvRĺ±öVKkjGȊÄePĞZmļKÀ[`ösìhïÎoĬdtKÞ{¬èÒÒBÔpĲÇĬJŊ¦±J«Y§@·pHµàåVKepWftsAÅqC·¬ko«pHÆuK@oHĆÛķhxenS³àǍrqƶRbzy¸ËÐl¼EºpĤ¼x¼½~Ğà@ÚüdK^mÌSj"],"encodeOffsets":[[110234,38774]]}},{"type":"Feature","id":"620000","properties":{"id":"620000","cp":[103.823557,36.058039],"name":"甘肃","childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@VuUv"],["@@ũEĠtt~nkh`Q¦ÅÄÜdwAb×ĠąJ¤DüègĺqBqj°lI¡ĨÒ¤úSHbjÎB°aZ¢KJO[|A£Dx}NĂ¬HUnrk kp¼Y kMJn[aGáÚÏ[½rc}aQxOgsPMnUsncZsKúvAtÞġ£®ĀYKdnFw¢JE°Latf`¼h¬we|Æbj}GA·~W`¢MC¤tL©Ĳ°qdfObÞĬ¹ttu`^ZúE`[@Æsîz®¡CƳƜG²R¢RmfwĸgÜą G@pzJM½mhVy¸uÈÔO±¨{LfæU¶ßGĂq\\ª¬²I¥IŉÈīoıÓÑAçÑ|«LÝcspīðÍgtë_õ\\ĉñLYnĝgRǡÁiHLlõUĹ²uQjYi§Z_c¨´ĹĖÙ·ŋIaBD­R¹ȥr¯GºßK¨jWkɱOqWĳ\\a­Q\\sg_ĆǛōëp»£lğÛgSŶN®À]ÓämĹãJaz¥V}Le¤Lýo¹IsŋÅÇ^bz³tmEÁ´a¹cčecÇNĊãÁ\\č¯dNj]jZµkÓdaćå]ğĳ@ ©O{¤ĸm¢E·®«|@Xwg]Aģ±¯XǁÑǳªcwQÚŝñsÕ³ÛV_ý¥\\ů¥©¾÷w©WÕÊĩhÿÖÁRo¸V¬âDb¨hûxÊ×ǌ~Zâg|XÁnßYoº§ZÅŘv[ĭÖʃuďxcVbnUSfB¯³_TzºÎO©çMÑ~M³]µ^püµÄY~y@X~¤Z³[Èōl@®Å¼£QK·Di¡ByÿQ_´D¥hŗy^ĭÁZ]cIzýah¹MĪğPs{ò²Vw¹t³ŜË[Ñ}X\\gsF£sPAgěp×ëfYHāďÖqēŭOÏëdLü\\it^c®RÊº¶¢H°mrY£B¹čIoľu¶uI]vģSQ{UŻÅ}QÂ|Ì°ƅ¤ĩŪU ęĄÌZÒ\\v²PĔ»ƢNHĂyAmƂwVm`]ÈbH`Ì¢²ILvĜH®¤Dlt_¢JJÄämèÔDëþgºƫaʎÌrêYi~ Îİ¤NpÀA¾Ĕ¼bð÷®üszMzÖĖQdȨýv§Tè|ªHÃ¾a¸|Ð ƒwKĢx¦ivr^ÿ ¸l öæfƟĴ·PJv}n\\h¹¶v·À|\\ƁĚN´ĜçèÁz]ġ¤²¨QÒŨTIlªťØ}¼˗ƦvÄùØEÂ«FïËIqōTvāÜŏíÛßÛVj³âwGăÂíNOPìyV³ŉĖýZso§HÑiYw[ß\\X¦¥c]ÔƩÜ·«jÐqvÁ¦m^ċ±R¦΋ƈťĚgÀ»IïĨʗƮ°ƝĻþÍAƉſ±tÍEÕÞāNUÍ¡\\ſčåÒʻĘm ƭÌŹöʥëQ¤µ­ÇcƕªoIýIÉ_mkl³ăƓ¦j¡YzŇi}Msßõīʋ }ÁVm_[n}eı­Uĥ¼ªI{Î§DÓƻėojqYhĹT©oūĶ£]ďxĩǑMĝq`B´ƃ˺Чç~²ņj@¥@đ´ί}ĥtPńÇ¾V¬ufÓÉCtÓ̻¹£G³]ƖƾŎĪŪĘ̖¨ʈĢƂlɘ۪üºňUðǜȢƢż̌ȦǼĤŊɲĖÂ­Kq´ï¦ºĒǲņɾªǀÞĈĂD½ĄĎÌŗĞrôñnN¼â¾ʄľԆ|Ǆ֦ज़ȗǉ̘̭ɺƅêgV̍ʆĠ·ÌĊv|ýĖÕWĊǎÞ´õ¼cÒÒBĢ͢UĜð͒s¨ňƃLĉÕÝ@ɛƯ÷¿Ľ­ĹeȏĳëCȚDŲyê×Ŗyò¯ļcÂßYtÁƤyAã˾J@ǝrý@¤rz¸oP¹ɐÚyáHĀ[JwcVeȴÏ»ÈĖ}ƒŰŐèȭǢόĀƪÈŶë;Ñ̆ȤМľĮEŔĹŊũ~ËUă{ĻƹɁύȩþĽvĽƓÉ@ēĽɲßǐƫʾǗĒpäWÐxnsÀ^ƆwW©¦cÅ¡Ji§vúF¶¨c~c¼īeXǚ\\đ¾JwÀďksãAfÕ¦L}waoZD½Ml«]eÒÅaÉ²áo½FõÛ]ĻÒ¡wYR£¢rvÓ®y®LFLzĈôe]gx}|KK}xklL]c¦£fRtív¦PĤoH{tK"]],"encodeOffsets":[[[108619,36299]],[[108589,36341]]]}},{"type":"Feature","id":"630000","properties":{"id":"630000","cp":[96.778916,35.623178],"name":"青海","childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@InJm"],["@@CÆ½OŃĦsΰ~Ē³¦@@Ņi±è}ШƄ˹A³r_ĞǒNĪĐw¤^ŬĵªpĺSZgrpiƼĘÔ¨C|ÍJ©Ħ»®VĲ~f\\m `UnÂ~ʌĬàöNt~ňjy¢ZiƔ¥Ąk´nl`JÊJþ©pdƖ®È£¶ìRʦźõƮËnʼėæÑƀĎ[¢VÎĂMÖÝÎF²sƊƀÎBļýƞ¯ʘƭðħ¼Jh¿ŦęΌƇ¥²Q]Č¥nuÂÏri¸¬ƪÛ^Ó¦d¥[Wàx\\ZjÒ¨GtpþYŊĕ´zUOëPîMĄÁxH´áiÜUàîÜŐĂÛSuŎrJðÌ¬EFÁú×uÃÎkrĒ{V}İ«O_ÌËĬ©ÓŧSRÑ±§Ģ£^ÂyèçěM³Ƃę{[¸¿uºµ[gt£¸OƤĿéYõ·kĀq]juw¥DĩƍõÇPéÄ½G©ã¤GuȧþRcÕĕNyyût­øï»a½ē¿BMoį£Íj}éZËqbʍƬh¹ìÿÓAçãnIÃ¡I`ks£CG­ěUy×Cy@¶ʡÊBnāzGơMē¼±O÷õJËĚăVĪũƆ£¯{ËL½ÌzżVR|ĠTbuvJvµhĻĖHAëáa­OÇðñęNwœľ·LmI±íĠĩPÉ×®ÿscB³±JKßĊ«`ađ»·QAmOVţéÿ¤¹SQt]]Çx±¯A@ĉĳ¢Óļ©l¶ÅÛrŕspãRk~¦ª]Į­´FRåd­ČsCqđéFn¿ÅƃmÉx{W©ºƝºįkÕƂƑ¸wWūÐ©ÈF£\\tÈ¥ÄRÈýÌJ lGr^×äùyÞ³fjc¨£ÂZ|ǓMĝÏ@ëÜőRĝ÷¡{aïȷPu°ËXÙ{©TmĠ}Y³­ÞIňµç½©C¡į÷¯B»|St»]vųs»}MÓ ÿʪƟǭA¡fs»PY¼c¡»¦cċ­¥£~msĉPSi^o©AecPeǵkgyUi¿h}aHĉ^|á´¡HØûÅ«ĉ®]m¡qĉ¶³ÈyôōLÁstB®wn±ă¥HSòė£Së@×œÊăxÇN©©T±ª£Ĳ¡fb®Þbb_Ą¥xu¥B{łĝ³«`dƐt¤ťiñÍUuºí`£^tƃĲc·ÛLO½sç¥Ts{ă\\_»kÏ±q©čiìĉ|ÍI¥ć¥]ª§D{ŝŖÉR_sÿc³ĪōƿÎ§p[ĉc¯bKmR¥{³Ze^wx¹dƽÅ½ôIg §Mĕ ƹĴ¿ǣÜÍ]Ý]snåA{eƭ`ǻŊĿ\\ĳŬűYÂÿ¬jĖqßb¸L«¸©@ěĀ©ê¶ìÀEH|´bRľÓ¶rÀQþvl®ÕETzÜdb hw¤{LRdcb¯ÙVgƜßzÃôì®^jUèXÎ|UäÌ»rK\\ªN¼pZCüVY¤ɃRi^rPŇTÖ}|br°qňbĚ°ªiƶGQ¾²x¦PmlŜ[Ĥ¡ΞsĦÔÏâ\\ªÚŒU\\f¢N²§x|¤§xĔsZPòʛ²SÐqF`ªVÞŜĶƨVZÌL`¢dŐIqr\\oäõFÎ·¤»Ŷ×h¹]ClÙ\\¦ďÌį¬řtTӺƙgQÇÓHţĒ´ÃbEÄlbʔC|CŮkƮ[ʼ¬ň´KŮÈΰÌĪ¶ƶlðļATUvdTGº̼ÔsÊDÔveOg"]],"encodeOffsets":[[[105308,37219]],[[95370,40081]]]}},{"type":"Feature","id":"640000","properties":{"id":"640000","cp":[106.278179,37.26637],"name":"宁夏","childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@KëÀęĞ«Oęȿȕı]ŉ¡åįÕÔ«ǴõƪĚQÐZhv K°öqÀÑS[ÃÖHƖčËnL]ûcÙß@ĝ¾}w»»oģF¹»kÌÏ·{zP§B­¢íyÅt@@á]Yv_ssģ¼ißĻL¾ġsKD£¡N_X¸}B~HaiÅf{«x»ge_bsKF¯¡IxmELcÿZ¤­ĢÝsuBLùtYdmVtNmtOPhRw~bd¾qÐ\\âÙH\\bImlNZ»loqlVmGā§~QCw¤{A\\PKNY¯bFkC¥sks_Ã\\ă«¢ħkJi¯rrAhĹûç£CUĕĊ_ÔBixÅÙĄnªÑaM~ħpOu¥sîeQ¥¤^dkKwlL~{L~hw^ófćKyE­K­zuÔ¡qQ¤xZÑ¢^ļöÜ¾Ep±âbÊÑÆ^fk¬NC¾YpxbK~¥eÖäBlt¿Đx½I[ĒǙWf»Ĭ}d§dµùEuj¨IÆ¢¥dXªƅx¿]mtÏwßRĶX¢͎vÆzƂZò®ǢÌʆCrâºMÞzÆMÒÊÓŊZÄ¾r°Î®Ȉmª²ĈUªĚîøºĮ¦ÌĘk^FłĬhĚiĀĖ¾iİbjÕ"],["@@mfwěwMrŢªv@G"]],"encodeOffsets":[[[109366,40242]],[[108600,36303]]]}},{"type":"Feature","id":"650000","properties":{"id":"650000","cp":[85.617733,40.792818],"name":"新疆","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@QØĔ²X¨~ǘBºjʐßØvKƔX¨vĊOÃ·¢i@~cĝe_«E}QxgɪëÏÃ@sÅyXoŖ{ô«ŸuXêÎf`C¹ÂÿÐGĮÕĞXŪōŸMźÈƺQèĽôe|¿ƸJR¤ĘEjcUóº¯Ĩ_ŘÁMª÷Ð¥OéÈ¿ÖğǤǷÂFÒzÉx[]­Ĥĝœ¦EP}ûƥé¿İƷTėƫœŕƅƱB»Đ±ēO¦E}`cȺrĦáŖuÒª«ĲπdƺÏØZƴwʄ¤ĖGĐǂZĶèH¶}ÚZצʥĪï|ÇĦMŔ»İĝǈì¥Βba­¯¥ǕǚkĆŵĦɑĺƯxūД̵nơʃĽá½M»òmqóŘĝčË¾ăCćāƿÝɽ©ǱŅ¹đ¥³ðLrÁ®ɱĕģŉǻ̋ȥơŻǛȡVï¹Ň۩ûkɗġƁ§ʇė̕ĩũƽō^ƕUv£ƁQïƵkŏ½ΉÃŭÇ³LŇʻ«ƭ\\lŭD{ʓDkaFÃÄa³ŤđÔGRÈƚhSӹŚsİ«ĐË[¥ÚDkº^Øg¼ŵ¸£EÍöůŉT¡c_ËKYƧUśĵÝU_©rETÏʜ±OñtYwē¨{£¨uM³x½şL©Ùá[ÓÐĥ Νtģ¢\\śnkOw¥±T»ƷFɯàĩÞáB¹ÆÑUwŕĽw[mG½Èå~Æ÷QyěCFmĭZīŵVÁƿQƛûXS²b½KÏ½ĉS©ŷXĕ{ĕK·¥Ɨcqq©f¿]ßDõU³h­gËÇïģÉɋwk¯í}I·œbmÉřīJɥĻˁ×xoɹīlc¤³Xù]ǅA¿w͉ì¥wÇN·ÂËnƾƍdÇ§đ®ƝvUm©³G\\}µĿQyŹlăµEwǇQ½yƋBe¶ŋÀůo¥AÉw@{Gpm¿AĳŽKLh³`ñcËtW±»ÕSëüÿďDu\\wwwù³VLŕOMËGh£õP¡erÏd{ġWÁč|yšg^ğyÁzÙs`s|ÉåªÇ}m¢Ń¨`x¥ù^}Ì¥H«YªƅAÐ¹n~ź¯f¤áÀzgÇDIÔ´AňĀÒ¶ûEYospõD[{ù°]uJqU|Soċxţ[õÔĥkŋÞŭZËºóYËüċrw ÞkrťË¿XGÉbřaDü·Ē÷AÃª[ÄäIÂ®BÕĐÞ_¢āĠpÛÄȉĖġDKwbmÄNôfƫVÉviǳHQµâFù­Âœ³¦{YGd¢ĚÜO {Ö¦ÞÍÀP^bƾl[vt×ĈÍEË¨¡Đ~´î¸ùÎhuè`¸HÕŔVºwĠââWò@{ÙNÝ´ə²ȕn{¿¥{l÷eé^eďXj©î\\ªÑòÜìc\\üqÕ[Č¡xoÂċªbØ­ø|¶ȴZdÆÂońéG\\¼C°ÌÆn´nxÊOĨŪƴĸ¢¸òTxÊǪMīĞÖŲÃɎOvʦƢ~FRěò¿ġ~åŊúN¸qĘ[Ĕ¶ÂćnÒPĒÜvúĀÊbÖ{Äî¸~Ŕünp¤ÂH¾ĄYÒ©ÊfºmÔĘcDoĬMŬS¤s²ʘÚžȂVŦ èW°ªB|ĲXŔþÈJĦÆæFĚêYĂªĂ]øªŖNÞüAfɨJ¯ÎrDDĤ`mz\\§~D¬{vJÂ«lµĂb¤pŌŰNĄ¨ĊXW|ų ¿¾ɄĦƐMTòP÷fØĶK¢ȝ˔Sô¹òEð­`Ɩ½ǒÂň×äı§ĤƝ§C~¡hlåǺŦŞkâ~}FøàĲaĞfƠ¥Ŕd®U¸źXv¢aƆúŪtŠųƠjdƺƺÅìnrh\\ĺ¯äɝĦ]èpĄ¦´LƞĬ´ƤǬ˼Ēɸ¤rºǼ²¨zÌPðŀbþ¹ļD¢¹\\ĜÑŚ¶ZƄ³àjĨoâȴLÊȮĐ­ĚăÀêZǚŐ¤qȂ\\L¢ŌİfÆs|zºeªÙæ§΢{Ā´ƐÚ¬¨Ĵà²łhʺKÞºÖTiƢ¾ªì°`öøu®Ê¾ãØ"],"encodeOffsets":[[88824,50096]]}},{"type":"Feature","id":"110000","properties":{"id":"110000","cp":[116.405285,39.904989],"name":"北京","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@ĽOÁûtŷmiÍt_H»Ĩ±d`¹­{bwYr³S]§§o¹qGtm_SŧoaFLgQN_dV@Zom_ć\\ßcÂ±x¯oœRcfe£o§ËgToÛJíĔóu|wP¤XnO¢ÉŦ¯rNÄā¤zâŖÈRpŢZÚ{GrFt¦Òx§ø¹RóäV¤XdżâºWbwŚ¨Ud®bêņ¾jnŎGŃŶnzÚSeîĜZczî¾i]ÍQaúÍÔiþĩȨWĢü|Ėu[qb[swP@ÅğP¿{\\¥A¨ÏÑ¨j¯X\\¯MKpA³[Hīu}}"],"encodeOffsets":[[120023,41045]]}},{"type":"Feature","id":"120000","properties":{"id":"120000","cp":[117.190182,39.125596],"name":"天津","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@ŬgX§Ü«E¶FÌ¬O_ïlÁgz±AXeµÄĵ{¶]gitgIj·¥îakS¨ÐƎk}ĕ{gBqGf{¿aU^fIư³õ{YıëNĿk©ïËZŏR§òoY×Ógcĥs¡bġ«@dekąI[nlPqCnp{ō³°`{PNdƗqSÄĻNNâyj]äÒD ĬH°Æ]~¡HO¾X}ÐxgpgWrDGpù^LrzWxZ^¨´T\\|~@IzbĤjeĊªz£®ĔvěLmV¾Ô_ÈNW~zbĬvG²ZmDM~~"],"encodeOffsets":[[120237,41215]]}},{"type":"Feature","id":"310000","properties":{"id":"310000","cp":[121.472644,31.231706],"name":"上海","childNum":6},"geometry":{"type":"MultiPolygon","coordinates":[["@@ɧư¬EpƸÁxc"],["@@©ª"],["@@MA"],["@@QpİE§ÉC¾"],["@@bŝÕÕEȣÚƥêImɇǦèÜĠÚÃƌÃ͎ó"],["@@ǜûȬɋŭ×^sYɍDŋŽąñCG²«ªč@h_p¯A{oloY¬j@Ĳ`gQÚhr|ǀ^MĲvtbe´R¯Ô¬¨Yô¤r]ìƬį"]],"encodeOffsets":[[[124702,32062]],[[124547,32200]],[[124808,31991]],[[124726,32110]],[[124903,32376]],[[124438,32149]]]}},{"type":"Feature","id":"500000","properties":{"id":"500000","cp":[107.304962,29.533155],"name":"重庆","childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@vjG~nGŘŬĶȂƀƾ¹¸ØÎezĆT¸}êÐqHðqĖä¥^CÆIj²p\\_ æüY|[YxƊæu°xb®Űb@~¢NQt°¶Sæ Ê~rǉĔëĚ¢~uf`faĔJåĊnÖ]jƎćÊ@£¾a®£Ű{ŶĕFègLk{Y|¡ĜWƔtƬJÑxq±ĢN´òKLÈÃ¼D|s`ŋć]Ã`đMûƱ½~Y°ħ`ƏíW½eI½{aOIrÏ¡ĕŇapµÜƅġ^ÖÛbÙŽŏml½SêqDu[RãË»ÿw`»y¸_ĺę}÷`M¯ċfCVµqŉ÷Zgg`d½pDOÎCn^uf²ènh¼WtƏxRGg¦pVFI±G^Ic´ecGĹÞ½sëĬhxW}KÓe­XsbkF¦LØgTkïƵNï¶}Gyw\\oñ¡nmĈzj@Óc£»Wă¹Ój_m»¹·~MvÛaq»­ê\\ÂoVnÓØÍ²«bq¿efE Ĝ^Q~ Évýş¤²ĮpEİ}zcĺL½¿gÅ¡ýE¡ya£³t\\¨\\vú»¼§·Ñr_oÒý¥u_n»_At©ÞÅ±ā§IVeëY}{VPÀFA¨ąB}q@|Ou\\FmQFÝMwå}]|FmÏCawu_p¯sfÙgYDHl`{QEfNysB¦zG¸rHeN\\CvEsÐùÜ_·ÖĉsaQ¯}_UxÃđqNH¬Äd^ÝŰR¬ã°wećJE·vÝ·HgéFXjÉê`|ypxkAwWĐpb¥eOsmzwqChóUQl¥F^lafanòsrEvfQdÁUVfÎvÜ^eftET¬ôA\\¢sJnQTjPØxøK|nBzĞ»LYFDxÓvr[ehľvN¢o¾NiÂxGpâ¬zbfZo~hGi]öF||NbtOMn eA±tPTLjpYQ|SHYĀxinzDJÌg¢và¥Pg_ÇzIIII£®S¬ØsÎ¼£N"],["@@ifjN@s"]],"encodeOffsets":[[[109628,30765]],[[111725,31320]]]}},{"type":"Feature","id":"810000","properties":{"id":"810000","cp":[114.173355,22.320048],"name":"香港","childNum":5},"geometry":{"type":"MultiPolygon","coordinates":[["@@AlBk"],["@@mn"],["@@EpFo"],["@@ea¢pl¸Eõ¹hj[]ÔCÎ@lj¡uBX´AI¹[yDU]W`çwZkmcMpÅv}IoJlcafŃK°ä¬XJmÐ đhI®æÔtSHnEÒrÈc"],["@@rMUwAS®e"]],"encodeOffsets":[[[117111,23002]],[[117072,22876]],[[117045,22887]],[[116975,23082]],[[116882,22747]]]}},{"type":"Feature","id":"820000","properties":{"id":"820000","cp":[113.54909,22.198951],"name":"澳门","childNum":1},"geometry":{"type":"Polygon","coordinates":["@@kÊd°å§s"],"encodeOffsets":[[116279,22639]]}}],"UTF8Encoding":true};

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/*!************************************************************!*\
  !*** D:/wxxiaochenxu/text1/mpvue-echarts/src/wx-canvas.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var WxCanvas = /*#__PURE__*/function () {
  function WxCanvas(ctx, canvasId) {_classCallCheck(this, WxCanvas);
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;

    WxCanvas.initStyle(ctx);
    this.initEvent();
  }_createClass(WxCanvas, [{ key: "getContext", value: function getContext(

    contextType) {
      return contextType === '2d' ? this.ctx : null;
    } }, { key: "setChart", value: function setChart(

    chart) {
      this.chart = chart;
    } }, { key: "attachEvent", value: function attachEvent()

    {
      // noop
    } }, { key: "detachEvent", value: function detachEvent()

    {
      // noop
    } }, { key: "initEvent", value: function initEvent()





















    {var _this = this;
      this.event = {};
      var eventNames = [{
        wxName: 'touchStart',
        ecName: 'mousedown' },
      {
        wxName: 'touchMove',
        ecName: 'mousemove' },
      {
        wxName: 'touchEnd',
        ecName: 'mouseup' },
      {
        wxName: 'touchEnd',
        ecName: 'click' }];


      eventNames.forEach(function (name) {
        _this.event[name.wxName] = function (e) {
          var touch = e.mp.touches[0];
          _this.chart.getZr().handler.dispatch(name.ecName, {
            zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
            zrY: name.wxName === 'tap' ? touch.clientY : touch.y });

        };
      });
    } }], [{ key: "initStyle", value: function initStyle(ctx) {var _arguments = arguments;var styles = ['fillStyle', 'strokeStyle', 'globalAlpha', 'textAlign', 'textBaseAlign', 'shadow', 'lineWidth', 'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];styles.forEach(function (style) {Object.defineProperty(ctx, style, { set: function set(value) {if (style !== 'fillStyle' && style !== 'strokeStyle' || value !== 'none' && value !== null) {ctx["set".concat(style.charAt(0).toUpperCase()).concat(style.slice(1))](value);}} });});ctx.createRadialGradient = function () {return ctx.createCircularGradient(_arguments);};} }]);return WxCanvas;}();exports.default = WxCanvas;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map