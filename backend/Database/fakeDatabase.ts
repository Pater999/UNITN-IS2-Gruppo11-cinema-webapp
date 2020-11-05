import { FareDto } from '../models/DTO/FareDto';

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
}

