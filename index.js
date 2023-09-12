const axios = require('axios');
const fs = require('fs');
const http = require('http');

async function saveMockData (resolve) {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    fs.writeFile('posts.json', JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }

        resolve();
    });
}


http.createServer(async (req, res) => {
    if (req.url === '/posts') {

        const promise = new Promise((resolve) => {
            saveMockData(resolve);
        });

        await promise;

        fs.readFile('posts.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.write(data);
            res.end();

        });
    } else {
        res.write('OK');
        res.end();
    }
})
    .listen(3000);