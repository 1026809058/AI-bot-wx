/**
 * 获取任意对象的任意字段值
 * @param obj 对象
 * @param field 字段路径
 * @param def 默认值
 * @returns {*|string}
 */
export function mapGet(obj, field = "", def) {
	const eq = (v, v1) => {
		if (v === v1) return true;
		return v && v.toString() === v1;
	};
	const keyGet = (obj, key) => {
		// 非数组 对象时返回undefined
		let result;
		// key为空时 返回原对象
		if (key === "") result = obj;
		// 存在数组filter时 返回数组
		else if (key.includes("=")) {
			if (!Array.isArray(obj)) return def;
			const [k, v] = key.split("=");
			result = obj.filter((el) => eq(el[k], v));
		}
		// 数组时map后返回数组
		else if (Array.isArray(obj)) {
			// key是数字时 返回数组中对应下标的值
			if (/^\d+$/.test(key)) {
				result = obj[key];
			}
			// key是字符串时 返回数组中所有对象的对应key的值
			else {
				result = obj.map((v) => keyGet(v, key));
			}
		}
		// 对象取值返回
		else if (typeof obj === "object" && obj !== null) {
			result = obj[key];
		}
		return result;
	};
	const get = (obj, field, def) => {
		let key = "";
		for (let char of field) {
			if (char === "." || char === "]" || char === "[") {
				obj = keyGet(obj, key);
				if (obj === undefined) break;
				key = "";
			} else {
				key = key + char;
			}
		}
		let result = keyGet(obj, key);
		return result === undefined ? def : result;
	};
	// 有+时表示将多个字段拼接后返回
	const fs = field.split("+");
	let result;
	for (let f of fs) {
		// ''包裹的字符串直接返回
		if (f.startsWith("'") && f.endsWith("'")) {
			result = (result || "") + f.substring(1, f.length - 1);
			continue;
		}
		const r = get(obj, f, undefined);
		if (r !== undefined) {
			if (typeof r === "object") {
				return r;
			}
			if (fs.length > 1) result = (result || "") + r;
			else result = r;
		}
	}
	return result === undefined ? def : result;
}

/**
 * @desc 函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
	let timeout, args, context, timestamp, result
	const later = function() {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp

		// 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function(...args) {
		context = this
		timestamp = +new Date()
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}

		return result
	}
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 使用表时间戳，在时间段开始的时候触发 2 使用表定时器，在时间段结束的时候触发
 */
export const throttle = (func, wait = 1000, type = 1) => {
	let previous = 0
	let timeout
	return function() {
		const context = this
		const args = arguments
		if (type === 1) {
			const now = Date.now()

			if (now - previous > wait) {
				func.apply(context, args)
				previous = now
			}
		} else if (type === 2) {
			if (!timeout) {
				timeout = setTimeout(() => {
					timeout = null
					func.apply(context, args)
				}, wait)
			}
		}
	}
}

/**
 * 深拷贝
 * @param target 对象
 * @returns {*|string}
 */
export function deepClone(target) {
	// WeakMap作为记录对象Hash表（用于防止循环引用）
	const map = new WeakMap()

	// 判断是否为object类型的辅助函数，减少重复代码
	function isObject(target) {
		return (typeof target === 'object' && target) || typeof target === 'function'
	}

	function clone(data) {

		// 基础类型直接返回值
		if (!isObject(data)) {
			return data
		}

		// 日期或者正则对象则直接构造一个新的对象返回
		if ([Date, RegExp].includes(data.constructor)) {
			return new data.constructor(data)
		}

		// 处理函数对象
		if (typeof data === 'function') {
			return new Function('return ' + data.toString())()
		}

		// 如果该对象已存在，则直接返回该对象
		const exist = map.get(data)
		if (exist) {
			return exist
		}

		// 处理Map对象
		if (data instanceof Map) {
			const result = new Map()
			map.set(data, result)
			data.forEach((val, key) => {
				// 注意：map中的值为object的话也得深拷贝
				if (isObject(val)) {
					result.set(key, clone(val))
				} else {
					result.set(key, val)
				}
			})
			return result
		}

		// 处理Set对象
		if (data instanceof Set) {
			const result = new Set()
			map.set(data, result)
			data.forEach(val => {
				// 注意：set中的值为object的话也得深拷贝
				if (isObject(val)) {
					result.add(clone(val))
				} else {
					result.add(val)
				}
			})
			return result
		}

		// 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
		const keys = Reflect.ownKeys(data)
		// 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
		const allDesc = Object.getOwnPropertyDescriptors(data)
		// 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
		const result = Object.create(Object.getPrototypeOf(data), allDesc)

		// 新对象加入到map中，进行记录
		map.set(data, result)

		// Object.create()是浅拷贝，所以要判断并递归执行深拷贝
		keys.forEach(key => {
			const val = data[key]
			if (isObject(val)) {
				// 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
				result[key] = clone(val)
			} else {
				result[key] = val
			}
		})
		return result
	}

	return clone(target)
}

/**
 * 获取数组对象值
 * @param arr 原数组 array
 * @param key 获取值的key string
 * @param separator 分隔符，不传返回数组
 * @returns {*|string}
 */
export function arrObjGet(arr, key, separator) {
	if (!Array.isArray(arr)) return arr
	if (arr.length > 0) {
		let newArr = arr.map((item) => mapGet(item, key, ''))
		if (typeof separator === 'undefined') {
			return newArr
		} else {
			return newArr.join(separator)
		}
	}
	return ''
}

/**
 * 生成从minNum到maxNum的随机数
 * @param {Number} minNum 最小值 0
 * @param {Number} maxNum 最大值 2^32-1
 * @returns
 */
export function randomNum(minNum = 0, maxNum = 0xefffffff) {
	return parseInt(Math.random() * maxNum + minNum)
}

/**
 * 秒转换为时分秒 补0
 * @param {Number} value
 * @returns
 */
export function formatSeconds(value) {
	let result = parseInt(value);
	let h = Math.floor(result / 3600) <
		10 ?
		"0" + Math.floor(result / 3600) :
		Math.floor(result / 3600);
	let m = Math.floor((result / 60) % 60) <
		10 ?
		"0" + Math.floor((result / 60) % 60) :
		Math.floor((result / 60) % 60);
	let s = Math.floor(result % 60) <
		10 ?
		"0" + Math.floor(result % 60) :
		Math.floor(result % 60);

	let res = "";
	if (h !== "00") res += `${h}:`;
	res += `${m}:`;
	res += `${s}`;

	return res;
}