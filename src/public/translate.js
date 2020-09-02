/*
    path地址
    http://api.fanyi.baidu.com/api/trans/vip/translate

    https://fanyi-api.baidu.com/api/trans/vip/translate

    文档地址: https://api.fanyi.baidu.com/doc/21

    https://github.com/blueimp/JavaScript-MD5

*/
import md5 from 'blueimp-md5'
import axios from 'axios'
export const translate = {
    apiUrl: '/api/trans/vip/translate',
    // 翻译成对应语言
    async toZhCn(q){
        let from = 'auto',
            to = 'zh',
            appid = '20200831000556016',
            salt = parseInt( Math.random() * 1000000000 + 1),
            sign = '',
            key = '8JVCJTRvVQonkn56iZIB'
        // appid+q+salt+密钥
        sign = md5( appid + q + salt + key)
        console.log(sign, appid + q + salt + key)
        let res = await axios({
            url: this.apiUrl,
            method: 'get',
            params: {
                q : encodeURIComponent(q),
                from,
                to,
                appid,
                salt,
                sign
            },
            headers:{
                'Content-Type': 'application/json'
            }
        }).catch(err => {
            console.log(err)
        })
        console.log(res)
    }
}