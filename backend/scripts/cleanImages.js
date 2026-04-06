const mongoose = require("mongoose");
const Products = require("../models/Product");

mongoose.connect("mongodb://localhost:27017/");

const cleanImages = async () => {
  try {
    console.log("Cleaning started...");

    const cursor = Products.find().cursor(); // memory efficient

    let count = 0;

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      let img = doc.imgUrl || doc.image || "";

      // check valid URL
      if (!img || !img.startsWith("http")) {
        const name = (doc.title || doc.name || "product")
          .split(" ")[0]
          .toLowerCase();

        img = `https://dummyimage.com/300x300/eeeeee/000000&text=${name}`;
      }

      doc.imgUrl = img;
      doc.image = img;

      await doc.save();
      count++;

      if (count % 1000 === 0) {
        console.log(`${count} products cleaned...`);
      }
    }

    console.log("Cleaning completed ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

cleanImages();