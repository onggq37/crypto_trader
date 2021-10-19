const express = require("express");
const router = express.Router();
const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

router.get("/", async (req, res) => {
  //Get list of crypto data
  try {
    const allCoinsApi = await CoinGeckoClient.coins.all();
    // console.log(allCoinsApi);
    const listOfCoins = [];
    // console.log(allCoinsApi.data[0].market_data);
    for (const obj of allCoinsApi.data) {
      const coinData = {
        symbol: obj.symbol,
        name: obj.name,
        image: obj.image.small,
        price: obj.market_data.current_price.usd,
        priceChange24Hr: obj.market_data.price_change_24h,
        percentPriceChange24Hr: obj.market_data.price_change_percentage_24h,
        marketCap: obj.market_data.market_cap.usd,
      };

      listOfCoins.push(coinData);
    }
    //For now just send list
    res.send(listOfCoins);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const coinProperties = {};
    // const coin1dData = await CoinGeckoClient.coins.fetchMarketChart(`${req.params.id}`, { vs_currency: 'usd', days: 1 });
    // console.log(coin1dData);
    const coinPrice = await CoinGeckoClient.coins.fetch(id=`${req.params.id}`, {localization: 'false'});
    console.log(coinPrice.data.prices);
    res.send("Show Price");
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
  }
});

module.exports = router;
