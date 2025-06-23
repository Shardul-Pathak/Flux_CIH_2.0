document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignupLink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    // Function to show the signup form
    if (showSignupLink) {
        showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        });
    }

    // Function to show the login form
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }

    // Handle Login Button Click
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default form submission
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (email && password) {
                // In a real application, you would send this data to your backend for authentication
                // If authentication is successful, then redirect.
                alert(`Attempting to log in with: \nEmail: ${email}\nPassword: ${password}\n(This is a demo. Simulating successful login.)`);

                // !!! IMPORTANT REDIRECTION LOGIC !!!
                // Redirect to 'afterindex.html' which is in 'AfterLogin' folder
                // and 'AfterLogin' is now a sub-folder of the current directory ('front')
                window.location.href = 'AfterLogin/afterindex.html'; // Path relative to login.html

            } else {
                alert('Please enter both email and password for login.');
            }
        });
    }

    // Handle Signup Button Click
    if (signupButton) {
        signupButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default form submission
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (email && password && confirmPassword) {
                if (password === confirmPassword) {
                    alert(`Attempting to sign up with: \nEmail: ${email}\nPassword: ${password}\n(This is a demo. In a real app, you'd send this to a server!)`);
                    // In a real application, you would send this data to your backend for user registration
                    // Example: After successful signup, you might redirect them to the login page or directly to afterindex.html
                    // For now, we'll just alert.
                } else {
                    alert('Passwords do not match.');
                }
            } else {
                alert('Please fill in all fields for signup.');
            }
        });
    }
});