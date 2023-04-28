/*eslint-disable*/

const itemCreateDtoInType = shape({
  supplierId:  string().isRequired(),	
  name: string(50).isRequired(),
  ingredients: array().isRequired(),
  weight: number().isRequired(),
  price: number().isRequired(),
  allergens: array().isRequired(),
  image: binary().isRequired()
});

const itemUpdateDtoInType = shape({
  itemId: string().isRequired(),
  supplier:  string(50),	
  name: string(50),
  weight: number(),
  ingredients: array(),
  allergens: array(),
  price: number(),
  image: binary()
});

const itemDeleteDtoInType = shape({
  itemId: string().isRequired()
});

const itemGetDtoInType = shape({
  itemId: string().isRequired()
});

const itemListDtoInType = shape({
  supplierId: string().isRequired()
});

const itemGetImageDtoInType = shape({
  code: string().isRequired()
});
