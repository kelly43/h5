///<jscompress sourcefile="KPhysical.js" />
/**
 * Created by Keiling on 2016/3/1.
 */
//物理运动相关类
function KPhysical(displayObject,ruleObject) {
    /*revolution: {
        isRun:false,
        speed: 0.2,
        r: 100,
        rotationPoint: {x: 0, y: 0}
    }*/
    this.physicalObject = ruleObject;
    this.displayObject = displayObject;
    KPhysical.PhysicalSet.push(this);
};
KPhysical.PhysicalSet=[];
KPhysical.prototype.runPhysical = function(){
    if(this.physicalObject.revolution.isRun) {
        var x = this.physicalObject.revolution.r*2 * Math.cos(this.physicalObject.revolution.angle / 180 * Math.PI);
        var y = this.physicalObject.revolution.r*2 * Math.sin(this.physicalObject.revolution.angle / 180 * Math.PI);
        this.displayObject.x = x + this.physicalObject.revolution.rotationPoint.x;
        this.displayObject.y = y + this.physicalObject.revolution.rotationPoint.y;
        if(this.physicalObject.revolution.angle==360){
            this.physicalObject.revolution.angle=360
        }
        this.physicalObject.revolution.angle+=0.2;
    }
};

//暂停某一个绑定物理运动的显示对象
KPhysical.stopPhysicalObjctByDisplayObject = function(obj) {
    for(var i= 0,len=KPhysical.PhysicalSet.length;i<len;i++){
        if(KPhysical.PhysicalSet[i].displayObject==obj){
            KPhysical.PhysicalSet[i].physicalObject.revolution.isRun=false;
        }
    }
};
///<jscompress sourcefile="KWhaleAnimate.js" />
/**
 * Created by Administrator on 2016/1/12.
 */
//动画相关 暂时 不管
function KWhaleAnimate (stage) {
    KWhaleAnimate.KWHAHLE_ANIMATE_SET.push(this);
    this.isUpdateAnimate = false;
    /*rty*/
    this._isRotationY = false;
    this._rotationY_obj = {};
    this.stage = stage;
};

KWhaleAnimate.KWHAHLE_ANIMATE_SET=[];
KWhaleAnimate.update=function(){
    var arr = KWhaleAnimate.KWHAHLE_ANIMATE_SET;
    for(var i= 0,len=arr.length;i<len;i++){
        if(arr[i].isUpdateAnimate){
            if(arr[i]._isRotationY){
                arr[i]._rotationY();
                console.log("j")
            }
            //just one updte
        }
    }
};
KWhaleAnimate.prototype.start=function() {
    this.isUpdateAnimate = true;
};
KWhaleAnimate.prototype.stop=function() {
    this.isUpdateAnimate = false;
};

/***RotationY***/
KWhaleAnimate.prototype.startRotationY=function(){
    this._isRotationY = true;
};
KWhaleAnimate.prototype.stopRotationY=function(){
    this._isRotationY = false;
};
KWhaleAnimate.prototype.removeRotationY = function(){
    this.stopRotationY();
    this._rotationY_obj = {};
};
KWhaleAnimate.prototype.rotationY = function(objArr,r,rx,ry,MaxScale){
    this._rotationY_obj = {objArr:objArr,stage:this.stage,r:r,MaxScale:MaxScale,rx:rx,ry:ry};
};
KWhaleAnimate.prototype._rotationY = function(){
    var rx = this._rotationY_obj.rx;
    var ry = this._rotationY_obj.ry;
    var objArr = this._rotationY_obj.objArr;
    var stage = this._rotationY_obj.stage;
    var r= this._rotationY_obj.r;
    var MaxScale = this._rotationY_obj.MaxScale;
    for(var i = 0,len=objArr.length;i<len;i++){
        objArr[i].x = (rx+Math.sin( objArr[i].speed * Math.PI/180 ) * r);
        objArr[i].y = (ry-Math.cos( objArr[i].speed * Math.PI/180 ) * r/10);
        objArr[i].z_3d = (0+Math.cos( objArr[i].speed * Math.PI/180 ) * r);
        objArr[i].speed+=(0.1);
        if(Math.abs(r/(r-objArr[i].z_3d))>MaxScale){
            objArr[i].scale = MaxScale;
        }else{
            objArr[i].scale = Math.abs(r/(r-objArr[i].z_3d));
        }
        objArr[i].z=objArr[i].z_3d;
    }
};

///<jscompress sourcefile="Line.js" />
/**
 * Created by Keiling on 2016/2/27.
 */
// 用于 2个显示对象之间进行连线
function Line(startObj,endObj,color,lineWidth,isNewPoint){
    var helpFunc = function(obj){
        var newObj = {};
        for(i in obj){
            newObj[i]=obj[i]
        }
        return newObj;
    };
    if(isNewPoint==undefined){
        this.startObj = helpFunc(startObj);
        this.endObj = helpFunc(endObj);
    }else{
        this.startObj = startObj;
        this.endObj = endObj;
    }
    this.color = color;
    this.lineWidth = lineWidth;
    this.alpha = 1;
}
Line.prototype = new DisplayObject();
Line.prototype.draw = function(ctx){
    if(this.alpha!=1)
        ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.startObj.x/window["KWRatio"] ,this.startObj.y/window["KWRatio"] );
    ctx.lineTo(this.endObj.x/window["KWRatio"] ,this.endObj.y/window["KWRatio"] );
    ctx.stroke();
};
///<jscompress sourcefile="RES.js" />
/**
 * Created by Administrator on 2016/1/11.
 */


function RES(){};
RES.RES_JSON = {
    /*"spfish": {
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
    },
    "boss": {
        "isLoad": false,
        "src": "img/enemy1.png",
        "action": {
            "run": {
                "frameRate": 6,
                "frames": ["B0777C93", "603AD09C", "D481400"]
            },
            "death": {
                "frameRate": 12,
                "frames": ["83BD8CBE", "DAC236F1", "4275A267"]
            }
        },
        "res": {
            "B0777C93": {"x": 1, "y": 1, "w": 292, "h": 324},
            "603AD09C": {"x": 1, "y": 327, "w": 292, "h": 324},
            "D481400": {"x": 1, "y": 653, "w": 292, "h": 324},
            "83BD8CBE": {"x": 295, "y": 1, "w": 292, "h": 324},
            "DAC236F1": {"x": 589, "y": 1, "w": 292, "h": 324},
            "4275A267": {"x": 295, "y": 327, "w": 292, "h": 324}
        }
    },
    "p6_inside": {isLoad: false, src: "img/p6_inside.png"}*/
};

RES.load=function(progress,finish){
    var total = Object.getOwnPropertyNames(RES.RES_JSON).length;
    var count = 0;
    if(total==0){
        progress(1,1);
        finish();
        return
    }
    for(var obj in RES.RES_JSON){
        var src = RES.RES_JSON[obj].src;
        var func =function(obj){
            var image = new Image();
            image.src = src;
            if (image.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
                RES.RES_JSON[obj].isLoad=true;
                RES.DATA_SET[obj]=image;
                count++;
                progress(count,total);
                if(count==total){
                    finish();
                }
                return; // 直接返回，不用再处理onload事件
            }
            image.onload  = function () {
                RES.RES_JSON[obj].isLoad=true;
                RES.DATA_SET[obj]=image;
                count++;
                progress(count,total);
                if(count==total){
                    finish();
                }
            }
        };
        try{
            func(obj);
        }catch (e){
            console.error("err:img load:"+obj)
        }
    }
}

RES.DATA_SET={};

RES.getRES = function(resName){
    try{
        if(RES.RES_JSON[resName].isLoad) {
            var rs = RES.DATA_SET[resName];
            return rs;
        }else{
            console.error("err:img load"+resName)
        }
    }catch (e){
        console.error("err:img load:"+resName)
    }
}

RES.getSpirteRES = function(resName){
    if(RES.RES_JSON[resName].isLoad) {
        var rs = {};
        rs.img = RES.DATA_SET[resName];
        var data = RES.RES_JSON[resName];
        rs.action=data.action;
        rs.res=data.res;
        return rs;
    }else{
        alert("err:img load")
    }
}

///<jscompress sourcefile="Shape.js" />
/**
 * Created by Keiling on 2016/3/4.
 */
//用于矢量绘图 矩形 圆形
var Shape = (function(){
    function Rectangle(pos,w,h,color){
        this.x = pos.x;
        this.y = pos.y;
        //0:normal 1:has Stroke 2:just Stroke
        this.fillColor = color;
        this.strokeColor = color;
        this.lineWidth = 1;
        this.type=0;
        this.width = w;
        this.height = h;
    };
    //这种方式实现继承 不太好 会因为位置的变化而 改变
    Rectangle.prototype=new DisplayObject();
    Rectangle.prototype.draw=function(ctx){
        var scl = this.UseScale();
        var pos = this.UseAnchor();
        switch (this.type){
            case 0:
                ctx.save();
                ctx.beginPath();
                ctx.globalAlpha = this.alpha;
                ctx.translate((pos.x+this.anchorX*scl.width)/window["KWRatio"] , (pos.y+this.anchorY*scl.height)/window["KWRatio"] );
                ctx.rotate(this.rotation * Math.PI / 180);//旋转
                this.showMask(ctx);
                ctx.rect(-this.anchorX*scl.width /window["KWRatio"],-this.anchorY*scl.height/window["KWRatio"],scl.width/window["KWRatio"], scl.height/window["KWRatio"]);
                ctx.fillStyle=this.fillColor;
                ctx.fill();
                ctx.restore();
                break;
            case 1:
                ctx.save();
                ctx.beginPath();
                ctx.globalAlpha = this.alpha;
                ctx.translate((pos.x+this.anchorX*scl.width)/window["KWRatio"] , (pos.y+this.anchorY*scl.height)/window["KWRatio"] );
                ctx.rotate(this.rotation * Math.PI / 180);//旋转
                this.showMask(ctx);
                ctx.rect(-this.anchorX*scl.width /window["KWRatio"],-this.anchorY*scl.height/window["KWRatio"],scl.width/window["KWRatio"], scl.height/window["KWRatio"]);
                ctx.strokeStyle=this.strokeColor;
                ctx.fillStyle=this.fillColor;
                ctx.lineWidth=this.lineWidth/window["KWRatio"]*this.scale;
                ctx.stroke();
                ctx.fill();
                ctx.restore();
                break;
            case 2:
                ctx.save();
                ctx.beginPath();
                ctx.globalAlpha = this.alpha;
                ctx.translate((pos.x+this.anchorX*scl.width)/window["KWRatio"] , (pos.y+this.anchorY*scl.height)/window["KWRatio"] );
                ctx.rotate(this.rotation * Math.PI / 180);//旋转
                this.showMask(ctx);
                ctx.rect(-this.anchorX*scl.width /window["KWRatio"],-this.anchorY*scl.height/window["KWRatio"],scl.width/window["KWRatio"], scl.height/window["KWRatio"]);
                ctx.strokeStyle=this.strokeColor;
                ctx.lineWidth=this.lineWidth/window["KWRatio"]*this.scale;
                ctx.fillStyle=this.fillColor;
                ctx.stroke();
                ctx.restore();
                break;
        }
    };

    /*are*/
    function Circle(pos,r,color){
        this.x = pos.x;
        this.y = pos.y;
        //0:normal 1:has Stroke 2:just Stroke
        this.fillColor = color;
        this.strokeColor = color;
        this.lineWidth = 1;
        this.type=0;
        this.r = r;
    }
    Circle.prototype=new DisplayObject();
    Circle.prototype.UseAnchor = function(){
        var pos = {x:0,y:0};
        var scl = this.UseScale();
        pos.x = this.x-scl.r*this.anchorX;
        pos.y = this.y-scl.r*this.anchorY;
        return pos;
    };
    Circle.prototype.UseScale = function(){
        var scl = {r:0};
        scl.r = this.r*this.scale;
        return scl;
    };
    Circle.prototype.draw=function(ctx){
        var scl = this.UseScale();
        var pos = this.UseAnchor();
        switch (this.type){
            case 0:
                ctx.save();
                ctx.beginPath();
                ctx.globalAlpha = this.alpha;
                ctx.translate((pos.x+this.anchorX*scl.r)/window["KWRatio"] , (pos.y+this.anchorY*scl.r)/window["KWRatio"] );
                ctx.rotate(this.rotation * Math.PI / 180);//旋转
                //ctx.rect(-this.anchorX*scl.width /window["KWRatio"],-this.anchorY*scl.height/window["KWRatio"],scl.width/window["KWRatio"], scl.height/window["KWRatio"]);
                this.showMask(ctx);
                ctx.arc(0,0, this.r/window["KWRatio"], 0, Math.PI * 2, true);
                ctx.fillStyle=this.fillColor;
                ctx.fill();
                ctx.restore();
                break;
            case 1:
                ctx.save();
                ctx.beginPath();
                ctx.globalAlpha = this.alpha;
                ctx.translate((pos.x+this.anchorX*scl.r)/window["KWRatio"] , (pos.y+this.anchorY*scl.r)/window["KWRatio"] );
                ctx.rotate(this.rotation * Math.PI / 180);//旋转
                //ctx.rect(-this.anchorX*scl.width /window["KWRatio"],-this.anchorY*scl.height/window["KWRatio"],scl.width/window["KWRatio"], scl.height/window["KWRatio"]);
                this.showMask(ctx);
                ctx.arc(0,0, this.r/window["KWRatio"], 0, Math.PI * 2, true);
                ctx.strokeStyle=this.strokeColor;
                ctx.lineWidth=this.lineWidth/window["KWRatio"]*this.scale;
                ctx.fillStyle=this.fillColor;
                ctx.stroke();
                ctx.fill();
                ctx.restore();
                break;
            case 2:
                ctx.save();
                ctx.beginPath();
                ctx.globalAlpha = this.alpha;
                ctx.translate((pos.x+this.anchorX*scl.r)/window["KWRatio"] , (pos.y+this.anchorY*scl.r)/window["KWRatio"] );
                ctx.rotate(this.rotation * Math.PI / 180);//旋转
                //ctx.rect(-this.anchorX*scl.width /window["KWRatio"],-this.anchorY*scl.height/window["KWRatio"],scl.width/window["KWRatio"], scl.height/window["KWRatio"]);
                this.showMask(ctx);
                ctx.arc(0,0, this.r/window["KWRatio"], 0, Math.PI * 2, true);
                ctx.strokeStyle=this.strokeColor;
                ctx.lineWidth=this.lineWidth/window["KWRatio"]*this.scale;
                ctx.fillStyle=this.fillColor;
                ctx.stroke();
                ctx.restore();
                break;
        }
    };
    return{
        Rectangle:Rectangle,
        Circle:Circle
    }
}());
///<jscompress sourcefile="Spirte.js" />
/**
 * Created by Keiling on 2016/3/3.
 */
//用于绘制精灵图
function Spirte(data,curAction){
    this.img = data.img;
    this.res = data.res;
    this.action = data.action;
    for (items in data.res){
        this.width=data.res[items]["w"];
        this.height=data.res[items]["h"];
        //this.offX = data.res[items]["offX"];
        //this.offY = data.res[items]["offY"];
        this.proportion = this.width/this.height;
        break;
    }
    this.curAction = curAction;
    this.curActionIndex = 0;
    this.countRate=0;
    this.alpha=1;
    this.isplay=true;
    this.isplayOne=false;
    this.isCall=false;
    this.callFunc=null;
};

Spirte.prototype = new DisplayObject();

//alpha ; rotation ; scale ; anchor ; x ; y
Spirte.prototype.draw = function(ctx) {
    var scl = this.UseScale();
    var pos = this.UseAnchor();
    var that = this;
    ctx.save();
    ctx.globalAlpha = that.alpha;
    ctx.translate((pos.x + that.anchorX * scl.width) / window["KWRatio"], (pos.y + that.anchorY * scl.height) / window["KWRatio"]);
    ctx.rotate(that.rotation * Math.PI / 180);//旋转
    var targetRate = that.action[that.curAction].frameRate;
    that.countRate++;
    var data;
    if (that.isplay) {
        if (that.isplayOne) {
            if (that.countRate >= (60 / targetRate)) {
                that.countRate = 0;
                if (that.action[that.curAction]["frames"].length - 1 > that.curActionIndex) {
                    data = that.res[that.action[that.curAction]["frames"][that.curActionIndex]];
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
                    data = that.res[that.action[that.curAction]["frames"][that.curActionIndex]];
                }
            } else {
                data = that.res[that.action[that.curAction]["frames"][that.curActionIndex]];
            }
        } else {
            if (that.countRate >= (60 / targetRate)) {
                that.countRate = 0;
                if (that.action[that.curAction]["frames"].length - 1 > that.curActionIndex) {
                    data = that.res[that.action[that.curAction]["frames"][that.curActionIndex]];
                    that.curActionIndex++;
                } else {
                    that.curActionIndex = 0;
                    data = that.res[that.action[that.curAction]["frames"][that.curActionIndex]];
                }
            } else {
                data = that.res[that.action[that.curAction]["frames"][that.curActionIndex]];
            }
        }
    } else {
        data = that.res[that.action[that.curAction]["frames"][that.curActionIndex]];
    }
    if(!data){
        that.curActionIndex=0;
        data = that.res[that.action[that.curAction]["frames"][that.curActionIndex]];
    }
    ctx.drawImage(that.img, data.x, data.y, data.w, data.h, -that.anchorX * scl.width, -that.anchorY * scl.height, scl.width, scl.height);
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
///<jscompress sourcefile="Stage.js" />
/**
 * Created by Administrator on 2016/1/10.
 */
//舞台类
function Stage(canvas) {
    canvas.height = window.innerHeight || document.documentElement.clientHeight;
    canvas.width = window.innerWidth || document.documentElement.clientWidth;
    this.ctx = canvas.getContext("2d");
    this.isAction = true;
    this.displayObjectSet = [];
    this.canvas = canvas;
    this.sw = canvas.width;
    this.sh = canvas.height;
};
Stage.prototype.removeAllDisplayObject = function(){
    this.displayObjectSet = [];
};
Stage.prototype.worldDraw = function(){
    if(this.isAction) {
        this.canvas.width=this.canvas.width;
        //this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        var objset = this.displayObjectSet;
        for (var i = 0, len = objset.length; i < len; i++) {
            if(objset[i].isAlive) {
                if(objset[i].alpha!=0)
                    objset[i].draw(this.ctx);
                if(objset[i].isAutoReflash ){
                    objset[i].evtObject.reflashAttribute();
                }
            }
        }
        var physicalSet = KPhysical.PhysicalSet;
        for (var j = 0, jlen = physicalSet.length; jlen>0&&j < jlen; j++) {
            physicalSet[j].runPhysical();
        }
    }
};
Stage.DISPLAY_OBJECT_COUNT=0;

Stage.prototype.addChild = function (disObj) {
    disObj.z = Stage.DISPLAY_OBJECT_COUNT;
    Stage.DISPLAY_OBJECT_COUNT++;
    this.displayObjectSet.push(disObj);
};

Stage.prototype.removeChild = function (disObj) {
    var objset = this.displayObjectSet;
    for (var i = 0, len = objset.length; i < len; i++) {
        if(objset[i]==disObj){
            this.displayObjectSet.splice(i,1);
            Stage.DISPLAY_OBJECT_COUNT--;
        }
    }
};

Stage.prototype.reflashZ=function() {
    var objset = this.displayObjectSet;
    for (var i = 0, len = objset.length; i < len; i++) {
        for (var j = i + 1, len = objset.length; j < len; j++) {
            if (objset[i].z > objset[j].z) {
                var temp = objset[j];
                objset[j] = objset[i];
                objset[i] = temp;
            }
        }
    }
}
///<jscompress sourcefile="Stats.js" />
//用于显示FPS
var Stats = function () {

	var now = ( self.performance && self.performance.now ) ? self.performance.now.bind( performance ) : Date.now;

	var startTime = now(), prevTime = startTime;
	var frames = 0, mode = 0;

	function createElement( tag, id, css ) {

		var element = document.createElement( tag );
		element.id = id;
		element.style.cssText = css;
		return element;

	}

	function createPanel( id, fg, bg ) {

		var div = createElement( 'div', id, 'padding:0 0 3px 3px;text-align:left;background:' + bg );

		var text = createElement( 'div', id + 'Text', 'font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:' + fg );
		text.innerHTML = id.toUpperCase();
		div.appendChild( text );

		var graph = createElement( 'div', id + 'Graph', 'width:74px;height:30px;background:' + fg );
		div.appendChild( graph );

		for ( var i = 0; i < 74; i ++ ) {

			graph.appendChild( createElement( 'span', '', 'width:1px;height:30px;float:left;opacity:0.9;background:' + bg ) );

		}

		return div;

	}

	function setMode( value ) {

		var children = container.children;

		for ( var i = 0; i < children.length; i ++ ) {

			children[ i ].style.display = i === value ? 'block' : 'none';

		}

		mode = value;

	}

	function updateGraph( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = Math.min( 30, 30 - value * 30 ) + 'px';

	}

	//

	var container = createElement( 'div', 'stats', 'width:80px;opacity:0.9;cursor:pointer' );
	container.addEventListener( 'mousedown', function ( event ) {

		event.preventDefault();
		setMode( ++ mode % container.children.length );

	}, false );

	// FPS

	var fps = 0, fpsMin = Infinity, fpsMax = 0;

	var fpsDiv = createPanel( 'fps', '#0ff', '#002' );
	var fpsText = fpsDiv.children[ 0 ];
	var fpsGraph = fpsDiv.children[ 1 ];

	container.appendChild( fpsDiv );

	// MS

	var ms = 0, msMin = Infinity, msMax = 0;

	var msDiv = createPanel( 'ms', '#0f0', '#020' );
	var msText = msDiv.children[ 0 ];
	var msGraph = msDiv.children[ 1 ];

	container.appendChild( msDiv );

	// MEM

	if ( self.performance && self.performance.memory ) {

		var mem = 0, memMin = Infinity, memMax = 0;

		var memDiv = createPanel( 'mb', '#f08', '#201' );
		var memText = memDiv.children[ 0 ];
		var memGraph = memDiv.children[ 1 ];

		container.appendChild( memDiv );

	}

	//

	setMode( mode );

	return {

		REVISION: 14,

		domElement: container,

		setMode: setMode,

		begin: function () {

			startTime = now();

		},

		end: function () {

			var time = now();

			ms = time - startTime;
			msMin = Math.min( msMin, ms );
			msMax = Math.max( msMax, ms );

			msText.textContent = ( ms | 0 ) + ' MS (' + ( msMin | 0 ) + '-' + ( msMax | 0 ) + ')';
			updateGraph( msGraph, ms / 200 );

			frames ++;

			if ( time > prevTime + 1000 ) {

				fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
				fpsMin = Math.min( fpsMin, fps );
				fpsMax = Math.max( fpsMax, fps );

				fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
				updateGraph( fpsGraph, fps / 100 );

				prevTime = time;
				frames = 0;

				if ( mem !== undefined ) {

					var heapSize = performance.memory.usedJSHeapSize;
					var heapSizeLimit = performance.memory.jsHeapSizeLimit;

					mem = Math.round( heapSize * 0.000000954 );
					memMin = Math.min( memMin, mem );
					memMax = Math.max( memMax, mem );

					memText.textContent = mem + ' MB (' + memMin + '-' + memMax + ')';
					updateGraph( memGraph, heapSize / heapSizeLimit );

				}

			}

			return time;

		},

		update: function () {

			startTime = this.end();

		}

	};

};

if ( typeof module === 'object' ) {

	module.exports = Stats;

}

///<jscompress sourcefile="Text.js" />
/**
 * Created by Keiling on 2016/3/2.
 * get:anchorX=0,anchorY=1,不可设置
 * get:scale 不可设置
 */
function Text(text,fontFamily,fontSize,color) {
    this.text = text;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.color = color;
    this.ele = null;
    this.bold="";
    this.getRealSize();
};

Text.prototype=new DisplayObject();

Text.prototype.getRealSize=function(){
    if(World.ISTEST){
        console.log("Text is no suppor the attribute of 'anchor'and 'scale'")
    }
    this.ele = document.createElement("span");
    this.ele.style.position = "absolute";
    this.ele.style.backgroundColor = "red";
    this.ele.style.fontFamily=this.fontFamily;
    this.ele.style.fontSize=this.fontSize/window["KWRatio"]+"px";
    this.ele.style.lineHeight=this.fontSize/window["KWRatio"]+"px";
    this.ele.innerHTML=this.text;
    document.body.appendChild(this.ele);
    this.width = this.ele.offsetWidth*window["KWRatio"];
    this.height = this.ele.offsetHeight*window["KWRatio"];
    document.body.removeChild(this.ele);
    this.ele=null;
};
Text.prototype.UseAnchor = function(){
    var pos = {x:0,y:0};
    pos.x = this.x;
    pos.y = this.y;
    return pos;
};

Text.prototype.draw = function(ctx){
    var pos = {x:0,y:0};
    pos.x = this.x;
    pos.y = this.y;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate((pos.x)/window["KWRatio"] , (pos.y)/window["KWRatio"] );
    ctx.rotate(this.rotation * Math.PI / 180);//旋转
    ctx.font=this.bold+ " "+(this.fontSize/window["KWRatio"])+"px "+this.fontFamily ;
    ctx.fillStyle=this.color;
    ctx.fillText(this.text,0,0)//(pos.x+this.anchorX*scl.width) ,(pos.y+this.anchorY*scl.height))
    ctx.restore();
};
///<jscompress sourcefile="Tween.js" />
// tween.js v.0.15.0 https://github.com/sole/tween.js
void 0===Date.now&&(Date.now=function(){return(new Date).valueOf()});var TWEEN=TWEEN||function(){var n=[];return{REVISION:"14",getAll:function(){return n},removeAll:function(){n=[]},add:function(t){n.push(t)},remove:function(t){var r=n.indexOf(t);-1!==r&&n.splice(r,1)},update:function(t){if(0===n.length)return!1;var r=0;for(t=void 0!==t?t:"undefined"!=typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now();r<n.length;)n[r].update(t)?r++:n.splice(r,1);return!0}}}();TWEEN.Tween=function(n){var t=n,r={},i={},u={},o=1e3,e=0,a=!1,f=!1,c=!1,s=0,h=null,l=TWEEN.Easing.Linear.None,p=TWEEN.Interpolation.Linear,E=[],d=null,v=!1,I=null,w=null,M=null;for(var O in n)r[O]=parseFloat(n[O],10);this.to=function(n,t){return void 0!==t&&(o=t),i=n,this},this.start=function(n){TWEEN.add(this),f=!0,v=!1,h=void 0!==n?n:"undefined"!=typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now(),h+=s;for(var o in i){if(i[o]instanceof Array){if(0===i[o].length)continue;i[o]=[t[o]].concat(i[o])}r[o]=t[o],r[o]instanceof Array==!1&&(r[o]*=1),u[o]=r[o]||0}return this},this.stop=function(){return f?(TWEEN.remove(this),f=!1,null!==M&&M.call(t),this.stopChainedTweens(),this):this},this.stopChainedTweens=function(){for(var n=0,t=E.length;t>n;n++)E[n].stop()},this.delay=function(n){return s=n,this},this.repeat=function(n){return e=n,this},this.yoyo=function(n){return a=n,this},this.easing=function(n){return l=n,this},this.interpolation=function(n){return p=n,this},this.chain=function(){return E=arguments,this},this.onStart=function(n){return d=n,this},this.onUpdate=function(n){return I=n,this},this.onComplete=function(n){return w=n,this},this.onStop=function(n){return M=n,this},this.update=function(n){var f;if(h>n)return!0;v===!1&&(null!==d&&d.call(t),v=!0);var M=(n-h)/o;M=M>1?1:M;var O=l(M);for(f in i){var m=r[f]||0,N=i[f];N instanceof Array?t[f]=p(N,O):("string"==typeof N&&(N=m+parseFloat(N,10)),"number"==typeof N&&(t[f]=m+(N-m)*O))}if(null!==I&&I.call(t,O),1==M){if(e>0){isFinite(e)&&e--;for(f in u){if("string"==typeof i[f]&&(u[f]=u[f]+parseFloat(i[f],10)),a){var T=u[f];u[f]=i[f],i[f]=T}r[f]=u[f]}return a&&(c=!c),h=n+s,!0}null!==w&&w.call(t);for(var g=0,W=E.length;W>g;g++)E[g].start(n);return!1}return!0}},TWEEN.Easing={Linear:{None:function(n){return n}},Quadratic:{In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}},Cubic:{In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}},Quartic:{In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}},Quintic:{In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}},Sinusoidal:{In:function(n){return 1-Math.cos(n*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return.5*(1-Math.cos(Math.PI*n))}},Exponential:{In:function(n){return 0===n?0:Math.pow(1024,n-1)},Out:function(n){return 1===n?1:1-Math.pow(2,-10*n)},InOut:function(n){return 0===n?0:1===n?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(-Math.pow(2,-10*(n-1))+2)}},Circular:{In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}},Elastic:{In:function(n){var t,r=.1,i=.4;return 0===n?0:1===n?1:(!r||1>r?(r=1,t=i/4):t=i*Math.asin(1/r)/(2*Math.PI),-(r*Math.pow(2,10*(n-=1))*Math.sin(2*(n-t)*Math.PI/i)))},Out:function(n){var t,r=.1,i=.4;return 0===n?0:1===n?1:(!r||1>r?(r=1,t=i/4):t=i*Math.asin(1/r)/(2*Math.PI),r*Math.pow(2,-10*n)*Math.sin(2*(n-t)*Math.PI/i)+1)},InOut:function(n){var t,r=.1,i=.4;return 0===n?0:1===n?1:(!r||1>r?(r=1,t=i/4):t=i*Math.asin(1/r)/(2*Math.PI),(n*=2)<1?-.5*r*Math.pow(2,10*(n-=1))*Math.sin(2*(n-t)*Math.PI/i):r*Math.pow(2,-10*(n-=1))*Math.sin(2*(n-t)*Math.PI/i)*.5+1)}},Back:{In:function(n){var t=1.70158;return n*n*((t+1)*n-t)},Out:function(n){var t=1.70158;return--n*n*((t+1)*n+t)+1},InOut:function(n){var t=2.5949095;return(n*=2)<1?.5*n*n*((t+1)*n-t):.5*((n-=2)*n*((t+1)*n+t)+2)}},Bounce:{In:function(n){return 1-TWEEN.Easing.Bounce.Out(1-n)},Out:function(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},InOut:function(n){return.5>n?.5*TWEEN.Easing.Bounce.In(2*n):.5*TWEEN.Easing.Bounce.Out(2*n-1)+.5}}},TWEEN.Interpolation={Linear:function(n,t){var r=n.length-1,i=r*t,u=Math.floor(i),o=TWEEN.Interpolation.Utils.Linear;return 0>t?o(n[0],n[1],i):t>1?o(n[r],n[r-1],r-i):o(n[u],n[u+1>r?r:u+1],i-u)},Bezier:function(n,t){var r,i=0,u=n.length-1,o=Math.pow,e=TWEEN.Interpolation.Utils.Bernstein;for(r=0;u>=r;r++)i+=o(1-t,u-r)*o(t,r)*n[r]*e(u,r);return i},CatmullRom:function(n,t){var r=n.length-1,i=r*t,u=Math.floor(i),o=TWEEN.Interpolation.Utils.CatmullRom;return n[0]===n[r]?(0>t&&(u=Math.floor(i=r*(1+t))),o(n[(u-1+r)%r],n[u],n[(u+1)%r],n[(u+2)%r],i-u)):0>t?n[0]-(o(n[0],n[0],n[1],n[1],-i)-n[0]):t>1?n[r]-(o(n[r],n[r],n[r-1],n[r-1],i-r)-n[r]):o(n[u?u-1:0],n[u],n[u+1>r?r:u+1],n[u+2>r?r:u+2],i-u)},Utils:{Linear:function(n,t,r){return(t-n)*r+n},Bernstein:function(n,t){var r=TWEEN.Interpolation.Utils.Factorial;return r(n)/r(t)/r(n-t)},Factorial:function(){var n=[1];return function(t){var r,i=1;if(n[t])return n[t];for(r=t;r>1;r--)i*=r;return n[t]=i}}(),CatmullRom:function(n,t,r,i,u){var o=.5*(r-n),e=.5*(i-t),a=u*u,f=u*a;return(2*t-2*r+o+e)*f+(-3*t+3*r-2*o-e)*a+o*u+t}}},"undefined"!=typeof module&&module.exports&&(module.exports=TWEEN);
///<jscompress sourcefile="Utils.js" />
/**
 * Created by Administrator on 2016/1/11.
 * 工具模块
 */
var KWhaleUtils = (function (){
    /***
     * Tween YoYo
     * ***/
    /*参数
    （要缓动的显示对象,{对象执行缓动后的属性状态}，延迟多少毫秒执行，动作执行时间，塞贝曲线TWEEN.Easing.曲线名.InOut）*/
    //来回循环
    //PS:用完记得 stop()会好点
    var Tween_YoYo = function(dspobj,obj,delay,time,ease){
        var backobj={};
        for(var name in obj){
            backobj[name]=dspobj[name];
        }
        var tweenGo = new TWEEN.Tween(dspobj)
            .to(obj, time)
            .delay(delay)
            .easing(ease);
        var tweenBack = new TWEEN.Tween(dspobj)
            .to(backobj, time)
            .delay(delay)
            .easing(ease);
        tweenGo.chain(tweenBack);
        tweenBack.chain(tweenGo);
        return tweenGo;
    };
    //单向循环
    var Tween_Loop = function(dspobj,obj,delay,time,ease){
        var tweenGo = new TWEEN.Tween(dspobj)
            .to(obj, time)
            .delay(delay)
            .repeat( Infinity )
            .easing(ease);
        return tweenGo;
    };

    //缓动一次
    var Tween = function(dspobj,obj,delay,time,ease){
        var tweenGo = new TWEEN.Tween(dspobj)
            .delay(delay)
            .to(obj, time)
            .easing(ease);
        return tweenGo;
    };

    //根据显示对象占舞台背景的高的比例 添加到舞台中
    //（舞台,显示对象,高度比）
    var AddStageByScaleH = function(stage,obj,scaleH){
        if(obj.proportion){
            obj.height = stage.sh*scaleH;
            obj.width = obj.height*obj.proportion;
            if(obj.width>stage.sw){
                obj.width=stage.sw;
                obj.height=obj.width/obj.proportion;
            }
            stage.addChild(obj);
        }
    }
    //按款适配
    var AddStageByScaleWNoCheck = function(stage,obj,scaleW){
        if(obj.proportion){
            obj.width = stage.sw*scaleW;
            obj.height = obj.width/obj.proportion;
            stage.addChild(obj);
        }
    }
    //根据显示对象占舞台背景的高的比例 添加到舞台中 noCheck
    //（舞台,显示对象,高度比）
    var AddStageByScaleHNoCheck = function(stage,obj,scaleH){
        if(obj.proportion){
            obj.height = stage.sh*scaleH;
            obj.width = obj.height*obj.proportion;
            stage.addChild(obj);
        }
    }

    //生成随机数 1-num
    var getRandomOne2Numer=function(num){
        return Math.abs(Math.ceil(Math.random()*num));
    }
    /**
     * 根据一点及线段角度 计算另一端的点
     */
    var getPointByRotationAndPointAndLineWidth = function (obj1, rotation,dist) {
        var x = obj1.x + 2*dist*Math.cos(rotation/180*Math.PI);
        var y = obj1.y + 2*dist*Math.sin(rotation/180*Math.PI);
        return {"x":Math.ceil(x),"y":Math.ceil(y)};
    }
    //计算2点距离
    var distPoint = function(obj1, obj2) {
        return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) + (obj1.y - obj2.y) * (obj1.y - obj2.y));
    }
    //计算2点角度
    var getRotationBy2Point= function(obj1, obj2) {
        var dx = obj1.x - obj2.x,
            dy = obj1.y - obj2.y;
        return Math.atan2(dy, dx) * 180 / Math.PI + 180;
    }
    var addDomByScale = function(s,scaleH,scaleW,scaleY,innerHtml){
        var dom =  document.createElement('div');
        dom.style.position = "absolute";
        if(scaleH!="auto")
            dom.style.height = s.sh * scaleH / window["KWRatio"] + "px";
        if(scaleW!="auto")
            dom.style.width = s.sh *scaleW / window["KWRatio"] + "px";
        dom.style.top = s.sh *scaleY / window["KWRatio"] + "px";
        dom.style.fontFamily="微软雅黑";
        dom.innerHTML=innerHtml;
        document.body.appendChild(dom);
        return dom;
    }

    var getImgBySrcAndCall = function(src,call){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            call(img);
        };
    }

    var getMask = function(color,alpha){
        var sh = window.innerHeight || document.documentElement.clientHeight;
        var sw  = window.innerWidth || document.documentElement.clientWidth;
        var mask = new Shape.Rectangle({x:0,y:0},sw*window["KWRatio"],sh*window["KWRatio"],color);
        mask.alpha = alpha;
        return mask;
    }

    var getBmpByName = function(name){
        var main = new Bitmap(RES.getRES(name));
        main.anchorX=0.5;
        return main;
    }

    return {
        Tween_YoYo:Tween_YoYo,
        AddStageByScaleH:AddStageByScaleH,
        Tween_Loop:Tween_Loop,
        Tween:Tween,
        AddStageByScaleHNoCheck:AddStageByScaleHNoCheck,
        getRandomOne2Numer:getRandomOne2Numer,
        getPointByRotationAndPointAndLineWidth:getPointByRotationAndPointAndLineWidth,
        getRotationBy2Point:getRotationBy2Point,
        distPoint:distPoint,
        addDomByScale:addDomByScale,
        getImgBySrcAndCall:getImgBySrcAndCall,
        AddStageByScaleWNoCheck:AddStageByScaleWNoCheck,
        getMask:getMask,
        getBmpByName:getBmpByName
    };
}());
///<jscompress sourcefile="World.js" />
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

function World(){

}
World.FPS=0;
World.isShowFPS = false;
World.ISTEST = false;
World.STAT;
World.init=function() {
    window["initKW"]();
};
World.Go=function(fuc){
    if(World.isShowFPS){
        World.STAT = new Stats();
        document.body.appendChild(World.STAT.domElement);
    }
    (function go(){
        if(World.isShowFPS){
            World.STAT.begin();
            window.requestAnimationFrame(go);
            World.STAT.end();
            fuc();
        }else{
            window.requestAnimationFrame(go);
            fuc();
        }
    }());
}
///<jscompress sourcefile="Bitmap.js" />
/**
 * Created by Administrator on 2016/1/10.
 * Class Name: 位图 纹理 类
 * Author: Keiling_J
 */
function Bitmap(img) {
    /* 图片资源 */
    this.img = img;
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
};

Bitmap.prototype = new DisplayObject();
//alpha ; rotation ; scale ; anchor ; x ; y
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




///<jscompress sourcefile="DisplayObject.js" />
/**
 * Created by Administrator on 2016/1/10.
 * Class Name: 显示对象 类 （显示对象基类）
 * Author: Keiling_J
 */
function DisplayObject() {
    //坐标 X
    this.x = 0;
    //坐标 Y
    this.y = 0;
    //显示对象的宽度
    this.width = 0;
    //显示对象的高度
    this.height = 0;
    //X方向的锚点
    this.anchorX = 0;
    //Y方向的锚点
    this.anchorY = 0;
    //缩放大小
    this.scale = 1;
    //围绕锚点的旋转角度
    this.rotation = 0;
    //zIndex
    this.z = 0;
    //is obj alive
    this.isAlive=true;

    //事件绑定对象
    this.evtObject=null;

    /*{
     type:arc|rect
     option:r|(w,h)
     }*/
    this.mask=null;
}

DisplayObject.prototype.showMask = function(ctx){
    //this.mask =
    if(this.mask) {
        if (this.mask.type == "arc") {
            ctx.beginPath();
            //圆形的圆形遮罩有bug
            if(this.mask.pos){
                ctx.arc(this.mask.pos.x, this.mask.pos.y, this.mask.r / window["KWRatio"], 0, Math.PI * 2);
            }else {
                ctx.arc(0, 0, this.mask.r / window["KWRatio"], 0, Math.PI * 2);
            }
            ctx.closePath();
        }
        ctx.clip();
    }
};

DisplayObject.prototype.draw = function(ctx){};

//设置显示对象的Z
DisplayObject.prototype.setZ = function(val,stage){
    this.z=val;
    //重新刷新所有显示对象的 绘制先后顺序
    stage.reflashZ();
};

//设置锚点
DisplayObject.prototype.setAnchor = function(val){
    this.anchorX = val;
    this.anchorY = val;
};

//使用锚点 内部调用不用管
DisplayObject.prototype.UseAnchor = function(){
    var pos = {x:0,y:0};
    var scl = this.UseScale();
    pos.x = this.x-scl.width*this.anchorX;
    pos.y = this.y-scl.height*this.anchorY;
    return pos;
};

//设置显示对象的scale
DisplayObject.prototype.setScale = function(val){
    this.scale = val;
};

//内部调用无需理
DisplayObject.prototype.UseScale = function(){
    var scl = {height:0,width:0};
    scl.width = this.width*this.scale;
    scl.height = this.height*this.scale;
    return scl;
};
///<jscompress sourcefile="Form.js" />
/**
 * Created by Keiling on 2016/3/4.
 */
var Form = (function(){
    //用于实时更新 Form 对象的 位置 大小
    function reflash(obj){
        obj.ele.style.width = obj.width/window["KWRatio"]*obj.scale +"px";
        obj.ele.style.height = obj.height/window["KWRatio"]*obj.scale +"px";
        obj.ele.style.top = (obj.y-obj.height *obj.anchorY*obj.scale)/window["KWRatio"] +"px";
        obj.ele.style.left = (obj.x-obj.width *obj.anchorX*obj.scale)/window["KWRatio"] +"px";
        obj.ele.style.opacity = obj.alpha;
        obj.ele.style.fontSize=obj.height/window["KWRatio"]*obj.scale*0.7+"px";
        obj.ele.style.lineHeight=obj.height/window["KWRatio"]*obj.scale+"px";
    }

    // 用于绘制文本 todo:尚未实现 anchor scale 默认anchorX=0，anchorY=1，scale=1
    var Text = function(x,y,w,h){
        this.normal_Text="";
        this.x = x;
        this.y = y;
        this.alpha=1;
        this.scale = 1;
        this.anchorX=0;
        this.anchorY=0;
        this.width = w*this.scale ;
        this.height = h*this.scale ;
        this.ele = document.createElement("input");
        this.ele.type="text";
        this.ele.style.position = "absolute";
        this.ele.style.width = this.width/window["KWRatio"]*this.scale +"px";
        this.ele.style.height = this.height/window["KWRatio"]*this.scale +"px";
        this.ele.style.top = (this.y-this.height *this.anchorY)/window["KWRatio"] +"px";
        this.ele.style.left = (this.x-this.width *this.anchorX)/window["KWRatio"] +"px";
        this.ele.style.opacity = this.alpha;
        this.ele.style.fontFamily="微软雅黑";
        this.ele.style.fontSize=(this.height/8*2.4)/window["KWRatio"]*this.scale+"px";
        this.ele.style.lineHeight=this.height/window["KWRatio"]*this.scale+"px";
        document.body.appendChild(this.ele);
        var that = this;
        this.ele.onblur=function(){
            if(that.ele.value==""){
                that.ele.value=that.normal_Text;
                return
            }else{
                return;
            }
        }
        this.ele.onfocus=function(){
            if(that.ele.value==that.normal_Text){
                that.ele.value="";
                return
            }else{
                return;
            }
        }
    };
    Text.prototype.setNormalText=function(txt){
        this.ele.placeholder=txt;
    };
    Text.prototype.draw=function (ctx){
        reflash(this)
    };
    //销毁Text 对象
    Text.prototype.destroy=function(stage){
        if(stage)
            stage.removeChild(this);
        document.body.removeChild(this.ele);
    }
    Text.prototype.getValue = function(){
        return this.ele.value;
    }

    var Textarea = function(x,y,w,h){
        this.normal_Text="";
        this.x = x;
        this.y = y;
        this.alpha=1;
        this.scale = 1;
        this.anchorX=0;
        this.anchorY=0;
        this.width = w*this.scale ;
        this.height = h*this.scale ;
        this.ele = document.createElement("textarea");
        this.ele.style.position = "absolute";
        this.ele.style.width = this.width/window["KWRatio"]*this.scale +"px";
        this.ele.style.height = this.height/window["KWRatio"]*this.scale +"px";
        this.ele.style.top = (this.y-this.height *this.anchorY)/window["KWRatio"] +"px";
        this.ele.style.left = (this.x-this.width *this.anchorX)/window["KWRatio"] +"px";
        this.ele.style.opacity = this.alpha;
        this.ele.style.fontFamily="微软雅黑";
        document.body.appendChild(this.ele);
        var that = this;
        this.ele.onblur=function(){
            if(that.ele.value==""){
                that.ele.value=that.normal_Text;
                return
            }else{
                return;
            }
        }
        this.ele.onfocus=function(){
            if(that.ele.value==that.normal_Text){
                that.ele.value="";
                return
            }else{
                return;
            }
        }
    };
    Textarea.prototype.setFontSize = function(size){
        this.ele.style.fontSize = size/window["KWRatio"]*this.scale+"px";
    };
    Textarea.prototype.setNormalText=function(txt){
        this.normal_Text=txt;
        this.ele.value=txt;
    };
    Textarea.prototype.draw=function (ctx){
        reflash(this)
    };
    //销毁Text 对象
    Textarea.prototype.destroy=function(stage){
        if(stage)
            stage.removeChild(this);
        document.body.removeChild(this.ele);
    }
    Textarea.prototype.getValue = function(){
        return this.ele.value;
    }


    //用于创建下拉选择控件
    var Select = function(x,y,w,h){
        this.x = x;
        this.y = y;
        this.alpha=1;
        this.scale = 1;
        this.anchorX=0;
        this.anchorY=0;
        this.width = w*this.scale ;
        this.height = h*this.scale ;
        this.ele = document.createElement("select");
        this.ele.style.position = "absolute";
        this.ele.style.width = this.width/window["KWRatio"]*this.scale +"px";
        this.ele.style.height = this.height/window["KWRatio"]*this.scale +"px";
        this.ele.style.top = (this.y-this.height *this.anchorY)/window["KWRatio"] +"px";
        this.ele.style.left = (this.x-this.width *this.anchorX)/window["KWRatio"] +"px";
        this.ele.style.opacity = this.alpha;
        this.ele.style.fontFamily="微软雅黑";
        this.ele.style.fontSize=(this.height/8*2.4)/window["KWRatio"]*this.scale+"px";
        this.ele.style.lineHeight=this.height/window["KWRatio"]*this.scale+"px";
        document.body.appendChild(this.ele);
    };
    //设置下拉框控件的 列表 参数[列表名1,列表名2]
    Select.prototype.setItem=function (arr){
        this.ele.innerHTML="";
        for(var i= 0,len=arr.length;i<len;i++){
            var item = document.createElement("option");
            item.text = arr[i]
            this.ele.appendChild(item);
        }
    }
    Select.prototype.draw=function (ctx){
        reflash(this)
    }
    //销毁
    Select.prototype.destroy=function(stage){
        stage.removeChild(this);
        document.body.removeChild(this.ele);
    }
    return {
        Text:Text,
        Select:Select,
        Textarea:Textarea
    }
}());

///<jscompress sourcefile="Hammerjs.js" />
/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map
///<jscompress sourcefile="InitKWahle.js" />
/**
初始化渲染
 */
window["initKW"]=function() {
    try {
        (function (prototype) {
            var pixelRatio = (function (context) {
                    var backingStore, wbspr;
                    if (CanvasRenderingContext2D) {
                        var helpObj = document.createElement('canvas');
                        var helpObj_ctx = helpObj.getContext('2d');
                        wbspr = helpObj_ctx.webkitBackingStorePixelRatio;
                        //alert("启用备选配置")
                    }
                    backingStore = context.backingStorePixelRatio ||
                    wbspr ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;


                    return (window.devicePixelRatio || 1) / backingStore;
                })(prototype),

                forEach = function (obj, func) {
                    for (var p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            func(obj[p], p);
                        }
                    }
                },

                ratioArgs = {
                    'fillRect': 'all',
                    'clearRect': 'all',
                    'strokeRect': 'all',
                    'moveTo': 'all',
                    'lineTo': 'all',
                    'arc': [0, 1, 2],
                    'arcTo': 'all',
                    'bezierCurveTo': 'all',
                    'isPointinPath': 'all',
                    'isPointinStroke': 'all',
                    'quadraticCurveTo': 'all',
                    'rect': 'all',
                    'translate': 'all',
                    'createRadialGradient': 'all',
                    'createLinearGradient': 'all'
                };

            if (pixelRatio === 1) return;

            forEach(ratioArgs, function (value, key) {
                prototype[key] = (function (_super) {
                    return function () {
                        var i, len,
                            args = Array.prototype.slice.call(arguments);

                        if (value === 'all') {
                            args = args.map(function (a) {
                                return a * pixelRatio;
                            });
                        }
                        else if (Array.isArray(value)) {
                            for (i = 0, len = value.length; i < len; i++) {
                                args[value[i]] *= pixelRatio;
                            }
                        }

                        return _super.apply(this, args);
                    };
                })(prototype[key]);
            });

            // Stroke lineWidth adjustment
            prototype.stroke = (function (_super) {
                return function () {
                    this.lineWidth *= pixelRatio;
                    _super.apply(this, arguments);
                    this.lineWidth /= pixelRatio;
                };
            })(prototype.stroke);

            // Text
            //
            prototype.fillText = (function (_super) {
                return function () {
                    var args = Array.prototype.slice.call(arguments);

                    args[1] *= pixelRatio; // x
                    args[2] *= pixelRatio; // y

                    this.font = this.font.replace(
                        /(\d+)(px|em|rem|pt)/g,
                        function (w, m, u) {
                            return (m * pixelRatio) + u;
                        }
                    );

                    _super.apply(this, args);

                    this.font = this.font.replace(
                        /(\d+)(px|em|rem|pt)/g,
                        function (w, m, u) {
                            return (m / pixelRatio) + u;
                        }
                    );
                };
            })(prototype.fillText);

            prototype.strokeText = (function (_super) {
                return function () {
                    var args = Array.prototype.slice.call(arguments);

                    args[1] *= pixelRatio; // x
                    args[2] *= pixelRatio; // y

                    this.font = this.font.replace(
                        /(\d+)(px|em|rem|pt)/g,
                        function (w, m, u) {
                            return (m * pixelRatio) + u;
                        }
                    );

                    _super.apply(this, args);

                    this.font = this.font.replace(
                        /(\d+)(px|em|rem|pt)/g,
                        function (w, m, u) {
                            return (m / pixelRatio) + u;
                        }
                    );
                };
            })(prototype.strokeText);
            window["KWRatio"] = pixelRatio;
        })(CanvasRenderingContext2D.prototype);
        ;
        (function (prototype) {
            prototype.getContext = (function (_super) {
                return function (type) {
                    var backingStore, ratio,
                        context = _super.call(this, type);

                    if (type === '2d') {

                        backingStore = context.backingStorePixelRatio ||
                        context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 1;

                        ratio = (window.devicePixelRatio || 1) / backingStore;

                        if (ratio > 1) {
                            this.style.height = this.height + 'px';
                            this.style.width = this.width + 'px';
                            this.width *= ratio;
                            this.height *= ratio;
                        }
                    }

                    return context;
                };
            })(prototype.getContext);
        })(HTMLCanvasElement.prototype);
        if (!window["KWRatio"]) {
            window["KWRatio"] = 1;
        }
        document.body.style.overflow = "hidden";
        //alert("引擎初始化成功")
    }
    catch (e){
        //alert("引擎初始化失败,错误信息："+JSON.stringify(e))
        //alert(e)
    }
}

///<jscompress sourcefile="KEvent.js" />
/**
 * Created by Keiling on 2016/2/27.
 */
//事件绑定类 参数（要绑定事件的显示对象，{type:"要绑定的事件名"}，回调函数：事件触发执行）
function KEvent(disobj,evtobj,call){
    disobj.evtObject=this;
    disobj.isAutoReflash = false;
    this.disobj=disobj;
    this.isDestory = false;
    this.isAutoFreshAfterEvent =true;
    this.ele = document.createElement("div");
    this.ele.style.position = "absolute";
    this.ele.style.top = (this.disobj.y-this.disobj.height*this.disobj.anchorY)/window["KWRatio"] +"px";
    this.ele.style.left = (this.disobj.x-this.disobj.width*this.disobj.anchorX)/window["KWRatio"] +"px";
    //this.ele.style.backgroundColor = "blue";
    //this.ele.style.opacity = "0.5";
    //this.ele.style.visibility = "none";
    this.ele.style.width = this.disobj.width*this.disobj.scale/window["KWRatio"]+"px";
    this.ele.style.height = this.disobj.height*this.disobj.scale/window["KWRatio"]+"px";
    document.body.appendChild(this.ele);
    this.times = evtobj.times||null;
    KEvent.EventSet.push(this.ele);
    switch (evtobj.type){
        case "touchstart":
            this.TOUCHBEGIN(call);
            break;
        case "touchend":
            this.TOUCHEND(call);
            break;
        case "touchmove":
            this.TOUCHMOVE(call);
            break;
        case "touchstartandmove":
            this.TOUCHBEGINANDMOVE(call);
            break;
        case "touchout":
            this.TOUCHOUT(call);
            break;
    }
};
KEvent.EventSet=[];
KEvent.Remove = function(ele) {
    for (var i = 0, len = KEvent.EventSet.length; i < len; i++) {
        if (KEvent.EventSet[i] == ele) {
            KEvent.EventSet.splice(i, 1);
            len = KEvent.EventSet.length;
        }
    }
};
KEvent.RemoveAllEventObj = function(ele) {
    for (var i = 0, len = KEvent.EventSet.length; i < len; i++) {
        var ele = KEvent.EventSet[i];
        document.body.removeChild(ele);
    }
    KEvent.EventSet=[];
};
KEvent.prototype.TOUCHBEGIN = function(call){
    var that = this;
    this.ele.addEventListener("touchstart",function(evt){
        //document.body.removeChild(that.ele);
        evt.preventDefault();
        call(evt);
        that.reflashAttribute();
    },false);
    if(World.ISTEST) {
        this.ele.addEventListener("mousedown", function (evt) {
            call(evt);
            //document.body.removeChild(that.ele)
            that.reflashAttribute();
        }, true)
    }

};
KEvent.prototype.TOUCHEND = function(call){
    var that = this;
    this.ele.addEventListener("touchend",function(evt){
        evt.preventDefault();
        call(evt);
        that.reflashAttribute();
    },false);
    if(World.ISTEST) {
        this.ele.addEventListener("mouseup", function (evt) {
            evt.preventDefault();
            call(evt);
            that.reflashAttribute();
        }, false)
    }
};
KEvent.prototype.TOUCHMOVE = function(call){
    var that = this;
    this.ele.addEventListener("touchmove",function(evt){
        evt.preventDefault();
        call(evt);
        that.reflashAttribute();
    },false);
    if(World.ISTEST) {
        this.ele.addEventListener("mousemove", function (evt) {
            evt.preventDefault();
            call(evt);
            that.reflashAttribute();
        }, false)
    }
};
KEvent.prototype.TOUCHOUT = function(call){
    var that = this;
    this.ele.addEventListener("touchout",function(evt){
        evt.preventDefault();
        call(evt);
        that.reflashAttribute();
    },false);
    if(World.ISTEST) {
        this.ele.addEventListener("mouseout", function (evt) {
            evt.preventDefault();
            call(evt);
            that.reflashAttribute();
        }, false)
    }
};
KEvent.prototype.TOUCHBEGINANDMOVE = function(call){
    var that = this;
    var begin = false;
    var start_pos={};
    this.TOUCHBEGIN(function(){
        begin=true;
        var x = that.disobj.x
        var y = that.disobj.y
        start_pos={x:x,y:y};
        call[0]();
    });
    this.TOUCHEND(function(evt){
        begin=false;
        var x = that.disobj.x
        var y = that.disobj.y
        start_pos={x:x,y:y};
        call[2]();
    });
    this.TOUCHMOVE(function(evt){
        if(begin){
            var x = Number(evt.clientX); //页面触点X坐标
            var y = Number(evt.clientY); //页面触点Y坐标
            var sx = x-start_pos.x;
            var sy = y-start_pos.y;
            evt.sx=sx;
            evt.sy=sy;
            call[1](evt);
        }
    });
    this.TOUCHOUT(function(evt){
        if(begin){
            begin=false;
            var x = that.disobj.x
            var y = that.disobj.y
            start_pos={x:x,y:y};
            call[2]();
        }
    });
};

//摇一摇事件绑定
KEvent.shakeCall;
var SHAKE_THRESHOLD = 500; //鎽囨檭鐨勬晱鎰熷害;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;
KEvent.deviceMotionHandler=function (eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    document.body.innerHTML = x + "_" + y + "_" + z;
    if ((curTime - last_update) > 100 ) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var t3;
        var t1;
        var t2;
        var t4;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

        if (speed > SHAKE_THRESHOLD) {
            KEvent.shakeCall();
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}

//添加摇一摇
KEvent.ADDSHAKE=function(call) {
    KEvent.shakeCall=call;
    if (window.DeviceMotionEvent) {
        //获取移动速度，得到device移动时相对之前某个时间的差值比
        window.addEventListener('devicemotion',KEvent.deviceMotionHandler, false);
    } else {
        alert('您好，你目前所用的设置好像不支持重力感应哦！');
    }
};
//移除摇一摇监听事件
KEvent.REMOVESHAKE=function(){
    window.removeEventListener('devicemotion', KEvent.deviceMotionHandler, false);
};
KEvent.prototype.destory=function(){
    if(!this.isDestory) {
        this.isDestory = true;
        document.body.removeChild(this.ele);
        KEvent.Remove(this.ele);
    }
};
KEvent.prototype.reAdd=function(){
    if(this.isDestory) {
        this.isDestory = false;
        document.body.appendChild(this.ele);
        KEvent.EventSet.push(this.ele);
    }
};
KEvent.prototype.reflashAttribute=function(){
    if(!this.isAutoFreshAfterEvent){
        return;
    }
    this.ele.style.position = "absolute";
    this.ele.style.top = (this.disobj.y-this.disobj.height*this.disobj.scale*this.disobj.anchorY)/window["KWRatio"] +"px";
    this.ele.style.left = (this.disobj.x-this.disobj.width*this.disobj.scale*this.disobj.anchorX)/window["KWRatio"] +"px";
    //this.ele.style.backgroundColor = "red";
    //this.ele.style.opacity = "0.5";
    this.ele.style.width = this.disobj.width*this.disobj.scale/window["KWRatio"]+"px";
    this.ele.style.height = this.disobj.height*this.disobj.scale/window["KWRatio"]+"px";
}
/*
 slide 滑动根据
 */
KEvent.start_pos={};
KEvent.end_pos={};
//KEvent.slideCall 用于绑定滑动触发事件 接收一个参数 用于判断滑动方向
KEvent.slideCall;
KEvent.slideBegin = function (evt) {
    var touch = evt.touches[0]; //获取第一个触点
    var x = Number(touch.pageX); //页面触点X坐标
    var y = Number(touch.pageY); //页面触点Y坐标
    KEvent.start_pos = {x: x, y: y};
};
KEvent.slideMove = function (evt) {
    var touch = evt.touches[0]; //获取第一个触点
    var x = Number(touch.pageX); //页面触点X坐标
    var y = Number(touch.pageY); //页面触点Y坐标
    KEvent.end_pos = {x: x, y: y};
};
KEvent.slideEnd = function (evt) {
    var rotation = KWhaleUtils.getRotationBy2Point(KEvent.start_pos, KEvent.end_pos);
    var dis = KWhaleUtils.distPoint(KEvent.start_pos, KEvent.end_pos);
    if (dis > 30) {
        if(45<=rotation&&rotation<135){
            KEvent.slideCall("bot")
        }
        if(135<=rotation&&rotation<225){
            KEvent.slideCall("left")
        }
        if(225<=rotation&&rotation<315){
            KEvent.slideCall("top")
        }
        if(315<=rotation&&rotation<=360||0<=rotation&&rotation<45){
            KEvent.slideCall("right")
        }
    }
}

//绑定页面滑动事件
KEvent.ADDSLIDE = function (call) {
    document.body.addEventListener("touchstart", KEvent.slideBegin, false);
    document.body.addEventListener("touchmove", KEvent.slideMove, false);
    document.body.addEventListener("touchend", KEvent.slideEnd, false);
    KEvent.slideCall=call;
}
KEvent.REMOVESLIDE = function () {
    document.body.removeEventListener("touchstart", KEvent.slideBegin, false);
    document.body.removeEventListener("touchmove", KEvent.slideMove, false);
    document.body.removeEventListener("touchend", KEvent.slideEnd, false);
}
