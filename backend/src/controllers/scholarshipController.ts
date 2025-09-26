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
  status: "معلقة" | "في انتظار النتائج" | "مرفوضة" | "مقبولة";
  link: string;
};

export const addScholarship = async (c: Context) => {
  try {
    const body = await c.req.json<ScholarshipType>();
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
      return sendResponse(c, 400, false, "تاريخ غير صالح");
    }

    const existingScholarship = await ScholarshipModel.findOne({ title });
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
      resultsDate: resultsDate ? new Date(resultsDate) : undefined,
      status,
      link,
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
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const getScholarships = async (c: Context) => {
  try {
    const scholarships = await ScholarshipModel.find().sort({ deadline: 1 });
    return sendResponse(
      c,
      200,
      true,
      "تم جلب المنح الدراسية بنجاح",
      scholarships
    );
  } catch (err) {
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const updateScholarship = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json<ScholarshipType>();

    const parsedDeadline = body.deadline ? new Date(body.deadline) : undefined;
    if (parsedDeadline && isNaN(parsedDeadline.getTime())) {
      return sendResponse(c, 400, false, "تاريخ غير صالح");
    }

    const updatedScholarship = await ScholarshipModel.findByIdAndUpdate(
      id,
      {
        ...body,
        deadline: parsedDeadline,
        resultsDate: body.resultsDate ? new Date(body.resultsDate) : undefined,
      },
      { new: true }
    );

    if (!updatedScholarship) {
      return sendResponse(c, 404, false, "المنحة غير موجودة");
    }

    return sendResponse(
      c,
      200,
      true,
      "تم تحديث معلومات المنحة بنجاح",
      updatedScholarship
    );
  } catch (err) {
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const deleteScholarship = async (c: Context) => {
  try {
    const { id } = c.req.param();

    if (!id) {
      return sendResponse(c, 400, false, "مطلوب رقم تعريف المنحة (id)");
    }

    const deletedScholarship = await ScholarshipModel.findByIdAndDelete(id);

    if (!deletedScholarship) {
      return sendResponse(c, 404, false, "لم يتم العثور على المنحة");
    }

    return sendResponse(
      c,
      200,
      true,
      "تم حذف المنحة بنجاح",
      deletedScholarship
    );
  } catch (err) {
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};
