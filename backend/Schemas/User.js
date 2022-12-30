const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	user_id: {
		type: String,
		required: true,
		unique: true,
		default: "",
	},
	user_pw: {
		type: String,
		required: true,
		default: "",
	},
	user_token: {
		type: String,
		required: true,
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

module.exports = mongoose.model('User', userSchema);