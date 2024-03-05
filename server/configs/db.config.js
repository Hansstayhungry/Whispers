// Database connections
import pg from 'pg';
const { Pool } = pg;

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT} = process.env;
console.log(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT)
const pool = new Pool({
	user: DB_USER,
	host: DB_HOST,
	password: DB_PASSWORD,
	port: DB_PORT,
	database: DB_DATABASE,
})

pool.connect().then(() => {
	console.log("Database connection established.")
}).catch( e => {
	throw new Error(e);
})

export default pool;