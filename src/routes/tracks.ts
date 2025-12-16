import {Router} from 'express';

const router = Router();

const track = [
    {id: 1, title: "Track 1"},
    {id: 2, title: "Track 2"},
    {id: 3, title: "Track 3"},
    {id: 4, title: "Track 4"},
]

let nextId = 5

router.get("/", (req, res) => {
    res.json(track)
})

router.get("/:id", (req, res) => {
    const foundTrack = track.find((t) => t.id === Number(req.params.id));
    if (foundTrack) {
        res.json(foundTrack)
    }
    if (!foundTrack) {
        return res.status(404).json({error: "Not found"})
    }
    res.json(foundTrack)
})

router.post("/", (req, res) => {
        const { title } = req.body;


        // Валидация
        if (!title || typeof title !== "string") {
            return res.status(400).json({
                error: 'title is required and must be a string',
            })
        }

        // Создание трека
        const newTrack = {
            id: nextId++,
            title,
        };

        track.push(newTrack)

        // Ответ
        res.status(201).json(newTrack)
    })

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = track.findIndex((t) => t.id === Number(req.params.id));
   if (index === -1)
       return res.status(404).json({error: "Not found"})

    track.splice(index, 1)
    res.status(204).end('No content')
})

router.patch("/:id", (req, res) => {
    const {id} = req.params;
    const index = track.findIndex((t) => t.id === Number(req.params.id));
    if (index === -1)
        return res.status(404).json({error: "Not found"})

    if (typeof req.body.title === "string") {
        track[index].title = req.body.title;
    }
    res.json(track[index])
})

export default router;
