import { RoomDTO } from "./RoomDTO";

export interface PlanningDTO
{
    _id: string;
    date: Date;
    room: RoomDTO;
    roomId: string;
}