import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum LinkType {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  ONLYFANS = 'onlyfans',
  YOUTUBE = 'youtube',
  OTHER = 'other',
}
//id, title, description?, url, nsfw?, active, socialMedia?, linkIconUrl, userId
@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ nullable: true, default: false })
  nsfw: boolean;

  @Column({ type: 'enum', enum: LinkType, default: LinkType.OTHER })
  type: LinkType;

  @Column({
    nullable: false,
    type: 'uuid',
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.links)
  @JoinColumn({ name: 'userId' })
  user: User;
}
