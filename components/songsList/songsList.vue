<template>
	<view class="list" :style="`height:${height} !important`">
		<view v-for="(item, index) in musicList" :key="item.id" class="list-item" @click="immePlay(item)">
			<view v-if="isPicture" class="picture"></view>
			<view class="item_t">
				<view class="item_t_name">{{item.name}}</view>
				<view class="item_t_artists">歌手：{{arrObjGet(item.artists,'name','/')}}</view>
			</view>
			<view class="item_b">
				<image src="@/static/svg/tianjiayinyue.svg" class="tianj-svg" mode="" @click.stop="addPlayList(item)">
				</image>
				<image src="@/static/svg/gengduo.svg" class="gengduo-svg" mode=""></image>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		ref,
	} from 'vue'
	import {
		usePlayerStore
	} from '@/stores/player.js'
	import {
		mapGet,
		arrObjGet
	} from '@/common';
	const props = defineProps({
		musicList: {
			type: Array,
			default: () => []
		},
		height: {
			type: String,
			default: ''
		},
		isPicture: {
			type: Boolean,
			default: false
		}
	})
	const playerStore = usePlayerStore()
	const immePlay = ((val) => {
		playerStore.addPlayList(val, true)
	})
	const addPlayList = ((val) => {
		playerStore.addPlayList(val)
	})
</script>

<style lang="scss" scoped>
	.list {
		height: calc(100vh - 300rpx);
		overflow-y: auto;
		width: calc(100% - 20rpx);
		padding: 10rpx;

		.list-item {
			width: auto;
			padding: 15rpx;
			margin: 15rpx 0;
			font-size: 22rpx;
			border-radius: 10rpx;
			box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
			color: $uni-color-title;
			display: flex;

			&:active {
				box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
			}

			.picture {}

			.item_t {
				flex: 1;

				.item_t_name {
					font-size: 26rpx;
					line-height: 42rpx;
					color: $uni-color-title;
				}

				.item_t_artists {
					color: #adadad;
				}
			}

			.item_b {
				width: 120rpx;
				position: relative;

				.tianj-svg {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					border-radius: 20rpx;
					padding: 2rpx;
					box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;

					&:active {
						box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
					}
				}

				.gengduo-svg {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>