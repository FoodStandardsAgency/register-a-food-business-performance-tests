//
// Custom Artillery functions to print the latency distribution for a single HTTP request
//
// Example usage: (in your scenario)
// - get:
//     url: "/some/endpoint"
//     beforeRequest: ["recordStartTime"]
//     afterResponse: ["logLatencyDelta"]
//     name: "Optional name for the endpoint for the report"

module.exports = {
    recordStartTime: recordStartTime,
    logLatencyDelta: logLatencyDelta
};

/**
 * Pre-request hook to set requestLatency variable to current time
 */
function recordStartTime(req, ctx, events, done) {
    ctx.vars['requestLatency'] = Date.now();
    return done();
}

/**
 * Post-response hook to calculate and log how long the request took
 */
function logLatencyDelta(req, res, ctx, events, done) {
    console.log('set-cookie" %s', res.headers['set-cookie']);
    if (!ctx.vars.requestLatency) {
        return done();
    }

    let delta = Date.now() - ctx.vars['requestLatency'];
    events.emit('customStat', { stat: req.name + ' latency', value: delta });
    return done();
}
