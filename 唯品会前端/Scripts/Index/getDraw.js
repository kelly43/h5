var isClick = true; //可否翻牌
;(function () {

    var h = $('#index-box').height()-50;
    $('.big-box').height(h);

    //进入时间
    var joinDate = new Date(),joinA = joinDate.getDate();
    //抽奖机会数
    $('.c-times').html(UserJson.chanceNum);
    //所需的正确卡牌数
    $('.rightNum').html(UserJson.needCard);
    //正确卡牌名称
    $('.c2').attr('src',UserJson.bingCardNameImg);
    $('.cardName').html(UserJson.bindCardName);
    //显示所翻卡牌
    var len = UserJson.cardRecord.length;
    if (len != 0) {
        for (var i=0,l=len;i<l;i++) {
            var JobID = UserJson.cardRecord[i].imgUrl,
                paceID = UserJson.cardRecord[i].cardPlace;
            $(".fbox").eq(paceID).find('.front').css('background-image','url('+JobID+')');
            $(".fbox").eq(paceID).find('.back').addClass('fliped').removeClass('flip');
            $(".fbox").eq(paceID).find('.front').addClass('flip').removeClass('fliped');
            $(".fbox").eq(paceID).addClass('isOpen');
        }
    }

    //重置提醒
    if (UserJson.isReset) {
        showBox1('izoomIn','ibounceOut','noChange-box','change-btn');
    }

    //外部链接
    $('.fixBottom').on('click',function() {
        window.location.href = 'index2.html';
    });
    //前往使用
    $('.go-btn').on('click',function() {
        window.location.href = 'index2.html';
    });


    //多图片的预加载
    ImgUrl();

    //是否中奖
    if (UserJson.isWin) {
        //console.log(UserJson.prizeList[0].prizeType)
        if (UserJson.prizeList[0].prizeType == 0) {
            //卡券
            showBox1('izoomIn','ibounceOut','ticket-box','share-box');
        } else if (UserJson.prizeList[0].prizeType == 1) {
            //实物奖品
            $('.chanceKey').text(UserJson.prizeList[0].chanceKey);
            $('.kind-name').html(UserJson.prizeList[0].prizeName);
            $('.kind-img').attr('src',UserJson.prizeList[0].prizeImg);
            if (UserJson.isSaveInfo) {
                $('#apply-btn').hide();
                $('#close-btn').show();
                $('.user-name').attr('disabled','disabled').val(UserJson.name);
                $('.user-phone').attr('disabled','disabled').val(UserJson.phone);
                $('.address').attr('disabled','disabled').val(UserJson.address);
            }
            showBox1('izoomIn','ibounceOut','kind-box','a');
        }
    }

	//点击翻转事件
    $(".fbox").off();
    $(".fbox").on('click',function() {
        var nowDate = new Date(),joinB = nowDate.getDate();
        if(joinA !== joinB) {
            malert2("刷新页面","新的一天，游戏记录将清空，重新找朋友帮忙吧！");
            $(".select").click(function(){
                location.reload();
            });
            return;
        }
        var $this = $(this);
        if ($this.hasClass('isOpen')) {
            return;
            //malert('你逗我啊 已经打开了');
        } else if (isClick) {
            isClick = false;
            if (UserJson.chanceNum >= 1) {

                //获取抽奖机会
                UserJson.chanceNum--;
                $('.c-times').html(UserJson.chanceNum);

                //与后台交互时loading的显示
                $('.loading').css('display','-webkit-box');

                $this.addClass('isOpen thisOpen');
                //抽奖，与后台交互
                drawCard($this.index());
            } else {
                isClick = true;
                //分享弹窗
                showBox1('izoomIn','ibounceOut','share-box','share-box');
            }

            var open = 0;
            $(".fbox").each(function () {
                if($(this).hasClass('isOpen')) {
                    open++;
                }
            });
            //console.log(open);
            if (open == 9) {
                $('.refresh-btn').show();
            }
        }
    });

    //刷新卡牌
    $('.refresh-btn').on('click',function() {
        $(".fbox").removeClass('isOpen');
        $('.refresh-btn').hide();
        open = 0;
        $('.front').removeClass('flip').addClass('fliped');
        $('.back').removeClass('fliped').addClass('flip');
    });


    //提交资料
    $('#apply-btn').off();
    $('#apply-btn').on('click',function() {
        check();
    });

    //查看更多
    $('#close-btn').off();
    $('#close-btn').on('click',function() {
        window.location.href = '';
    });

})();

//多图片的预加载
function ImgUrl() {
    var imgArr = [];
    if (!Json.length) {
        return;
    }
    for (var i=0,len=Json.length; i<len;i++) {
        imgArr.push(Json[i].imgUrl);
    }
    for (var b=0,l=imgArr.length;b<l;b++) {
        imgJoin(imgArr[b]);
    }
}
function imgJoin(imgUrl) {
    var imageObj = new Image();
    imageObj.src = imgUrl;
}

//验证数据
function check() {
    var name = $('.user-name').val(),
        phone = $('.user-phone').val(),
        address = $('.address').val(),
        res = /^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/,
        msg = '';
    if (!name) {
        msg = "请输入姓名！<br>";
    }
    if (!res.test(phone)) {
        msg += "请输入正确的手机号码！<br>";
    }
    if (!address) {
        msg += "请输入地址！<br>";
    }
    if (msg !='') {
        malert(msg);
    } else {
        //与后台交互时loading的显示
        $('.loading').css('display','-webkit-box');
        saveInfo(name,phone,address)
    }
}
function saveInfo() {
    var rusult = {"statue":true,"data":"sucessful","time":"2016-2-2 12:00"};
    saveInfoReback(rusult);
}
function saveInfoReback(result) {

    $('.loading').hide();
    if (result.statue) {
        //保存提交信息
        malert('提交成功');
    } else {
        switch (rusult.data) {
            case "noWin":
                malert("您还没赢得奖品");
                break;
            case "saved":
                malert("您已经保存过信息");
                break;
        }
    }
    $('#apply-btn').hide();
    $('#close-btn').show();
}

//交互
var drawCard = function(pace) {
    var result = {
        "statue":0,
        "data":"sucessful",
        "awardName":"黄金(足金)Charme串珠系列生肖猴转运珠",
        "awardType":1,
        "awardImg":"..\/..\/Content\/Images\/Javy\/fsdcedfs.png",
        "cardID":3,
        "cardImg":"..\/..\/Content\/Images\/4\/dd1-3.png",
        "cardName":"\u4e00\u751f\u5e73\u5b89",
        "time":"2016-2-2 12:00",
        "isOpen":true,
        "isRight":true,
        "iswin":false,
        "openCode":1001,
        "chanceKey":"dsfasf"
    };
    drawCardReback(result);
}

var drawCardReback = function(result) {

    //按钮设置可点击
    isClick = true;

    //隐藏交互loading
    $('.loading').hide();

    if (!result.isOpen) {
        switch (rusult.openCode) {
            case 1002:
                malert("您没有抽奖机会哦");
                break;
            case 1003:
                malert("牌已经被翻开了");
                break;
        }
        return;
    }

    $('.thisOpen .front').css({
        'background':'url('+result.cardImg+') no-repeat',
        'background-size':'100%'
    });

    //翻牌
    var $thisOpen = $('.thisOpen');
    $thisOpen.removeClass('thisOpen');
    $thisOpen.find(".back").addClass("fliped").removeClass("flip");
    $thisOpen.find(".front").addClass("flip").removeClass("fliped");

    if (result.isRight) {
        UserJson.needCard--;
        //所需的正确卡牌数
        $('.rightNum').html(UserJson.needCard);
    }
    if (result.iswin) {
        //口令
        if (result.awardType == 0) {
            //卡券
            setTimeout(function () {
                showBox1('izoomIn','ibounceOut','ticket-box','share-box');
            },500);
        } else if (result.awardType == 1) {
            //实物奖品
            $('.chanceKey').text(result.chanceKey);
            $('.kind-name').html(result.awardName);
            $('.kind-img').attr('src',result.awardImg);
            setTimeout(function () {
                showBox1('izoomIn','ibounceOut','kind-box','a');
            },500);
        }
    }

}
