const csv = require("csvtojson")
const fs = require("fs")

csv()
  .fromFile("./amazondataset/amz_ca_total_products_data_processed.csv")
  .then((jsonArray) => {
    fs.writeFileSync("products.json", JSON.stringify(jsonArray, null, 2))
    console.log("Converted successfully")
  })