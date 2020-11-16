/**
 * 工具类
 */
;(function(w){
  // 获取DOM元素的工具对象
  var getBy = {
    // 根据id获取
    id:function(id,par){
      if(typeof id == 'string'){
        return par ? par.getElementById(id) : document.getElementById(id);
      }
      return null;
    },
    // 根据class获取
    class:function(cls,par){
      if(typeof cls == 'string'){
        return par ? par.getElementsByClassName(cls) : document.getElementsByClassName(cls);
      }
      return null;
    },
    // 根据tagName获取
    tag:function(tg,par){
      if(typeof tg == 'string'){
        return par ? par.getElementsByTagName(tg) : document.getElementsByTagName(tg);
      }
      return null;
    },
    // 根据name获取
    name:function(n,par){
      if(typeof n == 'string'){
        return par ? par.getElementsByName(n) : document.getElementsByName(n);
      }
      return null;
    }
  }
  
  // 处理元素的操作
  var eleHandles = {
    // 获取innerText
    getInnerText:function(ele){
      return ele.textContent ? ele.textContent : ele.innerText;
    },
    // 设置innerText
    setInnerText:function(ele,text){
      ele.textContent ? ele.textContent = text : ele.innerText = text;
    },
    // 绑定事件
    addEvent:function(ele,type,handler){
      if(ele.addEventListener){
        ele.addEventListener(type,handler,false);
      }else if(ele.attachEvent){
        ele.attachEvent('on'+type,handler);
      }else{
        ele['on'+type] = handler;
      }
    },
    // 解绑事件
    removeEvent:function(ele,type,handler){
      if(ele.removeEventListener){
        ele.removeEventListener(type,handler);
      }else if(ele.detachEvent){
        ele.detachEvent('on'+type,handler);
      }else{
        ele['on'+type] = null;
      }
    }
  }
  
  // 获取节点
  var getNode = {
      // 获取父级节点
      parNode:function(ele){
        return ele.parentElement ? ele.parentElement : ele.parentNode;
      },
      // 获取子级节点
      childNodes:function(ele){
        return ele.childNodes;
      },
      // 获取子级元素
      children:function(ele){
        return ele.children;
      },
      // 获取子级第一个节点
      firstNode:function(ele){
        return ele.firstChild == ele.childNodes[0] ? ele.firstChild : ele.childNodes[0];
      },
      // 获取子级第一个元素
      firstElement:function(ele){
        return ele.firstElementChild ? ele.firstElementChild : ele.firstChild;
      },
      // 获取子级最后一个节点
      lastNode:function(ele){
        return ele.lastChild == ele.childNodes[ele.childNodes.length-1] ? ele.lastChild : ele.childNodes[ele.childNodes.length-1];
      },
      // 获取子级最后一个元素
      lastElement:function(ele){
        return ele.lastElementChild ? ele.lastElementChild : ele.lastChild;
      },
      // 获取下一个兄弟节点
      nSiblingNode:function(ele){
        return ele.nextSibling;
      },
      // 获取下一个兄弟元素
      nSiblingEle:function(ele){
        return ele.nextElementSibling;
      },
      // 获取上一个兄弟节点
      pSiblingNode:function(ele){
        return ele.previousSibling;
      },
      // 获取上一个兄弟元素
      pSiblingEle:function(ele){
        return ele.previousElementSibling;
      }
  }

    
  w.getBy = getBy;
  w.eleHandles = eleHandles;
  w.getNode = getNode;
})(window)