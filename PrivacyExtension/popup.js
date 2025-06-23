document.addEventListener('DOMContentLoaded', function() {
    const analyzeButton = document.getElementById('analyzeButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resultDiv = document.getElementById('result');
    const errorMessageDiv = document.getElementById('errorMessage');

    function displayMessage(message, isError = false) {
        resultDiv.textContent = message;
        if (isError) {
            errorMessageDiv.textContent = message;
            errorMessageDiv.classList.remove('hidden');
            resultDiv.classList.add('hidden');
        } else {
            errorMessageDiv.classList.add('hidden');
            resultDiv.classList.remove('hidden');
        }
    }

    analyzeButton.addEventListener('click', async () => {
        displayMessage("Extracting policy text...");
        loadingSpinner.style.display = 'block';
        analyzeButton.disabled = true;

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (!tab || !tab.id) {
                displayMessage("Could not find active tab.", true);
                return;
            }
            const [results] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });

            const pageText = results && results.result ? results.result : '';

            if (!pageText || pageText.length < 100) {
                displayMessage("Could not extract sufficient text from the page. Please ensure you are on a privacy policy page.", true);
                loadingSpinner.style.display = 'none';
                analyzeButton.disabled = false;
                return;
            }

            displayMessage("Text extracted. Analyzing with Gemini...");
            console.log("Page text length:", pageText.length);

            const MAX_TEXT_LENGTH = 15000;
            const policyToAnalyze = pageText.substring(0, MAX_TEXT_LENGTH);

            if (pageText.length > MAX_TEXT_LENGTH) {
                displayMessage(`Policy text truncated to ${MAX_TEXT_LENGTH} characters for analysis. This might affect completeness. Analyzing...`);
            }

            const prompt = `Summarize this privacy policy, highlighting key points about data collection, usage, sharing, user rights, and data retention. Identify any potentially concerning clauses or unusual practices regarding user privacy give the policy a score between 1 to 100(don not exceed 50 words and just give 2-3 potential threats and score only):\n\n${policyToAnalyze}`;

            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });

            const payload = { contents: chatHistory };
            const apiKey = "AIzaSyATBMahZQ10Vb9NB482J1_efMdjLxDEvxs";

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Gemini API error:", errorData);
                throw new Error(`Gemini API responded with status ${response.status}: ${errorData.error.message || 'Unknown error'}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const analysisText = result.candidates[0].content.parts[0].text;
                displayMessage(analysisText);
            } else {
                displayMessage("Gemini did not return a valid analysis. Please try again.", true);
                console.error("Unexpected Gemini response structure:", result);
            }

        } catch (error) {
            console.error("Error during analysis:", error);
            displayMessage(`An error occurred: ${error.message}. Please check the console for details.`, true);
        } finally {
            loadingSpinner.style.display = 'none';
            analyzeButton.disabled = false;
        }
    });
});