<template>
	<view class="up-navbar" :class="{'shadow':!searchShow}" :style="`height:${navHeight+status}rpx`">
		<!-- :class="{'navbar-show':searchShow}" 小程序未生效-待解决 -->
		<up-navbar @leftClick="leftClick" leftIcon="" >
			<template #left>
				<slot name="left"></slot>
			</template>
			<template #center>
				<view class="nav-center" :style="`margin-right:${(menu.width||0)*2+50}rpx`">
					<up-search placeholder="" v-model.lazy="searchValue" bgColor="#fff" borderColor="#8a8a8a"
						height="55rpx" searchIconSize="50" :animation="searchBtnShow" :inputStyle="{'font-size':'23rpx'}"
						@focus="open" @blur="close" @change="smartbox" @search="searchBtn"
						@custom="searchBtn"></up-search>
				</view>
			</template>
		</up-navbar>
	</view>
	<view class="search-popup" :class="{'popup-t':searchShow}">
		<up-transition :show="searchShow" mode="fade">
			<view class="list">
				<view v-for="(item, index) in hintList" :key="index" class="list-item" @click="recommend(item.keyword)">
					{{item.keyword}}
				</view>
			</view>
		</up-transition>

	</view>
</template>

<script setup>
	import {
		ref,
		onBeforeMount,
	} from 'vue'
	import {onLoad} from "@dcloudio/uni-app"
	import useSystem from '@/hooks/system'
	import {
		useDicStore
	} from '@/stores/dictionaries.js';
	// 系统信息
	const {status,navHeight,menu} =useSystem()
	// 字典
	const dic = useDicStore()
	const emits = defineEmits(['recommend', 'smartbox', 'leftClick', 'searchBtn'])
	const props = defineProps({
		hintList: {
			type: Array,
			default: () => []
		},
		searchBtnShow: {
			type: Boolean,
			default: true
		},
	})
	let searchValue = ref('');
	const searchChange = (e) => {
		console.log('change', e);
	}
	// 推荐列表开关  
	let searchShow = ref(false);
	const open = () => {
		searchShow.value = true;
	}
	// 关闭推荐列表
	const close = (time = 600) => {
		setTimeout(() => {
			searchShow.value = false;
		}, time)
	}
	// 输入框变化
	const smartbox = (keywords) => {
		emits('smartbox', keywords)
	}

	// nav左侧
	const leftClick = (keywords) => {
		emits('leftClick')
	}

	// 点击推荐列表
	const recommend = ((keyword) => {
		searchValue.value = keyword || searchValue.value
		emits('recommend', searchValue.value)
	})
	// 搜索
	const searchBtn = (() => {
		emits('searchBtn', searchValue.value)
	})
	
	onLoad((options)=>{
		searchValue.value=options.keyword||''
		if(searchValue.value) searchBtn()
	})
</script>
<style lang="scss">
	::v-deep .navbar-show {
		 .nav-center {
			margin-left: 10rpx !important;
			transition: all 0.3s; 
		}

		.u-navbar__content__left {
			transform: translateX(-100%) !important;
			transition: all 0.3s; 
		}

	}
	
</style>
<script>
export default {
    options: { styleIsolation: "shared" },
};
</script>
<style lang="scss" scoped>
	$caidanWidth: 44rpx;


	.shadow {
		box-shadow: 0 4px 15px rgba(165, 168, 171, 0.83);
		transition: all 0.3s;
	}

	.up-navbar {
		.nav-center {
			width: 100%;
			margin-left: $caidanWidth + 52rpx;
		}

		.svg-caidan {
			width: $caidanWidth;
			height: 100%;
		}

	}

	.search-popup {
		position: fixed;
		background-color: rgba(255, 255, 255, 1);
		width: 100%;
		height: 0;
		border-radius: 0 0 10rpx 10rpx;
		box-shadow: 0 4px 14px -5px rgba(165, 168, 171, 0.83);
		z-index: 9;
		transition: height 0.3s;

		.list {
			width: calc(100% - 20rpx);
			padding: 10rpx;
			display: none;

			.list-item {
				width: auto;
				padding:20rpx 15rpx;
				margin: 15rpx 0;
				font-size: 26rpx;
				line-height: 22rpx;
				border-radius: 5rpx;
				box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
				color: #3e3e3e;
			}
		}

	}

	.popup-t {
		height: 50vh;
		// padding: 10rpx;
		overflow-y: scroll;
		transition: height 0.3s;

		.list {
			display: block;
		}
	}
</style>