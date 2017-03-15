function GC(stage_bg,stage_main,stage_top){
    /* 场景 */
    this._stage_bg = stage_bg;
    this._stage_main = stage_main;
    this._stage_top = stage_top;
    this._targetScore = 0;/*挑战成功所需分数*/
    this._currentScore = 0;/*游戏当前分数*/
    this._isGameStart = false;
    this._scene = null;
    this._panel = new Panel(this);
    this._choosePass = [true,false,false];
    this._interface = new IHotyi();
    //World.ISTEST=true;
    this.getInfo();
    this.curTime=null;
    this.lastTime=null;
};

GC.IsGameOver = false;

GC.prototype={
    //根据接口展示不同页面
    getInfo: function () {
        var that = this;
        if (window["isShare"]) {
            var userObj = {
                UserID: json_UserId.UserID
            };
        } else {
            var userObj = {
                UserID: ""
            };
        }
        //that._interface.iUserRecord(function(data){
            //window["userJson"] = JSON.parse(data);
            //朋友打开
        /*window["userJson"] = {
            "Code": 1,
            "Msg": "",
            "Data": {
                "UserID": 2,
                "UserLogo": "http://wx.qlogo.cn/mmopen/icemUk7n2g3icC1tgx27HOFILbsQSmt6CGGxfUVmb6X3UWN6oANDF4lP542BJicC8kes8HL6hOlmD4huygJHcaFjygK23N6sz4r/0",
                "NickName": "Winnie晴",
                "MaxWinNum": 83,
                "UserName": "如果对方的",
                "UserPhone": "5632453425234",
                "UserAddress": "儿童玩儿特突然v",
                "GiftsList": [{
                    "GiftID": 1,
                    "GiftName": "普通礼盒",
                    "RuleTime": 30,
                    "GiftCondition": 30,
                    "GiftStatue": true,
                    "IsOpen": true,
                    "IsWin": true,
                    "AwardID": 1,
                    "PassNum": 49,
                    "AwardName": "豪华记忆枕",
                    "AwardImg": "../../Content/Images/AwardImg/j2.png",
                    "AwardDesc": "豪华记忆枕",
                    "ChanceKey": "PADDFDJA2A",
                    "Isuse": false
                }, {
                    "GiftID": 2,
                    "GiftName": "白金礼盒",
                    "RuleTime": 20,
                    "GiftCondition": 40,
                    "GiftStatue": false,
                    "IsOpen": false,
                    "IsWin": false,
                    "AwardID": 0,
                    "PassNum": 34,
                    "AwardName": "",
                    "AwardImg": "",
                    "AwardDesc": "",
                    "ChanceKey": "",
                    "Isuse": false
                }, {
                    "GiftID": 3,
                    "GiftName": "黄金礼盒",
                    "RuleTime": 20,
                    "GiftCondition": 50,
                    "GiftStatue": false,
                    "IsOpen": false,
                    "IsWin": false,
                    "AwardID": 0,
                    "PassNum": 0,
                    "AwardName": "",
                    "AwardImg": "",
                    "AwardDesc": "",
                    "ChanceKey": "",
                    "Isuse": false
                }]
            }
        }*/

        window["userJson"] = {
            "Code": 1, "Msg": "", "Data": {
                "UserID": 1,
                "UserLogo": "http:\/\/wx.qlogo.cn\/mmopen\/oTicPgWuwSmBibHabuj4x77hSibyX18Vq2WaOzzx3N6u9rrBYjI6mKgEbq8UgITBLWebZ0CIUjtXuhAuLHwTyicAUJbiaPI1kR5ON\/64",
                "NickName": "\ue110\u73b2\ue347",
                "MaxWinNum": 0,
                "UserName": "",
                "UserPhone": "",
                "UserAddress": "",

                "GiftsList": [{
                    "GiftID": 1,
                    "GiftName": "gift1",
                    "RuleTime": 5,
                    "GiftCondition": 5,
                    "GiftStatue": false,
                    "IsOpen": false,
                    "IsWin": false,
                    "AwardID": 0,
                    "AwardName": null,
                    "AwardDesc": null,
                    "AwardImg": "../../Content/Images/img/j4.png",
                    "ChanceKey": "P00001",
                    "PassNum": 0,
                    "IsUse ": true
                },

                    {
                        "GiftID": 2,
                        "GiftName": "gift2",
                        "RuleTime": 15,
                        "GiftCondition": 10,
                        "GiftStatue": false,
                        "IsOpen": false,
                        "IsWin": false,
                        "AwardID": 0,
                        "AwardName": null,
                        "AwardDesc": null,
                        "AwardImg": null,
                        "ChanceKey": "P00001",
                        "PassNum": 0,
                        "IsUse ": true
                    },

                    {
                        "GiftID": 3,
                        "GiftName": "gift3",
                        "RuleTime": 10,
                        "GiftCondition": 15,
                        "GiftStatue": false,
                        "IsOpen": false,
                        "IsWin": false,
                        "AwardID": 0,
                        "AwardName": null,
                        "AwardDesc": null,
                        "AwardImg": null,
                        "ChanceKey": "P00001",
                        "PassNum": 0,
                        "IsUse": true
                    }]
            }
        };
        if (window["userJson"].Code === 1) {
            that.gameInit();
        } else {
            alert(window["userJson"].Msg);
        }

        //},userObj);
    },

    gameInit:function(){
        this._panel.showStartPanel();
    },
    gameStart:function(){
        var that = this;
        //TODO: 游戏开始 比如初始化场景
    },

    //在适合的地方直接调用就好了
    gameOver:function(type) {
        var that = this,
            index = type-1;
        //TODO:做一些必要的 与游戏逻辑相关的处理
        //暂停播放音乐
        var music = document.getElementById('music');
        music.pause();
        music.currentTime = 0;
        that._stage_bg.isAction = true;
        if(that._currentScore>window["userJson"].Data.GiftsList[index].PassNum) {
            window["userJson"].Data.GiftsList[index].PassNum = that._currentScore;
        }
        /*var scoreAll = that._scoreAll[0]+that._scoreAll[1]+that._scoreAll[2];
        console.log(that._scoreAll,scoreAll);*/
        if (that._currentScore >= window["userJson"].Data.GiftsList[index].GiftCondition) {
            that._choosePass[index+1] = true;
            if(window["userJson"].Data.GiftsList[index].GiftStatue) {
                //没有礼盒
                that._panel.winPanel(type);
            } else {
                //有礼盒
                window["userJson"].Data.GiftsList[index].GiftStatue = true;
                that._panel.saveDataPanel(type);
            }
        } else {
            //alert("you lose");
            that._panel.losePanel(type);
        }
        var scoreObj = {
            "WinNum": that._currentScore,
            "Pass":type
        };
        //that._interface.iUserWinNum(function(data){
            //var scoreJson = JSON.parse(data);
            var scoreJson = {"Code":1,"Msg":"","Data":{"Statue":true}};
            if(scoreJson.Code != 1) {
                alert("您的网络不给力，请稍后再试");
            } else {
                if(!scoreJson.Data.Statue){
                    alert("您的网络不给力，请稍后再试");
                }
            }
        //},scoreObj);
    },

    gameReplay:function(type){
        var that = this;
        that.clearAllStage();

        //that._panel.chooseScene();
        that._scene = new Scene(that,type);
    },

    //清空舞台的所有东西 包括事件dom
    clearAllStage:function(){
        var that = this;
        that._stage_bg.displayObjectSet=[];
        that._stage_main.displayObjectSet=[];
        that._stage_top.displayObjectSet=[];
        KEvent.RemoveAllEventObj();

        //TODO:
        that._currentScore = 0;
        that._scene = null;
        Gas.GasSet=[];
        Roo.RooSet=[];
    }
};