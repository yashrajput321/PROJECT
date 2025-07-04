import express from 'express';
import cors from 'cors';
import businessRoutes from './routes/business.js'; 
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/', businessRoutes); 

app.get('/', (req, res) => {
  res.send('✅ Backend is alive!');
});


app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
