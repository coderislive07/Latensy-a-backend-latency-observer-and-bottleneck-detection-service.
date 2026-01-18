const express = require('express');
const latencyTracker = require('./middlewares/latencyTracker');
const metricsRouter = require('./routes/metrics');
const app = express();
app.use(latencyTracker);
app.use(express.json());
app.use('/', metricsRouter);

app.get('/test' , (req , res )=>
{
    setTimeout(()=>
    {
        res.status(200).send('Test endpoint response after delay');
    } , 500);
})
app.listen(3000 , ()=>
{
    console.log('API Observer listening on port 3000');
}
);