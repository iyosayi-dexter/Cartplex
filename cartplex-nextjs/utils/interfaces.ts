export interface productListInterface {
    id:number ,
    main_thumbnail:string ,
    name:string ,
    price:string ,
    rating:string ,
    sale_discount:number ,
    slug:string,
}
interface productInterface extends productListInterface{
    description: string
    sizes: string[],
    date_added: string,
    category: number,
    brand: string | null
}
export interface productDetailInterface {
    product:productInterface,
    thumbnails:string[]
}

export interface userInterface {
    username:string,
    email:string,
    email_verified:boolean| null,
    isAutheticated:boolean | null,
    access:string | null,
    refresh:string | null
}

export interface validationInterface{
    valid:boolean ,
    info:null|string
}

export interface cartItemInterface {
    id:string,
    image_url:string,
    product_name:string,
    quantity:number,
    size:number | null,
    price:string,
    total:number
}