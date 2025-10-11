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
import { useEffect, useState } from "react";

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
  const [barSize, setBarSize] = useState(50);
  const [fontSize, setFontSize] = useState(14);
  const [chartMargin, setChartMargin] = useState({
    top: 20,
    right: 50,
    bottom: 10,
    left: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setBarSize(20);
        setFontSize(10);
        setChartMargin({ top: 10, right: 20, bottom: 5, left: -30 });
      } else if (window.innerWidth < 900) {
        setBarSize(35);
        setFontSize(12);
        setChartMargin({ top: 15, right: 30, bottom: 8, left: -30 });
      } else {
        setBarSize(50);
        setFontSize(14);
        setChartMargin({ top: 20, right: 50, bottom: 10, left: 0 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data: CountryStat[] = (statistics?.byCountry || [])
    .slice(0, 5)
    .map((d) => ({
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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={chartMargin}>
          <XAxis
            dataKey="_id"
            interval={0}
            tickMargin={5}
            tick={{
              fontSize,
              fontWeight: "bold",
            }}
          />
          <YAxis
            allowDecimals={false}
            tickMargin={10}
            tick={{ fontSize, fontWeight: "bold" }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#7664e410" }} />
          <Bar
            dataKey="count"
            className="bar-hover"
            fill="#7664e4"
            barSize={barSize}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
