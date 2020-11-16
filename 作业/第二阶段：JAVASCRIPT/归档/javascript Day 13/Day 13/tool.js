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
  
  var eleHandles = {
    // 获取innerText
    getInnerText:function(ele){
      return ele.textContent ? ele.textContent : ele.innerText;
    },
    // 设置innerText
    setInnerText:function(ele,text){
      ele.textContent ? ele.textContent = text : ele.innerText = text;
    }
  }
  w.getBy = getBy;
  w.eleHandles = eleHandles;
})(window)