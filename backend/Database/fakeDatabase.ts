import { formatDiagnostic } from 'typescript';
import { FareDto } from '../models/DTO/FareDto';
import { RoomDTO } from '../models/DTO/RoomDTO';
import { MovieDTO } from '../models/DTO/MovieDTO'

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

    static Movies = 
    [
        new MovieDTO(
             1, 
            "IL Dittatore", 
            "Per anni lo Stato immaginario africano di Wadiya (che nelle mappe corrisponde all'Eritrea) è stato sotto la dittatura dell'ammiraglio generale Hafez Aladeen, un despota infantile, violento, anti-occidentale e antisemita, circondato da guardie del corpo femminili.", 
            "https://pad.mymovies.it/filmclub/2011/03/059/locandina.jpg"),
        
            new MovieDTO(
            2, 
            "Grimsby",
            "A causa di un nuovo e delicato incarico Sebastian Graves, agente segreto dei Black Ops britannici, si ritrova a collaborare con il fratello Nobby Butcher, con cui non aveva più rapporti da circa 30 anni.",
            "https://images-na.ssl-images-amazon.com/images/I/71NPE6hH2DL._SL1288_.jpg"
            )
    ];
}

