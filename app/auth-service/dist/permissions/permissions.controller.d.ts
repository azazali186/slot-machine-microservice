import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePermissionDto: UpdatePermissionDto): string;
    remove(id: string): string;
}
