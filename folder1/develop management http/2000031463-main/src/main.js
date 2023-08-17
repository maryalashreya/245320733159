const express = require('express');
const axios = require('axios');

const app = express();

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).send('Please provide at least one URL');
  }

  const promises = urls.map(url => axios.get(url));

  try {
    const responses = await Promise.all(promises);
    const numbers = responses.map(response => response.data.numbers).flat();
    res.json({ numbers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
