import useUserStore from "../../store/userStore";

export default function Greeting() {
  const { user } = useUserStore();

  // Function to get greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "صباح الخير";
    } else if (hour >= 12 && hour < 15) {
      return "نهارك سعيد";
    } else if (hour >= 15 && hour < 18) {
      return "مساء الخير";
    } else {
      return "ليلك سعيد";
    }
  };

  const quotes = [
    "اعمل بجد واجتهاد في كل خطوة من خطواتك، فالله يبارك للساعي ويجعل جهده سببًا لتحقيق النجاح.",
    "بعد أن تبذل كل ما في وسعك، توكل على الله فهو كفيل بتقدير نصيبك وتيسير أمورك.",
    "قد تكره شيئًا اليوم، لكنه قد يكون خيرًا لك في المستقبل، وقد تحب شيئًا، لكنه قد يحمل لك الشر، والله أعلم بما يصلح لك.",
    "من اجتهد في أمر الدنيا بصدق وإخلاص، أعانه الله وبارك له في مجهوده، وجعل له نصيبًا مباركًا من الخير.",
    "ابدأ بالعمل والإصرار على تحقيق هدفك، ثم توكل على الله الذي بيده كل خير، فهو وحده القادر على تقدير الأمور بشكل عادل.",
  ];

  //   generate random number between 1 and 5
  const randomNumber = Math.floor(Math.random() * 5) + 1;

  if (!user) {
    return;
  }

  return (
    <div className="greeting card">
      <div className="text">
        <h1>
          {getGreeting()}،{" "}
          <span>
            {user.name.split(" ")[0]} {user.name.split(" ")[1]}
          </span>
        </h1>
        <p className="quote">{quotes[randomNumber - 1]}</p>
      </div>
      <div className="image">
        <img
          src={`/images/greeting${randomNumber}.svg` || "/images/greeting4.svg"}
          alt="Dashboard Illustration"
        />
      </div>
    </div>
  );
}
