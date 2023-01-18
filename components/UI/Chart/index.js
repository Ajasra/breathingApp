import {
  Card,
  Title,
  AreaChart,
  DateRangePicker,
  DateRangePickerValue,
} from "@tremor/react";
import styles from "@styles/Chart.module.css";
import { useContext, useEffect, useState } from "react";
import { GetSessions } from "@utils/api";
import { UserContext } from "@components/User/UserContext";

const options = [
  {
    value: "tdy",
    text: "Today",
    startDate: new Date(),
  },
  {
    // week
    value: "w",
    text: "Week to date",
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    // month
    value: "m",
    text: "Month to date",
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
  },
  {
    // year
    value: "y",
    text: "Year to date",
    startDate: new Date(new Date().setDate(new Date().getDate() - 365)),
  },
];

const dataFormatter = (number) => {
  return Intl.NumberFormat("us").format(number).toString() + " s";
};

export default function StatChart() {
  const userDetails = useContext(UserContext);

  const [dates, setDates] = useState([undefined, undefined, "m"]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function getData() {
      if (userDetails) {
        const stats = await GetSessions(userDetails.userId, setSessions, dates);
      }
    }
    getData();
  }, [dates]);

  return (
    <div id="chart">
      <Card>
        <DateRangePicker
          value={dates}
          defaultValue={undefined}
          onValueChange={setDates}
          options={options}
          enableDropdown={true}
          placeholder="Select..."
          enableYearPagination={false}
          minDate={null}
          maxDate={null}
          color="cyan"
          maxWidth="max-w-none"
          marginTop="mt-0"
        />
        <AreaChart
          data={sessions}
          categories={["min", "aver", "max"]}
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
  );
}
