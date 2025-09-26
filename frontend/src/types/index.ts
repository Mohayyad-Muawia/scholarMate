export type ApiResponse = {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
};

export type Scholarship = {
  id?: string;
  title: string;
  description: string;
  country?: string;
  degreeLevel: "بكالوريوس" | "ماجستير" | "دكتوراه" | "دبلوم" | "أخرى";
  fundingType: "كامل" | "جزئي" | "ذاتي";
  deadline: Date;
  resultsDate?: Date;
  status:
    | "لم يتم التقديم"
    | "في انتظار النتيجة"
    | "تم رفض الطلب"
    | "تم قبول الطلب";
  link: string;
};

export type User = {
  name: string;
  country: string;
  email: string;
  password: string;
};
