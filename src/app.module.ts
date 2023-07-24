import { Module } from '@nestjs/common';
import { SlotMachineService } from './slot-machine/slot-machine.service';
import { SlotMachineController } from './slot-machine/slot-machine.controller';

@Module({
  imports: [],
  controllers: [SlotMachineController],
  providers: [SlotMachineService],
})
export class AppModule {}
