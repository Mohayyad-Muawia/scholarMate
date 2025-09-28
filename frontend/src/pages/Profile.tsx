import Header from "../components/Header";
import useUserStore from "../store/userStore";
import "../styles/profile.css";
import getCountry from "../utils/getCountry";
export default function Profile() {
  const { user } = useUserStore();
  const country = getCountry(user?.country);
  return (
    <div className="profile page">
      <Header title="الملف الشخصي" />
      <div className="container">
        <div className="top card">
          <img className="avatar" src="/images/logo.png" alt="" />
          <div className="info">
            <h1>{user?.name}</h1>
            <div className="progress-bar"></div>
            <div className="progress-bar"></div>
          </div>
        </div>
        <div className="bottom">
          <div className="right card"></div>
          <div className="options"></div>
        </div>
      </div>
    </div>
  );
}
