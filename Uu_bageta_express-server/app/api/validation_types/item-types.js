/* eslint-disable */

const itemCreateDtoInType = shape({
  supplier:  string(50).isRequired(),	
  supplierLogo: string(50).isRequired(),
  name: string(50).isRequired(),
  ingredients: array().isRequired(),
  weight: int().isRequired(),
  allergens: array().isRequired(),
  Storage: string(50).isRequired(),
  bestBefore: date().isRequired(),
  Image: string(50).isRequired()
});

const itemUpdateDtoInType = shape({
  supplier:  string(50).isRequired(),	
  supplierLogo: string(50).isRequired(),
  name: string(50).isRequired(),
  ingredients: array().isRequired(),
  weight: int().isRequired(),
  allergens: array().isRequired(),
  Storage: string(50).isRequired(),
  bestBefore: date().isRequired(),
  Image: string(50).isRequired()
});

const itemDeleteDtoInType = shape({
  itemId: id().isRequired()
});

const itemGetDtoInType = shape({
  itemId: id().isRequired()
});

