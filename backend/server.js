import express from "express";
import Groq from "groq-sdk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.post("/generate", async (req, res) => {
    console.log("Incoming request:", req.body);

    const { type, input, tone } = req.body;

    if (!input || !type) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    let prompt = "";

    if (type === "rewrite") {
        prompt = `
Rewrite the following cold DM to improve clarity, engagement, and reply rate.

Tone: ${tone}

Message:
${input}

Make it concise, human, and natural.
`;
    }

    if (type === "email") {
        prompt = `
Write a personalized cold email.

Tone: ${tone}

Context:
${input}

Structure:
- Strong opening hook
- Clear value proposition
- Short body
- Soft CTA
Keep it under 120 words.
`;
    }

    if (type === "objection") {
        prompt = `
Respond strategically to this objection.

Tone: ${tone}

Objection:
${input}

Rules:
- Acknowledge briefly
- Reframe with value
- Avoid being defensive
- End with soft CTA
Keep it concise.
`;
    }

    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: `
You are a top 1% cold email strategist.

Rules:
- No buzzwords.
- No corporate fluff.
- No vague phrases like "unlock growth" or "transform strategy".
- Sound conversational, not marketing-heavy.
- Use short sentences.
- Include one specific insight or metric.
- End with a low-friction CTA.
`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 500
        });

        res.json({
            result: completion.choices[0].message.content
        });

    } catch (err) {
        console.error("FULL ERROR:");
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
