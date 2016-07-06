var phrase = "\
In the midway of this our mortal life, \
I found me in a gloomy wood, astray \
Gone from the path direct: and e'en to tell \
It were no easy task, how savage wild \
That forest, how robust and rough its growth, \
Which to remember only, my dismay \
Renews, in bitterness not far from death. \
Yet to discourse of what there good befell, \
All else will I relate discover'd there. \
How first I enter'd it I scarce can say, \
Such sleepy dullness in that instant weigh'd \
My senses down, when the true path I left, \
But when a mountain's foot I reach'd, where clos'd \
The valley, that had pierc'd my heart with dread, \
I look'd aloft, and saw his shoulders broad \
Already vested with that planet's beam, \
Who leads all wanderers safe through every way.";
var regx = /[:., ]/g,
    words = phrase.split(regx),
    get_wc = function(word_arr) {
      var wc = {};
      word_arr.forEach(function(word) {
        var count = wc[word] || 0;
        wc[word] = count + 1;
      });

      delete wc[""];
      return wc;
    },
    most_freq = function(wc) {
      var max = 0;
      var top_word;
      for(var word in wc) {
        if(wc[word] > max) {
          top_word = word;
          max = wc[word];
        }
      }

      return top_word;
    },
    wc = get_wc(words),
    top_word = most_freq(wc);

console.table(wc);
console.log("Total word count: " + words.length);
console.log("Most frequent word: " + top_word + " (" + wc[top_word] + ")");

