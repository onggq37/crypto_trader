const express = require("express");
const router = express.Router();
const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

router.get("/", async (req, res) => {
  //Get list of crypto data
  try {
    const allCoinsApi = await CoinGeckoClient.coins.all();
    //console.log(allCoinsApi);
    const listOfCoins = [];
    // console.log(allCoinsApi.data[0].id);
    for (const obj of allCoinsApi.data) {
      const coinData = {
        id: obj.id,
        symbol: obj.symbol,
        name: obj.name,
        image: obj.image.thumb,
        price: obj.market_data.current_price.usd,
        priceChange24Hr: obj.market_data.price_change_24h,
        percentPriceChange24Hr: obj.market_data.price_change_percentage_24h,
        marketCap: obj.market_data.market_cap.usd,
      };

      listOfCoins.push(coinData);
    }
    //For now just send list
    res.json(listOfCoins);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const coin90dData = await CoinGeckoClient.coins.fetchMarketChart(`${req.params.id}`, { vs_currency: 'usd', days: 60, interval: 'daily' });
    // console.log(coin90dData.data.prices);
    const coinPrice = await CoinGeckoClient.coins.fetch(id=`${req.params.id}`, {localization: 'false'});
    // res.json(coinPrice.data.market_data);
    const coinProperties = {
      name: coinPrice.data.name,
      symbol: coinPrice.data.symbol,
      description: coinPrice.data.description.en,
      currentPrice: coinPrice.data.market_data.current_price.usd,
      marketCap: coinPrice.data.market_data.market_cap.usd,
      priceChange60d: coinPrice.data.market_data.price_change_percentage_60d_in_currency.usd,
      data90d: coin90dData.data.prices 
    };

    res.json(coinProperties);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
  }
});

module.exports = router;
