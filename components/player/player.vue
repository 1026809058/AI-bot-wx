<template>
	<swiper :current="currentIndex" class="swiper xy-center" :previous-margin="swiperItem+'rpx'"
		:next-margin="swiperItem+'rpx'" @change="handleChange">
		<swiper-item>
			<view class="item">
				11211111
			</view>
		</swiper-item>
		<swiper-item>
			<view class="item">
				<Player></Player>
			</view>
		</swiper-item>
		<swiper-item>
			<view class="item">
				<Lyric></Lyric>
			</view>
		</swiper-item>
	</swiper>
	<playList></playList>
</template>

<script setup>
	import Player from './playerCom/player.vue';
	import Lyric from './playerCom/lyric.vue';
	import {
		ref,
	} from 'vue'
	let swiperItem = ref(20)
	let currentIndex = ref(1)
</script>

<style lang="scss" scoped>
	.swiper {
		height: 100%;

		.item {
			height: 98%;
			width: 98%;
			margin: auto;
			box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
			border-radius: 30rpx;
		}
	}
</style>