function Derector(stage_bg,stage_main,stage_top){
    /* 场景 */
    this._stage_bg = stage_bg;
    this._stage_main = stage_main;
    this._stage_top = stage_top;
    this._panel = null;
    /*World.ISTEST=true;*/
    window["gc_sh"]=window.innerHeight || document.documentElement.clientHeight;
    window["gc_sw"]=window.innerWidth || document.documentElement.clientWidth;

    this.PageMonitor=null;
    this.initRender();
};

Derector.prototype={
    initRender:function(){
        this.initPageMonitor();
        this._panel = new Panel(this,this._stage_bg,this._stage_main,this._stage_top);
    },
    getActor:function(pageName,actorName){
        return this.PageMonitor[pageName].actors[actorName].displayObject;
    },
    initPageMonitor:function(){
        var sc =  window["SystemConfig"];
        this.PageMonitor={};
        for(var pageName in sc) {
            var pageObj = sc[pageName];
            this.PageMonitor[pageName]={
                realHeight:pageObj.realHeight,
                actors:{}
            };
            for (var actorName in pageObj.actors) {
                this.PageMonitor[pageName].actors[actorName]=pageObj.actors[actorName];
                this.PageMonitor[pageName].actors[actorName].name=pageName+"_"+actorName;
                this.PageMonitor[pageName].actors[actorName].displayObject=this.initOneActor(this.PageMonitor[pageName].realHeight,
                    this.PageMonitor[pageName].actors[actorName]);
            }
        }
    },
    initOneActor:function(pageSize,actorData){
        var s = this._stage_main;
        if(pageSize!=1135){
            s = {
                sh:this._stage_main.sw/720* pageSize,
                sw:this._stage_main.sw
            }
        }
        var obj = KWhaleUtils.getBmpByName(actorData.name);
        KWhaleUtils.ReadyAddStageByScaleHNoCheck(s,obj,actorData.sh/pageSize);
        obj.anchorX=obj.anchorY=0.5;
        switch(actorData.sy){
            case "center":
                obj.y = s.sh/2;
                break;
            default :
                obj.y = s.sh/pageSize*actorData.sy;
                break;
        }
        switch(actorData.sx){
            case "center":
                obj.x = s.sw/2;
                break;
            default :
                obj.x = s.sw/2 + s.sh/pageSize*actorData.sx;
                break;
        }
        return obj;
    },
    showPage:function(page,stage){
        if(page.realHeight!=1135){
            this.setStageByHeight(stage,this._stage_main.sw/720* page.realHeight/ KWRatio);
        }
        for(actor in page.actors){
            stage.addChild(page.actors[actor].displayObject);
            //todo:事件绑定 动画解析
        }
    },
    //清空舞台的所有东西 包括事件dom
    clearAllStage:function(){
        var that = this;
        that._stage_main.displayObjectSet=[];
        that._stage_bg.displayObjectSet=[];
        that._stage_top.displayObjectSet=[];
        KEvent.RemoveAllEventObj();
    },
    clearStageByStage:function(stage){
        var that = this;
        stage.displayObjectSet=[];
        KEvent.RemoveAllEventObj();
    },
    resetAllStage:function(){
        window["isCanMove"]=false;
        window["isCanTouch"]=false;
        this.clearAllStage();
        this._stage_bg.canvas.height = window.innerHeight || document.documentElement.clientHeight;
        this._stage_bg.canvas.width = window.innerWidth || document.documentElement.clientWidth;
        this._stage_bg.ctx = this._stage_bg.canvas.getContext("2d");
        this._stage_bg.sw = this._stage_bg.canvas.width;
        this._stage_bg.sh = this._stage_bg.canvas.height;
        this._stage_bg.isAction=true;

        this._stage_main.canvas.height = window.innerHeight || document.documentElement.clientHeight;
        this._stage_main.canvas.width = window.innerWidth || document.documentElement.clientWidth;
        this._stage_main.ctx = this._stage_main.canvas.getContext("2d");
        this._stage_main.sw = this._stage_main.canvas.width;
        this._stage_main.sh = this._stage_main.canvas.height;
        this._stage_main.isAction=true;

        this._stage_top.canvas.height = window.innerHeight || document.documentElement.clientHeight;
        this._stage_top.canvas.width = window.innerWidth || document.documentElement.clientWidth;
        this._stage_top.ctx = this._stage_top.canvas.getContext("2d");
        this._stage_top.sw = this._stage_top.canvas.width;
        this._stage_top.sh = this._stage_top.canvas.height;
        this._stage_top.isAction=true;
    },
    resetOneStage:function(stage){
        window["isCanMove"]=false;
        window["isCanTouch"]=false;
        this.clearStageByStage(stage);
        stage.canvas.height = window.innerHeight || document.documentElement.clientHeight;
        stage.canvas.width = window.innerWidth || document.documentElement.clientWidth;
        stage.ctx = stage.canvas.getContext("2d");
        stage.sw = stage.canvas.width;
        stage.sh = stage.canvas.height;
        stage.isAction=true;
    },
    setStageByHeight:function(stage,h){
        window["isCanMove"]=true;
        window["isCanTouch"]=true;
        document.body.style.overflowY = "scroll";
        document.body.style.overflowX = "hidden";
        this.clearStageByStage(stage);
        stage.canvas.height = h;
        stage.canvas.width = window.innerWidth || document.documentElement.clientWidth;
        stage.ctx = stage.canvas.getContext("2d");
        stage.sw = stage.canvas.width;
        stage.sh = stage.canvas.height;
        stage.displayObjectSet=[];
    }
};