<template>
    <div class="helpPay">
        <p>您在正在为{{invite.CompName}}助力，所有助力金将以微信红包的形式随机发放给我司展台的到访观众。</p>
        <label>订单名称<input type="text" readonly value="助力"></label>
        <label>订单号<input type="text" readonly :value="orderName"></label>
        <button type="button" v-on:click="applyHelp()">确认支付1元</button>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk';

export default {
    data() {
        return {
            apply: '',
            orderName: '',
            onOff: false
        }
    },
    created() {
        console.log(this.token);
        document.title = "助力";
        this.$dialog.loading.open('正在加载订单信息！');
        const body = {
            "PayFrom":1,
            "CompId": this.compId,
            "total_fee": 1,
            "subject":"展商秀-助力",
            "GetParam":true
        };
        console.log(body);
        this.$http.post('/api/wechatpay/unifiedorder',body,  this.headers).then(({data}) => {
            if (data.StatusCode === 200) {
                this.apply = data.Data;
                this.orderName = data.Data.order.trade_no;
                this.$dialog.loading.close();
                this.onOff = true;
            }
        });
    },
    computed: {
        token() {
            return this.$store.getters.getToken;
        },
        invite() {
            return this.$store.getters.getInvite;
        },
        headers() {
            return {headers: {'Authorization': this.token, 'Content-Type': 'application/json'}};
        },
        compId() {
            return this.$store.getters.getCompId;
        },
    },
    methods: {
        applyHelp () {
            if (!this.onOff) {
                return;
            }
            const that = this;
            const params = this.apply.payParam;
            const order = this.apply.order;
            function onBridgeReady(){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": params.appId,     //公众号名称，由商户传入     
                        "timeStamp": params.timeStamp,         //时间戳，自1970年以来的秒数     
                        "nonceStr": params.nonceStr, //随机串     
                        "package": params.package,     
                        "signType": params.signType,         //微信签名方式：     
                        "paySign": params.paySign //微信签名 
                    },
                    function(res){     
                        console.log(res);
                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                            const body = {
                                "OrderId": order.OrderId,
                                "trade_no": order.trade_no
                            };
                            console.log(body, this.headers);
                            that.$http.post('/api/wechatpay/orderquery', body,  this.headers).then(({data}) => {
                                if (data.Data.result) {
                                    console.log(data.Data.result);
                                    that.$router.push({path: '/helpSuccessful'});
                                } 
                            });
                        }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                    }
                ); 
            }
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                onBridgeReady();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .helpPay{
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: rgb(245, 245, 245);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        p{
            padding: 27px 21px  32px;
            line-height: 20px;
            color: rgb(116,116,116);
            font-size: 14px;
        }
        label{
            width: 100%;
            height: 50px;
            background-color: #fff;
            border-top: 1px solid rgb(230,230,230);
            text-indent: 21px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            color: rgb(120, 120,120);
            input{
                width: 76%;
                outline: none;
                border: none;
                text-align: right;
                padding-right: 21px;
                color: rgb(51,51,51);
            }
        }
        label:last-child{
            border-bottom:1px solid rgb(230,230,230); 
        }
        button{
            margin-top: 10%;
            width: 92%;
            height: 7.5%;
            outline: none;
            border: none;
            background-color: rgb(17, 142, 234);
            color: #fff;
            border-radius: 6px;
            font-weight: 500;
            letter-spacing:2px;
            font-size: 18px;
        }
    }
</style>

