/**
 * 工具类
 */
; (function (w) {
  // 获取DOM元素
  var getBy = {
    // 根据id获取
    id: function (id, par) {
      if (typeof id == 'string') {
        return par ? par.getElementById(id) : document.getElementById(id);
      }
      return null;
    },
    // 根据class获取
    class: function (cls, par) {
      if (typeof cls == 'string') {
        return par ? par.getElementsByClassName(cls) : document.getElementsByClassName(cls);
      }
      return null;
    },
    // 根据tagName获取
    tag: function (tg, par) {
      if (typeof tg == 'string') {
        return par ? par.getElementsByTagName(tg) : document.getElementsByTagName(tg);
      }
      return null;
    },
    // 根据name获取
    name: function (n, par) {
      if (typeof n == 'string') {
        return par ? par.getElementsByName(n) : document.getElementsByName(n);
      }
      return null;
    }
  }

  // 处理元素的操作
  var eleHandles = {
    // 获取innerText
    getInnerText: function (ele) {
      return ele.textContent ? ele.textContent : ele.innerText;
    },
    // 设置innerText
    setInnerText: function (ele, text) {
      ele.textContent ? ele.textContent = text : ele.innerText = text;
    },
    // 绑定事件
    addEvent: function (ele, type, handler, useCapture) {
      if (ele.addEventListener) {
        ele.addEventListener(type, handler, useCapture);
      } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, handler);
      } else {
        ele['on' + type] = handler;
      }
    },
    // 解绑事件
    removeEvent: function (ele, type, handlerName) {
      if (ele.removeEventListener) {
        ele.removeEventListener(type, handlerName);
      } else if (ele.detachEvent) {
        ele.detachEvent('on' + type, handlerName);
      } else {
        ele['on' + type] = null;
      }
    },
    // 阻止事件冒泡
    stopBubble: function (e) {
      e = e || window.event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
    // 兼容事件对象
    getEvent: function (e) {
      return e || window.event;
    },
    // 获取元素计算属性
    getStyle: function (el, attr) {
      if (window.getComputedStyle) {
        return window.getComputedStyle(el, null)[attr];
      } else {
        return el.currentStyle[attr];
      }
    }
  }

  // 获取尺寸及坐标信息
  var getEleInfos = {
    // 获取页面上方滚去的高度
    getScrollTop: function () {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    },
    // 获取页面左边滚去的宽度
    getScrollLeft: function () {
      return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    },
    // 获取光标距离页面顶部的高度
    getPageY: function (e) {
      e = eleHandles.getEvent(e);
      return e.pageY ? e.pageY : e.clientY + this.getScrollTop();
    },
    // 获取光标距离页面左边的宽度
    getPageX: function (e) {
      e = eleHandles.getEvent(e);
      return e.pageX ? e.pageX : e.clientX + this.getScrollLeft();
    }
  }

  // 获取节点
  var getNode = {
    // 获取父级节点
    parNode: function (ele) {
      return ele.parentElement ? ele.parentElement : ele.parentNode;
    },
    // 获取子级节点
    childNodes: function (ele) {
      return ele.childNodes;
    },
    // 获取子级元素
    children: function (ele) {
      return ele.children;
    },
    // 获取子级第一个节点
    firstNode: function (ele) {
      return ele.firstChild == ele.childNodes[0] ? ele.firstChild : ele.childNodes[0];
    },
    // 获取子级第一个元素
    firstElement: function (ele) {
      return ele.firstElementChild ? ele.firstElementChild : ele.firstChild;
    },
    // 获取子级最后一个节点
    lastNode: function (ele) {
      return ele.lastChild == ele.childNodes[ele.childNodes.length - 1] ? ele.lastChild : ele.childNodes[ele.childNodes.length - 1];
    },
    // 获取子级最后一个元素
    lastElement: function (ele) {
      return ele.lastElementChild ? ele.lastElementChild : ele.lastChild;
    },
    // 获取下一个兄弟节点
    nSiblingNode: function (ele) {
      return ele.nextSibling;
    },
    // 获取下一个兄弟元素
    nSiblingEle: function (ele) {
      return ele.nextElementSibling;
    },
    // 获取上一个兄弟节点
    pSiblingNode: function (ele) {
      return ele.previousSibling;
    },
    // 获取上一个兄弟元素
    pSiblingEle: function (ele) {
      return ele.previousElementSibling;
    }
  }

  var effects = {
    speedCtrl: function (el, json, callback, status) {
      // 获取运动状态
      status = status || 'linear';
      // 定义运动速度
      var step = 0;

      clearInterval(el.timerId);
      el.timerId = setInterval(function () {
        // 默认该属性达到target值
        var flag = true;
        for (var attr in json) {
          // 当传入的属性为opacity
          if (attr == "opacity") {
            var current = parseFloat(eleHandles.getStyle(el, attr)) * 100;
            // 匀速
            if (status == 'linear') {
              step = current > json[attr] * 100 ? -3 : 3;
              if (Math.abs(json[attr] * 100 - current) < Math.abs(step)) {
                el.style[attr] = json[attr];
              } else {
                current += step;
                el.style[attr] = current / 100;
              }
            }
            // 匀减速
            else if (status == 'ease-out') {
              step = (json[attr] * 100 - current) / 10;
              step = step > 0 ? Math.ceil(step) : Math.floor(step);
              current += step;
              el.style[attr] = current / 100;
            }
            // 将current缩小100倍，恢复原本数组
            current /= 100;
            // 当传入的属性为zIndex
          } else if (attr == "zIndex") {
            var current = parseInt(eleHandles.getStyle(el, attr));
            el.style[attr] = current;
            // 当传入的属性为其他属性
          } else {
            var current = parseInt(eleHandles.getStyle(el, attr));
            // 匀速
            if (status == 'linear') {
              step = current > json[attr] ? -10 : 10;
              if (Math.abs(json[attr] - current) < Math.abs(step)) {
                el.style[attr] = json[attr] + 'px';
              } else {
                current += step;
                el.style[attr] = current + 'px';
              }
            }
            // 匀减速
            else if (status == 'ease-out') {
              step = (json[attr] - current) / 10;
              step = step > 0 ? Math.ceil(step) : Math.floor(step);
              current += step;
              el.style[attr] = current + 'px';
            }
          }
          if (current != json[attr]) {
            flag = false;
          }
        }
        if (flag) {
          clearInterval(el.timerId);
          callback && callback();
        }
      }, 20);
    }
  }


  w.getBy = getBy;
  w.eleHandles = eleHandles;
  w.getNode = getNode;
  w.effects = effects;
})(window)