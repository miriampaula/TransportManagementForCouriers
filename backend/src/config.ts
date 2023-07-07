export default {
  sql: {
    user: process.env.DB_USER || 'laguna',
    password: process.env.DB_PASS || 'B64A9B5D-D957-4FC2-94BA-C417F0B8ACE8',
    server: process.env.DB_HOST || '168.119.27.174',
    port: 1433, // sqlsrv
    database: 'laguna',
    trustServerCertificate: true,
    options: {
      encrypt: false,
      abortTransactionOnError: true,
      enableArithAbort: true,
      useUTC: true
    }
  },
}
