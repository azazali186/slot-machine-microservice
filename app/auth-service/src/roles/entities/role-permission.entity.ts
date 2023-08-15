/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolePermission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  roleId: string;
  @Column()
  permissionId: string;
}
