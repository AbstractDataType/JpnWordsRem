function showCardSetting() {
    let card_root = $("<div>", {
        class: "card card-indigo card-outline",
        id: "card-setting"
    });
    let card_body = $("<div>", {
        class: "card-body"
    });
    let card_title = $("<h4>", {
        class: "card-title",
        style: "font-size: 1.25rem;margin-bottom: 1rem"
    }).html("设置");
    let dark_mode = $("<div>", {
        class: "form-group",
        id: "dark-mode-setting"
    }).append(
        $("<p class='card-text' style='font-size: 1rem;margin-bottom: 0.5rem'>调整浅色/深色模式</p>"),
        $("<div>", {
            class: "custom-control custom-checkbox",
            style: "margin-bottom:0.25rem"
        }).append(
            $("<input>", {
                class: "custom-control-input",
                type: "checkbox",
                id: "follow-system",
                name: "customRadio",
            }),
            $("<label>", {
                for: "follow-system",
                class: "custom-control-label",
                style: "font-weight:normal;",
            }).html("跟随系统变化")
        )
    )

    dark_mode.find("#follow-system").prop("checked", setting.dark_mode_follow_system)

    card_body.append(card_title, dark_mode);
    card_root.append(card_body)
    $(".card.card-primary.card-outline").after(card_root);
    $("#follow-system").on("click", followSystemTrigger);
    followSystemTrigger();
}

function followSystemTrigger() {
    switch ($("#follow-system")[0].checked) {
        case true:
            setting.dark_mode_follow_system = true;
            $(".toggle").remove();
            //setPageSettings();
            break;
        case false:
            setting.dark_mode_follow_system = false;
            setting.dark_mode = false;
            $("#dark-mode-setting").append(
                $("<label>", {class: "toggle", style: "margin-left:1rem"})
                    .append(
                        $("<input>", {type: "checkbox", hidden: "hidden"}),
                        $("<div id=\"dark-mode-switch\"  data-off=\"深色模式\" data-on=\"浅色模式\"></div>\n")
                    )
            )
            $("dark-mode-switch").prop("checked",setting.dark_mode);
            $("#card-setting").on("click", "#dark-mode-switch", function () {
                setInterval(darkModeSwitchTrigger, 100);
            });
            darkModeSwitchTrigger();
            break;
    }
}

function darkModeSwitchTrigger() {
    if ($("#dark-mode-switch").prev()[0] != undefined) {
        switch ($("#dark-mode-switch").prev()[0].checked) {
            case true:
                setting.dark_mode = false;
                break;
            case false:
                setting.dark_mode = true;
                break;
        }
        //setPageSettings();
    }
}





