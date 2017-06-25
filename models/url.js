var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating the counters schema
var CounterSchema = Schema({
    _id : {type:String, required:true}, 
    seq : {type:Number, default:0}
})

// Create a model from this schema
var counter = mongoose.model('counters', CounterSchema);

// Creating a schema for links
var urlSchema = Schema({
    _id :{type:Number, index:true},
    long_url: String,
    createdDate: Date
})

// pre middleware executes the callback function everytime before any entry is made to the urls collection
urlSchema.pre('save', function(next){
    var doc = this;
    counter.findByIdAndUpdate({_id:'url_count'}, {$inc: {seq:1}}, {new:true}, function(error, counter){
        if (error) {
            return next(error);
        }
        doc._id = counter.seq;
        doc.createdDate = new Date();
        next();
    })
})


var Url = mongoose.model('Url', urlSchema);
module.exports = Url;