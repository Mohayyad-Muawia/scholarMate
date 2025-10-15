import AnimateOnScroll from "../../motion/AnimateOnScroll";
import SectionTitle from "./SectionTitle";

export default function TheStart() {
  return (
    <div id="start">
      <AnimateOnScroll delay={0.1}>
        <SectionTitle
          title="كل رحلة عظيمة تبدأ من تحدٍ كبير"
          subtitle="لم يكن ScholarMate مجرد فكرة عابرة، بل كان ضرورة ولدت من تجربة شخصية مليئة بالفوضى والقلق."
        />
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.2}>
        <div className="content card">
          <div className="image">
            <img src="/images/start.png" alt="رحلة التقديم للمنح" />
          </div>

          <div className="text">
            <p>
              هل تحلم بالدراسة في الخارج عن طريق منحة دراسية؟ إذاً، أنت تعرف
              جيداً ذلك الشعور:{" "}
              <span className="highlight">حماس كبير لكل فرصة جديدة</span>، يتبعه
              مباشرةً قلق من{" "}
              <span className="highlight-danger">فوضى المتابعة والتنظيم</span>.
            </p>
            <p>
              لقد مررت بذلك تمامًا. كنت أحتفظ بالروابط{" "}
              <span className="highlight">في كل مكان</span>، وأدوّن المواعيد
              النهائية على <span className="highlight">قصاصات ورق</span>، وأضيع
              ساعات في البحث عن مستنداتي{" "}
              <span className="highlight">المبعثرة</span>. كم منحة رائعة{" "}
              <span className="highlight-danger">فاتتني</span> فقط لأنني نسيت
              موعدها النهائي؟ كنت أتمنى لو أن هناك{" "}
              <span className="highlight-success">رفيقًا لا ينسى</span>، يساعدني
              على تنظيم كل هذا.
            </p>
            <p>
              من قلب هذه التجربة، قررت أن{" "}
              <span className="highlight-strong">أصنع الحل بنفسي</span>. وهكذا
              وُلد <strong className="highlight">ScholarMate</strong>.
            </p>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
