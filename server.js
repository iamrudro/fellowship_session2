const express = require('express');
const mongoose = require('mongoose');
const subscribersRouter = require('./routes/subscribers');

const app = express();
app.use(express.json());
app.use('/', subscribersRouter);

module.exports = app;

if (require.main === module) {
    mongoose.connect('mongodb://localhost/subscribers', { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('Connected to Database'));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
}
