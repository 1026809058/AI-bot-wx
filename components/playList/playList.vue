<template>
	<up-popup :show="showPop" mode="bottom" @close="close" @open="open" :duration="200" :round="20">
		<view class="popup">
			<up-list @scrolltolower="scrolltolower">
				<up-list-item v-for="(item, index) in playerStore.playlists" :key="item.id"
				class="list-item"
					:class="{active:playerStore.playIndex===index&&playerStore.playlists.length>0}"
					>
					<up-cell @click="playMisic(item, index)" :border="false">
						<template #title>
							<text class="title">
								{{item.name}}
							</text>
							<text class="artists">
								-
								{{arrObjGet(item.artists,'name','/')}}
							</text>
						</template>
						<template #right-icon>
							<up-icon name="close" size="28"  @click.self="delMusic(index)"></up-icon>
						</template>
					</up-cell>
				</up-list-item>
			</up-list>
		</view>
	</up-popup>
</template>

<script setup>
	import {
		computed,
		ref
	} from 'vue'
	import {
		useControlStore
	} from '@/stores/control.js'
	import {
		getPlayer,
		usePlayerStore
	} from '@/stores/player.js'
	import {
		mapGet,
		arrObjGet
	} from '@/common';

	const controlStore = useControlStore()

	let showPop = computed(() => {
		return controlStore.playlistPopup
	})
	const open = () => {
		controlStore.playlistPopup = true
	}

	const close = () => {
		controlStore.playlistPopup = false
	}
	const playerStore = usePlayerStore()
	// 切换播放
	const playMisic=((item, index)=>{
		if(index===playerStore.playIndex) return
		playerStore.playIndex=index
		playerStore.songUrlPlay()
	})
	// 删除
	const delMusic=((index)=>{
		playerStore.delMusic(index)
	})
</script>

<style lang="scss" scoped>
	.popup {
		margin: 20rpx;
		height: 70vh;
		.list-item{
			&:active{
			box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
			}
		}
		.active {
			box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
			color: #2f9909;
		}

		.title {
			font-size: 26rpx;

		}

		.artists {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			line-height: 100%;
			font-size: 22rpx;
			color: #9a9a9a;
		}
	}
</style>