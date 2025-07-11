export default async function handler(req, res) {
  const symbols = ["SPY", "BTC/USD", "AAPL"];
  const apiKey = process.env.TWELVE_API_KEY;

  try {
    const results = await Promise.all(
      symbols.map(async symbol => {
        const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return { symbol, price: data.price || "N/A" };
      })
    );

    res.status(200).json({ prices: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
      }
