import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useScholarshipsStore } from "../store/scholarshipsStore";
import type { CountryStat } from "../types";
import getCountry from "../utils/getCountry";
import Loading from "./Loading";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function CountriesChart() {
  const { statistics, isLoading } = useScholarshipsStore();
  const data: CountryStat[] = (statistics?.byCountry || []).map((d) => ({
    ...d,
    _id: getCountry(d._id)?.name_ar || "غير محدد",
  }));

  if (isLoading) {
    return (
      <div className="c8 card chart">
        <Loading />
      </div>
    );
  }
  return (
    <div className="c8 card chart">
      <h3>عدد المنح حسب الدولة</h3>
      <ResponsiveContainer width="100%" height={"100%"}>
        <BarChart data={data} margin={{ top: 20, right: 50, bottom: 10 }}>
          <XAxis
            dataKey="_id"
            interval={0}
            tickMargin={5}
            tick={{
              fontSize: Math.max(10, 14 - data.length * 0.1),
              fontWeight: "bold",
            }}
          />
          <YAxis allowDecimals={false} tickMargin={15} fontWeight="bold" />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#7664e410" }} />

          <Bar
            dataKey="count"
            className="bar-hover"
            fill="#7664e4"
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
