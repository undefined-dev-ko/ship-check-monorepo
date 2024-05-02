import { Controller, Get } from "@nestjs/common";

import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetSeatListResponse } from "./dto";
import { SeatService } from "./seat.service";

@ApiTags("seat")
@Controller("seat")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get()
  @ApiOkResponse({ type: GetSeatListResponse })
  async getSeatList(): Promise<GetSeatListResponse> {
    return this.seatService.getSeatList();
  }
}
