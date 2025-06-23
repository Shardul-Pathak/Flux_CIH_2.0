document.getElementById('analyzeButton').addEventListener('click', function() {
    const policyText = document.getElementById('policyInput').value;
    const resultsSection = document.getElementById('analysisResults');
    const resultsContent = document.getElementById('resultsContent');

    if (policyText.trim() === '') {
        resultsContent.innerHTML = '<p class="text-red-400">Please paste a privacy policy to analyze.</p>';
        resultsSection.classList.remove('hidden');
        return;
    }

    resultsContent.innerHTML = `
        <div class="flex items-center justify-center space-x-2 text-accent-cyan animate-pulse">
            <svg class="animate-spin h-8 w-8 text-accent-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-xl">Analyzing your policy... This might take a moment.</p>
        </div>
    `;
    resultsSection.classList.remove('hidden');

    // Simulate an API call for analysis
    setTimeout(() => {
        const analysisResult = `
            <div class="space-y-8">
                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">1. Transparency and Clarity <span class="text-white">(Score: 8/15)</span></h3>
                    <p class="text-gray-300 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy is short and uses relatively straightforward language, making it easy to read. However, it lacks specific details about the types of personal information collected, which reduces overall transparency.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> Clearly list all categories of personal information collected (e.g., name, email, IP address, usage data).</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">2. Data Collection Practices <span class="text-white">(Score: 5/15)</span></h3>
                    <p class="text-gray-300 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy broadly mentions "your personal information" but does not detail how this information is collected (e.g., directly from user input, automatically through cookies, from third parties).</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> Provide specific examples of personal data collected and the methods of collection. Mention if sensitive data is collected and how it's handled.</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">3. Purpose of Processing and Lawful Basis <span class="text-white">(Score: 10/15)</span></h3>
                    <p class="text-gray-300 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy explicitly states personal information will be used for "promotional materials if you agree to this privacy policy." It also mentions disclosure if "the law forces us." Consent is implied as a lawful basis for promotional materials, and legal obligation for forced disclosure.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> Detail all purposes for data processing and explicitly state the lawful basis for each purpose (e.g., consent, contractual necessity, legitimate interests, legal obligation).</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">4. Data Sharing and Disclosure <span class="text-white">(Score: 12/15)</span></h3>
                    <p class="text-gray-300 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy clearly states that "[company name] will not lease, sell or distribute your personal information to any third parties, unless we have your permission. We might do so if the law forces us." This provides a good level of clarity on sharing practices and exceptions.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> While clear on the general rule, consider providing examples of scenarios where data might be shared with permission (e.g., service providers) and what constitutes "the law forces us."</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">5. Data Security Measures <span class="text-white">(Score: 0/10)</span></h3>
                    <p class="text-red-400 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy contains no information regarding the security measures taken to protect personal information from unauthorized access, disclosure, alteration, or destruction. This is a critical omission.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> Include a section detailing security practices (e.g., encryption, access controls, regular audits, employee training). This builds user trust.</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">6. User Rights and Control <span class="text-white">(Score: 6/10)</span></h3>
                    <p class="text-gray-300 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy states users can "contact us via email and we will be more than happy to change this for you" if they have agreed to share information. This implies a right to withdraw consent or modify preferences.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> Explicitly list all applicable user rights (e.g., right to access, rectification, erasure, restriction of processing, data portability, objection) and explain how users can exercise these rights.</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">7. Data Retention and Deletion Policies <span class="text-white">(Score: 0/5)</span></h3>
                    <p class="text-red-400 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy provides no information on how long personal data is retained or the procedures for its deletion once it's no longer needed for its original purpose.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> Specify data retention periods for different types of data and outline the process for data deletion or anonymization.</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">8. International Data Transfers <span class="text-white">(Score: 0/5)</span></h3>
                    <p class="text-red-400 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> There is no mention of whether personal information is transferred to or processed in countries outside the user's jurisdiction, or the safeguards in place for such transfers.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> If data is transferred internationally, state the countries involved and the mechanisms used to ensure adequate protection (e.g., standard contractual clauses, adequacy decisions).</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">9. Special Categories of Data / Specific User Groups <span class="text-white">(Score: 0/5)</span></h3>
                    <p class="text-red-400 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy does not address how special categories of data (e.g., health, genetic, biometric) are handled, nor does it provide specific provisions for protecting the privacy of particular user groups like children.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> If applicable, detail how sensitive data is processed. If services are directed at children, include specific age verification and parental consent mechanisms.</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">10. Policy Updates and Compliance <span class="text-white">(Score: 0/5)</span></h3>
                    <p class="text-red-400 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy does not mention how changes or updates to the privacy policy will be communicated to users, nor does it reference any compliance frameworks or laws.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> State how and when policy updates will be communicated (e.g., email notification, prominent website banner) and mention any relevant privacy regulations adhered to (e.g., GDPR, CCPA).</p>
                </div>

                <div class="bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-700 hover:border-accent-cyan transition-all duration-300">
                    <h3 class="text-2xl font-semibold text-accent-blue mb-4">11. Contact and Redressal Mechanisms <span class="text-white">(Score: 3/5)</span></h3>
                    <p class="text-gray-300 mb-3"><span class="font-bold text-accent-cyan">Findings:</span> The policy provides an email contact for users to change sharing preferences. However, it does not outline a clear process for lodging complaints or seeking redressal for privacy concerns.</p>
                    <p class="text-gray-400"><span class="font-bold text-white">Recommendation:</span> Provide clear contact details for privacy-related inquiries (e.g., a dedicated DPO or privacy office) and outline a formal complaint resolution process or a link to a supervisory authority.</p>
                </div>
            </div>
        `;
        resultsContent.innerHTML = analysisResult;
    }, 2000); // Simulate 2 seconds delay for analysis
});