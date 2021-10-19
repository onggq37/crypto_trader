const mongoose = require("mongoose")
const TransactionHistorySchema = new mongoose.Schema({

    transId: {
        type: Number
    },

    email: {
        type: String,
    },

    coinCurrencyPair: {
        type: String
    },

    transType: {
        type: String
    },

    individualAmount: {
        type: Number
    },

    quantity: {
        type: Number
    },

    grossAmount: {
        type: Number
    },

})

module.exports = mongoose.model("TransactionHistory", TransactionHistorySchema);
