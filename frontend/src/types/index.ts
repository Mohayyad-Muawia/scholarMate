export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
};

export type Scholarship = {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
};

export type User = {
  _id?: string;
  name: string;
  country: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface StatisticsData {
  total: { count: number }[];
  byStatus: StatusStat[];
  byDegree: DegreeStat[];
  byCountry: CountryStat[];
  upcoming: { count: number }[];
}

export interface StatusStat {
  _id:
    | "لم يتم التقديم"
    | "في انتظار النتيجة"
    | "تم رفض الطلب"
    | "تم قبول الطلب";
  count: number;
}

export interface DegreeStat {
  _id: "بكالوريوس" | "ماجستير" | "دكتوراه" | "دبلوم" | "أخرى";
  count: number;
}

export interface CountryStat {
  _id: string;
  count: number;
}
