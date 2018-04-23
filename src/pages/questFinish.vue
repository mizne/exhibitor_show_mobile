<template>
    <div>
        <yd-icon name="checkoff"></yd-icon><br>
        请求成功，正在为你跳转！
    </div>
</template>

<script>
    export default {
        name: 'questFinish',
        data () {
            return {}
        },
        created(){
            var str = location.hash.replace('#access_token=','');
            var splitStr = str.split('&')[0].replace('#access_token=','');
            var expires_in = str.split('&')[2].split('=')[1];
            
            localStorage.setItem('access_token', 'Bearer ' + splitStr);
            localStorage.setItem('expires_in', Date.now() + Number(expires_in) * 1000 );
            this.$store.commit('setToken', {token: splitStr});
            // 请求成功后 获取用户信息
            const headers = {headers: {'Authorization': 'Bearer ' + splitStr}};
            this.$http.get('/api/userinfo', headers).then(({data})=> {
                if (data.StatusCode === 200) {
                    this.$store.commit('setUserInfo', {userInfo: data.Data});

                    var redirectTo = localStorage.getItem('redirectTo'); // 获取重定向地址
                    localStorage.removeItem('redirectTo'); // 清空
                        
                    if (redirectTo && redirectTo !== '') {
                        this.$router.push({path: '/' + redirectTo}); // 如果有链接直接连接到重定向
                    } else {
                        this.$router.push({path: '/compid/' + this.$store.getters.getCompId}); // 反之链接到首页
                    }
                }
            }).catch((res) => {
                if (res.response.status === 401 ) { // token无效 清除localStorage
                    const compId = localStorage.getItem('compId');
                    localStorage.clear();
                    localStorage.setItem('compId', compId);
                }
            });
        }
    }
</script>
 
<style scoped lang="scss">
div{
    text-align: center;
    .yd-icon-checkoff{
        color: rgb(24, 187, 24);
        font-size: 40px!important;
        display: inline-block;
        margin: 100px 0 50px;
    }
}
</style>
