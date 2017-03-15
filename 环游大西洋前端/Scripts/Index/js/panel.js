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