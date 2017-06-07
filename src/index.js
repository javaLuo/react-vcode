import React from 'react';

class Vcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || `${new Date().getTime()}_${Math.random().toFixed(4)}`, // 需要一个唯一的ID，因为vcode要直接操作dom
      width: this.props.width || 150,   // vcode宽度
      height: this.props.height || 40,  // vcode高度
      length: this.props.length || 4,   // 生成几位code
      style: (() => {                   // vcode容器样式
        const a = {
          position: 'relative',
          backgroundColor: '#fff',
          overflow: 'hidden',
          width: this.props.width ? `${this.props.width}px` : '150px',
          height: this.props.height ? `${this.props.height}px` : '40px',
          cursor: 'pointer',
          verticalAlign: 'middle',
          userSelect: 'none',
        };
        if (this.props.style) {
          return Object.assign({}, a, this.props.style);
        }
        return a;
      })(),
      options: (() => {     // 初始化参数
        const a = {
          codes: [          // 所有可能出现的字符
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'o', 'p', 'q', 'r', 's', 't', 'x', 'u', 'v', 'y', 'z', 'w', 'n',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          ],
          fontSizeMin: 22,  // 字体尺寸最小值
          fontSizeMax: 26,  // 字体尺寸最大值
          colors: [         // 字可能的颜色
            '117cb3',
            'f47b06',
            '#202890',
            '#db1821',
            '#b812c2',
          ],
          fonts: [          // 可能的字体
            'Times New Roman',
            'Georgia',
            'Serif',
            'sans-serif',
            'arial',
            'tahoma',
            'Hiragino Sans GB',
          ],
          lines: 8,         // 生成多少根线
          lineColors: [     // 线可能的颜色
            '#7999e1',
            '#383838',
            '#ec856d',
            '#008888',
          ],
          lineHeightMin: 1, // 线的粗细最小值
          lineHeightMax: 1, // 线的粗细最大值
          lineWidthMin: 20, // 线的长度最小值
          lineWidthMax: 60, // 线的长度最大值
        };
        if (this.props.options) {
          return Object.assign({}, a, this.props.options);
        }
        return a;
      })(),
    };
  }

  /** 组件初始化完毕时触发 **/
  componentDidMount() {
    this.onDraw();
  }

  /** 用户点击的验证码图片 **/
  onClick() {
    const div = document.getElementById(this.state.id);
    div.innerHTML = '';
    this.onDraw();
  }

  /** 随机生成验证码 **/
  onDraw() {
    let c = '';                                             // 存储生成的code
    const div = document.getElementById(this.state.id);
    const uW = this.state.width / this.state.length;        // 每个字符占的宽度

    // 生成好看的code
    for (let i = 0; i < this.state.length; i++) {
      const dom = document.createElement('span');
      dom.style.cssText = [
        `font-size:${this.randint(this.state.options.fontSizeMin,
          this.state.options.fontSizeMax)}px`,
        `color:${this.state.options.colors[this.randint(0,
          this.state.options.colors.length - 1)]}`,
        'position: absolute',
        `left:${this.randint(uW * i, ((uW * i) + uW) - (uW / 2))}px`,
        'top:50%',
        `transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
        `-o-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
        `-ms-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
        `-moz-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
        `-webkit-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
        `font-family:${this.state.options.fonts[this.randint(0,
          this.state.options.fonts.length - 1)]}`,
        'font-weight:bold',
        'z-index:2',
      ].join(';');
      const temp = this.state.options.codes[(Math.round(Math.random() * (this.state.options.codes.length - 1)))];
      dom.innerHTML = temp;
      c = `${c}${temp}`;
      div.appendChild(dom);
    }

    // 生成好看的线条
    for (let i = 0; i < this.state.options.lines; i++) {
      const dom = document.createElement('div');
      dom.style.cssText = [
        'position: absolute',
        `opacity:${this.randint(3, 8) / 10}`,
        `width:${this.randint(this.state.options.lineWidthMin, this.state.options.lineWidthMax)}px`,
        `height:${this.randint(this.state.options.lineHeightMin,
          this.state.options.lineHeightMax)}px`,
        `background:${this.state.options.lineColors[this.randint(0,
          this.state.options.lineColors.length - 1)]}`,
        `left:${this.randint(-this.state.options.lineWidthMin/2, this.state.width)}px`,
        `top:${this.randint(0, this.state.height)}px`,
        `transform:rotate(${this.randint(-30, 30)}deg)`,
        `-o-transform:rotate(${this.randint(-30, 30)}deg)`,
        `-ms-transform:rotate(${this.randint(-30, 30)}deg)`,
        `-moz-transform:rotate(${this.randint(-30, 30)}deg)`,
        `-webkit-transform:rotate(${this.randint(-30, 30)}deg)`,
        `font-family:${this.state.options.fonts[this.randint(0,
          this.state.options.fonts.length - 1)]}`,
        `font-weight:${this.randint(400, 900)}`,
      ].join(';');
      div.appendChild(dom);
    }
    if (this.props.onChange) {
      this.props.onChange(c);
    }
  }

  /** 生成范围随机数 **/
  randint(n, m) {
    const c = (m - n) + 1;
    const num = (Math.random() * c) + n;
    return Math.floor(num);
  }

  render() {
    return (
      <div
        id={this.state.id}
        style={this.state.style}
        className={this.props.className}
        onClick={() => this.onClick()}
      />
    );
  }
}

export default Vcode;

/**
  id: P.string, // ID
  length: P.number,  // 生成几位字符串
  width: P.number,  // 多宽 px
  height: P.number,  //  多高 px
  style: P.object,    // 自定义style
  className: P.string,  // 各种class
  onChange: P.func, // 每次生成新的验证码时，将验证码的值传到上级
  options: P.object,  // 自定义各参数
**/
