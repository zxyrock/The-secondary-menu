window.onload = function () {

  /*
     我们的每一个菜单都是一个 div
       当div具有collapsed这个类时，div就是折叠的状态
       当div没有这个类时，div就是展开的状态
  */

  /*
     点击菜单，切换菜单的显示状态
  */

  //获取所有的class为 menuSpan的span元素
  var menuSpan = document.querySelectorAll(".menuSpan");

  //定义一个变量，用来保存当前打开的菜单
  var openDiv = menuSpan[0].parentNode;

  //为 span绑定单击响应函数
  for (var i = 0; i < menuSpan.length; i++) {
    menuSpan[i].onclick = function () {
      //this代表当前点击的span
      //获取当前span的父元素
      var parentDiv = this.parentNode;

      //切换菜单的显示状态
      toggleMenu(parentDiv);


      //判断 openDiv 和 parentDiv是否相同
      if (openDiv != parentDiv && !hasClass(openDiv, "collapsed")) {
        //打开菜单以后，应该关闭之前打开的菜单
        //为了可以统一处理动画效果，我们希望在这将 addClass 改为 toggleClass
        // addClass(openDiv, "collapsed");
        //此处 toggleClass()不需要有移处的功能
        // toggleClass(openDiv, "collapsed");

        //切换菜单的显示状态
        toggleMenu(openDiv);
      };

      //修改 openDiv 为当前打开的菜单
      openDiv = parentDiv;

    };

  };

  /*
    封装一个函数，用于切换菜单的折叠和显示的状态
     参数：
         obj 切换的元素
  */
  function toggleMenu(obj) {
    //在切换类之前，获取元素的高度
    var begin = obj.offsetHeight;

    //切换parentDiv的显示
    toggleClass(obj, "collapsed");

    //在切换类之后，再获取元素的高度
    var end = obj.offsetHeight;
    // console.log("begin = " + begin +" , " + "end = " + end);
    //动画效果就是将高度从 begin向 end 过渡
    //将元素的高度重置为 begin
    obj.style.height = begin + "px";

    //执行动画，从 begin向 end 过渡
    move(obj, "height", end, 10, function () {
      //动画执行完毕，内联样式已经没有存在的意义了，将它删除
      obj.style.height = "";
    });
  };

};