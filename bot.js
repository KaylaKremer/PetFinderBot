
//Petfinder API
const api_key = "xxxxxxxxxxxxxxxxxxxxxxxxxxx";
const api_secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxx";
const petfinder = require("petfinder")(api_key, api_secret);

// Twit API
const Twit = require("twit");
const config = require("./config.js");
const T = new Twit(config);

//Retrieves random pet every hour from petfinder.com and tweets info about pet with link
function pet(){
    petfinder.getRandomPet({animal: "dog" || "cat"}, (err, pet) => {
        const txt = `${pet.name} is available for adoption: https://www.petfinder.com/petdetail/${pet.id}`;
        tweetPet(txt);
    });
    function tweetPet(txt){
        const tweet = {
            status: txt
        };
        T.post("statuses/update", tweet);
    }
}

setInterval(pet, (1000*60*60));

//Replies to a follower with message thanking them
const stream = T.stream("user");
stream.on("follow", followed);

function followed(event){
    const screenName = event.source.screen_name;
    tweetFollower(`Thanks for following me @${screenName}! 🐾`);
}

function tweetFollower(txt){
    const tweet = {
        status: txt
    };
    T.post("statuses/update", tweet);
}

//Replies to a tweet with a message
stream.on("tweet", tweetEvent);
function tweetEvent(event){
    const replyto = event.in_reply_to_screen_name;
    const text = event.text;
    const screenName = event.user.screen_name;
    if (replyto === "petfinderbot") {
        var response = `@${screenName} Adopt a pet today at www.petfinder.com! 🐕🐈`;
        tweetReply(response);
    }
}

function tweetReply(txt){
    const tweet = {
        status: txt
    };
    T.post("statuses/update", tweet);
}
