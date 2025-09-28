import { Context } from "hono";
import { sendResponse } from "../utils/response";
import ScholarshipModel from "../models/scholarship";

export type ScholarshipType = {
  id?: string;
  title: string;
  description: string;
  country?: string;
  degreeLevel: "بكالوريوس" | "ماجستير" | "دكتوراه" | "دبلوم" | "أخرى";
  fundingType: "كامل" | "جزئي" | "ذاتي";
  deadline: string;
  resultsDate?: string;
  status:
    | "لم يتم التقديم"
    | "في انتظار النتيجة"
    | "تم رفض الطلب"
    | "تم قبول الطلب";
  link: string;
  createdAt: Date;
};

// GET Methods
export const getScholarships = async (c: Context) => {
  try {
    const user = c.get("user");

    const page = Number(c.req.query("page") || 1);
    const limit = Number(c.req.query("limit") || 10);
    const skip = (page - 1) * limit;

    const total = await ScholarshipModel.countDocuments({ userId: user.id });
    const totalPages = Math.ceil(total / limit);

    const scholarships = await ScholarshipModel.find({ userId: user.id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return sendResponse(
      c,
      200,
      true,
      "تم جلب المنح الدراسية بنجاح",
      scholarships,
      undefined,
      { page, limit, total, totalPages }
    );
  } catch (err) {
    console.error("Error in getScholarships:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const getNearest = async (c: Context) => {
  try {
    const user = c.get("user");
    const { limit = "5" } = c.req.query();

    const scholarships = await ScholarshipModel.find({
      userId: user.id,
      deadline: { $gt: new Date() },
      status: "لم يتم التقديم",
    })
      .sort({ deadline: 1 })
      .limit(parseInt(limit));

    return sendResponse(
      c,
      200,
      true,
      "تم جلب اقرب المنح الدراسية بنجاح",
      scholarships
    );
  } catch (err) {
    console.error("Error in getNearest:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const getLatest = async (c: Context) => {
  try {
    const user = c.get("user");
    const { limit = "5" } = c.req.query();

    const scholarships = await ScholarshipModel.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    return sendResponse(
      c,
      200,
      true,
      "تم جلب آخر المنح الدراسية بنجاح",
      scholarships
    );
  } catch (err) {
    console.error("Error in getLatest:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

// POST & PATCH Methods
export const addScholarship = async (c: Context) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();

    const {
      title,
      description,
      country,
      degreeLevel,
      fundingType,
      deadline,
      resultsDate,
      status,
      link,
    } = body;

    if (
      !title ||
      !description ||
      !degreeLevel ||
      !fundingType ||
      !deadline ||
      !status ||
      !link
    ) {
      return sendResponse(c, 400, false, "يجب إدخال جميع الحقول المطلوبة");
    }

    const parsedDeadline = new Date(deadline);
    if (isNaN(parsedDeadline.getTime())) {
      return sendResponse(c, 400, false, "تاريخ الانتهاء غير صالح");
    }

    let parsedResultsDate;
    if (resultsDate) {
      parsedResultsDate = new Date(resultsDate);
      if (isNaN(parsedResultsDate.getTime())) {
        return sendResponse(c, 400, false, "تاريخ النتائج غير صالح");
      }
    }

    const existingScholarship = await ScholarshipModel.findOne({
      title,
      userId: user.id,
    });

    if (existingScholarship) {
      return sendResponse(c, 400, false, "هذه المنحة مسجلة بالفعل");
    }

    const newScholarship = new ScholarshipModel({
      title,
      description,
      country,
      degreeLevel,
      fundingType,
      deadline: parsedDeadline,
      resultsDate: parsedResultsDate,
      status,
      link,
      userId: user.id,
    });

    const savedScholarship = await newScholarship.save();
    return sendResponse(
      c,
      201,
      true,
      "تم إضافة المنحة بنجاح",
      savedScholarship
    );
  } catch (err) {
    console.error("Error in addScholarship:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const updateScholarship = async (c: Context) => {
  try {
    const user = c.get("user");
    const { id } = c.req.param();
    const body = await c.req.json();

    const existingScholarship = await ScholarshipModel.findOne({
      _id: id,
      userId: user.id,
    });

    if (!existingScholarship) {
      return sendResponse(
        c,
        404,
        false,
        "المنحة غير موجودة أو لا تملك صلاحية التعديل"
      );
    }

    let updateData: any = { ...body };

    if (body.deadline) {
      const parsedDeadline = new Date(body.deadline);
      if (isNaN(parsedDeadline.getTime())) {
        return sendResponse(c, 400, false, "تاريخ الانتهاء غير صالح");
      }
      updateData.deadline = parsedDeadline;
    }

    if (body.resultsDate) {
      const parsedResultsDate = new Date(body.resultsDate);
      if (isNaN(parsedResultsDate.getTime())) {
        return sendResponse(c, 400, false, "تاريخ النتائج غير صالح");
      }
      updateData.resultsDate = parsedResultsDate;
    } else if (body.resultsDate === null) {
      updateData.resultsDate = undefined;
    }

    const updatedScholarship = await ScholarshipModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return sendResponse(
      c,
      200,
      true,
      "تم تحديث معلومات المنحة بنجاح",
      updatedScholarship
    );
  } catch (err) {
    console.error("Error in updateScholarship:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const deleteScholarship = async (c: Context) => {
  try {
    const user = c.get("user");
    const { id } = c.req.param();

    if (!id) {
      return sendResponse(c, 400, false, "مطلوب رقم تعريف المنحة (id)");
    }

    const scholarship = await ScholarshipModel.findOne({
      _id: id,
      userId: user.id,
    });

    if (!scholarship) {
      return sendResponse(
        c,
        404,
        false,
        "لم يتم العثور على المنحة أو لا تملك صلاحية الحذف"
      );
    }

    const deletedScholarship = await ScholarshipModel.findByIdAndDelete(id);

    return sendResponse(
      c,
      200,
      true,
      "تم حذف المنحة بنجاح",
      deletedScholarship
    );
  } catch (err) {
    console.error("Error in deleteScholarship:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const getStatistics = async (c: Context) => {
  try {
    const user = c.get("user");

    console.log("Fetching statistics for user:", user.id);

    const allScholarships = await ScholarshipModel.find({ userId: user.id });

    if (allScholarships.length === 0) {
      console.log("No scholarships found, returning empty statistics");
      return sendResponse(c, 200, true, "لا توجد منح لعرض الإحصائيات", {
        total: [{ count: 0 }],
        byStatus: [],
        byDegree: [],
        byCountry: [],
        upcoming: [{ count: 0 }],
      });
    }

    const statusStats: { [key: string]: number } = {};
    const degreeStats: { [key: string]: number } = {};
    const countryStats: { [key: string]: number } = {};

    let upcomingCount = 0;

    allScholarships.forEach((scholarship) => {
      const status = scholarship.status;
      statusStats[status] = (statusStats[status] || 0) + 1;

      const degree = scholarship.degreeLevel;
      degreeStats[degree] = (degreeStats[degree] || 0) + 1;

      const country = scholarship.country || "غير محدد";
      countryStats[country] = (countryStats[country] || 0) + 1;

      const now = new Date();
      const deadline = new Date(scholarship.deadline);
      if (deadline > now && scholarship.status === "لم يتم التقديم") {
        upcomingCount++;
      }
    });

    const statistics = {
      total: [{ count: allScholarships.length }],
      byStatus: Object.entries(statusStats).map(([_id, count]) => ({
        _id,
        count,
      })),
      byDegree: Object.entries(degreeStats).map(([_id, count]) => ({
        _id,
        count,
      })),
      byCountry: Object.entries(countryStats).map(([_id, count]) => ({
        _id,
        count,
      })),
      upcoming: [{ count: upcomingCount }],
    };

    return sendResponse(c, 200, true, "تم جلب الإحصائيات بنجاح", statistics);
  } catch (err) {
    console.error("Error in getStatistics:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};
