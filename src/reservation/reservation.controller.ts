import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
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
  GetReservationListResponse,
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

  @Get("/:reservedAt")
  @ApiOkResponse({ type: GetReservationListResponse })
  async getReservationList(
    @Param("reservedAt") reservedAt: string
  ): Promise<GetReservationListResponse> {
    return this.reservationService.getReservationList(reservedAt);
  }
}
