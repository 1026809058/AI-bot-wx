<template>
	<!-- 左侧菜单 -->
	<up-popup :show="leftMenuShow" mode="left" @close="leftMenuClose" @open="leftMenuOpen">
		<view class="leftMenu">
			<text>人生若只如初见，何事秋风悲画扇</text>
		</view>
	</up-popup>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		onBeforeMount,
	} from 'vue'
	
	let leftMenuShow = ref(false)
	// 打开左侧菜单
	const leftMenuOpen = (() => {
		leftMenuShow.value = true
	})
	// 关闭左侧菜单
	const leftMenuClose = (() => {
		leftMenuShow.value = false
	})
	defineExpose({leftMenuOpen,leftMenuClose})
</script>

<style lang="scss" scoped>
</style>