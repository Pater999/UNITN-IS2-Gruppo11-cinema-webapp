import { RoomDTO } from './RoomDTO';

export default class PlanningDTO
{
    Date: Date;
    Room: RoomDTO;

    constructor(date: Date, room: RoomDTO)
    {
        this.Date = date;
        this.Room = room;
    }
}