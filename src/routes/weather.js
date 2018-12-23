const express = require('express');
const router = express.Router();

router.get('/weather', (req, res) => {
    res.send({
        location: 'berhampur',
        temperature: 22,
        unit: 'celcius',
        ram: ram
    });
});

module.exports = router