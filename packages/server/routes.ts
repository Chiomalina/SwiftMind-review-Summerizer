import express from 'express';
import { chatController } from './controllers/chat.controller';
import type { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

// Anotate types in home route
router.get('/api/hello', (req: Request, res: Response) => {
   res.send('Hello Welcome to Summerizer!');
});

// store previous response to enable chatgpt remember conversations
let lastResponseId: string | null = null;
// conversationId -> lastResponseId
// conv1 -> 100
// conv2 -> 200

router.post('/api/chat', chatController.sendMessage);

export default router;
