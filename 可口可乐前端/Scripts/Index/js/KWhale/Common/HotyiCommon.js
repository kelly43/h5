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
        // if(isLongPage){
        // document.write("s")
        sh = window["gc_sh"] ;
        sw = window["gc_sw"] ;

        //}
        var mask = document.createElement("div");
        mask.className = 'webkitV';
        mask.style.boxShadow="0 0 3px 1px #ddd;";
        mask.style.position = "fixed";
        mask.style.top="0px";
        mask.style.width = sw   + "px";
        mask.style.height = sh  + "px";
        mask.style.backgroundColor = "rgba(0,0,0,.7)";
        mask.style.zIndex=9999;
        document.body.appendChild(mask);
        var wrap = document.createElement("div");
        wrap.style.boxShadow="0 0 3px 1px #ddd;";
        wrap.style.position = "static";
        wrap.style.width = sw / 1.2  + "px";
        wrap.style.borderRadius = 5  + "px";
        wrap.style.backgroundColor = "#ffffff";
        var bot = document.createElement("div");
        bot.className = "webkitV";
        bot.style.position = "static";
        bot.style.width = "100%";
        bot.style.minHeight = sh / 4 / 6 * 3.3  + "px";
        bot.style.fontFamily = "微软雅黑";
        bot.style.textAlign = "center";
        bot.style.fontSize = sh / 4 / 6 - 8 + "px";
        bot.style.padding = "18px";
        bot.style.boxSizing = "border-box";
        bot.innerHTML = text;
        wrap.appendChild(bot);
        var ok = document.createElement("div");
        ok.style.position = "static";
        ok.style.width = "100%";
        ok.style.minHeight = sh / 4 / 6 * 1.8 + "px";
        ok.style.lineHeight = sh / 4 / 6 * 1.8 + "px";
        ok.style.fontFamily = "微软雅黑";
        ok.style.textAlign = "center";
        ok.style.top = sh / 4 / 6 * 4.5 + "px";
        ok.style.borderTop = "1px solid #d0d0d0";
        ok.style.fontSize = sh / 4 / 6 - 8 + "px";
        ok.style.cursor = "pointer";
        ok.innerHTML = "確 定";
        ok.style.color = "#099aed";
        ok.addEventListener("click",function(evt){
            document.body.removeChild(mask);
            if(call)
                call()
        },false);
        wrap.appendChild(ok);
        wrap.style.zIndex=10000;
        mask.appendChild(wrap);
    };

    return HotyiLoad.Init(function(){HotyiLoad.Load._loading(s);},src,color);
}