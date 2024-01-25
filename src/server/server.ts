import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000; 

app.use(express.json());

app.get('/hi', (req: Request, res: Response) => {
  console.log('hello world');
  res.json('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
