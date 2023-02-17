/* eslint-disable */

const orderCreateDtoInType = shape({
  userId:  string(18).isRequired(),
    orderContent: array(shape({
      itemId: id().isRequired(),
      numberOrdered: number().isRequired()
    }))
  });
  
  const orderUpdateDtoInType = shape({
    pin: string(4).isRequired(),
    /*orderId: id().isRequired(),*/
    orderContent: array(shape({
      itemId: id(),
      numberOrdered: number()
    }))
  });
    
  const orderDeleteDtoInType = shape({
    pin: string(4).isRequired()
    //orderId: id().isRequired()
  });
    
  const orderGetDtoInType = shape({
    pin: string(4),
    userId: string(18)
  }); 
    
  const orderConfirmDtoInType = shape({
    pin: string(4).isRequired(),
    //orderId: id().isRequired(),
    orderState: oneOf(["inProgress", "accepted", "declined"]).isRequired(),
  });