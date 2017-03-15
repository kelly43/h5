window.onload=function() {

    var base = "../../Content/Images/";
    RES.RES_JSON = {
        "common_defeat": {isLoad: false, src: base + "img/common_defeat.png"},
        "common_err": {isLoad: false, src: base + "img/common_err.jpg"},
        "common_success": {isLoad: false, src: base + "img/common_success.png"},
        "common_lottery_t1": {isLoad: false, src: base + "img/common_lottery_t1.png"},
        "common_lottery_t2": {isLoad: false, src: base + "img/common_lottery_t2.png"},
        "common_lottery_box": {isLoad: false, src: base + "img/common_lottery_box.png"},
        "common_lottery_t3": {isLoad: false, src: base + "img/common_lottery_t3.png"},
        "common_unluckey": {isLoad: false, src: base + "img/common_unluckey.png"},
        "common_price": {isLoad: false, src: base + "img/common_price.png"},
        "common_price_inputed": {isLoad: false, src: base + "img/common_price_inputed.png"},
        "common_rangkingList": {isLoad: false, src: base + "img/common_rangkingList.png"},
        "common_nobodyjoin": {isLoad: false, src: base + "img/common_nobodyjoin.png"},
        "common_rule": {isLoad: false, src: base + "img/common_rule.png"},
        "rule_content": {isLoad: false, src: base + "img/rule_content.png"},


        "bg": {isLoad: false, src: base + "img/bg.png"},
        "bg2": {isLoad: false, src: base + "img/bg2.jpg"},
        "explain1": {isLoad: false, src: base + "img/explain1.png"},
        "explain2": {isLoad: false, src: base + "img/explain2.png"},
        "explain3": {isLoad: false, src: base + "img/explain3.png"},
        "island1": {isLoad: false, src: base + "img/island1.png"},
        "island2": {isLoad: false, src: base + "img/island2.png"},
        "island3": {isLoad: false, src: base + "img/island3.png"},
        "island4": {isLoad: false, src: base + "img/island4.png"},
        "island5": {isLoad: false, src: base + "img/island5.png"},
        "island6": {isLoad: false, src: base + "img/island6.png"},
        "score1": {isLoad: false, src: base + "img/score1.png"},
        "score2": {isLoad: false, src: base + "img/score2.png"},
        "sea_gull1": {isLoad: false, src: base + "img/sea_gull1.png"},
        "sea_gull2": {isLoad: false, src: base + "img/sea_gull2.png"},
        "sea_gull3": {isLoad: false, src: base + "img/sea_gull3.png"},
        "water": {isLoad: false, src: base + "img/water.png"},
        "wave": {isLoad: false, src: base + "img/wave.png"},
        "wind1": {isLoad: false, src: base + "img/wind1.png"},
        "wind2": {isLoad: false, src: base + "img/wind2.png"},
        "wind3": {isLoad: false, src: base + "img/wind3.png"},
        "wind4": {isLoad: false, src: base + "img/wind4.png"},
        "begin_btn": {isLoad: false, src: base + "img/begin_btn.png"},
        "title": {isLoad: false, src: base + "img/title.png"},
        "list": {isLoad: false, src: base + "img/list.png"},
        "eagle1": {isLoad: false, src: base + "img/eagle1.png"},
        "rule": {isLoad: false, src: base + "img/rule.png"},
        "logo": {isLoad: false, src: base + "img/logo.png"}
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
    stage_e.isAction=true;
    stage_e.worldDraw();

    World.Go(function () {
        TWEEN.update();
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
                canvas_e.style.backgroundImage="url(../../Content/Images/img/common_err.jpg)";
                canvas_e.style.backgroundSize="100% 100%";
                stage_e.isAction=true;
                stage_e.worldDraw();
            },stage_main);
        }
    });
    HotyiCommon.InitCommon(stage_main);
    HotyiLoad.Load._loading(stage_main);
};
/*
window.onload=function() {
    var ihotyi = new IHotyi();
    ihotyi.iGetResources(function(data){
        var jsonObject = JSON.parse(data);
        if(jsonObject.Code==1){
            RES.RES_JSON=jsonObject.Data;

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
                        canvas_e.style.backgroundImage="url(../../Content/Images/img/common_err.jpg)";
                        canvas_e.style.backgroundSize="100% 100%";
                        stage_e.worldDraw();
                        stage_e.isAction=false;
                    },stage_main);
                }
            });
            HotyiCommon.InitCommon(stage_main);
            HotyiLoad.Load._loading(stage_main);
        }else{
            window.location.href="/Index/error";
        }
    },1);
};*/
