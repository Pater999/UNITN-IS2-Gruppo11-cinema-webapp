
export class RegisterDto
{
    Id: number;
    Name: string;
    Surname: string;
    Username: string;
    Email: string;
    Password: string;

    constructor(id: number, name: string, surname: string, username: string, email: string, password: string)
    {
        this.Name = name;
        this.Surname = surname;
        this.Username = username;
        this.Email = email;
        this.Password = password;
        this.Id = id;
    }
}