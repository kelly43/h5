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
        "z1": {isLoad: false, src: base + "img/z1.png"},
        "j1": {isLoad: false, src: base + "img/j1.png"},
        "k1": {isLoad: false, src: base + "img/k1.png"},
        "nn2": {isLoad: false, src: base + "img/nn2.png"},
        "nn3": {isLoad: false, src: base + "img/nn3.png"},
        "c1": {isLoad: false, src: base + "img/c1.png"},
        "c2": {isLoad: false, src: base + "img/c2.png"},
        "c3": {isLoad: false, src: base + "img/c3.png"},
        "c4": {isLoad: false, src: base + "img/c4.png"},
        "c5": {isLoad: false, src: base + "img/c5.png"},
        "cc2": {isLoad: false, src: base + "img/cc2.png"},
        "cc3": {isLoad: false, src: base + "img/cc3.png"},
        "z2": {isLoad: false, src: base + "img/z2.png"},
        "bg1": {isLoad: false, src: base + "img/bg1.jpg"},
        "d2": {isLoad: false, src: base + "img/d2.png"},
        "d3": {isLoad: false, src: base + "img/d3.png"},
        "d4": {isLoad: false, src: base + "img/d4.png"},
        "bg2": {isLoad: false, src: base + "img/bg2.jpg"},
        "bg3": {isLoad: false, src: base + "img/bg3.jpg"},
        "g1": {isLoad: false, src: base + "img/g1.png"},
        "g2": {isLoad: false, src: base + "img/g2.png"},
        "g3": {isLoad: false, src: base + "img/g3.png"},
        "g4": {isLoad: false, src: base + "img/g4.png"},
        "g5": {isLoad: false, src: base + "img/g5.png"},
        "g6": {isLoad: false, src: base + "img/g6.png"},
        "g7": {isLoad: false, src: base + "img/g7.png"},
        "h1": {isLoad: false, src: base + "img/h1.png"},
        "i1": {isLoad: false, src: base + "img/i1.png"},
        "dd2": {isLoad: false, src: base + "img/dd2.png"},
        "nn1": {isLoad: false, src: base + "img/nn1.png"}
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
        window["gc"]&&(window["gc"].curTime=Date.now());
        TWEEN.update();
        stage_e.worldDraw();
        stage_main.worldDraw();
        stage_top.worldDraw();
        stage_bg.worldDraw();

        if (window["gc"]) {
            if (window["gc"]._scene && window["gc"]._isGameStart) {
                //console.log(window["gc"]._isGameStart);
                window["gc"]._scene.run();
            }
        }

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
        window["gc"]&&(window["gc"].lastTime=Date.now());
    });
    HotyiCommon.InitCommon(stage_main,"../../Content/Images/img/logo.png","rgba(209,0,13,.5)");
};