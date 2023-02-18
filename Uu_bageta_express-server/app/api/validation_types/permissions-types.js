/* eslint-disable */
const permissionsGetDtoInType = shape({
  userId: string(18).isRequired()
});
const permissionsCreateDtoInType = shape({
  userId: string(18).isRequired(),
  isAdmin: boolean().isRequired()
});