import {Pool} from "pg";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
	
	const { settings, user_id } = req.body;
	const setSerialized = JSON.stringify(settings);
	
	const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL;;
	const pool = new Pool({
		connectionString,
		application_name: "$ docs_simplecrud_node-postgres",
	});
	
	const client = await pool.connect();
	
	async function insertSettings(user_id, setSerialized, res, settings) {
		const insertStatement = `INSERT INTO settings (user_id, settings) VALUES ('${user_id}', '${setSerialized}')`;
		const insert_settings = await client.query(insertStatement);
		
		const selectStatement = `SELECT * FROM settings WHERE user_id = '${user_id}' ORDER BY id DESC LIMIT 1`;
		const get_new_settings = await client.query(selectStatement);
		get_new_settings.rows.forEach((row) => {
			settings.settingsId = row.id;
		});
		
		res.status(200).json({ settings: settings, code: 200, message: "Settings created successfully"})
	}
	
	
	async function updateSettings(user_id, setSerialized, res, settings) {
		const updateStatement = `UPDATE settings SET settings = '${setSerialized}' WHERE id = '${settings.settingsId}'`;
		const update_settings = await client.query(updateStatement);
		
		res.status(200).json({ settings: settings, code: 200, message: "Settings updated successfully"})
	}
	
	async function checkIfExist(user_id, settings) {
		const selectStatement = `SELECT * FROM settings WHERE id = '${settings.settingsId}'`;
		const settings_exist = await client.query(selectStatement);
		if(settings_exist.rows.length > 0) {
			settings_exist.rows.forEach((row) => {
				settings.settingsId = row.id;
			});
			return true;
		}else{
			return false;
		}
	}
	
	if (settings.settingsId === null) {
		await insertSettings(user_id, setSerialized, res, settings);
	} else {
		if (await checkIfExist(user_id, settings)) {
			await updateSettings(user_id, setSerialized, res, settings);
		}else{
			await insertSettings(user_id, setSerialized, res, settings);
		}
	}
}
