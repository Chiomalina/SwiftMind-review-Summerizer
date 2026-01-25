import express from 'express';
import type { Response, Request } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

// Establish express middleware
app.use(express.json());

const port = process.env.PORT || 3000;

// Anotate types in home route
app.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const { prompt } = req.body;

   const response = await client.responses.create({
      model: 'gpt-40-mini',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
   });

   res.json({ message: response.output_text });
});

// Anotate types in home route
app.get('/api/hello', (req: Request, res: Response) => {
   res.send('Hello Welcome to Summerizer!');
});

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
