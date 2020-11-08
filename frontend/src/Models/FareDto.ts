export class FareDto
{
    Id: number;
    Name: string;
    Price: number;
    Desc: string;

    constructor(id: number, name: string, price: number, desc: string)
    {
        this.Name = name;
        this.Price = price;
        this.Desc = desc;
        this.Id = id;
    }
}