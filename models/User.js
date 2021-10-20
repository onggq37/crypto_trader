const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    contactNumber: {
        type: Number,
    },

    email: {
        type: String,
        required: true,
        unqiue: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

    ownedAssetsQtyAndCostBase: {
        type: Object,
        default: {"usd": 0}
    },
})

module.exports = mongoose.model("User", UserSchema);