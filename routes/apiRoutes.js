// import 
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
}
);

// POST /api/notes should receive a new note to save on the request body,
router.post("/api/notes", (req, res) => {
    console.log(req.body);
    // read all notes from the db.json file,
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        // add the new note to the array,
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4()
        }
        notes.push(newNote);
        // then rewrite the notes to the db.json file.
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(notes);
        }
        );
    }
    );
}
);
// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
router.delete("/api/notes/:id", (req, res) => {
    // read all notes from the db.json file,
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        // remove the note with the given id property,
        const deleteNotes = notes.filter(note => note.id !== req.params.id);
        // then rewrite the notes to the db.json file.
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes), (err) => {
            if (err) throw err;
            res.json(deleteNotes);
        });
    });
}
);

// export
module.exports = router;