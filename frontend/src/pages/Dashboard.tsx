import "../styles/dashboard.css";
import Greeting from "../components/Greeting";
import Calendar from "../components/Calender";
import Statistics from "../components/Statistics";
import ClosestDeadlines from "../components/ClosestDeadlines";
import Modal from "../components/Modal";
import { useState } from "react";
import type { Scholarship } from "../types";
import ScholarshipInfo from "../components/ScholarshipInfo";
import Header from "../components/Header";

export default function Dashboard() {
  const [selectedScholar, setSelectedScholar] = useState<Scholarship | null>(
    null
  );
  return (
    <div className="dashboard page">
      <Header />
      <div className="container">
        <Greeting />
        <Calendar />
        <Statistics />
        <ClosestDeadlines setSelectedScholar={setSelectedScholar} />
        <Modal
          isOpen={!!selectedScholar}
          onClose={() => setSelectedScholar(null)}
        >
          <ScholarshipInfo scholarship={selectedScholar} />
        </Modal>
        <div className="card c2">2</div>
        <div className="card c8">8</div>
      </div>
    </div>
  );
}
