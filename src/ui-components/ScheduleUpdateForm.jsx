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
import { getSchedule } from "../graphql/queries";
import { updateSchedule } from "../graphql/mutations";
const client = generateClient();
export default function ScheduleUpdateForm(props) {
  const {
    id: idProp,
    schedule: scheduleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    SUMMARY: "",
    DTSTART: "",
    DTEND: "",
    DESCRIPTION: "",
    LOCATION: "",
    userinfoID: "",
    RRULE: "",
  };
  const [SUMMARY, setSUMMARY] = React.useState(initialValues.SUMMARY);
  const [DTSTART, setDTSTART] = React.useState(initialValues.DTSTART);
  const [DTEND, setDTEND] = React.useState(initialValues.DTEND);
  const [DESCRIPTION, setDESCRIPTION] = React.useState(
    initialValues.DESCRIPTION
  );
  const [LOCATION, setLOCATION] = React.useState(initialValues.LOCATION);
  const [userinfoID, setUserinfoID] = React.useState(initialValues.userinfoID);
  const [RRULE, setRRULE] = React.useState(initialValues.RRULE);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = scheduleRecord
      ? { ...initialValues, ...scheduleRecord }
      : initialValues;
    setSUMMARY(cleanValues.SUMMARY);
    setDTSTART(cleanValues.DTSTART);
    setDTEND(cleanValues.DTEND);
    setDESCRIPTION(cleanValues.DESCRIPTION);
    setLOCATION(cleanValues.LOCATION);
    setUserinfoID(cleanValues.userinfoID);
    setRRULE(
      typeof cleanValues.RRULE === "string" || cleanValues.RRULE === null
        ? cleanValues.RRULE
        : JSON.stringify(cleanValues.RRULE)
    );
    setErrors({});
  };
  const [scheduleRecord, setScheduleRecord] = React.useState(scheduleModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSchedule.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSchedule
        : scheduleModelProp;
      setScheduleRecord(record);
    };
    queryData();
  }, [idProp, scheduleModelProp]);
  React.useEffect(resetStateValues, [scheduleRecord]);
  const validations = {
    SUMMARY: [{ type: "Required" }],
    DTSTART: [{ type: "Required" }],
    DTEND: [{ type: "Required" }],
    DESCRIPTION: [],
    LOCATION: [],
    userinfoID: [{ type: "Required" }],
    RRULE: [{ type: "JSON" }],
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
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          SUMMARY,
          DTSTART,
          DTEND,
          DESCRIPTION: DESCRIPTION ?? null,
          LOCATION: LOCATION ?? null,
          userinfoID,
          RRULE: RRULE ?? null,
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
            SUMMARY: modelFields.SUMMARY,
            DTSTART: modelFields.DTSTART,
            DTEND: modelFields.DTEND,
            DESCRIPTION: modelFields.DESCRIPTION ?? null,
            LOCATION: modelFields.LOCATION ?? null,
            userinfoID: modelFields.userinfoID,
            RRULE: modelFields.RRULE
              ? JSON.parse(modelFields.RRULE)
              : modelFields.RRULE,
          };
          await client.graphql({
            query: updateSchedule.replaceAll("__typename", ""),
            variables: {
              input: {
                id: scheduleRecord.id,
                ...modelFieldsToSave,
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
      {...getOverrideProps(overrides, "ScheduleUpdateForm")}
      {...rest}
    >
      <TextField
        label="Summary"
        isRequired={true}
        isReadOnly={false}
        value={SUMMARY}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY: value,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
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
        label="Dtstart"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={DTSTART && convertToLocal(new Date(DTSTART))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART: value,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
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
        label="Dtend"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={DTEND && convertToLocal(new Date(DTEND))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND: value,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
            };
            const result = onChange(modelFields);
            value = result?.DTEND ?? value;
          }
          if (errors.DTEND?.hasError) {
            runValidationTasks("DTEND", value);
          }
          setDTEND(value);
        }}
        onBlur={() => runValidationTasks("DTEND", DTEND)}
        errorMessage={errors.DTEND?.errorMessage}
        hasError={errors.DTEND?.hasError}
        {...getOverrideProps(overrides, "DTEND")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={DESCRIPTION}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION: value,
              LOCATION,
              userinfoID,
              RRULE,
            };
            const result = onChange(modelFields);
            value = result?.DESCRIPTION ?? value;
          }
          if (errors.DESCRIPTION?.hasError) {
            runValidationTasks("DESCRIPTION", value);
          }
          setDESCRIPTION(value);
        }}
        onBlur={() => runValidationTasks("DESCRIPTION", DESCRIPTION)}
        errorMessage={errors.DESCRIPTION?.errorMessage}
        hasError={errors.DESCRIPTION?.hasError}
        {...getOverrideProps(overrides, "DESCRIPTION")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={LOCATION}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION: value,
              userinfoID,
              RRULE,
            };
            const result = onChange(modelFields);
            value = result?.LOCATION ?? value;
          }
          if (errors.LOCATION?.hasError) {
            runValidationTasks("LOCATION", value);
          }
          setLOCATION(value);
        }}
        onBlur={() => runValidationTasks("LOCATION", LOCATION)}
        errorMessage={errors.LOCATION?.errorMessage}
        hasError={errors.LOCATION?.hasError}
        {...getOverrideProps(overrides, "LOCATION")}
      ></TextField>
      <TextField
        label="Userinfo id"
        isRequired={true}
        isReadOnly={false}
        value={userinfoID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID: value,
              RRULE,
            };
            const result = onChange(modelFields);
            value = result?.userinfoID ?? value;
          }
          if (errors.userinfoID?.hasError) {
            runValidationTasks("userinfoID", value);
          }
          setUserinfoID(value);
        }}
        onBlur={() => runValidationTasks("userinfoID", userinfoID)}
        errorMessage={errors.userinfoID?.errorMessage}
        hasError={errors.userinfoID?.hasError}
        {...getOverrideProps(overrides, "userinfoID")}
      ></TextField>
      <TextAreaField
        label="Rrule"
        isRequired={false}
        isReadOnly={false}
        value={RRULE}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE: value,
            };
            const result = onChange(modelFields);
            value = result?.RRULE ?? value;
          }
          if (errors.RRULE?.hasError) {
            runValidationTasks("RRULE", value);
          }
          setRRULE(value);
        }}
        onBlur={() => runValidationTasks("RRULE", RRULE)}
        errorMessage={errors.RRULE?.errorMessage}
        hasError={errors.RRULE?.hasError}
        {...getOverrideProps(overrides, "RRULE")}
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
          isDisabled={!(idProp || scheduleModelProp)}
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
              !(idProp || scheduleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
