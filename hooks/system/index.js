import {
	ref,
	reactive,
	onBeforeMount,
} from 'vue'

function useSystem() {
	const app = getApp()
	// 状态栏高度
	const status = ref(0)
	// 内容高度
	const navHeight = ref(0)
	onBeforeMount(() => {
		setNavSize()
	})
	// 获取胶囊的位置
	const menu = reactive(app.globalData.utils.menuInfo())
	// 计算状态栏高度
	const setNavSize = async () => {
		const {
			system,
			statusBarHeight
		} = app.globalData.utils.systemInfo()
		status.value = statusBarHeight * 2 //rpx需要乘2
		const isiOS = system.indexOf('iOS ') > -1
		// 状态栏ios默认44，安卓默认48
		if (!isiOS) {
			navHeight.value = 96
		} else {
			navHeight.value = 88
		}
		console.log(system, statusBarHeight);
	}
	return {
		status,
		navHeight,
		menu
	}
}
export default useSystem