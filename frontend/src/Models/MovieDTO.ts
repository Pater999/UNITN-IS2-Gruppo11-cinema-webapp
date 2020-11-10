import PlanningDTO from './PlanningDTO';

export default class MovieDTO
{
    Id: number;
    ImageUrl: string;
    Title: string;
    Desc: string;
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