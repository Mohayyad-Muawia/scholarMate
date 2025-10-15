import {
  CalendarDays,
  ChartColumn,
  Search,
  ShieldCheck,
  SquarePen,
  TableProperties,
} from "lucide-react";
import SectionTitle from "./SectionTitle";
import AnimateOnScroll from "../../motion/AnimateOnScroll";

const advantages = [
  {
    icon: <SquarePen />,
    title: "إدارة المنح بسهولة",
    text: "إضافة، تعديل، وحذف المنح بسهولة وسرعة من خلال واجهة بسيطة وواضحة.",
    color: "#0ea5e9",
    bgColor: "#e0f2fe",
  },
  {
    icon: <Search />,
    title: "بحث متقدم",
    text: "امكانية البحث عن طريق الاسم للوصول إلى المنح المطلوبة بسرعة ودقة.",
    color: "#eab308",
    bgColor: "#fef9c3",
  },
  {
    icon: <TableProperties />,
    title: "عرض واضح للمنح",
    text: "عرض منظم ومفصل لكل منحة يشمل التفاصيل المهمة والمعلومات الكاملة.",
    color: "#f97316",
    bgColor: "#ffedd5",
  },
  {
    icon: <CalendarDays />,
    title: "توضيح التواريخ",
    text: "توضيح التواريخ النهائية للمنح وعدد الأيام المتبقية بشكل دقيق وسهل القراءة.",
    color: "#d946ef",
    bgColor: "#fce7f3",
  },
  {
    icon: <ChartColumn />,
    title: "احصائيات دقيقة",
    text: "احصائيات شاملة ودقيقة تساعد على فهم أداء المنح ومتابعة البيانات بسهولة.",
    color: "#84cc16",
    bgColor: "#ecfccb",
  },
  {
    icon: <ShieldCheck />,
    title: "حماية البيانات",
    text: "نحرص على حماية بيانات المستخدمين من خلال تشفير متقدم للبيانات الحساسة.",
    color: "#10b981",
    bgColor: "#d1fae5",
  },
];

export default function Features() {
  return (
    <div id="features">
      <AnimateOnScroll delay={0.1}>
        <SectionTitle
          title="لماذا تستخدم منصتنا؟"
          subtitle="نقدم لك مجموعة من الأدوات القوية التي تجعل إدارة المنح الدراسية أسهل وأكثر كفاءة من أي وقت مضى."
        />
      </AnimateOnScroll>
      <div className="content">
        {advantages.map((adv, index) => (
          <AnimateOnScroll
            delay={index * 0.2 + 0.1}
            className="card"
            key={index}
          >
            <span
              className="icon"
              style={{ backgroundColor: adv.bgColor, color: adv.color }}
            >
              {adv.icon}
            </span>
            <div>
              <h3>{adv.title}</h3>
              <p>{adv.text}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
