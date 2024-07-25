<template>
	<view class="music">
		<up-navbar :placeholder="true" @leftClick="leftClick" leftIcon="" >
			<template #center>
				音乐
			</template>
		</up-navbar>
		<view class="player" :style="`height:calc(100% - ${navHeight+status+180}rpx)`">
			<player></player>
		</view>
		<TabBar selected="1"></TabBar>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		onBeforeMount,
	} from 'vue'
	import useSystem from '@/hooks/system'
	// 系统信息
	const {
		status,
		navHeight,
		menu
	} = useSystem()
</script>

<style lang="scss" scoped>
	.music {
		height:100vh;
		.player{
		}
	}
</style>