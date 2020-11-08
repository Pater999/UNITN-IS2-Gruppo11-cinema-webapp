import { FareDto } from '../models/DTO/FareDto';
import { RoomDTO } from '../models/DTO/RoomDTO';

export class FakeDatabase
{
    static Admin = {
        username: 'admin',
        password: 'admin'
    };
    
    static Fares = 
    [
        new FareDto(1, "bambini", 8.50, "fino a 15"),
        new FareDto(2, "adulti", 10.0, ""),
        new FareDto(3, "studenti", 9.50, "solo per studenti universitari")
    ];

    static Rooms = 
    [
        new RoomDTO(1, "Sala1", 100),
        new RoomDTO(2, "Sala2", 150),
        new RoomDTO(3, "Sala3", 200)
    ];
}

