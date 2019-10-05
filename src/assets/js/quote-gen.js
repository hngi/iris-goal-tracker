let quotes = [
  "Why do it later when you can do it now",
  "The way to get started is to quit talking and begin doing - Walt Disney",
  "The Pessimist Sees Difficulty in Every Opportunity. The Optimist sees the opportunity in every difficulty - Winston Churchill",
  "You learn more from failure than from success. Don\'t let it stop you. Failure builds character.",
  "Failure is part of the learning process",
  "Its hard to beat a person who never gives up",
  "It always seems impossible until it's done - Nelson Mandela",
  "Every accomplishment starts with the decision to try.",
  "You can do anything.",
  "Start your day with a big challange to achieve big success",
  "A dream doesn't become reality through magic; it takes sweat, determination and hard work.",
  "A year from now you may wish you had started today.",
  "If you want it, work for it. It's that simple.",
  "Choose a job you love, and you will never have to work a day in your life.",
  "To have great tomorrow, get all of your work done today",
  "Talent is overrated, work hard!!!",
  "Hard work beats talent when talents fails to work hard",
  "The harder you work, the luckier you get.",
  "Growth begins at the end of your comfort zone.",
  "Small deeds done are better than great deeds plan.",
  "No one ever drown in sweat!",
  "Dreams don't work unless you do.",
  "The road may be hard but the results are priceless!!",
  "Stop doubting yourself, work hard and make it happen.",
  "You can't get much done in life if you only work on days when you feel good."

];

let quoteGenerator = setInterval(function () {

  let randomQuote = Math.floor(Math.random() * quotes.length);
  const quoteContainer = document.getElementById('displayQuote');
  if (quoteContainer) {
    quoteContainer.innerHTML = quotes[randomQuote];
  }
}, 7000);

onload = quoteGenerator;
