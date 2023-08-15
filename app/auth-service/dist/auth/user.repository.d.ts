import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { SearchUserDto } from './dto/search-user.dto';
import { Role } from 'src/roles/entities/role.entity';
import { Token } from './entities/token.entity';
export declare class UserRepository extends Repository<User> {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    getUsers(filterDto: SearchUserDto): Promise<User[]>;
    register(registerDto: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: Role[];
        token: Token;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: any;
        id: string;
        name: string;
        email: string;
        role: Role[];
    }>;
}
