/* eslint-disable */

const orderCreateDtoInType = shape({
  userId:  string(18).isRequired()
    //orderContent: array(shape({
      //itemId: id().isRequired(),
     // numberOrdered: number().isRequired()
   // }))
  });
  
  const orderUpdateDtoInType = shape({
    orderId: id().isRequired(),
    orderContent: array(shape({
      itemId: id().isRequired(),
      numberOrdered: number().isRequired()
    })).isRequired
  });
    
  const orderDeleteDtoInType = shape({
    orderId: id().isRequired()
  });
    
  const orderGetDtoInType = shape({
    orderId: id().isRequired()
  }); 
    
  const orderConfirmDtoInType = shape({
    orderId: id().isRequired()
  });