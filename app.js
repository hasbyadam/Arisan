const express = require("express");
const app = express();
require("./startup")(app);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Connected')
})

app.listen(port, () => console.log(`Listening to ${port}`));
