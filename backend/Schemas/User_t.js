const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema_t = new Schema({
	user_token: {
		type: String,
		unique: true,
		default: "",
	},
	user_nickname: {
		type: String,
		required: true,
        unique: true,
		default: "",
	},
});

module.exports = mongoose.model('User_t', userSchema_t);