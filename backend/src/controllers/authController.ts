import { Context } from "hono";
import * as bcrypt from "bcryptjs";
import User from "../models/user";
import * as jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response";

export const register = async (c: Context) => {
  try {
    const { name, email, password, country } = await c.req.json();
    if (!name || !email || !password) {
      return sendResponse(c, 400, false, "يجب إدخال جميع الحقول المطلوبة");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(c, 400, false, "هذا البريد الإلكتروني مسجَّل بالفعل");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      country,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return sendResponse(c, 500, false, "خطأ في إعدادات الخادم");
    }

    const token = jwt.sign(
      { id: savedUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return sendResponse(c, 201, true, "تم إنشاء الحساب بنجاح", {
      token,
      user: {
        _id: savedUser._id.toString(),
        name: savedUser.name,
        country: savedUser.country,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return sendResponse(c, 500, false, "حدث خطأ في الخادم", undefined, error);
  }
};

export const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return sendResponse(
        c,
        400,
        false,
        "الرجاء إدخال البريد الإلكتروني وكلمة المرور"
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(
        c,
        400,
        false,
        "لا يوجد حساب مسجَّل بهذا البريد الإلكتروني"
      );
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return sendResponse(c, 400, false, "كلمة المرور غير صحيحة");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return sendResponse(c, 500, false, "خطأ في إعدادات الخادم");
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return sendResponse(c, 200, true, "تم تسجيل الدخول بنجاح", {
      token,
      user: {
        _id: user._id.toString(),
        name: user.name,
        country: user.country,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return sendResponse(c, 500, false, "حدث خطأ في الخادم", undefined, error);
  }
};
