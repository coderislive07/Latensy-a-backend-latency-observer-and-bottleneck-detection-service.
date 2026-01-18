const express = require('express');
const router = express.Router();
const { saveMetrics } = require('../services/metricsService');


router.post('/metrics', async (req, res) => {
    try
    {
        await saveMetrics(req.body);    
        res.status(200).send('Metrics saved successfully');

    }
    catch(err)
    {
        console.error('Error saving metrics:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;