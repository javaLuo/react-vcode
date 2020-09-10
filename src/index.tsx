import * as React from "react";
require("es6-object-assign").polyfill();

interface Props {
  id?: string; // ID
  length?: number; // 生成几位字符串
  value?: string; // 由父级传入指定的字符串生成code
  width?: number; // 多宽 px
  height?: number; //  多高 px
  style?: {
    [propName: string]: any;
  }; // 自定义style
  className?: string; // 各种class
  options?: OptionsProps; // 自定义各参数
  onChange?: (p: string | null) => any; // 每次生成新的验证码时，将验证码的值传到上级
  onClick?: () => any; // 用户每次点击时触发
}
interface State {
  id: string;
  width: number;
  height: number;
  len: number;
  style: {
    [propName: string]: any;
  };
  options: Options;
}

interface Options {
  codes: (string | number)[]; // 所有可能出现的字符
  fontSizeMin: number; // 字体尺寸最小值
  fontSizeMax: number; // 字体尺寸最大值
  colors: string[]; // 所有可能出现的颜色
  fonts: string[]; // 所有可能出现的字体
  lines: number; // 生成多少根线
  lineColors: string[]; // 线可能的颜色
  lineHeightMin: number; // 线的粗细最小值
  lineHeightMax: number; // 线的粗细最大值
  lineWidthMin: number; // 线的长度最小值
  lineWidthMax: number; // 线的长度最大值
}

type OptionsProps = { [P in keyof Options]?: Options[P] };

export default class Vcode extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: this.props.id || `${Date.now()}_${Math.random().toFixed(4)}`, // 需要一个唯一的ID，因为vcode要直接操作dom
      width: this.props.width || 150, // vcode宽度
      height: this.props.height || 40, // vcode高度
      len: this.props.length || 4, // 生成几位code
      style: (() => {
        // vcode容器样式
        const a = {
          position: "relative",
          backgroundColor: "#fff",
          overflow: "hidden",
          width: this.props.width ? `${this.props.width}px` : "150px",
          height: this.props.height ? `${this.props.height}px` : "40px",
          cursor: "pointer",
          verticalAlign: "middle",
          userSelect: "none",
        };
        if (this.props.style) {
          return Object.assign({}, a, this.props.style);
        }
        return a;
      })(),
      options: (() => {
        // 初始化参数
        const a: Options = {
          codes: [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "x",
            "u",
            "v",
            "y",
            "z",
            "w",
            "n",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
          ],
          fontSizeMin: 22, // 字体尺寸最小值
          fontSizeMax: 26, // 字体尺寸最大值
          colors: [
            // 字可能的颜色
            "#117cb3",
            "#f47b06",
            "#202890",
            "#db1821",
            "#b812c2",
          ],
          fonts: [
            // 可能的字体
            "Times New Roman",
            "Georgia",
            "Serif",
            "sans-serif",
            "arial",
            "tahoma",
            "Hiragino Sans GB",
          ],
          lines: 8, // 生成多少根线
          lineColors: [
            // 线可能的颜色
            "#7999e1",
            "#383838",
            "#ec856d",
            "#008888",
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
  componentDidMount(): void {
    this.onDraw(this.props.value);
  }

  /** 组件参数改变 **/
  componentDidUpdate(prevP: Props): void {
    if (this.props.value !== prevP.value) {
      this.onDraw(this.props.value);
    }
    if (
      this.props.width !== prevP.width ||
      this.props.height !== prevP.height ||
      this.props.style !== prevP.style
    ) {
      this.setState({
        width: this.props.width || 150,
        height: this.props.height || 40,
        style: Object.assign({}, this.state.style, {
          width: this.props.width ? `${this.props.width}px` : "150px",
          height: this.props.height ? `${this.props.height}px` : "40px",
        }),
      });
    }
  }

  /** 用户点击了验证码图片 **/
  onClick(): void {
    // 如果用户没有设置值，就直接重新生成
    if (!this.props.value) {
      this.onDraw(this.props.value);
    }
    this.props.onClick && this.props.onClick(); // 触发外部的onClick,什么都不返回
  }

  /**
   * 随机生成一个Code的CSS样式
   * @param uW 每个字符所占的宽度
   * @param i 当前字符的下标
   * @return CSS字符串
   */
  codeCss(uW: number, i: number): string {
    return [
      `font-size:${this.randint(
        this.state.options.fontSizeMin,
        this.state.options.fontSizeMax
      )}px`,
      `color:${
        this.state.options.colors[
          this.randint(0, this.state.options.colors.length - 1)
        ]
      }`,
      "position: absolute",
      `left:${this.randint(uW * i, uW * i + uW - uW / 2)}px`,
      "top:50%",
      `transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-o-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-ms-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-moz-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-webkit-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `font-family:${
        this.state.options.fonts[
          this.randint(0, this.state.options.fonts.length - 1)
        ]
      }`,
      "font-weight:bold",
      "z-index:2",
    ].join(";");
  }

  /**
   * 随机生成一条线的CSS样式
   * @return CSS字符串
   */
  lineCss(): string {
    return [
      "position: absolute",
      `opacity:${this.randint(3, 8) / 10}`,
      `width:${this.randint(
        this.state.options.lineWidthMin,
        this.state.options.lineWidthMax
      )}px`,
      `height:${this.randint(
        this.state.options.lineHeightMin,
        this.state.options.lineHeightMax
      )}px`,
      `background:${
        this.state.options.lineColors[
          this.randint(0, this.state.options.lineColors.length - 1)
        ]
      }`,
      `left:${this.randint(
        -this.state.options.lineWidthMin / 2,
        this.state.width
      )}px`,
      `top:${this.randint(0, this.state.height)}px`,
      `transform:rotate(${this.randint(-30, 30)}deg)`,
      `-o-transform:rotate(${this.randint(-30, 30)}deg)`,
      `-ms-transform:rotate(${this.randint(-30, 30)}deg)`,
      `-moz-transform:rotate(${this.randint(-30, 30)}deg)`,
      `-webkit-transform:rotate(${this.randint(-30, 30)}deg)`,
      `font-family:${
        this.state.options.fonts[
          this.randint(0, this.state.options.fonts.length - 1)
        ]
      }`,
      `font-weight:${this.randint(400, 900)}`,
    ].join(";");
  }

  /**
   * 绘制
   * @param value 需要生成的字符值，不传则随机生成
   * */
  onDraw(value: string | undefined): string | null {
    let c = ""; // 存储生成的code
    const div = document.getElementById(this.state.id);

    const isImg: boolean = /^http[s]*:\/\/|\.jpg$|\.png$|\.jpeg$|\.gif$|\.bmp$|\.webp$|^data:image/.test(
      value || ""
    ); // 是否是图片
    if (div) {
      div.innerHTML = "";
    }

    if (isImg) {
      // 用户传递了一张图片
      const dom = document.createElement("img");
      dom.style.cssText = [
        "display: block",
        "max-width:100%",
        "max-height:100%",
      ].join(";");
      dom.src = value as string;
      div && div.appendChild(dom);
      this.props.onChange && this.props.onChange(null);
      return null;
    }

    // 不是图片而是普通字符串, 如果value存在说明是用户自定义的字符串
    const length = value ? value.length : this.state.len; // 字符的长度

    const uW: number = this.state.width / length / 1.01; // 每个字符占的宽度
    for (let i = 0; i < length; i++) {
      const dom = document.createElement("span");
      dom.style.cssText = this.codeCss(uW, i);
      const temp = value
        ? value[i]
        : this.state.options.codes[
            Math.round(Math.random() * (this.state.options.codes.length - 1))
          ];
      dom.innerHTML = String(temp);
      c = `${c}${temp}`;
      div && div.appendChild(dom);
    }

    // 生成好看的线条
    for (let i = 0; i < this.state.options.lines; i++) {
      const dom = document.createElement("div");
      dom.style.cssText = this.lineCss();
      div && div.appendChild(dom);
    }
    this.props.onChange && this.props.onChange(c); // 触发回调
    return c;
  }

  /** 生成范围随机数 **/
  randint(n: number, m: number): number {
    const c = m - n + 1;
    const num = Math.random() * c + n;
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
