//冒泡排序
function bubble(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var k = 0; k < arr.length - i - 1; k++) {
            if (arr[k] > arr[k + 1]) {
                var arr1 = arr[k + 1];
                arr[k + 1] = arr[k];
                arr[k] = arr1;
            }
        }
    }
}

//选择排序
function choose(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var arr1 = arr[j];
                arr[j] = arr[i];
                arr[i] = arr1;
            }
        }
    }
}

function $(vArg) {
    //<1>对参数进行区分。
    switch (vArg[0]) {
        case "#": //id
            return document.getElementById(vArg.substring(1));
            break;
        case ".":
            return elementByClassName(document, vArg.substring(1));
            break;
        default:
            //对参数的前五个字符，进行判断
            var str = vArg.substring(0, 5);
            if (str == "name=") {
                return document.getElementsByName(vArg.substring(5));
            } else {
                return document.getElementsByTagName(vArg);
            }
            break;
    }
}

function elementByClassName(parent, classStr) {
    //<1>找到parent下所有的元素节点
    var nodes = parent.getElementsByTagName('*');
    var result = []; //用记录符合条件的元素节点
    for (var i = 0; i < nodes.length; i++) {
        //<2>如果符合条件，添加到数组中
        if (nodes[i].className == classStr) {
            result.push(nodes[i]);
        }
    }
    return result;
}

//获取当前样式的兼容函数
function getStyle(elem, attr) {
    return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem)[attr];
}

//删除子节点上的空白节点
function removeSpanceNode2(parent) {
    var nodes = parent.childNodes;
    for (var i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)) {
            parent.removeChild(nodes[i]);
        }
    }
}

//创建一个删除空白节点后的函数
function removeSpaceNode(nodes) {
    var result = []; //用来存放不是空白节点的节点
    for (var i = 0; i < nodes.length; i++) {
        //判断是否是空白节点
        if (nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)) {
            continue;
        }
        result.push(nodes[i]);
    }
    return result;
}

//创建一个带文本的元素节点
function createElementWidthTxt(tagName, txt) {
    var node = document.createElement(tagName);
    var otxt = document.createTextNode(txt);
    node.appendChild(otxt);
    return node;
}

//将要插入的节点插入到旧节点之后
function insertAfter(newNode, oldNode) {
    //先判断oldNode是否是最后一个节点
    var parent = oldNode.parentNode;
    if (oldNode == parent.lastChild) {
        var nodes = parent.appendChild(newNode);
    } else {
        //插入到oldNode的下一个节点之前
        var after = oldNode.nextSibling;
        var nodes = oldNode.parentNode.insertBefore(newNode, after);
    }
    return nodes;
}

//封装cookie
//设置cookie
function setCookie(name, value, day) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + day);
    document.cookie = name + "=" + value + "; expires = " + oDate;
}

//得到cookie
function getCookie(name) {
    var str = document.cookie;
    var arr = str.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr1 = arr[i].split("=");
        if (arr1[0] == name) {
            return arr1[1];
        }
    }
}

//删除cookie
function removeCookie(name) {
    setCookie(name, 1, -1);
}

function getStyle(el, property) {
    if (getComputedStyle) { //判断是否在ie浏览器运行，解决兼容性问题
        return getComputedStyle(el)[property];
    } else {
        return el.currentStyle[property];
    }
}

function animate(el, properties) {
    clearInterval(el.timerId);
    el.timerId = setInterval(function() {
        for (var property in properties) {
            var current;
            var target = properties[property];
            if (property === 'opacity') {
                current = Math.round(parseFloat(getStyle(el, "opacity")) * 100); //parseFloat() 函数可解析一个字符串，并返回一个浮点数。
            } else {
                current = parseInt(getStyle(el, property)); //parseInt() 函数可解析一个字符串，并返回一个整数
            }
            var speed = (target - current) / 30;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (property === 'opacity') {
                el.style.opacity = (current + speed) / 100;
            } else {
                el.style[property] = current + speed + 'px';
            }
        }
    }, 20)
}