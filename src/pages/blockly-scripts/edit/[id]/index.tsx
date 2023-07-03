import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getBlocklyScriptById, updateBlocklyScriptById } from 'apiSdk/blockly-scripts';
import { Error } from 'components/error';
import { blocklyScriptValidationSchema } from 'validationSchema/blockly-scripts';
import { BlocklyScriptInterface } from 'interfaces/blockly-script';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { getUsers } from 'apiSdk/users';
import { getOrganizations } from 'apiSdk/organizations';

function BlocklyScriptEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<BlocklyScriptInterface>(
    () => (id ? `/blockly-scripts/${id}` : null),
    () => getBlocklyScriptById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BlocklyScriptInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBlocklyScriptById(id, values);
      mutate(updated);
      resetForm();
      router.push('/blockly-scripts');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<BlocklyScriptInterface>({
    initialValues: data,
    validationSchema: blocklyScriptValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Blockly Script
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="script_content" mb="4" isInvalid={!!formik.errors?.script_content}>
              <FormLabel>Script Content</FormLabel>
              <Input
                type="text"
                name="script_content"
                value={formik.values?.script_content}
                onChange={formik.handleChange}
              />
              {formik.errors.script_content && <FormErrorMessage>{formik.errors?.script_content}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<OrganizationInterface>
              formik={formik}
              name={'organization_id'}
              label={'Select Organization'}
              placeholder={'Select Organization'}
              fetcher={getOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'blockly_script',
    operation: AccessOperationEnum.UPDATE,
  }),
)(BlocklyScriptEditPage);
