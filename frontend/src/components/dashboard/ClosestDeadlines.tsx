// components/ClosestDeadlines.tsx
import "../../styles/closestDeadlines.css";
import { useEffect } from "react";
import { useScholarshipsStore } from "../../store/scholarshipsStore";
import ScholarTable from "../../shared/ScholarTable";
import Loading from "../../shared/Loading";
import Empty from "../../shared/Empty";

export default function ClosestDeadlines() {
  const { upcomingScholarships, fetchUpcoming, isLoading } =
    useScholarshipsStore();

  useEffect(() => {
    fetchUpcoming(4);
  }, [fetchUpcoming]);

  if (isLoading) {
    return (
      <div className="closest-deadlines card">
        <Loading />
      </div>
    );
  }

  return (
    <div className="closest-deadlines card">
      <h3>اقرب التواريخ النهائية</h3>
      {upcomingScholarships.length === 0 ? (
        <Empty />
      ) : (
        <ScholarTable
          scholarships={upcomingScholarships}
          isLoading={isLoading}
          properties={["title", "daysLeft", "deadline", "status"]}
        />
      )}
    </div>
  );
}
