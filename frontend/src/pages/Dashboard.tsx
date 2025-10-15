import "../styles/dashboard.css";
import Greeting from "../components/dashboard/Greeting";
import Calendar from "../components/dashboard/Calender";
import Statistics from "../components/dashboard/Statistics";
import ClosestDeadlines from "../components/dashboard/ClosestDeadlines";
import Header from "../shared/Header";
import CountriesChart from "../components/dashboard/CountriesChart";
import StatisticsSlider from "../components/dashboard/StatisticsSlider";

export default function Dashboard() {
  return (
    <div className="dashboard page">
      <Header title="لوحة التحكم" />
      <div className="container">
        <Greeting />
        <Calendar />
        <StatisticsSlider />
        <Statistics />
        <ClosestDeadlines />
        <CountriesChart />
      </div>
    </div>
  );
}
