import "../styles/states.css";
export default function Empty() {
  return (
    <div className="empty-state">
      <img src="/images/empty.svg" alt="No Data" />
      <h3>لا توجد بيانات لعرضها</h3>
    </div>
  );
}
