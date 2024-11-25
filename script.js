const $ = (selector) => document.querySelector(selector);

const hour = $('.hour');
const dot = $('.dot');
const min = $('.min');
const week = $('.week');
const moreDetails = $('.more-details');
let showDot = true;

function update() {
    showDot = !showDot;
    const now = new Date();

    if (showDot) {
        dot.classList.add('invisible');
    } else {
        dot.classList.remove('invisible');
    }

    // Convert to 12-hour format and determine AM/PM
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight

    hour.textContent = String(hours).padStart(2, '0');
    min.textContent = String(now.getMinutes()).padStart(2, '0');

    // Update the current day in the week
    const days = ['Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat'];
    week.textContent = days[now.getDay()];

    // Update month and date in the more-details section
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    moreDetails.textContent = `${months[now.getMonth()]} ${now.getDate()}`;

    // Add AM/PM display
    if (!$('.ampm')) {
        const ampmElement = document.createElement('div');
        ampmElement.className = 'ampm';
        ampmElement.textContent = ampm;
        document.querySelector('.time').appendChild(ampmElement);
    } else {
        $('.ampm').textContent = ampm;
    }
}

setInterval(update, 500);


// feedback height
const feedback = document.getElementById("feedback");

feedback.addEventListener("input", () => {
    feedback.style.height = "35px"; // Reset to initial height to recalculate
    feedback.style.height = Math.min(feedback.scrollHeight, 140) + "px"; // Adjust height dynamically
});



// bot reply for telegram
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const feedbackInput = document.getElementById('feedback');
    const nameInput = document.getElementById('name'); // Retrieve the name input field

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const feedback = feedbackInput.value.trim();
        const name = nameInput.value.trim(); // Get the name value

        if (name && feedback) {
            try {
                const response = await fetch('https://api.telegram.org/bot6595523271:AAFMCKyKyDJSTcOYSQvY3ok4feu1mTIBhSI/sendMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: '5719914218',
                        text: `Name: ${name}\nFeedback: ${feedback}`, // Include name in the message
                    }),
                });

                if (response.ok) {
                    feedbackInput.value = ''; // Clear feedback input
                    nameInput.value = ''; // Clear name input
                    alert('Feedback sent successfully!');
                } else {
                    alert('Failed to send feedback. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send feedback. Please try again.');
            }
        } else {
            alert('Please fill out both your name and feedback before submitting.');
        }
    });
});
