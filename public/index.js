const analyzeButton = document.getElementById("analyzeButton");
const result= document.getElementById("result");

const getMessage = async () => {
    const currentPolicyContent = document.getElementById("policy").value;
    if (currentPolicyContent.trim() === "") {
        result.innerHTML = "<p class='text-red-500 font-bold text-2xl'>Please enter some privacy policy content to analyze.</p>";
        result.scrollTop = 0;
        return;
    }

    console.log("Fetching policy content...");
    result.innerHTML = "<p class='text-white'>Analyzing policy...</p>";
    result.scrollTop = 0;

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ policyContent: currentPolicyContent }),
        });
        if (!response.ok) {
            console.error("Server responded with an error:");
            const errorData = await response.json();
            console.error("Error details:", errorData);
            throw new Error(errorData.error || `Server error: ${response.statusText}`);
        }

        const data = await response.json();
        result.innerHTML = `<p class='whitespace-pre-wrap'>${data.analysis}</p>`;
        result.scrollTop = 0;
    } catch (error) {
        console.error("Client-side error during analysis:", error);
        result.innerHTML = `<p class='text-red-500'>${error.message || "An unexpected error occurred while processing your request."}</p>`;
    }
};

analyzeButton.addEventListener('click', getMessage);