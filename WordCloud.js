var stopWordsList = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];


var myWordCloud = function () {
    var dictionary = {},
        topWords = [];
    var depth = $("#depth").val()
    output = "#output";
    sanitize($("#input").val()).filter(word => dictionary.hasOwnProperty(word) ? dictionary[word] += 1 : dictionary[word] = 1);
    topWords = sort(dictionary);
    publish(output, topWords, depth);
};

var sanitize = function (input, depth, output) {
    input = input.replace(/[0-9]|[.,\/#!$%\^&\*;–:{}=\-_`~()]/g, "");
    input = input.replace(/\r?\n|\r/g, " ");
    input = input.replace(/\s\s+/g, " ");
    input = input.toLowerCase();
    input = input.split(" ");
    return input.filter(w => stopWordsList.indexOf(w) == -1);
};

var publish = function (output, topWords, depth) {
    var outStr = "";
    if (depth > topWords.length) depth = topWords.length;
    for (var i = 0; i < depth; i++) {
        outStr += "<span style='font-size:" + (depth - i) * 10 + "px;' title='this word was used'>" + topWords[i] + "</span><br>";
        //console.log("Top word " + (i + 1) + " is : " + topWords[i]);
    }
    $(output).html(outStr);
};

var sort = function (list) {
    return Object.keys(list).sort(function (a, b) {
        return list[b] - list[a];
    });
};