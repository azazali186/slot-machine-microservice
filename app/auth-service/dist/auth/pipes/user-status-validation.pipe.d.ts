import { PipeTransform } from '@nestjs/common';
import { UserStatus } from '../user-status.enum';
export declare class UserStatusValidationPipes implements PipeTransform {
    readonly userStatus: UserStatus[];
    transform(value: any): any;
    private isValidStatus;
}
