import {
	defineStore
} from 'pinia';

export const useControlStore = defineStore('control', {
	state: () => {
		return {
			playlistPopup: false
		}
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {},
});