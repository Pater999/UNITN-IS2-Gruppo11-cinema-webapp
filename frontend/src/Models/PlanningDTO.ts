import { RoomDTO } from './RoomDTO';

export default interface PlanningDTO
{
    _id: string;
    date: Date;
    room: RoomDTO;
}