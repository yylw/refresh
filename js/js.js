(function () {
    var myScroll;
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);


    window.addEventListener('DOMContentLoaded', getScroll, false);

    function pullDate(direction) {
        setTimeout(function () {
            $.getJSON('data.json', function (e) {
                console.log(e.data);
                if (e.state == 1) {
                    direction == "down" ? $("#news-lists").prepend(e.data) : $("#news-lists").append(e.data);
                    myScroll.refresh();
                }
            })
        }, 2000)
    }

    function getScroll() {
        var pullDown = document.getElementById('pullDown');
        var topHeight = pullDown.offsetHeight;
        console.log(topHeight);
        var pullUp = document.getElementById('pullUp');
        var bottomHeight = pullUp.offsetHeight;
        myScroll = new iScroll("main", {
            vScrollbar: false,
            topOffset: topHeight,
            onRefresh: function () {
                if (pullDown.className.match("loading")) {
                    pullDown.className = "";
                    pullDown.querySelector('.pullDownLabel').innerHTML = "下拉刷新...";
                }
            },
            onScrollMove: function () {
                //console.log(this.y);
                if (this.y > 5 && !pullDown.className.match('flip')) {
                    pullDown.className = "flip";
                    pullDown.querySelector('.pullDownLabel').innerHTML = "松手开始刷新...";
                    this.minScrollY = 0;
                } else if (this.y < (this.maxScrollY-5) && !pullUp.className.match("flip")) {
                    pullUp.className = "flip";
                    pullUp.querySelector('.pullUpLabel').innerHTML = "松手开始刷新...";
                }
            },
            onScrollEnd: function () {
                if (pullDown.className.match("flip")) {
                    pullDown.className = "loading";
                    pullDown.querySelector('.pullDownLabel').innerHTML = "加载中...";
                    pullDate('down');
                }else if(pullUp.className.match("flip")){
                	pullUp.className = "loading";
                    pullUp.querySelector('.pullUpLabel').innerHTML = "加载中...";
                    pullDate('up');
                }
            }

        })
    }


})()