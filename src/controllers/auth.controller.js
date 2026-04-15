import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "../config/db.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(email,password) VALUES($1,$2) RETURNING id,email",
      [email, hashed],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ msg: "User already exists" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (!user.rows.length) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
