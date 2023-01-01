const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	user_id: {
		type: String,
		unique: true,
		default: "",
	},
	user_pw: {
		type: String,
		default: "",
	},
	user_nickname: {
		type: String,
		required: true,
        unique: true,
		default: "",
	},
});

const userSchema2 = new Schema({
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

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('User_t', userSchema2);