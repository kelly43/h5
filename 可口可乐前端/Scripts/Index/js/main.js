window.onload=function() {
    RES.RES_JSON = {};
    if(PageJson.IsLoadGif) {
        $.getJSON("../../Content/json/page.json",function(data){
            for(var data_item in data){
                var page = data[data_item];
                var actors = page.actors;
                window["SystemConfig"]=data;
                for(var actors_item in actors){
                    RES.RES_JSON[data_item+"_"+actors_item]={
                        isLoad:false,
                        src:actors[actors_item].src,
                        type:actors[actors_item].type
                    }
                }
                var base = "../../Content/Images/";
                RES.RES_JSON["b1"]= {isLoad: false, src: base + "img/b1.png"};
                RES.RES_JSON["b2"]= {isLoad: false, src: base + "img/b2.png"};
                RES.RES_JSON["b3"]= {isLoad: false, src: base + "img/b3.jpg"};
                RES.RES_JSON["c1"]= {isLoad: false, src: base + "img/c1.jpg"};
                RES.RES_JSON["c2"]= {isLoad: false, src: base + "img/c2.png"};
                RES.RES_JSON["c3"]= {isLoad: false, src: base + "img/c3.jpg"};
                RES.RES_JSON["c4"]= {isLoad: false, src: base + "img/c4.jpg"};
                RES.RES_JSON["c5"]= {isLoad: false, src: base + "img/c5.png"};
                RES.RES_JSON["h1"]= {isLoad: false, src: base + "img/h1.png"};
                RES.RES_JSON["d10"]= {isLoad: false, src: base + "img/playGame/d10.png"};
                RES.RES_JSON["aa"]= {isLoad: false, src: base + "img/playGame/aa.png"};
                RES.RES_JSON["d8"]= {isLoad: false, src: base + "img/playGame/d8.png"};
                RES.RES_JSON["d7"]= {isLoad: false, src: base + "img/playGame/d7.png"};
                RES.RES_JSON["g1"]= {isLoad: false, src: base + "img/g1.jpg"};
                RES.RES_JSON["g2"]= {isLoad: false, src: base + "img/g2.jpg"};
                RES.RES_JSON["g5"]= {isLoad: false, src: base + "img/g5.jpg"};
                RES.RES_JSON["a1"]={isLoad: false, src: base + "img/a (1).jpg"};RES.RES_JSON["a2"]={isLoad: false, src: base + "img/a (2).jpg"};RES.RES_JSON["a3"]={isLoad: false, src: base + "img/a (3).jpg"};RES.RES_JSON["a4"]={isLoad: false, src: base + "img/a (4).jpg"};RES.RES_JSON["a5"]={isLoad: false, src: base + "img/a (5).jpg"};RES.RES_JSON["a6"]={isLoad: false, src: base + "img/a (6).jpg"};RES.RES_JSON["a7"]={isLoad: false, src: base + "img/a (7).jpg"};RES.RES_JSON["a8"]={isLoad: false, src: base + "img/a (8).jpg"};RES.RES_JSON["a9"]={isLoad: false, src: base + "img/a (9).jpg"};RES.RES_JSON["a10"]={isLoad: false, src: base + "img/a (10).jpg"};RES.RES_JSON["a11"]={isLoad: false, src: base + "img/a (11).jpg"};RES.RES_JSON["a12"]={isLoad: false, src: base + "img/a (12).jpg"};RES.RES_JSON["a13"]={isLoad: false, src: base + "img/a (13).jpg"};RES.RES_JSON["a14"]={isLoad: false, src: base + "img/a (14).jpg"};RES.RES_JSON["a15"]={isLoad: false, src: base + "img/a (15).jpg"};RES.RES_JSON["a16"]={isLoad: false, src: base + "img/a (16).jpg"};RES.RES_JSON["a17"]={isLoad: false, src: base + "img/a (17).jpg"};RES.RES_JSON["a18"]={isLoad: false, src: base + "img/a (18).jpg"};RES.RES_JSON["a19"]={isLoad: false, src: base + "img/a (19).jpg"};RES.RES_JSON["a20"]={isLoad: false, src: base + "img/a (20).jpg"};RES.RES_JSON["a21"]={isLoad: false, src: base + "img/a (21).jpg"};RES.RES_JSON["a22"]={isLoad: false, src: base + "img/a (22).jpg"};RES.RES_JSON["a23"]={isLoad: false, src: base + "img/a (23).jpg"};RES.RES_JSON["a24"]={isLoad: false, src: base + "img/a (24).jpg"};RES.RES_JSON["a25"]={isLoad: false, src: base + "img/a (25).jpg"};RES.RES_JSON["a26"]={isLoad: false, src: base + "img/a (26).jpg"};RES.RES_JSON["a27"]={isLoad: false, src: base + "img/a (27).jpg"};RES.RES_JSON["a28"]={isLoad: false, src: base + "img/a (28).jpg"};RES.RES_JSON["a29"]={isLoad: false, src: base + "img/a (29).jpg"};RES.RES_JSON["a30"]={isLoad: false, src: base + "img/a (30).jpg"};RES.RES_JSON["a31"]={isLoad: false, src: base + "img/a (31).jpg"};RES.RES_JSON["a32"]={isLoad: false, src: base + "img/a (32).jpg"};RES.RES_JSON["a33"]={isLoad: false, src: base + "img/a (33).jpg"};RES.RES_JSON["a34"]={isLoad: false, src: base + "img/a (34).jpg"};RES.RES_JSON["a35"]={isLoad: false, src: base + "img/a (35).jpg"};RES.RES_JSON["a36"]={isLoad: false, src: base + "img/a (36).jpg"};RES.RES_JSON["a37"]={isLoad: false, src: base + "img/a (37).jpg"};RES.RES_JSON["a38"]={isLoad: false, src: base + "img/a (38).jpg"};RES.RES_JSON["a39"]={isLoad: false, src: base + "img/a (39).jpg"};RES.RES_JSON["a40"]={isLoad: false, src: base + "img/a (40).jpg"};RES.RES_JSON["a41"]={isLoad: false, src: base + "img/a (41).jpg"};RES.RES_JSON["a42"]={isLoad: false, src: base + "img/a (42).jpg"};RES.RES_JSON["a43"]={isLoad: false, src: base + "img/a (43).jpg"};RES.RES_JSON["a44"]={isLoad: false, src: base + "img/a (44).jpg"};RES.RES_JSON["a45"]={isLoad: false, src: base + "img/a (45).jpg"};RES.RES_JSON["a46"]={isLoad: false, src: base + "img/a (46).jpg"};RES.RES_JSON["a47"]={isLoad: false, src: base + "img/a (47).jpg"};RES.RES_JSON["a48"]={isLoad: false, src: base + "img/a (48).jpg"};RES.RES_JSON["a49"]={isLoad: false, src: base + "img/a (49).jpg"};RES.RES_JSON["a50"]={isLoad: false, src: base + "img/a (50).jpg"};RES.RES_JSON["a51"]={isLoad: false, src: base + "img/a (51).jpg"};RES.RES_JSON["a52"]={isLoad: false, src: base + "img/a (52).jpg"};RES.RES_JSON["a53"]={isLoad: false, src: base + "img/a (53).jpg"};RES.RES_JSON["a54"]={isLoad: false, src: base + "img/a (54).jpg"};RES.RES_JSON["a55"]={isLoad: false, src: base + "img/a (55).jpg"};RES.RES_JSON["a56"]={isLoad: false, src: base + "img/a (56).jpg"};RES.RES_JSON["a57"]={isLoad: false, src: base + "img/a (57).jpg"};RES.RES_JSON["a58"]={isLoad: false, src: base + "img/a (58).jpg"};RES.RES_JSON["a59"]={isLoad: false, src: base + "img/a (59).jpg"};RES.RES_JSON["a60"]={isLoad: false, src: base + "img/a (60).jpg"};RES.RES_JSON["a61"]={isLoad: false, src: base + "img/a (61).jpg"};RES.RES_JSON["a62"]={isLoad: false, src: base + "img/a (62).jpg"};RES.RES_JSON["a63"]={isLoad: false, src: base + "img/a (63).jpg"};RES.RES_JSON["a64"]={isLoad: false, src: base + "img/a (64).jpg"};RES.RES_JSON["a65"]={isLoad: false, src: base + "img/a (65).jpg"};RES.RES_JSON["a66"]={isLoad: false, src: base + "img/a (66).jpg"};RES.RES_JSON["a67"]={isLoad: false, src: base + "img/a (67).jpg"};RES.RES_JSON["a68"]={isLoad: false, src: base + "img/a (68).jpg"};RES.RES_JSON["a69"]={isLoad: false, src: base + "img/a (69).jpg"};
            }
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
            /*var bgmask = new Shape.Rectangle({x: 0, y: 0}, stage_e.sw, stage_bg.sh, "#02343d");
             canvas_e.style.background = "#02343d";
             stage_e.addChild(bgmask);*/
            World.Go(function () {
                TWEEN.update();
                stage_e.worldDraw();
                stage_bg.worldDraw();
                stage_main.worldDraw();
                stage_top.worldDraw();
                if(window["PL"]){
                    window["PL"].update();
                }
                if (HotyiLoad.IsPlayEnd && HotyiLoad.Isloaded) {
                    HotyiLoad.IsPlayEnd = false;
                    HotyiLoad.Isloaded = false;
                    document.getElementById("loadline").style.display = "none";
                    HotyiLoad.Load._removeLoadingAnimate(function () {

                        var iHotyi = new IHotyi();
                        iHotyi.iGameStatue(function (data) {
                            var jsonObj = data;
                            window["exchange"] = false;
                            switch (jsonObj.Data.SystemStatue) {
                                case 1:
                                    //正在進行
                                    window["drt"] = new Derector(stage_bg, stage_main, stage_top);
                                    break;
                                case 2:
                                    //未開始
                                    window.location.href = "/Index/NoStart";
                                    break;
                                case 3:
                                    //核銷時間（不能留資，不能兌換）
                                    window["exchange"] = true;
                                    window["drt"] = new Derector(stage_bg, stage_main, stage_top);
                                    break;
                                case 4:
                                    //正式結束
                                    window.location.href = "/Index/GameEnd";
                                    break;
                                case 0:
                                    //錯誤
                                    window.location.href = "/Index/Error";
                                    break;
                                default :
                                    window.location.href = "/Index/Error";
                                    break;
                            }
                        });

                        canvas_e.style.background = "#fff";
                        //错误图片
                        //canvas_e.style.backgroundImage = "url(../../Content/Images/img/common_err.jpg)";
                        canvas_e.style.backgroundSize = "100% 100%";
                        stage_e.worldDraw();
                        stage_e.isAction = false;
                    }, stage_main);
                };
            });
            //03a3bb
            HotyiCommon.InitCommon(stage_main, "../../Content/Images/img/logo.png", "#ffac22");
        });

    }else{
        $.getJSON("../../Content/json/page.json",function(data){
            for(var data_item in data){
                var page = data[data_item];
                var actors = page.actors;
                window["SystemConfig"]=data;
                for(var actors_item in actors){
                    RES.RES_JSON[data_item+"_"+actors_item]={
                        isLoad:false,
                        src:actors[actors_item].src,
                        type:actors[actors_item].type
                    }
                }
                var base = "../../Content/Images/";
                RES.RES_JSON["b1"]= {isLoad: false, src: base + "img/b1.png"};
                RES.RES_JSON["b2"]= {isLoad: false, src: base + "img/b2.png"};
                RES.RES_JSON["b3"]= {isLoad: false, src: base + "img/b3.jpg"};
                RES.RES_JSON["c1"]= {isLoad: false, src: base + "img/c1.jpg"};
                RES.RES_JSON["c2"]= {isLoad: false, src: base + "img/c2.png"};
                RES.RES_JSON["c3"]= {isLoad: false, src: base + "img/c3.jpg"};
                RES.RES_JSON["c4"]= {isLoad: false, src: base + "img/c4.jpg"};
                RES.RES_JSON["c5"]= {isLoad: false, src: base + "img/c5.png"};
                RES.RES_JSON["h1"]= {isLoad: false, src: base + "img/h1.png"};
                RES.RES_JSON["d10"]= {isLoad: false, src: base + "img/playGame/d10.png"};
                RES.RES_JSON["aa"]= {isLoad: false, src: base + "img/playGame/aa.png"};
                RES.RES_JSON["d8"]= {isLoad: false, src: base + "img/playGame/d8.png"};
                RES.RES_JSON["d7"]= {isLoad: false, src: base + "img/playGame/d7.png"};
                RES.RES_JSON["g1"]= {isLoad: false, src: base + "img/g1.jpg"};
                RES.RES_JSON["g2"]= {isLoad: false, src: base + "img/g2.jpg"};
                RES.RES_JSON["g5"]= {isLoad: false, src: base + "img/g5.jpg"};
            }
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
            /*var bgmask = new Shape.Rectangle({x: 0, y: 0}, stage_e.sw, stage_bg.sh, "#02343d");
             canvas_e.style.background = "#02343d";
             stage_e.addChild(bgmask);*/
            World.Go(function () {
                TWEEN.update();
                stage_e.worldDraw();
                stage_bg.worldDraw();
                stage_main.worldDraw();
                stage_top.worldDraw();
                if (HotyiLoad.IsPlayEnd && HotyiLoad.Isloaded) {
                    HotyiLoad.IsPlayEnd = false;
                    HotyiLoad.Isloaded = false;
                    document.getElementById("loadline").style.display = "none";
                    HotyiLoad.Load._removeLoadingAnimate(function () {

                        var iHotyi = new IHotyi();
                        iHotyi.iGameStatue(function (data) {
                            var jsonObj = data;
                            window["exchange"] = false;
                            switch (jsonObj.Data.SystemStatue) {
                                case 1:
                                    //正在進行
                                    window["drt"] = new Derector(stage_bg, stage_main, stage_top);
                                    break;
                                case 2:
                                    //未開始
                                    window.location.href = "/Index/NoStart";
                                    break;
                                case 3:
                                    //核銷時間（不能留資，不能兌換）
                                    window["exchange"] = true;
                                    window["drt"] = new Derector(stage_bg, stage_main, stage_top);
                                    break;
                                case 4:
                                    //正式結束
                                    window.location.href = "/Index/GameEnd";
                                    break;
                                case 0:
                                    //錯誤
                                    window.location.href = "/Index/Error";
                                    break;
                                default :
                                    window.location.href = "/Index/Error";
                                    break;
                            }
                        });

                        canvas_e.style.background = "#fff";
                        //错误图片
                        //canvas_e.style.backgroundImage = "url(../../Content/Images/img/common_err.jpg)";
                        canvas_e.style.backgroundSize = "100% 100%";
                        stage_e.worldDraw();
                        stage_e.isAction = false;
                    }, stage_main);
                };
            });
            //03a3bb
            HotyiCommon.InitCommon(stage_main, "../../Content/Images/img/logo.png", "#ffac22");
        });

    }

};