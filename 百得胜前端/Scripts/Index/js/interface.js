/**
 * Created by Administrator on 2016/5/4.
 */
function IHotyi(){

}
/*
 * window["gb"].post("http://ylll.pandoraxbox.com/index/fenxian", {}, function (data) {
 call(data);
 });
 * */
/*var _interface = new IHotyi();
 _interface.iGetUserInfo(function(data){
 var jsstr = data;
 var jsonObj = JSON.parse(jsstr);
 },{});*/
IHotyi.prototype={
    //post
    post:function(o,o2,call){
        $.post(o, o2, function (data) {
            call(data);
        });
    },
    //查询用户信息
    iUserRecord:function(call,obj){
        this.post("/Index/UserRecord",obj,call)
    },
    //抽奖
    iGetDraw:function(call,obj){
        this.post("/Index/GetDraw",obj,call)
    },
    //保存用戶信息
    iSaveInfo:function(call,obj){
        this.post("/Index/SaveInfo",obj,call)
    },
    //保存用戶地址信息
    iSaveAdressInfo:function(call,obj){
        this.post("/Index/SaveAdressInfo",obj,call)
    },
    //登記用戶最高紀錄
    iUserWinNum:function(call,obj){
        this.post("/Index/UserWinNum",obj,call)
    },
    //分页获取朋友信息
    iGetFriend:function(call,obj){
        this.post("/Index/GetFriend",obj,call)
    }
};