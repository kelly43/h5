function Scene(gc,type) {
    this._gc = gc;
    this._gas = null;
    this._type = type;         //关卡
    this._timeLine = null;    //游戏总时长
    this._speed = null;       //出现
    this.init();
}

Scene.prototype= {
    _bg:null,
    _timeBox:null,
    _scoreBox:null,
    _timeNum:null,
    _scoreNum:null,
    init: function () {
        var that = this,
            s_main = that._gc._stage_main,
            s_bg = that._gc._stage_bg;
        var index = that._type-1;
        s_bg.isAction = true;
        that._gc._isGameStart = true;
        that._timeLine = window["userJson"].Data.GiftsList[index].RuleTime;
        that._speed = (4-that._type)*8;

        that._bg = that._gc._panel.createBitmap("bg"+that._type,s_bg,1,s_bg.sw/2,s_bg.sh/2);
        s_bg.worldDraw();
        s_bg.isAction = false;
        that._timeBox = that._gc._panel.createBitmap("d4",s_main,67/1135,s_main.sw/2-s_main.sh/1135*219,s_main.sh/1135*64);
        that._scoreBox = that._gc._panel.createBitmap("d3",s_main,67/1135,s_main.sw/2+s_main.sh/1135*219,s_main.sh/1135*64);
        that._timeNum = new Text(that._timeLine,"Arial",s_main.sh/1135*40,"#d35858");
        that._timeNum.y= that._timeBox.y+s_main.sh/1135*15;
        that._timeNum.x= that._timeBox.x+s_main.sh/1135*35-that._timeNum.width/2;
        s_main.addChild(that._timeNum);

        //console.log(that._gc._currentScore);
        that._scoreNum = new Text(that._gc._currentScore,"Arial",s_main.sh/1135*40,"#d35858");
        that._scoreNum.y= that._scoreBox.y+s_main.sh/1135*15;
        that._scoreNum.x= that._scoreBox.x+s_main.sh/1135*46;
        s_main.addChild(that._scoreNum);

        new Gas(that._gc,that._type);
        that.timer();

        //播放音乐
        var music = document.getElementById('music');
        music.play();

    },
    _timer:null,
    timer: function () {
        var that = this,
            s_main = that._gc._stage_main;
        that._timer = setInterval(function () {
            if (that._gc._isGameStart) {
                if (that._timeLine>0) {
                    that._timeLine--;
                    that._timeNum.text = that._timeLine;
                    that._timeNum.getRealSize();
                    that._timeNum.x= that._timeBox.x+s_main.sh/1135*35-that._timeNum.width/2;
                } else {
                    clearInterval(that._timer);
                    that._gc.gameOver(that._type);
                    that._gc._isGameStart = false;
                    for (var i = 0,len=Gas.GasSet.length; i < len; i++) {
                        Gas.GasSet[i]._gas.evtObject.destory();
                    }
                    for (var i = 0,len=Roo.RooSet.length; i < len; i++) {
                        Roo.RooSet[i]._roo.evtObject.destory();
                    }
                }
            }
        },1000);
    },
    _fps:null,
    run:function() {
        var that = this;
        if(that._gc._isGameStart) {
            that._fps = window["gc"].curTime - window["gc"].lastTime-1000/60;
            if (that._fps<=10) {
                that._fps=1;
            } else if (that._fps>40) {
                that._fps=2;
            } else {
                that._fps=1.5;
            }
            for (var i = 0,len=Gas.GasSet.length; i < len; i++) {
                if(Gas.GasSet[i]._speed > 0){
                    Gas.GasSet[i]._speed-=(1*that._fps);
                } else {
                    Gas.GasSet[i].turnDown(i);
                }
                len = Gas.GasSet.length;
            }
            for (var i = 0,len=Roo.RooSet.length; i < len; i++) {
                if(Roo.RooSet[i]._speed > 0){
                    Roo.RooSet[i]._speed-=(1*that._fps);
                } else {
                    Roo.RooSet[i].turnDown(i);
                }
                len = Roo.RooSet.length;
            }
            if (that._speed>0) {
                that._speed-=(1*that._fps);
            } else {
                that._speed = (4-that._type)*8;
                if (that._type!=1) {
                    var a = KWhaleUtils.getRandomOne2Numer(50);
                    switch (a>40) {
                        case true:
                            new Roo(that._gc,that._type);
                            break;
                        case false:
                            new Gas(that._gc,that._type);
                            break;
                        default :
                            new Gas(that._gc,that._type);
                            break;
                    }
                } else {
                    new Gas(that._gc,that._type);
                }

            }
        }
    }
};
