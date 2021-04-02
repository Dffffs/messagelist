<template>
    <div class="onRow" v-loading="loading">
        <el-scrollbar
            style="height: 100%;"
            wrap-class="scrollbar-wrapper">
            <div
              class="infinite-list"
              v-infinite-scroll="load"
              infinite-scroll-delay="200">
              <transition-group name="list-trans" tag="p">
                  <div 
                    v-for="(item,i) in rowData" 
                    :key="`${item.time}_${i}`" 
                    class="one infinite-list-item list-trans-item"
                  >
                        <div class="top">
                            <div class="left">
                                <img :src="item.pic">
                                <span>{{item.userName}}</span>
                            </div>
                            <div class="right">{{formatTime(new Date(item.time))}}</div>
                        </div>
                        <div class="center">
                            <p>{{item.text}}</p>
                            <div>
                                <img v-for="(i, i1) in item.attachment" :key="i1" :src="i">
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="nice" @click="likeRow(item)">
                                <img :src="item.like ? zan : notzan" />
                                <span>{{item.likeNum}}</span>
                            </div>
                            <!-- <div class="judge">
                                <img src="" />
                            </div> -->
                        </div>
                    </div>
                    <!-- <div class="loading" v-if="loading" :key="`_${Math.random()*10000}`" v-loading="loading"></div> -->
                    <p class="end" v-if="end" :key="`_${Math.random()*10000}`">没有更多了</p>
              </transition-group>
            </div>
          </el-scrollbar>
    </div>
</template>
<script>
import { AV } from '@/public/ApiBase.js'
import { formatTime } from '@/public/commonFun.js'
let zan = require('@/assets/zan.png')
let notzan = require('@/assets/notzan.png')
export default {
    data(){
        return {
            zan, notzan,
            skip: 0, // 跳过的条数
            limit: 10, //拉取多少数据
            i: 1, //第几次拉取数据
            rowData: [],
            end: false,
            loading: false
        }
    },
    computed: { },
    watch:{},
    methods:{
        formatTime,
        async likeRow(row){
            const query = new AV.Query('likeData');
            query.equalTo('author', row.id);
            let res = await query.find()
            res[0].set('like', !row.like);
            res[0].increment('likeNum', !row.like ? 1 : -1);
            res[0].save().then(() => {
                row.likeNum = !row.like ? row.likeNum + 1 : row.likeNum - 1
                row.like = !row.like
            })
        },
        load(){
            let { i, skip, limit, end } = this
            if (end) {
                return
            }
            this.getRowData( skip , limit,'add')
            this.i ++
            this.skip = limit * i
            // console.log('load', this.loading)
        },
        async getLikeTarget(){
            const like = new AV.Query('likeData');
            let likeArr = await like.find()
            let likeTarget = {}
            likeArr.forEach(t => {
                likeTarget[t.get('author')] = {
                    like: t.get('like'),
                    likeNum: t.get('likeNum')
                }
            })
            return likeTarget
        },
        getRowData(skip, limit, type){
            this.loading = true
            // 获取row
            const query = new AV.Query('row');
            let { rowData } = this
            let data = [], flag = location.pathname.indexOf('mine') > -1
            // 按 time 时间戳 降序排列
            query.descending('createdAt');
            
            // 加入查询条件
            if (flag) {
                // let userid = localStorage.getItem('userId')
                let userid = AV.User.current().get('objectId')
                query.equalTo('userid', userid);
            }

            // 同时获取附件中的文件
            query.include('attachments');
            query.limit(limit);
            query.skip(skip);

            query.find().then(async (row) => {
                this.loading = false
                if (!row.length) {
                    this.end = true
                }
                let likeTarget = await this.getLikeTarget()
                row.forEach((res,i) => {
                    let id = res.get('objectId')
                    let obj = {
                        id,
                        like: likeTarget[id].like,
                        likeNum: likeTarget[id].likeNum, 
                        pic: res.get('pic'), 
                        text: res.get('text'), 
                        time: res.get('time'), 
                        userName: res.get('userName'),
                        attachment: []
                    }
                    const attachments = res.get('attachments');

                    attachments.forEach((attachment) => {
                        obj.attachment.push(attachment.get('url'))
                    });
                    data.push(obj)
                });
                console.log(data)
                if (type === 'update') {
                    this.rowData = data
                } else {
                    this.rowData = rowData.concat(data)
                }
            }).catch(err => {
                this.loading = false
            });
        },
        // 订阅消息
        subscribe(){
            const query = new AV.Query('row');
            query.include('attachments');
            query.subscribe().then((liveQuery) => {
                // 订阅成功
                liveQuery.on('create', async (row) => {
                    let file = await row.fetch({include: 'attachments'})
                    let likeTarget = await this.getLikeTarget()
                    let id = row.get('objectId')
                    let obj = {
                        id,
                        like: likeTarget[id].like,
                        likeNum: likeTarget[id].likeNum, 
                        pic: row.get('pic'), 
                        text: row.get('text'), 
                        time: row.get('time'), 
                        userName: row.get('userName'),
                        attachment: []
                    }
                    let attachments = row.get('attachments')
                    attachments.forEach((attachment) => {
                        obj.attachment.push(attachment.get('url'))
                    });
                    this.rowData.unshift(obj)
                });
            });
        }
    },
    mounted(){
        this.subscribe()
    }
}
</script>
<style lang="less" scoped>
    //list-trans
    .list-trans-item {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
        width: 100%;
    }
    .list-trans-enter, .list-trans-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
    .list-trans-leave-active {
        position: absolute;
    }
    .end, .loading{
        text-align: center;
        border-top: 1px solid #eee;
        height: 50px;
        line-height: 50px;
        color: #bbb;
    }
    .onRow{
        flex: 1;
        height: 500px;
        .infinite-list{
            height: 100%;
            display: flex;
            
            p{
                width: 100%;
                display: flex;
                flex-direction: column;
            }
        }
        .one{
            box-sizing: border-box;
            min-height: 120px;
            padding: 10px 15px;
            border: 1px solid #ededed;
            border-radius: 20px;
            box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24), 0 0 2px rgba(10, 16, 20, 0.12);
            font-size: 13px;
            font-family: '微软雅黑';
            margin-bottom: 10px;
            .top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(10, 16, 20, 0.1);
                padding-bottom: 10px;
                .left{
                    display: flex;
                    align-items: center;
                    img{
                        width: 50px;
                        height: 50px;
                        margin-right: 15px;
                    }
                }
                .right{
                    color: #ccc;
                }
            }
            .center{
                font-size: 15px;

                img{
                    width: 150px;
                    height: 150px;
                    margin-right: 10px;
                }
            }
            .bottom{

                display: flex;
                align-items: center;
                justify-content: flex-end;
                div.like{
                   color: #409EFF; 
                }
                div{
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    color: #aaa;
                    img{
                        width: 20px;
                        height: 20px;
                        margin-right: 5px;
                    }

                }
                
            }   
        }
    }
</style>

