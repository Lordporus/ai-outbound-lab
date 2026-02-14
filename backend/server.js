import express from "express";
import Groq from "groq-sdk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ---------------- CORS CONFIG ---------------- */

const allowedOrigins = [
    "http://localhost:5173", // local frontend
    "https://your-frontend-domain.vercel.app" // replace after Vercel deploy
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // allow Postman / curl
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        }
    })
);

app.use(express.json());

/* ---------------- GROQ SETUP ---------------- */

if (!process.env.GROQ_API_KEY) {
    console.error("❌ GROQ_API_KEY missing in environment variables");
    process.exit(1);
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
    res.json({
        status: "Backend is running",
        service: "AI Outbound Lab API"
    });
});

/* ---------------- GENERATE ROUTE ---------------- */

app.post("/generate", async (req, res) => {
    console.log("Incoming request:", req.body);

    const { type, input, tone = "Professional" } = req.body;

    if (!type || !input) {
        return res
            .status(400)
            .json({ error: "Missing required fields: type, input" });
    }

    let prompt;

    switch (type) {
        case "rewrite":
            prompt = `
Rewrite this cold DM.

Tone: ${tone}

Message:
${input}

Rules:
- Keep under 80 words.
- No fluff.
- No generic lines.
- Make it human and direct.
`;
            break;

        case "email":
            prompt = `
Write a personalized cold email.

Tone: ${tone}

Context:
${input}

Rules:
- Under 120 words.
- Strong opening line.
- Clear value.
- One specific insight or metric.
- Soft CTA.
- No placeholders like [Name] or [Company].
`;
            break;

        case "objection":
            prompt = `
Handle this sales objection strategically.

Tone: ${tone}

Objection:
${input}

Rules:
- Acknowledge briefly.
- Reframe with value.
- Avoid defensiveness.
- End with low-friction CTA.
- Under 100 words.
`;
            break;

        default:
            return res.status(400).json({ error: "Invalid type provided." });
    }

    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: `
You are a top-tier outbound copy strategist.

Strict rules:
- No hype.
- No corporate buzzwords.
- No exaggerated claims.
- Conversational tone.
- Short sentences.
- Clear thinking.
`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 400
        });

        res.json({
            result: completion.choices[0].message.content
        });
    } catch (error) {
        console.error("FULL ERROR:", error);
        res.status(500).json({ error: "AI generation failed." });
    }
});

/* ---------------- SERVER START ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});
