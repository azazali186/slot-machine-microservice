"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const crypto_js_1 = require("crypto-js");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const role_entity_1 = require("../roles/entities/role.entity");
let UserRepository = exports.UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(userRepository, jwtService) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async getUsers(filterDto) {
        const { status, search } = filterDto;
        const query = this.userRepository.createQueryBuilder('user');
        if (status) {
            query.andWhere('user.status = :status', { status });
        }
        if (search) {
            query.andWhere('(user.name LIKE :search OR user.email LIKE :search)', {
                search: `%${search}%`,
            });
        }
        const products = await query
            .leftJoinAndSelect('user.role', 'role')
            .getMany();
        return products;
    }
    async register(registerDto) {
        const { name, email } = registerDto;
        const oldUser = await this.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });
        let roleId;
        let roleName;
        let role = await role_entity_1.Role.findOne({
            where: {
                name: 'customer',
            },
        });
        if (!role) {
            role = role_entity_1.Role.create({
                name: 'customer',
            });
            await role.save();
            roleId = role.id;
            roleName = role.name;
        }
        else {
            roleId = role.id;
            roleName = role.name;
        }
        if (oldUser) {
            throw new common_1.NotFoundException({
                statusCode: 404,
                message: `User registered with ${email} email`,
            });
        }
        const hashPassord = crypto_js_1.AES.encrypt(registerDto.password, process.env.ENCRYPTION_KEY).toString();
        const user = new user_entity_1.User();
        user.name = name;
        user.email = email.toLowerCase();
        user.password = hashPassord;
        user.role = [role];
        await user.save();
        const { status, password, ...others } = user;
        return { ...others };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (!user) {
            throw new common_1.NotFoundException({
                statusCode: 404,
                message: `User not registered with ${email} email`,
            });
        }
        const hashPassord = crypto_js_1.AES.decrypt(user.password, process.env.ENCRYPTION_KEY).toString(crypto_js_1.enc.Utf8);
        if (hashPassord === password) {
            const { password, status, ...others } = user;
            const payload = { sub: user.id, username: user.email };
            const token = await this.jwtService.signAsync(payload, {
                secret: `${process.env.JWT_SECRET}`,
            });
            return {
                ...others,
                token: crypto_js_1.AES.encrypt(token, process.env.ENCRYPTION_KEY_TOKEN).toString(),
            };
        }
        throw new common_1.NotFoundException({
            statusCode: 404,
            message: `Email and password combination incorrect`,
        });
    }
};
exports.UserRepository = UserRepository = __decorate([
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map