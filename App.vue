<script>
	import utils from './common/utils'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			// utils: utils
		},
		beforeDestroy:function() {
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-plus/index.scss";
	// 公共样式
	@import '@/static/styles/index.scss';
	@import '@/static/iconfont/iconfont.css';
	/*每个页面公共css */
</style>