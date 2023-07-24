/* eslint-disable prettier/prettier */
// // slot-machine.controller.ts

// import { Controller, Get } from '@nestjs/common';
// import { SlotMachineService } from './slot-machine.service';

// @Controller('slot-machine')
// export class SlotMachineController {
//   constructor(private readonly slotMachineService: SlotMachineService) {}

//   @Get('play')
//   playSlotMachine(): { isWinner: boolean; reward: number; reels: string[] } {
//     const reels = this.slotMachineService.generateRandomReels(9);
//     const { isWinner, reward } = this.slotMachineService.checkForWinning(reels);
//     return { isWinner, reward, reels };
//   }
// }



import { Controller, Get } from '@nestjs/common';
import { SlotMachineService } from './slot-machine.service';

@Controller('slot-machine')
export class SlotMachineController {
  constructor(private readonly slotMachineService: SlotMachineService) {}

  @Get('play')
  playSlotMachine(): { isWinner: boolean; reward: number; reels: string[]; cost: number } {
      const reels = this.slotMachineService.generateRandomReels(7);
    const cost = 1
    const { isWinner, reward } = this.slotMachineService.checkForWinning(reels);
    return { isWinner, reward, reels, cost };
  }
}
