var fs = require('fs')

/**
 * promise这个api主要是用来解决异步回调一步步嵌套的问题，
 * 可以用来做异步操作中的链式回调。
 * 比如 我们要先读取文件a,再读取文件b,在读取文件c,在fs的api中，
 * 读取文件是异步的，并不能保证读取这三个文件的顺序，要想有序，必须
 * 把三个读取操作嵌套起来，而用promise链式编程，解决了这个问题
 */
var file1 = new Promise(function(resolve, reject) {
  fs.readFile('./data/a.txt', 'utf8', function(err, data) {
    if (err) {
      console.log('error')
      reject(err)
    } else {
      console.log('aaaaaaaaaaaaaaa')
      resolve(data)
    }
  })
})

var file2 = new Promise(function(resolve, reject) {
  fs.readFile('./data/b.txt', 'utf8', function(err, data) {
    if (err) {
      reject(err)
    } else {
      console.log('bbbbbbbbbbbbbb')
      resolve(data)
    }
  })
})

var file3 = new Promise(function(resolve, reject) {
  fs.readFile('./data/c.txt', 'utf8', function(err, data) {
    if (err) {
      reject(err)
    } else {
      console.log('ccccccccccccc')
      resolve(data)
    }
  })
})
/**
 *
 * 上面读取文件时，我们定义成了三个变量，因为是异步的，至于哪个文件先读出来，是不确定的，
 * 我们下面代码用promise对他们读取的值输出做一下顺序控制。（如果不定义上面三个变量，
 * 直接把变量还原到下面代码中，三个文件的读取也会是有顺序的[都写在一起一套代码太大了，
 * 不利于看，我给定义成了三个变量，放到了外面，下面代码用来控制输出内容的顺序]）
 * Promise.then()方法中
 *    第一个function是Promise的构造参数的resolve,表示成功时执行的函数
 *    第二个function函数是Promise的构造参数reject，表示失败时的执行函数
 *
 * 如果在then方法中又返回了Promise对象，后面的then中参数还是按照上面的规则，
 * 如果then方法中返回的不是Promise对象，则在下一个then中方法的参数就是上一个then的return值
 */

file1
  .then(
    function(data) {
      console.log(data)
      return file2
    },
    function(err) {
      console('error', err)
    }
  )
  .then(function(data) {
    console.log(data)
    return file3
  })
  .then(function(data) {
    console.log(data)
    return 'abcde'
  })
  .then(function(data) {
    console.log(data)
  })
