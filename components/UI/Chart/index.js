import {
  Card,
  AreaChart,
  DateRangePicker,
  Flex,
} from "@tremor/react";
import { useContext, useEffect, useState } from "react";
import { GetSessions } from "@utils/api";
import { UserContext } from "@components/User/UserContext";
import { Checkbox, Stack } from "@mantine/core";

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

  const [categories, setCategories] = useState(["min", "aver", "max"]);

  const [checkedMin, setCheckedMin] = useState("min");
  const [checkedMax, setCheckedMax] = useState("max");
  const [checkedAver, setCheckedAver] = useState("aver");

  useEffect(() => {
    async function getData() {
      if (userDetails) {
        const stats = await GetSessions(userDetails.userId, setSessions, dates);
      }
    }
    getData();
  }, [dates]);

  useEffect(() => {
    setCategories([checkedMin, checkedMax, checkedAver]);
  }, [checkedMin, checkedMax, checkedAver]);

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
        <br />
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ sm: "center" }}
        >
          <Checkbox
            checked={checkedMin}
            onChange={(event) => setCheckedMin(event.currentTarget.checked ? "min" : "")}
            label="Min"
          />
          <Checkbox
            checked={checkedAver}
            onChange={(event) => setCheckedAver(event.currentTarget.checked ? "aver" : "")}
            label="Aver"
          />
          <Checkbox
            checked={checkedMax}
            onChange={(event) => setCheckedMax(event.currentTarget.checked ? "max" : "")}
            label="Max"
          />
        </Flex>
        <AreaChart
          data={sessions}
          categories={categories}
          dataKey="date"
          height="h-80"
          colors={["blue", "sky", "teal"]}
          valueFormatter={dataFormatter}
          marginTop="mt-0"
          marginBottom="mb-0"
          marginLeft="ml-0"
          showAnimation={true}
          autoMinValue={true}
          showLegend={false}
        />
      </Card>
    </div>
  );
}
