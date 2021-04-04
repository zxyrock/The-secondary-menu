
//定义一个变量，用来保存定时器的标识
/*
  目前我们的定时器的标识由全局变量 timer保存
     所有正在执行的定时器都在这个变量中保存
*/
// var timer;

//尝试创建一个可以·执行简单动画的函数
/*
  参数：
      obj      要执行动画的对象
      attr     要执行动画的样式，比如：left top width height...
      target   执行动画的目标位置
      speed    移动的速度（正数向右移动，负数向左移动）
      callback 回调函数，这个函数将会在动画执行完毕以后执行
*/
function move(obj, attr, target, speed, callback) {
  //关闭上一个定时器
  clearInterval(obj.timer);

  //获取元素目前的位置
  var current = parseInt(getStyle(obj, attr));

  //判断 speed的正负值
  //如果从 0 向 800移动，则speed为正
  //如果从 800 向 0移动，则speed为负
  if (current > target) {
    //此时速度应为负值
    speed = -speed;
  }

  //开启一个定时器，来执行动画效果
  //向执行动画的属性中添加一个 timer属性，用来保存它自己定时器的标识
  obj.timer = setInterval(function () {

    //获取 obj的原来 attr值
    var oldValue = parseInt(getStyle(obj, attr));

    //在旧值的基础上增加
    var newValue = oldValue + speed;

    //speed小于0，则向左移动，speed大于0，则向右移动
    //当向左移动时，需要判断 newValue是否小于 target
    //当向左移动时，需要判断 newValue是否大于 target
    if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
      newValue = target;
    }

    //将新值设置给 obj
    obj.style[attr] = newValue + "px";

    //当元素移动到目标位置时，使其停止运行动画
    if (newValue == target) {
      //关闭定时器
      clearInterval(obj.timer);

      //动画执行完毕，调用回调函数
      // callback();
      //有回调函数作为参数则调用，没有则不调用，写法：
      callback && callback();


    }



  }, 30);
}

/*
   定义一个函数，用于获取指定元素的样式
   参数：
           obj  要获取样式的元素
           name  要获取的样式名
*/
function getStyle(obj, name) {

  //兼容法：

  if (window.getComputedStyle) {
    //正常浏览器的方式，具有getComputedStyle()方法
    return getComputedStyle(obj, null)[name];
  } else {
    //IE8的方式，没有getComputedStyle()方法
    return obj.currentStyle[name];
  }

  //运用三目运算符的兼容方法：
  // return window.getComputedStyle?getComputedStyle(obj, null)[name]:obj.currentStyle[name];

};

//定义一个函数，用来向一个元素添加指定的 class属性值
/*
  参数：
      obj --> 要添加的 class属性的元素    
      cn  --> 要添加的 class值    
*/
function addClass(obj, cn) {

  //先检查 obj 中是否含有 cn
  if (!hasClass(obj, cn)) {
    obj.className += " " + cn;
  }

};


//定义一个函数，用来判断一个元素中是否含有指定的 class属性值
//如果有该 class，则返回 true，没有则返回 false
/*
  参数：
    obj --> 要判断的元素
    cn  --> 要判断的 class属性
*/
function hasClass(obj, cn) {

  //判断 obj中有没有 cn class
  //创建一个正则表达式
  // var reg = /\bb2\b/;//字面量写死不行，写cn也不行
  //我们需要创建一个构造函数
  var reg = new RegExp("\\b" + cn + "\\b");

  return reg.test(obj.className);

};

/*
  删除元素中的 class属性
  参数：
    obj --> 要删除 class属性的元素
    cn  --> 要删除的 class属性
*/
function removeClass(obj, cn) {
  //创建一个正则表达式
  var reg = new RegExp("\\b" + cn + "\\b");

  //删除 class
  //用 replace把要替换的class属性替换成空串
  obj.className = obj.className.replace(reg, " ");
};

/*
   toggleClass可以用来切换一个类
     如果元素中具有该类，则删除
     如果元素中没有该类，则添加
*/
function toggleClass(obj, cn) {
  //判断 obj中是否含有 cn
  if (hasClass(obj, cn)) {
    //obj 中有 cn ，则删除
    removeClass(obj, cn);
  } else {
    //obj 中没有 cn，则添加
    addClass(obj, cn);
  }
};