import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../roles/entities/role.entity").Role[];
        token: import("./entities/token.entity").Token;
    }>;
    findAll(filterDto: SearchUserDto): Promise<User[]>;
    findOne(id: string): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        token: any;
        id: string;
        name: string;
        email: string;
        role: import("../roles/entities/role.entity").Role[];
    }>;
}
