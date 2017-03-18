/**
 * Created by Administrator on 2016/6/13 .
 * 引擎UI组件
 */
function HotyiCommon(gc){
    this._gc = gc;
}

HotyiCommon.InitCommon=function(s,src,color){
    window.document.body.onresize = function(evt){
        evt.preventDefault();
    }
    //禁止点击 与禁止滑动
    window["isCanTouch"]=false;

    window.document.body.addEventListener("touchstart", function (evt) {
        if(!window["isCanTouch"])
            evt.preventDefault();
    }, false);
    window["isCanMove"]=false;
    document.body.addEventListener('touchmove', function (event) {
        if(!window["isCanMove"])
            event.preventDefault();
    }, false);

    //重写 alert
    window.alert=function(text,isLongPage,call) {
        var sh,sw;
        if(isLongPage){
            sh = window.innerHeight || document.documentElement.clientHeight;
            sw = window.innerWidth || document.documentElement.clientWidth;
        }else {
            sh = s.sh / window["KWRatio"];
            sw = s.sw / window["KWRatio"];
        }
        var mask = document.createElement("div");
        mask.style.boxShadow="0 0 3px 1px #ddd;";
        mask.style.position = "fixed";
        mask.style.top="0px";
        mask.style.width = sw   + "px";
        mask.style.height = sh  + "px";
        mask.style.backgroundColor = "#000";
        mask.style.opacity=0.7;
        mask.style.zIndex=9999;
        document.body.appendChild(mask);
        var wrap = document.createElement("div");
        wrap.style.boxShadow="0 0 3px 1px #ddd;";
        wrap.style.position = "fixed";
        wrap.style.width = sw / 1.4  + "px";
        wrap.style.height = sh / 4 + "px";
        wrap.style.top = (sh - sh / 4) / 2  + "px";
        wrap.style.left = (sw - sw / 1.4) / 2 + "px";
        wrap.style.borderRadius = 15  + "px";
        wrap.style.backgroundColor = "#ffffff";
        var top = document.createElement("div");
        top.style.backgroundColor = "#848484";
        top.style.width = sw / 1.4  + "px";
        top.style.height = sh / 4 / 5  + "px";
        top.style.borderTopRightRadius = 15  + "px";
        top.style.borderTopLeftRadius = 15  + "px";
        top.style.lineHeight = sh / 4 / 5  + "px";
        top.style.fontFamily = "微软雅黑";
        top.style.textAlign = "center";
        top.style.fontSize = (sh / 4 / 6 - 8) + "px";
        top.style.color = "#fff";
        top.innerHTML = "消 息";
        wrap.appendChild(top);
        var bot = document.createElement("div");
        bot.className = "webkitV";
        bot.style.width = sw / 1.4  + "px";
        bot.style.height = sh / 4 / 6 * 3.3  + "px";
        bot.style.lineHeight = sh / 4 / 6  + "px";
        bot.style.fontFamily = "微软雅黑";
        bot.style.textAlign = "center";
        bot.style.top = sh / 4 / 6 + "px";
        bot.style.fontSize = (sh / 4 / 8 - 8) + "px";
        bot.innerHTML = text;
        wrap.appendChild(bot);
        var ok = document.createElement("div");
        ok.style.width = sw / 1.4 + "px";
        ok.style.height = sh / 4 / 6 * 1.5 + "px";
        ok.style.lineHeight = sh / 4 / 6 * 1.5 + "px";
        ok.style.fontFamily = "微软雅黑";
        ok.style.textAlign = "center";
        ok.style.top = sh / 4 / 6 * 4.5 + "px";
        ok.style.borderTop = "2px solid #d0d0d0";
        ok.style.fontSize = sh / 4 / 6 - 8 + "px";
        ok.style.cursor = "pointer";
        ok.innerHTML = "確 定";
        ok.style.color = "#099aed";
        ok.addEventListener("touchstart",function(evt){
            document.body.removeChild(wrap);
            document.body.removeChild(mask);
            if(call)
                call()
        },false);
        wrap.appendChild(ok);
        wrap.style.zIndex=10000;
        document.body.appendChild(wrap);
    };

    return HotyiLoad.Init(function(){HotyiLoad.Load._loading(s);},src,color);
}