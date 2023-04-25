/* eslint-disable */

const permissionsGetDtoInType = shape({
  userId: string().isRequired(),
});

const permissionsCreateDtoInType = shape({
  userId: string().isRequired(),
  supplierId: string().isRequired(),
  isAdmin: boolean().isRequired(),
  access: shape({
    summary: boolean().isRequired(),
    detailSummary: boolean().isRequired(),
    editMenu: boolean().isRequired(),
    management: boolean().isRequired(),
    scan: boolean().isRequired(),
  }).isRequired()
});

const permissionsDeleteDtoInType = shape({
  userId: string().isRequired(),
});

const permissionsUpdateDtoInType = shape({
  userId: string().isRequired(),
  supplierId: string(),
  access: shape({
    summary: boolean(),
    detailSummary: boolean(),
    editMenu: boolean(),
    management: boolean(),
    scan: boolean(),
  })
});