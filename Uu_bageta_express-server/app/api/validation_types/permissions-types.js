/* eslint-disable */

const permissionsGetDtoInType = shape({
  userId: string(18).isRequired(),
});

const permissionsCreateDtoInType = shape({
  userId: string(18).isRequired(),
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
  userId: string(18).isRequired(),
  access: shape({
    summary: boolean(),
    detailSummary: boolean(),
    editMenu: boolean(),
    management: boolean(),
    scan: boolean(),
  })
});