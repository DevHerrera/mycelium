import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
export enum UserType {
  COMPANY = 'company',
  USER = 'user',
}
//        id, userId, title, description, profileImageUrl, backgroundImageUrl, qrCode
//       cssTheme?

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  profileImageUrl: string;

  @Column({ nullable: false })
  backgroundImageUrl: string;

  @Column({ nullable: false })
  qrCode: string;

  @Column({
    nullable: false,
    type: 'uuid',
  })
  userId: string;

  @OneToOne(() => User, (user) => user.page)
  @JoinColumn({ name: 'userId' })
  user: User;
}
