import { Card, Title, AreaChart } from "@tremor/react";
import styles from "@styles/Chart.module.css";

const chartdata = [
	{
		date: "Jan 22, 23",
		max: 10,
		min: 5,
		average: 7,
		id: 1,
	},
	{
		date: "Feb 22, 23",
		max: 10,
		min: 5,
		average: 7,
		id: 1,
	},
	{
		date: "Mar 22, 23",
		max: 10,
		min: 5,
		average: 7,
		id: 1,
	},
	{
		date: "Apr 22, 23",
		max: 10,
		min: 5,
		average: 7,
		id: 1,
	},
	{
		date: "May 22, 23",
		max: 10,
		min: 5,
		average: 7,
		id: 1,
	},
	{
		date: "Jun 22, 23",
		max: 10,
		min: 5,
		average: 7,
		id: 1,
	},
];

const dataFormatter = (number) => {
	return Intl.NumberFormat("us").format(number).toString() + " s";
};


export default function StatChart({ sessions }) {
	
	return (
		< div id="chart">
			<Card >
				<AreaChart
					data={sessions}
					categories={["min", "average","max"]}
					dataKey="date"
					height="h-80"
					colors={["blue", "sky", "teal"]}
					valueFormatter={dataFormatter}
					marginTop="mt-0"
					marginBottom="mb-0"
					marginLeft="ml-0"
					showAnimation={true}
				/>
			</Card>
		</div>
	)
}