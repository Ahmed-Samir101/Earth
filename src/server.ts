import express, { Request, Response } from 'express';
import parser from 'body-parser';
import movieRoutes from './handlers/movie.handler';
import userListRoutes from './handlers/userList.handlers';
import userRoutes from './handlers/users.handler';
const app = express();
const port = 7000;

app.use(parser.json());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello World!</h1>');
});

movieRoutes(app);
userListRoutes(app);
userRoutes(app);
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});

export default app;
