# browserHelper
## 背景

## 公共部分
- [ ] 生成和下载二维码，独立二维码生成页面（对标草料二维码）
- [ ] 选中文本右击进行百度（因为某些原因导致我们很难谷歌搜索东西，所以就是要百度或者必应）
- [ ] Markdown工具 （Markdown编辑器，支持在线编写、预览、下载等，并支持HTML内容到Markdown格式的转换）
- [ ] npmhub
- [ ] 所有资讯链接榜整合（微博热榜、知乎热榜、技术公众号推送）
- [ ] 水印图片，可选择水印
- [ ] 跳转工作导航EasyLink

## 前端工作辅助部分

- [x] json格式化 输入`{"name": "zenquan", "age": 25, "sex": "female"}` 转换成 

	```json
	{
		name:  String,
		age:  Number,
		sex:  String,
	}
	```
	后复制

	todo：1. 对json标准格式化；2. 支持多层嵌套中的问题

- [x] 最近在使用styled-components，发现写起来虽然有点爽，只是都要去export 定义很多个，实在麻烦，所以
造东西的时候有到了

	```js
	import {Page, Text, Line} from './style'
	```

	=> 

	```js
	import styled from 'styled-components'
	export const Page = styled.div`
	`
	export const Text = styled.div`
	`
	export const Line = styled.div`
	`

	<Page></Page>
	<Text></Text>
	<Line></Line>
	```

## github相关部分
### git clone (github)
#### 背景

不知道从什么时候开始，git clone变得如此的慢，所以很多时候 git clone 都会出问题，最近看到有两个方案。

#### 方案1：通过gitee或者coding先把要克隆的仓库从github中引入

- 优点：gitee或者coding国内的服务器，git clone非常快
- 缺点：这样多走一步，十分麻烦，不大推荐

#### 方案2：则是git clone地址多加一点改变，譬如

https://github.com/Zenquan/quickgitclone.git -> https://github.com.cnpmjs.org/Zenquan/quickgitclone.git

- 优点：亲测！速度真的很快。
- 缺点：但是每次都要去这么拼凑一下十分麻烦，所以就写了这样一个简单的插件来解决这个需求
git clone https/github.com.cnpmjs.org.git
#### 需求
- [x] https://github.com/Zenquan/quickgitclone ->  https://github.com.cnpmjs.org/Zenquan/quickgitclone.git
- [x] https://github.com/Zenquan/quickgitclone/blob/master/content-script.js ->  https://github.com.cnpmjs.org/Zenquan/quickgitclone.git
- [x] https://github.com/Zenquan/quickgitclone/tree/master/img ->  https://github.com.cnpmjs.org/Zenquan/quickgitclone.git
- [x] 点击按钮复制快速克隆的操作
### github1s
#### 需求
- [x] 增加github1s的点击跳转

### 使用说明

1.克隆到本地

```bash
git clone https://github.com.cnpmjs.org/Zenquan/quickgitclone.git
```

2. 在浏览器里中

<img src="./img/step1.png" style="width: 400px;"/><br><br><br>
<img src="./img/step23.png" style="width: 400px;"/><br><br><br>
<img src="./img/step4.png" style="width: 400px;"/><br><br><br>

3. 最后的效果

<img src="./img/result.png" style="width: 400px;"/><br><br><br>


### 备注说明
克隆下来的目录的.git/config中的

```bash
[remote "origin"]
	url = https://github.com.cnpmjs.org/Zenquan/githubHelper.git
```
url为`https://github.com.cnpmjs.org`的服务链接，并不是`https://github.com`， 所以需要`git push`时，重新登录github账号，或者会push失败，所以解决方案是把以上`https://github.com.cnpmjs.org`改为`https://github.com`。