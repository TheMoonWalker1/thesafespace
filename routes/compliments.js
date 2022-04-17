const path = require('path')
const express = require('express');
const router = express.Router()
const accountSid = 'ACeb8b77a9d3b60f8b7eb4f74eadba3508'; 
const authToken = '[AuthToken]'; 
const client = require('twilio')(accountSid, authToken); 

var count = 1
var num_list = []

const schedule = require('node-schedule')
const job = schedule.scheduleJob('0 9 * * *', send)
//add code below

function store(req, res, next) {
    if ('pnumber' in req.query) {
        sqlQuery = 'SELECT * from pnumbers'
        res.app.locals.pool.query(sqlQuery, function(error,results,fields){
            for (const row of results){
                //console.log(row['num'])
                num_list.push(row['num'])
            }
            //console.log(num_list)
            var nonsense = ('+1'+req.query.pnumber) 
            if (num_list.includes(nonsense)) {}
            else {
                var sqlQuery1 = 'INSERT INTO pnumbers VALUES (' + num_list.length + ', ' + '\'+1' + req.query.pnumber + '\'' + ');'
                //console.log('+1' + req.query.pnumber)
                res.app.locals.pool.query(sqlQuery1, function(error,results,fields) {})
                num_list.push('+1' + req.query.pnumber)
            }
            console.log(num_list)
            next()
        })
    }
    else {
        next()
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function send() {
    const accountSid = 'ACeb8b77a9d3b60f8b7eb4f74eadba3508'; 
    const authToken = ['80ed581a24614481a428b8b33d0d175d']; 
    const client = require('twilio')(accountSid, authToken); 
    const quotes = ['Success is not final; failure is not fatal: It is the courage to continue that counts.', 'It is better to fail in originality than to succeed in imitation.', 'The road to success and the road to failure are almost exactly the same.', 'Success usually comes to those who are too busy looking for it.', 'There are three ways to ultimate success: The first way is to be kind. The second way is to be kind. The third way is to be kind.', 'The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.', 'Don’t let yesterday take up too much of today.', 'If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.', 'Experience is a hard teacher because she gives the test first, the lesson afterwards.', 'To know how much there is to know is the beginning of learning to live.', 'Concentrate all your thoughts upon the work in hand. The sun\'s rays do not burn until brought to a focus.', 'Either you run the day or the day runs you.', 'I’m a greater believer in luck, and I find the harder I work the more I have of it.', 'When we strive to become better than we are, everything around us becomes better too.', 'Opportunity is missed by most people because it is dressed in overalls and looks like work.', 'Setting goals is the first step in turning the invisible into the visible.', 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle. As with all matters of the heart, you\'ll know when you find it.', 'You\'ve got to get up every morning with determination if you\'re going to go to bed with satisfaction.', 'Education is the most powerful weapon which you can use to change the world.', 'The most difficult thing is the decision to act, the rest is merely tenacity.', 'Take the attitude of a student, never be too big to ask questions, never know too much to learn something new.', 'The elevator to success is out of order. You’ll have to use the stairs, one step at a time.', 'Be a positive energy trampoline – absorb what you need and rebound more back.', 'People often say that motivation doesn’t last. Well, neither does bathing – that’s why we recommend it daily.', 'Work until your bank account looks like a phone number.', 'Teamwork is the ability to work together toward a common vision. The ability to direct individual accomplishments toward organizational objectives. It is the fuel that allows common people to attain uncommon results.', 'Coming together is a beginning. Keeping together is progress. Working together is success.', 'Alone we can do so little, together we can do so much.', 'I invite everyone to choose forgiveness rather than division, teamwork over personal ambition.', 'Just one small positive thought in the morning can change your whole day.', 'Opportunities don\'t happen, you create them.', 'Love your family, work super hard, live your passion.', 'It is never too late to be what you might have been.', 'Don\'t let someone else\'s opinion of you become your reality', 'I am not a product of my circumstances. I am a product of my decisions.', 'The greatest discovery of my generation is that a human being can alter his life by altering his attitudes.', 'One of the differences between some successful and unsuccessful people is that one group is full of doers, while the other is full of wishers.', 'I’d rather regret the things I’ve done than regret the things I haven’t done.', 'You cannot plow a field by turning it over in your mind. To begin, begin.', 'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love…', 'Your Monday morning thoughts set the tone for your whole week. See yourself getting stronger, and living a fulfilling, happier & healthier life.', 'Don\'t settle for average. Bring your best to the moment. Then, whether it fails or succeeds, at least you know you gave all you had.', "I have stood on a mountain of no’s for one yes.", "If you believe something needs to exist, if it's something you want to use yourself, don't let anyone ever stop you from doing it.", "Don't look at your feet to see if you are doing it right. Just dance.", 'True freedom is impossible without a mind made free by discipline.', 'The only one who can tell you “you can’t win” is you and you don’t have to listen.', 'Take your victories, whatever they may be, cherish them, use them, but don’t settle for them.', "Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you. And you can change it, you can influence it… Once you learn that, you'll never be the same again.", "Life is like riding a bicycle. To keep your balance you must keep moving.", 'Courage doesn\'t always roar. Sometimes courage is a quiet voice at the end of the day saying, "I will try again tomorrow."', 'Worry is a misuse of imagination.']
    console.log('53')
    console.log(num_list)
    for (let num of num_list) {
        client.messages 
          .create({ 
             messagingServiceSid: 'MG0c21c7228822a0d9221041452278ce4b',
             body: quotes[getRandomInt(quotes.length+1)],
             to: num
           }) 
          .then(message => console.log(message.sid)) 
          .done();
    }
}

router.get('/login', function(req, res) {
    res.render('login_form')
})

router.get('/compliments', store, function(req, res) {
    console.log(num_list)
    res.render('complimenter')
})

router.get('/contact', function(req, res) {
    res.render('Contact-1')
})

module.exports = router;