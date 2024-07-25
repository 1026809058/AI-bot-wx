import {
	defineStore
} from 'pinia';

export const useTabBarStore = defineStore('tabbar', {
	state: () => {
		return {
			selected:0,
			// 未选择颜色
			color: '#000',
			// 选中的颜色
			selectedColor: '#ffb2b2',
			list: [{
					id: 0,
					"pagePath": "/pages/index/index",
					"iconPath": "icon-wangyiyunyinle",
					 selectedIconPath: "icon-wangyiyunyinle",
					"text": "发现"
				},
				{
					id: 1,
					"pagePath": "/pages/music/index",
					"iconPath": "icon-a-erji2",
					selectedIconPath:"icon-a-erji2",
					"text": "音乐"
				},
				{
					id: 2,
					"pagePath": "/pages/user/index",
					"iconPath": "icon-yinle",
					selectedIconPath:"icon-yinle",
					"text": "我的"
				}
			]

		}
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {},
});