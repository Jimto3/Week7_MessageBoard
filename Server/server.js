import pg from "pg";
import cors from "cors";
import express, { json } from "express";
import dotenv from "dotenv";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = "8080";
const DatabaseString = process.env.DBKEY;
export const db = new pg.Pool({ connectionString: DatabaseString });

app.listen(PORT, () => {
    console.log("Working");
});

app.get("/", async (req, res) => {
    const data = await db.query(
        "SELECT posts.id, posts.name, posts.message, posts.likes, categories.category FROM posts JOIN categories ON posts.category_id = categories.id"
    );
    res.json(data.rows);
});

app.post("/", (req, res) => {
    // const body = await req.body;
    const name = req.body.name;
    const message = req.body.message;
    const category = req.body.category;
    // res.json(name, message, category);
    db.query(
        "INSERT INTO posts (name, message, category_id, likes) values ($1, $2, $3, $4)",
        [name, message, category, 0]
    );
    res.json("Message has been added :)");
});

app.get("/categories", async (req, res) => {
    const data = await db.query(
        "SELECT categories.id, categories.category AS name FROM categories"
    );
    res.json(data.rows);
});

app.post("/filter", async (req, res) => {
    const id = req.body.category;
    const data = await db.query(
        "SELECT posts.id, posts.name, posts.message, posts.likes, categories.category FROM posts JOIN categories ON posts.category_id = categories.id WHERE categories.id = ($1)",
        [id]
    );
    res.json(data.rows);
});

app.post("/likes", async (req, res) => {
    const { like, id, user_id } = req.body;
    if (like == 1) {
        db.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [id]);
        db.query("INSERT INTO liked (id, message_id) VALUES ($1, $2)", [
            user_id,
            id,
        ]);
    } else {
        db.query("UPDATE posts SET likes = likes - 1 WHERE id = $1", [id]);
        db.query("DELETE FROM liked WHERE id=$1 AND message_id=$2", [
            user_id,
            id,
        ]);
    }
    res.json(`Likes changed`);
});

app.post("/users", async (req, res) => {
    const { username, password } = req.body;
    const data = await db.query(
        "SELECT users.id FROM users WHERE username = ($1) AND password = ($2)",
        [username, password]
    );
    res.json(data.rows);
});

app.post("/add", async (req, res) => {
    const { username, password } = req.body;
    const usernameCheck = await db.query(
        "SELECT users.username FROM users WHERE username = ($1)",
        [username]
    );
    if (usernameCheck.rows.length) {
        res.json(false);
    } else {
        await db.query(
            "INSERT INTO users(username, password) VALUES ($1, $2)",
            [username, password]
        );
        const id = await db.query(
            "SELECT users.id FROM users WHERE username = ($1) AND password = ($2)",
            [username, password]
        );
        res.json(id.rows);
    }
});

app.post("/addmessage", async (req, res) => {
    const { message, category, id } = req.body;
    const data = await db.query(
        "SELECT users.username FROM users WHERE users.id = $1",
        [id]
    );
    const username = data.rows[0].username;
    db.query(
        "INSERT INTO posts(name, message, category_id, likes) VALUES ($1, $2, $3, $4)",
        [username, message, category, 0]
    );
});
