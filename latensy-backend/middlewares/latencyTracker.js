function latencyTracker(req , res , next) 
{
    // to not get in any infinite loop while sending metrics to /metrics endpoint
      if (req.path === '/metrics') {
    return next();
  }
    req._metrics = {
    startTime: process.hrtime(),
    dbTimeMs: 0 , 
    httpTimeMs: 0,
    redisTimeMs: 0
  };
    // process.hrtime ( high resolution time ) is a high-resolution timer in Node.js. It’s commonly used to measure the time taken by a function or a block of code very precisely, much more precise than Date.now().
  
    // res.on is used to listen events like finish close etc on the response object.
    // Hey node , call this function when the response has been fully sent to the client 
    res.on('finish' , async ()=>
    {
        const end = process.hrtime(req._metrics.startTime);
        // first index gives second so we multiply it by 1e3 to convert to milliseconds
        // second index gives nanoseconds so we divide it by 1e6 to convert to milliseconds

        // this is total latency of the request
     const latency = Number((end[0]*1e3 + end[1]/1e6).toFixed(2)); // converting to milliseconds   

        const payload = {
            projectId: process.env.PROJECT_ID || 'demo-project',
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            latencyMs: latency,
            dbTimeMs: req._metrics.dbTimeMs,
            httpTimeMs: req._metrics.httpTimeMs,
            redisTimeMs: req._metrics.redisTimeMs
        };
        // setImmediate is used here to avoid blocking the main thread while sending metrics
        // how main thread can be blocked while sending metrics ?
        //  answer :if the /metrics endpoint is slow or unresponsive , it can block the main thread
    setImmediate(async () => {
    try {
      await fetch('http://localhost:3000/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Metrics send failed:', err.message);
    }
  });
    })
    
    // next is used to pass control to the next middleware function in the stack.
    next();

}
module.exports = latencyTracker;