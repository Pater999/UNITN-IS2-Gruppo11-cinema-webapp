
export class RoomDTO
{
    Id: number;
    Name: string;
    Seats: number;

    constructor(id: number, name: string, seats: number)
    {
        this.Name = name;
        this.Seats = seats;
        this.Id = id;
    }
}