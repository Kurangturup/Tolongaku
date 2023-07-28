const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Endpoint untuk menangani data dari form input.html
app.post('/submit', (req, res) => {
  const title = req.body.title;
  const url = req.body.url;

  // Baca data dari listku.js (jika ada)
  const listkuPath = path.join(__dirname, 'listku.js');
  const existingData = fs.existsSync(listkuPath) ? fs.readFileSync(listkuPath, 'utf-8') : '[]';
  const dataList = JSON.parse(existingData);

  // Tambahkan data baru ke dataList
  dataList.push({
    "video": {
      "title": title,
      "url": url
    }
  });

  // Simpan dataList ke listku.js
  fs.writeFileSync(listkuPath, JSON.stringify(dataList, null, 2));

  res.send('Data berhasil ditambahkan!'); // Beri respon bahwa data berhasil ditambahkan
});

// Server berjalan di port 3000
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});