/* eslint-disable */

const orderCreateDtoInType = shape({
  userId:  string(18).isRequired(),
    orderContent: array(shape({
      itemId: id().isRequired(),
      numberOrdered: number().isRequired()
    }))
  });
  
  const orderUpdateDtoInType = shape({
    userId: string(18).isRequired(),
    /*orderId: id().isRequired(),*/
    orderContent: array(shape({
      itemId: id(),
      numberOrdered: number()
    }))
  });
    
  const orderDeleteDtoInType = shape({
    userId: string(18).isRequired(),
  });
    
  const orderGetDtoInType = shape({
    userId: string(18),
    pin: string(4)
  }); 
    
  const orderConfirmDtoInType = shape({
    pin: string(4).isRequired(),
    orderState: oneOf(["inProgress", "accepted", "declined"]).isRequired(),
  });