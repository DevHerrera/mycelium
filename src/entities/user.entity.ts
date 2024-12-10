import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Link } from './link.entity';
import { Page } from './page.entity';
export enum UserType {
  COMPANY = 'company',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  lastActive: Date;

  @Column({ type: 'enum', enum: UserType, default: UserType.USER })
  type: UserType;

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  @OneToOne(() => Page, (page) => page.user)
  page: Page;
}
