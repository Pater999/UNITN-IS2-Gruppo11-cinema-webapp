export default class Movie
{
    ImageUrl: string;
    Title: string;
    Desc: string;

    constructor(imageUrl: string, title: string, desc: string)
    {
        this.ImageUrl = imageUrl;
        this.Title = title;
        this.Desc = desc;
    }
}