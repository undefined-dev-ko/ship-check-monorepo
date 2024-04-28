import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Reservation } from "./reservation.entity";
import {
  CancelReservationRequest,
  CreateReservationRequest,
  GetReservationListResponse,
} from "./dto";
import { DataSource } from "typeorm";

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

  async cancelReservation(payload: CancelReservationRequest): Promise<void> {
    const reservation = this.dataSource.manager.findOne(Reservation, {
      where: { ...payload },
    });

    if (!reservation) {
      throw new NotFoundException("해당 예약이 존재하지 않습니다.");
    }

    await this.dataSource.manager.softDelete(Reservation, {
      ...payload,
    });
  }
}
