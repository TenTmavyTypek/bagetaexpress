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
  ingredients: array(),
  weight: number(),
  price: number(),
  allergens: array(),
  image: string(50)
});

const itemDeleteDtoInType = shape({
  itemId: id().isRequired()
});

const itemGetDtoInType = shape({
  itemId: id().isRequired()
});
