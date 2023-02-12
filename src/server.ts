import express, {Request, Response} from 'express';
import parser from 'body-parser';
import movieRoutes from './handlers/movie.handler';
import userListRoutes from './handlers/userList.handlers';
const app = express();
const port = 5050;

app.use(parser.json());

app.get('/', (req: Request, res: Response)=>{
    res.send("<h1>Hello World!</h1>");
})

movieRoutes(app);
userListRoutes(app)
app.listen(port, ()=>{
    console.log('Listening on port: '+port);
})

