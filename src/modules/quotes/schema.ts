import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const schema = new Schema({
    _id: String,
    author: String,
    text: String,
    tags: String,
    isDeleted: Boolean,
});

export default mongoose.model('quotes', schema);