import express from "express";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();


// GET ALL MENU ITEMS (Student Menu Page)

router.get("/", async (req, res) => {

  try {

    const items = await MenuItem.find();

    res.json(items);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// ADD MENU ITEM (Admin)

router.post("/", async (req, res) => {

  try {

    const { name, price, image, category } = req.body;

    const item = new MenuItem({
      name,
      price,
      image,
      category
    });

    await item.save();

    res.json(item);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// DELETE MENU ITEM (Admin)

router.delete("/:id", async (req, res) => {

  try {

    await MenuItem.findByIdAndDelete(req.params.id);

    res.json({ message: "Menu item deleted" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

export default router;