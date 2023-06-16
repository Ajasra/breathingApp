import {Pool} from "pg";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
	
	const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL;;
	const pool = new Pool({
		connectionString,
		application_name: "$ docs_simplecrud_node-postgres",
	});
	
	const client = await pool.connect();
	const { name, password } = req.body;
	
	//  md5 of password
	const hashedPassword = password;
	
	// check if user already exists
	const selectStatement2 = `SELECT * FROM users WHERE name = '${name}'`;
	const user_exist = await client.query(selectStatement2);
	if(user_exist.rows.length > 0) {
		res.status(200).json({ user: null, code: 400, message: "User already exists"})
		return;
	}
	
	const insertStatement = `INSERT INTO users (name, password) VALUES ('${name}', '${hashedPassword}')`;
	const insert_user = await client.query(insertStatement);
	
	const selectStatement = `SELECT * FROM users WHERE name = '${name}' AND password = '${hashedPassword}' ORDER BY id DESC LIMIT 1`;
	const get_new_user = await client.query(selectStatement);
	
	let user = null;
	
	get_new_user.rows.forEach((row) => {
		user = row;
	});
	
	res.status(200).json({ user: user, code: 200, message: "User created successfully"})
}
