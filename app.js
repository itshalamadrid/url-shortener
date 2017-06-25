// Instantiate express
var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var base60 = require('./base60.js');
var Url = require('./models/url');

// Create connection to mongodb
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => {
    // Send to home page
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/shorten',(req,res) => {
    // Will be called to create the shortened url
    var longUrl = req.body.url;
    var shortUrl = "";
    // Check if that long url already exists in the database
    Url.findOne({long_url: longUrl}, function(error, doc) {
        if (doc) {
            // It has already been shortened
            shortUrl = config.webhost + base60.encode(doc._id);
            res.send({'shortUrl': shortUrl});
        } else {
            // Create an entry for this new shortened url
            var newUrl = Url({
                long_url: longUrl
            });
            newUrl.save(function(err){
                if (err){
                    console.log(err);
                }

                shortUrl = config.webhost + base60.encode(newUrl._id);
                res.send({'shortUrl':shortUrl});
            })
        }
    })
});

app.get('/:encoded_id',(req,res)=>{
    // Uses the encoded_id to redirect to the original url
    var encodedId = req.params.encoded_id;
    var decodedId = base60.decode(encodedId);

    // Check if that url exists in the database, if not then redirect to the home page
    Url.findOne({_id: decodedId}, function(err, doc){
        if (doc) {
            res.redirect(doc.long_url);
        } else {
            res.redirect(config.webhost);
        }
    });

});

app.listen(3000,'localhost',function(){
    console.log('listening on port 3000');
})