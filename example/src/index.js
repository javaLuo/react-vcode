import React from 'react';
import Vcode from '../../dist/index.js';
import ReactDom from 'react-dom';
import ImgTest1 from '../assets/test1.png';
import ImgTest2 from '../assets/test2.png';
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 1,
      input2: '', // 第2个input的值
      vcode2: '-1', // 第2个vcode的值
      code: '',
    };
  }

  onInput2Change(e) {
    this.setState({
      input2: e.target.value,
    });
  }

  onVcode2Change(v) {
    console.log("触发回调onChange", v);
    this.setState({
      vcode2: v,
    });
  }

    onChangeImg(){
      this.setState({
          img: this.state.img === 1 ? 2 : 1
      })
    }
    onChangeStr(){
      const a = ['a','b','c','d'];
      const d = [];
      for(let i=0;i<5;i++){
        d.push(Math.round(Math.random()*3));
      }
      this.setState({
          code: d.join(""),
      })
    }

    onVcodeClick(){
        this.onChangeStr();
    }
  render() {
    return (
      <div>
        <div>
          <input
              type='text'
              placeholder="请输入正确的验证码"
              value={this.state.input2}
              onChange={(e) => this.onInput2Change(e)}
              maxLength={20}
          />
          <Vcode
            onChange={(v) => this.onVcode2Change(v)}
            onClick={(v) => this.onVcodeClick(v)}
            length={6}
            width={200}
            height={100}
            value={this.state.img === 1 ? ImgTest2 : ImgTest1}
            className="classNameTest"
            options={{
              codes: ['A', 'B', 'C', 'D', 'E'],
              lines: 20,
              lineWidthMin: 200,
              lineWidthMax: 200
            }}
          />
          <span>{this.state.input2 === this.state.vcode2 ? '输入正确' : '输入错误'}</span>
        </div>
        <hr/>
        <button onClick={()=>this.onChangeImg()}>更换图片</button>
        <button onClick={()=>this.onChangeStr()}>外部生成随机字符串</button>
      </div>
    );
  }
}

ReactDom.render(
	<Test />,
	document.getElementById('root')
);
