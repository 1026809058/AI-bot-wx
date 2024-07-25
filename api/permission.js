import {
	request
} from '@/common/http.js'
 
export function getToken (params) {  //登录
	return request({
		url:'permission/oauth2/token',
		method:'post',
		data:params
	})
}