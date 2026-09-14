// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenAI } = require('@google/genai'); // SDK MỚI
const { fullContext } = require('./knowledgeBase');

const app = express();
const PORT = process.env.PORT || 3000;

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ============ KHỞI TẠO GEMINI ============
const GEMINI_MODEL = "gemini-3.6-flash"; // Model mới

// Kiểm tra API key có tồn tại không
if (!process.env.GEMINI_API_KEY) {
    console.error('[FATAL] GEMINI_API_KEY chưa được cấu hình trong biến môi trường!');
    process.exit(1);
}

// SDK mới: khởi tạo client với API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

console.log(`[AI] Đã khởi tạo SDK @google/genai với model: ${GEMINI_MODEL}`);
console.log(`[AI] API Key prefix: ${process.env.GEMINI_API_KEY.substring(0, 4)}...`);

// ============ API CHAT ============
app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Thiếu nội dung câu hỏi.' });
    }

    console.log(`[CHAT] Nhận câu hỏi: "${message.slice(0, 80)}${message.length > 80 ? '...' : ''}"`);

    try {
        const startTime = Date.now();

        // SDK mới: cấu hình nằm trong đối tượng config khi gọi generateContent
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: message,
            config: {
                systemInstruction: fullContext,
            },
        });

        // SDK mới: truy cập text trực tiếp qua thuộc tính .text
        const responseText = response.text;

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
        sdk: '@google/genai',
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