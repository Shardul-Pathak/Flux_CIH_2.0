import express from 'express';
import bcrypt from 'bcrypt';
import collection from './src/db/db.js';
import { genMessage } from './src/gemini/analyzer.js';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

import pageRoutes from './src/routes/pages.js';

app.post('/signup', async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  const existingMail = await collection.findOne({ email: data.email });
  if (existingMail) {
    return res.send('Email already exists');
  }
  else
  {
    const saltRounds=10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const userdata = await collection.insertMany(data);
    res.redirect('/')
    console.log(userdata);
  }
});

app.post('/login', async (req, res) => {
  const check = await collection.findOne({ email: req.body.email });
  if(!check)
  {
    res.send('User not found');
  }
  const isMatch = await bcrypt.compare(req.body.password, check.password);
  if(isMatch)
  {
    res.redirect('/')
  }
  else
  {
    res.send('Invalid credentials');
  }
});

app.post('/api/analyze', async (req, res) => {
    const { policyContent } = req.body;
    if (!policyContent || typeof policyContent !== 'string' || policyContent.trim() === '') {
        return res.status(400).json({ error: "Please provide valid privacy policy content." });
    }

    try {
        const aiResponse = await genMessage(policyContent);
        res.json({ analysis: aiResponse });
    } catch (error) {
        console.error("Server error during policy analysis:", error);
        res.status(500).json({ error: "Failed to analyze policy. Please try again later." });
    }
});

app.use('/', pageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});