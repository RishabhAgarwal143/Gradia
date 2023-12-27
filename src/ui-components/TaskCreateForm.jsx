/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createTask } from "../graphql/mutations";
const client = generateClient();
export default function TaskCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    due_time: "",
    due_date: "",
    description: "",
  };
  const [due_time, setDue_time] = React.useState(initialValues.due_time);
  const [due_date, setDue_date] = React.useState(initialValues.due_date);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDue_time(initialValues.due_time);
    setDue_date(initialValues.due_date);
    setDescription(initialValues.description);
    setErrors({});
  };
  const validations = {
    due_time: [{ type: "Required" }],
    due_date: [{ type: "Required" }],
    description: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          due_time,
          due_date,
          description,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createTask.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TaskCreateForm")}
      {...rest}
    >
      <TextField
        label="Due time"
        isRequired={true}
        isReadOnly={false}
        type="time"
        value={due_time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time: value,
              due_date,
              description,
            };
            const result = onChange(modelFields);
            value = result?.due_time ?? value;
          }
          if (errors.due_time?.hasError) {
            runValidationTasks("due_time", value);
          }
          setDue_time(value);
        }}
        onBlur={() => runValidationTasks("due_time", due_time)}
        errorMessage={errors.due_time?.errorMessage}
        hasError={errors.due_time?.hasError}
        {...getOverrideProps(overrides, "due_time")}
      ></TextField>
      <TextField
        label="Due date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={due_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time,
              due_date: value,
              description,
            };
            const result = onChange(modelFields);
            value = result?.due_date ?? value;
          }
          if (errors.due_date?.hasError) {
            runValidationTasks("due_date", value);
          }
          setDue_date(value);
        }}
        onBlur={() => runValidationTasks("due_date", due_date)}
        errorMessage={errors.due_date?.errorMessage}
        hasError={errors.due_date?.hasError}
        {...getOverrideProps(overrides, "due_date")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description: value,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
