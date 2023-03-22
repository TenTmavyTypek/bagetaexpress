/* eslint-disable */

const orderCreateDtoInType = shape({
  userId:  string().isRequired(),
    orderContent: array(shape({
      itemId: string().isRequired(),
      numberOrdered: number().isRequired()
    })).isRequired()
  });
  
  const orderUpdateDtoInType = shape({
    userId: string().isRequired(),
    orderContent: array(shape({
      itemId: string().isRequired(),
      numberOrdered: number().isRequired()
    }))
  });
    
  const orderDeleteDtoInType = shape({
    pin: string(4),
    orderId: string()
  });
    
  const orderGetDtoInType = shape({
    pin: string(4),
    userId: string()
  }); 
    
  const orderConfirmDtoInType = shape({
    pin: string(4).isRequired(),
    orderState: oneOf(["inProgress", "accepted", "declined"]).isRequired(),
  });