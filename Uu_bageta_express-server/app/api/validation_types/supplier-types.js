/* eslint-disable */

const supplierGetDtoInType = shape({
  supplierId: string(18).isRequired(),
});

const supplierCreateDtoInType = shape({
  name: string().isRequired(),
  logo: string(),
  address: string(),
  website: string(),
  
  ingredientsList: array(shape({
    name: string().isRequired(),
    ingretientNumber: number().isRequired(),
  })).isRequired(),
  
  allergensList: array(shape({
    name: string().isRequired(),
    allergensNumber: number().isRequired(),
  })).isRequired(),
  
  pickUpDate: number().isRequired(),
  blacklist: array(string(18)).isRequired(),
});

const supplierUpdateDtoInType = shape({
  supplierId: string(18).isRequired(),
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
  blacklist: array(string(18)),
});

const supplierDeleteDtoInType = shape({
  supplierId: string(18).isRequired(),
});