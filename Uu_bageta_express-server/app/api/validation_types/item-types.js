/*eslint-disable*/

const itemCreateDtoInType = shape({
  supplier:  string(50).isRequired(),	
  supplierLogo: string(50).isRequired(),
  name: string(50).isRequired(),
  ingredients: array().isRequired(),
  weight: number().isRequired(),
  allergens: array().isRequired(),
  Storage: string(50).isRequired(),
  bestBefore: date(),
  Image: string(50).isRequired()
});

const itemUpdateDtoInType = shape({
  id: id().isRequired(),
  supplier:  string(50),	
  supplierLogo: string(50),
  name: string(50),
  ingredients: array(),
  weight: number(),
  allergens: array(),
  Storage: string(50),
  bestBefore: date(),
  Image: string(50)
});

const itemDeleteDtoInType = shape({
  id: id().isRequired()
});

const itemGetDtoInType = shape({
  id: id().isRequired()
});
