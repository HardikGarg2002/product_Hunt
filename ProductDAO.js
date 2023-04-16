const mysql = require("mysql");
const util = require("util");
// const uuidv4 = require('uuid/v4');
// const id = uuidv4();
const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '12345678',
    // port:'3306',
    database: 'producthunt'
});
 
connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});
const query = util.promisify(connection.query).bind(connection);

// let getProductsFromDB = (callback) => {
//   connection.query("SELECT * FROM product", (err, rows, fields) => {
//     if (err) throw err;
//     callback(rows);
//   });
// };
let detailedProduct;

let getProductsFromDB = async () => {
  //this will fetch all products details including images and comments and no_of upvotes if any in detailedProduct
  detailedProduct= await query('SELECT p.id,p.name,p.small_description,p.visit_url,p.icon_url,p.long_description,created_on,created_by,updated_on,updated_by,GROUP_CONCAT(DISTINCT image.url SEPARATOR ",") AS images, GROUP_CONCAT(DISTINCT comment.description SEPARATOR ",") AS comments, COUNT(DISTINCT upvote.user_id) as upvote_count FROM product p left JOIN image ON image.prod_id = p.id left JOIN comment ON comment.prod_id = p.id LEFT JOIN upvote ON upvote.prod_id = p.id GROUP BY p.id');
  //this map function will convert image and comment field value of every product which was earlier a string into array in detailedProduct
  detailedProduct = detailedProduct.map(row => ({
  ...row,
  images: row.images ? row.images.split(','):[],
  comments: row.comments ? row.comments.split(','):[]
  }));
  // id=Number(id);
  //this will return result of /product/id
  // console.log(await detailedProduct)
  return detailedProduct;
  // if(id)
  // {
  //   detailedProduct=detailedProduct.find(ele=>ele.id===id);
  //   return detailedProduct;
  // }
  //this will return result of /products
  // else
  // {
  //   let homePageProducts=[];
  //   detailedProduct.forEach((ele)=>{
  //   const {name,small_description,icon_url,visit_url,upvote_count}=ele;
  //   let product={name,small_description,icon_url,visit_url,upvote_count};
  //   homePageProducts.push(product);
  //   });
  //   return homePageProducts;
  // }
};
// console.log(getProductsFromDB());


// let addProductById =async (product) => {
//   let sql = "INSERT INTO product (id, name, small_description, visit_url, icon_url, long_description,created_on,created_by,updated_on,updated_by) VALUES ?";
//   let values =[[product.id, product.name, product.small_description,product.visit_url,product.icon_url,product.long_description,product.created_on,product.created_by,product.updated_on,product.updated_by]];
//   connection.query(sql,[values], function(err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted:");
// });
// }


// let updateProductById=async(productBody)=>{
//   let sql = `UPDATE product SET ? WHERE id=${productBody.id}`;
//   connection.query(sql,[productBody],function (err, result) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated");
//   });
// }
// let deleteProductById=async(id)=>{

//   var sql = `DELETE FROM product WHERE id = ${id}`;
//   connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });
// }
// try {
//   // Attempt to execute some code that might throw an error
//   const result = someFunctionThatMightThrowAnError();
//   console.log(`The result is ${result}`);
// } catch (error) {
//   // Handle the error
//   console.error(`An error occurred: ${error.message}`);
// }
// let checkProductByNameExist= async (name1)=>{
//   let productStatus = detailedProduct.find((prd)=>prd.name===name1);
//   // console.log("product already exist: " + result.length);
//   if(productStatus)
//   {
//     console.log("product dont exist: " + productStatus);
//     return true;
//   }
//   return false;
// }

// try {
// updateProductById(productBody)
// } catch (error) {
//   // Handle the error
//   console.error(`An error occurred: ${error.message}`);
// }
// // checkProductByNameExist()
// ,addProductById,updateProductById,deleteProductById,checkProductByNameExist 
module.exports = { getProductsFromDB};
