import { PrismaQuery } from '../types/prisma-query';

export interface IPrismaQueryBuilder {
  buildPrismaQuery(): PrismaQuery;
}
