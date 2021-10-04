var input_now;
$(":text").on({
    "focus": function () {
        input_now = $(this);
    }
})
$(":text")[0].focus();

$(":button").not("#check-answer").on(
    "click", function () {
        if ($(this).attr("value") == "删除") {
            input_now.attr("value", "");
            if (input_now.prevAll(":text")[0] != undefined) {
                input_now.prevAll(":text")[0].focus();
            } else {
                input_now[0].focus();
            }
        } else {

            let input_value = $(this).attr("value");
            input_now.attr("value", input_value);
            if (input_now.nextAll(":text")[0] != undefined) {
                input_now.nextAll(":text")[0].focus();
            } else {
                input_now[0].focus();
            }
        }
    });

