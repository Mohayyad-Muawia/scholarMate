import calculateDaysLeft from "../utils/calcDaysLeft";
import formatDate from "../utils/formatDate";
import getCountry from "../utils/getCountry";
import { motion } from "framer-motion";
import getPadge from "../utils/getPadge";
import type { Scholarship } from "../types";
import { useScholarshipsStore } from "../store/scholarshipsStore";
import Modal from "./Modal";
import ScholarshipInfo from "./ScholarshipInfo";
import AddForm from "./AddForm";
import { useCallback, useState } from "react";
import "../styles/table.css";
import Loading from "./Loading";
import Empty from "./Empty";

type Props = {
  scholarships: Scholarship[];
  indexed?: boolean;
  shortStatus?: boolean;
  currentPage?: number;
  limit?: number;
  isLoading: boolean;
  properties: (keyof Scholarship | "daysLeft")[] | "all";
};

type Columns = Partial<
  Record<keyof Scholarship, string> & { daysLeft: string }
>;

export default function ScholarTable({
  scholarships,
  indexed,
  shortStatus,
  currentPage,
  limit,
  isLoading,
  properties,
}: Props) {
  const { currentScholarship, setCurrentScholarship } = useScholarshipsStore();
  const [showForm, setShowForm] = useState(false);

  const handleRowClick = useCallback(
    (scholarship: Scholarship) => {
      setCurrentScholarship(scholarship);
    },
    [setCurrentScholarship]
  );

  const allowedColumns: Columns = {
    title: "اسم المنحة",
    degreeLevel: "مستوى الدرجة",
    country: "الدولة",
    daysLeft: "الايام المتبقية",
    deadline: "الموعد النهائي",
    resultsDate: "موعد النتائج",
    fundingType: "نوع التمويل",
    status: "حالة المنحة",
  };

  const selectedProps =
    properties === "all"
      ? (Object.keys(allowedColumns) as (keyof Scholarship | "daysLeft")[])
      : properties.filter((p) => p in allowedColumns);

  return (
    <>
      {isLoading ? (
        <div className="state" aria-live="polite">
          <Loading />
        </div>
      ) : scholarships.length === 0 ? (
        <div className="state" aria-live="polite">
          <Empty />
        </div>
      ) : (
        <table className="scholar-table">
          <thead>
            <tr>
              {indexed && <th>#</th>}
              {selectedProps.map((prop) => {
                return prop === "daysLeft" ? (
                  <th className="hide-in-mobile" key={prop}>
                    {allowedColumns[prop]}
                  </th>
                ) : (
                  <th key={prop}>{allowedColumns[prop]}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sclr, i) => (
              <motion.tr
                key={sclr._id}
                onClick={() => handleRowClick(sclr)}
                onKeyDown={(e) => e.key === "Enter" && handleRowClick(sclr)}
                whileHover={{ x: -10 }}
                style={{ cursor: "pointer" }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${sclr.title}`}
              >
                {indexed &&
                  (currentPage && limit ? (
                    <td className="index">
                      {(currentPage - 1) * limit + i + 1}
                    </td>
                  ) : (
                    <td className="index">{i + 1}</td>
                  ))}

                {selectedProps.map((prop) => {
                  if (prop === "daysLeft") {
                    return (
                      <td className="hide-in-mobile" key={prop}>
                        {calculateDaysLeft(sclr.deadline)}
                      </td>
                    );
                  }
                  if (prop === "country") {
                    return (
                      <td key={prop} className="country">
                        <span>{getCountry(sclr.country)?.emoji}</span>
                        {getCountry(sclr.country)?.name_ar || "غير محدد"}
                      </td>
                    );
                  }
                  if (prop === "deadline" || prop === "resultsDate") {
                    return (
                      <td key={prop}>
                        {sclr[prop]
                          ? formatDate(sclr[prop] as Date)
                          : "------------"}
                      </td>
                    );
                  }
                  if (prop === "status") {
                    const padge = getPadge(sclr.status);
                    return (
                      <td key={prop}>
                        <div
                          className={shortStatus ? "short padge" : "padge"}
                          style={{
                            color: padge.color,
                            background: padge.background,
                          }}
                        >
                          {padge.icon}
                          {!shortStatus && (
                            <span className="hide-in-mobile">
                              {sclr.status}
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  }

                  return <td key={prop}>{String(sclr[prop])}</td>;
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}

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
    </>
  );
}
