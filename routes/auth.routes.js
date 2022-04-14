const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();
router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
    check("login", "Минимальная длина логина 3 символов").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          massage: "Некорректные данные при регистрации",
        });
      }
      const { login, email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ massage: "Такой пользователь Есть" });
      }
      const hasPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hasPassword, login });

      await user.save();
      res.status(201).json({ massage: "Пользователь создан!!!" });
    } catch (e) {
      res.status(500).json({ message: "Ошибка" });
    }
  }
);
router.post(
  "/login",
  [
    check("login", "Введите коректный логин!").isLength({ min: 3 }),
    check("password", "Минимальная длина 6 символов").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          massage: "Некорректные данные при входе в систему",
        });
      }
      const { login, password } = req.body;

      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).json({ massage: "Пользователь не найден" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ massage: "Неверный пароль" });
      }
      const token = jwt.sign({ userId: user.id }, "test project api", {
        expiresIn: "2h",
      });
      res.status(200).json({
        token,
        userId: user.id,
        login: user.login,
        massage: "ok",
      });
    } catch (e) {
      res.status(500).json({ message: "Ошибка" });
    }
  }
);

module.exports = router;
