import { HttpException, HttpStatus } from '@nestjs/common';

export function validatePositiveIntegers(idsArray: number[]): void {
  if (!idsArray.every(id => Number.isInteger(id) && id > 0)) {
    throw new HttpException('Invalid input. IDs must be positive integers.', HttpStatus.BAD_REQUEST);
  }
}