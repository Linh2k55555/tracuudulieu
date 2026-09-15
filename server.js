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

// ============ CẤU HÌNH DEEPSEEK ============
// Model khả dụng: "deepseek-chat" (V3), "deepseek-reasoner" (R1)
// - deepseek-chat: nhanh, rẻ, phù hợp cho tra cứu tài liệu
// - deepseek-reasoner: suy luận sâu hơn, chậm hơn, đắt hơn
const DEEPSEEK_MODEL = "deepseek-chat";

if (!process.env.DEEPSEEK_API_KEY) {
    console.error('[FATAL] DEEPSEEK_API_KEY chưa được cấu hình!');
    process.exit(1);
}

const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com',
});

console.log(`[AI] Đã khởi tạo DeepSeek client với model: ${DEEPSEEK_MODEL}`);
console.log(`[AI] API Key prefix: ${process.env.DEEPSEEK_API_KEY.substring(0, 6)}...`);

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

        // Thêm lịch sử chat nếu có (giữ tối đa 10 cặp để tiết kiệm token)
        if (Array.isArray(history) && history.length > 0) {
            const trimmed = history.slice(-20); // 10 cặp user/model
            for (const h of trimmed) {
                messages.push({
                    role: h.role === 'model' ? 'assistant' : 'user',
                    content: h.text,
                });
            }
        }

        messages.push({ role: 'user', content: message });

        // Gọi DeepSeek API (tương thích OpenAI)
        const completion = await client.chat.completions.create({
            model: DEEPSEEK_MODEL,
            messages: messages,
            temperature: 0.3,      // Thấp để trả lời chính xác, ít sáng tạo
            max_tokens: 4000,      // Giới hạn độ dài câu trả lời
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

        // Phân loại lỗi để trả về thông báo phù hợp
        let userMessage = 'Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.';
        if (error.status === 401) {
            userMessage = 'API key DeepSeek không hợp lệ. Vui lòng kiểm tra lại.';
        } else if (error.status === 402) {
            userMessage = 'Tài khoản DeepSeek đã hết số dư. Vui lòng nạp thêm.';
        } else if (error.status === 429) {
            userMessage = 'Quá nhiều yêu cầu. Vui lòng chờ vài giây rồi thử lại.';
        }

        res.status(error.status || 500).json({
            success: false,
            error: userMessage,
        });
    }
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        provider: 'deepseek',
        model: DEEPSEEK_MODEL,
        uptime: process.uptime(),
    });
});

// ============ KHỞI ĐỘNG SERVER ============
app.listen(PORT, () => {
    console.log('==================================================');
    console.log(`🌐 SAPD AI Web đang chạy tại: http://localhost:${PORT}`);
    console.log(`🤖 Provider: DeepSeek | Model: ${DEEPSEEK_MODEL}`);
    console.log(`📚 Đã nạp tài liệu SAPD + Bảng Luật San Andreas`);
    console.log('==================================================');
});
