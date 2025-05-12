export interface CreateBlogDTO{
    title:string;
    body:string;
}

export interface UpdateBlogDTO{
    title?:string;
    body?:string;
}