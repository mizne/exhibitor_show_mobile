export const jssdkshare = {
    init: function (customerId,appid, sharedata, successcall)
    {
        var error = false;
        var url = location.href.split('#')[0]; //encodeURIComponent(location.href.split('#')[0]);
        $.getJSON("/jssdk/config", { "customerId": customerId, "appid": appid, "url": url }, function (data)
        {
            if (data == null)
            {
                return;
            }
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appid, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: eval(data.jsApiList) // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });
        wx.ready(function ()
        {
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: sharedata.toAllTitle, // 分享标题
                link: sharedata.link, // 分享链接
                imgUrl: sharedata.imgUrl, // 分享图标
                success: successcall
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: sharedata.toFirendTitle, // 分享标题
                desc: sharedata.toFirendDesc, // 分享描述
                link: sharedata.link, // 分享链接
                imgUrl: sharedata.imgUrl, // 分享图标
                type: sharedata.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: sharedata.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: successcall
            });
            wx.onMenuShareQQ({
                title: sharedata.toFirendTitle, // 分享标题
                desc: sharedata.toFirendDesc, // 分享描述
                link: sharedata.link, // 分享链接
                imgUrl: sharedata.imgUrl, // 分享图标
                success: successcall
            });
            wx.onMenuShareWeibo({
                title: sharedata.toFirendTitle, // 分享标题
                desc: sharedata.toFirendDesc, // 分享描述
                link: sharedata.link, // 分享链接
                imgUrl: sharedata.imgUrl, // 分享图标
                success: successcall
            });
            if (sharedata.hideOptionMenu)
            {
                wx.hideOptionMenu();
            }
            else
            {
                if (!error)
                {
                    wx.showOptionMenu();
                }
            }
            if (sharedata.hideMenu)
            {
                wx.hideMenuItems({
                    menuList: ['menuItem:copyUrl', 'menuItem:originPage', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand'],
                    success: function (res)
                    { 
                        //console.log(JSON.stringify(res));
                    },
                    fail: function (res)
                    { 
                        //console.log(JSON.stringify(res));
                    }
                });
                wx.showMenuItems({
                    menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite', 'menuItem:share:QZone', 'menuItem:refresh', 'menuItem:profile', 'menuItem:setFont', 'menuItem:dayMode', 'menuItem:nightMode'],
                    success: function (res)
                    {
                        //console.log(JSON.stringify(res));
                    },
                    fail: function (res)
                    {
                        //console.log(JSON.stringify(res));
                    }
                });
            }
        });
        wx.error(function (res)
        {
            //alert(res.errMsg);
            error = true;
            wx.hideOptionMenu();
        });
    }
}