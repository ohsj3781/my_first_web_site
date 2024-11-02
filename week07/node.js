const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const fs=require('fs');
const PORT = 8888;

let musicData = [];

app.use(bodyParser.json());

if(fs.existsSync('musicData.json')){
    const rawData=fs.readFileSync('musicData.json','utf-8');
    musicData=JSON.parse(rawData);
    console.log('Data loaded from musicData.json');
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ajax_index.html');
})

app.post('/submit', (req, res) => {
    const { songName, artist } = req.body;

    if (songName && artist) {
        const newMusic = { index: musicData.length + 1, songName, artist };
        musicData.push(newMusic);

        fs.writeFileSync('musicData.json',JSON.stringify(musicData,null,2),'utf-8');
        console.log('New music added:', newMusic);

        res.json({ message: `"${songName}" by ${artist} has been added!`, musicList: musicData });
    } else {
        res.status(400).json({ message: 'Invali input. Music name and artist are required.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});