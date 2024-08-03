addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
}); 

//Set an ENVIRONMENT variable.
//Assuming the variable is named MYAPI
const API_KEY = MYAPI;

//Change to model requirement
const MODEL = "perplexity/llama-3-sonar-small-32k-online";

async function handleRequest(request) {
  const headers = {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  };

  const body = JSON.stringify({
    model: MODEL,
    messages: [
      //adjust accordingly
      { role: "system", content: "You will provide brief description only" },
      { role: "user", content: "What is the Windows EXE path of BitDifender?" }
    ]
  });

  try {
    const completionResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body,
    });

    if (!completionResponse.ok) {
      return new Response(`Error: ${completionResponse.statusText}`, { status: completionResponse.status });
    }

    const completion = await completionResponse.json();

    const content = completion.choices[0]?.message?.content || "No content received";

    return new Response(`${content}`, {
      headers: { "Content-Type": "text/plain" }
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
