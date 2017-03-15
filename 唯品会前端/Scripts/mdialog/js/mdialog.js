//弹出框(标题，内容)
function malert2(title, content) {
    var tmp = '<div class="ui-dialog show"><div class="ui-dialog-cnt"><div class="ui-dialog-bd"><div><h4>' + title + '</h4><div>' + content + '</div></div></div><div class="ui-dialog-ft ui-btn-group"><button type="button" class="select" onclick="closemsgs();">确 认</button></div></div></div>';
    $("body").append(tmp);
}
//弹出框(内容)
function malert(content) {
    malert2("温馨提示", content);
}
//确认框(标题，内容,左边按钮文字，右边按钮文字，左边按钮事件名称，右边按钮事件名称)
function mconfirm2(title, content, LbuttonVal, RbuttonVal, LbuttonClick, RbuttonClick) {
    var tmp = '<div class="ui-dialog show"><div class="ui-dialog-cnt"><div class="ui-dialog-bd"><div><h4>' + title + '</h4><div>' + content + '</div></div></div><div class="ui-dialog-ft ui-btn-group"><button type="button" class="select" onclick="' + LbuttonClick + '();">' + LbuttonVal + '</button><button type="button" class="select" onclick="' + RbuttonClick + '();">' + RbuttonVal + '</button></div></div></div>';
    $("body").append(tmp);
}
//确认框(标题，内容,左边按钮事件名称)
function mconfirm(title, content, LbuttonClick) {
    mconfirm2(title, content, "确 认", "取 消", LbuttonClick, "closemsgs");
}

//关闭对话框
function closemsgs() {
    $(".ui-dialog").each(function (i, item) {
        if ($(item).hasClass("show")) {
            $(item).removeClass("show").addClass("hide");
        }
    });
}

//$(function () {
//    mconfirm("tt", "cc", "on");

//    //closemsgs();
//});

//确认框(标题，内容,左边按钮文字，右边按钮文字，左边按钮事件名称，右边按钮事件名称)
function mconfirm3(title, content, LbuttonVal, RbuttonVal, LbuttonClick, RbuttonClick) {
    var tmp = '<div class="ui-dialog show"><div class="ui-dialog-cnt"><div class="ui-dialog-bd"><div><h4>' + title + '</h4><div>' + content + '</div></div></div><div class="ui-dialog-ft ui-btn-group"><button type="button" class="Lselect" onclick="' + LbuttonClick + '();">' + LbuttonVal + '</button><button type="button" class="Rselect" onclick="' + RbuttonClick + '();">' + RbuttonVal + '</button></div></div></div>';
    $("body").append(tmp);
}