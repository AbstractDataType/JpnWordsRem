$("#check-answer").on(
    "click", function () {
        let total_blanks = 0;
        let filled_blanks = 0;
        let input_dom = $("#answer-input").children();
        let input_value = "";
        $.each(input_dom, function (i, element) {
            if (element.tagName == "p" || element.tagName == "P") {
                input_value += element.innerText;
            } else if (element.tagName == "INPUT" || element.tagName == "input") {
                input_value += element.value;
                total_blanks++;
                if (element.value != "") {
                    filled_blanks++;
                }
            }
        })
        input_value = input_value.replace(" ", "")

        if (filled_blanks !== total_blanks) {
            $("#result-placeholder").html("请填写答案")
                .css("color", "#c43939")
                .removeAttr("hidden");
            return -1;
        }

        let answer = $("#answer").text().split(",");
        if (answer.indexOf(input_value) != -1) {
            $("#result-placeholder").html("回答正确。")
                .css("color", "#377f3d");
            titles[title_index]["result"]=true;
        } else {
            $("#result-placeholder").html("回答错误。正确答案是" + answer.join("或") + "。")
                .css("color", "#c43939");
            titles[title_index]["result"]=false;
        }
        refreshCardOverview()
        $("#result-placeholder").removeAttr("hidden");
        $("#title-next").removeAttr("hidden");
        $("html,body").animate({
            scrollTop: $("#title-next").offset().top
        },{duration:50,easing:"swing"});
        $(this).remove();
    }
)