function HotyiLoad(){}
HotyiLoad.Isloaded = false;
HotyiLoad.IsPlayEnd = false;
HotyiLoad.Load = {};
HotyiLoad.Init = function(){
    //不同节日 在这里加
    //todo get festival
    var festival = "normal";
    switch (festival){
        case "normal":
            HotyiLoad.Load = HotyiLoad.NoramlLoad;
            break;
    }
}
//经典加载页面
HotyiLoad.NoramlLoad = {
    logo_Bmp:null,
    logo_Bmp0:null,
    _loading: function (stage_main) {
        var that = this;
        var logo_res0 = "../../Content/Images/img/hotyi_text.png";
        var logo_res = "../../Content/Images/img/hotyi_logo.png";
        KWhaleUtils.getImgBySrcAndCall(logo_res, function (logo) {
            that.logo_Bmp0 = null;
            KWhaleUtils.getImgBySrcAndCall(logo_res0, function (data) {
                RES.load(that._setProgress, function () {
                    that._loaded();
                });
                that.logo_Bmp = new Bitmap(logo);
                KWhaleUtils.AddStageByScaleHNoCheck(stage_main, that.logo_Bmp, logoWeight / 1135);
                that.logo_Bmp.anchorX = that.logo_Bmp.anchorY = 0.5;
                that.logo_Bmp.x = start_x;
                that.logo_Bmp.y = start_y;
                that.logo_Bmp.alpha = 0;
                that.logo_Bmp.z = 100;

                that.logo_Bmp0 = new Bitmap(data);
                KWhaleUtils.AddStageByScaleHNoCheck(stage_main, that.logo_Bmp0, logoWeight * 1 / 5 / 1135);
                that.logo_Bmp0.x = (stage_main.sw - that.logo_Bmp0.width) / 2;
                that.logo_Bmp0.y = that.logo_Bmp.y + that.logo_Bmp.height / 2 + stage_main.sh / 1135 * 24;
                that.logo_Bmp0.alpha = 0;
                that.logo_Bmp0.z = 100;
            });
            var start_x = stage_main.sw / 2;
            var start_y = stage_main.sh / 1135 * 479;

            var lineWeight = 142 / 408 * 22;
            var logoWeight = 142;

            var dis_x = stage_main.sh / 1135 * lineWeight / 22 * 169;
            var dis_y_1 = stage_main.sh / 1135 * lineWeight / 22 * 82;
            var dis_y_2 = stage_main.sh / 1135 * lineWeight / 22 * 100;
            var dis_y_3 = stage_main.sh / 1135 * lineWeight / 22 * 175;
            var st_point = {x: start_x, y: start_y};

            var point_11 = {x: start_x, y: start_y - dis_y_3};
            var point_12 = {x: start_x - dis_x, y: start_y + dis_y_2};
            var point_13 = {x: start_x + dis_x, y: start_y + dis_y_2};

            var time_1 = 400;//840;
            var time_2 = 300;//516;
            var time_3 = 200;//300;

            var line_1, line_2, line_3, line_31, line_32, line_21, line_22, line_11, line_12, tw1, tw11, tw12, tw2, tw21, tw22, tw3, tw31, tw32, twl;


            line_1 = new Line(st_point, st_point, "#008bd3", stage_main.sh / 1135 * lineWeight / KWRatio);
            tw1 = KWhaleUtils.Tween(line_1.endObj, {
                x: start_x - dis_x,
                y: start_y - dis_y_1
            }, 0, time_1, TWEEN.Easing.Back.InOut).start().onComplete(function () {
                line_11 = new Line(line_1.endObj, line_1.endObj, "#008bd3", stage_main.sh / 1135 * lineWeight / KWRatio);
                stage_main.addChild(line_11);
                tw11 = KWhaleUtils.Tween(line_11.endObj, point_11, 0, time_2, TWEEN.Easing.Back.InOut).start();

                line_12 = new Line(line_1.endObj, line_1.endObj, "#008bd3", stage_main.sh / 1135 * lineWeight / KWRatio);
                stage_main.addChild(line_12);
                tw12 = KWhaleUtils.Tween(line_12.endObj, point_12, time_2, time_2, TWEEN.Easing.Back.InOut).start();
            });
            line_2 = new Line(st_point, st_point, "#008bd3", stage_main.sh / 1135 * lineWeight / KWRatio);
            tw2 = KWhaleUtils.Tween(line_2.endObj, {
                x: start_x + dis_x,
                y: start_y - dis_y_1
            }, 0, time_1, TWEEN.Easing.Back.InOut).start().onComplete(function () {
                line_21 = new Line(line_2.endObj, line_2.endObj, "#008bd3", stage_main.sh / 1135 * lineWeight / KWRatio);
                stage_main.addChild(line_21);
                tw21 = KWhaleUtils.Tween(line_21.endObj, point_13, 0, time_2, TWEEN.Easing.Back.InOut).start();

                line_22 = new Line(line_2.endObj, line_2.endObj, "#008bd3", stage_main.sh / 1135 * lineWeight / KWRatio);
                stage_main.addChild(line_22);
                tw22 = KWhaleUtils.Tween(line_22.endObj, point_11, time_2, time_2, TWEEN.Easing.Back.InOut).start();
            });
            line_3 = new Line(st_point, st_point, "#008bd3", stage_main.sh / 1135 * lineWeight / KWRatio);
            tw3 = KWhaleUtils.Tween(line_3.endObj, {
                x: start_x,
                y: start_y + dis_y_3
            }, 0, time_1, TWEEN.Easing.Back.InOut).start().onComplete(function () {
                line_31 = new Line(line_3.endObj, line_3.endObj, "#008bd3", stage_main.sh / 1135 * lineWeight / KWRatio);
                stage_main.addChild(line_31);
                tw31 = KWhaleUtils.Tween(line_31.endObj, point_12, 0, time_2, TWEEN.Easing.Back.InOut).start();

                line_32 = new Line(line_3.endObj, line_3.endObj, "#008bd3", stage_main.sh / 1135 * lineWeight / KWRatio);
                stage_main.addChild(line_32);
                stage_main.reflashZ();
                tw32 = KWhaleUtils.Tween(line_32.endObj, point_13, time_2, time_2, TWEEN.Easing.Back.InOut).start().onComplete(function () {
                    KWhaleUtils.Tween(that.logo_Bmp, {alpha: 1}, 0, time_3, TWEEN.Easing.Quadratic.InOut).start().onComplete(function () {
                        stage_main.removeChild(line_1);
                        stage_main.removeChild(line_11);
                        stage_main.removeChild(line_12);
                        stage_main.removeChild(line_2);
                        stage_main.removeChild(line_21);
                        stage_main.removeChild(line_22);
                        stage_main.removeChild(line_3);
                        stage_main.removeChild(line_31);
                        stage_main.removeChild(line_32);
                        /*tw1.stop();
                         tw11.stop();
                         tw12.stop();
                         tw2.stop();
                         tw21.stop();
                         tw22.stop();
                         tw3.stop();
                         tw31.stop();
                         tw32.stop();*/
                    });


                    if (that.logo_Bmp0) {
                        var t = KWhaleUtils.Tween(that.logo_Bmp0, {alpha: 1}, 0, time_3, TWEEN.Easing.Quadratic.InOut).start().onComplete(function () {
                            HotyiLoad.IsPlayEnd = true;
                            //t.stop();
                        });
                    }
                });
            });
            stage_main.addChild(line_1);
            stage_main.addChild(line_2);
            stage_main.addChild(line_3);
        });
    },
    _removeLoadingAnimate: function (call,stage_main) {
        //setTimeout(function () {
        var that = this;
        var t1 = KWhaleUtils.Tween(that.logo_Bmp, {alpha: 0}, 1000, 500, TWEEN.Easing.Quadratic.InOut).start();
        var t2 = KWhaleUtils.Tween(that.logo_Bmp0, {alpha: 0}, 1000, 500, TWEEN.Easing.Quadratic.InOut).start().onComplete(function () {
            stage_main.removeChild(that.logo_Bmp);
            stage_main.removeChild(that.logo_Bmp0);
            call();
            //t2.stop();
            //t1.stop();
        });
        //}, 2000);
    },
    _setProgress: function (count, total) {
        var sw = window.innerWidth || document.documentElement.clientWidth;
        var sh = window.innerHeight || document.documentElement.clientHeight;
        var ll = document.getElementById("loadline");
        //ll.style.top = "0px";
        ll.style.top = "0px";//sh/1135*1125+"px";
        ll.style.width = sw * count / total + "px";
        ll.style.height = sh / 1135 * 10 + "px";
    },
    _loaded: function () {
        var sw = window.innerWidth || document.documentElement.clientWidth;
        var sh = window.innerHeight || document.documentElement.clientHeight;
        var ll = document.getElementById("loadline");
        //ll.style.top = "0px";
        ll.style.top = "0px";//sh/1135*1125+"px";
        ll.style.width = sw + "px";
        ll.style.height = sh / 1135 * 10 + "px";
        HotyiLoad.Isloaded = true;
    }
}
