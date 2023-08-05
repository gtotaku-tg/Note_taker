const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

//set up express to handle data parsing 
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// Use Routes
app.use("/api", apiRoutes);
app.use("/",htmlRoutes);
  
// Wildcard route to direct users to a homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () => {
    console.log(`API listening at http://localhost:${PORT}!`);
});