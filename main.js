import App from './App'
import uviewPlus from '@/uni_modules/uview-plus'
import * as Pinia from 'pinia';
// pinia持久化插件
import {
	createUnistorage
} from "./uni_modules/pinia-plugin-unistorage";
import {
	createSSRApp
} from 'vue'


export function createApp() {
	const app = createSSRApp(App)
	const store = Pinia.createPinia();
	// 持久化
	store.use(createUnistorage());
	app.use(store);
	app.use(uviewPlus)
	app.config.globalProperties.$player = uni.createInnerAudioContext();
	return {
		app,
		Pinia
	}
}