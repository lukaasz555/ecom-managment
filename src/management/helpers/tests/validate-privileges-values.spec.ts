// import { PrivilegesType } from '@src/management/types';
// import { validatePrivilegesValues } from '../validate-privileges-values';
// import { PrivilegesEnum } from '@src/enums';

// const privileges = {
//   account: PrivilegesEnum.FULL,
//   auth: PrivilegesEnum.FULL,
//   customers: PrivilegesEnum.FULL,
//   discounts: PrivilegesEnum.FULL,
//   products: PrivilegesEnum.FULL,
//   reports: PrivilegesEnum.FULL,
//   orders: PrivilegesEnum.FULL,
//   payments: PrivilegesEnum.FULL,
//   settings: PrivilegesEnum.FULL,
//   staffMembers: PrivilegesEnum.FULL,
// } as PrivilegesType;

// describe('validate privileges values', () => {
//   const privilegesCopy = JSON.parse(
//     JSON.stringify(privileges),
//   ) as PrivilegesType;

//   it('should return false if some privilege doesnt exist', () => {
//     const privilegesForTest = Object.assign(privilegesCopy, {
//       payments: 'test',
//     }) as PrivilegesType;
//     expect(validatePrivilegesValues(privilegesForTest)).toBe(false);
//   });

//   it('should return false - case sensitive', () => {
//     const privilegesForTest = Object.assign(privilegesCopy, {
//       staffMembers: 'reAdOnLy',
//     }) as PrivilegesType;
//     expect(validatePrivilegesValues(privilegesForTest)).toBe(false);
//   });

//   it('should return true - all privileges are correct', () => {
//     expect(validatePrivilegesValues(privileges)).toBe(true);
//   });
// });
