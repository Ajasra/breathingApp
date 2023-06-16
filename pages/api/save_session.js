import {Pool} from "pg";

export default async function handler(req, res) {
	
	try {
	
		const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL;;
		const pool = new Pool({
			connectionString,
			application_name: "$ docs_simplecrud_node-postgres",
		});
		
		const client = await pool.connect();
		const { data, settings, average, userId } = req.body;
		
		const setSerialized = JSON.stringify(settings);
		const dataSerialized = JSON.stringify({
			rounds: data,
			average: average.toFixed(2),
		});
		
		console.log(dataSerialized);
		console.log(setSerialized);
		
		// get current time in timestamp
		const created_time = new Date().toISOString();
		
		const insertStatement = `INSERT INTO sessions (user_id, retention_time, settings, created_at) VALUES (${userId}, '${dataSerialized}', '${setSerialized}', '${created_time}')`;
		const insert = await client.query(insertStatement);
		
		res.status(200).json({ code: 200, message: "Session saved"})
		
	} catch (e) {
		console.log(e);
		res.status(200).json({ code: 400, message: "Error saving session"})
	}
}