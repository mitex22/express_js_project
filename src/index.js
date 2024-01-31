const experss = require('express');

const app = experss();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Home Page');
})

app.listen(port, () => (console.log(`Server is listening on port ${port}`)));

