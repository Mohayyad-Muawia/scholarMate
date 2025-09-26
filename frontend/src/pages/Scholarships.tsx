import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useScholarshipsStore } from "../store/scholarshipsStore";
import type { Scholarship } from "../types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import formatDate from "../utils/formatDate";
import calculateDaysLeft from "../utils/calcDaysLeft";
import "../styles/scholarships.css";
import getPadge from "../utils/getPadge";
import getCountry from "../utils/getCountry";
import Modal from "../components/Modal";
import AddForm from "../components/AddForm";
import ScholarshipInfo from "../components/ScholarshipInfo";

export default function Scholarships() {
  const {
    scholarships,
    fetchScholarships,
    currentScholarship,
    setCurrentScholarship,
    page,
    limit,
    total,
    totalPages,
    isLoading,
  } = useScholarshipsStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchScholarships(currentPage, limit);
  }, [currentPage, limit, fetchScholarships]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowClick = (scholarship: Scholarship) => {
    setCurrentScholarship(scholarship);
  };

  return (
    <div className="scholarships page">
      <Header title="قائمة المنح" />

      <div className="pagination-box card">
        <p>
          عرض {scholarships.length} من أصل {total} منحة
        </p>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="pagination-btn"
            >
              <ChevronRight size={18} />
              السابق
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`page-btn ${
                      pageNum === currentPage ? "active" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="pagination-btn"
            >
              التالي
              <ChevronLeft size={18} />
            </button>
          </div>
        )}

        <span>
          الصفحة {currentPage} من {totalPages}
        </span>
      </div>

      {isLoading ? (
        <div className="loading card">
          <p>جاري تحميل المنح...</p>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="empty card">
          <p>لا توجد منح حالياً</p>
        </div>
      ) : (
        <>
          <div className="table-container card">
            <table className="scholarships-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم المنحة</th>
                  <th>مستوى الدرجة</th>
                  <th>الدولة</th>
                  <th>الأيام المتبقية</th>
                  <th>الموعد النهائي</th>
                  <th>موعد النتائج</th>
                  <th>حالة المنحة</th>
                  <th>نوع التمويل</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((sclr, i) => {
                  const daysLeft = calculateDaysLeft(sclr.deadline);
                  const padge = getPadge(sclr.status);
                  const country = getCountry(sclr.country);

                  return (
                    <motion.tr
                      key={sclr._id}
                      onClick={() => handleRowClick(sclr)}
                      whileHover={{ x: -10 }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{(currentPage - 1) * limit + i + 1}</td>
                      <td className="title-cell">
                        <strong>{sclr.title}</strong>
                      </td>
                      <td>{sclr.degreeLevel}</td>
                      <td>{country?.name_ar || "غير محدد"}</td>
                      <td>
                        <span className={`days-left`}>{daysLeft}</span>
                      </td>
                      <td>{formatDate(sclr.deadline)}</td>
                      <td>
                        {sclr.resultsDate
                          ? formatDate(sclr.resultsDate)
                          : "------------"}
                      </td>
                      <td>{sclr.fundingType}</td>
                      <td>
                        <div
                          className="padge"
                          style={{
                            color: padge.color,
                            background: padge.background,
                          }}
                        >
                          {padge.icon}
                          <span>{sclr.status}</span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
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
    </div>
  );
}
