const mongoose = require("mongoose")
const RealisedPNLSchema = new mongoose.Schema({

    transId: {
        type: Number
    },

    email: {
        type: String
    },

    coinCurrencyPair: {
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

    costAmount: {
        type: Number
    },

    PnL: {
        type: Number
    },

    percentagePnL: {
        type: Number
    },

})

module.exports = mongoose.model("RealisedPNL", RealisedPNLSchema);
