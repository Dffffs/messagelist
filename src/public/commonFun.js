// 深拷贝
export const deepCopy = function (Obj) {
    // 判断是否存在且是否为引用类型
    if (Obj && typeof Obj === 'object') {
        // 判断是为对象还是数组
        let newObj = (Object.prototype.toString.call(Obj) === '[object Array]' ? [] : {})
        for (let key in Obj) {
            // 判断键值是否为引用类型
            if (Obj[key] && typeof Obj[key] === 'object') {
                newObj[key] = deepCopy(Obj[key])
            } else {
                newObj[key] = Obj[key]
            }
        }
        return newObj
    } else {
        return Obj
    }
}

// 序列化时间
export const formatTime = function(time = new Date(), str = '-'){
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()

    let padZ = (n) => String(n).padStart(2,0)

    return `${year}${str}${padZ(month)}${str}${padZ(day)}`
}

// 效验东西
export const validSome = (exp) => {
    return function (str) {
        return exp.test(str)
    }
}

// 图片转base64
export const getBase64 = function(file) {
    return new Promise(function (resolve, reject) {
      let reader = new FileReader()
      let imgResult = ''
      reader.readAsDataURL(file)
      reader.onload = function () {
        imgResult = reader.result
      }
      reader.onerror = function (error) {
        reject(error)
      }
      reader.onloadend = function () {
        resolve(imgResult)
      }
    })
}

// 设置权限 - 自己可写, 别人可读
// export const onlyMeWrite = function (rowdata) {
//     let acl = new AV.ACL();
//     acl.setPublicReadAccess(true);
//     acl.setWriteAccess(AV.User.current(), true);
//     rowdata.setACL(acl);
// }
