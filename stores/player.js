import {
	defineStore
} from 'pinia';
import {
	songUrl,
	checkMusic,
	songDetail
} from '@/api/music.js'
import {
	mapGet,
	randomNum,
	throttle,
	arrObjGet
} from '@/common';
let audioManager
export let usePlayerStore = defineStore('player', {
	state: () => {
		return {
			// 播放器实例
			audioManager: null,
			// 是否暂停
			paused: true,
			// single:单曲循环  list:列表循环  random:随机循环
			loopType: 'list',
			// 播放列表
			playlists: [],
			// 正在播放音乐下标
			playIndex: 0,
			// 自动播放
			autoplay: true,
			// 码流
			dataRate: 999000,
			// 当前播放音乐信息
			curMusicInfo: null,
			// 播放位置
			currentTime: 0,
		}
	},
	unistorage: true,
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {

		/**
		 * 获取数组对象值
		 * @param val 对象
		 * @param isImme 是否立即播放
		 * @returns 
		 */
		addPlayList(val, isImme = false) {

			const params = {
				id: val.id
			}
			// 查询版权
			checkMusic(params).then(res => {
				if (res.success) {
					if (this.playlists.length > 0 && val.id === this.playlists[this.playIndex].id)
						return
					let v = this.playlists.findIndex((item) => item.id === val.id)
					if (v > -1) {
						this.playlists.splice(v, 1)
						if (v < this.playIndex) this.playIndex--
					}
					if (isImme) {
						this.playlists.splice(this.playIndex, 0, val)
						this.songUrlPlay()
					} else {
						this.playlists.splice(this.playIndex + 1, 0, val)
					}
					console.log('list---', this.playlists);
				} else {
					reject(res.message)
				}
			})
		},
		delMusic(v) {
				this.playlists.splice(v, 1)
				if (v < this.playIndex){
					this.playIndex-- 
				}else if(v === this.playIndex){
					audioManager.stop()
					this.songUrlPlay()
				} 
		},
		//清空播放列表
		clearPlaylists() {
			this.playlists = []
			this.playIndex = 0
		},
		// 创建音乐播放器
		async createAudio() {
			// 音频
			audioManager = uni.getBackgroundAudioManager ?
				uni.getBackgroundAudioManager() :
				uni.createInnerAudioContext()
			if (this.curMusicInfo) {
				setInfo(this.curMusicInfo)
				audioManager.startTime = this.currentTime
			} else {
				audioManager.title = '音乐';
				audioManager.singer = '暂无';
				audioManager.coverImgUrl = '';
				audioManager.src = 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3';
			}
			//循环播放
			audioManager.loop = this.loopType === 'single'
			// 自动播放
			audioManager.autoplay = false;
			audioManager.stop()
			audioManager.onPlay(() => {
				if (audioManager.src ===
					'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3') audioManager
					.stop()
				console.log('开始播放');
				this.paused = false
			});
			audioManager.onPause(() => {
				console.log('暂停播放');
				this.paused = true
			});
			audioManager.onStop(() => {
				console.log('播放停止');
				this.paused = true
			});
			audioManager.onEnded((res) => {
				console.log('结束');
				switch (this.loopType) {
					case 'list':
						this.nextSong()
						break
					case 'random':
						this.playIndex = randomNum(0, this.playlists.length)

						this.songUrlPlay()
						break
					case 'single':

						this.songUrlPlay()
						break
					default:
				}
			});
			audioManager.onTimeUpdate(
				throttle(() => {
					this.currentTime = audioManager.currentTime
				}, 1000)
			)
			audioManager.onError((res) => {
				console.log(res);
				console.log(res.errCode);
			});
		},
		// 获取播放链接
		getSongUrl() {
			const params = {
				id: this.playlists[this.playIndex].id,
				br: this.dataRate
			}
			return new Promise((reslove, reject) => {
				if (!this.playlists || this.playlists.length === 0) reject('列表暂无歌曲')
				// checkMusic(params).then(res => {
				// 	if (res.success) {
				this.curMusicInfo = {}
				// 获取歌曲详情
				// songDetail({
				// 	ids: params.id
				// }).then(res => {
				// 	this.curMusicInfo.picUrl = mapGet(res, 'songs.al.picUrl')
				// 	this.curMusicInfo.name = res.name
				// })
				// songUrl(params).then(res => {
				// 	reslove(mapGet(res, '[0].url', ''))
				// }).catch((e) => {
				// 	reject('未找到链接')
				// })
				Promise.all([songDetail({
					ids: params.id
				}), songUrl(params)]).then(([detail, url]) => {
					this.curMusicInfo.singer = arrObjGet(mapGet(detail, 'songs[0].ar'), 'name',
						'/')
					this.curMusicInfo.epname = mapGet(detail, 'songs[0].al.name')
					this.curMusicInfo.picUrl = mapGet(detail, 'songs[0].al.picUrl')
					this.curMusicInfo.name = mapGet(detail, 'songs[0].name', '未知')
					this.curMusicInfo.src = mapGet(url, '[0].url', '未知')
					reslove()
				}).catch((e) => {
					reject(e)
				})
				// 	} else {
				// 		reject(res.message)
				// 	}

				// }).catch((e) => {
				// 	reject('e')
				// })
			})

		},
		// 下一曲
		nextSong() {
			if (this.playlists.length < 2) return
			if (this.playIndex < this.playlists.length - 1) {
				this.playIndex++
			} else {
				this.playIndex = 0
			}
			this.songUrlPlay()
		},
		// 上一曲
		prevSong() {
			if (this.playlists.length < 2) return
			if (this.playIndex === 0) {
				this.playIndex = this.playlists.length - 1
			} else {
				this.playIndex--
			}
			this.songUrlPlay()
		},
		// 获取链接后播放
		songUrlPlay() {
			if (!this.paused) audioManager.stop()
			this.getSongUrl().then(res => {
				setInfo(this.curMusicInfo)
			})
		},
		// 暂停、开始播放
		stopPlay() {
			if (this.paused) {
				console.log(this.curMusicInfo, this.playlists);
				this.curMusicInfo && audioManager.src ? audioManager.play() : (this.playlists.length > 0 ? this
					.songUrlPlay() :
					false)
			} else {
				audioManager.pause()
			}
		},
		// 切换播放模式
		modeCut() {
			switch (this.loopType) {
				case 'single':
					this.loopType = 'list'
					break;
				case 'list':
					this.loopType = 'random'
					break;
				case 'random':
					this.loopType = 'single'
					break;
				default:
			}
		}
	},
})
export const getPlayer = () => audioManager

/**
 * @param {string} data: 设置歌曲信息
 */
export const setInfo = (data) => {
	if (audioManager?.src) audioManager.stop()

	if (!!uni.getBackgroundAudioManager) {
		audioManager.title = data.name
		audioManager.singer = data.singer
		audioManager.epname = data.epname
		audioManager.coverImgUrl = data.picUrl
	} else {
		audioManager.obeyMuteSwitch = true
		audioManager.volume = 0.3
		// audioManager.playbackRate = 'playback'
	}
	audioManager.src = data.src
	audioManager.play()
}