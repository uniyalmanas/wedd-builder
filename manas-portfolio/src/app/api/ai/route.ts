import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { currentText, promptType, customPrompt } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Connect to real Gemini API via REST
      const promptText = `
        You are a luxury wedding planner and event designer copywriter for "Vows & Vistas".
        Your task is to edit, rewrite or generate new copy based on:
        - Current text: "${currentText}"
        - Instruction/Style: "${promptType}" ${customPrompt ? `with custom details: "${customPrompt}"` : ''}
        
        Rules:
        1. Keep the output length appropriate for its context (e.g. if current text is short, keep it short).
        2. Maintain a highly premium, luxury, elegant, and editorial tone (words like bespoke, curated, meticulous, ethereal, splendor, legacy).
        3. Respond with ONLY the final text. No explanations, no markdown styling, no quotes around the output.
      `;

      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: promptText }]
          }]
        })
      });

      if (response.ok) {
        const resData = await response.json();
        const generatedText = resData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (generatedText) {
          return NextResponse.json({ text: generatedText, isMock: false });
        }
      }
      console.warn('Gemini API call failed or returned empty, falling back to mock.');
    }

    // Fallback: Smart Mock Content Generator
    await new Promise(r => setTimeout(r, 1200)); // Simulating API latency

    let generatedText = '';
    const style = promptType.toLowerCase();

    if (style.includes('headline')) {
      const headlines = [
        "Crafting Celebrations of Ethereal Grandeur",
        "Where Love Meets Editorial Design",
        "Orchestrating Meticulously Curated Legacies",
        "Timeless Elegance for Modern Romantics",
        "Bespoke Event Styling and Flawless Execution"
      ];
      generatedText = headlines[Math.floor(Math.random() * headlines.length)];
    } else if (style.includes('description') || style.includes('elegant')) {
      const quotes = [
        "True luxury lies in the details. We curate every flower, candle, and moment to weave your personal love story into a breathtaking masterpiece.",
        "From intimate garden vows to majestic heritage palace celebrations, we provide flawless planning and design for discerning couples globally.",
        "Our approach marries meticulous logistics with high-fashion aesthetics, ensuring your celebration is as seamless as it is visually striking."
      ];
      generatedText = quotes[Math.floor(Math.random() * quotes.length)];
    } else if (style.includes('short')) {
      generatedText = currentText.length > 30 
        ? currentText.substring(0, Math.min(currentText.length, 60)) + '...'
        : currentText;
    } else if (style.includes('formal') || style.includes('luxury')) {
      generatedText = `A meticulously curated experience designed for discerning clienteles. We integrate bespoke logistics with architectural floral structures, transforming standard sites into editorial canvases.`;
    } else {
      // Custom prompt fallback
      generatedText = `Bespoke celebration design for Manas WaaS platform. Curated layouts, premium floral styling, and editorial photography parameters engineered for flawless romantic experiences.`;
    }

    return NextResponse.json({ 
      text: generatedText, 
      isMock: true,
      hint: "Configure GEMINI_API_KEY in .env.local to enable real generative content."
    });

  } catch (error: any) {
    console.error('AI Route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
