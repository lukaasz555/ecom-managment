import { PrismaQuery } from '../types';

export interface IPrismaQueryBuilder {
  buildPrismaQuery(): PrismaQuery;
}
