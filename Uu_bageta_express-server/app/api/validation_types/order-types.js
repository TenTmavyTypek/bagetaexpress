/* eslint-disable */

const orderCreateDtoInType = shape({
  userId:  id().is_required,
  itemId: id().is_required,
  count: int().is_required,
  price: double(3).is_required
  });
  
  const orderUpdateDtoInType = shape({
    orderId: id().isRequired(),
    orderContent: arrayOf(shape({
      itemId: id().isRequired(),
      numberOrdered: int().isRequired()
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