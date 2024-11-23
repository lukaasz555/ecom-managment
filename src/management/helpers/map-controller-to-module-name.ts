import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';

export const mapControllerToModuleName = (controllerName: string) => {
  switch (controllerName) {
    case 'StaffController':
      return DashboardModulesEnum.STAFF_MEMBERS;
    case 'ProductsController':
      return DashboardModulesEnum.PRODUCTS;
    case 'CategoriesController':
      return DashboardModulesEnum.CATEGORIES;
  }
};
