<template>
	<searchNavbar :searchBtnShow="false" :hintList="hintList" @smartbox="smartbox" @recommend="recommend"
		@searchBtn="searchBtn" @leftClick="leftClick">
		<template #left>
			<up-icon name="arrow-left" color="#2979ff" size="28"></up-icon>
		</template>
	</searchNavbar>
	<view class="list-h">
		<up-tabs :current="tabCurrent" :list="tabsList" @click="click"></up-tabs>
	</view>
	<songsList :musicList="musicList"></songsList>
</template>

<script setup>
	import {
		ref,
		reactive,
		toRaw,
		onBeforeMount,
	} from 'vue'
	import {
		useDicStore
	} from '@/stores/dictionaries.js';
	import {
		searchSuggest,
		searchMultimatch,
		search
	} from '@/api/music.js'
	// 字典
	const dicStore = useDicStore()
	let tabCurrent = ref(0)
	let hintList = ref([])
	const tabsList = toRaw(dicStore.list);
	console.log(tabsList);
	const smartbox = (keywords) => {
		if (!keywords) {
			hintList.value = []
			return false
		}
		searchSuggest({
			keywords,
			type: 'mobile'
		}).then(res => {
			console.log(res);

			// let list =[]
			//  res.order.forEach((key) => {
			// 	if(res[key].length||res[key].length>0){
			// 		let mapA=res[key].map(item=>{
			// 			return {typeName:dic.keywordsType[key]||'',typeKey:key,...item}
			// 		})
			// 		list.push(...mapA)
			// 	}
			// })
			hintList.value = res.allMatch
		})
	}
	// 返回
	const leftClick = ((keyword) => {
		uni.navigateBack({
			delta: 1,
		});
	})
	let searchParams = reactive({
		pag: 1,
		limit: 30,
		type: 1
	})
	let musicList = ref([])
	// 搜索
	const searchBtn = ((keyword) => {
		let params = {
			keywords: keyword,
			offset: (searchParams.pag - 1) * searchParams.limit,
			limit: searchParams.limit,
			type: searchParams.type
		}
		search(params).then(res => {
			musicList.value = res[tabsList[tabCurrent.value].code]
			console.log(musicList.value);
		})
	})
</script>

<style lang="scss" scoped>
	.list-h {
		margin: 10rpx;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}

</style>