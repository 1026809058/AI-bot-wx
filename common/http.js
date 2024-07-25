import {
	baseURL,
	successCode
} from '@/config/base.js'; //导入接口的前缀地址
import {
	mapGet
} from './index';

export const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType === 'none') {
					uni.showToast({
						title: '暂无网络',
						icon: 'error',
						duration: 2000
					});
					reject('无网络连接')
				}
			}
		});
		uni.request({
			url: baseURL + options.url, //接口地址：前缀+方法中传入的地址
			method: options.method || 'GET', //请求方法：传入的方法或者默认是“GET”
			data: options.data || {}, //传递参数：传入的参数或者默认传递空集合
			headers: {
				'content-type': 'application/json',
				'Authorization': '' //自定义请求头信息
			},
			success: (res) => {
				//返回的数据（不固定，看后端接口，这里是做了一个判断，如果不为true，用uni.showToast方法提示获取数据失败)
				// if (res.data.success != true) {
				// 	return uni.showToast({
				// 		title: '获取数据失败',
				// 		icon: 'none'
				// 	})
				// }
				// 如果不满足上述判断就输出数据
				if (res.data || successCode.indexOf(mapGet(res, 'data.code')) > -1) {
					resolve(mapGet(res, 'data.result') || mapGet(res, 'data.data', null) || res
						.data)
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'fail',
						duration: 2000
					});
					reject(res)
				}
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				uni.showToast({
					title: '请求错误',
					icon: 'fail',
					duration: 2000
				});
				reject(err)
			}
		})
	})
}