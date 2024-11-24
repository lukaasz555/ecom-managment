import { HttpStatus } from '@nestjs/common';

export type BaseResponse<T = undefined> = {
  status: HttpStatus;
  message?: string;
  data?: T;
};
