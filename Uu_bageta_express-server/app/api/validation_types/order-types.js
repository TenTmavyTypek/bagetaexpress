/* eslint-disable */

const orderCreateDtoInType = shape({
  userId:  id().is_required(),
  orderContent: arrayOf(shape({
    itemId: id().isRequired(),
    numberOrdered: number().isRequired()
  }))
  });
  
  const orderUpdateDtoInType = shape({
    orderId: id().isRequired(),
    orderContent: arrayOf(shape({
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