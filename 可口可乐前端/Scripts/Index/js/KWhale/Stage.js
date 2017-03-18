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
    this.rate = 0;
    this.rateCount = 0;
};
Stage.prototype.removeAllDisplayObject = function(){
    this.displayObjectSet = [];
};
Stage.prototype.worldDraw = function(){
    //if(this.displayObjectSet.length>0&&this.isAction) {
    if(this.isAction) {
        this.rateCount++;
        if (this.rateCount >= this.rate) {
            this.rateCount=0;
            this.canvas.width = this.canvas.width;
            //this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            var objset = this.displayObjectSet;
            for (var i = 0, len = objset.length; i < len; i++) {
                var ele = objset[i];
                if (ele.isAlive) {
                    var anchorx = ele.anchorX;
                    if (anchorx == 0) {
                        anchorx = 1
                    }
                    var anchory = ele.anchorY;
                    if (anchory == 0) {
                        anchory = 1
                    }
                    //超出 不绘制
                    /*if(ele.width>0) {
                        if (ele.x > (0 - ele.width * (anchorx)) && ele.x < ( this.sw + ele.width * (anchorx))) {
                            if (ele.y > (0 - ele.height * (anchory)) && ele.y < (this.sh + ele.height * (anchory))) {
                                if (ele.alpha != 0)
                                    ele.draw(this.ctx);
                                if (ele.isAutoReflash) {
                                    ele.evtObject.reflashAttribute();
                                }
                            }
                        } else {
                            //console.log("cc")
                            return;
                        }
                    }else {
                        if (ele.alpha != 0)
                            ele.draw(this.ctx);
                        if (ele.isAutoReflash) {
                            ele.evtObject.reflashAttribute();
                        }
                    }*/
                    if (ele.alpha != 0)
                        ele.draw(this.ctx);
                    if (ele.isAutoReflash) {
                        ele.evtObject.reflashAttribute();
                    }
                }
            }

            var physicalSet = KPhysical.PhysicalSet;
            if(physicalSet.length>0) {
                for (var j = 0, jlen = physicalSet.length; jlen > 0 && j < jlen; j++) {
                    physicalSet[j].runPhysical();
                }
            }
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