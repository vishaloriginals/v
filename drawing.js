document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const fileInput = document.getElementById('file');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const file = fileInput.files[0]; // Get the selected file

        if (!name || !phone || !email || !file) {
            alert('Please fill out all fields and upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('chat_id', '5719914218'); // Replace with your Telegram chat ID
        formData.append('document', file); // Send the file as a document
        formData.append(
            'caption',
            `Name: ${name}\nPhone: ${phone}\nEmail: ${email}` // Include details in the caption
        );

        try {
            const response = await fetch(`https://api.telegram.org/bot6595523271:AAFMCKyKyDJSTcOYSQvY3ok4feu1mTIBhSI/sendDocument`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Form submitted successfully !');
                nameInput.value = '';
                phoneInput.value = '';
                emailInput.value = '';
                fileInput.value = '';
            } else {
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit the form. Please try again.');
        }
    });
});


// Get the file input and file name display elements
const fileInput = document.getElementById('file');
const fileNameDisplay = document.querySelector('.choose');

// Update the file name display when a file is selected
fileInput.addEventListener('change', function () {
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = 'No file chosen';
  }
});
