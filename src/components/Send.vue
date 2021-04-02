<template>
    <div class="send">
        <div class="content">
            <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="text"
                style="width:100%;"
                maxlength="300"
                show-word-limit
            >
            </el-input>
        </div>
        <div class="sendSome">
            <div class="left">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :limit="9"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :file-list="fileList"
                    :before-upload="beforeUpload"
                    :multiple="true"
                    :accept="accept"
                    :auto-upload="false">
                    <div class="upload-co">
                        <i class="el-icon-picture"></i>
                        <span class="tips">*最多选取九张图片</span>
                    </div>
                </el-upload>
            </div>
            <div class="right">
                <el-button type="primary" size="small" plain @click="send">发送</el-button>
            </div>
        </div>
    </div>
</template>
<script>
<<<<<<< HEAD
import { AV } from '@/public/ApiBase.js'
import { onlyMeWrite, getroleName } from '@/public/commonFun.js'
=======
import { AV, onlyMeWrite } from '@/public/ApiBase.js'
import { onlyMeWrite } from '@/public/commonFun.js'
>>>>>>> f1add36c36e5d060e119e55e0cd0a4009112c087
export default {
    data(){
        return {
            text: '',
            fileList: [],
            accept: '.jpg,.png'
        }
    },
    mounted(){
        // console.log(this.$store.state.loginInfo)
    },
    methods:{
        send(){
            let { text, fileList } = this
            // console.log(text, fileList)
            if (text == '' && !fileList.length) {
                return this.$message.warning('请填写内容或选择图片后再发送')
            }
            // 队列promise
            let arr = fileList.map(t => this.uploadImg(t))
            Promise.all(arr).then(async (file) => {
                // 处理数据将返回来的文件的id保存下来
                let current = AV.User.current();
                let obj = { 
                    objectId: '', 
                    pic: '', 
                    username: '', 
                    roleName: '' 
                };
                obj.roleName = await getroleName(AV);
                for (let key in obj) {
                    if (current.get(key)) {
                        obj[key] = current.get(key)
                    }
                }
                let {  objectId, pic, username, roleName } = obj
                // 存储
                const row = AV.Object.extend('row');
                const like = AV.Object.extend('likeData')
                const rowdata = new row();
                const likeData = new like()
                const userName = roleName || username
                //文本, 创建时间, 用户id, 头像, 用户名, 上传图片, 点赞数
                rowdata.set('text', text);
                rowdata.set('time', new Date().getTime());
                rowdata.set('userid', objectId);
                rowdata.set('pic', pic);
                rowdata.set('userName', userName);
                rowdata.set('attachments', file);
                // 设置权限, 其他人可读, 自己可写
                let acl = onlyMeWrite(AV)
                rowdata.setACL(acl);

                let res = await rowdata.save().catch(err => {
                    console.log(err)
                    this.$message.error('信息存储失败')
                });
                likeData.set('like', false);
                likeData.set('likeNum', 0);
                likeData.set('author', res.id);
                likeData.save()
                this.$message.success('信息存储成功')
                // 清空上传文件和内容
                this.text = ''
                this.fileList = []
                this.$refs.upload.clearFiles()
            }).catch((error) => {
                this.$message.error('存储文件失败')
                console.log(error)
            })
        },
        uploadImg(obj){
            const file = new AV.File(obj.name, obj.raw);
            return file.save()
        },
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        handlePreview(file) {
            // console.log(file, 'handlePreview');
        },
        handleChange(file, fileList){
            // let typeArr = fileList.filter(t => t.raw.type.indexOf('image') == -1);
            // if (typeArr.length) {
            //     return this.$message.warning('请选择图片')
            // }
            this.fileList = fileList
        },
        beforeUpload(file){
            let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
            const extension = testmsg === 'image'
            const isLt2M = file.size / 1024 / 1024 < 10
            if(!extension) {
                this.$message({
                    message: '上传文件只能是图片!',
                    type: 'warning'
                });
            }
            if(!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过 10MB!',
                    type: 'warning'
                });
            }
            return extension && isLt2M

        }
    }
}
</script>
<style lang="less">
    
    .send{
        
        .sendSome{
            margin: 10px 0;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 0 0px;
            .left{
                .el-icon-picture{
                    font-size: 30px;    
                    cursor:pointer;
                }
                .el-icon-picture:hover{
                    color: #409EFF;
                }
                .upload-demo{
                    .upload-co{
                        display: flex;
                        align-items: center;
                    }
                    .tips{
                        font-size: 12px;
                        margin-left: 10px;
                        color: #E6A23C;
                    }
                    .el-upload-list{
                        display: flex;
                        align-items: center;
                        .el-upload-list__item{
                            margin-top: 0;

                            .el-upload-list__item-name{
                                white-space: nowrap;
                                max-width: 100px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                } 
            }
        }
    }
</style>

