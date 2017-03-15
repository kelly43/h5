/**
 * Created by Administrator on 2016/6/13 .
 * 引擎UI组件
 */
function HotyiCommon(gc){
    this._gc = gc;
    this._iHotyi = new IHotyi();
}

HotyiCommon.InitCommon=function(s){
    /*window.document.body.onresize = function(evt){
     evt.preventDefault();
     }*/
    //禁止点击 与禁止滑动
    window["isCanTouch"]=false;

    window.document.body.addEventListener("touchstart", function (evt) {
        if(!window["isCanTouch"])
            evt.preventDefault();
    }, false);
    window["isCanMove"]=false;
    document.body.addEventListener('touchmove', function (event) {
        if(!window["isCanMove"])
            event.preventDefault();
    }, false);

    //重写 alert
    window.alert=function(text) {
        var sh = s.sh/window["KWRatio"];
        var sw = s.sw/window["KWRatio"];
        var mask = document.createElement("div");
        mask.style.boxShadow="0 0 3px 1px #ddd;";
        mask.style.position = "fixed";
        mask.style.width = sw   + "px";
        mask.style.height = sh  + "px";
        mask.style.backgroundColor = "#000";
        mask.style.opacity=0.7;
        mask.style.zIndex=9999;
        document.body.appendChild(mask);
        var wrap = document.createElement("div");
        wrap.style.boxShadow="0 0 3px 1px #ddd;";
        wrap.style.position = "fixed";
        wrap.style.width = sw / 1.4  + "px";
        wrap.style.height = sh / 4 + "px";
        wrap.style.top = (sh - sh / 4) / 2  + "px";
        wrap.style.left = (sw - sw / 1.4) / 2 + "px";
        wrap.style.borderRadius = 15  + "px";
        wrap.style.backgroundColor = "#ffffff";
        var top = document.createElement("div");
        top.style.backgroundColor = "#848484";
        top.style.width = sw / 1.4  + "px";
        top.style.height = sh / 4 / 5  + "px";
        top.style.borderTopRightRadius = 15  + "px";
        top.style.borderTopLeftRadius = 15  + "px";
        top.style.lineHeight = sh / 4 / 5  + "px";
        top.style.fontFamily = "微软雅黑";
        top.style.textAlign = "center";
        top.style.fontSize = (sh / 4 / 6 - 8) + "px";
        top.style.color = "#fff";
        top.innerHTML = "消 息";
        wrap.appendChild(top);
        var bot = document.createElement("div");
        bot.className = "webkitV";
        bot.style.width = sw / 1.4  + "px";
        bot.style.height = sh / 4 / 6 * 3.3  + "px";
        bot.style.lineHeight = sh / 4 / 6  + "px";
        bot.style.fontFamily = "微软雅黑";
        bot.style.textAlign = "center";
        bot.style.top = sh / 4 / 6 + "px";
        bot.style.fontSize = (sh / 4 / 8 - 8) + "px";
        bot.innerHTML = text;
        wrap.appendChild(bot);
        var ok = document.createElement("div");
        ok.style.width = sw / 1.4 + "px";
        ok.style.height = sh / 4 / 6 * 1.5 + "px";
        ok.style.lineHeight = sh / 4 / 6 * 1.5 + "px";
        ok.style.fontFamily = "微软雅黑";
        ok.style.textAlign = "center";
        ok.style.top = sh / 4 / 6 * 4.5 + "px";
        ok.style.borderTop = "2px solid #d0d0d0"
        ok.style.fontSize = sh / 4 / 6 - 8 + "px";
        ok.style.cursor = "pointer";
        ok.innerHTML = "确 定";
        ok.style.color = "#099aed";
        ok.style.zIndex=10001;
        ok.addEventListener("touchstart",function(evt){
            evt.preventDefault();
            document.body.removeChild(wrap);
            document.body.removeChild(mask);
        },false);
        wrap.appendChild(ok);
        wrap.style.zIndex=10000;
        document.body.appendChild(wrap);
    };
    HotyiLoad.Init();
}

HotyiCommon.prototype={
    _istest:false,
    _config:{
        _errMsg_1:"您的网络不太问题请稍后再试",
        _errRedirect_1:"/Index/error"
    },



    getHighScore:function(call){
        var that = this;
        that._iHotyi.iUserRecord(function(data2) {
            /*var jsonObj = JSON.parse(data2);
             if(jsonObj.Code==1){*/
            var jsonObj =data2;
            var MaxWinNum = jsonObj.Data.MaxWinNum;
            call(MaxWinNum)
            /*}else{
             call(0)
             }*/
        });
        /*if(window.localStorage.HIGHSCORE){
         return window.localStorage.HIGHSCORE
         }else{
         window.localStorage.HIGHSCORE = "0";
         return window.localStorage.HIGHSCORE;
         }*/
    },
    updateScore:function(score){
        /*var lastTime = window.localStorage.HIGHSCORE-0
         if(lastTime>=score){
         return
         }else{
         window.localStorage.HIGHSCORE = score;
         }*/
    },

    //游戏规则页面
    showRulePanel:function(){
        var that = this,
            s = that._gc._stage_top;
        window["isCanMove"]=true;
        window["isCanTouch"]=true;
        var cur_z = s.canvas.style.zIndex;
        var target_z = 1000;
        s.canvas.style.zIndex=target_z;
        var mask = KWhaleUtils.getMask("#0b0100",0.8);
        s.addChild(mask);
        var main = KWhaleUtils.getBmpByName("common_rule");
        KWhaleUtils.AddStageByScaleHNoCheck(s,main,747/1135);
        main.y = s.sh/1135*182;
        main.x = s.sw/2;

        var wrap = KWhaleUtils.addDomByScale(s,503/1135,510/1135,370/1135,"");
        wrap.style.overflowY = "scroll";
        wrap.style.overflowX = "hidden";
        wrap.style.zIndex=target_z+1;
        wrap.style.opacity=0;
        KWhaleUtils.Tween(wrap.style,{opacity:1},0,400,TWEEN.Easing.Quadratic.InOut).start();
        var img = RES.getRES("rule_content");
        img.style.width ="100%";
        wrap.appendChild(img);

        var btn = new Shape.Rectangle({x: 0, y: 0}, s.sh / 1135 * 67, s.sh / 1135 * 67, "red");
        btn.x = (s.sw/2)+s.sh*207/1135;
        btn.y = s.sh/1135*182;
        new KEvent(btn, {type: "touchstart"}, function () {
            s.canvas.style.zIndex=cur_z;
            btn.evtObject.destory();
            document.body.removeChild(wrap);
            s.removeChild(main);
            s.removeChild(mask);
            window["isCanMove"]=false;
            window["isCanTouch"]=false;
        });
        btn.evtObject.ele.style.zIndex=target_z+2;
        document.body.appendChild(wrap);
        wrap.style.left= (s.sw/KWRatio-wrap.offsetWidth)/2+"px";
    },

    //排行榜页面 每次都调用一次
    showRankingList:function(){
        var that = this,
            s = that._gc._stage_top;
        var cur_z = s.canvas.style.zIndex;
        var target_z = 1000;
        s.canvas.style.zIndex=target_z;
        var mask = KWhaleUtils.getMask("#0b0100",0.8);
        s.addChild(mask);
        //common_rangkingList
        var main = KWhaleUtils.getBmpByName("common_rangkingList");
        KWhaleUtils.AddStageByScaleHNoCheck(s,main,695/1135);
        main.y = s.sh/1135*192;
        main.x = s.sw/2;

        //(s,scaleH,scaleW,scaleY,innerHtml)
        var wrap2 = KWhaleUtils.addDomByScale(s,546/1135,578/1135,338/1135,"");
        //wrap.style.background="red";
        //wrap.style.opacity="0.2";
        wrap2.style.overflowY = "scroll";
        wrap2.style.overflowX = "hidden";
        var ul = document.createElement('ul');
        var imgH = s.sh/KWRatio/1135*90+"px";

        var nameW = s.sh/KWRatio/1135*254+"px";
        var nameH = s.sh/KWRatio/1135*137+"px";
        var scoreW = s.sh/KWRatio/1135*120+"px";
        var imgPW = s.sh/KWRatio/1135*124+"px";
        window["isCanMove"]=true;
        window["isCanTouch"]=true;
        var funcNewList = function (src,name,score){
            /*var src = "http://img0.imgtn.bdimg.com/it/u=1296339116,1425208846&fm=21&gp=0.jpg";
             var name = "潘多拉";
             var score = "15";*/
            var li = document.createElement('li');
            li.style.fontFamily = "微软雅黑";
            li.style.fontSize = s.sh / KWRatio / 1135 * 32 + "px";
            li.style.color = "#767676";
            li.innerHTML = "<p style='text-align:right;width: " + imgPW + "'><img src='" + src + "' style='border-radius:50%;width:" + imgH + ";height:" + imgH + "  '></p><p style='display:block;height:" + nameH + ";text-align: center;width: " + nameW + "'>" + name + "</p><p style='text-align:center;width: " + scoreW + "'>" + score + "</p>"
            li.style.height = s.sh / KWRatio / 1135 * 136 + "px";
            li.style.lineHeight = s.sh / KWRatio / 1135 * 136 + "px";
            li.style.width = s.sh / KWRatio / 1135 * 500 + "px";
            li.className = "webkitX";
            li.style.borderBottom="1px solid #d2d2d2"
            li.style.margin="0 auto";
            ul.appendChild(li);
        }

        wrap2.style.zIndex=target_z+1000;
        wrap2.appendChild(ul);
        //close btn
        var btn = new Shape.Rectangle({x: 0, y: 0}, s.sh / 1135 * 67, s.sh / 1135 * 67, "red");
        btn.x = (s.sw/2)+s.sh*207/1135;
        btn.y = s.sh/1135*192;
        var common_nobodyjoin=null;
        new KEvent(btn, {type: "touchstart"}, function () {
            if(common_nobodyjoin){
                s.removeChild(common_nobodyjoin);
            }else{
                document.body.removeChild(wrap2);
            }
            s.canvas.style.zIndex=cur_z;
            btn.evtObject.destory();
            s.removeChild(main);
            s.removeChild(mask);
            window["isCanMove"]=false;
            window["isCanTouch"]=false;
        });
        btn.evtObject.ele.style.zIndex=target_z+1002;

        that._iHotyi.iUserRecord(function(data2) {
            var jsonObj = data2;
            /* var jsonObj = JSON.parse(data2);
             if(jsonObj.Code==1) {*/
            var userData = jsonObj.Data.FriendList;
            if(userData.length==0){
                //common_nobodyjoin
                common_nobodyjoin = KWhaleUtils.getBmpByName("common_nobodyjoin");
                KWhaleUtils.AddStageByScaleHNoCheck(s,common_nobodyjoin,204/880);
                common_nobodyjoin.y = s.sh/880*362;
                common_nobodyjoin.x = s.sw/2;
            }else {
                userData.sort(function(a, b){
                    return b.MaxWinNum - a.MaxWinNum;
                });
                for (var i = 0; i < userData.length; i++) {
                    var ele = userData[i];
                    funcNewList(ele.UserLogo, ele.NickName, ele.MaxWinNum);
                }
                document.body.appendChild(wrap2);
                wrap2.style.left= (s.sw/KWRatio-wrap2.offsetWidth)/2+"px";
            }
            /*}else{
             window.location.href= that._config._errRedirect_1;
             }*/
        });
    },

    //挑战失败 更新分数记录
    showDefeatPanel:function(scores){
        var that = this,
            s = that._gc._stage_top,
            showPanel = function () {
                var mask = KWhaleUtils.getMask("#0b0100",0.8);
                s.addChild(mask);
                var main = KWhaleUtils.getBmpByName("common_defeat");
                KWhaleUtils.AddStageByScaleHNoCheck(s,main,297/1135);
                main.y = s.sh/1135*378;
                main.x = s.sw/2;

                var text ;
                if(scores>1000){
                    text = new Text(scores+"","微软雅黑", s.sh/1135*70,"#d8b656");
                    text.x = s.sw/2 - s.sh/1135*64+ s.sh/1135*191/2 - text.width/2;
                    text.y = s.sh/1135*446;
                }else{
                    text = new Text(scores+"","微软雅黑", s.sh/1135*95,"#d8b656");
                    text.x = s.sw/2 - s.sh/1135*64+ s.sh/1135*191/2 - text.width/2;
                    text.y = s.sh/1135*446;
                }
                s.addChild(text);
                //gameReplay
                var btn = new Shape.Rectangle({x:0,y:0}, s.sh/1135*436,s.sh/1135*102,"red");
                btn.x = (s.sw-btn.width)/2;
                btn.y = s.sh/1135*571;
                new KEvent(btn,{type:"touchstart"}, function () {
                    btn.evtObject.destory();
                    s.removeChild(main);
                    s.removeChild(mask);
                    s.removeChild(text);
                    that._gc.gameReplay();
                });
            };
        if(that._gc._isTest){
            console.log("调试模式：挑战失败页面")
            showPanel();
        }else {
            //更新本地分数
            that.updateScore(scores);
            that._iHotyi.iUserWinNum(function (data) {
                var returnData = data;
                if (returnData.Data.Statue) {
                    showPanel();
                } else {
                    window.location.href = that._config._errRedirect_1;
                }
            }, {WinNum: scores});
        }
    },

    //挑战成功 更新分数记录
    showSuccessPanel:function(scores){
        var that = this,
            s = that._gc._stage_top,
            showPanel = function (data) {
                var mask = KWhaleUtils.getMask("#0b0100", 0.8);
                s.addChild(mask);
                var main = KWhaleUtils.getBmpByName("common_success");
                KWhaleUtils.AddStageByScaleHNoCheck(s, main, 297 / 1135);
                main.y = s.sh / 1135 * 378;
                main.x = s.sw / 2;

                var text;
                if (scores > 1000) {
                    text = new Text(scores + "", "微软雅黑", s.sh / 1135 * 70, "#d8b656");
                    text.x = s.sw / 2 - s.sh / 1135 * 64 + s.sh / 1135 * 191 / 2 - text.width / 2;
                    text.y = s.sh / 1135 * 446;
                } else {
                    text = new Text(scores + "", "微软雅黑", s.sh / 1135 * 95, "#d8b656");
                    text.x = s.sw / 2 - s.sh / 1135 * 64 + s.sh / 1135 * 191 / 2 - text.width / 2;
                    text.y = s.sh / 1135 * 446;
                }
                s.addChild(text);
                //gameReplay
                var btn = new Shape.Rectangle({x: 0, y: 0}, s.sh / 1135 * 436, s.sh / 1135 * 102, "red");
                btn.x = (s.sw - btn.width) / 2;
                btn.y = s.sh / 1135 * 571;
                new KEvent(btn, {type: "touchstart"}, function () {
                    btn.evtObject.destory();
                    s.removeChild(main);
                    s.removeChild(mask);
                    s.removeChild(text);
                    that.showLotteryPanel(data);
                });
            };
        if(that._gc._isTest){
            console.log("调试模式：挑战成功页面")
            showPanel();
        }else {
            //更新本地分数
            that.updateScore(scores);
            that._iHotyi.iUserWinNum(function (data) {
                var returnData = data;
                if (returnData.Data.Statue) {
                    that._iHotyi.iUserRecord(function(data2) {
                        var jsonObj = data2;
                        console.log(jsonObj)
                        if (jsonObj.Data.IsDraw) {
                            if (jsonObj.Data.IsWin) {
                                //中奖了
                                /*
                                 *  var data = JSON.parse(data1);
                                 if(data.Code==1){
                                 var userData = data.Data;
                                 * */
                                var userData = jsonObj.Data.WinAward[0];
                                if (userData.UserName.trim() != "") {
                                    //填写过了
                                    that.showPricePanel(true, {
                                        AwardImg: userData.AwardImg,
                                        AwardName: userData.AwardName,
                                        UserName: userData.UserName,
                                        UserPhone: userData.UserPhone,
                                        UserAddress: userData.UserAddress,
                                        AwardID: userData.Id
                                    });
                                } else {
                                    //非填写过
                                    that.showPricePanel(false, {
                                        AwardImg: userData.AwardImg,
                                        AwardName: userData.AwardName,
                                        UserName: userData.UserName,
                                        UserPhone: userData.UserPhone,
                                        UserAddress: userData.UserAddress,
                                        AwardID: userData.Id
                                    });
                                }
                            } else {
                                //不中奖
                                that.showUnLuckeyPanel();
                            }
                        } else {
                            //没抽奖
                            showPanel();
                        }
                    });
                } else {
                    window.location.href = that._config._errRedirect_1;
                }
            }, {WinNum: scores});
        }
    },

    //抽奖页面
    showLotteryPanel:function(){
        var that = this,
            s = that._gc._stage_top;

        var mask = KWhaleUtils.getMask("#0b0100",0.8);
        s.addChild(mask);

        var t1 = KWhaleUtils.getBmpByName("common_lottery_t1");
        KWhaleUtils.AddStageByScaleHNoCheck(s,t1,93/1135);
        t1.y = s.sh/1135*260;
        t1.x = 0 - t1.width/2;

        var t2 = KWhaleUtils.getBmpByName("common_lottery_t2");
        KWhaleUtils.AddStageByScaleHNoCheck(s,t2,52/1135);
        t2.y = s.sh/1135*365;
        t2.x = s.sw + t2.width/2;

        KWhaleUtils.Tween(t1,{x: s.sw/2},0,300,TWEEN.Easing.Quadratic.InOut).start();
        KWhaleUtils.Tween(t2,{x: s.sw/2},0,300,TWEEN.Easing.Quadratic.InOut).start();

        var box = KWhaleUtils.getBmpByName("common_lottery_box");
        KWhaleUtils.AddStageByScaleHNoCheck(s,box,339/1135);
        box.anchorY=0.5;
        box.y = s.sh/1135*632;
        box.x = s.sw/2;
        box.scale=0;
        KWhaleUtils.Tween(box,{scale:1},0,400,TWEEN.Easing.Back.Out).start().onComplete(function () {
            var btn = new Shape.Rectangle({x:0,y:0}, s.sh/1135*339,s.sh/1135*339,"red");
            btn.x = (s.sw-btn.width)/2;
            btn.y = s.sh/1135*464;

            new KEvent(btn,{type:"touchstart"}, function () {
                btn.evtObject.destory();
                tw.stop();
                s.removeChild(mask);
                s.removeChild(box);
                s.removeChild(t1);
                s.removeChild(t2);
                s.removeChild(t3);
                that._iHotyi.iGetDraw(function(data1) {
                    var data = data1;
                    var userData = data.Data;
                    if (userData.IsWin) {
                        //中奖了
                        that.showPricePanel(false, {
                            AwardImg: userData.AwardImg,
                            AwardName: userData.AwardName,
                            UserName: userData.UserName,
                            UserPhone: userData.UserPhone,
                            UserAddress: userData.UserAddress,
                            AwardID: userData.AwardID
                        });
                    } else {
                        that.showUnLuckeyPanel();
                    }
                });
            });
        });
        var t3 = KWhaleUtils.getBmpByName("common_lottery_t3");
        KWhaleUtils.AddStageByScaleHNoCheck(s,t3,200/1135);
        t3.x = s.sw/2;
        t3.y = s.sh/1135*832;
        t3.alpha=0;
        var tw ;
        var st = setTimeout(function () {
            tw = KWhaleUtils.Tween_Loop(t3,{alpha:0.7,y:s.sh/1135*702},0,1200,TWEEN.Easing.Quadratic.Out).start();
            clearTimeout(st);
        },400);
    },

    //中奖页面
    showPricePanel:function(inputed,data){
        var that = this,
            s = that._gc._stage_top;
        window["isCanTouch"]=true;
        var mask = KWhaleUtils.getMask("#0b0100",0.8);
        s.addChild(mask);
        var main = KWhaleUtils.getBmpByName("common_price");
        KWhaleUtils.AddStageByScaleHNoCheck(s,main,1);
        main.x = s.sw/2;

        var text_name = new Form.Text((s.sw-s.sh/1135*430)/2,s.sh/1135*486, s.sh/1135*410, s.sh/1135*82);
        text_name.setNormalText("请填写你的姓名");
        var text_phone = new Form.Text((s.sw-s.sh/1135*430)/2,s.sh/1135*598, s.sh/1135*410, s.sh/1135*82);
        text_phone.setNormalText("请填写你的电话");
        var text_add = new Form.Text((s.sw-s.sh/1135*430)/2,s.sh/1135*703, s.sh/1135*410, s.sh/1135*82);
        text_add.setNormalText("请填写你的地址");

        var priceName = KWhaleUtils.addDomByScale(s,38/1135,"auto",404/1135,data.AwardName);
        priceName.style.color="#FFFFFF";
        priceName.style.textAlign="center";
        priceName.style.width = s.sw/KWRatio+"px";
        document.body.appendChild(priceName);
        var priceImg = null;
        KWhaleUtils.getImgBySrcAndCall(data.AwardImg, function (img) {
            priceImg = new Bitmap(img);
            KWhaleUtils.AddStageByScaleHNoCheck(s,priceImg,164/1135);
            priceImg.anchorX=0.5;
            priceImg.x = s.sw/2;
            priceImg.anchorY = 0.5;
            priceImg.y = s.sh*310/1135;
        });

        if(inputed){
            //填写资料后进来的面板
            window["isCanTouch"]=false;
            text_name.ele.value = data.UserName;
            text_phone.ele.value = data.UserPhone;
            text_add.ele.value = data.UserAddress;

            main.img = RES.getRES("common_price_inputed");
            var btn_replay = new Shape.Rectangle({x:0,y:0}, s.sh/1135*436,s.sh/1135*96,"red");
            btn_replay.x = (s.sw-btn_replay.width)/2;
            btn_replay.y = s.sh/1135*850;
            new KEvent(btn_replay,{type:"touchstart"}, function () {
                btn_replay.evtObject.destory();
                document.body.removeChild(text_name.ele);
                document.body.removeChild(text_phone.ele);
                document.body.removeChild(text_add.ele);
                document.body.removeChild(priceName);
                s.removeChild(mask);
                s.removeChild(main);
                s.removeChild(priceImg);
                that._gc.gameReplay();
                window["isCanTouch"]=false;
            });
        }else{
            //没有填写进来 显示的面板
            var btn_replay = new Shape.Rectangle({x:0,y:0}, s.sh/1135*436,s.sh/1135*96,"red");
            btn_replay.x = (s.sw-btn_replay.width)/2;
            btn_replay.y = s.sh/1135*910;
            new KEvent(btn_replay,{type:"touchstart"}, function () {
                btn_replay.evtObject.destory();
                btn_save.evtObject.destory();
                document.body.removeChild(text_name.ele);
                document.body.removeChild(text_phone.ele);
                document.body.removeChild(text_add.ele);
                document.body.removeChild(priceName);
                s.removeChild(mask);
                s.removeChild(main);
                s.removeChild(priceImg);
                that._gc.gameReplay();
                window["isCanTouch"]=false;
            });

            var btn_save = new Shape.Rectangle({x:0,y:0}, s.sh/1135*436,s.sh/1135*96,"red");
            btn_save.x = (s.sw-btn_save.width)/2;
            btn_save.y = s.sh/1135*810;
            new KEvent(btn_save,{type:"touchstart"}, function () {
                btn_save.evtObject.destory();
                //check input data
                if (text_name.ele.value.trim() == "") {
                    alert("请输入您的姓名");
                    btn_save.evtObject.reAdd();
                    return;
                }
                if (text_phone.ele.value.trim() == "") {
                    alert("请输入您的电话");
                    btn_save.evtObject.reAdd();
                    return;
                }
                var reg2 = new RegExp("^[0-9]{7,13}$");
                if (!reg2.test(text_phone.ele.value.trim())) {
                    alert("请您输入有效的手机号码");
                    btn_save.evtObject.reAdd();
                    return;
                }
                if (text_add.ele.value.trim() == "") {
                    alert("请输入您的地址");
                    btn_save.evtObject.reAdd();
                    return;
                }
                //svae info
                /*AwardImg:userData.AwardImg,
                 AwardName:userData.AwardName,
                 UserName:userData.UserName,
                 UserPhone:userData.UserPhone,
                 UserAddress:userData.UserAddress,
                 AwardID:userData.AwardID*/
                var newdata = {
                    UserName:text_name.ele.value,
                    UserPhone:text_phone.ele.value,
                    UserAddress:text_add.ele.value,
                    AwardID:data.AwardID
                }
                that._iHotyi.iSaveInfo(function (data2) {
                    var jsobj = data2;
                    if (jsobj.Data.Statue) {
                        main.img = RES.getRES("common_price_inputed");
                        btn_replay.x = (s.sw - btn_replay.width) / 2;
                        btn_replay.y = s.sh / 1135 * 850;
                        window["isCanTouch"] = false;
                        alert("提交成功！");
                    } else {
                        window.location.href = that._config._errRedirect_1;
                    }
                },newdata);
            });
        }
    },

    //不中奖页面
    showUnLuckeyPanel:function(){
        var that = this,
            s = that._gc._stage_top;
        var mask = KWhaleUtils.getMask("#0b0100",0.8);
        s.addChild(mask);

        var main = KWhaleUtils.getBmpByName("common_unluckey");
        KWhaleUtils.AddStageByScaleHNoCheck(s,main,299/1135);
        main.y = s.sh/1135*378;
        main.x = s.sw/2;

        var btn = new Shape.Rectangle({x:0,y:0}, s.sh/1135*436,s.sh/1135*102,"red");
        btn.x = (s.sw-btn.width)/2;
        btn.y = s.sh/1135*551;
        new KEvent(btn,{type:"touchstart"}, function () {
            btn.evtObject.destory();
            s.removeChild(main);
            s.removeChild(mask);
            that._gc.gameReplay();
        });
    }
}