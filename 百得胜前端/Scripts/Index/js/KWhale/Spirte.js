/**
 * Created by Keiling on 2016/3/3.
 */
//用于绘制精灵图
function Spirte(data,curAction){
    this.img = data.img;
    this.res = data.res;
    this.action = data.action;
    for (var items in data.res){
        this.width=data.res[items]["w"];
        this.height=data.res[items]["h"];
        //this.offX = data.res[items]["offX"];
        //this.offY = data.res[items]["offY"];
        this.proportion = this.width/this.height;
        break;
    };
    this.curAction = curAction;
    this.curActionIndex = 0;
    this.countRate=0;
    this.alpha=1;
    this.isplay=true;
    this.isplayOne=false;
    this.isCall=false;
    this.callFunc=null;
    this.clipImg();
};

Spirte.prototype = new DisplayObject();
Spirte.prototype.clipImg = function(){
    /*
    * "spfish": {
     "isLoad": false,
     "src": "img/enemy_3.png",
     "action": {
     "run": {
     "frameRate": 6,
     "frames": ["big-fish01", "big-fish02", "big-fish03"]
     }
     },
     "res": {
     "big-fish01": {"x": 1, "y": 1, "w": 328, "h": 209},
     "big-fish02": {"x": 1, "y": 212, "w": 328, "h": 209},
     "big-fish03": {"x": 1, "y": 423, "w": 328, "h": 209}
     }
     }
    * */
    /*
     data = that.res[that.action[that.curAction]["frames"][that.curActionIndex]];
     ctx.drawImage(that.img, data.x, data.y, data.w, data.h, -that.anchorX * scl.width, -that.anchorY * scl.height, scl.width, scl.height);
     ctx.restore();
    */
    var that = this;
    that.clipImgSet={};
    for (var items in that.res) {
        var osc = document.createElement('canvas');
        var ele = that.res[items];
        osc.width = ele.w/KWRatio;
        osc.height = ele.h/KWRatio;
        var ctx = osc.getContext('2d');
        ctx.drawImage(that.img, ele.x, ele.y, ele.w, ele.h, 0, 0, ele.w, ele.h);
        that.clipImgSet[items] = osc;
    };
};
//alpha ; rotation ; scale ; anchor ; x ; y
Spirte.prototype.draw = function(ctx) {
    var scl = this.UseScale();
    var pos = this.UseAnchor();
    var that = this;
    ctx.save();
    ctx.globalAlpha = that.alpha;
    ctx.translate(Math.floor((pos.x + that.anchorX * scl.width) / window["KWRatio"]), Math.floor((pos.y + that.anchorY * scl.height) / window["KWRatio"]));
    ctx.rotate(that.rotation * Math.PI / 180);//旋转
    var targetRate = that.action[that.curAction].frameRate;
    that.countRate++;
    var data;
    if (that.isplay) {
        if (that.isplayOne) {
            if (that.countRate >= (60 / targetRate)) {
                that.countRate = 0;
                if (that.action[that.curAction]["frames"].length - 1 > that.curActionIndex) {
                    data = that.clipImgSet[that.action[that.curAction]["frames"][that.curActionIndex]];
                    that.curActionIndex++;
                } else if(that.action[that.curAction]["frames"].length - 1 == that.curActionIndex){
                    if(!that.isCall){
                        that.isCall=true;
                        that.curActionIndex = that.action[that.curAction]["frames"].length - 1 ;
                        //console.log(that.curActionIndex);
                        //console.log("call");
                        if(that.callFunc)
                            that.callFunc();
                    }
                    that.isplayOne = false;
                    that.isplay = false;
                    data = that.clipImgSet[that.action[that.curAction]["frames"][that.curActionIndex]];
                }
            } else {
                data = that.clipImgSet[that.action[that.curAction]["frames"][that.curActionIndex]];
            }
        } else {
            if (that.countRate >= (60 / targetRate)) {
                that.countRate = 0;
                if (that.action[that.curAction]["frames"].length - 1 > that.curActionIndex) {
                    data = that.clipImgSet[that.action[that.curAction]["frames"][that.curActionIndex]];
                    that.curActionIndex++;
                } else {
                    that.curActionIndex = 0;
                    data = that.clipImgSet[that.action[that.curAction]["frames"][that.curActionIndex]];
                }
            } else {
                data = that.clipImgSet[that.action[that.curAction]["frames"][that.curActionIndex]];
            }
        }
    } else {
        data = that.clipImgSet[that.action[that.curAction]["frames"][that.curActionIndex]];
    }
    if(!data){
        that.curActionIndex=0;
        data = that.clipImgSet[that.action[that.curAction]["frames"][that.curActionIndex]];
    }
    ctx.drawImage(data, -Math.floor(that.anchorX * scl.width), -Math.floor(that.anchorY * scl.height), Math.floor(scl.width), Math.floor(scl.height));
    //ctx.drawImage(that.img, data.x, data.y, data.w, data.h, -that.anchorX * scl.width, -that.anchorY * scl.height, scl.width, scl.height);
    ctx.restore();
};

//循环播放精灵动作 参数：动画名字
Spirte.prototype.play = function(actionName){
    this.curAction=actionName;
    this.isplay=true;
};
//播放一次精灵动作 参数：动画名字
Spirte.prototype.playOne = function(actionName){
    this.curAction=actionName;
    this.isplay=true;
    this.isplayOne=true;
};
//暂时精灵动作
Spirte.prototype.stop = function(){
    this.isplay=false;
};
//停止在当前播放动作的第 index 帧
Spirte.prototype.stopAt = function(index){
    this.stop();
    this.curActionIndex=index;
};