import { IsNotEmpty } from "class-validator";
import { Reservation } from "./reservation.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReservationRequest {
  // TODO: 토큰으로 어떤 유저인지 알 수 있는지?
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  seatId: number;

  // TODO: YYYYMMDD 형식 검증?
  @IsNotEmpty()
  reservedAt: string;
}

export class CreateReservationResponse extends Reservation {}

export class GetReservationListResponse {
  @ApiProperty({ description: "예약 리스트", isArray: true, type: Reservation })
  list: Reservation[];
}

export class CancelReservationRequest {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  seatId: number;

  @IsNotEmpty()
  reservedAt: string;
}
