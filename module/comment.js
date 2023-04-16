class Comment{
    replies=[];
    constructor(id,user,productId,description)
    {
        this.id=id;
        this.user=user;
        this.productId=productId;
        this.description=description;
    }
    setReplies(reply){
        this.replies.push(reply)
    }
}