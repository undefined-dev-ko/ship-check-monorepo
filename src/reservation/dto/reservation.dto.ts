import { IsNotEmpty } from "class-validator";
import { Reservation } from "../reservation.entity";

export class CreateReservationRequest {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  seatId: number;
}

export class CreateReservationResponse extends Reservation {}

export class DeleteReservationDto {
  @IsNotEmpty()
  id: number;
}
