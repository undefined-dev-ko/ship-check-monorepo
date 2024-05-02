import { ApiProperty } from "@nestjs/swagger";

import { Seat } from "./seat.entity";

export class GetSeatListResponse {
  @ApiProperty({ description: "자리 리스트", isArray: true, type: Seat })
  list: Seat[];
}
