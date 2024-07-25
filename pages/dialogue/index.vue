<template>
	<view class="container">
		<dialogue-list class="list"></dialogue-list>
		<dialogue-send class="send"></dialogue-send>
	</view>
	
</template>

<script setup>
	import dialogueList from './components/dialogue-list.vue'
	import dialogueSend from './components/dialogue-send.vue'
	import {
		ref,
	} from 'vue'
</script>

<style lang="scss" scoped>
	.container{
		background-color:rgb(239,240,244);
		.list{
			min-height: calc(100vh - 128rpx);;
		}
		.send{
			width: calc(100% - 20rpx);
			position: fixed;
			bottom: 10px;
		}
	}
</style>