// metrics.js
const client = require('prom-client');

// 2.1 Default/process metrics (CPU, memory, event loop lag, etc.)
client.collectDefaultMetrics();

// 2.2 Custom app metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  // keep labels low-cardinality
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route']
});

const errorCounter = new client.Counter({
  name: 'http_request_errors_total',
  help: 'Total number of failed HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// helper: get stable route label like "/users/:id"
function routeLabel(req) {
  // after routing, Express sets req.baseUrl and req.route?.path
  const path = req.route?.path || '';
  const base = req.baseUrl || '';
  const full = (base + (path === '/' ? '' : path)) || req.path || 'unknown';
  return full;
}

// 2.3 Express middleware (add early, before routes)
function metricsMiddleware(req, res, next) {
  const end = httpRequestDuration.startTimer();

  res.on('finish', () => {
    const route = routeLabel(req);
    requestCounter.inc({ method: req.method, route });

    if (res.statusCode >= 400) {
      errorCounter.inc({
        method: req.method,
        route,
        status_code: String(res.statusCode)
      });
    }

    end({
      method: req.method,
      route,
      status_code: String(res.statusCode)
    });
  });

  next();
}

// 2.4 /metrics handler
async function metricsHandler(req, res) {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
}

module.exports = { metricsMiddleware, metricsHandler };
