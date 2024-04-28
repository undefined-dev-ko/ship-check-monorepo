import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({ description: "책상 번호" })
  deskNo: number;

  @Column()
  @ApiProperty({ description: "고정 user의 id" })
  fixedUserId: number;
}
