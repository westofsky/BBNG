const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendSchema = new Schema({
	user_nickname: [{
		type: String,
        required: true,
		unique: true,
	}],
	friend_nickname: {
		type: String,
		required: true,
        unique: true,
	},
    status: {
		type: Number,
		required: true,
        unique: true,
	},
});

module.exports = mongoose.model('Friends', friendSchema);