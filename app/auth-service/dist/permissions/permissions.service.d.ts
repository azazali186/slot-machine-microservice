import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsService {
    create(createPermissionDto: CreatePermissionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePermissionDto: UpdatePermissionDto): string;
    remove(id: number): string;
}
