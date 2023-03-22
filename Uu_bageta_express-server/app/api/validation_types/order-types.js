/* eslint-disable */

const orderCreateDtoInType = shape({
  userId:  string().isRequired(),
    orderContent: array(shape({
      itemId: string(18).isRequired(),
      numberOrdered: number().isRequired()
    })).isRequired()
  });
  
  const orderUpdateDtoInType = shape({
    userId: string().isRequired(),
    orderContent: array(shape({
      itemId: string(18).isRequired(),
      numberOrdered: number().isRequired()
    }))
  });
    
  const orderDeleteDtoInType = shape({
    pin: string(4),
    orderId: string(18)
  });
    
  const orderGetDtoInType = shape({
    pin: string(4),
    userId: string(18)
  }); 
    
  const orderConfirmDtoInType = shape({
    pin: string(4).isRequired(),
    orderState: oneOf(["inProgress", "accepted", "declined"]).isRequired(),
  });