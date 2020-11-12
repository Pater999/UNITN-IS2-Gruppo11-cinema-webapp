import { RoomRowDTO } from './RoomRowDTO';

export interface RoomDTO {
  Id: number;
  Name: string;
  Seats: number | null;
}

export class Room implements RoomDTO {
  Id: number;
  Name: string;
  Seats: number | null;
  Rows: RoomRowDTO[];

  constructor(id: number, name: string, rows: RoomRowDTO[]) {
    this.Name = name;
    this.Seats = null;
    this.Id = id;
    this.Rows = rows;
  }
}
