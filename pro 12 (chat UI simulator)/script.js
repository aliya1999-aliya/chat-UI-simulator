
/* ============================================================
   CHAT UI SIMULATOR — JAVASCRIPT LOGIC
   Fully commented, beginner-friendly
============================================================ */

/* ---------- DOM ELEMENTS ---------- */
const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const clearChat = document.getElementById("clearChat");
const downloadChat = document.getElementById("downloadChat");
const toggleMode = document.getElementById("toggleMode");

/* ---------- Load chat history on startup ---------- */
window.onload = () => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) chatContainer.innerHTML = saved;
    scrollToBottom();
};

/* ---------- Helpers ---------- */
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function saveHistory() {
    localStorage.setItem("chatHistory", chatContainer.innerHTML);
}

/* ---------- Create message bubble ---------- */
function addMessage(text, sender = "user") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);

    msg.innerHTML = `
        ${text}
        <div class="timestamp">${new Date().toLocaleTimeString()}</div>
    `;

    chatContainer.appendChild(msg);
    saveHistory();
    scrollToBottom();
}

/* ---------- Typing indicator ---------- */
function showTyping() {
    const bubble = document.createElement("div");
    bubble.classList.add("message", "bot");
    bubble.id = "typingIndicator";

    bubble.innerHTML = `
        <div class="typing">
            <span></span><span></span><span></span>
        </div>
    `;

    chatContainer.appendChild(bubble);
    scrollToBottom();
}

function removeTyping() {
    const el = document.getElementById("typingIndicator");
    if (el) el.remove();
}

/* ============================================================
   SMART AUTO-REPLY ENGINE (Rule-Based AI)
============================================================ */
function generateAIReply(message) {
    const msg = message.toLowerCase();

    // 1. Greetings
    if (/(hello|hi|hey)/.test(msg))
        return "Hi there! 👋 How can I assist you?";

    // 2. Questions
    if (msg.endsWith("?"))
        return "That's a great question! Here's what I think…";

    // 3. Emotional keywords
    if (/sad|tired|angry|happy/.test(msg))
        return "I hear you. Your feelings matter — tell me more.";

    // 4. Tasks / Requests
    if (/help|create|build|explain/.test(msg))
        return "Sure! Here's what you can do:\n1. Describe your goal\n2. Provide details\n3. I’ll guide you 😊";

    // 5. Statements
    if (msg.length > 5)
        return "Interesting point! Can you elaborate a bit?";

    // 6. Unknown input
    return "I'm not fully sure — can you tell me more?";
}

/* ---------- Send message workflow ---------- */
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // User message
    addMessage(text, "user");
    messageInput.value = "";

    // Typing indicator
    showTyping();

    // Simulated delay
    setTimeout(() => {
        removeTyping();
        const reply = generateAIReply(text);
        addMessage(reply, "bot");
    }, 1500);
}

/* ---------- Download chat as TXT ---------- */
downloadChat.onclick = () => {
    const text = chatContainer.innerText;
    const blob = new Blob([text], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat_history.txt";
    link.click();
};

/* ---------- Clear chat ---------- */
clearChat.onclick = () => {
    chatContainer.innerHTML = "";
    localStorage.removeItem("chatHistory");
};

/* ---------- Enter key sends message ---------- */
messageInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});

/* ---------- Send button ---------- */
sendBtn.onclick = sendMessage;

/* ---------- Light/Dark mode toggle ---------- */
toggleMode.onclick = () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
};
