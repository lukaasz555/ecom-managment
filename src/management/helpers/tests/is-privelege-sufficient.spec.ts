import { PrivilegesEnum } from '@src/enums';
import { isPrivelegeSufficient } from '@src/management/helpers/is-privelege-sufficient';

describe('isPrivilegeSufficient', () => {
  it('user has full privileges - always should return true', () => {
    expect(
      isPrivelegeSufficient(PrivilegesEnum.FULL, PrivilegesEnum.FULL),
    ).toBe(true);

    expect(
      isPrivelegeSufficient(PrivilegesEnum.FULL, PrivilegesEnum.MANAGE),
    ).toBe(true);

    expect(
      isPrivelegeSufficient(PrivilegesEnum.FULL, PrivilegesEnum.READONLY),
    ).toBe(true);

    expect(
      isPrivelegeSufficient(PrivilegesEnum.FULL, PrivilegesEnum.NOT_ALLOWED),
    ).toBe(true);
  });

  it('user has manage privileges', () => {
    expect(
      isPrivelegeSufficient(PrivilegesEnum.MANAGE, PrivilegesEnum.FULL),
    ).toBe(false);

    expect(
      isPrivelegeSufficient(PrivilegesEnum.MANAGE, PrivilegesEnum.MANAGE),
    ).toBe(true);

    expect(
      isPrivelegeSufficient(PrivilegesEnum.MANAGE, PrivilegesEnum.READONLY),
    ).toBe(true);

    expect(
      isPrivelegeSufficient(PrivilegesEnum.MANAGE, PrivilegesEnum.NOT_ALLOWED),
    ).toBe(true);
  });

  it('user has readonly privileges', () => {
    expect(
      isPrivelegeSufficient(PrivilegesEnum.READONLY, PrivilegesEnum.FULL),
    ).toBe(false);

    expect(
      isPrivelegeSufficient(PrivilegesEnum.READONLY, PrivilegesEnum.MANAGE),
    ).toBe(false);

    expect(
      isPrivelegeSufficient(PrivilegesEnum.READONLY, PrivilegesEnum.READONLY),
    ).toBe(true);

    expect(
      isPrivelegeSufficient(
        PrivilegesEnum.READONLY,
        PrivilegesEnum.NOT_ALLOWED,
      ),
    ).toBe(true);
  });

  it('user has not allowed privileges - always should return false', () => {
    expect(
      isPrivelegeSufficient(
        PrivilegesEnum.NOT_ALLOWED,
        PrivilegesEnum.NOT_ALLOWED,
      ),
    ).toBe(false);

    expect(
      isPrivelegeSufficient(
        PrivilegesEnum.NOT_ALLOWED,
        PrivilegesEnum.READONLY,
      ),
    ).toBe(false);
    expect(
      isPrivelegeSufficient(PrivilegesEnum.NOT_ALLOWED, PrivilegesEnum.MANAGE),
    ).toBe(false);
    expect(
      isPrivelegeSufficient(PrivilegesEnum.NOT_ALLOWED, PrivilegesEnum.FULL),
    ).toBe(false);
  });
});
