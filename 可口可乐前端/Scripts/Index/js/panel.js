function Panel(d,stage_bg,stage_main,stage_top){
    /* 场景 */
    this.derector = d;
    this._stage_bg = stage_bg;
    this._stage_main = stage_main;
    this._stage_top = stage_top;
    this._ihotyi = new IHotyi();
    this.init();

};

Panel.prototype={
    init:function(){
        var that=this;
        window["is_start_loop"]=false;
        that._ihotyi.iUserRecord(function (data) {
            window["userJson"] = data;
            that.show_index();
        });
        //从长屏转满屏 需要调用先这个resetOneStage方法再调用showPage
    },
    //参数：a:string,“页面名字”|b:string“所在舞台”|isReSetAllStage:bools是否重置所有舞台
    //无返回
    showPage:function(a,b,isReSetAllStage){
        if(isReSetAllStage){
            this.derector.resetStage();
            this.derector.showPage(this.derector.PageMonitor[a], b)
        }else {
            this.derector.showPage(this.derector.PageMonitor[a], b)
        }
    },
    //参数：a:string,“页面名字”|b:string“元素名字”
    //返回：指定页面名字的指定元素显示对象
    getActor:function(a,b){
        return this.derector.getActor(a,b);
    },
    resetOneStage:function(s){
        this.derector.resetOneStage(s);
    },

    tween:[],
    t:null,
    isRota:false,
    st:null,
    /*首頁*/
    show_index: function () {
        var that = this,
            s_main = that._stage_main,
            s_top = that._stage_top;
        isCanTouch = true;
        isCanMove = true;
        for(var i= 0,l=that.tween.length;i<l;i++) {
            that.tween[i].stop();
        }
        that.tween = [];
        that.showPage("index",s_main);
        var ruleBtn,star=[],moreStar,startBtn,finger,machine,arrows,prizeImg,prizeBtn;
        var speed = 200;
        var showStar = function (i) {
            star[i] = that.getActor("index","a"+(i+1));
            star[i].alpha = star[i].scale = 1;
            switch (i) {
                case 0:
                case 3:
                    that.tween.push(KWhaleUtils.Tween_YoYo(star[i], {
                        alpha: .3,
                        scale: .8
                    }, 0, speed * 6, TWEEN.Easing.Linear.None).start());
                    break;
                case 1:
                case 2:
                    that.tween.push(KWhaleUtils.Tween_YoYo(star[i], {
                        alpha: .3,
                        scale: .8
                    }, 0, speed * 3, TWEEN.Easing.Linear.None).start());
                    break;
                default :
                    break;
            }

        };
        for(var i=0;i<4;i++) {
            showStar(i);
        }
        moreStar = that.getActor("index","a5");
        moreStar.alpha = 1;
        that.tween.push(KWhaleUtils.Tween_YoYo(moreStar,{alpha:.3},0,speed*1.5,TWEEN.Easing.Linear.None).start());
        startBtn =  new Shape.Rectangle({x:s_main.sw/2-s_main.sh/1300*230,y:s_main.sh/1300*330},
            s_main.sh/1300*390,s_main.sh/1359*145,"#ffffff");
        ruleBtn = that.getActor("index","a8");
        new KEvent(ruleBtn, {type: "click"}, function () {
            //条款及细则
            that.rulePanel();
        });
        prizeBtn = new Shape.Rectangle({x:s_main.sw/2-s_main.sh/1300*302,y:s_main.sh/1300*926},
            s_main.sh/1300*617,s_main.sh/1300*287,"#ffffff");

        machine = that.getActor("index","a12");
        that.tween.push(KWhaleUtils.Tween(machine,{y:s_main.sh/1300*674.8},0,speed*2,TWEEN.Easing.Back.Out).start());
        prizeImg = that.getActor("index","a9");
        prizeImg.alpha = 0;
        that.tween.push(KWhaleUtils.Tween(prizeImg,{alpha:1},speed*2,speed,TWEEN.Easing.Linear.None).start());
        finger = that.getActor("index","a7");
        finger.alpha = 0;
        finger.x = s_main.sw/2-s_main.sh/1300*300;
        that.tween[5].onComplete(function () {
            finger.alpha = 1;
            that.tween.push(KWhaleUtils.Tween_YoYo(finger, {
                alpha: 1,
                x: s_main.sw / 2 - s_main.sh / 1300 * 260
            }, 0, speed * 4, TWEEN.Easing.Linear.None).start());
            new KEvent(startBtn, {type: "click"}, function () {
                //开始游戏
                if(!that.t) {
                    that.t.stop();
                    that.t = null;
                }
                if(that.st !== null) {
                    clearInterval(that.st);
                    that.st = null;
                }
                that.isRota = false;
                that.resetOneStage(s_main);
                that.derector.setStageByHeight(s_main,1531);
                that.playGame();
            });
        });
        arrows = that.getActor("index","a10");
        arrows.alpha = 0;
        that.tween[6].onComplete(function () {
            new KEvent(prizeBtn, {type: "click"}, function () {
                //奖品详情
                that.prizeDetail();
            });
            arrows.alpha = 1;
            arrows.rotation=-5;
            that.t = KWhaleUtils.Tween_YoYo(arrows,{rotation:5},0,50,TWEEN.Easing.Elastic.InOut).start();
            that.st = setInterval(function () {
                //clearInterval(st);
                if (that.isRota) {
                    that.isRota = false;
                    arrows.rotation=-5;
                    that.t.start();
                } else {
                    that.isRota = true;
                    that.t.stop();
                    arrows.rotation=0;
                }
            },1000);
        });
    },
    //游戏页面
    playGame: function () {
        var that = this,
            s_main = that._stage_main,
            s_top = that._stage_top;
        for (var i = 0, l = that.tween.length; i < l; i++) {
            that.tween[i].stop();
        }
        that.tween = [];
        that.showPage("playGame", s_main);
        var back, ruleBtn, star = [], moreStar, gameBtn, finger, prizeBtn = [], chance, speed = 200;
        chance = new Text(userJson.Data.DrawNum+'x', "Helvetica", s_main.sh / 1531 * 50, "#fff");
        chance.bold = "900";
        chance.y = s_main.sh / 1531 * 1005;
        chance.x = s_main.sw / 2 + s_main.sh / 1531 * 132 - chance.width;
        s_main.addChild(chance);
        gameBtn = that.getActor("playGame", "d12");
        gameBtn.rotation = -8;

        clearInterval(that.st);
        that.t.stop();
        that.t = KWhaleUtils.Tween_YoYo(gameBtn, {rotation: 8}, 0, 50, TWEEN.Easing.Elastic.InOut).start();
            that.st = setInterval(function () {
                //clearInterval(st);
                if (that.isRota) {
                    that.isRota = false;
                    gameBtn.rotation = -8;
                    that.t.start();
                } else {
                    that.isRota = true;
                    that.t.stop();
                    gameBtn.rotation = 0;
                }
            }, 1000);
        back = that.getActor("playGame", "d11");
        new KEvent(back, {type: "click"}, function () {
            console.log("s")
            if (!that.t) {
                that.t.stop();
                that.t = null;
            }
            if (that.st !== null) {
                clearInterval(that.st);
                that.st = null;
            }
            that.isRota = false;
            that.resetOneStage(s_main);
            that.derector.setStageByHeight(s_main, 1300);
            that.show_index();
        });
        ruleBtn = that.getActor("playGame", "d6");
        new KEvent(ruleBtn, {type: "click"}, function () {
            //条款及细则
            that.rulePanel();
        });
        var bottle = new Bitmap(RES.getRES("aa"));
        KWhaleUtils.AddStageByScaleHNoCheck(s_main, bottle, 120 / 1531);
        bottle.anchorX = bottle.anchorY = 0.5;
        bottle.x = s_main.sw / 2 - s_main.sh / 1531 * 45;
        bottle.y = s_main.sh / 1531 * 680;
        bottle.rotation = 90;
        var zzz = bottle.z;
        var shade = new Bitmap(RES.getRES("d10"));
        KWhaleUtils.AddStageByScaleHNoCheck(s_main, shade, 159 / 1531);
        shade.anchorX = shade.anchorY = 0.5;
        shade.x = s_main.sw / 2 - s_main.sh / 1531 * 44;
        shade.y = s_main.sh / 1531 * 730;
        var bottleAnimate = function () {
            bottle.alpha=1;
            bottle.anchorX = bottle.anchorY = 0.5;
            bottle.x = s_main.sw / 2 - s_main.sh / 1531 * 45;
            bottle.y = s_main.sh / 1531 * 680;
            bottle.rotation = 90;
            bottle.scale = 1;
            that.tween.push(KWhaleUtils.Tween(bottle, {y: s_main.sh / 1531 * 752}, speed, speed * 2, TWEEN.Easing.Bounce.Out).start()
                .onComplete(function () {
                    bottle.z = shade.z + 1;
                    s_main.reflashZ();//启用Z轴
                    isCanMove = false;
                    document.getElementById('canvas_stage_top').scrollIntoView();
                }));
            that.tween.push(KWhaleUtils.Tween(bottle, {
                rotation: 360, x: s_top.sw / 2, y: s_top.sh / 2, scale: 9
            }, speed * 4, speed * 4, TWEEN.Easing.Elastic.Out).start().onComplete(function () {
                that.showGif(function () {
                    bottle.alpha=0;
                    drawFunc();
                });
            }));
        };
        var bottleAnimate2 = function () {
            bottle.alpha=1;
            bottle.anchorX = bottle.anchorY = 0.5;
            bottle.x = s_main.sw / 2 - s_main.sh / 1531 * 45;
            bottle.y = s_main.sh / 1531 * 680;
            bottle.rotation = 90;
            bottle.scale = 1;
            bottle.z = zzz;
            s_main.reflashZ();//启用Z轴
            that.tween.push(KWhaleUtils.Tween(bottle, {y: s_main.sh / 1531 * 752}, speed, speed * 2, TWEEN.Easing.Bounce.Out).start()
                .onComplete(function () {
                    bottle.z = shade.z + 1;
                    s_main.reflashZ();//启用Z轴
                    isCanMove = false;
                    document.getElementById('canvas_stage_top').scrollIntoView();
                }));
            that.tween.push(KWhaleUtils.Tween(bottle, {
                rotation: 360, x: s_top.sw / 2, y: s_top.sh / 2, scale: 9
            }, speed * 4, speed * 4, TWEEN.Easing.Elastic.Out).start().onComplete(function () {
                bottle.alpha=0;
                drawFunc();
            }));
        };
        var spark = [];
        for (var i = 0; i < 8; i++) {
            spark[i] = that.getActor("playGame", "d7-" + (i + 1));
        }
        var index = 0;
        var sparkStart = function () {
            var flashlight = function () {
                spark[index].img = RES.getRES('d8');
                switch (index) {
                    case 0:
                        spark[7].img = RES.getRES('d7');
                        index++;
                        break;
                    case 7:
                        spark[index - 1].img = RES.getRES('d7');
                        var stO = setTimeout(function () {
                            //clearInterval(stO);
                            //clearInterval(setInter);

                            spark[index - 1].img = RES.getRES('d7');
                        }, 500);
                        index = 0;
                        break;
                    default :
                        spark[index - 1].img = RES.getRES('d7');
                        index++;
                        break;
                }
            };
            var setInter = setInterval(function () {
                flashlight();
            }, 100);
        };
        var blurPrize = function (i) {
            prizeBtn[i] = that.getActor("playGame", "prize" + (i + 1));
            prizeBtn[i].blur();
        };
        for (var i = 0; i < 4; i++) {
            blurPrize(i);
        }
        var prizeArr = userJson.Data.AwardRecord;
        var showPrize = function (obj) {
            var index = obj.Id - 1;
            prizeBtn[index].focus();
            new KEvent(prizeBtn[index], {type: "click"}, function () {
                that.prizePanel(obj)
            });
        };
        for(var i= 0,l=prizeArr.length;i<l;i++) {
            showPrize(prizeArr[i]);
        }
        //抽獎函數
        var drawFunc = function () {
            that._ihotyi.iGetDraw(function (data) {
                var drawJson = data;
                if (!drawJson.Data.IsWin) {
                    that.showBox(2);
                } else {
                    userJson.Data.AwardRecord.push(drawJson.Data);
                    that.prizePanel(drawJson.Data);
                    showPrize(drawJson.Data)
                }
                if(that.movie !== null) {
                    s_main.removeChild(bottle);
                    document.body.removeChild(that.movie);
                    that.movie = null;
                }
            });
        };
        //抽奖
        if( !window["is_start_loop"]){
            window["is_start_loop"]=true;/*
            that.t = KWhaleUtils.Tween_YoYo(gameBtn, {rotation: 8}, 0, 50, TWEEN.Easing.Elastic.InOut).start();
            that.st = setInterval(function () {
                //clearInterval(st);
                if (that.isRota) {
                    that.isRota = false;
                    gameBtn.rotation = -8;
                    that.t.start();
                } else {
                    that.isRota = true;
                    that.t.stop();
                    gameBtn.rotation = 0;
                }
            }, 1000);*/
            sparkStart();
        }
        new KEvent(gameBtn, {type: "click"}, function () {
            if(userJson.Data.DrawNum>=1) {
                userJson.Data.DrawNum--;
                chance.text = userJson.Data.DrawNum+'x';
                chance.getRealSize();
                chance.x = s_main.sw / 2 + s_main.sh / 1531 * 132 - chance.width;
                isCanTouch = false;
                if(PageJson.IsLoadGif) {
                    PageJson.IsLoadGif = false;
                    bottleAnimate();
                } else {
                    bottleAnimate2();
                }
            } else {
                that.showBox(1);
            }
        });
        var showStar = function (i) {
            star[i] = that.getActor("playGame", "d" + (i + 1));
            star[i].alpha = star[i].scale = 1;
            switch (i) {
                case 0:
                    that.tween.push(KWhaleUtils.Tween_YoYo(star[i], {
                        alpha: .3,
                        scale: .8
                    }, 0, speed * 6, TWEEN.Easing.Linear.None).start());
                    break;
                case 1:
                case 2:
                    that.tween.push(KWhaleUtils.Tween_YoYo(star[i], {
                        alpha: .3,
                        scale: .8
                    }, 0, speed * 3, TWEEN.Easing.Linear.None).start());
                    break;
                default :
                    break;
            }

        };
        for (var i = 0; i < 3; i++) {
            showStar(i);
        }
        moreStar = that.getActor("playGame", "d4");
        moreStar.alpha = 1;
        that.tween.push(KWhaleUtils.Tween_YoYo(moreStar, {alpha: .3}, 0, speed * 1.5, TWEEN.Easing.Linear.None).start());
    },
    //彈窗
    movie:null,
    showBox: function (type) {
        var that = this,
            s_top = that._stage_top;
        isCanMove = false;
        isCanTouch = true;
        var startZ = s_top.canvas.style.zIndex;
        s_top.canvas.style.zIndex=99;
        document.getElementById('canvas_stage_top').scrollIntoView();
        var mask = KWhaleUtils.getMask("#000",0.8);
        var closeBox = function(closeBtn,call) {
            new KEvent(closeBtn, {type: "click"}, function () {
                closeBtn.evtObject.destory();
                s_top.canvas.style.zIndex=startZ;
                s_top.displayObjectSet=[];
                isCanMove = true;
                if(call) {
                    call();
                }
            });
            closeBtn.evtObject.ele.style.zIndex=100;
        };
        switch (type) {
            case 1:
                //分享页
                s_top.addChild(mask);
                var bitmap = new Bitmap(RES.getRES("h1"));
                KWhaleUtils.AddStageByScaleHNoCheck(s_top,bitmap,1);
                bitmap.anchorX=bitmap.anchorY=0.5;
                bitmap.x=s_top.sw/2;
                bitmap.y=s_top.sh/2;
                closeBox(mask);
                break;
            case 2:
                //没中奖
                s_top.addChild(mask);
                that.showPage("noPrize",s_top);
                var close = that.getActor("noPrize","f1");
                closeBox(close);
                break;
            default :
                break;
        }
    },
    //播放GIF圖
    showGif: function (callFunc) {
        var that = this,
            s_top = that._stage_top,
            startZ = s_top.canvas.style.zIndex;
        /* that.movie = document.createElement("img");
         that.movie.src = "../../Content/Images/img/movie.gif";
         that.movie.style.position = "absolute";
         that.movie.style.top = "0";
         that.movie.style.height = s_top.sh/window["KWRatio"] + "px";
         that.movie.style.width = s_top.sh/1135*900/window["KWRatio"] + "px";
         document.body.appendChild(that.movie);
         that.movie.style.left = (s_top.sw/window["KWRatio"]-that.movie.offsetWidth)/2 + "px";
         that.movie.style.zIndex=99;
         if(callFunc) {
         var stCall = setTimeout(function () {
         clearTimeout(stCall);
         callFunc();
         },4960);//修改GIF圖播放時間keiling
         }*/
        var s = s_top;
        var mask2 = KWhaleUtils.getMask("black", 1);
        s.addChild(mask2);
        var bmp = KWhaleUtils.getBmpByName("a1");
        KWhaleUtils.AddStageByScaleHNoCheck(s, bmp, 1);
        bmp.x = s.sw / 2;
        window["PL"]=KWhaleUtils.playBmpSet(bmp, "a", 69, 5, function () {
            s.removeChild(bmp);
            s.removeChild(mask2);
                if(callFunc) {
                    callFunc()
                }});
    },
    //中奖页面
    prizePanel: function (obj) {
        var that = this,
            s_top = that._stage_top;
        isCanTouch = true;
		isCanMove = true;
        $('body').css("overflow-y","scroll");
        var content = document.createElement('div');
        content.className = "prizeContent";
        content.style.backgroundColor = "#c2061a";
        document.body.appendChild(content);
        content.style.opacity = 0;
        KWhaleUtils.Tween(content.style, {opacity: 1}, 0, 200, TWEEN.Easing.Linear.None).start();

        var prizeDetail = [
            '<div class="prizeDetail">',
                '<div class="chanceKey">'+obj.ChanceKey+'</div>',
                '<img src="'+obj.AwardImg+'" class="prize-img"/>',
                '<div class="code-box">',
                    '<input class="write-code" type="text" placeholder="此處由工作人員操作">',
                    '<div class="submit-btn">確定</div>',
                '</div>',
                '<div class="ex-success"></div>',
                '<p class="clause-tlt">使用條款</p>',
                '<div class="clause">'+obj.TermsConditions+'</div>',
                '<p class="tips">地址</p>',
                '<div class="shop">'+obj.ApplyShop+'</div>',
                '<p class="phone-tlt">電話</p>',
                '<div class="phone">'+obj.ShopPhone+'</div>',
                '<img src="../../Content/Images/img/g6.png" class="return-btn"/>',
            '<div>'
        ].join('');
        content.innerHTML = prizeDetail;
        if (obj.IsChange) {	//已兑换
            $('.ex-success').text("已兌換").show();
        } else if(obj.AwardType == 3) {
            $('.ex-success').text(obj.Eights).show();
        } else {
            //未兑换
            $('.code-box').show();
            /*$('.write-code').attr("type","password");*/
            $(".submit-btn").on('click', function () {
                var code = $('.write-code').val();
                if (code.trim() == "") {
                    alert("請輸入兌換碼");
                } else {
                    var postObj = {
                        "AwardId": obj.Id,
                        "ChancePwd": code
                    };
                    that._ihotyi.iExchangeCoupon(function (data) {
                        var exchangeJson = data;
                        switch (exchangeJson.Data.StatueCode) {
                            case 1:
                                $('.ex-success').text('已兌換').show();
                                $('.code-box').hide();
                                obj.IsChange = true;
                                break;
                            case -1:
                                alert("你來晚了，沒有可以兌換的庫存了");
                                break;
                            case 0:
                                window.location.href = "/index/error";
                                break;
                            case 2:
                                alert("您已經兌換了");
                                break;
                            case 3:
                                alert("密碼錯誤，請重新輸入");
                                break;
                            default :
                                window.location.href = "/index/error";
                                break;
                        };
                    },postObj);
                };
            });
        };
        $(".return-btn").on('click', function () {
            //返回主页
            KWhaleUtils.Tween(content.style, {opacity: 0}, 0, 200, TWEEN.Easing.Linear.None).start()
                .onComplete(function () {
                    document.body.removeChild(content);
                });
        });
    },
    //頁面適配
    pageResponse: function () {
        var h = $('html').height(),
            w = $('html').width(),
            a = h/w,
            b = 567/360;

        if(a>b) {
            var hh = a*360;
            var page2 = new pageResponse({
                class : 'screen',     //模块的类名，使用class来控制页面上的模块(1个或多个)
                mode : 'auto',     // auto || contain || cover ，默认模式为auto
                width : '360',      //输入页面的宽度，只支持输入数值，默认宽度为320px
                height : hh    //输入页面的高度，只支持输入数值，默认高度为504px
            });
        } else {
            var page2 = new pageResponse({
                class : 'screen',     //模块的类名，使用class来控制页面上的模块(1个或多个)
                mode : 'auto',     // auto || contain || cover ，默认模式为auto
                width : '360',      //输入页面的宽度，只支持输入数值，默认宽度为320px
                height : '567'    //输入页面的高度，只支持输入数值，默认高度为504px
            });
        }
    },
    //奖品详情
    prizeDetail: function () {
        var that = this;
        var content = document.createElement('div');
        content.className = "content";
        document.body.appendChild(content);
        content.style.opacity = 0;
        KWhaleUtils.Tween(content.style,{opacity:1},0,200,TWEEN.Easing.Linear.None).start();

        var Img = RES.getRES('b3');
        Img.className = "prizeDetailImg";
        content.appendChild(Img);

        var ruleBtn = RES.getRES('b1');
        ruleBtn.className = "ruleBtn";
        content.appendChild(ruleBtn);

        var home = RES.getRES('b2');
        home.className = "home";
        content.appendChild(home);

        home.onclick = function () {
            //返回主页
            KWhaleUtils.Tween(content.style,{opacity:0},0,200,TWEEN.Easing.Linear.None).start().onComplete(function () {
                document.body.removeChild(content);
            });
        };

        ruleBtn.onclick = function () {
            //条款及细则
            that.rulePanel();
            KWhaleUtils.Tween(content.style,{opacity:0},200,100,TWEEN.Easing.Linear.None).start().onComplete(function () {
                document.body.removeChild(content);
            });
        };


    },
    //条款及细则
    rulePanel: function () {
        var s_top = this._stage_top;
        var content = document.createElement('div');
        content.className = "ruleContent";
        content.style.height = s_top.sh/window["KWRatio"] + "px";
        content.style.width = s_top.sw/window["KWRatio"] + "px";
        content.style.backgroundColor = "#c2061a";
        document.body.appendChild(content);
        content.style.opacity = 0;
        KWhaleUtils.Tween(content.style,{opacity:1},0,200,TWEEN.Easing.Linear.None).start();
        $('body').css("position","fixed");

        var ruleDetail = document.createElement('div');
        ruleDetail.className = "ruleDetail";
        ruleDetail.innerHTML = "1.本活動只限年滿13歲或以上之人士參加。</br>2.活動日期為2016年11月11日起至11月27日。</br>3.凡參與[可口可樂®幸運汽水機]抽獎遊戲，即有3次抽獎機會。凡透過此遊戲邀請一位朋友參與，即可獲得一次額外抽獎機會，邀請次數不限。</br>4.進入主頁後，可點擊獎品圖片參考獎品詳細資料；在開始遊戲後，點擊金幣即可進行抽獎。</br>5.奬品包括：</br>I.可口可樂®復刻播放器(支援CD、MP3、WMA、藍牙及電台播放)共1份；</br>II.可口可樂®沙冰機共5份；</br>III.fingercroxx×Coca-Cola®運動防水袋共500份；</br>IV.可口可樂®330mL汽水共12000份。</br>6.電子兌換劵兌獎日期為2016年11月11日至2016年11月27日止，兌獎時間為第十六屆澳門美食節開放時間（周一至四為17:00至23:00，周五至日為15:00至00:00），如開放時間有所調整，恕不另行通知。得獎者需於上述時間內安排領取獎品，否則被視同放棄，其得獎資格將被取消，主辦商對未被認領的獎品擁有最終處理權。</br>7.得獎者必須於指定日期內，帶同遊戲內的電子兌換劵到澳門旅遊塔外圓形地廣場-可口可樂攤位，出示電子兌換劵及身份證明文件以簽收及換領獎品。如逾期未領獎品即視作放棄得獎權利。可口可樂®330mL汽水的兌換者，需前往澳門旅遊塔外圓形地廣場場內指定可口可樂汽水機，並按指示輸入電子兌換劵中8位數字號碼兌獎。</br>8.若以任何不完整、偽造、損毀、複製、經修改、塗污或重用之電子兌換劵領獎，均作廢論，主辦商有權取消其得奬資格。</br>9.澳門可口可樂飲料有限公司(即主辦商)保留是次活動之最終決定權。</br>10.參加者必須小心保管是次抽獎活動之電子兌換劵及主辦商發出之其他一切兌獎通知，作為日後兌獎憑證用途。電子兌換劵若有遺失，主辦商決不補發，亦不會承擔參加者因此造成未能兌獎或其他任何損失。</br>11.所有獎品不得兌換現金或其他禮品，不可轉讓或轉售。若主辦商屆時因任何原因未能提供指定獎品，主辦商有權以其他等值獎品代替。</br>12.主辦商有權隨時更改此活動細則而無須事前通知或負上責任。</br>13.主辦商、其技術服務供應商及各獎品供應商對所有因領取或使用各獎品之後果概不負責，得獎者須注意個別獎項所列的相關內容，並須同意遵守各獎品供應商所列有關獎品之各項條款及細則。</br>14.主辦商、其技術服務供應商屬下之員工及家屬均不得參加是項活動以示公允。</br>15.本活動如有任何因電腦、網路、電話、技術或其他不可歸責於主辦商及獎品供應商之事由，而使參加者或得獎者寄出、登錄之資料或使主辦商寄出之確認文件有遺失、錯誤、無法辨識或毀損，導致資料無效之情況，主辦商及獎品供應商不負上任何法律責任，參加者或得獎者均不得異議。</br>16.以任何駭客或其它非法行為破壞活動規則者，其參加及/得獎資格將作廢，主辦商並對有關參加者或得獎者保留法律追訴權。</br>17.圖片只供參考，奬品以實物為準。</br>18.以上條款及細則以主辦商之解讀為準。如有任何爭議，主辦商保留最終決定權。</br>19.得獎者保證所有填寫或提出之資料均為真實且正確，如資料有不實或不正確，將被取消參加或得獎資格。如因此損害主辦商或其他任何第三者，得獎者需負一切相關責任。</br>20.得獎者之個人資料僅用作是次活動記錄得獎者身份及聯絡領獎用途。</br>21.詳情請致電澳門可口可樂飲料有限公司熱線：2823 4567查詢。</br>";
        content.appendChild(ruleDetail);
        ruleDetail.style.opacity = 0;
        KWhaleUtils.Tween(ruleDetail.style,{opacity:1},100,200,TWEEN.Easing.Linear.None).start();
        var home = RES.getRES('c2');
        home.className = "ruleHome";
        content.appendChild(home);
        var arrows = RES.getRES('c5');
        arrows.className = "arrows";
        content.appendChild(arrows);

        home.onclick = function () {
            //返回主页
            KWhaleUtils.Tween(content.style,{opacity:0},0,200,TWEEN.Easing.Linear.None).start().onComplete(function () {
                document.body.removeChild(content);
                $('body').css("position","static");
            });
        };
    }
};