// Isaias Pomales
// Fullstack Academy

/* 

  Text is from Balcony Scene of Romeo + Juliet 
  and pork tenderloin recipe reviews 

*/

var word_corpus = "It is my lady, O, it is my love! O, that she knew she were! She speaks yet she says nothing: what of that? Her eye discourses; I will answer it. I am too bold, 'tis not to me she speaks: Two of the fairest stars in all the heaven, Having some business, do entreat her eyes To twinkle in their spheres till they return. What if her eyes were there, they in her head? See, how she leans her cheek upon her hand! O, that I were a glove upon that hand, That I might touch that cheek!  O Romeo, Romeo! wherefore art thou Romeo? Deny thy father and refuse thy name Or, if thou wilt not, be but sworn my love, And I'll no longer be a Capulet. O, speak again, bright angel! for thou art As glorious to this night, being o'er my head As is a winged messenger of heaven Unto the white upturned wondering eyes Of mortals that fall back to gaze on him When he bestrides the lazy-pacing clouds And sails upon the bosom of the air. Shall I hear more, or shall I speak at this? Tis but thy name that is my enemy; it is nor hand, nor foot, Nor arm, nor face, nor any other part Belonging to a man. O, be some other name! What's in a name? that which we call a rose By any other name would smell as sweet.       This was an amazing recipe. I used a little oil in the rub so it would stick to the meat better. I also vacuum sealed the meat and let it rest a little shorter because we didn't have the time, and it still was amazing. This was delicious! I had a head of purple cabbage that I wanted to use up so I sliced it and cooked it with the apples and onions after they were browned.  Thanks for the yummy recipe! Not really happy with this recipe. tenderloin was over done! Such simple ingredients for such phenomenal taste. Absolutely delicious! It's a shame that the previous reviewer chose to toss the tenderloin out due to the vinegery smell, because it produced one of the better pork tenderloins ever for me. But then, I really enjoy the flavor balsamic vinegar lends. I say try it (if you like that strong flavor too) because I really didn't think it not was overpowering at all in taste or smell! Thanks for the recipe! I've made pork tenderloin in the past and while it always tastes delicious it always came out overdone and tough. Tonight was the first time I've tried this method of cooking it and I have to say this is the best pork tenderloin I have ever made! It was so tender and so moist I can't even begin to tell you. I will never cook tenderloin another way again this is going to be my method every time. I have tried every way known to man to get a moist, tender pork tenderloin. I've tried it all and only came up with dry meat!!! I tried this recipe with a great amount of skepticism but, with meat prices being what they are, I have to buy pork. You could have knocked me over with a feather when I carved this tenderloin!! It was amazingly moist and tender all the way through. Now all I have to do is perfect my rub!! Any suggestions This is really pretty simple and makes a juicy, delicious pork loin. Left overs are great in a salad the next day. One of the best things is the incredible smell as you sear the pork. Excellent flavor!  This was THE BEST PORK LOIN I have EVER had. But I found it just a little salty. It was juicy and very tender. Make sure that you don't over cook your roast. It came out tender, moist and with wonderful flavor! Yum.";

function parseText(text) {
  text = text.toLowerCase();
  var arr = text.split(' ');
  var result = [];
  var alpha = 'abcdefghijklmnopqrstuvwxyz';
  
  for (var i = 0; i < arr.length; i++) {
    var word = arr[i];
    var formatted = '';
    for (var j = 0; j < word.length; j++) {
      if (alpha.indexOf(word[j]) !== -1) {
        formatted += word[j];
      }
    }
    if (formatted.length) {
      result.push(formatted);
    }
  }
  return result;
}

function generateWordPairs(text) {
  var words = parseText(text);
  var markov = {};
  
  for (var i = 0; i < words.length - 1; i++) {
    var key = words[i];
    if (markov[key]) {
      markov[key].push(words[i + 1]);
    }
    else {
      markov[key] = [words[i + 1]];
    }
  }
  return markov;
}

function getRandomWord(markov, key) {
  var wordArr = markov[key];
  var randomIndex = Math.floor(Math.random() * wordArr.length);
  return wordArr[randomIndex];
}

function getRandomKey(markov) {
  var keys = Object.keys(markov);
  randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

function writeLine(markov, word_count) {
  var word = getRandomKey(markov);
  var line = '';
  while (word_count > 0) {
    if (markov[word]) {
      line += word;
      if (word_count > 1) line += ' ';
      word_count--;
      word = getRandomWord(markov, word);
    }
    else {
      word = getRandomKey(markov);
    }
  }
  return line;
}

function generatePoem(word_corpus, lines) {
  var markov = generateWordPairs(word_corpus);
  console.log(markov);
  var poem = '';
  var length;
  for (var i = 0; i < lines; i++) {
    // random length per line. (5-7 words per line)
    length = Math.floor(Math.random() * 3) + 5;
    poem += writeLine(markov, length);
    poem += "<br>";
  }
  
  return poem;
}

function onClick() {
  document.querySelector('p').style.opacity = '0';
  setTimeout(function() {
    document.querySelector('p').innerHTML = generatePoem(word_corpus, 5);
    document.querySelector('p').style.opacity = '1';
  }, 500);
  
}

document.querySelector('button').addEventListener('click', onClick);



















