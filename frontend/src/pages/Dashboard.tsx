import "../styles/dashboard.css";
import Greeting from "../components/Greeting";
import Calendar from "../components/Calender";
import Statistics from "../components/Statistics";
import ClosestDeadlines from "../components/ClosestDeadlines";
import Header from "../components/Header";
import CountriesChart from "../components/CountriesChart";
import StatisticsSlider from "../components/StatisticsSlider";

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
