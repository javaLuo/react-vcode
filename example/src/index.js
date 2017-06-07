import React from 'react';
import Vcode from '../../dist/index.js';
import ReactDom from 'react-dom';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: '', // 第1个input的值
      input2: '', // 第2个input的值
      vcode1: '', // 第1个vcode的值
      vcode2: '', // 第2个vcode的值
    };
  }

  onInput1Change(e) {
    this.setState({
      input1: e.target.value,
    });
  }

  onVcode1Change(v) {
    this.setState({
      vcode1: v,
    });
  }

  onInput2Change(e) {
    this.setState({
      input2: e.target.value,
    });
  }

  onVcode2Change(v) {
    this.setState({
      vcode2: v,
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>基本使用</div>
          <input type='text' value={this.state.input1} onChange={(e) => this.onInput1Change(e)} maxLength={10} />
          <Vcode
            onChange={(v) => this.onVcode1Change(v)}
          />
          <span>{this.state.input1 === this.state.vcode1 ? 'success' : 'error'}</span>
        </div>
        <hr />
        <div>
          <div>自定义参数</div>
          <input type='text' value={this.state.input2} onChange={(e) => this.onInput2Change(e)} maxLength={10} />
          <Vcode
            onChange={(v) => this.onVcode2Change(v)}
            length={6}
            width={200}
            height={100}
            className="classNameTest"
            style={{ backgroundColor: '#cccccc' }}
            options={{
              codes: ['A', 'B', 'C', 'D', 'E'],
              lines: 20,
              lineWidthMin: 200,
              lineWidthMax: 200
            }}
          />
          <span>{this.state.input2 === this.state.vcode2 ? 'success' : 'error'}</span>
        </div>
      </div>
    );
  }
}

ReactDom.render(
	<Test />,
	document.getElementById('root')
);
