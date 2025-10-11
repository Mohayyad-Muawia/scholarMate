import "../styles/states.css";
export default function Loading() {
  return (
    <div className="loading-state">
      <img src="/images/logo-trans.png" alt="logo" />
      <span className="loader"></span>
    </div>
  );
}
