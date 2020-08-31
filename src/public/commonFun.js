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