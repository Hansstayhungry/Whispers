// db/queries/users.js

import db from '../../configs/db.config.js';

const getAllUsers = () => {
	return db.query("SELECT * FROM users;").then(data => {
		return data.rows;
	})
}

const getUserById = id => {
	return db.query("SELECT * FROM users; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

export default { getAllUsers, getUserById };