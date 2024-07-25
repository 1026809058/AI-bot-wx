<template>
	<!--  外部Div  -->
	<view class="tab-bar">
		<!--  循环每个 item 菜单 -->
		<view v-for="(item,index) in tabBarList" :key="item.id"
			:class="{'tab-bar-item': true,currentTar: selected == index}" @click="switchTab(item, index)">
			<view class="tab_text" :style="{color: selected == index ? TabBarStore.selectedColor : TabBarStore.color}">
				<iconFont v-if="item.selectedIconPath||item.iconPath" color="rgb(234,62,60)"  :icon="selected == index ? item.selectedIconPath : item.iconPath" class="tab_img" ></iconFont>
				<view>{{ item.text }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		storeToRefs
	} from 'pinia';
	import {
		useTabBarStore
	} from '@/stores/tabbar.js'
	import {
		toRaw
	} from 'vue'
	// 子组件传递参数
	const props = defineProps({
	  selected: {
	    type: Number,
	    default: 0
	  }
	})
	const TabBarStore = useTabBarStore()
	const tabBarList = toRaw(TabBarStore.list)
	let selected =props.selected
	let switchTab = ((item,index) => {
		let url = item.pagePath;
		uni.switchTab({
			url
		})
	})
</script>

<style lang="scss" scoped>
	// 外部装修
	.tab-bar {
		position: fixed;
		bottom: 25rpx;
		left: 15rpx;
		right: 15rpx;
		height: 100rpx;
		background: white;
		padding: 20rpx;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 15px rgba(165, 168, 171, 0.83) !important;

		// 当前点击的
		.currentTar {
			border-radius: 15rpx;
			box-shadow: 0 0 15px #D7D7D7FF !important;
			transition: all 0.2s ease-in-out;
		}

		// 给每个 item 设置样式
		.tab-bar-item {
			//flex: 0.5;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 150rpx;
			padding: 15rpx;
			background-color: transparent;
			transition: all 0.5s ease-in-out;
			margin: auto;

			// 限制每个icon的大小
			.tab_img {
			}

			// 限制文字大小
			.tab_text {
				font-size: 20rpx;
				margin-top: 9rpx;
				flex: 1;
			}
		}
	}
</style>