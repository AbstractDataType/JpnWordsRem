$("#check-answer").on({
    "click": function () {
        let choice = $(".custom-radio>input:checked").attr("id");
        let answer = $("#answer").text();
        if (choice === undefined) {
            $("#result-placeholder").html("请选择答案")
                .css("color", "#c43939")
                .removeAttr("hidden");
            return -1;
        }
        if (["A", "B", "C", "D"][parseInt(choice)] == answer) {
            $("#result-placeholder").html("回答正确。")
                .css("color", "#377f3d");
            titles[title_index]["result"]=true;
        } else {
            $("#result-placeholder").html("回答错误。正确答案是" + answer + "。")
                .css("color", "#c43939");
            titles[title_index]["result"]=false;
        }
        refreshCardOverview();
        $("#result-placeholder").removeAttr("hidden");
        $("#title-next").removeAttr("hidden");
        $("html,body").animate({
            scrollTop: $("#title-next").offset().top
        },{duration:50,easing:"swing"});
        $(this).remove();
    }
})

