import express from "express";
import db from "../utilitis/db";
const questionsRoute = express.Router();

// Xây dựng một API với phương thức GET cho phép lấy một question theo question_id

questionsRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.execute(
      "SELECT * FROM question WHERE question_id = ?",
      [id]
    );
    const [rows] = data;
    return res.json({
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//Xây dựng một API với phương thức GET cho phép lấy về một question với toàn bộ answers của question đó

questionsRoute.get("/:id/answers", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.execute(
      "SELECT * FROM answer WHERE question_id = ?",
      [id]
    );
    const [rows] = data;
    return res.json({
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//Xây dựng một API với phương thức GET cho phép lấy về toàn bộ questions

// Xây dựng một API với phương thức GET cho phép lấy về toàn bộ questions theo các tiêu chí lọc là category, level, limit (Số lượng câu hỏi muốn lấy về)
questionsRoute.get("/", async (req, res) => {
  try {
    const {
      category,
      level,
      limit,
    }: { category?: string; level?: string; limit?: number } = req.query;
    const params: any[] = [];
    let query = "SELECT * FROM question";
    if (category) {
      query += ` WHERE category_id = '${category}'`;
      params.push(category);
    }
    if (level) {
      query += ` AND level = '${level}'`;
      params.push(level);
    }
    if (limit) {
      query += ` LIMIT ${limit}`;
      params.push(limit);
    }
    const data = await db.execute(query, params);
    const [rows] = data;
    return res.json({
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//Xây dựng một API với phương thức POST cho phép thêm mới một questions

questionsRoute.post("/", async (req, res) => {
  try {
    const { category_id, created_at, level, conten } = req.body;
    const data = await db.execute(
      "INSERT INTO question (category_id,created_at, conten, level) VALUES (?, ?, ?, ?)",
      [category_id, created_at, conten, level]
    );
    const [rows] = data;
    return res.json({ status: 200, data: rows });
  } catch (error) {
    console.log(error);
  }
});

export default questionsRoute;
