import{menuItemModel}from'./menuItemModel';
export interface cartItemModel {
    id?: number;
    menuItemId?: number;
    menuItem?: menuItemModel;
    quantity?: number;
  }