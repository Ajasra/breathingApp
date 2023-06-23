import {Pool} from "pg";

export default async function handler(req, res) {
	
	try {
		const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL;;
		const pool = new Pool({
			connectionString,
			application_name: "$ docs_simplecrud_node-postgres",
		});
		
		const client = await pool.connect();
		const { user_id, dates } = req.body;
		
		let endDate, startDate;
		
		if (dates[0] == undefined) {
			endDate = new Date(new Date().setDate(new Date().getDate() + 1))
				.toISOString();
			startDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
				.toISOString();
		} else {
			// convert Wed Jan 11 2023 00:00:00 GMT+0800 (China Standard Time) to 2023-01-11
			// and add one day to the end date
			let end = new Date(dates[1]);
			end = new Date(end.setDate(end.getDate() + 2));
			endDate = new Date(end).toISOString();
			startDate = new Date(dates[0]).toISOString();
		}
		
		const selectStatement = `SELECT * FROM sessions WHERE user_id = '${user_id}' AND created_at >= '${startDate}' AND created_at <= '${endDate}' ORDER BY created_at ASC`;
		console.log(selectStatement);
		
		const select = await client.query(selectStatement);
		
		const sessionsData = select.rows;
		
		if (sessionsData.length > 0) {
			let sessions = [];
			sessionsData.forEach((session) => {
				let sessionData = JSON.parse(session.retention_time);
				let rounds = sessionData.rounds.map((round) => parseFloat(round));
				let max = Math.max(...rounds);
				let min = Math.min(...rounds);
				let date = new Date(session.created_at);
				let month = date.toLocaleString("default", { month: "short" });
				let day = date.getDate();
				let year = date.getFullYear();
				// let formattedDate = month + " " + day + ", " + year;
				let formattedDate = month + " " + day;
				
				sessions.push({
					id: session.id,
					date: formattedDate,
					rounds: sessionData.rounds,
					max: max,
					min: min,
					aver: parseFloat(sessionData.average),
				});
			});
			
			res.status(200).json({code: 200, sessions: sessions });
		}else{
			
			const sessions = [
				{
					id: 0,
					date: new Date().toLocaleString("default", { month: "short" }),
					rounds: [],
					max: 0,
					min: 0,
					aver: 0,
				},
			]
			res.status(200).json({code: 200, sessions: sessions });
		}
		
	}
	catch (err) {
		console.error(err);
		const sessions = [
			{
				id: 0,
				date: new Date().toLocaleString("default", { month: "short" }),
				rounds: [],
				max: 0,
				min: 0,
				aver: 0,
			},
		]
		res.status(200).json({code: 200, sessions: sessions });
	}
}