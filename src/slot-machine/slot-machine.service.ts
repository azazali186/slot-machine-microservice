/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable prettier/prettier */
// // slot-machine.service.ts

// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class SlotMachineService {
//   private readonly reelSymbols: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; // Add more symbols if needed
//   private readonly regularWinPercentage: number = 0.008; // Adjust the regular winning percentage as needed
//   private readonly jackpotWinPercentage: number = 100; // Adjust the jackpot winning percentage as needed
//   private readonly jackpotAmount: number = 25000;

//   generateRandomReels(reelCount: number): string[] {
//     const reels: string[] = [];
//     for (let i = 0; i < reelCount; i++) {
//       const randomIndex = Math.floor(Math.random() * this.reelSymbols.length);
//       reels.push(this.reelSymbols[randomIndex]);
//     }
//     return reels;
//   }

//   checkForWinning(reels: string[]): { isWinner: boolean; reward: number } {
//     const uniqueSymbols = new Set(reels);
//     const symbolCounts = {};

//     for (const symbol of reels) {
//       symbolCounts[symbol] = symbolCounts[symbol] ? symbolCounts[symbol] + 1 : 1;
//     }

//     let isJackpot = false;
//     let reward = 0;

//     // Check for jackpot
//     if (Object.values(symbolCounts).includes(9)) {
//       isJackpot = true;
//       reward = this.jackpotAmount;
//     } else {
//       // Check for regular win
//       const winningReelCount = 3; // Minimum 3 same reels for a regular win
//       for (const symbol in symbolCounts) {
//         if (symbolCounts[symbol] >= winningReelCount) {
//           reward = Math.round((this.jackpotAmount * this.regularWinPercentage) / 100);
//           break;
//         }
//       }
//     }

//     return { isWinner: isJackpot || reward > 0, reward };
//   }
// }

import { Injectable } from '@nestjs/common';

@Injectable()
export class SlotMachineService {
  private readonly reelSymbols: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  private readonly reelPrices: { [symbol: string]: number } = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
  };

  private readonly regularWinPercentage: number = 0.0025; // Adjust the regular winning percentage as needed
  private readonly jackpotWinPercentage: number = 0.0025; // Adjust the jackpot winning percentage as needed
  private readonly jackpotAmount: number = 25000;

  /*   getCombinationsBy(minLen, currentLength = 0, prefix = '') {
    const charset = this.reelSymbols;
    const maxLen = charset.length;
    const result = {};

    const generate = (charset, minLen, maxLen, prefix) => {
      if (prefix.length >= minLen) {
        result[prefix] = prefix.length * 10;
      }
      if (prefix.length >= maxLen) return;

      for (let i = 0; i < charset.length; i++) {
        generate(charset, minLen, maxLen, prefix + charset[i]);
      }
    };

    generate(charset, minLen, maxLen, prefix);
    return result;
  } */

  getCombinationsBy(minLen, currentLength = 0, prefix = '') {
    const charset = this.reelSymbols;
    const maxLen = charset.length;
    const result = {};

    for (let i = 0; i < charset.length; i++) {
      for (let j = minLen; j <= maxLen; j++) {
        const password = charset[i].repeat(j);
        if(password.length == maxLen){
            result[password] = this.jackpotAmount
        }else
        result[password] = j * 10;
      }
    }

    return result;
  }

  private winningCombinations: any = this.getCombinationsBy(2);

  generateRandomReels(reelCount: number): string[] {
    const reels: string[] = [];
    for (let i = 0; i < reelCount; i++) {
      const randomIndex = Math.floor(Math.random() * this.reelSymbols.length);
      reels.push(this.reelSymbols[randomIndex]);
    }
    return reels;
  }

  calculateReelPrice(reels: string[]): number {
    return reels.reduce((acc, curr) => acc + this.reelPrices[curr], 0);
  }

  checkForWinning(reels: string[]): { isWinner: boolean; reward: number } {
    const uniqueSymbols = new Set(reels);
    const symbolCounts = {};

    for (const symbol of reels) {
      symbolCounts[symbol] = symbolCounts[symbol]
        ? symbolCounts[symbol] + 1
        : 1;
    }
    const reelCombinations = [];
    for (let i = 0; i < reels.length - 1; i++) {
      reelCombinations.push(reels[i] + reels[i + 1] /* + reels[i + 2] */);
    }
    let isJackpot = false;
    let reward = 0;

    if (Object.values(symbolCounts).includes(reels.length)) {
      isJackpot = true;
      reward = this.jackpotAmount;
    } else {
      const winningReelCount = 2; // Minimum 3 same reels for a regular win
      for (const symbol in symbolCounts) {
        if (symbolCounts[symbol] >= winningReelCount) {
         for (let j = 0; j < reelCombinations.length; j++){
            if (this.winningCombinations[reelCombinations[j]]) {
                reward += this.winningCombinations[reelCombinations[j]];
                break;
              } else {
                reward = Math.round(
                  (this.jackpotAmount * this.regularWinPercentage * symbolCounts[symbol]) / 100,
                );
              }
         }
        }
      }
    }

    return { isWinner: reward > 0, reward };
  }
}
