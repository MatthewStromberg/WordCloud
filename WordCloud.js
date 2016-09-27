var stopWordsList = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];

var dictionary = {},
    topWords = [],
    newStopList = [];

//alpha alpha alpha bravo charlie delta alpha bravo foxtrot golf

var myWordCloud = function () {
    dictionary = {}, topWords = [], newStopList = [];
    var depth = $("#depth").val();
    isNaN(depth) ? $("#depth").addClass("error-input") : $("#depth").removeClass("error-input");
    output = "#output";
    newStopList = stopWordsList.concat(sanitize($("#omittedWords").val()));
    sanitize($("#input").val()).filter(word => dictionary.hasOwnProperty(word) ? dictionary[word] += 1 : dictionary[word] = 1);
    topWords = sort(dictionary);
    $(output).html(publish(output, topWords, depth));
};

var specificSearch = function () {
    var searchVal = $("#specific").val();
    if (searchVal.length < 1) {
        return;
    }
    $("#searchCount").css("visibility", "visible");
    if (dictionary.hasOwnProperty(searchVal)) {
        $("#searchCount").html(searchVal + " occured " + dictionary[searchVal] + " times.");
    } else {
        $("#searchCount").html(searchVal + " was not found.");
    }
}

//Returns a sanitized string
var sanitize = function (input) {
    input = input.replace(/[0-9]|[.,\/#!$+|"?><\]['@%\^&\*;–:{}=\-_`~()]/g, "");
    input = input.replace(/\r?\n|\r/g, " ");
    input = input.replace(/\s\s+/g, " ");
    input = input.toLowerCase();
    input = input.split(" ");
    return input.filter(w => newStopList.indexOf(w) == -1);
};

var search = function (input) {

}

//Returns published String
var publish = function (output, topWords, depth) {
    var outStr = "";
    if (depth > topWords.length) depth = topWords.length;
    for (var i = 0; i < depth; i++) {
        outStr += "<span style='font-size:" + (depth - i) * 10 + "px;' title='this word was used'>" + topWords[i] + " </span>";
    }
    return outStr;
};

//Returns the object's keys, sorted by their values (decreasing order)
var sort = function (list) {
    return Object.keys(list).sort(function (a, b) {
        return list[b] - list[a];
    });
};
