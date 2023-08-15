import { BaseEntity } from 'typeorm';
export declare class RolePermission extends BaseEntity {
    id: string;
    roleId: string;
    permissionId: string;
}
