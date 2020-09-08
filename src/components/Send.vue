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
                    :multiple="true"
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
import { AV, onlyMeWrite } from '@/public/ApiBase.js'
export default {
    data(){
        return {
            text: '',
            fileList: []
        }
    },
    mounted(){
        // console.log(this.$store.state.loginInfo)
    },
    methods:{
        send(){
            let { text, fileList } = this
            console.log(text, fileList)
            if (text == '' && !fileList.length) {
                return this.$message.warning('请填写内容或选择图片后再发送')
            }
            // 队列promise
            let arr = fileList.map(t => this.uploadImg(t))
            let idTotal = []

            Promise.all(arr).then(async (file) => {
                // 处理数据将返回来的文件的id保存下来
                let current = AV.User.current()
                let obj = { 
                    objectId: '', 
                    pic: '', 
                    username: '', 
                    roleName: '' 
                }
                for (let key in obj) {
                    obj[key] = current.get(key)
                }
                let {  objectId, pic, username, roleName } = obj
                // 存储
                const row = AV.Object.extend('row');
                const rowdata = new row();
                const userName = roleName || username
                
                rowdata.set('text', text);
                rowdata.set('time', new Date().getTime());
                rowdata.set('userid', objectId);
                rowdata.set('pic', pic);
                rowdata.set('userName', userName);
                rowdata.set('attachments', file);
                // 设置权限, 其他人可读, 自己可写
                let acl = new AV.ACL();
                acl.setPublicReadAccess(true);
                acl.setWriteAccess(AV.User.current(), true);
                rowdata.setACL(acl);

                let res = await rowdata.save().catch(err => {
                    console.log(err)
                    this.$message.error('信息存储失败')
                })
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
            console.log(file, 'handlePreview');
        },
        handleChange(file, fileList){
            this.fileList = fileList
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

