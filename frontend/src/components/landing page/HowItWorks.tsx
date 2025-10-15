import AnimateOnScroll from "../../motion/AnimateOnScroll";
import SectionTitle from "./SectionTitle";
import { UserPlus, ListPlus, LayoutGrid } from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={32} />,
    title: "أنشئ حسابك المجاني",
    description:
      "ابدأ بإنشاء حسابك الخاص في أقل من دقيقة لتتمكن من حفظ وتتبع منحك الدراسية.",
  },
  {
    icon: <ListPlus size={32} />,
    title: "أضف منحك الدراسية",
    description:
      "قم بإضافة كل المنح التي تهتم بها بسهولة، مع مواعيدها النهائية وتفاصيلها المهمة.",
  },
  {
    icon: <LayoutGrid size={32} />,
    title: "تتبّع كل شيء من مكان واحد",
    description:
      "شاهد جميع منحك في لوحة تحكم منظمة، مع عد تنازلي يوضح لك الأيام المتبقية.",
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works">
      <AnimateOnScroll>
        <SectionTitle
          title="ابدأ رحلتك في ثلاث خطوات بسيطة"
          subtitle="صُممت المنصة لتكون سهلة الاستخدام ومباشرة. قم باتباع هذه الخطوات لتكون جاهزاً في دقائق."
        />
      </AnimateOnScroll>

      <div className="steps-grid">
        {steps.map((step, index) => (
          <AnimateOnScroll delay={index * 0.2 + 0.1}>
            <div className="card" key={index}>
              <div className="header">
                <span className="icon">{step.icon}</span>
                <span className="number">الخطوة {index + 1}</span>
              </div>
              <h2 className="title">{step.title}</h2>
              <p className="description">{step.description}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
