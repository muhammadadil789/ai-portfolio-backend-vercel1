import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    // Example portfolio and market context (in future from real data)
    const portfolioContext = `
      Portfolio: Balanced AI Navigator
      Risk Score: 65
      Target Return: 8–10% annually
      Rebalance Frequency: Quarterly
      Latest News: Global inflation stabilizing, tech sector strong
      Market Stress: Low
    `;

    // System prompt: behaves like Aladdin portfolio AI
    const messages = [
      {
        role: "system",
        content: `You are a powerful AI financial assistant named Aladdin.
You help users manage and optimize portfolios based on market news, risk score, and economic conditions.`
      },
      {
        role: "user",
        content: `Based on this data, what should the investor do?\n${portfolioContext}`
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages
    });

    res.status(200).json({
      ai_advice: completion.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
      }
