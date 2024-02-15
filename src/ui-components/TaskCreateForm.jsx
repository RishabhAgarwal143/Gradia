/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField, useTheme } from "@aws-amplify/ui-react";
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
  const { tokens } = useTheme();
  const initialValues = {
    due_time: "",
    due_date: "",
    description: "",
    UID: "",
    DTSTART: "",
    DUE: "",
    SUMMARY: "",
    COMPLETED: "",
    STATUS: "",
    CATEGORIES: "",
    PRIORITY: "",
    DTSTAMP: "",
  };
  const [due_time, setDue_time] = React.useState(initialValues.due_time);
  const [due_date, setDue_date] = React.useState(initialValues.due_date);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [UID, setUID] = React.useState(initialValues.UID);
  const [DTSTART, setDTSTART] = React.useState(initialValues.DTSTART);
  const [DUE, setDUE] = React.useState(initialValues.DUE);
  const [SUMMARY, setSUMMARY] = React.useState(initialValues.SUMMARY);
  const [COMPLETED, setCOMPLETED] = React.useState(initialValues.COMPLETED);
  const [STATUS, setSTATUS] = React.useState(initialValues.STATUS);
  const [CATEGORIES, setCATEGORIES] = React.useState(initialValues.CATEGORIES);
  const [PRIORITY, setPRIORITY] = React.useState(initialValues.PRIORITY);
  const [DTSTAMP, setDTSTAMP] = React.useState(initialValues.DTSTAMP);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDue_time(initialValues.due_time);
    setDue_date(initialValues.due_date);
    setDescription(initialValues.description);
    setUID(initialValues.UID);
    setDTSTART(initialValues.DTSTART);
    setDUE(initialValues.DUE);
    setSUMMARY(initialValues.SUMMARY);
    setCOMPLETED(initialValues.COMPLETED);
    setSTATUS(initialValues.STATUS);
    setCATEGORIES(initialValues.CATEGORIES);
    setPRIORITY(initialValues.PRIORITY);
    setDTSTAMP(initialValues.DTSTAMP);
    setErrors({});
  };
  const validations = {
    due_time: [],
    due_date: [],
    description: [],
    UID: [],
    DTSTART: [],
    DUE: [{ type: "Required" }],
    SUMMARY: [],
    COMPLETED: [],
    STATUS: [],
    CATEGORIES: [],
    PRIORITY: [],
    DTSTAMP: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding={tokens.space.large.value}
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          due_time,
          due_date,
          description,
          UID,
          DTSTART,
          DUE,
          SUMMARY,
          COMPLETED,
          STATUS,
          CATEGORIES,
          PRIORITY,
          DTSTAMP,
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
          const modelFieldsToSave = {
            UID: modelFields.UID,
            DTSTART: modelFields.DTSTART,
            DUE: modelFields.DUE,
            SUMMARY: modelFields.SUMMARY,
            COMPLETED: modelFields.COMPLETED,
            STATUS: modelFields.STATUS,
            CATEGORIES: modelFields.CATEGORIES,
            PRIORITY: modelFields.PRIORITY,
            DTSTAMP: modelFields.DTSTAMP,
          };
          await client.graphql({
            query: createTask.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFieldsToSave,
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
        label="Label"
        value={due_time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time: value,
              due_date,
              description,
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              COMPLETED,
              STATUS,
              CATEGORIES,
              PRIORITY,
              DTSTAMP,
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
        label="Label"
        value={due_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time,
              due_date: value,
              description,
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              COMPLETED,
              STATUS,
              CATEGORIES,
              PRIORITY,
              DTSTAMP,
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
        label="Label"
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description: value,
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              COMPLETED,
              STATUS,
              CATEGORIES,
              PRIORITY,
              DTSTAMP,
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
      <TextField
        label="Uid"
        isRequired={false}
        isReadOnly={false}
        value={UID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              UID: value,
              DTSTART,
              DUE,
              SUMMARY,
              COMPLETED,
              STATUS,
              CATEGORIES,
              PRIORITY,
              DTSTAMP,
            };
            const result = onChange(modelFields);
            value = result?.UID ?? value;
          }
          if (errors.UID?.hasError) {
            runValidationTasks("UID", value);
          }
          setUID(value);
        }}
        onBlur={() => runValidationTasks("UID", UID)}
        errorMessage={errors.UID?.errorMessage}
        hasError={errors.UID?.hasError}
        {...getOverrideProps(overrides, "UID")}
      ></TextField>
      <TextField
        label="Dtstart"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={DTSTART && convertToLocal(new Date(DTSTART))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              UID,
              DTSTART: value,
              DUE,
              SUMMARY,
              COMPLETED,
              STATUS,
              CATEGORIES,
              PRIORITY,
              DTSTAMP,
            };
            const result = onChange(modelFields);
            value = result?.DTSTART ?? value;
          }
          if (errors.DTSTART?.hasError) {
            runValidationTasks("DTSTART", value);
          }
          setDTSTART(value);
        }}
        onBlur={() => runValidationTasks("DTSTART", DTSTART)}
        errorMessage={errors.DTSTART?.errorMessage}
        hasError={errors.DTSTART?.hasError}
        {...getOverrideProps(overrides, "DTSTART")}
      ></TextField>
      <TextField
        label="Due"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={DUE && convertToLocal(new Date(DUE))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              UID,
              DTSTART,
              DUE: value,
              SUMMARY,
              COMPLETED,
              STATUS,
              CATEGORIES,
              PRIORITY,
              DTSTAMP,
            };
            const result = onChange(modelFields);
            value = result?.DUE ?? value;
          }
          if (errors.DUE?.hasError) {
            runValidationTasks("DUE", value);
          }
          setDUE(value);
        }}
        onBlur={() => runValidationTasks("DUE", DUE)}
        errorMessage={errors.DUE?.errorMessage}
        hasError={errors.DUE?.hasError}
        {...getOverrideProps(overrides, "DUE")}
      ></TextField>
      <TextField
        label="Summary"
        isRequired={false}
        isReadOnly={false}
        value={SUMMARY}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              UID,
              DTSTART,
              DUE,
              SUMMARY: value,
              COMPLETED,
              STATUS,
              CATEGORIES,
              PRIORITY,
              DTSTAMP,
            };
            const result = onChange(modelFields);
            value = result?.SUMMARY ?? value;
          }
          if (errors.SUMMARY?.hasError) {
            runValidationTasks("SUMMARY", value);
          }
          setSUMMARY(value);
        }}
        onBlur={() => runValidationTasks("SUMMARY", SUMMARY)}
        errorMessage={errors.SUMMARY?.errorMessage}
        hasError={errors.SUMMARY?.hasError}
        {...getOverrideProps(overrides, "SUMMARY")}
      ></TextField>
      <TextField
        label="Completed"
        isRequired={false}
        isReadOnly={false}
        value={COMPLETED}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              COMPLETED: value,
              STATUS,
              CATEGORIES,
              PRIORITY,
              DTSTAMP,
            };
            const result = onChange(modelFields);
            value = result?.COMPLETED ?? value;
          }
          if (errors.COMPLETED?.hasError) {
            runValidationTasks("COMPLETED", value);
          }
          setCOMPLETED(value);
        }}
        onBlur={() => runValidationTasks("COMPLETED", COMPLETED)}
        errorMessage={errors.COMPLETED?.errorMessage}
        hasError={errors.COMPLETED?.hasError}
        {...getOverrideProps(overrides, "COMPLETED")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={STATUS}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              COMPLETED,
              STATUS: value,
              CATEGORIES,
              PRIORITY,
              DTSTAMP,
            };
            const result = onChange(modelFields);
            value = result?.STATUS ?? value;
          }
          if (errors.STATUS?.hasError) {
            runValidationTasks("STATUS", value);
          }
          setSTATUS(value);
        }}
        onBlur={() => runValidationTasks("STATUS", STATUS)}
        errorMessage={errors.STATUS?.errorMessage}
        hasError={errors.STATUS?.hasError}
        {...getOverrideProps(overrides, "STATUS")}
      ></TextField>
      <TextField
        label="Categories"
        isRequired={false}
        isReadOnly={false}
        value={CATEGORIES}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              COMPLETED,
              STATUS,
              CATEGORIES: value,
              PRIORITY,
              DTSTAMP,
            };
            const result = onChange(modelFields);
            value = result?.CATEGORIES ?? value;
          }
          if (errors.CATEGORIES?.hasError) {
            runValidationTasks("CATEGORIES", value);
          }
          setCATEGORIES(value);
        }}
        onBlur={() => runValidationTasks("CATEGORIES", CATEGORIES)}
        errorMessage={errors.CATEGORIES?.errorMessage}
        hasError={errors.CATEGORIES?.hasError}
        {...getOverrideProps(overrides, "CATEGORIES")}
      ></TextField>
      <TextField
        label="Priority"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={PRIORITY}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              COMPLETED,
              STATUS,
              CATEGORIES,
              PRIORITY: value,
              DTSTAMP,
            };
            const result = onChange(modelFields);
            value = result?.PRIORITY ?? value;
          }
          if (errors.PRIORITY?.hasError) {
            runValidationTasks("PRIORITY", value);
          }
          setPRIORITY(value);
        }}
        onBlur={() => runValidationTasks("PRIORITY", PRIORITY)}
        errorMessage={errors.PRIORITY?.errorMessage}
        hasError={errors.PRIORITY?.hasError}
        {...getOverrideProps(overrides, "PRIORITY")}
      ></TextField>
      <TextField
        label="Dtstamp"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={DTSTAMP && convertToLocal(new Date(DTSTAMP))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              COMPLETED,
              STATUS,
              CATEGORIES,
              PRIORITY,
              DTSTAMP: value,
            };
            const result = onChange(modelFields);
            value = result?.DTSTAMP ?? value;
          }
          if (errors.DTSTAMP?.hasError) {
            runValidationTasks("DTSTAMP", value);
          }
          setDTSTAMP(value);
        }}
        onBlur={() => runValidationTasks("DTSTAMP", DTSTAMP)}
        errorMessage={errors.DTSTAMP?.errorMessage}
        hasError={errors.DTSTAMP?.hasError}
        {...getOverrideProps(overrides, "DTSTAMP")}
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
