<template>
	<view class="tag" 
	:style="`font-size:${props.fontSize}rpx;color:${props.color};
	background-color:${props.bgcolor};padding:${props.padding};border-radius:${props.borderRadius}rpx;`">
		<slot>tag</slot>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		onBeforeMount,
		defineProps
	} from 'vue'
	const props=defineProps({
		fontSize:{
			type: Number,
			default: 20
		},
		color:{
			type: String,
			default: '#fff'
		},
		bgcolor:{
			type: String,
			default: '#ff0000'
		},
		padding:{
			type: String,
			default: '5rpx 15rpx'
		},
		borderRadius:{
			type: String,
			default: '5'
		},
	})
</script>

<style lang="scss" scoped>
	.tag {
		display: inline-block;
		text-align: center;
	}
</style>