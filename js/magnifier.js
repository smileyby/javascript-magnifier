let magnifierRender = (function () {
    let computedMark;
    let smallBox = document.getElementById('smallBox'),
        bigBox = document.getElementById('bigBox'),
        mark = document.getElementById('mark'),
        bigImg = bigBox.getElementsByTagName('img')[0];

    //=> 当前元素如果是隐藏的，无法通过盒子模型获取它的宽度
    let markW = mark.offsetWidth,
        markH = mark.offsetHeight,
        smallW = smallBox.offsetWidth,
        smallH = smallBox.offsetHeight;

    let maxL = smallW - markW,
        maxT = smallH - markH;

    //=> 计算mark位置
    computedMark = function (e) {
        e = e || window.event;
        let curL = e.clientX - smallBox.offsetLeft - markW / 2,
            curT = e.clientY - smallBox.offsetTop - markH / 2;

        //=> 边界判断
        curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
        curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);

        //=> 设置mark样式
        mark.style.left = curL + 'px';
        mark.style.top = curT + 'px';

        //=> 计算大图位置，mark向右移动，bigimg向左移动（移动方向是相反的）
        bigImg.style.left = -curL * 3 + 'px';
        bigImg.style.top = -curT * 3 + 'px';
    };

    //=> 给smallbox的相关事件绑定方法
    let bindEvent = function () {
        smallBox.onmouseenter = function (e) {
            mark.style.display = 'block';
            bigBox.style.display = 'block';
            computedMark(e);
        };

        smallBox.onmousemove = function (e) {
            computedMark(e);
        };

        smallBox.onmouseleave = function (e) {
            mark.style.display = 'none';
            bigBox.style.display = 'none';
        }
    };

    return {
        init: function () {
            //=> 不在css中隐藏：防止开始mark是隐藏的我们无法获取mark的宽高（开始是显示的，当我们获取到宽高后再把它隐藏）
            mark.style.display = 'none';
            bindEvent();
        }
    }
})();
magnifierRender.init();