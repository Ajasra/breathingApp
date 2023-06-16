import {Pool} from "pg";

export default async function handler(req, res) {
	
	const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL;;
	const pool = new Pool({
		connectionString,
		application_name: "$ docs_simplecrud_node-postgres",
	});
	
	const client = await pool.connect();
	const { userId } = req.body;
	
	const selectStatement = `SELECT * FROM settings WHERE user_id = '${userId}'`;
	const user_settings = await client.query(selectStatement);
	
	let settings = null;
	
	user_settings.rows.forEach((row) => {
		settings = row;
	});
	
	res.status(200).json({ settings: settings, code: 200, message: "Settings retrieved successfully"})
}