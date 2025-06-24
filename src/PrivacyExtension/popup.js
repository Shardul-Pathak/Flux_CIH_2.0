document.addEventListener('DOMContentLoaded', function () {
    const analyzeButton = document.getElementById('analyzeButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resultArea = document.getElementById('resultArea');
    const scoreResult = document.getElementById('scoreResult');
    const threatList = document.getElementById('threatList');
    const keyPoints = document.getElementById('keyPoints');
    const errorMessage = document.getElementById('errorMessage');

    function displayResults({ score, threats, notes }) {
        resultArea.classList.remove('hidden');
        scoreResult.textContent = `${score}/100`;
        threatList.innerHTML = threats.map(t => `<li>${t}</li>`).join('');
        keyPoints.textContent = notes;
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        resultArea.classList.add('hidden');
    }

    analyzeButton.addEventListener('click', async () => {
        resultArea.classList.add('hidden');
        errorMessage.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        analyzeButton.disabled = true;

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (!tab || !tab.id) throw new Error("No active tab found.");

            const [injectionResult] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });

            const text = injectionResult?.result || '';
            if (!text || text.length < 100)
                throw new Error("Insufficient text on page. Ensure you're on a privacy-related page.");

            const prompt = `
Summarize this privacy policy in three fields:
1. A score out of 100
2. Two to three potential threats (concise)
3. Key parameters such as data collection, sharing, retention

Respond in JSON format like this:
{
  "score": 78,
  "threats": ["May share data with third-parties", "Retains data indefinitely"],
  "notes": "Collects user activity, IP address; allows opt-out but stores cookies permanently"
}

Policy:
${text.slice(0, 15000)}`.trim();

            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            };

            const apiKey = "api";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

            const parsed = JSON.parse(reply);
            displayResults(parsed);
        } catch (err) {
            console.error(err);
            showError(err.message || "Something went wrong.");
        } finally {
            loadingSpinner.classList.add('hidden');
            analyzeButton.disabled = false;
        }
    });
});
