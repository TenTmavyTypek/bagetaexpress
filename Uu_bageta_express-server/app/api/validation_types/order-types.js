/* eslint-disable */

const orderCreateDtoInType = shape({
  userId:  id().isRequired(),
  orderContent: array(shape({
    itemId: id().isRequired(),
    numberOrdered: number().isRequired()
  }))
  });
  
  const orderUpdateDtoInType = shape({
    orderId: id().isRequired(),
    orderContent: array(shape({
      itemId: id().isRequired(),
      numberOrdered: number().isRequired()
    }))
  });
    
  const orderDeleteDtoInType = shape({
    OrderId: id().isRequired()
  });
    
  const orderGetDtoInType = shape({
    OrderId: id().isRequired()
  }); 
    
  const orderConfirmDtoInType = shape({
    orderId: id().isRequired()
  });