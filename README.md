
# 关于 cookie.js

一个简单、轻量级的JavaScript cookie操作库


# cookie 简介

cookie 是存储于客户端中的变量。当用户访问网站后创建cookie文件，用于存储浏览信息，例如个人资料信息等。这些信息存放在客户端的计算机中，用于客户端计算机与服务器之间传递信息。  

我们可以通过 document.cookie 来读取或设置这些信息。  

cookie 是有大小限制的，每个 cookie 所存放的数据不能超过4kb，如果 cookie 字符串的长度超过4kb，则该属性将返回空字符串。  

cookie 是存在 有效期的。在默认情况下，一个 cookie 的生命周期就是在浏览器关闭的时候结束。如果想要 cookie 能在浏览器关掉之后还可以使用，就必须要为该 cookie 设置有效期，也就是 cookie 的失效日期。 


# Cookie 属性

除名字与值外，每个cookie有四个可选属性：

key | value | default value
---|---|---|---
`expires` | 过期时间，即指定cookie的生命期。值为 某个时间。默认情况下cookie是暂时的，浏览器关闭就失效。如果想让cookie的存在期限超过当前浏览器会话时间，就必须使用这个属性。当过了到期日期时，浏览器就可以删除cookie文件，没有任何影响。 | 浏览器关闭过期
`domain` | 有效域。值为 域名。如果把path设置为`"/"`，把domain设为".baidu.com"，那么 A.baidu.com和B.baidu.com 的所有网页都能够访问此cookie。 | 本域
`path` | 路径。它指定了与cookie关联在一起的网页。默认是在和当前网页同一目录的网页中有效。如果把`path`设置为`"/"`，那么它对该网站的所有网页都可见了。 | `/`
`secure` | 安全。指定cookie的值通过网络如何在用户和WEB服务器之间传递。这个属性的值或者是“`secure`”，或者为空。缺省情况下，该属性为空，也就是使用不安全的HTTP连接传递数据。如果一个 cookie 标记为`secure`，那么，它与WEB服务器之间就通过HTTPS或者其它安全协议传递数据。不过，设置了`secure`属性不代表其他人不能看到你机器本地保存的cookie。换句话说，把cookie设置为`secure`，只保证cookie与WEB服务器之间的数据传输过程加密，而保存在本地的cookie文件并不加密。如果想让本地cookie也加密，得自己加密数据。 | `false`


# 如何使用

```javascript
/**
 * 两种写法效果一样
 * @name 		cookie 名称
 * @value 		cookie 值
 * @options 	设置 cookie 过期时间、路径、域、安全
 */
cookie(name, value, options)
cookie.set(name, value, options)

cookie.set('name', 'john', {
	expires: 7,
	domain: '',
	path: '/',
	secure: false
})
```


### 设置 cookie

**1. 设置 cookie 过期时间为 7天**

```javascript
// 写法1
cookie('name', '小明', 7);
cookie('name', '小明', {expires: 7});

// 写法2
cookie.set('name', '小明', 7);
cookie.set('name', '小明', {expires: 7});
```

**2. 设置 cookie 过期时间为 凌晨00:00:00 过期**

> 时间格式一定为：  `hh:mm:ss`

```javascript
cookie('name', '小明', '23:59:59');

// 或

cookie.set('name', '小明', '23:59:59');
```

**3. 设置 cookie 过期时间为 2018/10/12 00:00:00 过期**

> 过期时间为 日期格式 : YYYY-MM-dd hh:mm:ss

```javascript
cookie('name', '小明', '2018/10/12');

// 或

cookie.set('name', '小明', '2018/10/12');
```

### 获取 cookie

```javascript
cookie()
// 或
cookie.all()
// 输出所有 cookie


cookie('name')
// 或
cookie.get('name')
// 都输出 '小明'
```


### 删除 cookie

```javascript
cookie.clear() 		// 清空cookie

cookie('name', null) 	// 删除cookie 'name'
cookie.remove('name') 	// 删除cookie 'name'

cookie.remove(['name', 'age']) 		// 删除cookie  'name','age'
```





---

### 感谢

由于每次写cookie 都要去找下代码，然后在修改，所以就参考了一些cookie，写了适合自己的cookie库。

其他库
[florian](https://github.com/florian/cookie.js) 、 [js-cookie](https://github.com/js-cookie/js-cookie) 、 [jaywcjlove](https://github.com/jaywcjlove/cookie.js) 、 [ScottHamper](https://github.com/ScottHamper/Cookies)


# Bug tracker

Have a bug? Please create an issue on GitHub at [issues](https://github.com/mengqing723/jQuery-scrollFix/issues)