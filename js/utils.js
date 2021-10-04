//生成0-n的列表
var f = length => Array.from({length}).map((v, k) => k);

//给列表排序
function shuffle(arr) {
    var len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        var index = parseInt(Math.random() * (len - i));
        var temp = arr[index];
        arr[index] = arr[len - i - 1];
        arr[len - i - 1] = temp;
    }
    return arr;
}

//生成[min,max]随机数
function getRndInteger(min, max) {
    //含min不含max
    return Math.floor(Math.random() * (max - min)) + min;
}

function createWordText(word) {
    let current_word_text = word.kana;
    if (word.kanji != "") {
        current_word_text += ("(" + word.kanji + ")");
    }
    if (word.character != "") {
        current_word_text += ("    [" + word.character + "]" + word.meaning);
    } else {
        current_word_text += ("    " + word.meaning);
    }
    return current_word_text;
}

//使列表元素唯一
function unify(raw_list) {
    return (
        [].filter.call(raw_list, function (s, i, o) {
            return o.indexOf(s) == i;
        })
    );
}