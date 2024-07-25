<template>
	<text class="icon iconfont" :class="icon" :style="`font-size:${fontSize};color:${color}`"></text>
</template>

<script setup>
	import {
		computed,
		ref,
	} from 'vue'
	const props = defineProps({
		icon: String,
		size: {
			type: [String, Number],
			default: 28
		},
		color: String
	})
	const fontSize = computed(() => {
		if (typeof props.size === 'Number') {
			return props.size + 'rpx'
		}
		return props.size
	})
</script>

<style lang="scss" scoped>
</style>