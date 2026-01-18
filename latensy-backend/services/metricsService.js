const pool = require('../db/pool');

async function saveMetrics(data) {
  const query = `
    INSERT INTO api_metrics
    (project_id, method, url, status_code, latency_ms, db_time_ms, http_time_ms, redis_time_ms)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
  `;

  const values = [
    data.projectId,
    data.method,
    data.url,
    data.statusCode,
    data.latencyMs,
    data.dbTimeMs,
    data.httpTimeMs,
    data.redisTimeMs
  ];

  await pool.query(query, values);
}

module.exports = { saveMetrics };
