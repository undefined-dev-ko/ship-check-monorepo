import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/team/team.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("user")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => Team, { eager: true })
  @JoinColumn({ name: "teamName" })
  @ApiProperty({ description: "team 이름" })
  team: string;

  @Column()
  name: string;

  @Column()
  photo: string;
}
