import { Context } from "hono";
import { sendResponse } from "../utils/response";
import User from "../models/user";
import * as bcrypt from "bcryptjs";
import Scholarship from "../models/scholarship";
import * as nodemailer from "nodemailer";

export const updateUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { id } = c.req.param();
    const user = c.get("user");

    if (!id) {
      return sendResponse(c, 400, false, "مطلوب رقم تعريف المستخدم (id)");
    }

    if (user.id !== id) {
      return sendResponse(c, 403, false, "لا تملك صلاحيات", undefined);
    }

    // basic validation
    if (!body.name || !body.email) {
      return sendResponse(c, 400, false, "يجب إدخال جميع الحقول المطلوبة");
    }

    const existedUser = await User.findById(id);
    if (!existedUser) {
      return sendResponse(c, 404, false, "لم يتم العثور على المستخدم");
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return sendResponse(
      c,
      200,
      true,
      "تم تحديث معلومات المستخدم بنجاح",
      updatedUser
    );
  } catch (err) {
    console.error("Error in updateUser:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const getUser = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const user = c.get("user");

    if (!id) {
      return sendResponse(c, 400, false, "مطلوب رقم تعريف المستخدم (id)");
    }

    if (user.id !== id) {
      return sendResponse(c, 403, false, "لا تملك صلاحيات", undefined);
    }

    const existedUser = await User.findById(id);
    if (!existedUser) {
      return sendResponse(c, 404, false, "لم يتم العثور على المستخدم");
    }

    return sendResponse(
      c,
      200,
      true,
      "تم جلب معلومات المستخدم بنجاح",
      existedUser
    );
  } catch (err) {
    console.error("Error in getUser:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const resetPassword = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const user = c.get("user");
    const { currPassword, newPassword } = await c.req.json();

    if (!id) {
      return sendResponse(c, 400, false, "مطلوب رقم تعريف المستخدم (id)");
    }

    if (user.id !== id) {
      return sendResponse(c, 403, false, "لا تملك صلاحيات", undefined);
    }

    const existedUser = await User.findById(id);
    if (!existedUser) {
      return sendResponse(c, 404, false, "لم يتم العثور على المستخدم");
    }

    const isMatched = await bcrypt.compare(currPassword, existedUser.password);
    console.log(isMatched);

    if (!isMatched) {
      return sendResponse(
        c,
        403,
        false,
        "كلمة المرور الحالية خاطئة",
        undefined
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    return sendResponse(
      c,
      200,
      true,
      "تم تغيير كلمة مرور المستخدم بنجاح",
      updatedUser
    );
  } catch (err) {
    console.error("Error in resetPassword:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const deleteUser = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const user = c.get("user");

    if (!id) {
      return sendResponse(c, 400, false, "مطلوب رقم تعريف المستخدم (id)");
    }

    if (user.id !== id) {
      return sendResponse(c, 403, false, "لا تملك صلاحيات", undefined);
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return sendResponse(c, 404, false, "لم يتم العثور على المستخدم");
    }

    const deletedScholars = await Scholarship.deleteMany({ userId: id });

    return sendResponse(c, 200, true, "تم حذف المستخدم بنجاح", {
      deleteUser,
      deletedScholars,
    });
  } catch (err) {
    console.error("Error in deleteUser:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};

export const sendReport = async (c: Context) => {
  try {
    const { name, email, message } = await c.req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
      debug: true,
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: "mohayyad2.0@gmail.com",
      subject: "إبلاغ جديد",
      html: `<p><strong>الاسم:</strong> ${name}</p>
               <p><strong>البريد الالكتروني:</strong> ${email}</p>
               <p><strong>المشكلة:</strong> ${message}</p>`,
    });

    return sendResponse(c, 200, true, "تم التبليغ عن المشكلة بنجاح", {
      name,
      email,
      message,
    });
  } catch (err) {
    console.error("Error in sendReport:", err);
    return sendResponse(c, 500, false, "حصل خطأ في السيرفر", undefined, err);
  }
};
