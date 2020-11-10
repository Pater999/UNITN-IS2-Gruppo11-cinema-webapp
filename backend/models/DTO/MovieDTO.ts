import { PlanningDTO } from "./PlanningDTO"

export class MovieDTO
{
    Id: number;
    Title: string;
    Desc: string;
    ImageUrl: string;
    Plans: PlanningDTO[];

    constructor(id: number, imageUrl: string, title: string, desc: string, plans: PlanningDTO[])
    {
        this.Id = id;
        this.ImageUrl = imageUrl;
        this.Title = title;
        this.Desc = desc;
        this.Plans = plans;
    }
}