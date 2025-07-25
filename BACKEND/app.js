const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log("failed to connect"));

console.log(process.env.MONGODB_URI)
    // Design Book Schema
const BookSchema = new mongoose.Schema({
        title: String,
        author: String,
        date: String,
        image: String
    })
    // Design Model 
const Book = mongoose.model('MyBook', BookSchema)

app.post('/books', async(req, res) => {
    try {
        const NewBook = new Book(req.body);
        await NewBook.save();
        res.json(Book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')

    }
})

app.get('/books', async(req, res) => {
    try {
        const Books = await Book.find();
        res.json(Books);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')

    }
})
app.get('/books/:id', async(req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book)
        return res.status(404).send('Book Not Found')
    res.json(book)
})

app.get('/search', async(req, res) => {
    const { title } = req.query;
    try {
        const books = await Book.find({ title: { $regex: title, $options: 'i' } }); // case-insensitive search
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

app.put('/books/:id', async(req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body)
    if (!book)
        return res.status(404).send('Book Not Found')
    res.json(book)
})
app.listen(9000, () => {
    console.log('server is running on port 9000')
})