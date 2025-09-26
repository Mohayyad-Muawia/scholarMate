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
import AddForm from "../components/AddForm";

export default function Dashboard() {
  const [selectedScholar, setSelectedScholar] = useState<Scholarship | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
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
          <ScholarshipInfo
            scholarship={selectedScholar}
            onEdit={() => setShowForm(true)}
          />
        </Modal>
        <Modal isOpen={showForm} onClose={() => {}}>
          <AddForm
            close={() => setShowForm(false)}
            scholarshipToEdit={selectedScholar}
          />
        </Modal>

        <div className="card c2">2</div>
        <div className="card c8">8</div>
      </div>
    </div>
  );
}
