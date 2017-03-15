
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