/**
 * Created by Keiling on 2016/6/22.
 */
//用于绘制纹理字体
function BitmapFont(number,data) {
    this.number = number||0;
    this.img = data.img;
    this.res = data.res;
    this.width = data.res["0"]["w"];
    this.height = data.res["0"]["h"];
    this.proportion = this.width / this.height;
};

BitmapFont.prototype = new DisplayObject();

//alpha ; rotation ; scale ; anchor ; x ; y
BitmapFont.prototype.draw = function(ctx) {
    var scl = this.UseScale();
    var that = this;
    var str_num = that.number + "";
    var len_num = str_num.length;

    for (var i = 0; i < len_num; i++) {
        ctx.save();
        ctx.globalAlpha = that.alpha;
        ctx.rotate(that.rotation * Math.PI / 180);//旋转
        ctx.translate((that.x - that.anchorX * scl.width * len_num) / window["KWRatio"], (that.y - that.anchorY * scl.height ) / window["KWRatio"]);

        var ele = str_num[i];
        var data = that.res[ele];
        ctx.drawImage(that.img, data.x, data.y, data.w, data.h, scl.width * i, 0, scl.width, scl.height);
        ctx.restore();
    }
};