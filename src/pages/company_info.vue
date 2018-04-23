<template>
    <div style="padding-bottom: 50px;">
        <yd-cell-group>
            
            <yd-cell-item arrow v-if="!isNew">
                <span slot="left" v-on:click="changeImg('edit')">
                    <span>logo</span>
                </span>
                <span slot="right" v-if="user && user.Other.Logo" >
                    <img:src="user.Other.Logo" width="40" height="40" class="logo">
                </span>
                <span slot="right" v-else >
                    <img v-if="user && user.HeadImgUrl"  :src="user ? user.HeadImgUrl: ''" width="40" height="40" class="logo">
                </span>
            </yd-cell-item>

            <yd-cell-item arrow v-else>
                <span slot="left" v-on:click="changeImg('add')">
                    <span>上传公司的logo</span>
                </span>
                <span slot="right" v-if="companyLogo">
                    <img :src="companyLogo" width="40" height="40" class="logo">
                </span>
                
            </yd-cell-item>

        </yd-cell-group>
        
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">公司名称</span>
                <yd-input slot="right" v-model="form.CompName" :debug="true" placeholder="请输入公司名称" required></yd-input>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">公司简称</span>
                <yd-input slot="right" v-model="form.ShortName" :debug="true" placeholder="请输入公司简称" required></yd-input>
            </yd-cell-item>
            
            <yd-cell-item>
                <span slot="left">公司简介</span>
                <!-- <yd-input slot="right" v-model="form.Introduction" :debug="true" placeholder="请输入公司简介" required></yd-input> -->
                <yd-textarea slot="right" v-model="form.Introduction" :debug="true" placeholder="请输入公司简介" maxlength="200" required></yd-textarea>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">手机</span>
                <yd-input slot="right" v-model="form.Mob" placeholder="请输入手机" regex="mobile" required :readonly="IsConfirm" :show-clear-icon="form.Mob === ''"></yd-input>
            </yd-cell-item>  
            
            <yd-cell-item class="form-codeNume" v-if="!IsConfirm">
                <span slot="left">验证码</span>
                <input type="text" slot="right" placeholder="请输入验证码" required max="6" v-model="codeNum" >
                <yd-sendcode slot="right" v-model="codeTimer" @click.native="sendCode" bgcolor="rgba(0, 0, 0, 0)" color="#0190fe"></yd-sendcode>
            </yd-cell-item>
            
            <yd-cell-item arrow>
                <span slot="left">城市</span>
                <input slot="right" type="text" @click.stop="addrShow = true" v-model="addr" required readonly placeholder="请选择城市">
            </yd-cell-item>
            
            <yd-cell-item>
                <span slot="left">职务</span>
                <yd-input slot="right" v-model="form.JobTitle" :debug="true" placeholder="请输入你的职务" required></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
            
            <yd-cell-item arrow>
                <span slot="left">参加展会</span>
                <input slot="right" type="text" @click.stop="selectedEx = true" v-model="form.ExName" readonly placeholder="请选择参加的展会">
            </yd-cell-item>

            <yd-cell-item arrow>
                <span slot="left">开始时间</span>
                <yd-datetime type="date" v-model="form.ExStartDate" slot="right"></yd-datetime>
            </yd-cell-item>

            <yd-cell-item arrow>
                <span slot="left">结束时间</span>
                <yd-datetime type="date" v-model="form.ExEndDate" slot="right"></yd-datetime>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">地点</span>
                <yd-input slot="right" v-model="form.ExAddr" :debug="true" placeholder="请输入地点" required></yd-input>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">展位号</span>
                <yd-input slot="right" v-model="form.Booth" :debug="true" placeholder="请输入展位号" required></yd-input>
            </yd-cell-item>

        </yd-cell-group>

        <div class="padd-box btn-weight" v-on:click="submit()">
            <yd-button size="large" bgcolor="#0190fe" color="#FFF">提 交</yd-button>
        </div>
        <!-- 城市选择 -->
        <yd-cityselect v-model="addrShow" :callback="citySelect" :items="district"></yd-cityselect>
        <!-- 展会选择 -->
        <yd-popup v-model="selectedEx" position="bottom" width="90%" class="m-exSelect">
            <!-- <yd-search v-model="searchValue" :on-submit="searchHandler"></yd-search> -->
            <div class="m-exSelect_title">选择你参加的展会</div>
            <ul>
                <li v-for="(list, index) in ExList" :key="'ex' + index" v-on:click="onSelectExhibitor(list)">
                    {{list.Name}}<br>
                    <span>{{list.StartDate.slice(5, 10)}}~{{list.EndDate.slice(5, 10)}} {{list.Addr}} </span>
                </li>
            </ul>
        </yd-popup>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import { CellGroup, CellItem } from "vue-ydui/dist/lib.px/cell";
import District from "ydui-district/dist/jd_province_city_area_id";

export default {
    data() {
        return {
            form: {
                CompName: "", // 公司名
                ShortName: "", // 简称
                Mob: "", // 手机号
                Province: "", // 省份
                City: "", // 城市
                Introduction: "", // 简介
                JobTitle: "", // 职务

                ExName: "", // 展会名
                ExStartDate: "", // 展会开始
                ExEndDate: "", // 展会结束
                ExAddr: "", // 展会地点
                Booth: "", // 展会号
                ItemId: "", // 如果有的选择话 则是参加展会的id 反之为空
            },
            // 城市选择
            addrShow: false,
            district: District,
            // 验证码
            selectedEx: false, // 选择展会
            ExList: [], // 选择展会
            picValue: "",
            codeTxt: "",
            addr: "",

            MediaId:"",
            companyLogo:"", // 存储上传图片的logo地址
            uploadMode: "add", // 图片上传的模式 新增或修改 默认新增
            mesValid: false,
            searchValue: '',
            IsConfirm: false,
            IsCustomer: '', // 获取到的展商信息
            codeTimer: false,
            codeNum: ''
        };
    },
    created() {
        setTimeout(() => {
            if (this.token === '') { // 如果没有token 则请求token 并重定向到 原链接
                localStorage.setItem('redirectTo', 'company_info');
                this.$router.push({path: '/questToken'});
            }
        }, 100);
        // 设置初始时间
        setTimeout(() => {
            this.form.ExStartDate = this.now;
            this.form.ExEndDate = this.now;
        }, 100);

        this.init();
        this.getExList(); // 获取展会列表信息
        // this.msgConfig(); // 获取图片的配置 
    },
    computed: {
            wxConfig() { // 获取助力用户是否注册
                return this.$store.getters.getJsConfig;
            },
            now() { // 获取当前日期 填充时间选择
                const date = new Date();
                const year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                month = String(month).length === 1 ? '0' + month : month;  
                day = String(day).length === 1 ? '0' + day : day; 
                return year + '-' + month + '-' + day;
            },
            token() { 
                return this.$store.getters.getToken;
            },
            compId() {
                return this.$store.getters.getCompId;
            },
            headers() {
                return {headers: {'Authorization': this.token, 'Content-Type': 'application/json'}};
            },
            customerInfo() {
                return this.$store.getters.getCustomerInfo;
            },
            isNew() { // 如果为新客户 返回true
                if (!this.user) {
                    return false;
                }
                return this.user.Other ? false: true;
            },
            user() {
                return this.$store.getters.getUserinfo;
            },
            invite() {
                return this.$store.getters.getInvite;
            }
    },
    methods: {
        init() {
            // 获取用户信息
            this.$http.get('/api/userinfo', {headers: {'Authorization': this.token}}).then(({data}) => { 
                if(data.StatusCode === 200){
                    localStorage.setItem('userInfo', JSON.stringify(data.Data));
                    this.$store.commit('setUserInfo', {userInfo: data.Data});
                    this.IsConfirm = data.Data.IsConfirm;
                    const person = data.Data;
                    // 初始赋值
                    if (data.Data.Other) { // 如果有信息则赋值
                        const other = data.Data.Other;
                        this.IsCustomer = other;
                        this.form.CompName = other.CompName ? other.CompName : ''; // 公司名
                        this.form.ShortName = other.ShortName ? other.ShortName : ''; // 简称
                        this.form.Mob = other.Mob ? other.Mob : ''; // 手机号
                        this.form.Introduction = other.Introduction ? other.Introduction : ''; // 简介
                        this.form.Province = person.Province ? person.Province : ''; // 省份
                        this.form.JobTitle = person.JobTitle ? person.JobTitle : ''; // 职务
                        this.form.City = person.City ? person.City : ''; // 城市
                        this.addr = person.Province + " " + person.City;
                    } else { // 如果没有注册展商的信息 则赋值个人用户信息
                        this.form.CompName = person.CompName ? person.CompName : ''; // 公司名
                        this.form.Mob = person.Mob ? person.Mob: ''; // 手机
                        this.form.Province = person.Province ? person.Province : ''; // 省份
                        this.form.City = person.City ? person.City : ''; // 城市
                        this.form.JobTitle = person.JobTitle ? person.JobTitle : ''; // 职务
                        this.addr = person.Province + " " + person.City;
                    }
                }
            }).catch(err => {
                localStorage.setItem('redirectTo', 'company_info');
                // this.$router.push({path: '/questToken'});
            });
        },
        msgConfig() { // 调取微信jssdk 基本配置
            const paramsUrl = encodeURIComponent(location.origin + location.pathname);
            this.$http.get('/api/wechat/config/share/by?url=' + paramsUrl).then(doc => {
                this.$store.commit('setJsConfig', {jsConfig: doc.data.jsConfig});
                wx.config({
                    ...doc.data.jsConfig,
                    jsApiList: ['chooseImage']
                });  
            }); 
        },
        changeImg(type) {
            this.uploadMode = type;
            let that = this;
            wx.chooseImage({
                success: function (res) {
                    that.companyLogo = res.localIds[0];
                    wx.uploadImage({
                        localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (r) {
                            that.MediaId = r.serverId;
                            console.log(r);
                        }
                    });
                }
            });
        },
        citySelect(ret) { // 城市选择
            this.form.Province = ret.itemName1;
            this.form.City = ret.itemName2 + " " + ret.itemName3;
            this.addr = ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
        },
        upImage(file, fileName) { // 上传logo    
            let param = new FormData(); //创建form对象
            param.append('file',file,fileName);//通过append向form对象添加数据
            const headers = {headers: {'Content-Type':'multipart/form-data'}}
            this.$http.post('/api/upload/images', param, headers).then(({data}) => {
                if (data.StatusCode === 200 && data.Data.imgUrls.length > 0) {
                    this.form.Logo = data.Data.imgUrls[0];
                }
            });
        },
        getExList() { // 获取展会
            this.$http.get('/api/exhibition', this.headers).then(({data}) => {
                if (data.StatusCode === 200) {
                    this.ExList = data.Data;
                    if (this.invite && this.invite !== '') {
                        const selelcExhibition = data.Data.filter(v => v.Id === this.invite.ItemId);
                        if (selelcExhibition.length !== 0) {
                            this.onSelectExhibitor(selelcExhibition[0]);   
                        }
                    }
                }
            });
        },
        onSelectExhibitor(data) { // 选择展会信息 填充
            this.form.ExName = data.Name;
            this.form.ExStartDate = data.StartDate.slice(0, 10);
            this.form.ExEndDate = data.EndDate.slice(0, 10);
            this.form.ExAddr = data.Addr;
            this.form.ItemId = data.Id;
            this.selectedEx = false;
        },
        submit() {
            if (this.isNew) { // 如果为新用户 则直接注册
                this.register();
            } else {
                this.resubmit(); // 用户信息修改提交 手机号码只读不可修改
            }
        },
        register() { // 新注册
            if (this.formValid(this.form)) { // 如果个人信息和展会信息通过 则提交
                
                this.validPhone().then(cur => { // 手机验证通过则执行 提交请求
                    const userinfoBody = {
                        SetValues: {
                            "Province": this.form.Province,
                            "City": this.form.City,
                            "ShortName": this.form.ShortName,
                            "CompName": this.form.CompName,
                            "JobTitle": this.form.JobTitle,
                            "Mob": this.form.Mob,
                            "IsConfirm": true // 上述已验证通过
                        }
                    };
                    const customerBody = {
                            "CompName": this.form.CompName,
                            "ShortName": this.form.ShortName,
                            "Logo": this.user.HeadImgUrl ? this.user.HeadImgUrl:"http://api.auth.huizhanren.cn/upload/images/201804/0f145ddea71740d29f842bdd6d965e2d.jpg",
                            "Mob": this.form.Mob,
                            "Introduction": this.form.Introduction,
                    };
                    setTimeout(() => {
                        this.$dialog.loading.close();
                    }, 1000);
                    const userinfo$ = this.$http.put('/api/userinfo', userinfoBody, this.headers).then(({data}) => {
                        return data;
                    });
                    const customer$ = this.$http.post('/api/customer', customerBody, this.headers).then(({data}) => {
                        return data;
                    });
                    // 1.先验证手机 2.新增展商 根据返回的customer的id新增作品 3.添加用户信息
                    Promise.all([customer$, userinfo$]).then(result => {
                        const compinfoBody = {
                            "CustomerId":result[0].Data.Id,
                            "ExName":this.form.ExName,
                            "ExAddr":this.form.ExAddr,
                            "ExStartDate": this.form.ExStartDate,
                            "ExEndDate":  this.form.ExEndDate,
                            "Booth":this.form.Booth,
                        };
                        this.$http.post('/api/compinfo', compinfoBody, this.headers).then(({data}) => {
                            this.$store.commit('setMyCompId', result[0].Data.Id);
                            setTimeout(() => {
                                this.$dialog.loading.close();
                                this.$router.push({path: '/goods'});
                            }, 100);
                        });
                    }).catch(err => {
                        this.$dialog.loading.close();
                        this.$dialog.notify({
                            mes: '提交失败，请尝试重新提交！',
                            timeout: 2000
                        });
                    });
                });
                
            }
        },
        resubmit() { // 重新提交信息
            if (this.formValid(this.form)) { // 如果个人信息和展会信息通过 则提交
                const userinfoBody = {
                    SetValues: {
                        "Province": this.form.Province,
                        "City": this.form.City,
                        "CompName": this.form.CompName,
                        "ShortName": this.form.ShortName,
                        "JobTitle": this.form.JobTitle
                    }
                };
                const compinfoBody = {
                    "CustomerId": this.user.Other.Id,
                    "ExName":this.form.ExName,
                    "ExAddr":this.form.ExAddr,
                    "ExStartDate": this.form.ExStartDate,
                    "ExEndDate":  this.form.ExEndDate,
                    "Booth":this.form.Booth,
                };
                const userinfo$ = this.$http.put('/api/userinfo', userinfoBody, this.headers).then(({data}) => {
                    return data;
                });
                const compinfo$ = this.$http.post('/api/compinfo', compinfoBody, this.headers).then(({data}) => {
                    return data;
                });
                // 1.修改用户信息 2.新增作品
                Promise.all([compinfo$, userinfo$]).then(result => {
                    this.$store.commit('setMyCompId', {myCompId:result[0].Data.Id});
                    setTimeout(() => {
                        this.$dialog.loading.close();
                        this.$router.push({path: '/goods'});
                    }, 100);
                }).catch(err => {
                    this.$dialog.loading.close();
                    this.$dialog.notify({
                        mes: '提交失败，请尝试重新提交！',
                        timeout: 2000
                    });
                });
            }
        },
        validPhone() { // 验证手机号 返回promise
            
            return new Promise((resolve, reject) => {
                if (this.user.IsConfirm) {
                    resolve();
                    return;
                }
                const body = {
                    phone: this.form.Mob,
                    code: this.codeNum
                };
                this.$http.post("/api/basic/validate/sms/check", body, this.headers).then(doc => {
                    let state = doc.data;
                    if (state.StatusCode === 200) {
                        if (state.Data.result) {
                            resolve();
                        } else {
                            this.$dialog.toast({
                                mes: "手机号码验证未通过",
                                icon: "error",
                                timeout: 1000
                            });
                        }
                    }
                });
            });
        },
        formValid(value) { // 传入键值对判断是否为空
            let values = Object.values(value).includes(""); // 判断value 是否含有空值 为布尔值
            if (values) {
                this.$dialog.toast({
                    mes: "验证未通过，请确认输入",
                    timeout: 1000
                });
                return false;
            }
            this.$dialog.loading.open('正在提交信息！');
            return true;
        },
        sendCode() { // 发送二维码
            if (this.form.Mob.trim() === '') {
                this.$dialog.toast({
                    mes: "手机号码不能为空",
                    icon: "error",
                    timeout: 1000
                });
                return;
            }
            this.$dialog.loading.open("发送中...");
            this.$http.post('/api/basic/validate/sms/send', {phone: this.form.Mob}, this.headers).then(data => {
                this.codeTimer = true;
                this.$dialog.loading.close();
                this.$dialog.toast({
                    mes: "已发送",
                    icon: "success",
                    timeout: 1000
                });
            }).catch(err => {
                this.codeTimer = false;
                this.$dialog.loading.close();
                this.$dialog.toast({
                    mes: "发送失败，请重新点击发送",
                    icon: "success",
                    timeout: 1000
                });
            });
        },
    }
};
</script>
<style lang="scss" scoped>
    .page-part {
    margin-bottom: 15px;
    }
    .logo{
        border-radius: 50%;
    }
    .yd-cell-box{
        position: relative;
        .img-inputer{
            position: absolute;
            z-index: 2;
            opacity: 0;
        }
    }
</style>
