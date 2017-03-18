function load() {
    $('.loadBox').hide();
    $('.index-box').show();
    // setTimeout(function() {
    //     $('.loadBox').hide();
    //     $('.index-box').show();
    // },2000);
}
(function () {
	//頁面適配
	var h = $('html').height(),
        w = $('html').width(),
        a = h/w,
        b = 567/360;

    if(a>b) {
        var hh = a*360;
        var page1 = new pageResponse({
            class : 'page',     //模块的类名，使用class来控制页面上的模块(1个或多个)
            mode : 'auto',     // auto || contain || cover ，默认模式为auto          
            width : '360',      //输入页面的宽度，只支持输入数值，默认宽度为320px
            height : hh    //输入页面的高度，只支持输入数值，默认高度为504px
        });
    } else {
        var page1 = new pageResponse({
            class : 'page',     //模块的类名，使用class来控制页面上的模块(1个或多个)
            mode : 'auto',     // auto || contain || cover ，默认模式为auto          
            width : '360',      //输入页面的宽度，只支持输入数值，默认宽度为320px
            height : '567'    //输入页面的高度，只支持输入数值，默认高度为504px
        });
    }

    //獲取祝福語
    var wishText = '若非我认为钱微软犬瘟热请问'
    $('.get-wish').text(wishText);

    //點擊製作卡片
    $('.btn1').on('click',function () {
        $('.btn1').off('click');
    	$('.btn1').removeClass('bounceInLeft').addClass('bounceOutDown').one('webkitAnimationEnd', function(){
    		$('.input-box').show().addClass('bounceInUp');
    	});
    });

    //input確認
    $('.btn3').on('click',function () {
        var wish = $('.wish').val();
        var l = $('.wish').val().length;   
        var blen = 0;   
        for(i=0; i<l; i++) {   
            if ((wish.charCodeAt(i) & 0xff00) != 0) {   
                blen ++;   
            }   
            blen ++;   
        }
        if (!wish) {
            malert('請填寫祝福語！');
        } else if (blen > 26) {
            malert('祝福語長度過長！');
        } else {
            $('.btn3').off('click');
            $('.progress').show().addClass('zoomIn');

            setTimeout(function() {
                $('.progress').hide();
                showBox1('zoomIn','bounceOut','finish','check');
            },6000);

            //提交祝福語
            console.log(wish);
        }
    });

    //分享发送贺卡
    $('.btn2').on('click',function () {
        showBox2('zoomIn','bounceOut','share','share');
    });

})();

//弹框
function showBox1(intype,outtype,boxid,closeid) {
    $('.afix').show();
    $('#'+boxid).addClass('animated '+intype).show();

    $('.'+closeid).click(function() {
        // $('#'+boxid).removeClass('animated '+intype).addClass('animated '+outtype).one('webkitAnimationEnd', function () {
        //     $('.afix').hide();
        //     $('#'+boxid).removeClass('animated '+outtype).hide();
        // });
        window.location.href = "index1.html";
    });
}
function showBox2(intype,outtype,boxid,closeid) {
    $('.afix').show();
    $('#'+boxid).css("display","-webkit-box").addClass('animated '+intype).show();

    $('.'+closeid).click(function() {
        $('#'+boxid).removeClass('animated '+intype).addClass('animated '+outtype).one('webkitAnimationEnd', function () {
            $('.afix').hide();
            $('#'+boxid).removeClass('animated '+outtype).hide();
        });
    });
}
//进度条
// function run(num) {
//     $('.runner').animate({width:"60%"},2000);
//     $('.car').animate({left:"87.6px"},2000,function() {
//         $('.runner').animate({width:"100%"},1500);
//         $('.car').animate({left:"168px"},1500);
//     });
// }
