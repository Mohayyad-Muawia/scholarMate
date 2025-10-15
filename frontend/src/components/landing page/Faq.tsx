import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "../../motion/AnimateOnScroll";

interface FaqItemData {
  question: string;
  answer: string;
}

interface FaqItemProps {
  item: FaqItemData;
  isOpen: boolean;
  onClick: () => void;
}

const faqData: FaqItemData[] = [
  {
    question: "هل منصة ScholarMate مجانية؟",
    answer:
      "نعم، النسخة الحالية (MVP) مجانية بالكامل. هدفنا هو الحصول على آرائكم واقتراحاتكم لتحسين المنصة. قد نفكر في خطط مدفوعة بمميزات متقدمة جداً في المستقبل البعيد.",
  },
  {
    question: "هل بياناتي آمنة على المنصة؟",
    answer:
      "بكل تأكيد. نحن نأخذ حماية البيانات على محمل الجد. جميع كلمات المرور يتم تشفيرها باستخدام خوارزميات قوية (مثل bcrypt) قبل تخزينها، مما يعني أنه لا يمكن لأحد الاطلاع عليها، حتى نحن.",
  },
  {
    question: "هل يمكنني استخدام المنصة من الجوال؟",
    answer:
      "نعم، الموقع مصمم ليكون متجاوباً (Responsive) ويعمل بشكل جيد على متصفحات الجوال والأجهزة اللوحية. تطبيق مخصص للجوال هو أحد أهدافنا المستقبلية.",
  },
  {
    question: "هل تقومون بإضافة المنح تلقائياً؟",
    answer:
      "في النسخة الحالية، يقوم المستخدم بإضافة المنح التي تهمه بنفسه. لكن أحد أهم أهدافنا المستقبلية هو تحويل ScholarMate إلى منصة متكاملة تنزل عليها المنح تلقائياً، ويمكنك إضافتها إلى حسابك بضغطة زر.",
  },
  {
    question: "كيف يمكنني تقديم اقتراح أو الإبلاغ عن مشكلة؟",
    answer:
      "نحن نرحب جداً بجميع آرائكم! يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني contact@scholarmate.app أو عبر حسابنا على تويتر.",
  },
];

interface FaqItemData {
  question: string;
  answer: string;
}

interface FaqItemProps {
  item: FaqItemData;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <div className="item">
      <button className="question" onClick={onClick}>
        <span>{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="icon"
        >
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            className="answer"
          >
            <p>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq">
      <div className="container">
        <AnimateOnScroll>
          <SectionTitle
            title="لديك أسئلة؟ لدينا إجابات"
            subtitle="كل ما قد يخطر ببالك من اسئلة حول ScholarMate، أجبنا عليه هنا لمساعدتك على اتخاذ قرارك."
          />
        </AnimateOnScroll>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <AnimateOnScroll delay={index * 0.2 + 0.1}>
              <FaqItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
