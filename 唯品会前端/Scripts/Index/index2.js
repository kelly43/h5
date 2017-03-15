
var anum = 0;
var temp1 = Json[0].sort(randomsort),
    temp2 = Json[1].sort(randomsort),
    temp3 = Json[2].sort(randomsort),
    temp4 = Json[3].sort(randomsort);
;(function () {
	//摇一摇
	shake();

    //图片展示
    changeImg();

    ImgUrl();

    //点击跳转
    $('.abox').on('click',function() {
        var cardID = $(this).find('img').data('id');
        //choiceCard(cardID);
        window.location.href = 'getDraw.html';
    });

})();

//多图片的预加载
function ImgUrl() {
    var imgArr = []; 
    for (var i=0; i<4;i++) {
        for (var j=0; j<4; j++) {
            imgArr.push(Json[i][j].imgUrl);
        }
    }
    for (var b=0,l=imgArr.length;b<l;b++) {
        imgJoin(imgArr[b]);
    }
}
function imgJoin(imgUrl) {
    var imageObj = new Image();
    imageObj.src = imgUrl;
}

//摇一摇
function shake() {
	var SHAKE_THRESHOLD = 1500; //摇晃的敏感度;
    var last_update = 0;
    var x = y = z = last_x = last_y = last_z = 0;
    var cango = true
    var isFirst = true
    var media;
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        alert('本设备不支持devicemotion事件');
    }
    function deviceMotionHandler(eventData) {//监听事件中不断执行的函数

        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime(); //当前时间截

        if ((curTime - last_update) > 100 && cango) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var t3;
            // var t1;
            var t2;
            // var t4;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
            var status = document.getElementById("status");

            if (speed > SHAKE_THRESHOLD && !isFirst) {
                cango = false;
                //window.removeEventListener("devicemotion", deviceMotionHandler); //移除监听
                //切换图
                changeImg();
                // alert('1');

                t2 = setTimeout(function () {
                    cango = true;
                    clearTimeout(t2);
                }, 1200);
            }
            last_x = x;
            last_y = y;
            last_z = z;
            t3 = setTimeout(function () { isFirst = false; clearTimeout(t3); }, 1000);
        }
    }
}

//切换图
function changeImg() {
    
    var a1 = temp1[anum],a2 = temp2[anum],a3 = temp3[anum],a4 = temp4[anum];
	$('.abox').hide();
    $('.abox').eq(0).find('img').attr({'src':a1.imgUrl,'data-id':a1.ID});
    $('.abox').eq(1).find('img').attr({'src':a2.imgUrl,'data-id':a2.ID});
    $('.abox').eq(2).find('img').attr({'src':a3.imgUrl,'data-id':a3.ID});
    $('.abox').eq(3).find('img').attr({'src':a4.imgUrl,'data-id':a4.ID});
	$('.abox').fadeIn();
    if (anum == temp1.length-1) {
        anum=0;
    } else {
        anum++;
    }
}

//数组随机排列
function randomsort() {  
    return Math.random()>.5 ? -1 : 1;  
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1  
}  

