import { ModulesEnum } from '@src/common/enums/modules.enum';

export const mapControllerToModuleName = (controllerName: string) => {
  switch (controllerName) {
    case 'StaffController':
      return ModulesEnum.STAFF_MEMBERS;
    case 'OrdersController':
      return ModulesEnum.ORDERS;
    case 'ProductsController':
      return ModulesEnum.PRODUCTS;
    case 'CustomersController':
      return ModulesEnum.CUSTOMERS;
    case 'DiscountsController':
      return ModulesEnum.DISCOUNTS;
    case 'ReportsController':
      return ModulesEnum.REPORTS;
    case 'AuthController':
      return ModulesEnum.AUTH;
    case 'AccountController':
      return ModulesEnum.ACCOUNT;
    case 'SettingsController':
      return ModulesEnum.SETTINGS;
    case 'PaymentsController':
      return ModulesEnum.PAYMENTS;
    case 'CategoriesController':
      return ModulesEnum.CATEGORIES;
  }
};
