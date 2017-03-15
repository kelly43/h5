function HotyiLoad(){};
HotyiLoad.Isloaded = false;
HotyiLoad.IsPlayEnd = false;
HotyiLoad.Load = {};
HotyiLoad.Color = "#028ad4";
HotyiLoad.Init = function(call,src,color){
    HotyiLoad.Load = HotyiLoad.DiyLoad;
    HotyiLoad.Load.logo_res = src;
    if(color)
        HotyiLoad.Color = color;
    call();
};
HotyiLoad.DiyLoad = {
    logo_Bmp:null,
    logo_res:"",
    circle_wrap:null,
    isLoop:true,
    loopCount:1,
    _loading: function (stage_main) {
        // TODO：调用接口 获取用户logo src
        // TODO：播放动画
        var that = this;
        KWhaleUtils.getImgBySrcAndCall(that.logo_res, function (logo) {
            var start_x = stage_main.sw / 2;
            var start_y = stage_main.sh / 1135 * 479;
            RES.load(that._setProgress, function () {
                that._loaded();
            });
            that.logo_Bmp = new Bitmap(logo);
            that.logo_Bmp.anchorX = that.logo_Bmp.anchorY = 0.5;
            that.logo_Bmp.x = start_x;
            that.logo_Bmp.y = start_y;
            that.logo_Bmp.alpha = 0;
            that.logo_Bmp.z = 100;
            var logoWeight = 155;
            KWhaleUtils.AddStageByScaleHNoCheck(stage_main, that.logo_Bmp, logoWeight / 1135);
            that.logo_Bmp.mask={type:"arc",r:that.logo_Bmp.height/2};

            KWhaleUtils.Tween(that.logo_Bmp, {alpha: 1}, 0, 400, TWEEN.Easing.Quadratic.InOut).start();

            that.circle_wrap = new Shape.Arc(that.logo_Bmp, stage_main.sh / 1135 *110, HotyiLoad.Color, 0);
            that.circle_wrap.lineWidth = stage_main.sh / 1135 * 10;
            that.circle_wrap.rotation = -90;
            that.circle_wrap.alpha=0.2;
            stage_main.addChild(that.circle_wrap);
            var funcLoop = function(){
                if(that.isLoop) {
                    that.loopCount++;
                    if(that.loopCount>=3){
                        if(HotyiLoad.Isloaded) {
                            that.isLoop = false;
                            HotyiLoad.IsPlayEnd = true;
                        }
                    }
                    that.circle_wrap.rotation = -90;
                    KWhaleUtils.Tween(that.circle_wrap, {
                        angle: 360,
                        alpha: 1
                    }, 0, 1500, TWEEN.Easing.Quadratic.InOut).start().onComplete(function () {
                        KWhaleUtils.Tween(that.circle_wrap, {
                            angle: 1,
                            rotation: 270,
                            alpha: 0.2
                        }, 0, 1500, TWEEN.Easing.Quadratic.InOut).start().onComplete(function () {
                            funcLoop()
                        });
                    });
                }
            };
            funcLoop();
        });
    },
    _removeLoadingAnimate: function (call,stage_main) {
        //setTimeout(function () {
        var that = this;
        var t1 = KWhaleUtils.Tween(that.logo_Bmp, {alpha: 0}, 0, 500, TWEEN.Easing.Quadratic.InOut).start();
        var t2 = KWhaleUtils.Tween(that.circle_wrap, {alpha: 0}, 0, 500, TWEEN.Easing.Quadratic.InOut).start().onComplete(function () {
            stage_main.removeChild(that.logo_Bmp);
            stage_main.removeChild(that.circle_wrap);
            call();
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
};