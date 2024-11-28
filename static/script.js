document.getElementById('sendButton').addEventListener('click', function() {
    handleSend();
});

document.getElementById('userInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent the default 'Enter' key action (e.g., submitting a form)
        handleSend();
    }
});

function handleSend() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim()) {
        // Display user message in the conversation box
        appendMessage('user', userInput);

        // Clear input box
        document.getElementById('userInput').value = '';

        // Add the "fetching data" bubble
        appendMessage('bot', "Fetching data from IGDB database...");

        // Send the user input to the backend (Flask)
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            const botReply = data.reply;
            // Remove the "fetching data" bubble and display the actual reply
            removeLastMessage();
            appendMessage('bot', botReply);
        })
        .catch(error => {
            console.error('Error:', error);
            removeLastMessage();
            appendMessage('bot', "Sorry, something went wrong. Please try again.");
        });
    }
}

function appendMessage(sender, message) {
    const conversationBox = document.getElementById('conversationBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    conversationBox.appendChild(messageElement);

    // Scroll to the bottom
    conversationBox.scrollTop = conversationBox.scrollHeight;
}

function removeLastMessage() {
    const conversationBox = document.getElementById('conversationBox');
    conversationBox.removeChild(conversationBox.lastChild);
}

// Auto-scroll to the bottom initially
document.getElementById('conversationBox').scrollTop = document.getElementById('conversationBox').scrollHeight;

// Get the audio element and control buttons
const audio = document.getElementById('backgroundMusic');
const playPauseButton = document.getElementById('playPauseButton');
const muteButton = document.getElementById('muteButton');
const volumeSlider = document.getElementById('volumeSlider');

// Play or Pause the music
playPauseButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
});

// Mute or Unmute the music
muteButton.addEventListener('click', function() {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
});

// Adjust the volume using a slider
volumeSlider.addEventListener('input', function() {
    audio.volume = volumeSlider.value;
});

fetch('Jackhamer.pythonanywhere.com', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userInput })
})
.then(response => response.json())
.then(data => {
    const botReply = data.reply;
    appendMessage('bot', botReply);
})
.catch(error => {
    console.error('Error:', error);
    appendMessage('bot', "Sorry, something went wrong. Please try again.");
});
