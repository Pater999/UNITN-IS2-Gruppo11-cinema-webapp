import UrlLibrary = require("url");

export function isValidURL(s: string): boolean
{
    let res: boolean = false;
    try 
    {
        new UrlLibrary.URL(s);
        res = true;
    } 
    catch (err) {}
    
    return res;
}