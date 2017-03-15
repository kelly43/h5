/* 
 * 名称 ：移动端响应式框架
 * 作者 ：白树 http://peunzhang.cnblogs.com
 * 版本 ：v1.0
 * 日期 ：2015.6.23
 * 兼容 ：ios4+、android2.3+、winphone8+
 */
function pageResponse(opt) {
    //getElementsByClassName
    function getElementsByClassName(cl) {
        if(document.getElementsByClassName){
            return  document.getElementsByClassName(cl)
        }
        else{    
            var ele = [],
                els =  document.getElementsByTagName("*"),
                i = els.length;
            cl = cl.replace(/\-/g, "\\-");
            var pa = new RegExp("(^|\\s)" + cl + "(\\s|$)");
            while(--i >= 0){
                if (pa.test(els[i].className)){
                    ele.push(els[i]);
                }
            }
            return ele;
        }
    }
    //模板
    function template(mode, obj, num){
        var s = obj.style; 
            s.width = pw + "px";
            s.height = ph + "px";
            s.webkitTransformOrigin = "left top 0";
            s.transformOrigin = "left top 0";
            s.webkitTransform = "scale(" + num + ")";
            s.transform = "scale(" + num + ")";
        if(mode == "auto"){
            document.body.style.height = ph * num + "px";// 兼容android2.3.5系统下body高度不自动刷新的bug
        }
        else if(mode == "contain" || mode == "cover"){
            s.position = "absolute";
            s.left = "50%";
            s.top = "50%";
            s.marginLeft = pw / -2 + "px";
            s.marginTop = ph / -2 + "px";
            s.webkitTransformOrigin = "center center 0";
            s.transformOrigin = "center center 0";
            document.body.style.msTouchAction = "none";// 阻止默认滑屏事件
            document.ontouchmove = function(e){e.preventDefault()}
        }
    }
    var dw = document.documentElement.clientWidth,
        dh = document.documentElement.clientHeight,
        ds = dw / dh,// 设备宽高初始比例
        pw = opt.width || 320,
        ph = opt.height || 504,
        ps = pw / ph,// 页面宽高初始比例
        pd = getElementsByClassName(opt.class),
        sm = opt.mode || "auto",
        sn = (sm == "contain") ? (ds > ps ? dh / ph : dw / pw) : (sm == "cover") ? (ds < ps ? dh / ph : dw / pw) : dw / pw;// 页面缩放比例，默认模式为auto
    for(i = 0;i < pd.length;i++){
        template(sm, pd[i], sn);
    }
}
/*  使用方法
 *  var page = new pageResponse({
 *       class : '输入类名', //模块的类名
 *       mode : 'contain',    // auto || contain || cover 
 *       width : '320',     //默认宽320px 
 *       height : '504'     //默认高504px
 *   })
 */

var page1 = new pageResponse({
    class : 'page',     //模块的类名，使用class来控制页面上的模块(1个或多个)
    mode : '',     // auto || contain || cover ，默认模式为auto           
    width : '360',      //输入页面的宽度，只支持输入数值，默认宽度为320px
    height :  ' '   //输入页面的高度，只支持输入数值，默认高度为504px
});

var h = $('html').height(),
    w = $('html').width(),
    a = h/w,
    b = 567/360;

if(a>b) {
    var hh = a*360;
    var page2 = new pageResponse({
        class : 'screen',     //模块的类名，使用class来控制页面上的模块(1个或多个)
        mode : 'auto',     // auto || contain || cover ，默认模式为auto          
        width : '360',      //输入页面的宽度，只支持输入数值，默认宽度为320px
        height : hh    //输入页面的高度，只支持输入数值，默认高度为504px
    });
} else {
    var page2 = new pageResponse({
        class : 'screen',     //模块的类名，使用class来控制页面上的模块(1个或多个)
        mode : 'auto',     // auto || contain || cover ，默认模式为auto          
        width : '360',      //输入页面的宽度，只支持输入数值，默认宽度为320px
        height : '567'    //输入页面的高度，只支持输入数值，默认高度为504px
    });
}

/* 
 * 名称 ：循环动画,动画之间延迟
 * 作者 ：kelly
 * 版本 ：v1.0
 * 日期 ：2016.01.16
 * tage:目标class,animatedOut:移除的动画,animatedIn:动画名,delayTime:延迟时间
 */
function delayAnimate(tage,animatedOut,animatedIn,delayTime) {
    $('.'+tage).one('webkitAnimationEnd', function(){
        var $this = $(this);
        $this.addClass('delay0').removeClass('animated '+animatedOut);
        var pdelay = setInterval(function () {
            $this.addClass('animated '+animatedIn).one('webkitAnimationEnd', function(){
                $this.removeClass('animated '+animatedIn);
            });
        },delayTime);
    });
}

/* 
 * 名称 ：弹框
 * 作者 ：kelly
 * 版本 ：v1.0
 * 日期 ：2016.01.16
 * intype:入场动画，outtype：出场动画，boxid：目标弹框ID,closeid：目标关闭class
 */
function showBox1(intype,outtype,boxid,closeid) {
    $('.afix').show();
    $('#'+boxid).addClass(intype).css('display','-webkit-box');

    $('.'+closeid).off();
    $('.'+closeid).on('click',function() {
        $('#'+boxid).removeClass(intype).addClass(outtype).one('webkitAnimationEnd', function () {
            $('.afix').hide();
            $('#'+boxid).removeClass(outtype).hide();
        });
    });
}