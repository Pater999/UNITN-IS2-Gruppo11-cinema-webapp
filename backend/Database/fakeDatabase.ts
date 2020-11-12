import { FareDto } from '../models/DTO/FareDto';
import { Room } from '../models/DTO/RoomDTO';
import { MovieDTO } from '../models/DTO/MovieDTO'
import { PlanningDTO } from '../models/DTO/PlanningDTO';
import { RoomRowDTO } from '../models/DTO/RoomRowDTO';

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
        new Room(1, "Sala1", [new RoomRowDTO(1, 20), new RoomRowDTO(2,20)]),
        new Room(2, "Sala2", []),
        new Room(3, "Sala3", [new RoomRowDTO(1, 25), new RoomRowDTO(2,25)])
    ];

    static Movies =
    [
        new MovieDTO(
             1,
            "https://pad.mymovies.it/filmclub/2011/03/059/locandina.jpg",
            "IL Dittatore",
            "Per anni lo Stato immaginario africano di Wadiya (che nelle mappe corrisponde all'Eritrea) è stato sotto la dittatura dell'ammiraglio generale Hafez Aladeen, un despota infantile, violento, anti-occidentale e antisemita, circondato da guardie del corpo femminili.", 
            [new PlanningDTO(new Date(Date.now()), FakeDatabase.Rooms[0]), new PlanningDTO(new Date(Date.now()), FakeDatabase.Rooms[1])]
            ),

            new MovieDTO(
            2,
            "https://images-na.ssl-images-amazon.com/images/I/71NPE6hH2DL._SL1288_.jpg",
            "Grimsby",
            "A causa di un nuovo e delicato incarico Sebastian Graves, agente segreto dei Black Ops britannici, si ritrova a collaborare con il fratello Nobby Butcher, con cui non aveva più rapporti da circa 30 anni.",
            [new PlanningDTO(new Date(Date.now()), FakeDatabase.Rooms[0]), new PlanningDTO(new Date(Date.now()), FakeDatabase.Rooms[1])]
            )
    ];
}

