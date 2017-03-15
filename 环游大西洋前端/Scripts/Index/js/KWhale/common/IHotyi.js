/**
 * Created by Administrator on 2016/6/7 .
 */
/*
function IHotyi(){}
IHotyi.prototype={
    //依赖JQuery的post方法
    post:function(o,o2,call){
        $.post(o, o2, function (data) {
            call(data);
        });
    },
    //引擎资源文件获取接口
    iGetResources:function(call,pageId){
        this.post("/PandorHd/GetResources",{PageID:pageId},call)
    },
    //获取用户信息（包括排行榜 自身抽奖状态）
    iUserRecord:function(call){
        this.post("/Index/UserRecord",{},call)
    },
    //抽奖接口
    iGetDraw:function(call){
        this.post("/Index/GetDraw",{},call)
    },
    //信息保存接口
    iSaveInfo:function(call,obj){
        this.post("/Index/SaveInfo",obj,call)
    },
    //统计记录
    iUserWinNum:function(call,obj) {
        this.post("/Index/UserWinNum", obj, call)
    }
}*/
function IHotyi(){}
IHotyi.Config = {
    //是否启用json demo 调试
    IS_JSON_DEMO_TEST:true,
    JSON_DEMO: {
        /*1.游戏状态*/
        StartGame: {
            "Code": 1,
            "msg": "",
            "Time": "/Date(1472196308670)/",
            "Data": {
                "Statue": true
            }
        },
        /*2.用户信息*/
        UserRecord: {
            "Code": 1,
            "msg": "",
            "Time": "/Date(1472196139176)/",
            "Data": {
                "UserID": 1,
                "UserLogo": "http://wx.qlogo.cn/mmopen/icemUk7n2g3icBleMRyfcM2PfGpiblKNQWhGtHCqGOdKm5gtvgrRric9tywFTricIyiasC2Ufia0oceRhHQOvbc0Xo8WbBeQNlZanC4/0",
                "NickName": "Javy",
                "ChanceNum": 0,
                "IsDraw": false,
                "IsWin": false,
                "Code": "DAAEBD",
                "MaxWinNum": 0,
                "FriendList": [
                    {
                        "UserLogo": "http://wx.qlogo.cn/mmopen/icemUk7n2g3icBleMRyfcM2PfGpiblKNQWhGtHCqGOdKm5gtvgrRric9tywFTricIyiasC2Ufia0oceRhHQOvbc0Xo8WbBeQNlZanC4/0",
                        "NickName": "Javy",
                        "MaxWinNum": 0
                    }
                ],
                "WinAward": []
            }
        },
        /*4.抽奖接口*/
        GetDraw: {
            "Code": 1,
            "msg": "The Stock of this Award Is zero",
            "Time": "/Date(1472196215980)/",
            "Data": {
                "IsWin": false,
                "AwardID": 0,
                "AwardType": 0,
                "AwardName": "",
                "AwardDesc": "",
                "AwardImg": "",
                "ChanceKey": null
            }
        },
        /*6.保存用户信息接口 */
        SaveInfo:{
            "Code": 1,
            "msg": "",
            "Data": {
                "Statue": true
            }
        },
        UserWinNum: {
            "Code": 1,
            "msg": "",
            "Time": "/Date(1472196298711)/",
            "Data": {
                "Statue": true
            }
        }
    }
};
//接口调用无需判断Code==1哦
IHotyi.prototype={
    post:function(name,o,o2,call){
        if(IHotyi.Config.IS_JSON_DEMO_TEST){
            var jsonObj = IHotyi.Config.JSON_DEMO[name];
            if(jsonObj.Code==1){
                call(jsonObj);
            }else{
                //window.location.href="/index/error";
            }
        }else{
            $.post(o, o2, function (data) {
                var jsonObj = JSON.parse(data);
                if(jsonObj.Code==1){
                    call(jsonObj);
                }else{
                    if(!SystemConfig._interfaceTest) {
                        window.location.href="/index/error";
                    }
                }
            });
        }
    },
    //这部分修改后 记得穿传进去的第一个参数是 接口名字哦

    iStartGame:function(call){
        this.post("StartGame","/Index/StartGame",{},call)
    },
    iUserRecord:function(call){
        this.post("UserRecord","/Index/UserRecord",{},call)
    },
    iGetDraw:function(call){
        this.post("GetDraw","/Index/GetDraw",{},call)
    },
    iSaveInfo:function(call,obj){
        this.post("SaveInfo","/Index/SaveInfo",obj,call)
    },
    //引擎资源文件获取接口
    iGetResources:function(call,pageId){
        this.post("/PandorHd/GetResources",{PageID:pageId},call)
    },
    //统计记录
    iUserWinNum:function(call,obj) {
        this.post("UserWinNum","/Index/UserWinNum",obj,call)
    }
}