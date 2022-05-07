export const get_absolute_url=(url:string):string=>{
    if(url.startsWith('http') || url.startsWith('https')){
        return url
    }else {
        return `http://localhost:8000${url}/`
    }
}