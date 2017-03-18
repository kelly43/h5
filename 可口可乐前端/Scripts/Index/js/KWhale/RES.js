/**
 * Created by Administrator on 2016/1/11.
 */


function KMusic(src,id,call) {
    this.init(src,id,call);
};
KMusic.prototype = {
    src: null,
    soundInstance: null,
    displayStatus: null,
    loadProxy: null,
    call:null,
    id:null,

    init: function (src,id,call) {
        // Create a single item to load.
        this.id = id;
        this.call = call;
        this.src = src;
        this.loadProxy = createjs.proxy(this.handleLoad, this);
        //createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
        createjs.Sound.addEventListener("fileload", this.loadProxy); // add event listener for when load is completed.
        createjs.Sound.registerSound({id:id, src:this.src});  // register sound, which preloads by default
        return this;
    },

    // play a sound inside
    handleLoad: function (event) {
        this.call();
        this.soundInstance = createjs.Sound.createInstance(this.id);	// start playback and store the soundInstance we are currently playing
        createjs.Sound.removeEventListener("fileload", this.loadProxy);	// we only load 1 sound, so remove the listener
    },
    play:function(data){
        this.soundInstance.stop();
        if(this.soundInstance){
            this.soundInstance.play(data);
       }else{
            this.soundInstance.play();
        }
    }
};

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
        RES.makeImageSrcRight();
        finish();
        return
    }
    for(var obj in RES.RES_JSON){
        var src = RES.RES_JSON[obj].src;
        var func =function(obj){
            switch (RES.RES_JSON[obj].type){
                case "image":
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
                            RES.makeImageSrcRight();
                            finish();
                        }
                    }
                    break;
                case "music":
                    var soudId=obj;
                    var audio = new KMusic(src,soudId,function(){
                        RES.RES_JSON[obj].isLoad=true;
                        RES.DATA_SET[obj]=audio;
                        count++;
                        progress(count,total);
                        if(count==total){
                            RES.makeImageSrcRight();
                            finish();
                        }
                    });

                    /*var audio = document.createElement("AUDIO");
                    audio.src = src;
                    //console.log(audio.complete)
                    //if (!RES.RES_JSON[obj].isLoad) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
                        audio.load();
                    //}
                    audio.onloadeddata  = function () {
                        console.log("music")
                        RES.RES_JSON[obj].isLoad=true;
                        RES.DATA_SET[obj]=audio;
                        count++;
                        progress(count,total);
                        if(count==total){
                            finish();
                        }
                    }*/
                    break;
                default:
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
                    break;
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
    switch(RES.RES_JSON[resName].type){
        case "music":
            try{
                if(RES.RES_JSON[resName].isLoad) {
                    var rs = RES.DATA_SET[resName];
                    return rs;
                }else{
                    console.error("err:music load"+resName)
                }
            }catch (e){
                console.error("err:music load:"+resName)
            }
            break;
        case "image":
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
            break;
        default:
            try{
                if(RES.RES_JSON[resName].isLoad) {
                    var rs = RES.DATA_SET[resName];
                    return rs;
                }else{
                    console.error("err:img load:"+resName)
                }
            }catch (e){
                console.error("err:img load:"+resName)
            }
            break;
    }

}

RES.getMusic = function(resName){
    try{
        if(RES.RES_JSON[resName].isLoad) {
            var rs = RES.DATA_SET[resName];
            return rs;
        }else{
            console.error("err:music load"+resName)
        }
    }catch (e){
        console.error("err:music load:"+resName)
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

RES.getFontRES = function(resName){
    if(RES.RES_JSON[resName].isLoad) {
        var rs = {};
        rs.img = RES.DATA_SET[resName];
        var data = RES.RES_JSON[resName];
        rs.res=data.frames;
        return rs;
    }else{
        alert("err:img load")
    }
}
//避免错误
RES.makeImageSrcRight = function(){
    for(var obj in RES.DATA_SET){
        if(RES.RES_JSON[obj].type==undefined||RES.RES_JSON[obj].type=="image") {
            var srcObjName = RES.RES_JSON[obj].src.split('.')[0].split('/')[1];
            if (RES.DATA_SET[obj].src.indexOf(srcObjName) == -1) {
                for (var obj2 in RES.DATA_SET) {
                    if(RES.RES_JSON[obj2].type==undefined||RES.RES_JSON[obj2].type=="image") {
                        if (RES.DATA_SET[obj2].src.indexOf(srcObjName) != -1) {
                            RES.DATA_SET[obj] = RES.DATA_SET[obj2];
                        }
                    }
                }
            }
        }
    }
}