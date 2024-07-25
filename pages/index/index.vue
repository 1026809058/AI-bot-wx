<template>
	<view class="home">
		<!-- 顶部导航 -->
		<searchNavbar :hintList="hintList" @smartbox="smartbox" @recommend="recommend" @searchBtn="searchBtn">
			<template #left>
				<up-icon name="list" color="#3e3e3e" size="55" @click="leftMenuBtn"></up-icon>
			</template>
		</searchNavbar>
		<!-- 左侧菜单 -->
		<leftMenu ref="leftMenuRef"></leftMenu>
		<view>
			<scroll-view scroll-y="true">
				<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
				<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
				<view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
			</scroll-view>
		</view>
		<TabBar selected="0"></TabBar>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onBeforeMount,
		getCurrentInstance
	} from 'vue'
	import {
		searchSuggest,
		searchMultimatch,
		search
	} from '@/api/music.js'
	const searchValue = ref('');

	const searchChange = (e) => {
		console.log('change', e);
	}
	let hintList = ref([])
	const smartbox = (keywords) => {
		if (!keywords) {
			hintList.value = []
			return false
		}
		searchSuggest({
			keywords,
			type: 'mobile'
		}).then(res => {
			hintList.value = res.allMatch
		})
	}
	const recommend = ((keyword) => {
		uni.navigateTo({
			url: '/pages/index/search/search?keyword=' + keyword
		})
	})
	// 搜索
	const searchBtn = ((keyword) => {
		uni.navigateTo({
			url: '/pages/index/search/search?keyword=' + keyword
		})
	})
	const leftMenuRef = ref();
	// 菜单按钮
	const leftMenuBtn = (() => {
		leftMenuRef.value.leftMenuOpen()
	})
</script>

<style lang="scss" scoped>
	$caidanWidth: 44rpx;

	.home {
		overflow-y: hidden;

		.leftMenu{
			
		}
		.content {
			overflow: hidden;
			height: 800px;
			color: #fff;
			background-color: #000;
		}
	}
</style>