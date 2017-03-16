///<jscompress sourcefile="gc.js" />

function GC(stage_bg,stage_main,stage_top){
    /* 场景 */
    this._stage_bg = stage_bg;
    this._stage_main = stage_main;
    this._stage_top = stage_top;
    this._common = new HotyiCommon(this);
    this._targetScore = window["GameScore"]||10;/*挑战成功所需分数*/
    this._score = 0;/*游戏当前分数*/
    this._isTest = false;/*是否调试模式*/
    this._scene = null;

    this._isGameStart = false;
    this._isGameOver = false;
    this._panel = new Panel(this);
    this._islandNum = 3;
    this._allIsland = 6;
    this._speed = 1800;     //风的速度

    this.gameInit();
};

GC.IsGameOver = false;

GC.prototype={

    gameInit:function(){
        this._panel.showStartPanel();
    },

    gameStart:function(){
        var that = this;
        if (!that._isGameStart) {
            //是否禁用 浏览器默认事件
            that._isGameStart = true;
            window["isPreventDefault"] = false;
            that._scene = new Scene(that);
        }
    },

    gameOver:function(){
        var that = this;
        if (!that._isGameOver) {
            that._isGameOver = true;
            window["isPreventDefault"]=true;
            if(that._targetScore<=that._score){
                that._common.showSuccessPanel(that._score);
            }else{
                that._common.showDefeatPanel(that._score);
            }
            for(var i=0;i<3;i++) {
                if (Island.IslandSet[i]._spinning) {
                    Island.IslandSet[i]._spinning.stop();
                }
            }
        }
        //TODO:其它操作
    },

    gameReplay:function(){
        this.clearAllStage();
        this.gameStart();
    },

    clearAllStage:function(){
        var that = this;
        that._stage_main.displayObjectSet=[];
        that._stage_bg.displayObjectSet=[];
        that._stage_top.displayObjectSet=[];
        KEvent.RemoveAllEventObj();
        that._isGameStart = false;
        that._isGameOver = false;
        that._score = 0;
        Island.IslandSet=[];
        Island.LeftOrRight=false;
        that._scene = null;
        that._speed = 1200;
    }

};
///<jscompress sourcefile="panel.js" />
function Panel(gc){
    this._gc = gc;
}

Panel.prototype= {
    //显示游戏开始页面
    _Bg: null,
    _p1BeginBtn: null,
    _p1Title: null,
    _p1Score: null,
    _bird:null,
    _p1ScoreText:null,
    _list:null,
    _rule:null,
    _logo:null,
    showStartPanel: function () {
        var that = this,
            s_bg = that._gc._stage_bg,
            s_top = that._gc._stage_top;
        that._Bg = that.createBitmap("bg",s_bg,1,s_bg.sw/2,s_bg.sh/2);
        that._p1Title = that.createBitmap("title",s_top,126/1135,s_top.sw/2,s_top.sh/1135*205);
        that._p1Score = that.createBitmap("score1",s_top,84/1135,s_top.sw/2,s_top.sh/1135*348);
        that._bird = that.createBitmap("sea_gull1",s_top,292/1135,s_top.sw/2,s_top.sh/1135*563);
        that._p1BeginBtn = that.createBitmap("begin_btn",s_top,145/1135,s_top.sw/2,s_top.sh/1135*828);
        that._list = that.createBitmap("list",s_top,102/1135,s_top.sw/2,s_top.sh/1135*966);
        that._rule = that.createBitmap("rule",s_top,90/1135,s_top.sw/2+s_top.sh/1135*274,s_top.sh/1135*75);

        that._rule.scale = 0.9;
        that._rule.rotation = 1;
        KWhaleUtils.Tween_YoYo(that._rule,{scale:1.2,rotation:360},400,1200,TWEEN.Easing.Linear.None).start();

        that._logo = new Bitmap(RES.getRES("logo"));
        KWhaleUtils.AddStageByScaleHNoCheck(s_top,that._logo,90/1135);
        that._logo.x=stop.sw/2-stop.sh/1135*360;
        that._logo.y=0;

        that._gc._common.getHighScore(function(score) {
            that._p1ScoreText = new Text(score+"","Arial",s_top.sh/200*9,"#23a2e4");
            that._p1ScoreText.y= that._p1Score.y + that._p1ScoreText.height/3;
            that._p1ScoreText.x= s_top.sw/2+s_top.sh/1135*50;
            s_top.addChild(that._p1ScoreText);
        });
        new KEvent(that._p1BeginBtn,{type:"touchstart"},function(){
            that._p1BeginBtn.evtObject.destory();
            that.hideStartPanel();
            that.explainPanel();
        });
        new KEvent(that._list,{type:"touchstart"},function(){
            that._gc._common.showRankingList();
        });
        new KEvent(that._rule,{type:"touchstart"},function(){
            that._gc._common.showRulePanel();
        });
    },
    hideStartPanel:function() {
        var that = this,
            s_top = that._gc._stage_top;
        s_top.removeChild(that._p1BeginBtn);
        s_top.removeChild(that._p1Title);
        s_top.removeChild(that._p1Score);
        s_top.removeChild(that._bird);
        s_top.removeChild(that._list);
        s_top.removeChild(that._rule);
        s_top.removeChild(that._logo);
        s_top.removeChild(that._p1ScoreText);
        that._list.evtObject.destory();
        that._rule.evtObject.destory();
    },
    //玩法介绍
    _explainBg:null,
    _explainImg:null,
    _explainIndex:1,
    explainPanel:function() {
        var that = this,
            s_bg = that._gc._stage_bg,
            s_top = that._gc._stage_top;
        that._explainBg= new Shape.Rectangle({x:s_top.sw/2,y:s_top.sh/2}, s_top.sw, s_top.sh,"rgba(0,0,0,.8)");
        that._explainBg.anchorX=that._explainBg.anchorY=0.5;
        s_top.addChild(that._explainBg);
        that._explainImg = that.createBitmap("explain1",s_top,781/1135,s_top.sw/2,s_top.sh/2);
        new KEvent(that._explainBg,{type:"touchstart"},function(){
            that._explainIndex++;
            if(that._explainIndex<=3){
                that._explainImg.img = RES.getRES('explain' +that._explainIndex);
            }
            if(that._explainIndex>3){
                that._explainBg.evtObject.destory();
                s_top.removeChild(that._explainBg);
                s_top.removeChild(that._explainImg);
                s_bg.removeChild(that._Bg);
                that._gc.gameStart();
            }
        });
    },
    //游戏分数榜
    _scoreImg:null,
    _scoreText:null,
    gameScore: function () {
        var that = this,
            s_top = that._gc._stage_top;
        that._scoreImg = that.createBitmap("score2",s_top,88/1135,s_top.sw/2,s_top.sh/1135*80);
        that._scoreText = new Text(that._gc._score,"Arial",s_top.sh/200*9,"#23a2e4");
        that._scoreText.y= that._scoreImg.y + that._p1ScoreText.height/3;
        that._scoreText.x= s_top.sw/2+s_top.sh/1135*35;
        s_top.addChild(that._scoreText);
    },
    resetScore:function() {
        var that = this,
            s_top = that._gc._stage_top;
        that._scoreText.text = that._gc._score;
    },
    hideGameScore: function() {
        var that = this,
            s_top = that._gc._stage_top;
        s_top.removeChild(that._scoreImg);
        s_top.removeChild(that._scoreText);
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
///<jscompress sourcefile="scene.js" />
function Scene(gc){
    this._gc=gc;
    this._bird = null;
    this._eagle = null;
    this._addScore = 1;     //每过一个岛所加的分数
    this.init();
}

Scene.prototype={

    _Bg:null,
    init:function() {
        var that = this,
            s_main = that._gc._stage_main;
        that._Bg = that._gc._panel.createBitmap("bg2",s_main,1,s_main.sw/2,s_main.sh/2);

        that._gc._panel.gameScore();
        for (var i= 0;i<3;i++) {
            new Island(that._gc,i,s_main.sw/2,s_main.sh/1135*(860-i*530));
        }
        that._bird = new Bird(that._gc);
        that._eagle = new Eagle(that._gc);

        new KEvent(that._Bg,{type:"touchstart"},function(){

            that._Bg.evtObject.destory();
            that._bird.fly();

        });
    }
}


///<jscompress sourcefile="island.js" />
/**
 * Created by Administrator on 2016/5/19.
 */

//小岛
function Island(gc,index,x,y) {
    this._gc = gc;
    this._type = 0;
    this._wind = null;
    this._bitmap = null;
    this._angle = [140,210,320,30];
    this._pointSet = [];
    this._flood = [];
    this._water = null;
    this.slideDown = null;
    Island.IslandSet.push(this);
    this.init(index,x,y);
}
Island.IslandSet=[];
Island.LeftOrRight=false;//left  true:right
Island.prototype = {
    init:function(index,x,y) {
        var that = this,
            s_main = that._gc._stage_main;
        if(Island.LeftOrRight){
            //right
            Island.LeftOrRight=false;
            x += s_main.sh/1135*150;
        }else{
            //left
            Island.LeftOrRight=true;
            x -= s_main.sh/1135*150;
        }
        that._bitmap = that._gc._panel.createBitmap("island"+(index+1),s_main,277/1135,x,y);
        that._wind = that._gc._panel.createBitmap("wind4",s_main,392/1135,that._bitmap.x,that._bitmap.y);
    },

    slide:function (i) {
        var that = this,
            s_main = that._gc._stage_main,
            isSlide = true;
        var helpAnimateObj = {
            posY:0,
            islandY:that._bitmap.y,
            birdY:that._gc._scene._bird._bitmap.y,
            eagleY:that._gc._scene._eagle._bitmap.y
        };
        that.slideDown = KWhaleUtils.Tween(helpAnimateObj, {posY:s_main.sh/1135*530}, 0, 300, TWEEN.Easing.Linear.None).start().onUpdate(function () {
            that._bitmap.y = helpAnimateObj.islandY+helpAnimateObj.posY;
            that._wind.y = helpAnimateObj.islandY+helpAnimateObj.posY;
            that._gc._scene._bird._bitmap.y = helpAnimateObj.birdY+helpAnimateObj.posY;
            that._gc._scene._eagle._bitmap.y = helpAnimateObj.eagleY+helpAnimateObj.posY;
            for (ele in that._flood) {
                if (that._flood[ele]) {
                    that._flood[ele].y = helpAnimateObj.islandY+helpAnimateObj.posY;
                }
            }
        }).onComplete(function(){
            if(isSlide){
                isSlide = false;
                if(that._bitmap.y>s_main.sh){
                    that.reset(i);
                    that._gc._scene._bird.targetOrCurIsland();
                    that._gc._scene._bird._curIsland.flood();
                }
                that._gc._scene._Bg.evtObject.reAdd();
            }
        });
    },
    //小岛淹没过程
    _floodInterval:null,
    flood: function () {
        var that = this,
            s_main = that._gc._stage_main,
            islandScale = 1;
        that._floodInterval = setInterval(function () {
            if(!that._gc._scene._bird._isFly){
                var floodBit = that._gc._panel.createBitmap("wave",s_main,281/1135,that._bitmap.x,that._bitmap.y);
                floodBit.scale = islandScale;
                if(islandScale<=0.3){
                    s_main.removeChild(that._bitmap);
                    that._gc._scene._bird.die(0);
                } else {
                    islandScale-=0.1;
                }
                that._flood.push(floodBit);
            }
        },600);
    },
    _spinning:null,
    reset: function (i) {
        var TIsland = Island.IslandSet.splice(i,1);
        //console.log(TIsland,Island.IslandSet);
        var that = TIsland[0],
            s_main = that._gc._stage_main,
            posX = s_main.sw/2;

        for (ele in that._flood) {
            if (that._flood[ele]) {
                s_main.removeChild(that._flood[ele]);
            }
        }
        that._flood.length = 0;

        if(Island.LeftOrRight){
            //right
            Island.LeftOrRight=false;
            posX += s_main.sh/1135*150;
        }else{
            //left
            Island.LeftOrRight=true;
            posX -= s_main.sh/1135*150;
        }
        if (that._gc._islandNum >= that._gc._allIsland){
            that._gc._islandNum = 1;
        } else {
            that._gc._islandNum++;
        }
        that._bitmap.img =  RES.getRES('island'+that._gc._islandNum);
        that._bitmap.y = -s_main.sh/1135*200;
        that._bitmap.x = posX;
        if(that._gc._score >= 10) {
            that._gc._speed -= 30;
            var typeNum = KWhaleUtils.getRandomOne2Numer(3);
        } else {
            that._gc._speed -= 40;
            var typeNum = KWhaleUtils.getRandomOne2Numer(2);
        }
        that._type = typeNum;
        that._wind = that._gc._panel.createBitmap("wind"+typeNum,s_main,392/1135,that._bitmap.x,that._bitmap.y);
        var point = function (index) {
            var newPoint = new Shape.Circle(that.getPointByAngle(that._bitmap,that._angle[index]+that._wind.rotation), s_main.sh/1135*10,"rgba(0,0,0,0)");
            newPoint._angle = that._angle[index];
            that._pointSet.push(newPoint);
            s_main.addChild(newPoint);
        };
        var changeP = new Object();
        var changePoint = function (index) {
            that._pointSet[index]._pointAngle = that._pointSet[index]._angle + that._wind.rotation;
            if( that._pointSet[index]._pointAngle>360){
                that._pointSet[index]._pointAngle-=360;
            }
            changeP["p"+index] = that.getPointByAngle(that._bitmap,that._pointSet[index]._pointAngle);
            that._pointSet[index].x=changeP["p"+index].x;
            that._pointSet[index].y=changeP["p"+index].y;
        };
        switch (that._type){
            case 1:
                for(var a = 0;a<2;a++){
                    point(a);
                }
                that._spinning = KWhaleUtils.Tween_Loop(that._wind, {rotation:360}, 0, that._gc._speed, TWEEN.Easing.Linear.None).start()
                    .onUpdate(function () {
                        for(var a = 0;a<2;a++) {
                            changePoint(a);
                        }
                    });
                break;
            case 2:
                for(var a = 0;a<4;a++){
                    point(a);
                }
                that._spinning = KWhaleUtils.Tween_Loop(that._wind, {rotation:360}, 0, that._gc._speed, TWEEN.Easing.Linear.None).start()
                    .onUpdate(function () {
                        for(var a = 0;a<4;a++){
                            changePoint(a);
                        }
                    });
                break;
            case 3:
                point(0);
                point(3);
                that._spinning = KWhaleUtils.Tween_Loop(that._wind, {rotation:360}, 0, that._gc._speed, TWEEN.Easing.Linear.None).start()
                    .onUpdate(function () {
                        for(var a = 0;a<2;a++) {
                            changePoint(a);
                        }
                    });
                break;
            default :
                break;
        }

        Island.IslandSet.push(that);
    },
    getPointByAngle:function(point,angle){
        var r = this._gc._stage_main.sh/1135*196;
        var x = point.x+r*Math.cos(angle/180*Math.PI);
        var y = point.y+r*Math.sin(angle/180*Math.PI);
        return {x:x,y:y};
    }
}
///<jscompress sourcefile="bird.js" />
/**
 * Created by Administrator on 2016/5/19.
 */

//海鸥
function Bird(gc) {
    this._gc=gc;
    this._bitmap = null;
    this._targetIsland = null;
    this._curIsland = null;
    this._isFly = false;
    this._flyBack = false;
    this.init();
}

Bird.prototype = {
    init: function () {
        var that = this,
            s_main = that._gc._stage_top;
        that._curIsland = Island.IslandSet[0];
        that._targetIsland=Island.IslandSet[1];
        that._bitmap = that._gc._panel.createBitmap("sea_gull1",s_main,105/1135,that._curIsland._bitmap.x,that._curIsland._bitmap.y);
        that._bitmap.scale = -1;
    },
    targetOrCurIsland: function () {
        var that = this,
            s_main = that._gc._stage_main;

        that._curIsland=that._targetIsland;
        that._targetIsland=Island.IslandSet[1];

    },
    _animateBird:null,
    _flyBackAnimate:null,
    flyBack: function () {
        var that = this,
            s_main = that._gc._stage_main;
        that._animateBird.stop();
        that._flyBack = true;
        that._flyBackAnimate = KWhaleUtils.Tween(that._bitmap, {y:that._curIsland._bitmap.y,x:that._curIsland._bitmap.x}, 0, 300, TWEEN.Easing.Linear.None).start()
            .onComplete(function(){
                that._flyBack = false;
                if (that._curIsland._bitmap.x < s_main.sw / 2) {
                    that._bitmap.scale = -1;
                    that._bitmap.img = RES.getRES("sea_gull1");
                } else {
                    that._bitmap.scale = 1;
                    that._bitmap.img = RES.getRES("sea_gull1");
                }
                that._isFly = false;
                that._gc._scene._Bg.evtObject.reAdd();
            });
    },
    fly: function () {
        var that = this,
            s_main = that._gc._stage_main,
            seal = false,
            islandAngle = 0;

        that._isFly = true;

        that._animateBird = KWhaleUtils.Tween(that._bitmap, {y:that._targetIsland._bitmap.y,x:that._targetIsland._bitmap.x}, 0, 500, TWEEN.Easing.Linear.None).start().onUpdate(function () {
            that._bitmap.img = RES.getRES("sea_gull2");
            islandAngle = KWhaleUtils.getRotationBy2Point(that._targetIsland._bitmap,that._curIsland._bitmap);

            //console.log(that._bitmap.y);
            if (KWhaleUtils.distPoint(that._bitmap,that._targetIsland._bitmap) <= s_main.sh/1135*240 &&
                KWhaleUtils.distPoint(that._bitmap,that._targetIsland._bitmap) >= s_main.sh/1135*100) {
                switch (that._targetIsland._type){
                    case 1:
                        if(that._targetIsland._pointSet[1]._pointAngle>=islandAngle&&
                            that._targetIsland._pointSet[1]._pointAngle-islandAngle<=70){
                            that.flyBack();
                        }
                        break;
                    case 2:
                        if((that._targetIsland._pointSet[1]._pointAngle>=islandAngle&&
                            that._targetIsland._pointSet[1]._pointAngle-islandAngle<=70)||
                            (that._targetIsland._pointSet[3]._pointAngle>=islandAngle&&
                            that._targetIsland._pointSet[3]._pointAngle-islandAngle<=70)){
                            that.flyBack();
                        }
                        break;
                    case 3:
                        switch (that._targetIsland._bitmap.x > s_main.sw/2){
                            case true:
                                //目标岛在右边
                                if(that._targetIsland._pointSet[1]._pointAngle>=islandAngle||
                                    that._targetIsland._pointSet[1]._pointAngle<=9){
                                    that.flyBack();
                                }
                                break;
                            case false:
                                //目标岛在左边
                                if(that._targetIsland._pointSet[1]._pointAngle>=islandAngle&&
                                    that._targetIsland._pointSet[1]._pointAngle<=310){
                                    that.flyBack();
                                }
                                break;
                            default :
                                break;

                        }
                        break;
                    default :
                        break;
                }
            }
        }).onComplete(function(){
            if(!seal) {
                seal = true;
                that._gc._score += that._gc._scene._addScore;
                that._gc._panel.resetScore();

                if (that._targetIsland._bitmap.x < s_main.sw / 2) {
                    that._bitmap.scale = -1;
                    that._bitmap.img = RES.getRES("sea_gull1");
                } else {
                    that._bitmap.scale = 1;
                    that._bitmap.img = RES.getRES("sea_gull1");
                }

                clearInterval(that._curIsland._floodInterval);

                var mobile = setTimeout(function () {
                    clearTimeout(mobile);
                    for (var i = 0; i < 3; i++) {
                        Island.IslandSet[i].slide(i);
                    }
                    if (that._targetIsland._spinning) {
                        for (ele in that._targetIsland._pointSet) {
                            if (that._targetIsland._pointSet[ele])s_main.removeChild(that._targetIsland._pointSet[ele]);
                        }
                        that._targetIsland._pointSet.length = 0;
                        that._targetIsland._spinning.stop();
                        that._targetIsland._wind.img = RES.getRES("wind4");
                    }
                }, 100);
                that._isFly = false;
            }
        });
    },
    _water:null,
    die: function (type) {
        var that = this,
            s_main = that._gc._stage_main,
            s_top = that._gc._stage_top,
            seal = false;

        clearInterval(that._gc._scene._eagle._interval);
        clearInterval(that._curIsland._floodInterval);
        switch (type){
            case 0:
                //小岛淹没
                that._gc._scene._Bg.evtObject.destory();
                s_top.removeChild(that._bitmap);
                that._water = that._gc._panel.createBitmap("water",s_main,110/1135,that._curIsland._bitmap.x,that._curIsland._bitmap.y);
                that._water.anchorX = 0.57;
                that._water.anchorY = 0.58;
                KWhaleUtils.Tween(that._water, {y:that._curIsland._bitmap.y-s_main.sh/1135*40}, 0, 300, TWEEN.Easing.Linear.None).start()
                    .onComplete(function(){
                        if(!seal){
                            seal = true;
                            that._gc.gameOver();
                        }
                    });
                break;
            case 1:
                //碰上老鹰
                //console.log("eagle");
                var bitY = that._bitmap.y;
                that._bitmap.img = RES.getRES("sea_gull3");
                KWhaleUtils.Tween(that._bitmap, {y:bitY+s_main.sh/1135*40}, 0, 300, TWEEN.Easing.Linear.None).start()
                    .onComplete(function(){
                        if(!seal){
                            seal = true;
                            that._gc.gameOver();
                        }
                    });
                break;
            default :
                break;
        }
    }

}
///<jscompress sourcefile="eagle.js" />
/**
 * Created by Administrator on 2016/5/19.
 */

//老鹰
function Eagle(gc) {
    this._gc=gc;
    this._bitmap = null;
    this._curPoint = null;   //起点
    this._targetPoint = null;      //终点
    this.init();
}
Eagle.prototype = {
    _speed:3000,
    _interval:null,
    init:function() {
        var that = this,
            s_main = that._gc._stage_top;
        that._bitmap = that._gc._panel.createBitmap("eagle1",s_main,117/1136,-s_main/1136*200,s_main.sh/1136*580);
        that.direction();

        that._interval = setInterval(function() {
            that.direction();
            that.fly();
            that._speed -= 100;
        },that._speed);
    },
    direction: function () {
        var that = this,
            s_main = that._gc._stage_top;
        if(Math.random()>0.5){
            //起点为0，正方向
            that._curPoint = {
                x:-that._bitmap.width/2
            };
            that._targetPoint = {
                x:s_main.sw+that._bitmap.width/2
            };
            that._bitmap.scale = -1;
        } else {
            //起点为s_main.sw，负方向
            that._curPoint = {
                x:s_main.sw+that._bitmap.width/2
            };
            that._targetPoint = {
                x:-that._bitmap.width/2
            };
            that._bitmap.scale = 1;
        }
        that._bitmap.x = that._curPoint.x;
        that._bitmap.y = s_main.sh/1136*580;
        //console.log(that._bitmap.x);
    },
    _flyAnimal:null,
    fly:function() {
        var that = this,
            s_main = that._gc._stage_top;
        that._flyAnimal = KWhaleUtils.Tween(that._bitmap, {x:that._targetPoint.x}, 0, 1200, TWEEN.Easing.Linear.None).start()
            .onUpdate(function () {
                var birdY = that._gc._scene._bird._bitmap.y,
                    birdX = that._gc._scene._bird._bitmap.x,
                    eagleY = that._bitmap.y,
                    eagleX = that._bitmap.x,
                    eagleW = that._bitmap.width,
                    eagleH = that._bitmap.width;
                if(eagleX-eagleW/2<=birdX&&eagleX+eagleW/2>=birdX){
                    if(eagleY-eagleH/2<=birdY&&eagleY+eagleH/2>=birdY){
                        that._flyAnimal.stop();
                        if(that._gc._scene._bird._flyBack){
                            that._gc._scene._bird._flyBackAnimate.stop();
                        }else {
                            that._gc._scene._bird._animateBird.stop();
                        }
                        that._gc._scene._bird.die(1);
                    }
                }

            });
    }
}
