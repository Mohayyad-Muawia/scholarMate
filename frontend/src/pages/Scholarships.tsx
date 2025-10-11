import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useScholarshipsStore } from "../store/scholarshipsStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/scholarships.css";
import ScholarTable from "../components/ScholarTable";

export default function Scholarships() {
  const {
    scholarships,
    fetchScholarships,
    limit,
    total,
    totalPages,
    isLoading,
  } = useScholarshipsStore();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchScholarships(currentPage, limit);
  }, [currentPage, limit, fetchScholarships]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
              <span className="hide-in-mobile"> السابق</span>
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
              <span className="hide-in-mobile">التالي </span>
              <ChevronLeft size={18} />
            </button>
          </div>
        )}

        <span>
          الصفحة {currentPage} من {totalPages ? totalPages : 1}
        </span>
      </div>
      <div className="table-container card">
        <ScholarTable
          scholarships={scholarships}
          indexed
          currentPage={currentPage}
          limit={limit}
          isLoading={isLoading}
          properties="all"
        />
      </div>
    </div>
  );
}
