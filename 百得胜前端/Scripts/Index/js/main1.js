window.onload=function() {
    var base = "../../Content/Images/";
    RES.RES_JSON = {
        "common_err": {isLoad: false, src: base + "img/common_err.jpg"},
        "common_nobodyjoin": {isLoad: false, src: base + "img/common_nobodyjoin.png"},
        "rule_content": {isLoad: false, src: base + "img/rule_content.png"},
        "a1": {isLoad: false, src: base + "img/a1.png"},
        "a2": {isLoad: false, src: base + "img/a2.png"},
        "a3": {isLoad: false, src: base + "img/a3.png"},
        "a4": {isLoad: false, src: base + "img/a4.png"},
        "a5": {isLoad: false, src: base + "img/a5.png"},
        "a6": {isLoad: false, src: base + "img/a6.png"},
        "a7": {isLoad: false, src: base + "img/a7.png"},
        "a8": {isLoad: false, src: base + "img/a8.png"},
        "a9": {isLoad: false, src: base + "img/a9.png"},
        "a10": {isLoad: false, src: base + "img/a10.png"},
        "a11": {isLoad: false, src: base + "img/a11.png"},
        "b1": {isLoad: false, src: base + "img/b1.png"},
        "b2": {isLoad: false, src: base + "img/b2.png"},
        "b3": {isLoad: false, src: base + "img/b3.png"},
        "b4": {isLoad: false, src: base + "img/b4.png"},
        "b5": {isLoad: false, src: base + "img/b5.png"},
        "b6": {isLoad: false, src: base + "img/b6.png"},
        "b7": {isLoad: false, src: base + "img/b7.png"},
        "b8": {isLoad: false, src: base + "img/b8.png"},
        "o1": {isLoad: false, src: base + "img/o1.png"},
        "p1": {isLoad: false, src: base + "img/p1.png"},
        "z1": {isLoad: false, src: base + "img/z1.png"}
    };
    World.init();
    //canvas_e
    var canvas_e = document.getElementById("canvas_e");
    var stage_e = new Stage(canvas_e);
    var canvas_bg = document.getElementById("canvas_bg");
    var stage_bg = new Stage(canvas_bg);
    var canvas_stage = document.getElementById("canvas_stage");
    var stage_main = new Stage(canvas_stage);
    var canvas_stage_top = document.getElementById("canvas_stage_top");
    var stage_top = new Stage(canvas_stage_top);
    window["gc"];
    //for err
    var bgmask = new Shape.Rectangle({x:0,y:0},stage_e.sw,stage_bg.sh,"#ffffff");
    canvas_e.style.background="#FFFFFF";
    stage_e.addChild(bgmask);
    World.Go(function () {
        TWEEN.update();
        stage_e.worldDraw();
        stage_main.worldDraw();
        stage_top.worldDraw();
        stage_bg.worldDraw();

        if(HotyiLoad.IsPlayEnd&&HotyiLoad.Isloaded){
            HotyiLoad.IsPlayEnd=false;
            HotyiLoad.Isloaded=false;
            document.getElementById("loadline").style.visibility="hidden";
            HotyiLoad.Load._removeLoadingAnimate(function(){
                window["gc"] = new GC(stage_bg,stage_main,stage_top);
                canvas_e.style.background="";
                //错误图片
                canvas_e.style.backgroundImage="url(../../Content/Images/img/common_err.jpg)";
                canvas_e.style.backgroundSize="100% 100%";
                stage_e.worldDraw();
                stage_e.isAction=false;
            },stage_main);
        };
    });
    HotyiCommon.InitCommon(stage_main,"../../Content/Images/img/logo.png","rgba(209,0,13,.5)");
};