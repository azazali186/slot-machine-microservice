import { BaseEntity } from 'typeorm';
import { RoleStatus } from '../role-status.enum';
import { User } from 'src/auth/entities/user.entity';
export declare class Role extends BaseEntity {
    id: string;
    name: string;
    status: RoleStatus;
    user: User;
}
