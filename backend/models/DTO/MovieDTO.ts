export class MovieDTO
{
    Id: number;
    Title: string;
    Desc: string;
    ImageUrl: string;

    constructor(id: number, title: string, desc: string, imageUrl: string)
    {
        this.Title = title;
        this.ImageUrl = imageUrl;
        this.Desc = desc;
        this.Id = id;
    }
}