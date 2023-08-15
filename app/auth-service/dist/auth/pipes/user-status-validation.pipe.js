"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatusValidationPipes = void 0;
const common_1 = require("@nestjs/common");
const user_status_enum_1 = require("../user-status.enum");
class UserStatusValidationPipes {
    constructor() {
        this.userStatus = [user_status_enum_1.UserStatus.ACTIVE, user_status_enum_1.UserStatus.INACTIVE];
    }
    transform(value) {
        let val = value.status;
        if (val) {
            val = val.toUpperCase();
            if (!this.isValidStatus(val)) {
                throw new common_1.BadRequestException({
                    statusCode: 400,
                    message: `invalid product status ${val}`,
                });
            }
            value.status = val;
        }
        return value;
    }
    isValidStatus(status) {
        const idx = this.userStatus.indexOf(status);
        return idx !== -1;
    }
}
exports.UserStatusValidationPipes = UserStatusValidationPipes;
//# sourceMappingURL=user-status-validation.pipe.js.map