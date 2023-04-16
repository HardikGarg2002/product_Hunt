const ProductDAO = require("./ProductDAO");
const Product=require("./module/product");


let getProducts = async (name) => {
  const productArray = (await ProductDAO.getProductsFromDB()).map(product => {
    const prd=new Product(product.id,product.name,product.visit_url,product.icon_url,product.long_description,product.small_description);
    prd.setImages(product.images);
    prd.setComments(product.comments);
    return prd; 
  });
  // console.log("products")
  if(name)
  {
    let detailedProduct=await productArray.find((ele)=>ele.name===name)
    return detailedProduct?detailedProduct:"error";
  }
  else
  {
    // console.log(await productArray.map((ele)=> {
    //   ele.id,ele.name,ele.visit_url,ele.icon_url,ele.small_description,ele.upvotes,ele.tags}))
    return productArray.map((ele)=>{
    const {id,name,visitUrl,iconUrl,shortDescription,upvotes,tags,images,comments}=ele;
    const r={id,name,visitUrl,iconUrl,shortDescription,upvotes,tags,images,comments};
    return r;

    })
  }
  
  // console.log(await ProductDAO.getProductsFromDB());
};
async function myFunction() {
  console.log(await getProducts("amazonprime"),"344");
}
myFunction();

let addProduct = async (product) => {
  // console.log(await isValidProduct(product, "productservices-addproduct"))
  if(await isValidProduct(product))
  {
    console.log("product dont exist")
    await ProductDAO.addProductById(product);
    return true;
  }
  return false;
};

let updateProduct= (productBody)=>{
  ProductDAO.updateProductById(productBody)
}

let isValidProduct=async (product)=>{
  console.log("working")
  if(!(isValidUrl(product.visit_url)) || !(isValidDesc(product.long_description)) || !(isValidName(product.name)))
  return false;


  if(await ProductDAO.checkProductByNameExist(product.name))
  return false;
  return true;
}
let isValidName=(name1)=>{
  const validName=/^[A-Za-z]+$/
  if(name1.length >50 || name1.length===0 || !(validName.test(name1)))
  {
    console.log(`name is invalid as it can not contain "~!&-?:=@#$%^*()+[]{}|;'",><." these character and length must be in between 1 to 50`);
    return false;
  }
  return true;
}
let isValidUrl=(url)=>{
  const validUrl=/^[A-Za-z-=?/:&]+$/

  if(url.length >500 || url.length===0 || !(validUrl.test(url)))
  {
    console.log(`url is invalid as it can not contain "~!@#$%^*()+[]{}|;'",><." these character and length must be in between 1 to 500`);
    return false;
  }
  return true;
}

let isValidDesc=(desc)=>{
  const validDesc=/^[A-Za-z-#$@&*%0-9]+$/
  if(desc.length >500 || desc.length===0 || !(validDesc.test(desc)))
  {
    console.log(`description is invalid as it can not contain "~!^*()+[]{}|;'",><." these character and length must be in between 1 to 500`)
    return false;
  }
  return true;
}

module.exports = { getProducts, addProduct,updateProduct };
