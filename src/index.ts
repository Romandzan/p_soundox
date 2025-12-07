import express, {Request, Response} from "express";

const app = express();
const port = 4001;

app.get('/', (req: Request, res: Response) => {
    res.send("Hello Roman Paleha from Express!!!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
