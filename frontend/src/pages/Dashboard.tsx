// components/Dashboard.tsx
import "../styles/dashboard.css";
import Greeting from "../components/Greeting";
import Calendar from "../components/Calender";
import Statistics from "../components/Statistics";
import ClosestDeadlines from "../components/ClosestDeadlines";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import ScholarshipInfo from "../components/ScholarshipInfo";
import Header from "../components/Header";
import AddForm from "../components/AddForm";
import { useScholarshipsStore } from "../store/scholarshipsStore";

export default function Dashboard() {
  const { currentScholarship, setCurrentScholarship, scholarships } =
    useScholarshipsStore();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (currentScholarship && currentScholarship._id) {
      const updatedScholar = scholarships.find(
        (s) => s._id === currentScholarship._id
      );
      if (updatedScholar) {
        setCurrentScholarship(updatedScholar);
      }
    }
  }, [scholarships, currentScholarship, setCurrentScholarship]);

  return (
    <div className="dashboard page">
      <Header title="لوحة التحكم" />
      <div className="container">
        <Greeting />
        <Calendar />
        <Statistics />
        <ClosestDeadlines setSelectedScholar={setCurrentScholarship} />

        <Modal
          isOpen={!!currentScholarship}
          onClose={() => setCurrentScholarship(null)}
        >
          <ScholarshipInfo
            scholarship={currentScholarship ?? null}
            onEdit={() => setShowForm(true)}
          />
        </Modal>

        <Modal isOpen={showForm} onClose={() => {}}>
          <AddForm
            close={() => setShowForm(false)}
            scholarshipToEdit={currentScholarship}
          />
        </Modal>

        <div className="card c2">2</div>
        <div className="card c8">8</div>
      </div>
    </div>
  );
}
