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