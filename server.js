// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { fullContext } = require('./knowledgeBase');

const app = express();
const PORT = process.env.PORT || 3000;

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ============ KHỞI TẠO GEMINI ============
const GEMINI_MODEL = "gemini-3.6-flash";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: fullContext,
});

console.log(`[AI] Đã khởi tạo model: ${GEMINI_MODEL}`);

// ============ API CHAT ============
app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Thiếu nội dung câu hỏi.' });
    }

    console.log(`[CHAT] Nhận câu hỏi: "${message.slice(0, 80)}${message.length > 80 ? '...' : ''}"`);

    try {
        const startTime = Date.now();

        // Nếu có lịch sử chat, dùng chat session để AI nhớ ngữ cảnh
        let responseText;
        if (Array.isArray(history) && history.length > 0) {
            const chat = model.startChat({
                history: history.map((h) => ({
                    role: h.role, // 'user' hoặc 'model'
                    parts: [{ text: h.text }],
                })),
            });
            const result = await chat.sendMessage(message);
            responseText = result.response.text();
        } else {
            const result = await model.generateContent(message);
            responseText = result.response.text();
        }

        const duration = Date.now() - startTime;
        console.log(`[AI] Phản hồi trong ${duration}ms. Độ dài: ${responseText.length} ký tự.`);

        res.json({
            success: true,
            reply: responseText,
            duration,
        });
    } catch (error) {
        console.error('[ERROR]', error.message);
        res.status(500).json({
            success: false,
            error: 'Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.',
        });
    }
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        model: GEMINI_MODEL,
        uptime: process.uptime(),
    });
});

// ============ KHỞI ĐỘNG SERVER ============
app.listen(PORT, () => {
    console.log('==================================================');
    console.log(`🌐 SAPD AI Web đang chạy tại: http://localhost:${PORT}`);
    console.log(`🤖 Model: ${GEMINI_MODEL}`);
    console.log(`📚 Đã nạp tài liệu SAPD + Bảng Luật San Andreas`);
    console.log('==================================================');
});