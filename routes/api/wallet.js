const express = require("express");
const router = express.Router();
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

const User = require("../../models/User");
const TransferHistory = require("../../models/TransferHistory");
const TransactionHistory = require("../../models/TransactionHistory");
const RealisedPNL = require("../../models/RealisedPNL");
const numeral = require('numeral');

const auth = require("../../middleware/auth");

async function getCoinPrice(coinName) { // coins that can be searched on: bitcoin, ethereum, litecoin, tether, monero, binance coin, cardano, ripple, solana, dogecoin
    const objReturned = {}
    coinName = coinName.toLowerCase()
    coinName = coinName.replace(" ", "")
    // console.log(coinName)
    const fetchOneCoin = await CoinGeckoClient.coins.fetch(coinName)
    // console.log(fetchOneCoin)
    if (fetchOneCoin.success) {
        const fetchCoinPrice = fetchOneCoin.data.market_data.current_price.usd
        const fetchCoinSymbol = fetchOneCoin.data.symbol.toUpperCase()
        objReturned['result'] = [fetchCoinSymbol, fetchCoinPrice]
        // res.send (`${req.body.coin} (${fetchCoinSymbol}) price: USD ${fetchCoinPrice}`)
    } else {
        objReturned['result'] = null
        // res.send (`${req.body.coin} is an invalid coin`)
    }
    // console.log(objReturned)
    return objReturned
}

function roundNum(number, dp = 2) {
    return Math.round(number*(10**dp))/(10**dp)
}

function numeralFunc(number) {
    return numeral(number).format("0,0.00")
}



// //////////////////////////////////
// //////////// GET ////////////////
// //////////////////////////////////


// Get all crypto data. Use list() method to get list of crypto

router.get("/getAllCryptoData", async (req, res) => {
    try {
        const allCoinsApi = await CoinGeckoClient.coins.all();
        // console.log(allCoinsApi);
        const listOfCoins = []
        // console.log(allCoinsApi.data[0].market_data);
        for (const obj of allCoinsApi.data) {
            const coinData = {
                symbol: obj.symbol,
                name: obj.name,
                image: obj.image.small,
                price: obj.market_data.current_price.usd,
                priceChange24Hr: obj.market_data.price_change_24h,
                percentPriceChange24Hr: obj.market_data.price_change_percentage_24h,
                marketCap: obj.market_data.market_cap.usd
            }

            console.log(coinData)
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
    res.send("Price page");
});


// Get info of 1 specific crypto data

router.get("/fetchOneCoin", async (req, res) => {
    try {
        res.json(await getCoinPrice(req.body.coin))
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

// Get many, specific coins

router.get("/fetchMultipleCoins", async (req, res) => {
    try {
        const coinsToSearch = [
            'bitcoin',
            'ethereum',
            'litecoin',
            'tether',
            'monero',
            'binancecoin',
            'cardano',
            'ripple',
            'solana',
            'dogecoin',
            'polkadot'
        ]
        const coinsPriceObject = {}

        for (const coinName of coinsToSearch) {

            const fetchOneCoin = await CoinGeckoClient.coins.fetch(coinName)
            if (fetchOneCoin.success) {
                const fetchCoinPrice = fetchOneCoin.data.market_data.current_price.usd
                const fetchCoinSymbol = fetchOneCoin.data.symbol.toUpperCase()
                coinsPriceObject[coinName] = [fetchCoinSymbol, fetchCoinPrice]
            } else 
                coinsPriceObject[coinName] = "Invalid Coin"
            
        }

        res.json(coinsPriceObject)
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

// auth middleware, applies to all routes below

router.use(auth)

// wallet main page (i.e. balance cum unrealised P&L)

router.get("/", async (req, res) => {
    let data = await User.findById(req.user.id).select("-password");

    ///// test start

    // let data = await User.findOne({email: req.body.email})
    // console.log(data)

    ///// test end

    data = data.ownedAssetsQtyAndCostBase

    const summary = []


    for (const key in data) {
        summary['usd'] = {coinSymbol: "USD", currentCoinsOwned: "-", costBase: numeralFunc(data.usd), currentCoinPrice: "-", profitAndLoss: "-", percentage: "-"}
        if (key !== 'usd') {
            const coinInfo = await getCoinPrice(key)

            const coinSymbol = coinInfo.result[0] + "USD"
            const currentCoinsOwned = data[key][0]
            const costBase = data[key][1]
            const currentCoinPrice = coinInfo.result[1] * currentCoinsOwned
            const profitAndLoss = currentCoinPrice - costBase

            summary.push({coinSymbol,
                currentCoinsOwned: String(roundNum(currentCoinsOwned,4)),
                costBase: numeralFunc(costBase), 
                currentCoinPrice: numeralFunc(currentCoinPrice), 
                profitAndLoss: numeralFunc(profitAndLoss), 
                percentage: String(roundNum(profitAndLoss/costBase*100, 4))
            })
        }
    }
    res.json(summary)

})

// Transaction history main page

router.get("/transactionhistory", async (req, res) => {
    let data = await User.findById(req.user.id).select("-password");
    const email = data.email
    data = await TransactionHistory.find({email: email})
    summary = []
    for (const element of data) {
        const cloneElement = element
        if (cloneElement["createdAt"]) {
            console.log(cloneElement["createdAt"])
        }
    }

    // data.map(element => element.createdAt ? console.log(true) : console.log(false))
    res.json(data)
})

//// WIP
// Transfer history main page

router.get("/transferhistory", async (req, res) => {
    let data = await User.findById(req.user.id).select("-password");
    const email = data.email
    data = await TransferHistory.find({email: email})
    res.json(data)
})

// //////////////////////////////////
// //////////// POST ////////////////
// //////////////////////////////////

// top up router

router.post("/topup", async (req, res) => {
    try {
        const {amount} = req.body
        const mainData = await User.findById(req.user.id).select("-password");
        const data = mainData.ownedAssetsQtyAndCostBase
        data.usd = Number(data.usd) + Number(amount)
        await User.updateOne({
            email: mainData.email
        }, {
            $set: {
                ownedAssetsQtyAndCostBase: data
            }
        })
        await TransferHistory.create({email: mainData.email, transType: "deposit", amount: amount})
        res.send("ok")
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
})


// withdraw router

router.post("/withdraw", async (req, res) => {
    try {
        const { amount} = req.body
        const mainData = await User.findById(req.user.id).select("-password");
        const data = mainData.ownedAssetsQtyAndCostBase
        if (data.usd >= amount) {
            data.usd = Number(data.usd) - Number(amount)
            await User.updateOne({
                email: mainData.email
            }, {
                $set: {
                    ownedAssetsQtyAndCostBase: data
                }
            })
            await TransferHistory.create({email: mainData.email, transType: "withdraw", amount: amount})
            res.send(`amount withdrawn = ${amount}. Balance = ${
                data.usd
            }`)
        } else {
            res.send(`intended withdrawal amount exceeds balance. amount withdrawn = ${amount}. Balance = ${
                data.usd
            }`)
        }

    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
})


// buy router

router.post("/buy", auth, async (req, res) => {
    try { // obtain user assets (i.e. entire portfolio) prior to purchase
        const { coin, quantity} = req.body
        const userData = await User.findById(req.user.id).select("-password");
        const userAssets = userData.ownedAssetsQtyAndCostBase

        // obtain stock price and determine total cost of purchasing the desired coin

        const objReturned = await getCoinPrice(coin)
        if (objReturned.result) {
            const coinSymbol = objReturned.result[0]
            const coinPrice = objReturned.result[1]
            const totalPrice = coinPrice * quantity

            // res.send (`coin purchase: ${coinSymbol}, price: ${coinPrice}, quantity: ${quantity}, total price: ${totalPrice}`)
            // res.send (`coin purchase: ${objReturned.result[0]}, price: ${objReturned.result[1]}, quantity: ${quantity}`)


            // evaluation - if USD is more than or equal to total price of the coin to be purchased, proceed with transaction. or else, reject transaction

            if (userAssets.usd >= totalPrice) {
                userAssets.usd -= totalPrice
                if (coin in userAssets) {
                    userAssets[coin][0] += quantity
                    userAssets[coin][1] += totalPrice
                } else {
                    userAssets[coin] = [quantity, totalPrice]
                }

                // res.send (`coin purchase: ${coinSymbol}, price: ${coinPrice}, quantity: ${quantity}, total price: ${totalPrice}, current balance: ${userAssets.usd}, net usd: ${userAssets.usd - totalPrice}`)
            } else {
                res.send(`insufficient funds. coin purchase: ${coinSymbol}, price: ${coinPrice}, quantity: ${quantity}, total price: ${totalPrice}, current balance: ${
                    userAssets.usd
                }, shortfall: ${
                    totalPrice - userAssets.usd
                }`)
                return
            }

            await User.updateOne({
                email: userData.email
            }, {
                $set: {
                    ownedAssetsQtyAndCostBase: userAssets
                }
            })

            let transactionIdCount = await TransactionHistory.countDocuments()

            transactionIdCount ? transactionIdCount += 1 : transactionIdCount = 1

            await TransactionHistory.create({
                transId: transactionIdCount,
                email: userData.email,
                coinCurrencyPair: coinSymbol + "USD",
                transType: "Buy",
                individualAmount: coinPrice,
                quantity: quantity,
                grossAmount: totalPrice
            })
        } else {
            res.send("invalid coin")
            return
        }
        res.send("ok")
        return
    } catch (e) {
        console.error(e.message);
    }
})


// sell router

router.post("/sell", auth, async (req, res) => {
    try { // obtain user assets (i.e. entire portfolio) prior to purchase
        const { coin, quantity} = req.body
        const userData = await User.findById(req.user.id).select("-password");
        const userAssets = userData.ownedAssetsQtyAndCostBase
        let profitAndLoss = 0
        let costBaseReduction = 0

        // obtain stock price and determine current market price of coin to be sold

        const objReturned = await getCoinPrice(coin)
        if (objReturned.result) {
            const coinSymbol = objReturned.result[0]
            const coinPrice = objReturned.result[1]
            const totalPrice = coinPrice * quantity

            // res.send (`coin purchase: ${coinSymbol}, price: ${coinPrice}, quantity: ${quantity}, total price: ${totalPrice}`)
            // res.send (`coin purchase: ${objReturned.result[0]}, price: ${objReturned.result[1]}, quantity: ${quantity}`)

            // evaluation - if number of existing coin is more than or equal to number of coins intended to be sold, execute operation. Otherwise, reject operation.

            // WIP

            const numberOfExistingCoin = userAssets[coin][0]

            if (numberOfExistingCoin >= quantity) {
                userAssets.usd += totalPrice
                userAssets[coin][0] -= quantity
                costBaseReduction = quantity / numberOfExistingCoin * userAssets[coin][1]
                userAssets[coin][1] -= costBaseReduction
                profitAndLoss = totalPrice - costBaseReduction
                res.send(`Gross sale: USD ${totalPrice}, cost base reduction: USD ${
                    Math.round(costBaseReduction * 100) / 100
                }, P&L: USD ${
                    Math.round(profitAndLoss * 100) / 100
                }`)
            } else {
                res.send(`insufficient coins to sell. existing quantity owned: ${numberOfExistingCoin}, intended quantity to be sold: ${quantity}}, shortfall: ${
                    quantity - numberOfExistingCoin
                }`)
                return
            }

            // updating of cost base in "Users" database (i.e. ownedAssetsQtyAndCostBase portfolio)

            await User.updateOne({
                email: email
            }, {
                $set: {
                    ownedAssetsQtyAndCostBase: userAssets
                }
            })

            const transactionIdCount = await TransactionHistory.countDocuments()

            const commonEntry = {
              email: userData.email,
              coinCurrencyPair: coinSymbol + "USD",
              individualAmount: coinPrice,
              quantity: quantity,
              grossAmount: totalPrice 
            }

            await TransactionHistory.create({
              ...commonEntry,
                transId: transactionIdCount + 1,
                transType: "Sell",
            })

            let pnlIdCount = await RealisedPNL.countDocuments()

            pnlIdCount ? pnlIdCount += 1 : pnlIdCount = 1

            await RealisedPNL.create({
              ...commonEntry,
              transId: pnlIdCount, 
              costAmount: costBaseReduction,
              PnL: profitAndLoss,
              percentagePnL: profitAndLoss / costBaseReduction,
            })

            res.send("ok")
            return

        } else {
            res.send("invalid coin")
            return
        }
    } catch (e) {
        console.error(e.message);
        return
    }
})

// /////////////////////////////////////////////////////
// /////////////////// TEMPLATE ////////////////////////
// /////////////////////////////////////////////////////

router.post("/routename", async (req, res) => {
    try { // code


    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;
