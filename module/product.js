class Product {
    images=[];
    tags=[];
    comments=[];
    constructor(id,name,visit_url,icon_url,long_description,small_description) {
        this.id=id;
        this.name = name;
        this.visitUrl=visit_url;
        this.iconUrl=icon_url;
        this.longDescription=long_description;
        this.shortDescription=small_description;
    }
    setTags(tags) 
    {
        this.tags=[...tags];
    }
    setImages(images)
    {
        this.images=[...images]
    }
    setComments(comments)
    {
        this.comments=[...comments]
    }
}
module.exports=Product;
