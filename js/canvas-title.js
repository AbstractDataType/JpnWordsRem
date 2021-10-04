var draw_now;
var draw_content_now;
var is_draw = false;

$("canvas").attr("width", "150px");
$("canvas").on({
    "mousedown": function (e) {
        draw_now = $(this);
        draw_content_now = draw_now[0].getContext("2d");
        is_draw = true;
        //draw_content_now.scale(2,1);
        draw_content_now.beginPath();
        draw_content_now.moveTo(
            e.pageX - (draw_now[0].offsetLeft + draw_now[0].offsetParent.offsetLeft),
            e.pageY - (draw_now[0].offsetTop + draw_now[0].offsetParent.offsetTop)
        );//鼠标在当前画布上X,Y坐标
    },
    "mousemove": function (e) {
        if (is_draw) {
            draw_content_now.lineWidth = 1;
            if ($("body").css("dark-mode") == undefined) {
                draw_content_now.strokeStyle = "#b2b2b2";
            } else {
                draw_content_now.strokeStyle = "#000";
            }
            draw_content_now.lineTo(
                e.pageX - (draw_now[0].offsetLeft + draw_now[0].offsetParent.offsetLeft),
                e.pageY - (draw_now[0].offsetTop + draw_now[0].offsetParent.offsetTop)
            );
            draw_content_now.stroke();
        }
    },
    "mouseup": function () {
        draw_now = null;
        draw_content_now = null;
        is_draw = false;
    },

    "touchstart": function (e) {
        draw_now = $(this);
        draw_content_now = draw_now[0].getContext("2d");
        if (e.targetTouches.length == 1) {
            e.preventDefault();// 阻止浏览器默认事件，重要
            let touch = e.touches[0];
            is_draw = true;
            draw_content_now.beginPath();
            draw_content_now.moveTo(
                touch.pageX - (draw_now[0].offsetLeft + draw_now[0].offsetParent.offsetLeft),
                touch.pageY - (draw_now[0].offsetTop + draw_now[0].offsetParent.offsetTop)
            );//手指在当前画布上X,Y坐标

        }
    },
    "touchmove": function (e) {
        if (e.targetTouches.length == 1) {
            e.preventDefault();// 阻止浏览器默认事件，重要
            let touch = e.touches[0];
            if (is_draw) {
                draw_content_now.lineWidth = 1;
                if ($("body").css("dark-mode") == undefined) {
                    draw_content_now.strokeStyle = "#b2b2b2";
                } else {
                    draw_content_now.strokeStyle = "#000";
                }
                draw_content_now.lineTo(
                    touch.pageX - (draw_now[0].offsetLeft + draw_now[0].offsetParent.offsetLeft),
                    touch.pageY - (draw_now[0].offsetTop + draw_now[0].offsetParent.offsetTop)
                );
                draw_content_now.stroke();
            }
        }
    },
    "touchend": function () {
        draw_now = null;
        draw_content_now = null;
        is_draw = false;
    }
})

$(":button").on(
    "click", function () {
        switch ($(this).attr("value")) {
            case "清空":
                let can = $(this).closest(".canvas-row").find(".canvas")[0];
                can.getContext("2d").clearRect(0, 0, can.width, can.height);
                break;
            case "检查答案":
                $(".canvas-col-right").removeAttr("hidden");
                $("#check-answer-correct").removeAttr("hidden");
                $("#check-answer-wrong").removeAttr("hidden");
                $(this).remove();
                $("html,body").animate({
                    scrollTop: $("#title-prev").offset().top
                },{duration:50,easing:"swing"});
                break;
            case "正确":
            case "错误":
                switch ($(this).attr("value")){
                    case "正确":
                        $("#result-placeholder").html("回答正确。")
                            .css("color", "#377f3d");
                        titles[title_index]["result"]=true;
                        break;
                    case  "错误":
                        $("#result-placeholder").html("回答错误。")
                            .css("color", "#c43939");
                        titles[title_index]["result"]=false;
                }
                refreshCardOverview()
                $("#check-answer-correct").remove();
                $("#check-answer-wrong").remove();
                $("#result-placeholder").removeAttr("hidden");
                $("#title-next").removeAttr("hidden");
                break;
        }
    })