export class RegisterDto
{
    Name: string;
    Surname: string;
    Username: string;
    Email: string;
    Password: string;

    constructor(name: string, surname: string, username: string, email: string, password: string)
    {
        this.Name = name;
        this.Surname = surname;
        this.Username = username;
        this.Email = email;
        this.Password = password;
    }
}