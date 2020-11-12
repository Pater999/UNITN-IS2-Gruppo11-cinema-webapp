export class RoomRowDTO
{
    RowId: number;
    SeatsNumber: number;

    constructor(id: number, seatsNumber: number)
    {
        this.RowId = id;
        this.SeatsNumber = seatsNumber;
    }
}