export default async function handler(req, res) {
  const apiKey = "sk-proj-ZbQeazL_eRNbMlZpGU-XqdrqfSqhGoFM7BENccpyMvikD_st2jHlTPxgkXL9z7Yk5En3ZpZeT3BlbkFJmRiFfevToyliskfcXNKTkIhX4x5N2TwnNGxgFI8q1UgRRXInESj8SSxA9PfyF7_BAG7HoG5fYA";

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert AI portfolio advisor like Aladdin. Give smart, professional, data-based advice in 2–3 sentences.",
          },
          {
            role: "user",
            content: "Give current portfolio management advice considering market risk, inflation, geopolitical news, and diversification.",
          },
        ],
        temperature: 0.7,
      }),
    });

    const result = await completion.json();
    const aiAdvice = result.choices?.[0]?.message?.content || "No advice generated.";

    res.status(200).json({ advice: aiAdvice });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to fetch AI advice." });
  }
}
