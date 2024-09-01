import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { GetSeatListResponse } from "./dto";
import { Seat } from "./seat.entity";

@Injectable()
export class SeatService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getSeatList(): Promise<GetSeatListResponse> {
    return {
      list: await this.dataSource.manager.find(Seat, { relations: ["items"] }),
    };
  }
}
