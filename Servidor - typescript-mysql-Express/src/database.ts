const mysql2 = require('mysql2/promise');

export async function connect() {
    const connection = await mysql2.createPool({
        host: 'localhost',
        user: 'root',
        database: 'node_mysql_ts',
        connectionLimit: 10
    });
    return connection;
}