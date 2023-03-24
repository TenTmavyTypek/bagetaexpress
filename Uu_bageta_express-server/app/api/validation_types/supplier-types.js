/* eslint-disable */

const supplierGetDtoInType = shape({
  supplierId: string().isRequired(),
});

const supplierCreateDtoInType = shape({
  name: string().isRequired(),
  logo: string(),
  address: string(),
  website: string(),
  
  ingredientsList: array(shape({
    name: string().isRequired(),
    ingredientNumber: number().isRequired(),
  })).isRequired(),
  
  allergensList: array(shape({
    name: string().isRequired(),
    allergenNumber: number().isRequired(),
  })).isRequired(),
  
  pickUpDate: number().isRequired(),
  blacklist: array(string()).isRequired(),
});

const supplierUpdateDtoInType = shape({
  supplierId: string().isRequired(),
  name: string(),
  logo: string(),
  address: string(),
  website: string(),
  
  ingredientsList: array(shape({
    name: string().isRequired(),
    ingretientNumber: number().isRequired(),
  })),
  
  allergensList: array(shape({
    name: string().isRequired(),
    allergensNumber: number().isRequired(),
  })),
  
  pickUpDate: number(),
  blacklist: array(string()),
});

const supplierDeleteDtoInType = shape({
  supplierId: string().isRequired(),
});