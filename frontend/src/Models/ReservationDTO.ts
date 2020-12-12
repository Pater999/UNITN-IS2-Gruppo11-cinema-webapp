import { FareDto } from './FareDto';
import { userDTO } from './UserDTO';

export default interface ReservationDTO {
  reservationId: string;
  date: Date;
  movieTitle: string;
  movieId: string;
  user: userDTO;
  fare: FareDto;
}
