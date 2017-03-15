function Panel(gc){
    this._gc = gc;
}

Panel.prototype= {
    //显示游戏开始页面
    _title:null,
    _startBg:null,
    _maxScoreBox:null,
    _maxScore:null,
    _rankBtn:null,
    _player:null,
    _ruleBtn:null,
    _gamaStartBtn:null,
    _prizeBox:[
        {
            _bitmap:null,
            _cover:null,
            _name:null
        },
        {
            _bitmap:null,
            _cover:null,
            _name:null
        },
        {
            _bitmap:null,
            _cover:null,
            _name:null
        }
    ],
    showStartPanel: function (call) {
        var that = this,
            s_top = that._gc._stage_top;
        s_top.canvas.style.opacity = 0;
        KWhaleUtils.Tween(s_top.canvas.style, {opacity:1}, 0, 600, TWEEN.Easing.Linear.None).start()
            .onComplete(function () {
                if(call) {
                    call();
                }
            });
        that._gc._scene = null;
        that._startBg = that.createBitmap('a1',s_top,1,s_top.sw/2,s_top.sh/2);
        that._title = that.createBitmap('a2',s_top,207/1135,s_top.sw/2,s_top.sh/1135*40);
        that._title.anchorY = 0;
        that._player = that.createBitmap('a3',s_top,495/1135,s_top.sw/2,s_top.sh/1135*480);//480
        /*KWhaleUtils.Tween_YoYo(that._player,{y:s_top.sh/1135*490},0,1500,TWEEN.Easing.Quadratic.InOut).start();*/
        that._scoreBox = that.createBitmap('a4',s_top,156/1135,s_top.sw/2-s_top.sh/1135*246,s_top.sh/1135*381);
        that._rankBtn = that.createBitmap('a5',s_top,136/1135,s_top.sw/2+s_top.sh/1135*246,s_top.sh/1135*381);
        that._ruleBtn = that.createBitmap('a6',s_top,70/1135,s_top.sw/2-s_top.sh/1135*225,s_top.sh/1135*581);
        KWhaleUtils.Tween_YoYo(that._ruleBtn,{x:s_top.sw/2-s_top.sh/1135*195},0,1000,TWEEN.Easing.Quadratic.InOut).start();
        //reflashAttribute
        for(var i=0;i<3;i++) {
            that._prizeBox[i]._bitmap = that.createBitmap('b'+(i+4),s_top,179/1135,s_top.sw/2,s_top.sh/1135*898);
            that._prizeBox[i]._cover = that.createBitmap('b7',s_top,179/1135,s_top.sw/2,s_top.sh/1135*898);
            that._prizeBox[i]._name = that.createBitmap('a'+(i+9),s_top,36/1135,s_top.sw/2,s_top.sh/1135*1020);
            s_top.removeChild(that._prizeBox[i]._cover);
        }
        that._prizeBox[0]._bitmap.x = that._prizeBox[0]._cover.x = that._prizeBox[0]._name.x = s_top.sw/2-s_top.sh/1135*205;
        that._prizeBox[2]._bitmap.x = that._prizeBox[2]._cover.x = that._prizeBox[2]._name.x = s_top.sw/2+s_top.sh/1135*205;

        var scoreAll = window["userJson"].Data.GiftsList[0].PassNum+window["userJson"].Data.GiftsList[1].PassNum+
            window["userJson"].Data.GiftsList[2].PassNum;
        if (window["userJson"].Data.MaxWinNum < scoreAll) {
            window["userJson"].Data.MaxWinNum = scoreAll;
        }
        that._maxScore = new Text(window["userJson"].Data.MaxWinNum,"Arial",s_top.sh/1135*52,"#e85e4f");
        that._maxScore.y= that._scoreBox.y;
        that._maxScore.x= that._scoreBox.x-that._maxScore.width/2;
        s_top.addChild(that._maxScore);

        new KEvent(that._rankBtn, {type: "touchend"}, function () {
            that.showRankingList();
        });

        new KEvent(that._ruleBtn, {type: "touchend"}, function () {
            that.rulePannel();
        });
        that._ruleBtn.isAutoReflash=true;

        //是否为好友分享页
        if(window["isShare"]){
            console.log('share');
            that._gamaStartBtn = that.createBitmap('a8',s_top,109/1135,s_top.sw/2,s_top.sh/1135*735);
            new KEvent(that._gamaStartBtn, {type: "touchend"}, function () {
                that._gamaStartBtn.evtObject.destory();
                that.hideStartPanel();
                window.location.href = "index.html";
                //window.location.href = "/Index/index";
            });
            var prizeInfo = function(i) {
                if(window["userJson"].Data.GiftsList[i].GiftStatue) {
                    //获得开启资格
                    that._prizeBox[i]._bitmap.img = RES.getRES('b' + (i+1));
                }
            };
            for(var i= 0,l=window["userJson"].Data.GiftsList.length;i<l;i++){
                prizeInfo(i);
            }
        } else {
            that._gamaStartBtn = that.createBitmap('a7',s_top,109/1135,s_top.sw/2,s_top.sh/1135*735);
            new KEvent(that._gamaStartBtn, {type: "touchend"}, function () {
                that._gamaStartBtn.evtObject.destory();
                that.hideStartPanel();
                that.chooseScene();
            });
            var prizeInfo = function(index) {
                if(window["userJson"].Data.GiftsList[index].GiftStatue) {
                    that._gc._choosePass[index+1] = true;
                    //获得开启资格
                    that._prizeBox[index]._bitmap.img = RES.getRES('b'+(index+1));
                    if(window["userJson"].Data.GiftsList[index].IsOpen) {
                        //已打开
                        if(window["userJson"].Data.GiftsList[index].IsWin) {
                            //中奖
                            that._prizeBox[index]._cover.img = RES.getRES('b8');
                            s_top.addChild(that._prizeBox[index]._cover);
                            new KEvent(that._prizeBox[index]._bitmap, {type: "touchend"}, function () {
                                //that._prizeBox[index]._bitmap.evtObject.destory();
                                that.showPrizePanel(index);
                            });
                        } else {
                            //没中奖
                            that._prizeBox[index]._cover.img = RES.getRES('b7');
                            s_top.addChild(that._prizeBox[index]._cover);
                        }
                    } else {
                        //还没打开
                        var seal = false;
                        that._prizeBox[index]._bitmap.rotation = -10;
                        var yoyo = KWhaleUtils.Tween_YoYo(that._prizeBox[index]._bitmap,{rotation:10},0,100,TWEEN.Easing.Quadratic.InOut).start();
                        new KEvent(that._prizeBox[index]._bitmap, {type: "touchend"}, function () {
                            if(window["userJson"].Data.UserName == "") {
                                that.saveDataPanel(index+1);
                            } else {
                                yoyo.stop();
                                that._prizeBox[index]._bitmap.rotation = 0;
                                //抽奖
                                if (!seal) {
                                    that._prizeBox[index]._bitmap.evtObject.destory();
                                    var getDrawObj = {
                                        "GiftID": window["userJson"].Data.GiftsList[index].GiftID
                                    };
                                    //that._gc._interface.iGetDraw(function (data) {
                                    //var getDrawJson = JSON.parse(data);
                                    var getDrawJson = {
                                        "Code": 1, "Msg": "", "Data": {
                                            "IsWin": true,
                                            "AwardID": 3,
                                            "AwardName": "../../Content/Images/img/j4.png",
                                            "AwardDesc": "\u4eac\u6771\u512a\u60e0\u5238",
                                            "AwardImg": "../../Content/Images/img/j4.png",
                                            "ChanceKey": "P00001"
                                        }
                                    };
                                    if (getDrawJson.Code != 1) {
                                        alert(getDrawJson.Msg);
                                        seal = true;
                                        that._prizeBox[index]._bitmap.evtObject.reAdd();
                                    } else {
                                        window["userJson"].Data.GiftsList[index].IsOpen = true;
                                        if (getDrawJson.Data.IsWin) {
                                            window["userJson"].Data.GiftsList[index].IsWin = true;
                                            window["userJson"].Data.GiftsList[index].AwardID = getDrawJson.Data.AwardID;
                                            window["userJson"].Data.GiftsList[index].AwardName = getDrawJson.Data.AwardName;
                                            window["userJson"].Data.GiftsList[index].AwardDesc = getDrawJson.Data.AwardDesc;
                                            window["userJson"].Data.GiftsList[index].ChanceKey = getDrawJson.Data.ChanceKey;
                                            window["userJson"].Data.GiftsList[index].AwardImg = getDrawJson.Data.AwardImg;
                                            that._prizeBox[index]._cover.img = RES.getRES('b8');
                                            s_top.addChild(that._prizeBox[index]._cover);
                                            that.showPrizePanel(index);
                                            new KEvent(that._prizeBox[index]._bitmap, {type: "touchend"}, function () {
                                                that.showPrizePanel(index);
                                            });
                                        } else {
                                            window["userJson"].Data.GiftsList[index].IsWin = false;
                                            that._prizeBox[index]._cover.img = RES.getRES('b7');
                                            s_top.addChild(that._prizeBox[index]._cover);
                                            that.showNoPrizePanel();
                                        }
                                    }
                                    //}, getDrawObj);
                                }
                            }
                        });
                    }
                }
            };
            for(var i= 0,l=window["userJson"].Data.GiftsList.length;i<l;i++){
                prizeInfo(i);
            }
        }
    },
    hideStartPanel: function () {
        var that = this,
            s_top = that._gc._stage_top;
        KEvent.RemoveAllEventObj();
        s_top.canvas.style.opacity = 1;
        KWhaleUtils.Tween(s_top.canvas.style, {opacity:0}, 0, 500, TWEEN.Easing.Linear.None).start()
            .onComplete(function() {
                s_top.displayObjectSet=[];
                s_top.canvas.style.opacity = 1;
            });
    },
    //中奖弹窗
    _prizeImg:null,
    _btnBoxS1:null,
    _btnBoxS2:null,
    _btnText1:null,
    _btnText2:null,
    _AddressInp:null,
    showPrizePanel: function (index) {
        var that = this,
            s_top = that._gc._stage_top;
        window["isCanTouch"]=true;
        window["isCanMove"]=true;
        var startZ = s_top.canvas.style.zIndex;
        s_top.canvas.style.zIndex=99;
        that._mask = KWhaleUtils.getMask("#0b0100",0.8);
        s_top.addChild(that._mask);

        that._popupBox=that.createBitmap('j1',s_top,682/1135,s_top.sw/2,s_top.sh/1135*636);
        that._titleBox=that.createBitmap('z2',s_top,200/1135,s_top.sw/2,that._popupBox.y-s_top.sh/1135*390);
        that._closeBtn= new Shape.Rectangle({x:that._titleBox.x+s_top.sh/1135*263,y:that._titleBox.y-s_top.sh/1135*56},
            s_top.sh/1135*56, s_top.sh/1135*56,"rgba(0,0,0,0)");
        that._closeBtn.anchorX=that._closeBtn.anchorY=0.5;
        s_top.addChild(that._closeBtn);

        //奖品图
        KWhaleUtils.getImgBySrcAndCall(window["userJson"].Data.GiftsList[index].AwardImg,function(img){

            that._prizeImg = new Bitmap(img);
            KWhaleUtils.AddStageByScaleHNoCheck(s_top,that._prizeImg,225/1135);
            that._prizeImg.anchorX= that._prizeImg.anchorY=0.5;
            that._prizeImg.x=s_top.sw/2;
            that._prizeImg.y=that._popupBox.y-s_top.sh/1135*78;
        });

        that._AddressInp = new Form.Text((s_top.sw/2+s_top.sh/1135*100)/2,that._popupBox.y+s_top.sh/1135*58, s_top.sh/1135*320, s_top.sh/1135*70);
        that._AddressInp.ele.style.fontSize=s_top.sh/1135*25/window["KWRatio"] + "px";
        that._AddressInp.ele.style.lineHeight=s_top.sh/1135*70/window["KWRatio"] + "px";
        that._AddressInp.ele.style.color="#636867";
        that._AddressInp.ele.style.zIndex=100;

        //是否保存信息
        if(window["userJson"].Data.UserAddress != "" ) {
            window["isCanTouch"]=false;
            window["isCanMove"]=false;
            that._AddressInp.ele.value = window["userJson"].Data.UserAddress;
            that._btnBoxS2 = that.createBitmap('nn2', s_top, 77 / 1135, s_top.sw / 2, that._popupBox.y + s_top.sh / 1135 * 204);

            that._btnText2 = new Text("附近门店", "Helvetica", s_top.sh / 1135 * 30, "#fff");
            that._btnText2.y = that._btnBoxS2.y + s_top.sh / 1135 * 10;
            that._btnText2.x = that._btnBoxS2.x - that._btnText2.width / 2;
            s_top.addChild(that._btnText2);
            //附近门店
            new KEvent(that._btnBoxS2, {type: "touchend"}, function () {
                that._btnBoxS2.evtObject.destory();
                s_top.canvas.style.zIndex = startZ;
                window.location.href = "http://www.paterson.com.cn/?list-712.html";
            });
            that._btnBoxS2.evtObject.ele.style.zIndex = 100;

            new KEvent(that._closeBtn, {type: "touchend"}, function () {
                that._closeBtn.evtObject.destory();
                s_top.canvas.style.zIndex = startZ;
                window["isCanTouch"]=false;
                window["isCanMove"]=false;
                that.hidePrizePanel(0);
            });
            that._closeBtn.evtObject.ele.style.zIndex = 100;
        } else {
            that._btnBoxS1 = that.createBitmap('nn3', s_top, 77 / 1135, s_top.sw / 2 - s_top.sh / 1135 * 122, that._popupBox.y + s_top.sh / 1135 * 204);
            that._btnBoxS2 = that.createBitmap('nn3', s_top, 77 / 1135, s_top.sw / 2 + s_top.sh / 1135 * 122, that._popupBox.y + s_top.sh / 1135 * 204);
            that._btnText1 = new Text("保存信息", "Helvetica", s_top.sh / 1135 * 30, "#fff");
            that._btnText1.y = that._btnBoxS1.y + s_top.sh / 1135 * 10;
            that._btnText1.x = that._btnBoxS1.x - that._btnText1.width / 2;
            s_top.addChild(that._btnText1);

            that._btnText2 = new Text("附近门店", "Helvetica", s_top.sh / 1135 * 30, "#fff");
            that._btnText2.y = that._btnBoxS2.y + s_top.sh / 1135 * 10;
            that._btnText2.x = that._btnBoxS2.x - that._btnText2.width / 2;
            s_top.addChild(that._btnText2);
            //附近门店
            new KEvent(that._btnBoxS2, {type: "touchend"}, function () {
                that._btnBoxS2.evtObject.destory();
                s_top.canvas.style.zIndex = startZ;
                window.location.href = "http://www.paterson.com.cn/?list-712.html";
            });
            that._btnBoxS2.evtObject.ele.style.zIndex = 100;

            new KEvent(that._closeBtn, {type: "touchend"}, function () {
                that._closeBtn.evtObject.destory();
                s_top.canvas.style.zIndex = startZ;
                window["isCanTouch"]=false;
                window["isCanMove"]=false;
                that.hidePrizePanel(1);
            });
            that._closeBtn.evtObject.ele.style.zIndex = 100;

            new KEvent(that._btnBoxS1, {type: "touchend"}, function () {
                that._btnBoxS1.evtObject.destory();
                if (that._AddressInp.ele.value.trim() == "") {
                    alert("请输入您的地址");
                    that._btnBoxS1.evtObject.reAdd();
                    return;
                }
                var AddressData = {
                    UserAddress: that._AddressInp.ele.value
                };
                //that._gc._interface.iSaveAdressInfo(function (data) {
                    //var jsObj = JSON.parse(data);
                    var jsObj = {"Code": 1, "Msg": "", "Data": {"Statue": true}};
                    if (jsObj.Code == 1) {
                        if (jsObj.Data.Statue) {
                            that._AddressInp.ele.readOnly = "readonly";
                            window["isCanTouch"] = false;
                            window["isCanMove"]=false;
                            s_top.removeChild(that._btnBoxS1);
                            s_top.removeChild(that._btnBoxS2);
                            s_top.removeChild(that._btnText1);
                            s_top.removeChild(that._btnText2);
                            that._btnBoxS2.evtObject.destory();
                            window["userJson"].Data.UserAddress = that._AddressInp.ele.value;
                            that._AddressInp.ele.value = that._AddressInp.ele.value;
                            that._btnBoxS2 = that.createBitmap('nn2', s_top, 77 / 1135, s_top.sw / 2, that._popupBox.y + s_top.sh / 1135 * 204);
                            that._btnText2.x = that._btnBoxS2.x - that._btnText2.width / 2;
                            s_top.addChild(that._btnText2);
                            new KEvent(that._btnBoxS2, {type: "touchend"}, function () {
                                that._btnBoxS2.evtObject.destory();
                                s_top.canvas.style.zIndex = startZ;
                                window.location.href = "http://www.paterson.com.cn/?list-712.html";
                            });
                            that._btnBoxS2.evtObject.ele.style.zIndex = 100;
                            return;
                        } else {
                            alert(jsObj.Msg);
                            that._btnBoxS1.evtObject.reAdd();
                        }
                    } else {
                        alert("您的网络不给力，请稍后再试");
                    }
                //},AddressData);
            });
            that._btnBoxS1.evtObject.ele.style.zIndex = 100;
        }
    },
    hidePrizePanel: function (index) {
        var that = this,
            s_top = that._gc._stage_top;
        that._btnBoxS2.evtObject.destory();
        console.log(that._btnBoxS1);
        if (index !=0) {//(that._btnBoxS1) {
            console.log('1');
            s_top.removeChild(that._btnBoxS1);
            that._btnBoxS1.evtObject.destory();
        }
        s_top.removeChild(that._popupBox);
        s_top.removeChild(that._titleBox);
        s_top.removeChild(that._closeBtn);
        s_top.removeChild(that._prizeImg);
        s_top.removeChild(that._btnBoxS2);
        s_top.removeChild(that._btnText1);
        s_top.removeChild(that._btnText2);
        document.body.removeChild(that._AddressInp.ele);
        s_top.removeChild(that._mask);
    },

    //没中奖弹窗
    _titleBox:null,
    _closeBtn:null,
    _popupBox:null,
    _btnBoxL:null,
    _btnText:null,
    _mask:null,
    showNoPrizePanel: function () {
        var that = this,
            s_top = that._gc._stage_top;

        var startZ = s_top.canvas.style.zIndex;
        s_top.canvas.style.zIndex=99;
        that._mask = KWhaleUtils.getMask("#0b0100",0.8);
        s_top.addChild(that._mask);

        that._popupBox=that.createBitmap('k1',s_top,405/1135,s_top.sw/2,s_top.sh/1135*614);
        that._titleBox=that.createBitmap('z2',s_top,200/1135,s_top.sw/2,that._popupBox.y-that._popupBox.height/2);
        that._closeBtn= new Shape.Rectangle({x:that._titleBox.x+s_top.sh/1135*263,y:that._titleBox.y-s_top.sh/1135*56},
            s_top.sh/1135*56, s_top.sh/1135*56,"rgba(0,0,0,0)");
        that._closeBtn.anchorX=that._closeBtn.anchorY=0.5;
        s_top.addChild(that._closeBtn);
        that._btnBoxL = that.createBitmap('nn2',s_top,77/1135,s_top.sw/2,that._popupBox.y+s_top.sh/1135*82);
        that._btnText = new Text("再次挑战","Helvetica",s_top.sh/1135*30,"#fff");
        that._btnText.y= that._btnBoxL.y + s_top.sh/1135*10;
        that._btnText.x= that._btnBoxL.x-that._btnText.width/2;
        s_top.addChild(that._btnText);


        new KEvent(that._closeBtn, {type: "touchend"}, function () {
            that._closeBtn.evtObject.destory();
            s_top.canvas.style.zIndex=startZ;
            that.hideNoPrizePanel();
        });
        that._closeBtn.evtObject.ele.style.zIndex=100;

        new KEvent(that._btnBoxL, {type: "touchend"}, function () {
            that._btnBoxL.evtObject.destory();
            s_top.canvas.style.zIndex=startZ;
            that.hideNoPrizePanel();
        });
        that._btnBoxL.evtObject.ele.style.zIndex=100;
    },
    hideNoPrizePanel: function () {
        var that = this,
            s_top = that._gc._stage_top;
        s_top.removeChild(that._popupBox);
        s_top.removeChild(that._titleBox);
        s_top.removeChild(that._closeBtn);
        s_top.removeChild(that._btnBoxL);
        s_top.removeChild(that._btnText);
        s_top.removeChild(that._mask);
    },

    //关卡选择页面
    _chooseBg:null,
    _returnBtn:null,
    _tips:null,
    _passBox:[
        {
            _bitmap:null,
            _lock:null,
            _tips:null
        },
        {
            _bitmap:null,
            _lock:null,
            _tips:null
        },
        {
            _bitmap:null,
            _lock:null,
            _tips:null
        }
    ],
    chooseScene: function () {
        var that = this,
            s_main = that._gc._stage_main;

        s_main.canvas.style.opacity = 0;
        KWhaleUtils.Tween(s_main.canvas.style, {opacity:1}, 0, 1000, TWEEN.Easing.Linear.None).start();
        that._chooseBg = that.createBitmap("c1",s_main,1,s_main.sw/2,s_main.sh/2);
        that._returnBtn = that.createBitmap("cc2",s_main,64/1135,s_main.sw/2-s_main.sh/1135*253,s_main.sh/1135*53);
        that._tips = that.createBitmap("cc3",s_main,33/1135,s_main.sw/2+s_main.sh/1135*67,s_main.sh/1135*55);
        that._passBox[0]._bitmap = that.createBitmap("c2",s_main,306/1135,s_main.sw/2,s_main.sh/1135*251);
        that._passBox[1]._bitmap = that.createBitmap("c3",s_main,306/1135,s_main.sw/2,that._passBox[0]._bitmap.y+s_main.sh/1135*339);
        that._passBox[2]._bitmap = that.createBitmap("c4",s_main,306/1135,s_main.sw/2,that._passBox[1]._bitmap.y+s_main.sh/1135*339);

        for(var i= 0;i<3;i++) {
            that._passBox[i]._lock = that.createBitmap("c5",s_main,239/1135,s_main.sw/2,that._passBox[i]._bitmap.y-s_main.sh/1135*30);
        }
        that._passBox[0]._tips = new Text(window["userJson"].Data.GiftsList[0].RuleTime+"秒内击退甲醛获得"+window["userJson"].Data.GiftsList[0].GiftCondition+"个袋鼠","Helvetica",s_main.sh/1135*24,"#fff");
        that._passBox[0]._tips.y= that._passBox[0]._bitmap.y + s_main.sh/1135*125;
        that._passBox[0]._tips.x= s_main.sw/2-that._passBox[0]._tips.width/2;
        s_main.addChild(that._passBox[0]._tips);

        that._passBox[1]._tips = new Text("完成关卡1即可解锁,"+window["userJson"].Data.GiftsList[1].RuleTime+"秒内击退甲醛获得"+window["userJson"].Data.GiftsList[1].GiftCondition+"个袋鼠","Helvetica",s_main.sh/1135*24,"#fff");
        that._passBox[1]._tips.y= that._passBox[1]._bitmap.y + s_main.sh/1135*125;
        that._passBox[1]._tips.x= s_main.sw/2-that._passBox[1]._tips.width/2;
        s_main.addChild(that._passBox[1]._tips);

        that._passBox[2]._tips = new Text("完成关卡2即可解锁,"+window["userJson"].Data.GiftsList[2].RuleTime+"秒内击退甲醛获得"+window["userJson"].Data.GiftsList[2].GiftCondition+"个袋鼠","Helvetica",s_main.sh/1135*24,"#fff");
        that._passBox[2]._tips.y= that._passBox[2]._bitmap.y + s_main.sh/1135*125;
        that._passBox[2]._tips.x= s_main.sw/2-that._passBox[2]._tips.width/2;
        s_main.addChild(that._passBox[2]._tips);

        new KEvent(that._returnBtn, {type: "touchend"}, function () {
            KEvent.RemoveAllEventObj();
            that.hideChoosePanel();
            that.showStartPanel();
        });

        var KEventBtn = function (i) {
            new KEvent(that._passBox[i]._bitmap, {type: "touchend"}, function () {
                KEvent.RemoveAllEventObj();
                s_main.displayObjectSet=[];
                that._gc._scene = new Scene(that._gc,i+1);
            });
        };
        for (var i= 0;i<3;i++) {
            if(that._gc._choosePass[i]){
                s_main.removeChild(that._passBox[i]._lock);
                KEventBtn(i)
            }
        }
    },
    hideChoosePanel: function () {
        var that = this,
            s_main = that._gc._stage_main;
        s_main.canvas.style.opacity = 1;
        KEvent.RemoveAllEventObj();
        KWhaleUtils.Tween(s_main.canvas.style, {opacity:0}, 0, 500, TWEEN.Easing.Linear.None).start()
            .onComplete(function() {
                s_main.displayObjectSet=[];
                s_main.canvas.style.opacity = 1;
            });
    },

    //分享页
    _black:null,
    _share_img:null,
    sharePanel: function () {
        var that = this,
            s_top = that._gc._stage_top;

        var startZ = s_top.canvas.style.zIndex;
        s_top.canvas.style.zIndex=99;

        that._mask = KWhaleUtils.getMask("#0b0100",0.8);
        s_top.addChild(that._mask);

        that._share_img = that.createBitmap("i1",s_top,529/1135,s_top.sw/2,s_top.sh/1135*41);
        that._share_img.anchorY = 0;

        new KEvent(that._mask, {type: "touchend"}, function () {
            that._mask.evtObject.destory();
            s_top.canvas.style.zIndex=startZ;
            //that._gc.clearAllStage();
            if (window["gc"]._scene) {
                that.showStartPanel(function() {
                    that._gc._stage_main.displayObjectSet=[];
                    that._gc._stage_bg.displayObjectSet=[];
                    //TODO:
                    that._gc._currentScore = 0;
                    that._gc._scene = null;
                    Gas.GasSet=[];
                    Roo.RooSet=[];
                });
            } else {
                s_top.removeChild(that._mask);
                s_top.removeChild(that._share_img);
                that.showStartPanel();
            }
        });
        that._mask.evtObject.ele.style.zIndex=100;
    },
    //成功页面,有礼盒
    _giftBox:null,
    _giftText:null,
    _nameInp:null,
    _phoneInp:null,
    saveDataPanel: function (type) {
        var that = this,
            s_top = that._gc._stage_top;
        window["isCanTouch"]=true;
        window["isCanMove"]=true;
        var startZ = s_top.canvas.style.zIndex;
        s_top.canvas.style.zIndex=99;
        that._mask = KWhaleUtils.getMask("#0b0100",0.8);
        s_top.addChild(that._mask);

        that._popupBox=that.createBitmap('g7',s_top,819/1135,s_top.sw/2,s_top.sh/1135*636);
        that._titleBox=that.createBitmap('z2',s_top,200/1135,s_top.sw/2,that._popupBox.y-s_top.sh/1135*405);
        that._closeBtn= new Shape.Rectangle({x:that._titleBox.x+s_top.sh/1135*263,y:that._titleBox.y-s_top.sh/1135*56},
            s_top.sh/1135*56, s_top.sh/1135*56,"rgba(0,0,0,0)");
        that._closeBtn.anchorX=that._closeBtn.anchorY=0.5;
        s_top.addChild(that._closeBtn);
        new KEvent(that._closeBtn, {type: "touchend"}, function () {
            that._closeBtn.evtObject.destory();
            s_top.canvas.style.zIndex = startZ;
            document.body.removeChild(that._nameInp.ele);
            document.body.removeChild(that._phoneInp.ele);
            KEvent.RemoveAllEventObj();
            /*s_top.removeChild(that._giftBox);
            s_top.removeChild(that._giftText);
            s_top.removeChild(that._nameInp);
            s_top.removeChild(that._phoneInp);
            s_top.removeChild(that._popupBox);
            s_top.removeChild(that._titleBox);
            s_top.removeChild(that._scoreNum);
            s_top.removeChild(that._btnBoxS1);
            s_top.removeChild(that._btnBoxS2);
            s_top.removeChild(that._btnText1);
            s_top.removeChild(that._btnText2);
            s_top.removeChild(that._mask);*/
            window["isCanTouch"]=false;
            window["isCanMove"]=false;
            s_top.displayObjectSet=[];
            that._gc._stage_bg.displayObjectSet=[];
            that._gc._stage_main.displayObjectSet=[];
            that._gc._currentScore = 0;
            that._gc._scene = null;
            Gas.GasSet=[];
            Roo.RooSet=[];
            that.chooseScene();
        });
        that._closeBtn.evtObject.ele.style.zIndex = 100;

        if (window["gc"]._scene) {
            console.log("0",window["gc"]._scene);
            that._scoreNum = new Text(that._gc._currentScore, "Arial", s_top.sh / 1135 * 65, "#e85e4f");
            that._scoreNum.y = that._popupBox.y - s_top.sh / 1135 * 255;
            that._scoreNum.x = s_top.sw/2+s_top.sh / 1135 * 50 - that._scoreNum.width / 2;
            s_top.addChild(that._scoreNum);
        } else {
            var index = type-1;
            that._scoreNum = new Text(window["userJson"].Data.GiftsList[index].PassNum, "Arial", s_top.sh / 1135 * 65, "#e85e4f");
            that._scoreNum.y = that._popupBox.y - s_top.sh / 1135 * 255;
            that._scoreNum.x = s_top.sw/2+s_top.sh / 1135 * 50 - that._scoreNum.width / 2;
            s_top.addChild(that._scoreNum);
        }
        that._giftBox=that.createBitmap('g'+type,s_top,170/1135,s_top.sw/2,that._popupBox.y-s_top.sh/1135*153);
        that._giftText=that.createBitmap('g'+(type+3),s_top,65/1135,s_top.sw/2,that._popupBox.y-s_top.sh/1135*20);

        that._nameInp = new Form.Text((s_top.sw/2+s_top.sh/1135*100)/2,that._popupBox.y+s_top.sh/1135*32,s_top.sh/1135*320, s_top.sh/1135*68);
        that._nameInp.ele.style.fontSize=s_top.sh/1135*25/window["KWRatio"] + "px";
        that._nameInp.ele.style.lineHeight=s_top.sh/1135*70/window["KWRatio"] + "px";
        that._nameInp.ele.style.color="#636867";
        that._nameInp.ele.style.zIndex=100;

        that._phoneInp = new Form.Text((s_top.sw/2+s_top.sh/1135*100)/2,that._popupBox.y+s_top.sh/1135*120, s_top.sh/1135*320, s_top.sh/1135*68);
        that._phoneInp.ele.style.fontSize=s_top.sh/1135*25/window["KWRatio"] + "px";
        that._phoneInp.ele.style.lineHeight=s_top.sh/1135*70/window["KWRatio"] + "px";
        that._phoneInp.ele.style.color="#636867";
        that._phoneInp.ele.style.zIndex=100;

        that._btnBoxS1 = that.createBitmap('nn3', s_top, 77 / 1135, s_top.sw / 2 - s_top.sh / 1135 * 122, that._popupBox.y + s_top.sh / 1135 * 286);
        that._btnBoxS2 = that.createBitmap('nn3', s_top, 77 / 1135, s_top.sw / 2 + s_top.sh / 1135 * 122, that._popupBox.y + s_top.sh / 1135 * 286);
        that._btnText1 = new Text("提交前往抽奖", "Helvetica", s_top.sh / 1135 * 30, "#fff");
        that._btnText1.y = that._btnBoxS1.y + s_top.sh / 1135 * 10;
        that._btnText1.x = that._btnBoxS1.x - that._btnText1.width / 2;
        s_top.addChild(that._btnText1);

        that._btnText2 = new Text("晒一晒", "Helvetica", s_top.sh / 1135 * 30, "#fff");
        that._btnText2.y = that._btnBoxS2.y + s_top.sh / 1135 * 10;
        that._btnText2.x = that._btnBoxS2.x - that._btnText2.width / 2;
        s_top.addChild(that._btnText2);

        //晒一晒
        new KEvent(that._btnBoxS2, {type: "touchend"}, function () {
            that._btnBoxS2.evtObject.destory();
            s_top.canvas.style.zIndex = startZ;
            document.body.removeChild(that._nameInp.ele);
            document.body.removeChild(that._phoneInp.ele);
            KEvent.RemoveAllEventObj();
            s_top.removeChild(that._giftBox);
            s_top.removeChild(that._giftText);
            s_top.removeChild(that._nameInp);
            s_top.removeChild(that._phoneInp);
            s_top.removeChild(that._popupBox);
            s_top.removeChild(that._titleBox);
            s_top.removeChild(that._scoreNum);
            s_top.removeChild(that._btnBoxS1);
            s_top.removeChild(that._btnBoxS2);
            s_top.removeChild(that._btnText1);
            s_top.removeChild(that._btnText2);
            s_top.removeChild(that._mask);
            window["isCanTouch"]=false;
            window["isCanMove"]=false;
            //s_top.displayObjectSet=[];
            that.sharePanel();
        });
        that._btnBoxS2.evtObject.ele.style.zIndex = 100;

        //是否保存信息
        if(window["userJson"].Data.UserName != "" ) {
            window["isCanTouch"]=false;
            window["isCanMove"]=false;
            that._nameInp.ele.value = window["userJson"].Data.UserName;
            that._phoneInp.ele.value = window["userJson"].Data.UserPhone;

            that._btnText1.text = "前往抽奖";
            that._btnText1.getRealSize();
            that._btnText1.x = that._btnBoxS1.x - that._btnText1.width / 2;

            //前往抽奖
            new KEvent(that._btnBoxS1, {type: "touchend"}, function () {
                that._btnBoxS1.evtObject.destory();
                s_top.canvas.style.zIndex = startZ;
                document.body.removeChild(that._nameInp.ele);
                document.body.removeChild(that._phoneInp.ele);
                that._gc.clearAllStage();
                that.showStartPanel();
            });
            that._btnBoxS1.evtObject.ele.style.zIndex = 100;
        } else {
            new KEvent(that._btnBoxS1, {type: "touchend"}, function () {
                that._btnBoxS1.evtObject.destory();
                if (that._nameInp.ele.value.trim() == "") {
                    alert("请输入您的姓名");
                    that._btnBoxS1.evtObject.reAdd();
                    return;
                }
                if (that._phoneInp.ele.value.trim() == "") {
                    alert("请输入您的电话");
                    that._btnBoxS1.evtObject.reAdd();
                    return;
                }
                var reg2 = new RegExp("^[0-9]{7,13}$");
                if (!reg2.test(that._phoneInp.ele.value.trim())) {
                    alert("请您输入有效的电话号码");
                    that._btnBoxS1.evtObject.reAdd();
                    return;
                }
                var data = {
                    UserName:that._nameInp.ele.value,
                    UserPhone:that._phoneInp.ele.value
                };
                //that._gc._interface.iSaveInfo(function(data) {
                    //var jsobj = JSON.parse(data);
                    var jsobj = {"Code": 1, "Msg": "", "Data": {"Statue": true}};
                    if (jsobj.Code == 1) {
                        if (jsobj.Data.Statue) {
                            window["userJson"].Data.UserName = that._nameInp.ele.value;
                            window["userJson"].Data.UserPhone = that._phoneInp.ele.value;
                            that._nameInp.ele.readOnly = "readonly";
                            that._phoneInp.ele.readOnly = "readonly";
                            window["isCanTouch"] = false;
                            window["isCanMove"]=false;
                            s_top.canvas.style.zIndex = startZ;
                            document.body.removeChild(that._nameInp.ele);
                            document.body.removeChild(that._phoneInp.ele);
                            that._gc.clearAllStage();
                            that.showStartPanel();
                            return;
                        } else {
                            alert("您的网络不给力，请稍后再试");
                        }
                    } else {
                        alert("您的网络不给力，请稍后再试");
                    }
                //},data);
            });
            that._btnBoxS1.evtObject.ele.style.zIndex = 100;
        }
    },

    //成功页面,没有礼盒
    winPanel: function (type) {
        var that = this,
            s_top = that._gc._stage_top;

        var startZ = s_top.canvas.style.zIndex;
        s_top.canvas.style.zIndex=99;
        that._mask = KWhaleUtils.getMask("#0b0100",0.8);
        s_top.addChild(that._mask);

        that._popupBox=that.createBitmap('nn1',s_top,495/1135,s_top.sw/2,s_top.sh/1135*614);
        that._titleBox=that.createBitmap('a2',s_top,200/1135,s_top.sw/2,that._popupBox.y-s_top.sh/1135*210);
        that._scoreNum = new Text(that._gc._currentScore, "Arial", s_top.sh / 1135 * 65, "#e85e4f");
        that._scoreNum.y = that._popupBox.y + s_top.sh / 1135 * 30;
        that._scoreNum.x = s_top.sw/2+s_top.sh / 1135 * 30 - that._scoreNum.width / 2;
        s_top.addChild(that._scoreNum);
        that._btnBoxS1 = that.createBitmap('nn3', s_top, 77 / 1135, s_top.sw / 2 - s_top.sh / 1135 * 122, that._popupBox.y + s_top.sh / 1135 * 118);
        that._btnBoxS2 = that.createBitmap('nn3', s_top, 77 / 1135, s_top.sw / 2 + s_top.sh / 1135 * 122, that._popupBox.y + s_top.sh / 1135 * 118);
        that._btnText1 = new Text("继续挑战", "Helvetica", s_top.sh / 1135 * 30, "#fff");
        that._btnText1.y = that._btnBoxS1.y + s_top.sh / 1135 * 10;
        that._btnText1.x = that._btnBoxS1.x - that._btnText1.width / 2;
        s_top.addChild(that._btnText1);

        that._btnText2 = new Text("返回首页", "Helvetica", s_top.sh / 1135 * 30, "#fff");
        that._btnText2.y = that._btnBoxS2.y + s_top.sh / 1135 * 10;
        that._btnText2.x = that._btnBoxS2.x - that._btnText2.width / 2;
        s_top.addChild(that._btnText2);

        //继续挑战
        new KEvent(that._btnBoxS1, {type: "touchend"}, function () {
            that._btnBoxS1.evtObject.destory();
            s_top.canvas.style.zIndex=startZ;
            that._gc.clearAllStage();
            that.chooseScene();
        });
        that._btnBoxS1.evtObject.ele.style.zIndex=100;

        //返回首页
        new KEvent(that._btnBoxS2, {type: "touchend"}, function () {
            that._btnBoxS2.evtObject.destory();
            s_top.canvas.style.zIndex=startZ;
            that._gc._stage_main.canvas.style.opacity = 1;
            KWhaleUtils.Tween(that._gc._stage_main.canvas.style, {opacity:0}, 0, 200, TWEEN.Easing.Linear.None).start()
                .onComplete(function() {
                    that._gc.clearAllStage();
                    s_top.canvas.style.opacity = 1;
                    that.showStartPanel();
                });
        });
        that._btnBoxS2.evtObject.ele.style.zIndex=100;
    },

    //失败页面
    _scoreNum:null,
    losePanel: function (type) {
        var that = this,
            s_top = that._gc._stage_top;

        var startZ = s_top.canvas.style.zIndex;
        s_top.canvas.style.zIndex=99;
        that._mask = KWhaleUtils.getMask("#0b0100",0.8);
        s_top.addChild(that._mask);

        that._popupBox=that.createBitmap('h1',s_top,495/1135,s_top.sw/2,s_top.sh/1135*614);
        that._titleBox=that.createBitmap('a2',s_top,200/1135,s_top.sw/2,that._popupBox.y-s_top.sh/1135*210);
        that._scoreNum = new Text(that._gc._currentScore, "Arial", s_top.sh / 1135 * 65, "#e85e4f");
        that._scoreNum.y = that._popupBox.y - s_top.sh / 1135 * 8;
        that._scoreNum.x = s_top.sw/2+s_top.sh / 1135 * 45 - that._scoreNum.width / 2;
        s_top.addChild(that._scoreNum);
        that._btnBoxS1 = that.createBitmap('nn3', s_top, 77 / 1135, s_top.sw / 2 - s_top.sh / 1135 * 122, that._popupBox.y + s_top.sh / 1135 * 128);
        that._btnBoxS2 = that.createBitmap('nn3', s_top, 77 / 1135, s_top.sw / 2 + s_top.sh / 1135 * 122, that._popupBox.y + s_top.sh / 1135 * 128);
        that._btnText1 = new Text("再次挑战", "Helvetica", s_top.sh / 1135 * 30, "#fff");
        that._btnText1.y = that._btnBoxS1.y + s_top.sh / 1135 * 10;
        that._btnText1.x = that._btnBoxS1.x - that._btnText1.width / 2;
        s_top.addChild(that._btnText1);

        that._btnText2 = new Text("返回首页", "Helvetica", s_top.sh / 1135 * 30, "#fff");
        that._btnText2.y = that._btnBoxS2.y + s_top.sh / 1135 * 10;
        that._btnText2.x = that._btnBoxS2.x - that._btnText2.width / 2;
        s_top.addChild(that._btnText2);

        //再次挑战
        new KEvent(that._btnBoxS1, {type: "touchend"}, function () {
            that._btnBoxS1.evtObject.destory();
            s_top.canvas.style.zIndex=startZ;
            that._gc.gameReplay(type);
        });
        that._btnBoxS1.evtObject.ele.style.zIndex=100;

        //返回首页
        new KEvent(that._btnBoxS2, {type: "touchend"}, function () {
            that._btnBoxS2.evtObject.destory();
            s_top.canvas.style.zIndex=startZ;
            that._gc._stage_main.canvas.style.opacity = 1;
            KWhaleUtils.Tween(that._gc._stage_main.canvas.style, {opacity:0}, 0, 200, TWEEN.Easing.Linear.None).start()
                .onComplete(function() {
                    that._gc.clearAllStage();
                    s_top.canvas.style.opacity = 1;
                    that.showStartPanel();
                });
        });
        that._btnBoxS2.evtObject.ele.style.zIndex=100;
    },

    //规则页面
    _ruleInfo:null,
    _ruleBox:null,
    _ruleCloseBtn:null,
    rulePannel:function() {
        var that = this,
            s_top = that._gc._stage_top;

        window["isCanMove"]=true;
        window["isCanTouch"]=true;
        var startZ = s_top.canvas.style.zIndex;
        s_top.canvas.style.zIndex=99;
        that._blackPannel= new Shape.Rectangle({x:s_top.sw/2,y:s_top.sh/2}, s_top.sw, s_top.sh,"rgba(0,0,0,.8)");
        that._blackPannel.anchorX=that._blackPannel.anchorY=0.5;
        s_top.addChild(that._blackPannel);

        that._ruleBox=that.createBitmap('p1',s_top,722/1135,s_top.sw/2,s_top.sh/2);

        that._ruleCloseBtn=that.createBitmap('z1',s_top,65/1135,that._ruleBox.x+that._ruleBox.width/2-s_top.sh/1135*10,
            that._ruleBox.y-that._ruleBox.height/2+s_top.sh/1135*10);

        that._ruleInfo =  document.createElement('div');
        that._ruleInfo.style.position = "absolute";
        that._ruleInfo.style.overflow = "hidden";
        that._ruleInfo.style.overflowY = "scroll";
        that._ruleInfo.style.height =  s_top.sh/1135*480/window["KWRatio"] + "px";
        that._ruleInfo.style.width =  s_top.sh/1135*445/window["KWRatio"] + "px";
        that._ruleInfo.style.top = s_top.sh / 1136 * 395 / window["KWRatio"] + "px";
        that._ruleInfo.style.fontSize = s_top.sh / 1136 * 28 / window["KWRatio"] + "px";
        that._ruleInfo.style.lineHeight = s_top.sh / 1136 * 45 / window["KWRatio"] + "px";
        that._ruleInfo.style.color = "#767676";
        that._ruleInfo.style.zIndex = 100;
        document.body.appendChild(that._ruleInfo);
        that._ruleInfo.style.left = (s_top.sw / window["KWRatio"] - that._ruleInfo.offsetWidth) / 2 + "px";
        that._ruleInfo.innerHTML="1、游戏分客厅、书房、卧室三关，每消灭一个甲醛获得一个袋鼠，通关成功即可以开礼盒抽奖，"+
            "规定时间内无法通关可重新再玩。</br/>2、第一关需在30秒内获得30个袋鼠为通关成功，第二关需在20秒"+
            "获得40个袋鼠，第三关需在20秒获得50个袋鼠.<br/>3、每一关通关后方可抽取该关的奖项，"+
            "获奖后留下详细地址便于邮寄奖品。";

        /*var tips = RES.getRES("rule_content");
        tips.style.width = that._ruleInfo.offsetWidth+"px";
        that._ruleInfo.appendChild(tips);

        tips.style.opacity = 0;
        KWhaleUtils.Tween(tips.style,{opacity:1},0,600,TWEEN.Easing.Linear.None).start();*/
        that._ruleInfo.style.opacity = 0;
        KWhaleUtils.Tween(that._ruleInfo.style,{opacity:1},0,600,TWEEN.Easing.Linear.None).start();

        new KEvent(that._ruleCloseBtn, {type: "touchend"}, function () {
            that._ruleCloseBtn.evtObject.destory();
            s_top.canvas.style.zIndex=startZ;
            s_top.removeChild(that._ruleCloseBtn);
            s_top.removeChild(that._blackPannel);
            s_top.removeChild(that._ruleBox);
            document.body.removeChild(that._ruleInfo);
            window["isCanMove"]=false;
            window["isCanTouch"]=false;
        });
        that._ruleCloseBtn.evtObject.ele.style.zIndex=100;
    },

    //排行榜页面 每次都调用一次
    _friendPace:8,
    _friendPage:1,
    _common_nobodyjoin:null,
    _isSlide:true,
    showRankingList:function(){
        var that = this,
            s = that._gc._stage_top;
        that._friendPage = 1;
        that._isSlide = true;
        var cur_z = s.canvas.style.zIndex;
        var target_z = 1000;
        s.canvas.style.zIndex=target_z;
        var mask = KWhaleUtils.getMask("#0b0100",0.8);
        s.addChild(mask);
        //common_rangkingList
        var main = that.createBitmap('o1',s,722/1135,s.sw/2,s.sh/2);

        var wrap2 = KWhaleUtils.addDomByScale(s,470/1135,578/1135,415/1135,"");
        wrap2.style.overflowY = "scroll";
        wrap2.style.overflowX = "hidden";
        wrap2.className = "friendBox";
        var ul = document.createElement('ul');
        ul.className = "friendList";
        var imgH = s.sh/KWRatio/1135*70+"px";

        var rankW = s.sh/KWRatio/1135*178+"px";
        var scoreW = s.sh/KWRatio/1135*180+"px";
        var imgPW = s.sh/KWRatio/1135*160+"px";
        window["isCanMove"]=true;
        window["isCanTouch"]=true;

        friendListOne();
        function funcNewList(index) {
            console.log(that._friendPage);
            var rank = that._friendPace*(that._friendPage-1)+index+1;
            var li = document.createElement('li');
            li.style.fontFamily = "微软雅黑";
            li.style.fontSize = s.sh / KWRatio / 1135 * 32 + "px";
            li.style.color = "#767676";
            li.innerHTML = "<p style='text-align:center;width: " + imgPW + "'>" +
                "<img src='" + window["friendJson"].Data[index].UserLogo + "' style='border-radius:50%;width:" + imgH + ";height:" + imgH + "  '>" +
                "<span class='infoName' style='display:block;font-size:12px;text-align: center;width:100%'>" + window["friendJson"].Data[index].NickName + "</span></p>" +
                "<p style='display:block;text-align: center;width: " + rankW + "'>" + rank + "</p>" +
                "<p style='text-align:center;width: " + scoreW + "'>" + window["friendJson"].Data[index].MaxWinNum + "</p>";
            li.style.height = s.sh / KWRatio / 1135 * 140 + "px";
            li.style.width = s.sh / KWRatio / 1135 * 530 + "px";
            li.className = "webkitX";
            li.style.borderTop="1px solid #d2d2d2"
            li.style.margin="0 auto";
            ul.appendChild(li);
        }

        wrap2.style.zIndex=target_z+1000;
        wrap2.appendChild(ul);
        //close btn
        var btn = that.createBitmap('z1',s,65/1135,main.x+main.width/2-s.sh/1135*10,
            main.y-main.height/2+s.sh/1135*10);

        function friendListOne() {
            var jsObj = {
                "Pace": that._friendPace,
                "page": that._friendPage
            }
            //that._gc._interface.iGetFriend(function(data2) {
            //var jsonObj = JSON.parse(data2);
            window["friendJson"] = {
                "Code": 1,
                "msg": "",
                "Data": [{"NickName":"fsadf","UserLogo":"../../Content/Images/img/b1.png","MaxWinNum":11}]
            };
            if(window["friendJson"].Code==1) {
                //var userData = jsonObj.Data.FriendList;
                var len = window["friendJson"].Data.length;
                if(len==0){
                    //common_nobodyjoin
                    that._common_nobodyjoin = KWhaleUtils.getBmpByName("common_nobodyjoin");
                    KWhaleUtils.AddStageByScaleHNoCheck(s,that._common_nobodyjoin,204/880);
                    that._common_nobodyjoin.y = s.sh/880*400;
                    that._common_nobodyjoin.x = s.sw/2;
                    that._isSlide = false;
                }else {
                    /*userData.sort(function(a, b){
                     return b.MaxWinNum - a.MaxWinNum;
                     });*/
                    for (var i = 0; i < len; i++) {
                        funcNewList(i);
                    }
                    document.body.appendChild(wrap2);
                    wrap2.style.left= (s.sw/KWRatio-wrap2.offsetWidth)/2+"px";
                }
            }else{
                alert("您的网络不给力，请稍后再试");
            }
            //},jsObj);
        }

        function friendList() {
            var jsObj = {
                "Pace": that._friendPace,
                "page": that._friendPage
            }
            //that._gc._interface.iGetFriend(function(data2) {
            //var jsonObj = JSON.parse(data2);
            window["friendJson"] = {
                "Code": 1,
                "msg": "",
                "Data": []
            };
            if(window["friendJson"].Code==1) {
                //var userData = jsonObj.Data.FriendList;
                var len = window["friendJson"].Data.length;
                if(len==0){
                    that._isSlide = false;
                    //KEvent.REMOVESLIDE();
                }else {
                    /*userData.sort(function(a, b){
                     return b.MaxWinNum - a.MaxWinNum;
                     });*/
                    for (var i = 0; i < len; i++) {
                        funcNewList(i);
                    }
                    document.body.appendChild(wrap2);
                    wrap2.style.left= (s.sw/KWRatio-wrap2.offsetWidth)/2+"px";
                }
            }else{
                alert("您的网络不给力，请稍后再试");
            }
            //},jsObj);
        }
        new KEvent.ADDSLIDE(function(type){
            if(that._isSlide) {
                console.log(type);
                switch (type){
                    case "top":
                        if($('.friendBox').scrollTop() + $('.friendBox').height() >= $('.friendList').height()-10) {
                            that._friendPage++;
                            console.log(that._friendPage);
                            friendList();
                        }
                        break;
                    default :
                        break;
                }
            }
        });


        new KEvent(btn, {type: "touchend"}, function () {
            //KEvent.REMOVESLIDE();
            if(that._common_nobodyjoin){
                console.log("remove",that._common_nobodyjoin);
                s.removeChild(that._common_nobodyjoin);
            }else{
                console.log("noremove",that._common_nobodyjoin);
                document.body.removeChild(wrap2);
            }
            s.canvas.style.zIndex=cur_z;
            btn.evtObject.destory();
            s.removeChild(main);
            s.removeChild(mask);
            s.removeChild(btn);
            window["isCanMove"]=false;
            window["isCanTouch"]=false;
            that._isSlide = false;
        });
        btn.evtObject.ele.style.zIndex=target_z+1002;

    },

    //createBitmap
    createBitmap:function(res,stage,scaleH,scaleX,scaleY) {
        var bitmap = new Bitmap(RES.getRES(""+res));
        KWhaleUtils.AddStageByScaleHNoCheck(stage,bitmap,scaleH);
        bitmap.anchorX=bitmap.anchorY=0.5;
        bitmap.x=scaleX;
        bitmap.y=scaleY;
        return bitmap;
    }
};