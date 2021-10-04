var words_avail_index_list = []; //可以出题的单词序号列表。为了防止重题，会一轮一轮地出题
//本函数用来生成题目
function createTitle(words) {

    const total_words_num = words.words.length; //总单词数量
    var title_head = ""; //题目头
    var title_options = []; //选项(选择题是四个选项)
    var title_answer = []; //答案
    if (words_avail_index_list.length == 0) {
        words_avail_index_list = shuffle($.extend([], words_totitle_index_list));
    }
    // console.log("words_avail_index_list: "+words_avail_index_list)
    var selected_word_id = parseInt(words_avail_index_list.pop());
    // console.log("selected_word_id : "+selected_word_id )
    while (true) {
        // 出题方式
        // 1 给定假名选择意思
        // 2 给定假名写汉字
        // 3 给定汉字选择假名
        // 4 给定汉字写假名
        // 5 给定汉字选择意思
        // 6 给定意思选择假名
        // 7 给定意思写假名
        // 8 给定意思选择汉字
        var title_type = getRndInteger(1, 9);
        var select_word = words.words[selected_word_id]
        var words_id_list = f(total_words_num);//生成从0到total_words_num的列表
        var options_id_list = [] //保存4个选项对应的单词序号

        var i = 0;
        switch (title_type) {
            case 1: //给定假名选择意思
                title_head = select_word.kana;

                // 生成四个选项分别对应第几个单词(里面有一个是正确答案对应的单词序号)
                options_id_list.push(words_id_list.splice(selected_word_id, 1));//先存上正确的单词序号
                words_id_list = shuffle(words_id_list);//剩下的洗牌
                while (options_id_list.length < 4) { //生成三个错误单词对应的单词序号
                    let temp_title = words.words[words_id_list[0]];//相当于随机选一个
                    if (
                        !(temp_title.meaning == select_word.meaning && temp_title.character == select_word.character)
                        &&
                        temp_title.kana != select_word.kana
                    ) {
                        //如果选的这个单词的意思不是跟正确答案重复的话就存上，保证不会有多选
                        options_id_list.push(words_id_list.splice(0, 1))
                    }
                }
                options_id_list = shuffle(options_id_list);//四个选项洗牌

                switch (selected_word_id) {
                    case options_id_list[0][0]:
                        title_answer.push("A");
                        break;
                    case options_id_list[1][0]:
                        title_answer.push("B");
                        break;
                    case options_id_list[2][0]:
                        title_answer.push("C");
                        break;
                    case options_id_list[3][0]:
                        title_answer.push("D");
                        break;
                }

                //根据option_id_list 的值生成选项
                for (let i = 0; i < 4; i++) {
                    let temp_option = words.words[options_id_list[i]];
                    //没有的就不用写[]了
                    title_options.push(["A", "B", "C", "D"][i] + ". "
                        + (temp_option.character != "" ? ("[" + temp_option.character + "] ") : "")
                        + temp_option.meaning)
                }
                break;

            case 2: // 给定假名写汉字
                if (select_word.kanji == "") {
                    continue;
                }
                title_head = select_word.kana + "\n" +
                    (select_word.character != "" ? ("[" + select_word.character + "] ") : "")
                    + select_word.meaning;
                //挑出汉字占位符
                let placeholder_i = 1;
                i = 0;
                while (i < select_word.kanji.length) {
                    if (/[ぁ-んァ-ヶ a-z A-Z 0-9 ０-ﾟ]/.test(select_word.kanji[i]) == true) {
                        let j = i;
                        while (j < select_word.kanji.length) {
                            if (/[ぁ-んァ-ヶ a-z A-Z 0-9 ０-ﾟ]/.test(select_word.kanji[j]) == true) {
                                j += 1;
                            } else {
                                break;
                            }
                        }
                        title_options.push(select_word.kanji.slice(i, j));
                        i = j;
                    } else {
                        let j = i;
                        while (j < select_word.kanji.length) {
                            if (/[ぁ-んァ-ヶ a-z A-Z 0-9 ０-ﾟ]/.test(select_word.kanji[j]) == false) {
                                title_options.push("(" + placeholder_i + ")");
                                placeholder_i += 1;
                                title_answer.push(select_word.kanji[j]);
                                j += 1;
                            } else {
                                break;
                            }
                        }
                        i = j;
                    }
                }
                //title_options = title_options.join(" ")

                break;

            case 3: // 给定汉字选择假名
                if (select_word.kanji == "") {
                    continue;
                }
                title_head = select_word.kanji + "\n "
                    + (select_word.character != "" ? ("[" + select_word.character + "] ") : "")
                    + select_word.meaning;
                // 生成四个选项分别对应第几个单词(里面有一个是正确答案对应的单词序号)
                options_id_list.push(words_id_list.splice(selected_word_id, 1));//先存上正确的单词序号
                words_id_list = shuffle(words_id_list);//剩下的洗牌
                while (options_id_list.length < 4) { //生成三个错误单词对应的单词序号
                    let temp_title = words.words[words_id_list[0]];//相当于随机选一个
                    if (
                        !(temp_title.meaning == select_word.meaning && temp_title.character == select_word.character)
                        &&
                        temp_title.kana != select_word.kana
                    ) {
                        //如果选的这个单词的意思不是跟正确答案重复的话就存上，保证不会有多选
                        options_id_list.push(words_id_list.splice(0, 1))
                    }
                }
                options_id_list = shuffle(options_id_list);//四个选项洗牌

                switch (selected_word_id) {
                    case options_id_list[0][0]:
                        title_answer.push("A");
                        break;
                    case options_id_list[1][0]:
                        title_answer.push("B");
                        break;
                    case options_id_list[2][0]:
                        title_answer.push("C");
                        break;
                    case options_id_list[3][0]:
                        title_answer.push("D");
                        break;
                }

                //根据option_id_list 的值生成选项
                for (let i = 0; i < 4; i++) {
                    let temp_option = words.words[options_id_list[i]];
                    title_options.push(["A", "B", "C", "D"][i] + ". " + temp_option.kana)
                }
                break;

            case 4 :// 给定汉字写假名
                if (select_word.kanji == "") {
                    continue;
                }
                title_head = select_word.kanji + "\n "
                    + (select_word.character != "" ? ("[" + select_word.character + "] ") : "")
                    + select_word.meaning;
                i = 0;
                while (i < select_word.kanji.length) {
                    if (/[ぁ-んァ-ヶ]/.test(select_word.kanji[i]) == true) {
                        let j = i;
                        while (j < select_word.kanji.length) {
                            if (/[ぁ-んァ-ヶ]/.test(select_word.kanji[j]) == true) {
                                j += 1;
                            } else {
                                break;
                            }
                        }
                        title_options.push(select_word.kanji.slice(i, j));
                        i = j;
                    } else {
                        let j = i;
                        while (j < select_word.kanji.length) {
                            if (/[ぁ-んァ-ヶ]/.test(select_word.kanji[j]) == false) {
                                j += 1;
                            } else {
                                break;
                            }
                        }
                        title_options.push("0");
                        i = j;
                    }
                }
                title_answer.push(select_word.kana
                    .replace(unescape("%u30D8"), unescape("%u3078"))
                    .replace(unescape("%u30D9"), unescape("%u3079"))
                    .replace(unescape("%u30DA"), unescape("%u307A")));
                for (let i = 0; i < words.words.length; i++) {
                    if (i != selected_word_id && words.words[i].kanji == select_word.kanji) {
                        title_answer.push(words.words[i].kana
                            .replace(unescape("%u30D8"), unescape("%u3078"))
                            .replace(unescape("%u30D9"), unescape("%u3079"))
                            .replace(unescape("%u30DA"), unescape("%u307A")));
                    }
                }
                break;

            case 5 :// 给定汉字选择意思
                if (select_word.kanji == "") {
                    continue;
                }

                title_head = select_word.kanji;
                // 生成四个选项分别对应第几个单词(里面有一个是正确答案对应的单词序号)
                options_id_list.push(words_id_list.splice(selected_word_id, 1));//先存上正确的单词序号
                words_id_list = shuffle(words_id_list);//剩下的洗牌
                while (options_id_list.length < 4) { //生成三个错误单词对应的单词序号
                    let temp_title = words.words[words_id_list[0]];//相当于随机选一个
                    if (
                        !(temp_title.meaning == select_word.meaning && temp_title.character == select_word.character)
                        &&
                        temp_title.kanji != select_word.kanji
                    ) {
                        //如果选的这个单词的意思不是跟正确答案重复的话就存上，保证不会有多选
                        options_id_list.push(words_id_list.splice(0, 1))
                    }
                }
                options_id_list = shuffle(options_id_list);//四个选项洗牌

                switch (selected_word_id) {
                    case options_id_list[0][0]:
                        title_answer.push("A");
                        break;
                    case options_id_list[1][0]:
                        title_answer.push("B");
                        break;
                    case options_id_list[2][0]:
                        title_answer.push("C");
                        break;
                    case options_id_list[3][0]:
                        title_answer.push("D");
                        break;
                }

                //根据option_id_list 的值生成选项
                for (let i = 0; i < 4; i++) {
                    let temp_option = words.words[options_id_list[i]];
                    title_options.push(["A", "B", "C", "D"][i] + ". "
                        + (temp_option.character != "" ? ("[" + temp_option.character + "] ") : "")
                        + temp_option.meaning)

                }
                break;

            case 6 :// 给定意思选择假名
                title_head = (select_word.character != "" ? ("[" + select_word.character + "] ") : "")
                    + select_word.meaning;

                // 生成四个选项分别对应第几个单词(里面有一个是正确答案对应的单词序号)
                options_id_list.push(words_id_list.splice(selected_word_id, 1));//先存上正确的单词序号
                words_id_list = shuffle(words_id_list);//剩下的洗牌
                while (options_id_list.length < 4) { //生成三个错误单词对应的单词序号
                    let temp_title = words.words[words_id_list[0]];//相当于随机选一个
                    if (
                        !(temp_title.meaning == select_word.meaning && temp_title.character == select_word.character)
                        &&
                        temp_title.kana != select_word.kana
                    ) {
                        //如果选的这个单词的意思不是跟正确答案重复的话就存上，保证不会有多选
                        options_id_list.push(words_id_list.splice(0, 1))
                    }
                }
                options_id_list = shuffle(options_id_list);//四个选项洗牌

                switch (selected_word_id) {
                    case options_id_list[0][0]:
                        title_answer.push("A");
                        break;
                    case options_id_list[1][0]:
                        title_answer.push("B");
                        break;
                    case options_id_list[2][0]:
                        title_answer.push("C");
                        break;
                    case options_id_list[3][0]:
                        title_answer.push("D");
                        break;
                }

                //根据option_id_list 的值生成选项

                for (let i = 0; i < 4; i++) {
                    let temp_option = words.words[options_id_list[i]];
                    title_options.push(["A", "B", "C", "D"][i] + ". " + temp_option.kana)
                }
                break;

            case 7 :// 给定意思写假名
                title_head = (select_word.character != "" ? ("[" + select_word.character + "] ") : "")
                    + select_word.meaning;
                //option构造一个01列表，0代表要填的，1代表给出的
                let title_options_flag = [];
                for (let i = 0; i < select_word.kana.length; i++) {
                    if (i <= select_word.kana.length * 0.3 || i == 0) {
                        title_options_flag.push(1);
                    } else {
                        title_options_flag.push(0);
                    }
                }
                if (title_options_flag == 1) {
                    title_options_flag[0] = 0;
                }
                title_options_flag = shuffle(title_options_flag);

                i = 0;
                while (i < title_options_flag.length) {
                    if (title_options_flag[i] == 1) {
                        let j = i;
                        while (j < title_options_flag.length) {
                            if (title_options_flag[j] == 1) {
                                j += 1;
                            } else {
                                break;
                            }
                        }
                        title_options.push(select_word.kana.slice(i, j));
                        i = j;
                    } else {
                        let j = i;
                        while (j < title_options_flag.length) {
                            if (title_options_flag[j] == 0) {
                                j += 1;
                                title_options.push("0");
                            } else {
                                break;
                            }
                        }
                        i = j;
                    }
                }

                title_answer.push(select_word.kana
                    .replace(unescape("%u30D8"), unescape("%u3078"))
                    .replace(unescape("%u30D9"), unescape("%u3079"))
                    .replace(unescape("%u30DA"), unescape("%u307A")));
                for (let i = 0; i < total_words_num; i++) {
                    if (i != selected_word_id && words.words[i].meaning == select_word.meaning) {
                        title_answer.push(words.words[i].kana
                            .replace(unescape("%u30D8"), unescape("%u3078"))
                            .replace(unescape("%u30D9"), unescape("%u3079"))
                            .replace(unescape("%u30DA"), unescape("%u307A")));
                    }
                }
                break;

            case 8:// 给定意思选择汉字
                if (select_word.kanji == "") {
                    continue;
                }
                title_head = (select_word.character != "" ? ("[" + select_word.character + "] ") : "")
                    + select_word.meaning;

                // 生成四个选项分别对应第几个单词(里面有一个是正确答案对应的单词序号)
                options_id_list.push(words_id_list.splice(selected_word_id, 1));//先存上正确的单词序号
                words_id_list = shuffle(words_id_list);//剩下的洗牌
                while (options_id_list.length < 4) { //生成三个错误单词对应的单词序号
                    let temp_title = words.words[words_id_list[0]];//相当于随机选一个
                    if (temp_title.kanji == "") {
                        words_id_list.splice(0, 1);//把没有汉字单词的删掉
                        continue;
                    }
                    if (
                        !(temp_title.meaning == select_word.meaning && temp_title.character == select_word.character)
                        &&
                        temp_title.kanji != select_word.kanji
                    ) {
                        //如果选的这个单词的意思不是跟正确答案重复的话就存上，保证不会有多选
                        options_id_list.push(words_id_list.splice(0, 1))
                    }
                }
                options_id_list = shuffle(options_id_list);//四个选项洗牌

                switch (selected_word_id) {
                    case options_id_list[0][0]:
                        title_answer.push("A");
                        break;
                    case options_id_list[1][0]:
                        title_answer.push("B");
                        break;
                    case options_id_list[2][0]:
                        title_answer.push("C");
                        break;
                    case options_id_list[3][0]:
                        title_answer.push("D");
                        break;
                }

                //根据option_id_list 的值生成选项
                for (let i = 0; i < 4; i++) {
                    let temp_option = words.words[options_id_list[i]];
                    title_options.push(["A", "B", "C", "D"][i] + ". "
                        + temp_option.kanji)
                }
                break;
        }

        let title = {};
        title["type"] = title_type;
        title["title_head"] = title_head;
        title["title_options"] = title_options;
        title["title_answer"] = title_answer;
        title["word"] = select_word;
        return title;
    }
}

//创建题目card
function createCardTitle(title) {
    let title_type = title.type;
    let title_head = title.title_head; //题目头
    let title_options = title.title_options; //选项(选择题是四个选项)
    let title_answer = title.title_answer; //答案

    let root_dom = $("div.content>div.container");
    let card_root = $("<div>", {
        class: "card card-info card-outline",
        id: "card-title"
    });
    let card_body = $("<div>", {
        class: "card-body"
    });
    let card_title_type = $("<h4>", {
        id: "title-option",
        class: "card-title",
        style: "font-size: 1.25rem;margin-bottom: 1rem"
    })
    let card_title_head = $("<p>", {
        id: "title-head",
        class: "card-text",
        style: "font-size: 1.2rem;margin-bottom: 0.25rem"
    })
    let card_title_head_extra = $("<p>", {
        id: "title-head_extra",
        class: "card-text",
        style: "font-size: 1rem;margin-bottom: 0.5rem"
    })
    let card_title_options;
    let card_script = [];
    let card_prev = $("<a>", {
        href: "#",
        class: "card-link",
        id: "title-prev",
        style: "margin-right:20px"
    }).html("上一题")
    let card_next = $("<a>", {
        href: "#",
        hidden: "hidden",
        class: "card-link",
        id: "title-next"
    }).html("下一题")

    switch (title_type) {
        case 1:
            card_title_type.html("请根据假名选择正确的意思");
            card_title_head.html(title_head);
            break;
        case 2:
            card_title_type.html("请框中写出正确的汉字");
            card_title_head.html(title_head.split("\n")[0]);
            let kanji_html = "";
            for (let i = 0; i < title_options.length; i++) {
                if (/^\([0-9]+\)$/.test(title_options[i])) {
                    kanji_html += "&nbsp;<span style='text-decoration: underline;text-underline-position: under;'>"
                        + title_options[i] +
                        "</span>&nbsp;";
                } else {
                    kanji_html += title_options[i];
                }
            }
            card_title_head_extra.html(
                "汉字:&nbsp;&nbsp;" + kanji_html + "<br/>" +
                title_head.split("\n")[1] + "<br/>" +
                "<span style='color:#c43939;'>注：此题只能手动检查是否正确</span>");
            break;
        case 3:
            card_title_type.html("请根据汉字选择正确的假名");
            card_title_head.html(title_head.split("\n")[0]);
            card_title_head_extra.html(title_head.split("\n")[1]);
            break;
        case 4:
            card_title_type.html("请根据汉字填写假名");
            card_title_head.html(title_head.split("\n")[0]);
            card_title_head_extra.html(title_head.split("\n")[1]);
            break;
        case 5:
            card_title_type.html("请选择单词正确的意思");
            card_title_head.html(title_head);
            break;
        case 6:
            card_title_type.html("请根据意思选择正确的假名");
            card_title_head.html(title_head);
            break;
        case 7:
            card_title_type.html("请根据意思填写正确的假名");
            card_title_head.html(title_head);
            break;
        case 8:
            card_title_type.html("请根据单词意思选择正确选项");
            card_title_head.html(title_head);
            break;

    }
    switch (title_type) {
        case 1:
        case 3:
        case 5:
        case 6:
        case 8:
            card_title_options = $("<div class=\"form-group\">");
            for (let i = 0; i < 4; i++) {
                card_title_options.append(
                    $("<div>", {
                        class: "custom-control custom-radio custom-radio-scale",
                        id: "option-" + ["A", "B", "C", "D"][i]
                    }).append(
                        $("<input>", {
                            class: "custom-control-input",
                            type: "radio",
                            id: i,
                            name: "customRadio",
                            check: ""
                        }),
                        $("<label>", {
                            for: i,
                            class: "custom-control-label",
                            style: "font-weight:normal;",
                        }).html(title_options[i])
                    )
                )
            }
            card_title_options.append($(
                "<div class=\"canvas-row-check\">\n" +
                "    <div style=\"margin: auto;\">\n" +
                "        <button id='check-answer' class=\"btn btn-info btn-xs\" value=\"\">检查答案</button>\n" +
                "        <p id=\"result-placeholder\" style='display: inline' hidden='hidden'> </p>\n" +
                "        <p id=\"answer\" style='display: inline' hidden='hidden'>" + title_answer + "</p>\n" +
                "    </div>\n" +
                "</div>"))

            card_script = $("<script>", {
                "src": "js/choice-title.js"
            });

            break;
        case 2:
            card_title_options = $("<div>");
            let title_answer_index = 0;
            for (let i = 0; i < title_options.length; i++) {
                let canvas_row = $("<div class=\"canvas-row\">");
                if (/^\([0-9]+\)$/.test(title_options[i])) {
                    let canvas_col_left = $("<div>", {
                        class: "canvas-col-left"
                    }).append(
                        $("<p>").html(title_options[i] + ":"),
                        $("<div>", {
                            class: "canvas-col-left-bottom"
                        }).append(
                            $("<button>", {
                                class: "btn btn-warning btn-canvas-clear",
                                value: "清空",
                            }).html("清空")
                        )
                    )
                    let canvas_col_mid = $("<div>", {
                        class: "canvas-col-middle"
                    }).append("<canvas class=\"canvas\"> </canvas>");
                    let canvas_col_right = $("<div>", {
                        class: "canvas-col-right",
                        hidden: "hidden"
                    }).append("<p>答案：</p>", "<p class=\"canvas-answer\">" + title_answer[title_answer_index] + "</p>");
                    title_answer_index += 1;

                    canvas_row.append(canvas_col_left, canvas_col_mid, canvas_col_right);
                    card_title_options.append(canvas_row);
                }
            }
            card_title_options.append($(
                "<div class=\"canvas-row-check\">\n" +
                "    <div style=\"margin: auto;\">\n" +
                "        <button id='check-answer' class=\"btn btn-info btn-xs\" value=\"检查答案\">检查答案</button>\n" +
                "        <button id='check-answer-correct' class=\"btn btn-success btn-xs\" style='margin-right: 15px' value=\"正确\" hidden=\"hidden\">正确</button>\n" +
                "        <button id='check-answer-wrong'  class=\"btn btn-danger btn-xs\" value=\"错误\" hidden=\"hidden\">错误</button>\n" +
                "        <p id=\"result-placeholder\" style='display: inline' hidden='hidden'> </p>\n" +
                "    </div>\n" +
                "</div>"));
            card_script = $("<script>", {
                "src": "js/canvas-title.js"
            });
            break;
        case 4:
        case 7:
            card_title_options = $("<div>");
            let card_input = $("<div class=\"form-group\" style=\"font-size:1rem\" id=\"answer-input\">");
            let kana_candidate = title_answer.join("");
            for (i = 0; i < title_options.length; i++) {
                if (title_options[i] != "0") {
                    let to_fill = title_options[i];
                    card_input.append($("<p style=\"display:inline; \">" + to_fill + "</p>"));
                    kana_candidate = kana_candidate.replace(
                        to_fill.replace("ヘ", "へ").replace("ベ", "べ").replace("ペ", "ぺ"),
                        "");//为后面生成假名按钮做准备
                } else {
                    card_input.append($("<input>", {
                        type: "text",
                        class: "form-control form-control-border input-multi-characters",
                        value: "",
                        readonly: "readonly"
                    }));
                }
            }

            kana_candidate = kana_candidate.replace("ヘ", "へ").replace("ベ", "べ").replace("ペ", "ぺ");
            kana_candidate = unify(kana_candidate)
            let kana_all = "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねの" +
                "はばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわをんァアィイゥウェエォオカガキギク" +
                "グケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプホボポマミムメモャヤ" +
                "ュユョヨラリルレロヮワヲンヴヵヶー";
            kana_all = kana_all.split("");
            kana_all = shuffle(kana_all);
            while (kana_candidate.length <= 17) {
                for (let i = 0; i < kana_all.length; i++) {
                    if (kana_candidate.indexOf(kana_all[i]) == -1) {
                        kana_candidate.push(kana_all[i]);
                        break;
                    }
                }
            }
            kana_candidate = shuffle(kana_candidate);

            let card_input_buttons = ($("<div class=\"form-group\" style=\"width: 20rem\"></div>"));
            for (let i = 0; i < 3; i++) {
                let card_input_buttons_row = $("<div class=\"row\" style=\"margin-bottom: 1rem;margin-left: 0\"></div>");
                for (let j = 0; j < 6; j++) {
                    card_input_buttons_row.append(
                        $("<div class=\"col-kana\"></div>").append(
                            $("<button>", {
                                class: "btn btn-primary btn-kana",
                                value: kana_candidate[i * 6 + j],
                            }).html(kana_candidate[i * 6 + j])
                        )
                    )
                }
                card_input_buttons.append(card_input_buttons_row);
            }

            card_input_buttons.append($("<div class=\"row\" style=\"margin-bottom: 1rem;margin-left: 0\">\n" +
                "                                <div class=\"col-del\">\n" +
                "                                    <button class=\"btn btn-warning btn-xs\" value=\"删除\">删除</button>\n" +
                "                                </div>\n" +
                "                            </div>"))
            card_title_options.append(card_input, card_input_buttons);

            card_title_options.append($(
                "<div class=\"canvas-row-check\">\n" +
                "    <div style=\"margin: auto;\">\n" +
                "        <button id='check-answer' class=\"btn btn-info btn-xs\" value=\"\">检查答案</button>\n" +
                "        <p id=\"result-placeholder\" style='display: inline' hidden='hidden'> </p>\n" +
                "        <p id=\"answer\" style='display: inline' hidden='hidden'>" + title_answer.join(",") + "</p>\n" +
                "    </div>\n" +
                "</div>"))

            switch (title_type) {
                case 4:
                    card_script.push($("<script>", {"src": "js/fill-blank-kanji.js"}));
                    break;
                case 7:
                    card_script.push($("<script>", {"src": "js/fill-blank-kana.js"}));
                    break;
            }
            card_script.push($("<script>", {"src": "js/fill-blank-answer.js"}))

    }
    card_body.append(card_title_type,
        card_title_head,
        card_title_head_extra.html() != "" ? card_title_head_extra : "",
        card_title_options,
        card_prev,
        card_next,
        card_script
    )
    card_root.append(card_body);
    root_dom.append(card_root);
}

//创建总览card
function createCardOverview() {
    let card_root = $(".card.card-primary.card-outline .card-body");
    let card_head = $("<h4>", {
        id: "title-option",
        class: "card-title",
        style: "font-size: 1.25rem;margin-bottom: 1rem"
    }).html("总览");
    let card_status_total = $("<p>", {
        id: "status-total",
        class: "card-text",
        style: "margin-bottom: 0.25rem"
    })
    let card_status_error_num = $("<p>", {
        id: "status-error-num",
        class: "card-text"
    })
    let card_show_wrong_words = $("<p>").append($("<a>", {
        id: "show-wrong-words",
        class: "card-link"
    }).text("显示错题对应单词"));
    let card_link = $(
        "<a href=\"#\" id=\"back\" class=\"card-link\" style='margin-right: 20px'>回到起始页(会清除进度)</a>\n" +
        "<a href=\"#\" id=\"setting\" class=\"card-link\">设置</a>");

    card_root.append(card_head, card_status_total, card_status_error_num, card_show_wrong_words, card_link);


    $("#show-wrong-words").on("click", function () {
        switch ($(this).text()) {
            case "显示错题对应单词":
                let show_wrong_words = $(this);
                show_wrong_words.after(createWrongWords());
                $(this).text("隐藏错题对应单词");
                break;
            case "隐藏错题对应单词":
                $(".card-text-wrong-word-list").remove();
                $(this).text("显示错题对应单词");
                break;
        }
    })

    $("#back").on("click", function () {
        $(".card.card-primary.card-outline .card-body").children().remove();
        $("#card-setting").remove();
        $(".card.card-info.card-outline").remove();
        words = {};
        titles = [];
        title_index = -1;
        words_totitle_index_list = [];
        words_avail_index_list = [];
        showSelPage();
    })
}

$(document).on("click", "#title-next", function () {
    let current_title;
    $("div.container>div.card.card-info.card-outline").remove();
    if (title_index >= titles.length - 1) { //如果当前是最后一个题
        current_title = createTitle(words);
        createCardTitle(current_title, words_totitle_index_list);
        title_index++;
        titles.push({"title": current_title});
    } else {
        title_index++;
        current_title = titles[title_index]["title"];
        createCardTitle(current_title, words_totitle_index_list);
        if (title_index < titles.length - 1) {
            $("#title-next").removeAttr("hidden");
        }
    }
    refreshCardOverview();
    $("html,body").animate({
        scrollTop: $(".card.card-info.card-outline").offset().top
    }, {duration: 300, easing: "swing"});
});

$(document).on("click", "#title-prev", function () {
    let current_title;
    if (title_index > 0) { //如果不是第一题
        $("div.container>div.card.card-info.card-outline").remove();
        title_index--;
        current_title = titles[title_index]["title"];
        createCardTitle(current_title);
        $("#title-next").removeAttr("hidden");
    }
    refreshCardOverview();
    $("html,body").animate({
        scrollTop: $(".card.card-info.card-outline").offset().top
    }, {duration: 100, easing: "swing"});
});

//刷新总览card
function refreshCardOverview() {
    let status_total = $("#status-total");
    status_total.text("当前是第" + (title_index + 1) + "题，已出" + titles.length + "题");

    let status_err_num = $("#status-error-num");
    let err_num = 0;//总错题数
    let err_title_index = [];
    for (let i = 0; i < titles.length; i++) {
        if (titles[i]["result"] == false) {
            err_title_index.push(i + 1);//为了输出，这里错题序号以1开始
        }
    }
    err_title_index.sort(function (a, b) {
        return a - b
    });
    err_num = err_title_index.length;
    if (err_num > 0) {
        status_err_num.text("第" + err_title_index.join("、") + "题，共" + err_num + "题回答错误");
    } else {
        status_err_num.text("目前没有题目回答错误");
    }

    if ($("#show-wrong-words").text() === "隐藏错题对应单词") {
        $(".card-text-wrong-word-list").remove();
        $("#show-wrong-words").after(createWrongWords());
    }
}


function createWrongWords() {
    let result = []
    let err_title_word_index = [];
    for (let i = 0; i < titles.length; i++) {
        if (titles[i]["result"] == false) {
            err_title_word_index.push(titles[i]["title"]["word"]["word_id"]);//为了输出，这里错题序号以1开始
        }
    }
    err_title_word_index = unify(err_title_word_index);
    err_title_word_index.sort(function (a, b) {
        return a - b
    });
    if (err_title_word_index.length > 0) {
        for (let i = 0; i < err_title_word_index.length; i++) {
            result.push($("<p>", {
                    class: "card-text card-text-wrong-word-list"
                }).text(
                (err_title_word_index[i] + 1) + ". " + createWordText(words.words[err_title_word_index[i]]))
            );
        }
    }
    return result;
}
