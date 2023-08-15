import { BaseEntity } from 'typeorm';
export declare class Permission extends BaseEntity {
    id: string;
    name: string;
    path: string;
}
