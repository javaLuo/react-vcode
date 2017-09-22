# react-vcode [![npm](https://img.shields.io/npm/v/react-vcode.svg)](https://www.npmjs.com/package/react-vcode) [![codebeat badge](https://codebeat.co/badges/6b270f5e-c8d9-4f47-9f84-2833fcf897aa)](https://codebeat.co/projects/github-com-javaluo-react-vcode-master) [![npm](https://img.shields.io/npm/dy/react-vcode.svg)](https://www.npmjs.com/package/react-vcode)
一个简单的React验证码组件

## 0. 示例图

#### 基本

![image](https://github.com/javaLuo/react-vcode/blob/master/example/assets/test1.png)

#### 自定义参数

![image](https://github.com/javaLuo/react-vcode/blob/master/example/assets/test2.png)


## 1. 安装

````
npm install react-vcode
````

## 2. 使用

````
import Vcode from 'react-vcode';

 <Vcode />
 
````

## 3. 自定义参数

可自行设置覆盖原有值

````bash
id                  # string  一个ID 可手动设置也可以不管，默认值：时间戳+随机数
value               # string  受控，可指定要生成的验证码，而不是随机生成
length: 4           # number  生成几位验证码
width: 150          # number  容器宽度
height: 40          # number  容器高度
className           # string  自定义样式class, 默认值：无
onChange            # func    生成新的验证码时触发，将新的验证码字符串返回上级
style: {            # object  容器样式 （注：如果在style中设置width和height,将覆盖上面通过属性设置的width和height）
  position: 'relative',
  backgroundColor: '#fff',
  overflow: 'hidden',
  cursor: 'pointer',
  verticalAlign: 'middle',
  userSelect: 'none',
}
options:{           # 自定义参数
  codes: [          # 所有可能出现的字符
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'o', 'p', 'q', 'r', 's', 't', 'x', 'u', 'v', 'y', 'z', 'w', 'n',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ],
  fontSizeMin: 22,  # 字体尺寸最小值
  fontSizeMax: 26,  # 字体尺寸最大值
  colors: [         # 字可能的颜色
    '#117cb3',
    '#f47b06',
    '#202890',
    '#db1821',
    '#b812c2',
  ],
  fonts: [          # 可能的字体
    'Times New Roman',
    'Georgia',
    'Serif',
    'sans-serif',
    'arial',
    'tahoma',
    'Hiragino Sans GB',
  ],
  lines: 8,         # 生成多少根干扰线
  lineColors: [     # 线可能的颜色
    '#7999e1',
    '#383838',
    '#ec856d',
    '#008888',
  ],
  lineHeightMin: 1, # 线的粗细最小值
  lineHeightMax: 1, # 线的粗细最大值
  lineWidthMin: 20, # 线的长度最小值
  lineWidthMax: 60, # 线的长度最大值
}

# 例子：

<Vcode
  id='test'
  length={6}
  onChange={(v) => {console.log('当前的验证码值：', v)}}
  options={{ codes: [ 'A', 'B', 'C' ] }}
/>
````

## 4. 额外说明

* 之前用过一个验证码插件叫 vcode.js, 不知道作者。 本react-vcode是通过vcode.js的源码进行修改加工，转成了react组件。感谢原作者。
