/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { listSubjects } from "../graphql/queries";
import { createLetterGrade } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function LetterGradeCreateForm(props) {
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
    LetterValue: "",
    GradeCutoff: "",
    subjectsID: undefined,
  };
  const [LetterValue, setLetterValue] = React.useState(
    initialValues.LetterValue
  );
  const [GradeCutoff, setGradeCutoff] = React.useState(
    initialValues.GradeCutoff
  );
  const [subjectsID, setSubjectsID] = React.useState(initialValues.subjectsID);
  const [subjectsIDLoading, setSubjectsIDLoading] = React.useState(false);
  const [subjectsIDRecords, setSubjectsIDRecords] = React.useState([]);
  const [selectedSubjectsIDRecords, setSelectedSubjectsIDRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setLetterValue(initialValues.LetterValue);
    setGradeCutoff(initialValues.GradeCutoff);
    setSubjectsID(initialValues.subjectsID);
    setCurrentSubjectsIDValue(undefined);
    setCurrentSubjectsIDDisplayValue("");
    setErrors({});
  };
  const [currentSubjectsIDDisplayValue, setCurrentSubjectsIDDisplayValue] =
    React.useState("");
  const [currentSubjectsIDValue, setCurrentSubjectsIDValue] =
    React.useState(undefined);
  const subjectsIDRef = React.createRef();
  const getDisplayValue = {
    subjectsID: (r) =>
      `${r?.subject_Name ? r?.subject_Name + " - " : ""}${r?.id}`,
  };
  const validations = {
    LetterValue: [],
    GradeCutoff: [],
    subjectsID: [{ type: "Required" }],
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
  const fetchSubjectsIDRecords = async (value) => {
    setSubjectsIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { subject_Name: { contains: value } },
            { id: { contains: value } },
          ],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listSubjects.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listSubjects?.items;
      var loaded = result.filter((item) => subjectsID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setSubjectsIDRecords(newOptions.slice(0, autocompleteLength));
    setSubjectsIDLoading(false);
  };
  React.useEffect(() => {
    fetchSubjectsIDRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          LetterValue,
          GradeCutoff,
          subjectsID,
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
            query: createLetterGrade.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "LetterGradeCreateForm")}
      {...rest}
    >
      <TextField
        label="Letter value"
        isRequired={false}
        isReadOnly={false}
        value={LetterValue}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              LetterValue: value,
              GradeCutoff,
              subjectsID,
            };
            const result = onChange(modelFields);
            value = result?.LetterValue ?? value;
          }
          if (errors.LetterValue?.hasError) {
            runValidationTasks("LetterValue", value);
          }
          setLetterValue(value);
        }}
        onBlur={() => runValidationTasks("LetterValue", LetterValue)}
        errorMessage={errors.LetterValue?.errorMessage}
        hasError={errors.LetterValue?.hasError}
        {...getOverrideProps(overrides, "LetterValue")}
      ></TextField>
      <TextField
        label="Grade cutoff"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={GradeCutoff}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              LetterValue,
              GradeCutoff: value,
              subjectsID,
            };
            const result = onChange(modelFields);
            value = result?.GradeCutoff ?? value;
          }
          if (errors.GradeCutoff?.hasError) {
            runValidationTasks("GradeCutoff", value);
          }
          setGradeCutoff(value);
        }}
        onBlur={() => runValidationTasks("GradeCutoff", GradeCutoff)}
        errorMessage={errors.GradeCutoff?.errorMessage}
        hasError={errors.GradeCutoff?.hasError}
        {...getOverrideProps(overrides, "GradeCutoff")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              LetterValue,
              GradeCutoff,
              subjectsID: value,
            };
            const result = onChange(modelFields);
            value = result?.subjectsID ?? value;
          }
          setSubjectsID(value);
          setCurrentSubjectsIDValue(undefined);
        }}
        currentFieldValue={currentSubjectsIDValue}
        label={"Subjects id"}
        items={subjectsID ? [subjectsID] : []}
        hasError={errors?.subjectsID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("subjectsID", currentSubjectsIDValue)
        }
        errorMessage={errors?.subjectsID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.subjectsID(
                subjectsIDRecords.find((r) => r.id === value) ??
                  selectedSubjectsIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentSubjectsIDDisplayValue(
            value
              ? getDisplayValue.subjectsID(
                  subjectsIDRecords.find((r) => r.id === value) ??
                    selectedSubjectsIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentSubjectsIDValue(value);
          const selectedRecord = subjectsIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedSubjectsIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={subjectsIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Subjects id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Subjects"
          value={currentSubjectsIDDisplayValue}
          options={subjectsIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.subjectsID?.(r),
            }))}
          isLoading={subjectsIDLoading}
          onSelect={({ id, label }) => {
            setCurrentSubjectsIDValue(id);
            setCurrentSubjectsIDDisplayValue(label);
            runValidationTasks("subjectsID", label);
          }}
          onClear={() => {
            setCurrentSubjectsIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchSubjectsIDRecords(value);
            if (errors.subjectsID?.hasError) {
              runValidationTasks("subjectsID", value);
            }
            setCurrentSubjectsIDDisplayValue(value);
            setCurrentSubjectsIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("subjectsID", currentSubjectsIDValue)
          }
          errorMessage={errors.subjectsID?.errorMessage}
          hasError={errors.subjectsID?.hasError}
          ref={subjectsIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "subjectsID")}
        ></Autocomplete>
      </ArrayField>
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
