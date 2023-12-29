const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb://localhost:27017/test1';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const itemSchema = new mongoose.Schema({
  id: Number,
  materials: String,
  productionCost: Number,
  consumptionItems: String,
});

const Item = mongoose.model('Item', itemSchema);

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = req.body;
    const item = await Item.findByIdAndUpdate(itemId, updatedItem, { new: true });
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(400).json({ message: error.message });
  }
});


app.delete('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    await Item.findByIdAndDelete(itemId); 
    res.status(200).send({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
