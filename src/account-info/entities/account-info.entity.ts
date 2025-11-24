import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'accounts',
})
export class AccountInfo {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column()
  account_title: string;

  @Column()
  account_type: string;

  @Column()
  account_icon: string;

  @Column()
  account_time: Date;

  @Column('decimal', {
    precision: 11, // 总共 11 位
    scale: 2, // 小数点后 2 位
    nullable: false,
  })
  account_ammount: number;

  @Column()
  userId: number;
}
