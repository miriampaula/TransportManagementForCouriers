export default {
  sql: {
    user: process.env.DB_USER || 'laguna',
    password: process.env.DB_PASS || 'laguna',
    server: process.env.DB_HOST || 'nodesrv.indeco.local',//'192.168.100.84',
    port: 1433, // sqlsrv
    database: 'laguna',
    trustServerCertificate: true,
    options: {
      encrypt: (process.env.DB_HOST || 'nodesrv.indeco.local').indexOf('') > -1,
      abortTransactionOnError: true,
      enableArithAbort: true,
      useUTC: true
    }
  },
}