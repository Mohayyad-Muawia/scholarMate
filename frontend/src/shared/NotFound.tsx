import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound">
      <img src="/images/404.svg" alt="notfound" />
      <h1> الصفحة غير موجودة</h1>
      <p>الصفحة التي تبحث عنها غير متوفرة.</p>
      <Link to="/" className="primary">
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}
