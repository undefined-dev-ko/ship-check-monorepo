import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { Reservation } from "./reservation.entity";
import { ReservationService } from "./reservation.service";
import { User } from "src/user/user.entity";
import {
  CreateReservationRequest,
  CreateReservationResponse,
} from "./dto/reservation.dto";

@ApiTags("reservation")
@Controller("reservation")
export class ReservationController {
  private logger = new Logger("Reservations");

  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOkResponse({ type: CreateReservationResponse })
  async createReservation(
    @Body() body: CreateReservationRequest
  ): Promise<CreateReservationResponse> {
    return this.reservationService.createReservation(body);
  }

  @Get()
  @ApiOperation({ summary: "사무실 자리 예약 현황 조회" })
  findAll(): string {
    return "This action returns all reservations";
  }
}
