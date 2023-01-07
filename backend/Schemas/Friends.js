const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendSchema = new Schema({
	user_nickname: {
		type: String,
        required: true,
	},
	friend_nickname: {
		type: String,
		required: true,
	},
    status: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Friends', friendSchema);