/**
 * Created by Administrator on 2016/1/10.
 * Class Name: 位图 纹理 类
 * Author: Keiling_J
 */
function Bitmap(img) {
    /* 图片资源 */
    this.img = img;
    this.tempImg = img;
    this.width = img.width;
    this.height = img.height;
    /* 图片宽高比例 */
    this.proportion = img.width / img.height;
    /* 透明度 */
    this.alpha = 1;
    /* 3D 是否支持3D */
    this.is3D = false;
    /* 3D 拓展坐标 */
    this.z_3d = 0;
    /* 3D 围绕z轴旋转的半径 */
    this.z_r = 100;
    this.originImg=img;
    this.blurImg=null;
};
Bitmap.prototype = new DisplayObject();
//alpha ; rotation ; scale ; anchor ; x ; y
Bitmap.prototype.blur = function(){
    if(this.blurImg){
        this.img = this.blurImg;
        return;
    }
    var osc = document.createElement('canvas');
    osc.width = this.img.width/KWRatio;
    osc.height = this.img.height/KWRatio;
    var ctx = osc.getContext('2d');
    ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0,this.img.width, this.img.height);
    var canvasData = ctx.getImageData(0, 0, osc.width, osc.height);
    for ( var x = 0; x < canvasData.width; x++) {
        for (var y = 0; y < canvasData.height; y++) {
// Index of the pixel in the array
            var idx = (x + y * canvasData.width) * 4;
            var r = canvasData.data[idx + 0];
            var g = canvasData.data[idx + 1];
            var b = canvasData.data[idx + 2];
            var a = canvasData.data[idx + 3];
            var gray = .299 * r + .587 * g + .114 * b;
            if(a!=0) {
                canvasData.data[idx + 0] = gray; // Red channel
                canvasData.data[idx + 1] = gray; // Green channel
                canvasData.data[idx + 2] = gray; // Blue channel
                canvasData.data[idx + 3] = a; // Alpha channel
            }
        }
    }
    ctx.putImageData(canvasData, 0, 0);
    this.blurImg=osc;
    this.img = osc;
};
Bitmap.prototype.focus = function() {
    this.img = this.originImg;
};
Bitmap.prototype.draw = function(ctx){
    if(this.is3D){
        /* 如果支持3D  z轴的大小用scale来表现 */
        this.scale = Math.abs(this.z_r/(this.z_r-this.z_3d));
    }
    var scl = this.UseScale();
    var pos = this.UseAnchor();
    var img = this.img;
    var rotate = this.rotation;
    var anchorX = this.anchorX;
    var anchorY = this.anchorY;
    var alpha = this.alpha;
    ctx.save();
    var horizontal = 1;
    if(this.scale ==-1){
        ctx.scale(-1, 1);
        horizontal=-1;
    }
    if(alpha!=1)
        ctx.globalAlpha = alpha;
    ctx.translate((pos.x*horizontal+anchorX*scl.width*horizontal)/window["KWRatio"] , (pos.y+anchorY*scl.height)/window["KWRatio"] );
    if(rotate!=1)
        ctx.rotate(rotate * Math.PI / 180);//旋转
    this.showMask(ctx);
    ctx.drawImage(img, - anchorX*scl.width,- anchorY*scl.height, scl.width, scl.height);
    ctx.restore();
};



