import {
	defineStore
} from 'pinia';

export const useDicStore = defineStore('dictionaries', {
	state: () => {
		return {
			// 关键词类型
			keywordsType: {
				songs: '单曲',
				album: '专辑',
				playlists: '歌单',
				artists: '歌手',
			},
			// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
			list: [{
					name: '单曲',
					type: 1,
					code: 'songs'
				},
				{
					name: '歌单',
					type: 1000,
					code: 'song'
				},
				{
					name: '歌手',
					type: 100,
					code: 'song'
				},
				{
					name: '专辑',
					type: 100,
					code: 'album'
				},
				{
					name: '歌词',
					type: 1006,
					code: 'song'
				},
				{
					name: 'MV',
					type: 1004,
					code: 'song'
				}
			]
		}
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {},
});