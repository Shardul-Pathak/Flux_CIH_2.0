document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name && email && subject && message) {
                alert(`Thank you for your message, ${name}!\n\nWe have received your inquiry:\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\n(This is a demo. In a real application, this data would be sent to a server.)`);
                
                // Optionally, clear the form after submission
                contactForm.reset();
            } else {
                alert('Please fill in all fields to send your message.');
            }
        });
    }
});