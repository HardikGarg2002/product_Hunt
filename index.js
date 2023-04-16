const express = require("express");
const ProductService = require("./ProductService");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const { deleteProductById } = require("./ProductDAO");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  let products = await ProductService.getProducts();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  let id = req.params.id;
  let product = await ProductService.getProducts(id);
  if (!product) {
    res.status(404).send("Product not found");
  } 
  res.json(product);
});

app.post("/products", async (req, res) => {
  let product = req.body;
  let statusState=await ProductService.addProduct(product);
  if(statusState)
  res.status(201).send(product);
  else
  res.status(400).send('error');
});
app.put("/products",(req,res)=>{
  let product = req.body;
  ProductService.updateProduct(product)
  res.status(200).send(product);
});
app.delete("/product/:id",(req,res)=>{
  let id=req.params.id;
  deleteProductById(id);
  res.status(200).send("deleted");
})

app.listen(port, () => {
  console.log(`Product app listening on port ${port}`);
});