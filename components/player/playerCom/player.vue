<template>
	<view class="player">
		<view class="disc xy-center">
			<view class="base xy-center" :class="{'play-begin':!playerStore.paused ,'play-end':playerStore.paused}">
				<image :src="'/static/img/vinyl_record.png'" mode="widthFix"></image>
				<image :src="mapGet(playerStore,'curMusicInfo.picUrl')" mode="widthFix" class="picUrl"></image>
			</view>
		</view>
		<view class="info">
			<text>{{mapGet(playerStore,'curMusicInfo.name')}}</text>
		</view>
		<view @touchmove.stop='stopTouchMove'>
			<view class="progress">
				<up-slider v-model="movableX" step="1" :max="parseInt(audioManager.duration||0)" activeColor="#03090f"
					inactiveColor="#c0c4cc" @change="movableChange"></up-slider>
				<view class="time">
					<text>{{conTime(playerStore.currentTime) }}</text>
					<text>{{conTime(audioManager.duration) }}</text>
				</view>
			</view>
			<view class="cut">
				<view class="cut_1 xy-center">
					<image class="svg" :src="cut1Svg" @click="modeBtn"></image>
				</view>
				<view class="cut_2">
					<image class="svg" :src="'/static/svg/shangyiqu.svg'" @click="prevSongBtn"></image>
					<image class="svg-zanting" :src="cut2Svg" @click="stopBtn"></image>
					<image class="svg" :src="'/static/svg/xiayiqu.svg'" @click="nextSongBtn"></image>

				</view>
				<view class="cut_3 xy-center">
					<image class="svg" :src="'/static/svg/bofangliebiao.svg'" @click="openList"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		computed
	} from 'vue'

	import {
		getPlayer,
		usePlayerStore
	} from '@/stores/player.js'
	import {
		useControlStore
	} from '@/stores/control.js'
	import {
		debounce,
		formatSeconds,
		mapGet
	} from '@/common';

	let audioManager = getPlayer()
	let playerStore = usePlayerStore()
	let cut1Svg = computed(() => {
		let cut1SvgList = {
			single: '/static/svg/danquxunhuan.svg',
			list: '/static/svg/xunhuanbofang.svg',
			random: '/static/svg/suiji.svg',
		}
		return cut1SvgList[playerStore.loopType]
	})
	let cut2Svg = computed(() => {
		if (!playerStore.paused) return '/static/svg/zanting.svg'
		return '/static/svg/bofang.svg'
	})
	const stopBtn = (() => {
		playerStore.stopPlay()
	})
	const modeBtn = (() => {
		playerStore.modeCut()
	})
	const prevSongBtn = (() => {
		playerStore.prevSong()
	})
	const nextSongBtn = (() => {
		playerStore.nextSong()
	})

	const movableX = computed({
		get() {
			return parseInt(playerStore.currentTime)
		},
		set(val) {
			audioManager.seek(val)
		}

	})
	const movableChange = ((e) => {
		// movableX.value=e.detail.x
		console.log(e, 111);
	})
	// 禁止滑动
	const stopTouchMove = (() => true)
	// 时间转换
	const conTime = ((val) => {
		if (!val) return '00:00'
		try {
			return formatSeconds(parseInt(val))
		} catch {
			return val
		}

	})

	const controlStore = useControlStore()
	const openList = (() => {
		controlStore.playlistPopup = true
	})
</script>

<style lang="scss" scoped>
	.player {
		height: calc(100% - 250rpx);
		padding: 30rpx;

		.disc {
			height: calc(100% - 80rpx);

			.base {
				width: calc(100% - 150rpx);
				border-radius: 50%;
				background-color: rgba(0, 33, 0, 0.1);
				padding: 10rpx;

				.picUrl {
					position: absolute;
					width: 70%;
					border-radius: 50%;
				}
			}

			.play-begin {
				animation: playing 20s linear infinite;
				-webkit-animation: animal 20s infinite linear;
				animation-fill-mode: forwards;
			}

			//调用该class将会暂停动画效果
			.play-end {
				animation: animal 20s linear infinite;
				-webkit-animation: animal 20s linear infinite;
				animation-play-state: paused;
			}

			@keyframes animal {
				0% {
					transform: rotate(0deg);
					-ms-transform: rotate(0deg);
					-webkit-transform: rotate(0deg);
				}

				100% {
					transform: rotate(360deg);
					-ms-transform: rotate(360deg);
					-webkit-transform: rotate(360deg);
				}
			}
		}

		.info {
			height: 80rpx;
		}

		.progress {
			position: relative;
			height: 100rpx;

			.time {
				display: flex;
				justify-content: space-between;
				color: #000;
				font-size: 20rpx;
				padding: 0 36rpx;
			}
		}

		.cut {
			display: flex;

			.svg {
				width: 50rpx;
				height: 50rpx;
			}

			.cut_1 {
				width: 20%;
			}

			.cut_2 {
				width: 60%;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.svg-zanting {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.cut_3 {
				width: 20%;
			}
		}
	}
</style>