/*eslint-disable*/

const itemCreateDtoInType = shape({
  supplier:  string(50).isRequired(),	
  name: string(50).isRequired(),
  ingredients: array().isRequired(),
  weight: number().isRequired(),
  price: number().isRequired(),
  allergens: array().isRequired(),
  image: string().isRequired()
});

const itemUpdateDtoInType = shape({
  itemId: string().isRequired(),
  supplier:  string(50),	
  name: string(50),
  weight: number(),
  ingredients: array(),
  allergens: array(),
  price: number(),
  image: string()
});

const itemDeleteDtoInType = shape({
  itemId: string().isRequired()
});

const itemGetDtoInType = shape({
  itemId: string().isRequired()
});
