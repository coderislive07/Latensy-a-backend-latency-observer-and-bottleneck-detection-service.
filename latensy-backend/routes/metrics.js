const express = require('express');
const router = express.Router();

router.post('/metrics', (req, res) => {
    // Here you would typically process and store the metrics received in req.body
    console.log('Received metrics:', req.body);
    res.status(200).send('Metrics received');
});

module.exports = router;