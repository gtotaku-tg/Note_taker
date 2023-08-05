const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const port = process.env.PORT || 3001;

//set up express to handle data parsing 
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// Use Routes
app.use(apiRoutes);
app.use(htmlRoutes);
  

app.listen(port, () => {
    console.log(`API server now on port http://localhost:${port}`);
});