// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');
const { fullContext } = require('./knowledgeBase');

const app = express();
const PORT = process.env.PORT || 3000;

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// ĐỌC API KEY TỪ BIẾN MÔI TRƯỜNG (Render Environment Variables)
// ============================================================
// - Trên local: đọc từ file .env
// - Trên Render: đọc từ tab Environment của service
// Cả hai đều truy cập qua process.env.TÊN_BIẾN
// ============================================================
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

// ============ KIỂM TRA KEY KHI KHỞI ĐỘNG ============
console.log('==================================================');
console.log('[ENV] Kiểm tra biến môi trường:');
console.log(`[ENV]   NODE_ENV       = ${process.env.NODE_ENV || '(chưa set)'}`);
console.log(`[ENV]   PORT           = ${PORT}`);
console.log(`[ENV]   DEEPSEEK_MODEL = ${DEEPSEEK_MODEL}`);
console.log(`[ENV]   DEEPSEEK_API_KEY = ${DEEPSEEK_API_KEY ? '✅ Đã có' : '❌ Chưa có'}`);
console.log('==================================================');

if (!DEEPSEEK_API_KEY) {
    console.error('[FATAL] ❌ Không tìm thấy DEEPSEEK_API_KEY!');
    console.error('[FATAL] → Trên local: kiểm tra file .env');
    console.error('[FATAL] → Trên Render: vào tab Environment và thêm biến DEEPSEEK_API_KEY');
    process.exit(1);
}

// Kiểm tra định dạng key (DeepSeek key bắt đầu bằng "sk-")
if (!DEEPSEEK_API_KEY.startsWith('sk-')) {
    console.warn('[WARN] ⚠️  API key không bắt đầu bằng "sk-". Có thể bạn đã dán nhầm key của provider khác.');
}

// Log 6 ký tự đầu để verify (an toàn, không lộ key)
console.log(`[AI] API Key prefix: ${DEEPSEEK_API_KEY.substring(0, 6)}... (length: ${DEEPSEEK_API_KEY.length})`);

// ============ KHỞI TẠO DEEPSEEK CLIENT ============
const client = new OpenAI({
    apiKey: DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com',
});

console.log(`[AI] ✅ Đã khởi tạo DeepSeek client với model: ${DEEPSEEK_MODEL}`);

// ============ API CHAT ============
app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Thiếu nội dung câu hỏi.' });
    }

    console.log(`[CHAT] Nhận câu hỏi: "${message.slice(0, 80)}${message.length > 80 ? '...' : ''}"`);

    try {
        const startTime = Date.now();

        // Xây dựng mảng messages: system + history + câu hỏi mới
        const messages = [
            { role: 'system', content: fullContext },
        ];

        if (Array.isArray(history) && history.length > 0) {
            const trimmed = history.slice(-20);
            for (const h of trimmed) {
                messages.push({
                    role: h.role === 'model' ? 'assistant' : 'user',
                    content: h.text,
                });
            }
        }

        messages.push({ role: 'user', content: message });

        // Gọi DeepSeek API
        const completion = await client.chat.completions.create({
            model: DEEPSEEK_MODEL,
            messages: messages,
            temperature: 0.3,
            max_tokens: 4000,
            top_p: 0.95,
        });

        const responseText = completion.choices[0].message.content;
        const duration = Date.now() - startTime;
        const usage = completion.usage || {};

        console.log(
            `[AI] Phản hồi trong ${duration}ms. ` +
            `Độ dài: ${responseText.length} ký tự. ` +
            `Tokens: input=${usage.prompt_tokens || '?'}, output=${usage.completion_tokens || '?'}`
        );

        res.json({
            success: true,
            reply: responseText,
            duration,
            tokens: usage,
        });
    } catch (error) {
        console.error('[ERROR]', error.message);

        let userMessage = 'Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.';
        if (error.status === 401) {
            userMessage = 'API key DeepSeek không hợp lệ. Vui lòng kiểm tra lại biến môi trường DEEPSEEK_API_KEY trên Render.';
        } else if (error.status === 402) {
            userMessage = 'Tài khoản DeepSeek đã hết số dư. Vui lòng nạp thêm tiền.';
        } else if (error.status === 429) {
            userMessage = 'Quá nhiều yêu cầu. Vui lòng chờ vài giây rồi thử lại.';
        }

        res.status(error.status || 500).json({
            success: false,
            error: userMessage,
        });
    }
});

// ============ HEALTH CHECK (dùng để verify deploy thành công) ============
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        provider: 'deepseek',
        model: DEEPSEEK_MODEL,
        apiKeyConfigured: !!DEEPSEEK_API_KEY,
        apiKeyPrefix: DEEPSEEK_API_KEY ? DEEPSEEK_API_KEY.substring(0, 6) + '...' : null,
        nodeVersion: process.version,
        uptime: process.uptime(),
        env: process.env.NODE_ENV || 'development',
    });
});

// ============ KHỞI ĐỘNG SERVER ============
app.listen(PORT, () => {
    console.log('==================================================');
    console.log(`🌐 SAPD AI Web đang chạy tại cổng: ${PORT}`);
    console.log(`🤖 Provider: DeepSeek | Model: ${DEEPSEEK_MODEL}`);
    console.log(`📚 Đã nạp tài liệu SAPD + Bảng Luật San Andreas`);
    console.log(`🔧 Node.js: ${process.version}`);
    console.log('==================================================');
});
