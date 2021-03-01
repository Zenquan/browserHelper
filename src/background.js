var BgPageInstance = (function () {
	const contextMenus = (title, baseUrl) => {
		chrome.contextMenus.create({
			type: 'checkbox',
			title, // %s表示选中的文字
			contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
			onclick: (params) => {
				// 注意不能使用location.href，因为location是属于background的window对象
				chrome.tabs.create({url: `${baseUrl}encodeURI(params.selectionText)`});
			}
		});
	}
	
	let init = () => {
		// 使用谷歌搜索
		contextMenus('使用谷歌搜索：%s', 'https://www.google.com/search?q=');
		// 使用必应搜索
		contextMenus('使用必应搜索：%s', 'https://www.bing.com/search?q=');
		// 使用百度搜索
		contextMenus('使用百度搜索：%s', 'https://www.baidu.com/s?ie=utf-8&wd=');
	}

	return {
		init
	}
})();

BgPageInstance.init();