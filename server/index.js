const express = require('express');
const fetch = globalThis.fetch; // Esto debería funcionar si estás usando una versión moderna
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.YOUTUBE_API_KEY;

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=5&order=viewCount&key=${API_KEY}`;


  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error en la búsqueda:', err);
  
    // Mostrar más información si está vacía
    if (err instanceof Error) {
      console.error('Mensaje:', err.message);
      console.error('Stack:', err.stack);
    }
  
    res.status(500).json({ error: 'Error al buscar en YouTube', message: err.message });
  }
  
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor backend corriendo en http://localhost:${PORT}`));
