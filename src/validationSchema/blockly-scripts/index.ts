import * as yup from 'yup';

export const blocklyScriptValidationSchema = yup.object().shape({
  script_content: yup.string().required(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
