const express = require("express");
const router = express.Router();
const MenuItem = require("./schema"); 


router.put("/put_item/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ msg: "Please provide an ID" });
        }

        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).send({ msg: "All fields (name, description, price) are required" });
        }

        const updatedItem = await MenuItem.findByIdAndUpdate(
            id,
            { name, description, price },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).send({ msg: "Item not found" });
        }

        return res.status(200).send({ msg: "Item updated successfully", updatedItem });

    } catch (error) {
        console.error("PUT Error:", error);
        return res.status(500).send({ msg: "Something went wrong", error });
    }
});


router.delete("/delete_item/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ msg: "Please provide an ID" });
        }

        const deletedItem = await MenuItem.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).send({ msg: "Item not found" });
        }

        return res.status(200).send({ msg: "Item deleted successfully" });

    } catch (error) {
        console.error("DELETE Error:", error);
        return res.status(500).send({ msg: "Something went wrong", error });
    }
});

router.post("/menuItems_are", async (req, res) => {
    try {
      const { name, description, price } = req.body;
      if (!name || !description || !price) {
        return res.status(400).send({ msg: "Please provide all details" });
      }
  
      const item = new MenuItem({ name, description, price });
      await item.save();
      return res.status(201).send({ msg: "Item added successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ msg: "Something went wrong" });
    }
  });
  
  router.get('/item', async (req, res) => {
    try {
        const items = await MenuItem.find();
        return res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching menu:", error);
        return res.status(500).json({ msg: "Internal server error" });
   }
  });

module.exports = router;