"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var Vcode =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(Vcode, _React$PureComponent);

  function Vcode(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Vcode);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Vcode).call(this, props));
    _this.state = {
      id: _this.props.id || "".concat(new Date().getTime(), "_").concat(Math.random().toFixed(4)),
      // 需要一个唯一的ID，因为vcode要直接操作dom
      width: _this.props.width || 150,
      // vcode宽度
      height: _this.props.height || 40,
      // vcode高度
      len: _this.props.length || 4,
      // 生成几位code
      style: function () {
        // vcode容器样式
        var a = {
          position: 'relative',
          backgroundColor: '#fff',
          overflow: 'hidden',
          width: _this.props.width ? "".concat(_this.props.width, "px") : '150px',
          height: _this.props.height ? "".concat(_this.props.height, "px") : '40px',
          cursor: 'pointer',
          verticalAlign: 'middle',
          userSelect: 'none'
        };

        if (_this.props.style) {
          return Object.assign({}, a, _this.props.style);
        }

        return a;
      }(),
      options: function () {
        // 初始化参数
        var a = {
          codes: [// 所有可能出现的字符
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o', 'p', 'q', 'r', 's', 't', 'x', 'u', 'v', 'y', 'z', 'w', 'n', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          fontSizeMin: 22,
          // 字体尺寸最小值
          fontSizeMax: 26,
          // 字体尺寸最大值
          colors: [// 字可能的颜色
          '#117cb3', '#f47b06', '#202890', '#db1821', '#b812c2'],
          fonts: [// 可能的字体
          'Times New Roman', 'Georgia', 'Serif', 'sans-serif', 'arial', 'tahoma', 'Hiragino Sans GB'],
          lines: 8,
          // 生成多少根线
          lineColors: [// 线可能的颜色
          '#7999e1', '#383838', '#ec856d', '#008888'],
          lineHeightMin: 1,
          // 线的粗细最小值
          lineHeightMax: 1,
          // 线的粗细最大值
          lineWidthMin: 20,
          // 线的长度最小值
          lineWidthMax: 60 // 线的长度最大值

        };

        if (_this.props.options) {
          return Object.assign({}, a, _this.props.options);
        }

        return a;
      }()
    };
    return _this;
  }
  /** 组件初始化完毕时触发 **/


  (0, _createClass2.default)(Vcode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onDraw(this.props.value);
    }
    /** 组件参数改变 **/

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevP) {
      if (this.props.value !== prevP.value) {
        this.onDraw(this.props.value);
      }

      if (this.props.width !== prevP.width || this.props.height !== prevP.height || this.props.style !== prevP.style) {
        this.setState({
          width: this.props.width || 150,
          height: this.props.height || 40,
          style: Object.assign({}, this.state.style, {
            width: this.props.width ? "".concat(this.props.width, "px") : '150px',
            height: this.props.height ? "".concat(this.props.height, "px") : '40px'
          })
        });
      }
    }
    /** 用户点击了验证码图片 **/

  }, {
    key: "onClick",
    value: function onClick() {
      // 如果用户没有设置值，就直接重新生成
      if (!this.props.value) {
        this.onDraw(this.props.value);
      }

      this.props.onClick && this.props.onClick(); // 触发外部的onClick,什么都不返回
    }
    /** 随机生成一个Code的CSS样式 **/

  }, {
    key: "codeCss",
    value: function codeCss(uW, i) {
      return ["font-size:".concat(this.randint(this.state.options.fontSizeMin, this.state.options.fontSizeMax), "px"), "color:".concat(this.state.options.colors[this.randint(0, this.state.options.colors.length - 1)]), 'position: absolute', "left:".concat(this.randint(uW * i, uW * i + uW - uW / 2), "px"), 'top:50%', "transform:rotate(".concat(this.randint(-15, 15), "deg) translateY(-50%)"), "-o-transform:rotate(".concat(this.randint(-15, 15), "deg) translateY(-50%)"), "-ms-transform:rotate(".concat(this.randint(-15, 15), "deg) translateY(-50%)"), "-moz-transform:rotate(".concat(this.randint(-15, 15), "deg) translateY(-50%)"), "-webkit-transform:rotate(".concat(this.randint(-15, 15), "deg) translateY(-50%)"), "font-family:".concat(this.state.options.fonts[this.randint(0, this.state.options.fonts.length - 1)]), 'font-weight:bold', 'z-index:2'].join(';');
    }
    /** 随机生成一条线的CSS样式 **/

  }, {
    key: "lineCss",
    value: function lineCss() {
      return ['position: absolute', "opacity:".concat(this.randint(3, 8) / 10), "width:".concat(this.randint(this.state.options.lineWidthMin, this.state.options.lineWidthMax), "px"), "height:".concat(this.randint(this.state.options.lineHeightMin, this.state.options.lineHeightMax), "px"), "background:".concat(this.state.options.lineColors[this.randint(0, this.state.options.lineColors.length - 1)]), "left:".concat(this.randint(-this.state.options.lineWidthMin / 2, this.state.width), "px"), "top:".concat(this.randint(0, this.state.height), "px"), "transform:rotate(".concat(this.randint(-30, 30), "deg)"), "-o-transform:rotate(".concat(this.randint(-30, 30), "deg)"), "-ms-transform:rotate(".concat(this.randint(-30, 30), "deg)"), "-moz-transform:rotate(".concat(this.randint(-30, 30), "deg)"), "-webkit-transform:rotate(".concat(this.randint(-30, 30), "deg)"), "font-family:".concat(this.state.options.fonts[this.randint(0, this.state.options.fonts.length - 1)]), "font-weight:".concat(this.randint(400, 900))].join(';');
    }
  }, {
    key: "onDraw",
    value: function onDraw(value) {
      var c = ''; // 存储生成的code

      var div = document.getElementById(this.state.id);
      var isImg = /^http[s]*:\/\/|\.jpg$|\.png$|\.jpeg$|\.gif$|\.bmp$|\.webp$|^data:image/.test(value); // 是否是图片

      div.innerHTML = '';

      if (isImg) {
        // 用户传递了一张图片
        var dom = document.createElement('img');
        dom.style.cssText = ['display: block', 'max-width:100%', 'max-height:100%'].join(';');
        dom.src = value;
        div.appendChild(dom);
        this.props.onChange && this.props.onChange(null);
        return null;
      } // 不是图片而是普通字符串, 如果value存在说明是用户自定义的字符串


      var length = value ? value.length : this.state.len; // 字符的长度

      var uW = this.state.width / length / 1.01; // 每个字符占的宽度

      for (var i = 0; i < length; i++) {
        var _dom = document.createElement('span');

        _dom.style.cssText = this.codeCss(uW, i);
        var temp = value ? value[i] : this.state.options.codes[Math.round(Math.random() * (this.state.options.codes.length - 1))];
        _dom.innerHTML = temp;
        c = "".concat(c).concat(temp);
        div.appendChild(_dom);
      } // 生成好看的线条


      for (var _i = 0; _i < this.state.options.lines; _i++) {
        var _dom2 = document.createElement('div');

        _dom2.style.cssText = this.lineCss();
        div.appendChild(_dom2);
      }

      this.props.onChange && this.props.onChange(c); // 触发回调

      return c;
    }
    /** 生成范围随机数 **/

  }, {
    key: "randint",
    value: function randint(n, m) {
      var c = m - n + 1;
      var num = Math.random() * c + n;
      return Math.floor(num);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        id: this.state.id,
        style: this.state.style,
        className: this.props.className,
        onClick: function onClick() {
          return _this2.onClick();
        }
      });
    }
  }]);
  return Vcode;
}(_react.default.PureComponent);
/**
  id: P.string, // ID
  length: P.number,  // 生成几位字符串
  value: P.string,  // 由父级传入指定的字符串生成code
  width: P.number,  // 多宽 px
  height: P.number,  //  多高 px
  style: P.object,    // 自定义style
  className: P.string,  // 各种class
  onChange: P.func, // 每次生成新的验证码时，将验证码的值传到上级
  options: P.object,  // 自定义各参数
**/


exports.default = Vcode;