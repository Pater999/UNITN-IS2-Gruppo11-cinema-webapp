import PlanningDTO from './PlanningDTO';

export default interface MovieDTO
{
    _id: string;
    imageUrl: string;
    title: string;
    desc: string;
    plans: PlanningDTO[];
}