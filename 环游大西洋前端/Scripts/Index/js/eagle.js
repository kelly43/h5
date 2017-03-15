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