const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const todoSchema = new Schema({_id: ObjectId, title: {type: String,required: true}, description:
{type: String,required
: false

}
});
module
    .exports
    = mongoose
    .model
    ('Todo'
        , todoSchema);