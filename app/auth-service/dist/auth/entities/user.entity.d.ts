import { BaseEntity } from 'typeorm';
import { UserStatus } from '../user-status.enum';
import { Role } from 'src/roles/entities/role.entity';
import { Token } from './token.entity';
export declare class User extends BaseEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    status: UserStatus;
    role: Role[];
    token: Token;
}
