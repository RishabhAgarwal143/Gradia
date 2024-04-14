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
import { getUserWorkTim } from "../graphql/queries";
import { updateUserWorkTim } from "../graphql/mutations";
const client = generateClient();
export default function UserWorkTimUpdateForm(props) {
  const {
    id: idProp,
    userWorkTim: userWorkTimModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Monday_start: "",
    Monday_end: "",
    Tuesday_start: "",
    Tuesday_end: "",
    Wednesday_start: "",
    Wednesday_end: "",
    Thurday_start: "",
    Thurday_end: "",
    Friday_start: "",
    Friday_end: "",
    Saturday_start: "",
    Saturday_end: "",
    Sunday_start: "",
    Sunday_end: "",
  };
  const [Monday_start, setMonday_start] = React.useState(
    initialValues.Monday_start
  );
  const [Monday_end, setMonday_end] = React.useState(initialValues.Monday_end);
  const [Tuesday_start, setTuesday_start] = React.useState(
    initialValues.Tuesday_start
  );
  const [Tuesday_end, setTuesday_end] = React.useState(
    initialValues.Tuesday_end
  );
  const [Wednesday_start, setWednesday_start] = React.useState(
    initialValues.Wednesday_start
  );
  const [Wednesday_end, setWednesday_end] = React.useState(
    initialValues.Wednesday_end
  );
  const [Thurday_start, setThurday_start] = React.useState(
    initialValues.Thurday_start
  );
  const [Thurday_end, setThurday_end] = React.useState(
    initialValues.Thurday_end
  );
  const [Friday_start, setFriday_start] = React.useState(
    initialValues.Friday_start
  );
  const [Friday_end, setFriday_end] = React.useState(initialValues.Friday_end);
  const [Saturday_start, setSaturday_start] = React.useState(
    initialValues.Saturday_start
  );
  const [Saturday_end, setSaturday_end] = React.useState(
    initialValues.Saturday_end
  );
  const [Sunday_start, setSunday_start] = React.useState(
    initialValues.Sunday_start
  );
  const [Sunday_end, setSunday_end] = React.useState(initialValues.Sunday_end);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userWorkTimRecord
      ? { ...initialValues, ...userWorkTimRecord }
      : initialValues;
    setMonday_start(cleanValues.Monday_start);
    setMonday_end(cleanValues.Monday_end);
    setTuesday_start(cleanValues.Tuesday_start);
    setTuesday_end(cleanValues.Tuesday_end);
    setWednesday_start(cleanValues.Wednesday_start);
    setWednesday_end(cleanValues.Wednesday_end);
    setThurday_start(cleanValues.Thurday_start);
    setThurday_end(cleanValues.Thurday_end);
    setFriday_start(cleanValues.Friday_start);
    setFriday_end(cleanValues.Friday_end);
    setSaturday_start(cleanValues.Saturday_start);
    setSaturday_end(cleanValues.Saturday_end);
    setSunday_start(cleanValues.Sunday_start);
    setSunday_end(cleanValues.Sunday_end);
    setErrors({});
  };
  const [userWorkTimRecord, setUserWorkTimRecord] =
    React.useState(userWorkTimModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUserWorkTim.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUserWorkTim
        : userWorkTimModelProp;
      setUserWorkTimRecord(record);
    };
    queryData();
  }, [idProp, userWorkTimModelProp]);
  React.useEffect(resetStateValues, [userWorkTimRecord]);
  const validations = {
    Monday_start: [],
    Monday_end: [],
    Tuesday_start: [],
    Tuesday_end: [],
    Wednesday_start: [],
    Wednesday_end: [],
    Thurday_start: [],
    Thurday_end: [],
    Friday_start: [],
    Friday_end: [],
    Saturday_start: [],
    Saturday_end: [],
    Sunday_start: [],
    Sunday_end: [],
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
          Monday_start: Monday_start ?? null,
          Monday_end: Monday_end ?? null,
          Tuesday_start: Tuesday_start ?? null,
          Tuesday_end: Tuesday_end ?? null,
          Wednesday_start: Wednesday_start ?? null,
          Wednesday_end: Wednesday_end ?? null,
          Thurday_start: Thurday_start ?? null,
          Thurday_end: Thurday_end ?? null,
          Friday_start: Friday_start ?? null,
          Friday_end: Friday_end ?? null,
          Saturday_start: Saturday_start ?? null,
          Saturday_end: Saturday_end ?? null,
          Sunday_start: Sunday_start ?? null,
          Sunday_end: Sunday_end ?? null,
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
            query: updateUserWorkTim.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userWorkTimRecord.id,
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
      {...getOverrideProps(overrides, "UserWorkTimUpdateForm")}
      {...rest}
    >
      <TextField
        label="Monday start"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Monday_start}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start: value,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Monday_start ?? value;
          }
          if (errors.Monday_start?.hasError) {
            runValidationTasks("Monday_start", value);
          }
          setMonday_start(value);
        }}
        onBlur={() => runValidationTasks("Monday_start", Monday_start)}
        errorMessage={errors.Monday_start?.errorMessage}
        hasError={errors.Monday_start?.hasError}
        {...getOverrideProps(overrides, "Monday_start")}
      ></TextField>
      <TextField
        label="Monday end"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Monday_end}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end: value,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Monday_end ?? value;
          }
          if (errors.Monday_end?.hasError) {
            runValidationTasks("Monday_end", value);
          }
          setMonday_end(value);
        }}
        onBlur={() => runValidationTasks("Monday_end", Monday_end)}
        errorMessage={errors.Monday_end?.errorMessage}
        hasError={errors.Monday_end?.hasError}
        {...getOverrideProps(overrides, "Monday_end")}
      ></TextField>
      <TextField
        label="Tuesday start"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Tuesday_start}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start: value,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Tuesday_start ?? value;
          }
          if (errors.Tuesday_start?.hasError) {
            runValidationTasks("Tuesday_start", value);
          }
          setTuesday_start(value);
        }}
        onBlur={() => runValidationTasks("Tuesday_start", Tuesday_start)}
        errorMessage={errors.Tuesday_start?.errorMessage}
        hasError={errors.Tuesday_start?.hasError}
        {...getOverrideProps(overrides, "Tuesday_start")}
      ></TextField>
      <TextField
        label="Tuesday end"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Tuesday_end}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end: value,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Tuesday_end ?? value;
          }
          if (errors.Tuesday_end?.hasError) {
            runValidationTasks("Tuesday_end", value);
          }
          setTuesday_end(value);
        }}
        onBlur={() => runValidationTasks("Tuesday_end", Tuesday_end)}
        errorMessage={errors.Tuesday_end?.errorMessage}
        hasError={errors.Tuesday_end?.hasError}
        {...getOverrideProps(overrides, "Tuesday_end")}
      ></TextField>
      <TextField
        label="Wednesday start"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Wednesday_start}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start: value,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Wednesday_start ?? value;
          }
          if (errors.Wednesday_start?.hasError) {
            runValidationTasks("Wednesday_start", value);
          }
          setWednesday_start(value);
        }}
        onBlur={() => runValidationTasks("Wednesday_start", Wednesday_start)}
        errorMessage={errors.Wednesday_start?.errorMessage}
        hasError={errors.Wednesday_start?.hasError}
        {...getOverrideProps(overrides, "Wednesday_start")}
      ></TextField>
      <TextField
        label="Wednesday end"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Wednesday_end}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end: value,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Wednesday_end ?? value;
          }
          if (errors.Wednesday_end?.hasError) {
            runValidationTasks("Wednesday_end", value);
          }
          setWednesday_end(value);
        }}
        onBlur={() => runValidationTasks("Wednesday_end", Wednesday_end)}
        errorMessage={errors.Wednesday_end?.errorMessage}
        hasError={errors.Wednesday_end?.hasError}
        {...getOverrideProps(overrides, "Wednesday_end")}
      ></TextField>
      <TextField
        label="Thurday start"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Thurday_start}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start: value,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Thurday_start ?? value;
          }
          if (errors.Thurday_start?.hasError) {
            runValidationTasks("Thurday_start", value);
          }
          setThurday_start(value);
        }}
        onBlur={() => runValidationTasks("Thurday_start", Thurday_start)}
        errorMessage={errors.Thurday_start?.errorMessage}
        hasError={errors.Thurday_start?.hasError}
        {...getOverrideProps(overrides, "Thurday_start")}
      ></TextField>
      <TextField
        label="Thurday end"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Thurday_end}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end: value,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Thurday_end ?? value;
          }
          if (errors.Thurday_end?.hasError) {
            runValidationTasks("Thurday_end", value);
          }
          setThurday_end(value);
        }}
        onBlur={() => runValidationTasks("Thurday_end", Thurday_end)}
        errorMessage={errors.Thurday_end?.errorMessage}
        hasError={errors.Thurday_end?.hasError}
        {...getOverrideProps(overrides, "Thurday_end")}
      ></TextField>
      <TextField
        label="Friday start"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Friday_start}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start: value,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Friday_start ?? value;
          }
          if (errors.Friday_start?.hasError) {
            runValidationTasks("Friday_start", value);
          }
          setFriday_start(value);
        }}
        onBlur={() => runValidationTasks("Friday_start", Friday_start)}
        errorMessage={errors.Friday_start?.errorMessage}
        hasError={errors.Friday_start?.hasError}
        {...getOverrideProps(overrides, "Friday_start")}
      ></TextField>
      <TextField
        label="Friday end"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Friday_end}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end: value,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Friday_end ?? value;
          }
          if (errors.Friday_end?.hasError) {
            runValidationTasks("Friday_end", value);
          }
          setFriday_end(value);
        }}
        onBlur={() => runValidationTasks("Friday_end", Friday_end)}
        errorMessage={errors.Friday_end?.errorMessage}
        hasError={errors.Friday_end?.hasError}
        {...getOverrideProps(overrides, "Friday_end")}
      ></TextField>
      <TextField
        label="Saturday start"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Saturday_start}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start: value,
              Saturday_end,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Saturday_start ?? value;
          }
          if (errors.Saturday_start?.hasError) {
            runValidationTasks("Saturday_start", value);
          }
          setSaturday_start(value);
        }}
        onBlur={() => runValidationTasks("Saturday_start", Saturday_start)}
        errorMessage={errors.Saturday_start?.errorMessage}
        hasError={errors.Saturday_start?.hasError}
        {...getOverrideProps(overrides, "Saturday_start")}
      ></TextField>
      <TextField
        label="Saturday end"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Saturday_end}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end: value,
              Sunday_start,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Saturday_end ?? value;
          }
          if (errors.Saturday_end?.hasError) {
            runValidationTasks("Saturday_end", value);
          }
          setSaturday_end(value);
        }}
        onBlur={() => runValidationTasks("Saturday_end", Saturday_end)}
        errorMessage={errors.Saturday_end?.errorMessage}
        hasError={errors.Saturday_end?.hasError}
        {...getOverrideProps(overrides, "Saturday_end")}
      ></TextField>
      <TextField
        label="Sunday start"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Sunday_start}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start: value,
              Sunday_end,
            };
            const result = onChange(modelFields);
            value = result?.Sunday_start ?? value;
          }
          if (errors.Sunday_start?.hasError) {
            runValidationTasks("Sunday_start", value);
          }
          setSunday_start(value);
        }}
        onBlur={() => runValidationTasks("Sunday_start", Sunday_start)}
        errorMessage={errors.Sunday_start?.errorMessage}
        hasError={errors.Sunday_start?.hasError}
        {...getOverrideProps(overrides, "Sunday_start")}
      ></TextField>
      <TextField
        label="Sunday end"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Sunday_end}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday_start,
              Monday_end,
              Tuesday_start,
              Tuesday_end,
              Wednesday_start,
              Wednesday_end,
              Thurday_start,
              Thurday_end,
              Friday_start,
              Friday_end,
              Saturday_start,
              Saturday_end,
              Sunday_start,
              Sunday_end: value,
            };
            const result = onChange(modelFields);
            value = result?.Sunday_end ?? value;
          }
          if (errors.Sunday_end?.hasError) {
            runValidationTasks("Sunday_end", value);
          }
          setSunday_end(value);
        }}
        onBlur={() => runValidationTasks("Sunday_end", Sunday_end)}
        errorMessage={errors.Sunday_end?.errorMessage}
        hasError={errors.Sunday_end?.hasError}
        {...getOverrideProps(overrides, "Sunday_end")}
      ></TextField>
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
          isDisabled={!(idProp || userWorkTimModelProp)}
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
              !(idProp || userWorkTimModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
