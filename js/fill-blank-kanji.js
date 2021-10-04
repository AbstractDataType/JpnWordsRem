var input_now;
$(":text").on({
    "focus": function () {
        input_now = $(this);
        },
    "input": function () {
        alert("a")
    }
})
$(":text")[0].focus();
if ($("#answer-input").children().length == 1) {
    $(":text").width(48);
}
$(":button").not("#check-answer").on(
    "click", function () {
        let original_value;
        switch ($(this).attr("value")) {
            case  "删除":
                original_value = input_now.attr("value");
                input_now.attr("value", original_value.slice(0, -1));
                break;
            default:
                original_value = input_now.attr("value");
                let input_value = $(this).attr("value");
                input_now.attr("value", original_value + input_value);
        }
        input_now[0].focus();
        if ($("#answer-input").children().length == 1) {
            input_now.width(
                (input_now.attr("value").length > 3 ? input_now.attr("value").length : 3) * 16);
        } else {
            input_now.width(
                (input_now.attr("value").length > 1 ? input_now.attr("value").length : 1) * 16);
        }
    }
)
