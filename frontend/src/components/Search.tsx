import "../styles/search.css";
import { SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Scholarship } from "../types";
import { fetchResults } from "../api/scholarships";
import toast from "react-hot-toast";
import ScholarTable from "./ScholarTable";
import Loading from "./Loading";

export default function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetchResults(query);
        setResults(res.data || []);
      } catch (error) {
        toast.error(
          "حدث خطأ اثناء البجت، تحقق من اتصالك بالانترنت وحاول مجدداً"
        );
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const handleBlur = (e: React.FocusEvent) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 200);
  };

  return (
    <div className="search-box" onBlur={handleBlur}>
      <div className={isFocused ? "search focus" : "search"}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="ابحث عن منحة..."
        />
        <button className="search-icon">
          <SearchIcon />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isFocused && query.trim() && (
          <motion.div
            className="results-container"
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            {isLoading ? (
              <motion.div className="results card loading">
                <Loading />
              </motion.div>
            ) : results.length === 0 ? (
              <motion.div className="results card">
                <p>لا توجد نتائج مطابقة</p>
              </motion.div>
            ) : (
              <motion.div className="results card">
                <div className="results-container">
                  <ScholarTable
                    scholarships={results}
                    properties={["title", "country", "status"]}
                    isLoading={isLoading}
                    indexed
                    shortStatus
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsFocused(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
