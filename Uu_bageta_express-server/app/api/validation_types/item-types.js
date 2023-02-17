/*eslint-disable*/

const itemCreateDtoInType = shape({
  supplier:  string(50).isRequired(),	
  name: string(50).isRequired(),
  ingredients: array().isRequired(),
  weight: number().isRequired(),
  price: number().isRequired(),
  allergens: array().isRequired(),
  image: string(150).isRequired()
});

const itemUpdateDtoInType = shape({
  itemId: id().isRequired(),
  supplier:  string(50),	
  name: string(50),
  weight: number(),
  ingredients: array(),
  allergens: array(),
  price: number(),
  image: string(150)
});

const itemDeleteDtoInType = shape({
  itemId: id().isRequired()
});

const itemGetDtoInType = shape({
  itemId: id().isRequired()
});
