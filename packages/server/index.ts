import express from 'express';
import type { Response, Request } from 'express';
import dotenv from 'dotenv';
import z from 'zod';
import { chatService } from './services/chat.service';

dotenv.config();

const app = express();

// Establish express middleware
app.use(express.json());

const port = process.env.PORT || 3000;

// Anotate types in home route

app.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

// store previous response to enable chatgpt remember conversations
let lastResponseId: string | null = null;
// conversationId -> lastResponseId
// conv1 -> 100
// conv2 -> 200

//Input validation with zod
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required. ')
      .max(1000, 'Prompt is too long (max 1000 characters)'),

   // z.string().uuid() is deprecated so we use only z.uuid()
   conversationId: z.uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   // Validate incoming request data with handler (zod)
   const parsedResult = chatSchema.safeParse(req.body);

   // Catch and handle thrown error
   if (!parsedResult.success) {
      // 'parsedResult.error.format' is deprecated.ts(6387) so we Use the z.treeifyError(err) function instead.
      res.status(400).json(z.treeifyError(parsedResult.error));
      return;
   }

   // Error handling to catch all types of error(browser error, server error, network error etc)
   try {
      const { prompt, conversationId } = req.body;
      const response = await chatService.sendMessage(prompt, conversationId);

      res.json({ message: response.message });
   } catch (error) {
      res.status(500).json({ error: 'Failed to generate a response' });
   }
});

// Anotate types in home route
app.get('/api/hello', (req: Request, res: Response) => {
   res.send('Hello Welcome to Summerizer!');
});

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
