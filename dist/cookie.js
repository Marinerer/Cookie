/*!
 * cookie.js
 * @ desc: 简单轻量级的JS cookie操作库
 * @ version: 1.1.1
 * @ link: https://github.com/mengqing723/cookie
 * @ by: mengqing723@gmail.com
 * @ update: Fri Nov 11 2016 15:08:38 GMT+0800 (中国标准时间)
 */


;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object' && exports) {
		module.exports = factory();
	} else {
		root.cookie = factory();
	}
}(typeof window === 'undefined' ? this : window, function() {
	var getKeys = Object.keys || function (obj) {
		var keys = [], key = '';
		for (key in obj) {
			if (obj.hasOwnProperty(key)) keys.push(key);
		}
		return keys;
	}
	function isPlainObject(value) {
		return !!value && Object.prototype.toString.call(value) === "[object Object]";
	}
	var isArray = Array.isArray || function (value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	}
	function toArray(value) {
		return Array.prototype.slice.call(value);
	}
	
	function timeDiff(time) {
		var timeArr = time.split(':');
		for(var i = 0, len = timeArr.length; i < len; i++) {
			if(timeArr[i].split('')[0] == 0) {
				timeArr[i] = timeArr[i].split('')[1];
			}
		}
		var now = new Date();
		var h = parseInt(timeArr[0]) - now.getHours(),
		m = parseInt(timeArr[1]) - now.getMinutes(),
		s = parseInt(timeArr[2]) - now.getSeconds();
		return (h*60*60 + m*60 + s)*1000;
	}

	function Cookie() {
		if (!(this instanceof Cookie)) {
			return new Cookie();
		}
	}
	Cookie.prototype = {
		
		get: function(name) {
			
			return (name && typeof name === "string") ? this.all()[name] || null : null;
		},
		
		set: function(name, value, options) {
			var opt = isPlainObject(options) ? options : {expires: options},
				expires = opt.expires !== undefined ? opt.expires : '',
				expiresType = typeof expires;

			if(expiresType === 'string' && expires !== '') {
				var regexp = /^([01]\d|2[0-3]):[0-5]\d:([0-5]\d)$/;									
				if(regexp.test(expires)) {
					expires = new Date(+new Date() + timeDiff(expires));							
				} else {
					expires = new Date(expires);													
				}
			} else if(expiresType === 'number') {
				expires = new Date(+new Date() + 1e3 * 60 * 60 * 24 * expires); 					
			}
			if (expires !== "" && "toGMTString" in expires) {
				expires = "; expires=" + expires.toGMTString();
			}

            var path = '; path=' + (opt.path ? opt.path : "/"),										
	            domain = opt.domain ? '; domain=' + opt.domain : '',								
	            secure = opt.secure ? '; secure' : '';												
	        document.cookie = name + "=" + escape(value) + expires + path + domain + secure;		
	    },
		
		remove: function(names) {
			names = isArray(names) ? names : toArray(arguments);
			for (var i = 0, len = names.length; i < len; i++) {
				this.set(names[i], '', -1);
			}
			return names;
		},
		
		clear: function() {
			return this.remove(getKeys(this.all()));
		},
		
		all: function() {
			var result = {};
			if(document.cookie) {
				var cookies = document.cookie.split('; ');
				for(var i = 0, len = cookies.length; i < len; i++) {
					var item = cookies[i].split('=');
					result[unescape(item[0])] = unescape(item[1]);
				}
			}
			return result;
		}
	}

	var cookie = function(name, value, options) {
		var C = Cookie(),
			len = arguments.length;
		if(len === 1 && typeof name === 'string')
			return C.get(name);
		if(len > 1 && name && value)
			return C.set(name, value, options);
		if(value === null)							
			return C.remove(name);
		return C.all();
	}
	for(var k in Cookie.prototype) {
		cookie[k] = Cookie.prototype[k];
	}
	return cookie;
}));



