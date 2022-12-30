const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	user_token: {
		type: String,
		required: true,
		unique: true
	},
	user_email: {
		type: String,
		required: true,
		unique: true
	},
	user_nickname: {
		type: String,
		required: true,
        unique: true
	},
});

module.exports = mongoose.model('User', userSchema);