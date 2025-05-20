import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { WebSocketServer } from 'ws';
import http from 'http';
import path from 'path';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// WebSocket 연결 관리
const clients = new Set<WebSocket>();

wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('close', () => {
        clients.delete(ws);
    });
});

// 분석 진행 상태를 모든 클라이언트에게 브로드캐스트
function broadcastStatus(stepId: number, status: string) {
    const message = JSON.stringify({
        type: 'step_update',
        stepId,
        status
    });

    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// 분석 API 엔드포인트
app.post('/api/analyze', upload.single('image'), async (req, res) => {
    try {
        const { text } = req.body;
        const imageFile = req.file;

        // 분석 시작
        broadcastStatus(1, 'loading');

        // 각 단계별 분석 시뮬레이션
        for (let step = 1; step <= 8; step++) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // 각 단계별 2초 딜레이
            broadcastStatus(step, 'completed');

            if (step < 8) {
                broadcastStatus(step + 1, 'loading');
            }
        }

        res.json({ message: '분석이 완료되었습니다.' });
    } catch (error) {
        console.error('분석 중 오류 발생:', error);
        res.status(500).json({ error: '분석 중 오류가 발생했습니다.' });
    }
});

// 서버 시작
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
}); 