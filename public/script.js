// script.js
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');

// Lịch sử chat (dùng để AI nhớ ngữ cảnh)
let conversationHistory = [];
const MAX_HISTORY = 10; // Chỉ gửi 10 cặp tin nhắn gần nhất để tiết kiệm token

// ============ GỬI TIN NHẮN ============
async function sendMessage(text) {
    if (!text.trim()) return;

    // 1. Hiển thị tin nhắn của user
    appendMessage('user', text);
    userInput.value = '';
    userInput.style.height = 'auto';
    sendBtn.disabled = true;

    // 2. Hiển thị "đang gõ..."
    const typingEl = showTyping();

    try {
        // 3. Gọi API backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: text,
                history: conversationHistory.slice(-MAX_HISTORY),
            }),
        });

        const data = await response.json();

        // 4. Xóa typing indicator
        typingEl.remove();

        if (data.success) {
            // Hiển thị câu trả lời
            appendMessage('bot', data.reply);

            // Lưu vào lịch sử
            conversationHistory.push({ role: 'user', text });
            conversationHistory.push({ role: 'model', text: data.reply });

            // Giữ lịch sử gọn gàng
            if (conversationHistory.length > MAX_HISTORY * 2) {
                conversationHistory = conversationHistory.slice(-MAX_HISTORY * 2);
            }
        } else {
            appendMessage('bot', `❌ ${data.error || 'Đã xảy ra lỗi.'}`);
        }
    } catch (err) {
        typingEl.remove();
        console.error(err);
        appendMessage('bot', '❌ Không thể kết nối tới server. Vui lòng kiểm tra kết nối.');
    } finally {
        sendBtn.disabled = false;
        userInput.focus();
    }
}

// ============ HIỂN THỊ TIN NHẮN ============
function appendMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = `message ${role === 'user' ? 'user-message' : 'bot-message'}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = role === 'user' ? '👤' : '🤖';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = formatText(text);

    msg.appendChild(avatar);
    msg.appendChild(bubble);
    chatBox.appendChild(msg);
    scrollToBottom();
}

// ============ FORMAT VĂN BẢN (markdown đơn giản) ============
function formatText(text) {
    // Escape HTML để tránh XSS
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // In đậm: **text**
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // In nghiêng: *text*
    html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

    // Code inline: `code`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Xuống dòng
    html = html.replace(/\n/g, '<br>');

    return html;
}

// ============ TYPING INDICATOR ============
function showTyping() {
    const msg = document.createElement('div');
    msg.className = 'message bot-message typing';
    msg.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="bubble">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatBox.appendChild(msg);
    scrollToBottom();
    return msg;
}

// ============ SCROLL ============
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ============ SỰ KIỆN FORM ============
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(userInput.value);
});

// Enter để gửi, Shift+Enter để xuống dòng
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(userInput.value);
    }
});

// Auto-resize textarea
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
});

// ============ GỢI Ý NHANH ============
document.querySelectorAll('.suggestion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        sendMessage(btn.dataset.q);
    });
});

// ============ XÓA LỊCH SỬ ============
clearBtn.addEventListener('click', () => {
    if (!confirm('Bạn có chắc muốn xóa toàn bộ cuộc trò chuyện?')) return;
    conversationHistory = [];
    chatBox.innerHTML = '';
    appendMessage(
        'bot',
        'Cuộc trò chuyện đã được xóa. Bạn có thể bắt đầu câu hỏi mới!'
    );
    userInput.focus();
});

// ============ FOCUS BAN ĐẦU ============
userInput.focus();