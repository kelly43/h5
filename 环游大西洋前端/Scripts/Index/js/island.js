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