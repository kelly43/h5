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

