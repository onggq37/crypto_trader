const express = require("express");
const router = express.Router();
const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

router.get("/", async (req, res) => {
  //Get list of crypto data
  try {
    const allCoinsApi = await CoinGeckoClient.coins.all();
    // console.log(allCoinsApi);
    const listOfCoins = []
    // console.log(allCoinsApi.data[0].market_data);
    for ( const obj of allCoinsApi.data ) {
        const coinData = {
            symbol: obj.symbol,
            name: obj.name,
            image: obj.image.small,
            price: obj.market_data.current_price.usd,
            priceChange24Hr: obj.market_data.price_change_24h,
            percentPriceChange24Hr: obj.market_data.price_change_percentage_24h,
            marketCap: obj.market_data.market_cap.usd,
        }

        console.log(coinData)
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }

  res.send("Price page");
});

module.exports = router;
