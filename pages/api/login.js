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
	
	let user = null;
	
	const selectStatement = `SELECT * FROM users WHERE name = '${name}' AND password = '${hashedPassword}'`;
	const user_exist = await client.query(selectStatement);
	if(user_exist.rows.length > 0) {
		user_exist.rows.forEach((row) => {
			user = row;
		});
		res.status(200).json({ user: user, code: 200, message: "Login successful"})
	}else{
		res.status(200).json({ user: null, code: 400, message: "User does not exist"})
	}
	
}
