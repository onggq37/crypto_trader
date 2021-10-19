const mongoose = require("mongoose")
const TransferHistorySchema = new mongoose.Schema({

    email: {
        type: String,
    },

    transType: {
        type: String
    },

    amount: {
        type: Number
    },

})

module.exports = mongoose.model("TransferHistory", TransferHistorySchema);
