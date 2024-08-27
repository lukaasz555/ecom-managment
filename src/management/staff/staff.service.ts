import { Injectable } from '@nestjs/common';

@Injectable()
export class StaffService {
  async getStaff(): Promise<string> {
    return 'return all staff members (if privileges allow)';
  }
}
