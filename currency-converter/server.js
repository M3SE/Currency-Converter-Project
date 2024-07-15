const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));  // Assuming your HTML/CSS/JS files are in the 'public' directory

// Database setup
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Favorite = sequelize.define('Favorite', {
    base: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync();

// Routes
app.post('/favorites', async (req, res) => {
    const { base, target } = req.body;
    const favorite = await Favorite.create({ base, target });
    res.json(favorite);
});

app.get('/favorites', async (req, res) => {
    const favorites = await Favorite.findAll();
    res.json(favorites);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
