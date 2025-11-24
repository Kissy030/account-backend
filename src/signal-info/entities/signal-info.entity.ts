import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'signals',
})
export class SignalInfo {
  @PrimaryGeneratedColumn()
  signal_id: number;

  @Column()
  @IsNotEmpty()
  signal_title: string;

  @Column()
  signal_icon: string;

  @Column()
  userId: number;
}
