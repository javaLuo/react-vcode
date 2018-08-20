import React from 'react';
// equire('es6-object-assign').polyfill();
class Vcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || `${new Date().getTime()}_${Math.random().toFixed(4)}`, // 需要一个唯一的ID，因为vcode要直接操作dom
      width: this.props.width || 150, // vcode宽度
      height: this.props.height || 40, // vcode高度
      len: this.props.length || 4, // 生成几位code
      style: (() => {
        // vcode容器样式
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
      options: (() => {
        // 初始化参数
        const a = {
          codes: [
            // 所有可能出现的字符
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'x',
            'u',
            'v',
            'y',
            'z',
            'w',
            'n',
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
          ],
          fontSizeMin: 22, // 字体尺寸最小值
          fontSizeMax: 26, // 字体尺寸最大值
          colors: [
            // 字可能的颜色
            '#117cb3',
            '#f47b06',
            '#202890',
            '#db1821',
            '#b812c2',
          ],
          fonts: [
            // 可能的字体
            'Times New Roman',
            'Georgia',
            'Serif',
            'sans-serif',
            'arial',
            'tahoma',
            'Hiragino Sans GB',
          ],
          lines: 8, // 生成多少根线
          lineColors: [
            // 线可能的颜色
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
    this.onDraw(this.props.value);
  }

  /** 组件参数改变 **/
  UNSAFE_componentWillReceiveProps(nextP, nextS) {
    if (this.props.value !== nextP.value) {
      this.onDraw(nextP.value);
    }
    if (this.props.width !== nextP.width || this.props.height !== nextP.height) {
      this.setState({
        width: nextP.width,
        height: nextP.height,
      });
    }
  }

  /** 用户点击的验证码图片 **/
  onClick() {
    const div = document.getElementById(this.state.id);
    // 如果this.props.value有值，表明值是外部受控，这个地方不需要重新渲染
    let code = null;
    if (!this.props.value) {
      code = this.onDraw(this.props.value);
    }
    this.props.onClick && this.props.onClick(); // 触发外部的onClick,什么都不返回
  }

  /** 随机生成一个Code的CSS样式 **/
  codeCss(uW, i) {
    return [
      `font-size:${this.randint(this.state.options.fontSizeMin, this.state.options.fontSizeMax)}px`,
      `color:${this.state.options.colors[this.randint(0, this.state.options.colors.length - 1)]}`,
      'position: absolute',
      `left:${this.randint(uW * i, uW * i + uW - uW / 2)}px`,
      'top:50%',
      `transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-o-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-ms-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-moz-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-webkit-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `font-family:${this.state.options.fonts[this.randint(0, this.state.options.fonts.length - 1)]}`,
      'font-weight:bold',
      'z-index:2',
    ].join(';');
  }

  /** 随机生成一条线的CSS样式 **/
  lineCss() {
    return [
      'position: absolute',
      `opacity:${this.randint(3, 8) / 10}`,
      `width:${this.randint(this.state.options.lineWidthMin, this.state.options.lineWidthMax)}px`,
      `height:${this.randint(this.state.options.lineHeightMin, this.state.options.lineHeightMax)}px`,
      `background:${this.state.options.lineColors[this.randint(0, this.state.options.lineColors.length - 1)]}`,
      `left:${this.randint(-this.state.options.lineWidthMin / 2, this.state.width)}px`,
      `top:${this.randint(0, this.state.height)}px`,
      `transform:rotate(${this.randint(-30, 30)}deg)`,
      `-o-transform:rotate(${this.randint(-30, 30)}deg)`,
      `-ms-transform:rotate(${this.randint(-30, 30)}deg)`,
      `-moz-transform:rotate(${this.randint(-30, 30)}deg)`,
      `-webkit-transform:rotate(${this.randint(-30, 30)}deg)`,
      `font-family:${this.state.options.fonts[this.randint(0, this.state.options.fonts.length - 1)]}`,
      `font-weight:${this.randint(400, 900)}`,
    ].join(';');
  }

  onDraw(value) {
    let c = ''; // 存储生成的code
    const div = document.getElementById(this.state.id);
    const isImg = /^http[s]*:\/\/|\.jpg$|\.png$|\.jpeg$|\.gif$|\.bmp$|\.webp$|^data:image/.test(value); // 是否是图片
    div.innerHTML = '';

    if (isImg) {
      // 用户传递了一张图片
      const dom = document.createElement('img');
      dom.style.cssText = ['display: block', 'max-width:100%', 'max-height:100%'].join(';');
      dom.src = value;
      div.appendChild(dom);
      this.props.onChange && this.props.onChange(null);
      return null;
    }

    // 不是图片而是普通字符串, 如果value存在说明是用户自定义的字符串
    let length = value ? value.length : this.state.len; // 字符的长度

    const uW = this.state.width / length / 1.01; // 每个字符占的宽度
    for (let i = 0; i < length; i++) {
      const dom = document.createElement('span');
      dom.style.cssText = this.codeCss(uW, i);
      const temp = value ? value[i] : this.state.options.codes[Math.round(Math.random() * (this.state.options.codes.length - 1))];
      dom.innerHTML = temp;
      c = `${c}${temp}`;
      div.appendChild(dom);
    }

    // 生成好看的线条
    for (let i = 0; i < this.state.options.lines; i++) {
      const dom = document.createElement('div');
      dom.style.cssText = this.lineCss();
      div.appendChild(dom);
    }
    this.props.onChange && this.props.onChange(c); // 触发回调
    return c;
  }

  /** 生成范围随机数 **/
  randint(n, m) {
    const c = m - n + 1;
    const num = Math.random() * c + n;
    return Math.floor(num);
  }

  render() {
    return <div id={this.state.id} style={this.state.style} className={this.props.className} onClick={() => this.onClick()} />;
  }
}

export default Vcode;

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
