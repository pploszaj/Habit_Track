import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000; 

app.use(express.json());

app.get('/load', (req: Request, res: Response) => {
  res.json('Hello, World!');
});

app.get('/save', (req: Request, res: Response) => {

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
