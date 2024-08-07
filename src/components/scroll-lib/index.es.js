import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var FullpageContext = /*#__PURE__*/React.createContext({
  number: 0,
  count: 0,
  subscribe: null,
  unsubscribe: null,
  "goto": null,
  back: null,
  next: null
});

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Fullpage = /*#__PURE__*/function (_PureComponent) {
  _inherits(Fullpage, _PureComponent);

  var _super = _createSuper$5(Fullpage);

  function Fullpage(props, context) {
    var _this;

    _classCallCheck(this, Fullpage);

    _this = _super.call(this, props, context);
    _this.slides = [];
    _this.state = {
      slide: null,
      translateY: 0,
      pageYOffset: 0,
      offsetHeight: 0,
      count: 0,
      number: 0,
      resetScroll: false
    };
    _this.ticking = false;
    _this.fullPageHeight = 0;
    _this.viewportHeight = 0; // binds

    _this.subscribe = _this.subscribe.bind(_assertThisInitialized(_this));
    _this.unsubscribe = _this.unsubscribe.bind(_assertThisInitialized(_this));
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.getIndex = _this.getIndex.bind(_assertThisInitialized(_this)); // handle

    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
    _this.handleKeys = _this.handleKeys.bind(_assertThisInitialized(_this)); // refs

    _this.driverRef = /*#__PURE__*/React.createRef();
    _this.warperRef = /*#__PURE__*/React.createRef();
    _this.fullpageRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(Fullpage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleResize();
      this.setState({
        slide: this.slides[0]
      });

      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
      }

      if (typeof document !== 'undefined') {
        document.addEventListener('keydown', this.handleKeys);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // set body height == to 'auto'
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
      }

      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', this.handleKeys);
      }
    }
  }, {
    key: "getIndex",
    value: function getIndex(slide) {
      return this.slides.indexOf(slide);
    }
  }, {
    key: "subscribe",
    value: function subscribe(slide) {
      // add new slide (push)
      var newSlides = [].concat(_toConsumableArray(this.slides), [slide]); // sort slide for top to bottom

      this.slides = newSlides.sort(function (a, b) {
        var aTop = a.el.current.offsetTop;
        var bTop = b.el.current.offsetTop;
        return aTop - bTop;
      });
      this.setState({
        count: this.slides.length
      });
      this.ticking = false;
      this.handleResize();
      return slide;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(slide) {
      this.slides = this.slides.filter(function (s) {
        return s.el !== slide.el;
      });
      this.setState({
        count: this.slides.length
      });
      this.handleResize();
      this.handleScroll();
      return slide;
    }
  }, {
    key: "handleScroll",
    value: function handleScroll() {
      var _this2 = this;

      var _this$state = this.state,
          resetScroll = _this$state.resetScroll,
          translateY = _this$state.translateY;

      if (this.lockScroll) {
        // if > top and bottom < fix scroll
        window.scrollTo(0, translateY * -1);
        return false;
      }

      if (!this.ticking) {
        window.requestAnimationFrame(function () {
          if (resetScroll) {
            window.scrollTo(0, translateY * -1);
          }

          var pageYOffset = window.pageYOffset || 0;

          _this2.setState({
            pageYOffset: pageYOffset,
            resetScroll: false
          });

          var newSlide = _this2.slides.find(function (slide) {
            var el = slide.el.current;
            return pageYOffset < el.offsetTop + el.offsetHeight * 0.5;
          });

          _this2["goto"](newSlide);

          _this2.ticking = false;
        });
      }

      this.ticking = true;
      return true;
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      var _this3 = this;

      if (!this.ticking) {
        window.requestAnimationFrame(function () {
          // update count
          _this3.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
          _this3.fullPageHeight = _this3.fullpageRef.current.clientHeight;
          _this3.driverRef.current.style.height = "".concat(_this3.fullPageHeight, "px");
          _this3.ticking = false;
        });
      }

      this.ticking = true;
    }
  }, {
    key: "handleKeys",
    value: function handleKeys(event) {
      var keyboardShortcut = this.props.keyboardShortcut;

      if (!keyboardShortcut) {
        return true;
      }

      if (event.keyCode === 33 // pageUp:    33,
      || event.keyCode === 37 // left:      37,
      || event.keyCode === 38 // up:        38,
      ) {
        event.preventDefault();
        return event.shiftKey ? this.first(event) : this.back(event);
      }

      if (event.keyCode === 34 // pageDown:  34,
      || event.keyCode === 39 // right:     39,
      || event.keyCode === 40 // down:      40,
      ) {
        event.preventDefault();
        return event.shiftKey ? this.last(event) : this.next(event);
      }

      if (event.keyCode === 35 // end:       35,
      ) {
        event.preventDefault();
        return this.last(event);
      }

      if (event.keyCode === 36 // home:      36,
      ) {
        event.preventDefault();
        return this.first(event);
      }

      return true;
    } // TODO: add update methode

  }, {
    key: "update",
    value: function update() {
      return this;
    }
  }, {
    key: "goto",
    value: function goto(newSlide) {
      var _this4 = this;

      var resetScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var slide = this.state.slide;
      var _this$props = this.props,
          transitionTiming = _this$props.transitionTiming,
          onChange = _this$props.onChange;

      if (slide !== newSlide) {
        var translateY = Math.max((this.fullPageHeight - this.viewportHeight) * -1, newSlide.el.current.offsetTop * -1);
        var onHide = slide.props.onHide;

        if (onHide && typeof onHide === 'function') {
          setTimeout(function () {
            return onHide(translateY);
          }, transitionTiming);
        }

        this.lockScroll = true;
        this.setState({
          slide: newSlide,
          number: this.getIndex(newSlide),
          translateY: translateY,
          offsetHeight: newSlide.el.current.offsetHeight,
          resetScroll: resetScroll
        });
        setTimeout(function () {
          _this4.lockScroll = false;
        }, 1000);
        var onShow = newSlide.props.onShow;

        if (onShow && typeof onShow === 'function') {
          onShow(translateY);
        } // call back function


        if (typeof onChange === "function") {
          onChange(this.state);
        }
      }

      return newSlide;
    }
  }, {
    key: "back",
    value: function back() {
      var number = this.state.number;
      var index = Math.max(0, number - 1);
      this["goto"](this.slides[index], true);
    }
  }, {
    key: "next",
    value: function next() {
      var length = this.slides.length;
      var number = this.state.number;
      var index = Math.min(length - 1, number + 1);
      this["goto"](this.slides[index], true);
    }
  }, {
    key: "first",
    value: function first() {
      this["goto"](this.slides[0], true);
    }
  }, {
    key: "last",
    value: function last() {
      this["goto"](this.slides[this.slides.length - 1], true);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          style = _this$props2.style,
          className = _this$props2.className,
          transitionTiming = _this$props2.transitionTiming;
      var _this$state2 = this.state,
          translateY = _this$state2.translateY,
          pageYOffset = _this$state2.pageYOffset,
          offsetHeight = _this$state2.offsetHeight,
          number = _this$state2.number,
          count = _this$state2.count,
          resetScroll = _this$state2.resetScroll;
      return /*#__PURE__*/React.createElement(FullpageContext.Provider, {
        value: {
          translateY: translateY,
          pageYOffset: pageYOffset,
          offsetHeight: offsetHeight,
          number: number,
          count: count,
          subscribe: this.subscribe,
          unsubscribe: this.unsubscribe,
          update: this.update,
          "goto": function goto(slide) {
            return _this5["goto"](slide, resetScroll);
          },
          back: this.back,
          next: this.next,
          getIndex: this.getIndex,
          transitionTiming: transitionTiming,
          className: className,
          style: style,
          warperRef: this.warperRef,
          fullpageRef: this.fullpageRef,
          slides: this.slides
        }
      }, /*#__PURE__*/React.createElement("div", {
        name: "Driver",
        style: {
          position: 'relative'
        },
        ref: this.driverRef
      }), children);
    }
  }]);

  return Fullpage;
}(PureComponent);

_defineProperty(Fullpage, "contextType", FullpageContext);

_defineProperty(Fullpage, "propTypes", {
  children: PropTypes.node.isRequired,
  transitionTiming: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])),
  className: PropTypes.string,
  onChange: PropTypes.func,
  keyboardShortcut: PropTypes.bool
});

_defineProperty(Fullpage, "defaultProps", {
  transitionTiming: 700,
  style: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0
  },
  className: '',
  onChange: null,
  keyboardShortcut: true
});

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FullPageSections = /*#__PURE__*/function (_PureComponent) {
  _inherits(FullPageSections, _PureComponent);

  var _super = _createSuper$4(FullPageSections);

  function FullPageSections() {
    _classCallCheck(this, FullPageSections);

    return _super.apply(this, arguments);
  }

  _createClass(FullPageSections, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          children = _this$props.children,
          style = _this$props.style,
          className = _this$props.className;
      return /*#__PURE__*/React.createElement(FullpageContext.Consumer, null, function (ctx) {
        return /*#__PURE__*/React.createElement("div", {
          name: "Warper",
          style: ctx.style // from
          ,
          ref: _this.warperRef
        }, /*#__PURE__*/React.createElement("div", {
          name: "Inner",
          className: className,
          style: _objectSpread$2(_objectSpread$2({
            transition: "transform ".concat(ctx.transitionTiming, "ms cubic-bezier(0.645, 0.045, 0.355, 1.000)")
          }, style), {}, {
            transform: "translate3D(0, ".concat(ctx.translateY, "px, 0)")
          }),
          ref: ctx.fullpageRef
        }, children));
      });
    }
  }]);

  return FullPageSections;
}(PureComponent);

_defineProperty(FullPageSections, "contextType", FullpageContext);

_defineProperty(FullPageSections, "propTypes", {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]))
});

_defineProperty(FullPageSections, "defaultProps", {
  className: '',
  style: {
    position: 'absolute',
    left: 0,
    right: 0
  }
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FullpageSectionContext = /*#__PURE__*/React.createContext();

var FullpageSection = /*#__PURE__*/function (_PureComponent) {
  _inherits(FullpageSection, _PureComponent);

  var _super = _createSuper$3(FullpageSection);

  function FullpageSection(props, context) {
    var _this;

    _classCallCheck(this, FullpageSection);

    _this = _super.call(this, props, context);
    _this.sectionRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(FullpageSection, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var subscribe = this.context.subscribe;
      this.el = this.sectionRef;
      subscribe(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var unsubscribe = this.context.unsubscribe;
      unsubscribe(this);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          height = _this$props.height,
          style = _this$props.style,
          className = _this$props.className;
      var getIndex = this.context.getIndex;
      this.index = getIndex(this);
      return /*#__PURE__*/React.createElement(FullpageSectionContext.Provider, {
        value: {
          index: this.index
        }
      }, /*#__PURE__*/React.createElement("section", {
        className: className,
        style: _objectSpread$1({
          height: height
        }, style),
        ref: this.sectionRef
      }, children));
    }
  }]);

  return FullpageSection;
}(PureComponent);

_defineProperty(FullpageSection, "contextType", FullpageContext);

_defineProperty(FullpageSection, "defaultProps", {
  height: '100vh',
  style: {},
  className: '',
  onShow: null,
  // eslint-disable-line no-unused-vars
  onHide: null // eslint-disable-line no-unused-vars

});

_defineProperty(FullpageSection, "propTypes", {
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])),
  className: PropTypes.string,
  onShow: PropTypes.func,
  // eslint-disable-line react/no-unused-prop-types
  onHide: PropTypes.func // eslint-disable-line react/no-unused-prop-types

});

_defineProperty(FullpageSection, "Number", function (_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  return /*#__PURE__*/React.createElement(FullpageSectionContext.Consumer, null, function (ctx) {
    return /*#__PURE__*/React.createElement("span", {
      style: style
    }, "".concat(ctx.index + 1));
  });
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
// eslint-disable-next-line react/prefer-stateless-function

var FullpageNavigation = /*#__PURE__*/function (_PureComponent) {
  _inherits(FullpageNavigation, _PureComponent);

  var _super = _createSuper$2(FullpageNavigation);

  function FullpageNavigation() {
    _classCallCheck(this, FullpageNavigation);

    return _super.apply(this, arguments);
  }

  _createClass(FullpageNavigation, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          style = _this$props.style,
          itemStyle = _this$props.itemStyle,
          _this$props$reverse = _this$props.reverse,
          reverse = _this$props$reverse === void 0 ? false : _this$props$reverse;
      var _this$context = this.context,
          number = _this$context.number,
          slides = _this$context.slides,
          transitionTiming = _this$context.transitionTiming;

      var gotoSlide = function gotoSlide(slide) {
        var _goto = _this.context["goto"];

        _goto(slide);
      };

      return /*#__PURE__*/React.createElement("div", {
        style: _objectSpread({
          position: 'fixed',
          height: '100vh',
          zIndex: 100,
          top: 0,
          right: 0,
          listStyleType: 'none',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          paddingRight: '1em'
        }, style)
      }, slides.map(function (slide, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i.toString()
        }, /*#__PURE__*/React.createElement("div", {
          style: _objectSpread({
            borderRadius: '50%',
            height: number === i ? 14 : 10,
            width: number === i ? 14 : 10,
            margin: number === i ? 3 : 5,
            backgroundColor: reverse ? 'white' : 'black',
            opacity: number === i ? 1 : 0.5,
            transition: "all ".concat(transitionTiming * 0.5, "ms ease-in-out")
          }, itemStyle),
          onClick: function onClick() {
            return gotoSlide(slide);
          },
          onKeyPress: function onKeyPress() {
            return gotoSlide(slide);
          },
          role: "button",
          tabIndex: "-1",
          "aria-label": "Slide ".concat(i)
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            display: 'none'
          }
        }, "slide number ".concat(i))));
      }));
    }
  }]);

  return FullpageNavigation;
}(PureComponent);

_defineProperty(FullpageNavigation, "contextType", FullpageContext);

_defineProperty(FullpageNavigation, "defaultProps", {
  style: {},
  itemStyle: {},
  reverse: false
});

_defineProperty(FullpageNavigation, "propTypes", {
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])),
  itemStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])),
  reverse: PropTypes.bool
});

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FullpageNumber = /*#__PURE__*/function (_PureComponent) {
  _inherits(FullpageNumber, _PureComponent);

  var _super = _createSuper$1(FullpageNumber);

  function FullpageNumber() {
    _classCallCheck(this, FullpageNumber);

    return _super.apply(this, arguments);
  }

  _createClass(FullpageNumber, [{
    key: "render",
    value: // eslint-disable-next-line react/static-property-placement
    function render() {
      // console.log('FullpageNumber render', this.context);
      return /*#__PURE__*/React.createElement(FullpageContext.Consumer, null, function (ctx) {
        return /*#__PURE__*/React.createElement("span", null, "".concat(ctx.number + 1));
      });
    }
  }]);

  return FullpageNumber;
}(PureComponent);

_defineProperty(FullpageNumber, "contextType", FullpageContext);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FullpageCount = /*#__PURE__*/function (_PureComponent) {
  _inherits(FullpageCount, _PureComponent);

  var _super = _createSuper(FullpageCount);

  function FullpageCount() {
    _classCallCheck(this, FullpageCount);

    return _super.apply(this, arguments);
  }

  _createClass(FullpageCount, [{
    key: "render",
    value: function render() {
      var style = this.props.style;
      return /*#__PURE__*/React.createElement(FullpageContext.Consumer, null, function (ctx) {
        return /*#__PURE__*/React.createElement("span", {
          style: style
        }, ctx.count);
      });
    }
  }]);

  return FullpageCount;
}(PureComponent);

_defineProperty(FullpageCount, "contextType", FullpageContext);

_defineProperty(FullpageCount, "propTypes", {
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]))
});

_defineProperty(FullpageCount, "defaultProps", {
  style: {}
});

export { FullPageSections, Fullpage, FullpageContext, FullpageCount, FullpageNavigation, FullpageNumber, FullpageSection, Fullpage as default };
