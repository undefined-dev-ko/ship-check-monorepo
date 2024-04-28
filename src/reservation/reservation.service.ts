import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Reservation } from "./reservation.entity";
import {
  CreateReservationRequest,
  GetReservationListResponse,
} from "./dto/reservation.dto";
import { DataSource } from "typeorm";
import { User } from "src/user/user.entity";

@Injectable()
export class ReservationService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {}

  async getReservationList(reservedAt): Promise<GetReservationListResponse> {
    const reservationList = await this.dataSource.manager.find(Reservation, {
      where: { reservedAt },
    });

    return { list: reservationList };
  }

  async createReservation(
    payload: CreateReservationRequest
  ): Promise<Reservation> {
    const reservation = this.dataSource.manager.create<
      Reservation,
      Partial<Reservation>
    >(Reservation, {
      ...payload,
    });

    return await this.dataSource.manager.save(reservation);
  }
}
