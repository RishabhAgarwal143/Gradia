/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getImportance } from "../graphql/queries";
import { updateImportance } from "../graphql/mutations";
const client = generateClient();
export default function ImportanceUpdateForm(props) {
  const {
    id: idProp,
    importance: importanceModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Grade_Percentage: "",
    Task_info: "",
    Expected_Time: "",
    Course: "",
    Additional_Info: "",
  };
  const [Grade_Percentage, setGrade_Percentage] = React.useState(
    initialValues.Grade_Percentage
  );
  const [Task_info, setTask_info] = React.useState(initialValues.Task_info);
  const [Expected_Time, setExpected_Time] = React.useState(
    initialValues.Expected_Time
  );
  const [Course, setCourse] = React.useState(initialValues.Course);
  const [Additional_Info, setAdditional_Info] = React.useState(
    initialValues.Additional_Info
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = importanceRecord
      ? { ...initialValues, ...importanceRecord }
      : initialValues;
    setGrade_Percentage(cleanValues.Grade_Percentage);
    setTask_info(cleanValues.Task_info);
    setExpected_Time(cleanValues.Expected_Time);
    setCourse(cleanValues.Course);
    setAdditional_Info(
      typeof cleanValues.Additional_Info === "string" ||
        cleanValues.Additional_Info === null
        ? cleanValues.Additional_Info
        : JSON.stringify(cleanValues.Additional_Info)
    );
    setErrors({});
  };
  const [importanceRecord, setImportanceRecord] =
    React.useState(importanceModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getImportance.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getImportance
        : importanceModelProp;
      setImportanceRecord(record);
    };
    queryData();
  }, [idProp, importanceModelProp]);
  React.useEffect(resetStateValues, [importanceRecord]);
  const validations = {
    Grade_Percentage: [],
    Task_info: [],
    Expected_Time: [],
    Course: [],
    Additional_Info: [{ type: "JSON" }],
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
          Grade_Percentage: Grade_Percentage ?? null,
          Task_info: Task_info ?? null,
          Expected_Time: Expected_Time ?? null,
          Course: Course ?? null,
          Additional_Info: Additional_Info ?? null,
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
            query: updateImportance.replaceAll("__typename", ""),
            variables: {
              input: {
                id: importanceRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ImportanceUpdateForm")}
      {...rest}
    >
      <TextField
        label="Grade percentage"
        isRequired={false}
        isReadOnly={false}
        value={Grade_Percentage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Grade_Percentage: value,
              Task_info,
              Expected_Time,
              Course,
              Additional_Info,
            };
            const result = onChange(modelFields);
            value = result?.Grade_Percentage ?? value;
          }
          if (errors.Grade_Percentage?.hasError) {
            runValidationTasks("Grade_Percentage", value);
          }
          setGrade_Percentage(value);
        }}
        onBlur={() => runValidationTasks("Grade_Percentage", Grade_Percentage)}
        errorMessage={errors.Grade_Percentage?.errorMessage}
        hasError={errors.Grade_Percentage?.hasError}
        {...getOverrideProps(overrides, "Grade_Percentage")}
      ></TextField>
      <TextField
        label="Task info"
        isRequired={false}
        isReadOnly={false}
        value={Task_info}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Grade_Percentage,
              Task_info: value,
              Expected_Time,
              Course,
              Additional_Info,
            };
            const result = onChange(modelFields);
            value = result?.Task_info ?? value;
          }
          if (errors.Task_info?.hasError) {
            runValidationTasks("Task_info", value);
          }
          setTask_info(value);
        }}
        onBlur={() => runValidationTasks("Task_info", Task_info)}
        errorMessage={errors.Task_info?.errorMessage}
        hasError={errors.Task_info?.hasError}
        {...getOverrideProps(overrides, "Task_info")}
      ></TextField>
      <TextField
        label="Expected time"
        isRequired={false}
        isReadOnly={false}
        value={Expected_Time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Grade_Percentage,
              Task_info,
              Expected_Time: value,
              Course,
              Additional_Info,
            };
            const result = onChange(modelFields);
            value = result?.Expected_Time ?? value;
          }
          if (errors.Expected_Time?.hasError) {
            runValidationTasks("Expected_Time", value);
          }
          setExpected_Time(value);
        }}
        onBlur={() => runValidationTasks("Expected_Time", Expected_Time)}
        errorMessage={errors.Expected_Time?.errorMessage}
        hasError={errors.Expected_Time?.hasError}
        {...getOverrideProps(overrides, "Expected_Time")}
      ></TextField>
      <TextField
        label="Course"
        isRequired={false}
        isReadOnly={false}
        value={Course}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Grade_Percentage,
              Task_info,
              Expected_Time,
              Course: value,
              Additional_Info,
            };
            const result = onChange(modelFields);
            value = result?.Course ?? value;
          }
          if (errors.Course?.hasError) {
            runValidationTasks("Course", value);
          }
          setCourse(value);
        }}
        onBlur={() => runValidationTasks("Course", Course)}
        errorMessage={errors.Course?.errorMessage}
        hasError={errors.Course?.hasError}
        {...getOverrideProps(overrides, "Course")}
      ></TextField>
      <TextAreaField
        label="Additional info"
        isRequired={false}
        isReadOnly={false}
        value={Additional_Info}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Grade_Percentage,
              Task_info,
              Expected_Time,
              Course,
              Additional_Info: value,
            };
            const result = onChange(modelFields);
            value = result?.Additional_Info ?? value;
          }
          if (errors.Additional_Info?.hasError) {
            runValidationTasks("Additional_Info", value);
          }
          setAdditional_Info(value);
        }}
        onBlur={() => runValidationTasks("Additional_Info", Additional_Info)}
        errorMessage={errors.Additional_Info?.errorMessage}
        hasError={errors.Additional_Info?.hasError}
        {...getOverrideProps(overrides, "Additional_Info")}
      ></TextAreaField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || importanceModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || importanceModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
