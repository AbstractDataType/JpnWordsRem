function showSelPage() {
    let card_root = $(".card.card-primary.card-outline .card-body");
    let card_head = $("<h4>", {
        id: "title-option",
        class: "card-title",
        style: "font-size: 1.25rem;margin-bottom: 1rem"
    }).html("选择单词");
    let card_p = $("<p>", {
        id: "title-head",
        class: "card-text",
    });
    let card_sel_word_lib = $("<div>", {class: "form-group"}).append(
        $("<label>", {for: "sel-word-lib", class: "card-text", style: "font-weight: normal"}).text("请选择词库"),
        $("<select>", {id: 'sel-word-lib', class: "custom-select"})
    );
    card_sel_word_lib.find("#sel-word-lib").append($("<option>").html("请选择词库"))
    for (let i = 0; i < word_lib.libs.length; i++) {
        let option = $("<option>", {name: word_lib.libs[i].filename}).text(word_lib.libs[i].name)
        card_sel_word_lib.find("#sel-word-lib").append(option);
    }
    let card_link = $("<a href=\"#\" id=\"setting\" class=\"card-link\">设置</a>")
    card_root.append(card_head, card_p, card_sel_word_lib, card_link);

    $("#sel-word-lib").on("change", function () {
        let selected = $(this).find("option:selected");
        $("#words_list").remove();
        if (selected.attr("name") != undefined) {
            $.ajax({
                url: selected.attr("name"),
                type: "GET",
                dataType: "json",
                async: false,
                success:
                    function (data) {
                        words = data
                    }
            });
            let card_words_list = $("<div>", {
                class: "form-group",
                id: "words_list"
            }).append(
                $("<p class='card-text' style='font-size: 1rem;margin-bottom: 0.5rem'>请选择要出题的单词</p>"),
                $("<a>", {
                    id: "sel-all-and-not-all",
                    href: "#",
                    class: "card-link",
                    style: "margin-right:10px"
                }).html("全选"),
                $("<a>", {id: "sel-revert", href: "#", class: "card-link", style: "margin-right:10px"}).html("反选"),
                $("<a>", {id: "start-test", href: "#", class: "card-link"}).text("开始测试")
            );
            for (let i = 0; i < words.words.length; i++) {
                card_words_list.append(
                    $("<div>", {
                        class: "custom-control custom-checkbox",
                        style: "margin-bottom:0.25rem"
                    }).append(
                        $("<input>", {
                            class: "custom-control-input",
                            type: "checkbox",
                            id: "select-word-" + i,
                            name: i
                        }),
                        $("<label>", {
                            for: "select-word-" + i,
                            class: "custom-control-label",
                            style: "font-weight:normal;",
                        }).html((i + 1) + ". " + createWordText(words.words[i]))
                    )
                );
            }
            $("#setting").before(card_words_list);

            $("#sel-all-and-not-all").on("click", function () {
                switch ($(this).text()) {
                    case "全选":
                        $("#words_list input:checkbox").each(function () {
                            $(this).prop("checked", true);
                        })
                        $(this).text("全不选");
                        break;
                    case "全不选":
                        $("#words_list input:checkbox").each(function () {
                            $(this).prop("checked", false);
                        })
                        $(this).text("全选");
                        break;
                }
            })
            $("#sel-revert").on("click", function () {
                $("#words_list input:checkbox").each(function () {
                    $(this).prop("checked", !($(this).prop("checked")));
                })
            })
            $("#start-test").on("click", function () {
                //获取选择的单词
                $("#words_list input:checked").each(function () {
                    words_totitle_index_list.push(parseInt($(this).attr("name")));
                });
                if (words_totitle_index_list.length > 0) {
                    // console.log(words_totitle_index_list)
                    $("#card-setting").remove();
                    $(".card-body").children().remove();
                    createCardOverview();
                    let current_title=createTitle(words);
                    createCardTitle(current_title);
                    title_index++;
                    titles.push({"title": current_title});
                    refreshCardOverview();
                    $("html,body").animate({
                        scrollTop: $(".card.card-info.card-outline").offset().top
                    },{duration:100,easing:"swing"});
                }
            })
        }
    });
}

