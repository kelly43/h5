/**
 * Created by hotyi on 2016/7/1.
 */
function Roo(gc,type) {
    this._gc = gc;
    this._isClick = false;
    this._type = type;          //场景
    this._posX = null;          //X轴
    this._posY = null;          //Y轴
    this._speed = null;         //多久消失
    Roo.RooSet.push(this);
    this.init();
}
Roo.RooSet=[];
Roo.prototype= {
    _roo:null,
    init: function () {
        var that = this,
            s_main = that._gc._stage_main;
        switch (that._type) {
            case 1:
                that._speed = 80;
                break;
            case 2:
                that._speed = 60;
                break;
            case 3:
                that._speed = 40;
                break;
            default :
                that._speed = 10;
                break;
        }
        that.turnUp();
    },

    //出现
    turnUp: function () {
        var that = this,
            s_main = that._gc._stage_main;

        that._posX = KWhaleUtils.getRandomOne2Numer(680)-340;
        that._posY = KWhaleUtils.getRandomOne2Numer(895)+170;
        that._roo = that._gc._panel.createBitmap("dd2",s_main,132/1135,s_main.sw/2+s_main.sh/1135*that._posX,s_main.sh/1135*that._posY);
        that._roo.scale = .5;
        KWhaleUtils.Tween(that._roo, {scale:1}, 0, 100, TWEEN.Easing.Linear.None).start();
        that._isClick = true;
        that.die();
    },

    //消失
    turnDown: function (index) {
        if(Roo.RooSet.length>0 && this._gc._isGameStart) {
            var that = Roo.RooSet[index],
                s_main = this._gc._stage_main;
            if (that._isClick) {
                that._roo.evtObject.destory();
                that._isClick = false;
            }
            Roo.RooSet.splice(index, 1);
            that._roo.alpha = 1;
            var tarY = that._roo.y-that._roo.height/1.5;
            KWhaleUtils.Tween(that._roo, {alpha:0,y:tarY}, 0, 200, TWEEN.Easing.Linear.None).start()
                .onComplete(function () {
                    s_main.removeChild(that._roo);
                });
        }
    },

    //被点击
    die: function () {
        var that = this,
            s_main = that._gc._stage_main;
        new KEvent(that._roo, {type: "touchstart"}, function () {
            that._roo.evtObject.destory();
            that._isClick = false;
            var index = Roo.RooSet.indexOf(that);
            that.turnDown(index);
        });
        that._roo.isAutoReflash=true;
    }
}