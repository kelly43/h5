
if (!window.winlight) window.winlight = {};

winlight.page = {
    /*弹出窗口*/
    openWindow: function(url, w, h) {
        var top, left;
        if (h > 600) {
            top = 0;
            h = screen.height;
        } else {
            top = (screen.height - h) / 2;
        }
        left = (screen.width - w) / 2;
        window.open(url, "newSelect", "width=" + w + ",height=" + h + ",top=" + top + ",left=" + left + ",hotkeys=1,menubar=0,resizable=1,scrollbars=1");
    },

    /*关闭窗口*/
    closeWindow: function() {
        window.close();
    },

    /*重载页面*/
    reload: function() {
        location.reload();
    }
}

/*表单相关*/
winlight.form = {
    /*显示/隐藏对象*/
    displayObj: function(obj) {
        $("#" + obj).toggle();
    },
    /*打开选择器*/
    openSelector: function(url, inputId) {
        if (url.indexOf("?") == -1)
            url = url + "?inputId=" + inputId;
        else url = url + "&inputId=" + inputId;
        winlight.page.openWindow(url, 600, 500);
    },
    /*折叠对象*/
    collapseObj: function(obj1, obj2) {
        var sObj = document.getElementById(obj2);
        if (sObj.style.display != "none") {
            sObj.style.display = "none";
            obj1.className = "c";
            obj1.title = "展开";
        } else {
            sObj.style.display = "block";
            obj1.className = "";
            obj1.title = "收缩";
        }
        obj1.blur();
        return false;
    },
    /*文件选择验证*/
    checkFile: function(obj, postfix) {
        var postfix = postfix || "";
        var fileName = $(obj).val();
        if (fileName == "") {
            alert('请选择要导入的文件！');
            return false;
        }
        // 文件类型验证.
        if (postfix != "") {
            var re = new RegExp("(." + postfix + ")$");
            if (re.test(fileName.toLowerCase())) {
                return true;
            }
            else {
                alert("导入的文件必须为." + postfix + "类型的文件！");
                return false;
            }
        }
    }
}

/*表单验证器*/
winlight.formvalidator = {
    required: /.+/,
    email: /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/,
    phone: /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
    mobile: /^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/,
    url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
    idcard: "this.isIdCard(value)",
    currency: /^\d+(\.\d+)?$/,
    number: /^\d+$/,
    zip: /^[1-9]\d{5}$/,
    qq: /^[1-9]\d{4,8}$/,
	ids: /^[0-9]\d{4}/,
    integer: /^[-\+]?\d+$/,
    double: /^[-\+]?\d+(\.\d+)?$/,
    english: /^[A-Za-z]+$/,
    chinese: /^[\u0391-\uFFE5]+$/,
    unsafe: /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
    issafe: function (str) { return !this.unsafe.test(str); },
    safestring: "this.issafe(value)",
    limit: "this.isLimit(value.length,getValidateRule(attr('kisu')).min, getValidateRule(attr('kisu')).max)",
    limitb: "this.isLimit(this.lenB(value), getValidateRule(attr('kisu')).min, getValidateRule(attr('kisu')).max)",
    date: "this.isDate(value, attr('format'))",
    datetime: "this.isDateTime(value)",
    repeat: "value == document.getElementsByName(getValidateRule(attr('kisu')).to)[0].value",
    range: "getValidateRule(attr('kisu')).min < (value|0) && (value|0) < getValidateRule(attr('kisu')).max",
    compare: "this.isCompare(value,getValidateRule(attr('kisu')).operator,getValidateRule(attr('kisu')).to)",
    match: "this.isMatch(value,getValidateRule(attr('kisu')).operator,getValidateRule(attr('kisu')).to)",
    custom: "this.exec(value, getValidateRule(attr('kisu')).regexp)",
    group: "this.mustChecked(attr('name'), getValidateRule(attr('kisu')).min, getValidateRule(attr('kisu')).max)",

    ErrorItem: [],
    ErrorMessage: ["以下原因导致出错："],

    validateform: function (obj) {
        var jqElems = $("[kisu]");    // 获取表单验证对象集合
        // 指定对象验证.
        if (obj) jqElems = obj;
        var count = jqElems.length;
        this.ErrorMessage.length = 1;
        this.ErrorItem.length = 1;
        this.ErrorItem[0] = jqElems;

        for (var i = 0; i < count; i++) {
            with ($(jqElems[i])) {
                var elemId = attr("id");

                if (elemId == null || elemId == "")
                    continue;

                var validateType = getValidateRule(attr("kisu")).validateType;

                if (typeof (validateType) == "object" || typeof (this[validateType]) == "undefined")
                    continue;

                this.clearState(jqElems[i]);

                var value = "";
                if (validateType != "group") {
                    value = $(jqElems[i]).val();
                }

                // 验证类型不为必填类型时, 获取非空required属性值, 若为false时返回.
                if (validateType != "required") {
                    var requiredValue = getValidateRule(attr("kisu")).required || "false";
                    if (requiredValue.toLowerCase() == "false" && value == "")
                        continue;
                }

                validateType = validateType.toLowerCase();
                switch (validateType) {
                    case "idcard":
                    case "date":
                    case "datetime":
                    case "repeat":
                    case "range":
                    case "compare":
                    case "custom":
                    case "group":
                    case "limit":
                    case "limitb":
                    case "safestring":
                    case "match":
                        if (!eval(this[validateType])) {
                            this.addError(elemId, getValidateRule(attr("kisu")).msg);
                        }
                        break;
                    default:
                        if (!this[validateType].test(value)) {
                            this.addError(elemId, getValidateRule(attr("kisu")).msg);
                        }
                        break;
                }
            }
        }

        if (this.ErrorMessage.length > 1) {
            //var message = this.ErrorMessage.join("\r\n");
            //alert(message);
            // 2011-10-21 提示框调用 ligerUI
            var message = this.ErrorMessage.join("<br />");
            malert(message);
            if (this.ErrorItem.length > 1 && this.ErrorItem[1] != undefined)
                //this.ErrorItem[1].focus();
            return false;
        }

        function getValidateRule(rule) {
            return eval("(" + rule + ")");
        }

        return true;
    },

    isLimit: function (len, min, max) {
        min = min || 0;
        max = max || Number.MAX_VALUE;
        return min <= len && len <= max;
    },

    lenB: function (str) {
        return str.replace(/[^\x00-\xff]/g, "**").length;
    },

    clearState: function (elem) {
        with (elem) {
            if (style.color == "red")
                style.color = "";
            var lastNode = parentNode.childNodes[parentNode.childNodes.length - 1];
            if (lastNode.id == "__ErrorMessagePanel")
                parentNode.removeChild(lastNode);
        }
    },

    addError: function (obj, msg) {
        var item = $("#" + obj);
        if (item.length == 0) item = $("input[name=" + obj + "]");
        this.ErrorItem.push(item[0]);
        this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ". " + msg;
    },

    exec: function (op, reg) {
        return new RegExp(reg, "g").test(op);
    },

    isCompare: function (op1, operator, op2) {
        operator = operator.toLowerCase();
        if (isNaN(op1) || isNaN(op2)) {
            return false;
        }

        op1 = parseFloat(op1);
        op2 = parseFloat(op2);
        switch (operator) {
            case "notequal": //NotEqual
                return (op1 != op2);
            case "greaterthan": //GreaterThan
                return (op1 > op2);
            case "greaterthanequal": //GreaterThanEqual
                return (op1 >= op2);
            case "lessthan": 	//LessThan
                return (op1 < op2);
            case "lessthanequal": //LessThanEqual
                return (op1 <= op2);
            default:
                return (op1 == op2);
        }
    },

    isMatch: function (op1, operator, op2) {
        operator = operator.toLowerCase();
        switch (operator) {
            case "notcontain": 		//不包含 
                return op1.indexOf(op2) == -1;
            case "beginwith": 		//匹配开头
                return op1.indexOf(op2) == 0;
            case "notbeginwith": 	//不匹配开头
                return op1.indexOf(op2) != 0;
            case "endwith": 			//匹配结尾
                return op1.lastIndexOf(op2) == (op1.length - op2.length);
            case "notendwith": 	//不匹配结尾
                return op1.lastIndexOf(op2) != (op1.length - op2.length);
            default: 					//contain 包含 
                return op1.indexOf(op2) != -1;
        }
    },

    mustChecked: function (name, min, max) {
        var arr = name.split(":");
        var groupName = arr[0];
        var groups = getItems(groupName);
        var hasChecked = 0;
        min = min || 1;
        max = max || groups.length;

        for (var i = groups.length - 1; i >= 0; i--)
            if (groups[i].checked) hasChecked++;

        return min <= hasChecked && hasChecked <= max;

        function getItems(groupName) {
            var items = new Array();
            var arr = document.getElementsByTagName("input");
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].type == "checkbox" || arr[i].type == "radio") {
                    if (arr[i].name.indexOf(groupName) != -1) {
                        items.push(arr[i]);
                    }
                }
            }
            return items;
        }
    },

    isIdCard: function (number) {
        var date, Ai;
        var verify = "10x98765432";
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var area = ['', '', '', '', '', '', '', '', '', '', '', '北京', '天津', '河北', '山西', '内蒙古', '', '', '', '', '', '辽宁', '吉林', '黑龙江', '', '', '', '', '', '', '', '上海', '江苏', '浙江', '安微', '福建', '江西', '山东', '', '', '', '河南', '湖北', '湖南', '广东', '广西', '海南', '', '', '', '重庆', '四川', '贵州', '云南', '西藏', '', '', '', '', '', '', '陕西', '甘肃', '青海', '宁夏', '新疆', '', '', '', '', '', '台湾', '', '', '', '', '', '', '', '', '', '香港', '澳门', '', '', '', '', '', '', '', '', '国外'];
        var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
        if (re == null) return false;
        if (re[1] >= area.length || area[re[1]] == "") return false;
        if (re[2].length == 12) {
            Ai = number.substr(0, 17);
            date = [re[9], re[10], re[11]].join("-");
        }
        else {
            Ai = number.substr(0, 6) + "19" + number.substr(6);
            date = ["19" + re[4], re[5], re[6]].join("-");
        }
        if (!this.isDate(date, "ymd")) return false;
        var sum = 0;
        for (var i = 0; i <= 16; i++) {
            sum += Ai.charAt(i) * Wi[i];
        }
        Ai += verify.charAt(sum % 11);
        return (number.length == 15 || number.length == 18 && number == Ai);
    },

    isDate: function (op, formatString) {
        formatString = formatString || "ymd";
        var m, year, month, day;

        switch (formatString) {
            case "ymd":
                m = op.match(new RegExp("^\\s*((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})\\s*$"));
                if (m == null)
                    return false;
                day = m[6];
                month = m[5];
                year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                break;
            case "dmy":
                m = op.match(new RegExp("^\\s*(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))\\s*$"));
                if (m == null)
                    return false;
                day = m[1];
                month = m[3];
                year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
                break;
            default:
                break;
        }
        month--;
        var date = new Date(year, month, day);
        return (typeof (date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate());

        function GetFullYear(y) {
            return ((y < 30 ? "20" : "19") + y) | 0;
        }
    },

    isDateTime: function (op) {
        var m, year, month, day;

        m = op.match(/^(\d{0,4})-(\d{0,2})-(\d{0,2}) (\d{0,2}):(\d{0,2}):(\d{0,2})$/);
        if (m == null)
            return false;
        day = m[3];
        month = m[2];
        year = (m[1].length == 4) ? m[1] : GetFullYear(parseInt(m[2], 10));
        month--;
        var date = new Date(year, month, day);
        return (typeof (date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate());

        function GetFullYear(y) {
            return ((y < 30 ? "20" : "19") + y) | 0;
        }
    },

    validate: function (obj) {
        try {
            // 隐藏输入提示水印文字.
            if ($.watermark != undefined)
                $.watermark.hideAll();

            return this.validateform(obj);
        } catch (e) {
            if ($.watermark != undefined)
                $.watermark.showAll();
            malert(e.name + ": " + e.message);
        }
    }
}

/*表单水印提示*/
winlight.formwatermark = {
    // 初始化.
    init: function() {
        $("[kisu]").each(function() {
            if ($(this).attr("type") == "text" || $(this).attr("type") == "textarea")
                winlight.formwatermark.displayWatermark($(this));
        })
    },
    // 显示水印必填提示.
    displayWatermark: function(obj) {
        try {
            var validaterule = eval("(" + obj.attr("kisu") + ")");

            // 非必填表单元素时返回.
            var requiredValue = validaterule.required || "false";
            if (requiredValue.toLowerCase() == "false") {
                requiredValue = validaterule.validateType || "";
                if (requiredValue != "required") return;
            }

            var msg = validaterule.msg;
            if (msg.length) {
                obj.blur();
                obj.watermark(msg);
            }
        }
        catch (e) { }
    }
}

/*选择框操作*/
winlight.checkbox = {
    // 全选.
    selectAll: function(obj, buttonName) {
        var elements = document.getElementsByTagName("input");

        for (i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.name.indexOf(buttonName) >= 0 && el.disabled == false) {
                el.checked = obj.checked;
            }
        }
    },
    // 判断是否有选择.
    isSelect: function(buttonName) {
        var elements = document.getElementsByTagName("input");
        var selectedCount = 0;

        for (i = 0; i < elements.length; i++) {
            if (elements[i].name.indexOf(buttonName) >= 0) {
                if (elements[i].checked == true) selectedCount += 1;
            }
        }
        if (selectedCount > 0) {
            return true;
        }
        else {
            return false;
        }
    },
    // 验证/确认选择操作.
    checkSelect: function(buttonName, callback, msg) {
        var msgShow = msg || "删除"
        if (!winlight.checkbox.isSelect(buttonName)) {
            malert('请选择要' + msgShow + '的项!', null, "checkSelect", false);
            return false;
        }
        else {
            return confirm('确认' + msgShow + '选中的项吗?', callback);
        }
    },
    // 获取选中的值.
    getSelectedValues: function(isInt) {
        var elements = document.getElementsByTagName("input");
        var selectedValues = "";
        var flagInt = isInt || "int";
        var reg = /^\d+$/;
        for (i = 0; i < elements.length; i++) {
            if (!(elements[i].type == "checkbox")) continue;

            if (elements[i].checked == true) {
                var value = elements[i].value.trim();
                if (flagInt == "int") {
                    if (value.length > 0 && reg.test(value))
                        selectedValues += "," + elements[i].value;
                }
                else {
                    if (value.length > 0)
                        selectedValues += "," + elements[i].value;
                }
            }
        }
        if (selectedValues.length > 0)
            return selectedValues.substr(1, selectedValues.length);
        return selectedValues;
    }
}

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};

// 初始化.
$(function() {
    //winlight.formwatermark.init();
});