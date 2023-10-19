import express from "express";
import db from "../utilitis/db";

const categoryRoute = express.Router();

// Xây dựng một API với phương thức GET cho phép lấy toàn bộ dữ liệu về category

categoryRoute.get("/", async (req, res) => {
  try {
    const data = await db.execute("SELECT * FROM category");
    const [rows] = data;
    return res.json({
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
});

// Xây dựng một API với phương thức POST cho phép thêm mới một category

categoryRoute.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const data = await db.execute("INSERT INTO category (name) VALUES (?)", [
      name,
    ]);
    const [rows] = data;
    return res.json({
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//Xây dựng một API với phương thức GET cho phép lấy một category theo category_id

categoryRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.execute(
      "SELECT * FROM category WHERE category_id = ?",
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

export default categoryRoute;
