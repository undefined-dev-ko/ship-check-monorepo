import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({ description: "책상 번호" })
  deskNo: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "fixedUserId" })
  @ApiProperty({ description: "고정 user의 id" })
  fixedUserId: number;
}
