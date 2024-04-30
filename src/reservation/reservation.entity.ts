import { ApiProperty } from "@nestjs/swagger";
import { Seat } from "src/seat/seat.entity";
import { User } from "src/user/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "userId" })
  @ApiProperty({ description: "유저 아이디" })
  userId: number;

  @ManyToOne(() => Seat, { eager: true })
  @JoinColumn({ name: "seatId" })
  @ApiProperty({ description: "자리 아이디" })
  seatId: number;

  @Column()
  @ApiProperty({ description: "예약 날짜 YYYYMMDD 형식" })
  reservedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
