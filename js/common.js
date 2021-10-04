var words = {};// 总单词列表
var titles = [];// 所有的题
var title_index = -1; //当前题目序号,从0开始
var word_lib = {}; //词库列表
var words_totitle_index_list = [];//在选择单词的页面选中的单词序号列表

function Setting() {
    let dark_mode_follow_system = true;
    let dark_mode = true;
    Object.defineProperties(this, {
        "dark_mode_follow_system": {
            get: function () {
                return dark_mode_follow_system
            },
            set: function (newVal) {
                if (typeof (newVal) === 'boolean') {
                    dark_mode_follow_system = newVal;
                    setPageSettings();
                }
            }
        },
        "dark_mode": {
            get: function () {
                return this
            },
            set: function (newVal) {
                if (typeof (newVal) === 'boolean') {
                    dark_mode = newVal;
                    setPageSettings();
                }
            }
        }
    })

    function setPageSettings() {
        if (dark_mode_follow_system === true) {
            let darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
            let darkModeListener = function (e) {
                let prefersDarkMode = e.matches;
                if (prefersDarkMode) {
                    $("body").addClass("dark-mode");
                } else {
                    $("body").removeClass("dark-mode");
                }
            };
            darkModeMedia.onchange = darkModeListener;
            darkModeListener(darkModeMedia);
        } else {
            let darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeMedia.onchange = function () {
            };
            if (dark_mode === true) {
                $("body").addClass("dark-mode");
            } else {
                $("body").removeClass("dark-mode");
            }
        }
    }
}

var setting = new Setting();

$(document).on("click", "#setting", function () {
    switch ($("#setting").text()) {
        case "设置":
            showCardSetting();
            $("#setting").text("收起设置");
            $("html,body").animate({
                scrollTop: $("#setting").offset().top
            }, {duration: 300, easing: "swing"});
            break;
        case "收起设置":
            $("#card-setting").remove();
            $("#setting").text("设置");
            if ($(".card.card-info.card-outline")[0] != undefined) {
                $("html,body").animate({
                    scrollTop: $(".card.card-info.card-outline").offset().top
                }, {duration: 300, easing: "swing"});
            } else {
                $("html,body").animate({
                    scrollTop: $(".card.card-primary.card-outline").offset().top
                }, {duration: 200, easing: "swing"});
            }
            break;
    }
})

$(document).ready(
    function () {
        $.ajax({
            url: "wordlib.json",
            type: "GET",
            dataType: "json",
            async: false,
            success:
                function (data) {
                    word_lib = data;
                }
        });
        setting.dark_mode_follow_system = true;
        setting.dark_mode = true;
        showSelPage();
    }
)

