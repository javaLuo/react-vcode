import React from "react";
import Vcode from "../../dist/index.js";
import ReactDom from "react-dom";
import ImgTest1 from "../assets/test1.png";
import ImgTest2 from "../assets/test2.png";
import './index.css';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 1,
      input2: "", // 第2个input的值
      vcode2: "-1", // 第2个vcode的值
      code: "",
      width: 100,
    };
  }

  onInput2Change(e) {
    this.setState({
      input2: e.target.value,
    });
  }

  onVcode2Change(v) {
    console.log("触发回调onChange", v);
    if (v) {
      this.setState({
        vcode2: v,
      });
    }
  }

  onChangeImg() {
    const imgindex = this.state.img === 1 ? 2 : 1;
    this.setState({
      img: imgindex,
      code: imgindex === 1 ? ImgTest1 : ImgTest2,
      vcode2: imgindex === 1 ? "wow1" : "helloworld",
    });
  }
  onChangeStr() {
    const a = ["a", "b", "c", "d"];
    const d = [];
    for (let i = 0; i < 5; i++) {
      d.push(a[Math.round(Math.random() * 3)]);
    }
    console.log("code:", d);
    this.setState({
      code: d.join(""),
    });
  }

  onVcodeClick() {
    this.onChangeStr();
  }
  onChangeWidth() {
    const l = Math.round(Math.random() * 800 + 400);
    this.setState({
      width: l,
    });
  }
  render() {
    return (
      <div>
        <div>
          <input type="text" placeholder="请输入正确的验证码" value={this.state.input2} onChange={e => this.onInput2Change(e)} maxLength={20} />
          <Vcode onChange={v => this.onVcode2Change(v)} onClick={() => console.log('触发onClick') } value={this.state.code} width={this.state.width} className={'vcode'}/>
          <span>{this.state.input2 === this.state.vcode2 ? "输入正确" : "输入错误"}</span>
        </div>
        <hr />
        <button onClick={() => this.onChangeImg()}>更换图片</button>
        <button onClick={() => this.onChangeStr()}>外部生成随机字符串</button>
        <button onClick={() => this.onChangeWidth()}>改变width</button>
      </div>
    );
  }
}

ReactDom.render(<Test />, document.getElementById("root"));
