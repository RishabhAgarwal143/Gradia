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
import { getTask, getUserinfo, listUserinfos } from "../graphql/queries";
import { updateTask } from "../graphql/mutations";
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
export default function TaskUpdateForm(props) {
  const {
    id: idProp,
    task: taskModelProp,
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
    userinfoID: undefined,
  };
  const [due_time, setDue_time] = React.useState(initialValues.due_time);
  const [due_date, setDue_date] = React.useState(initialValues.due_date);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [userinfoID, setUserinfoID] = React.useState(initialValues.userinfoID);
  const [userinfoIDLoading, setUserinfoIDLoading] = React.useState(false);
  const [userinfoIDRecords, setUserinfoIDRecords] = React.useState([]);
  const [selectedUserinfoIDRecords, setSelectedUserinfoIDRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = taskRecord
      ? { ...initialValues, ...taskRecord, userinfoID }
      : initialValues;
    setDue_time(cleanValues.due_time);
    setDue_date(cleanValues.due_date);
    setDescription(cleanValues.description);
    setUserinfoID(cleanValues.userinfoID);
    setCurrentUserinfoIDValue(undefined);
    setCurrentUserinfoIDDisplayValue("");
    setErrors({});
  };
  const [taskRecord, setTaskRecord] = React.useState(taskModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTask.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTask
        : taskModelProp;
      const userinfoIDRecord = record ? record.userinfoID : undefined;
      const userinfoRecord = userinfoIDRecord
        ? (
            await client.graphql({
              query: getUserinfo.replaceAll("__typename", ""),
              variables: { id: userinfoIDRecord },
            })
          )?.data?.getUserinfo
        : undefined;
      setUserinfoID(userinfoIDRecord);
      setSelectedUserinfoIDRecords([userinfoRecord]);
      setTaskRecord(record);
    };
    queryData();
  }, [idProp, taskModelProp]);
  React.useEffect(resetStateValues, [taskRecord, userinfoID]);
  const [currentUserinfoIDDisplayValue, setCurrentUserinfoIDDisplayValue] =
    React.useState("");
  const [currentUserinfoIDValue, setCurrentUserinfoIDValue] =
    React.useState(undefined);
  const userinfoIDRef = React.createRef();
  const getDisplayValue = {
    userinfoID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    due_time: [{ type: "Required" }],
    due_date: [{ type: "Required" }],
    description: [{ type: "Required" }],
    userinfoID: [{ type: "Required" }],
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
  const fetchUserinfoIDRecords = async (value) => {
    setUserinfoIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listUserinfos.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listUserinfos?.items;
      var loaded = result.filter((item) => userinfoID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setUserinfoIDRecords(newOptions.slice(0, autocompleteLength));
    setUserinfoIDLoading(false);
  };
  React.useEffect(() => {
    fetchUserinfoIDRecords("");
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
          due_time,
          due_date,
          description,
          userinfoID,
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
            query: updateTask.replaceAll("__typename", ""),
            variables: {
              input: {
                id: taskRecord.id,
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
      {...getOverrideProps(overrides, "TaskUpdateForm")}
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
              userinfoID,
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
              userinfoID,
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
              userinfoID,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              due_time,
              due_date,
              description,
              userinfoID: value,
            };
            const result = onChange(modelFields);
            value = result?.userinfoID ?? value;
          }
          setUserinfoID(value);
          setCurrentUserinfoIDValue(undefined);
        }}
        currentFieldValue={currentUserinfoIDValue}
        label={"Userinfo id"}
        items={userinfoID ? [userinfoID] : []}
        hasError={errors?.userinfoID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("userinfoID", currentUserinfoIDValue)
        }
        errorMessage={errors?.userinfoID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.userinfoID(
                userinfoIDRecords.find((r) => r.id === value) ??
                  selectedUserinfoIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentUserinfoIDDisplayValue(
            value
              ? getDisplayValue.userinfoID(
                  userinfoIDRecords.find((r) => r.id === value) ??
                    selectedUserinfoIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentUserinfoIDValue(value);
          const selectedRecord = userinfoIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedUserinfoIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={userinfoIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Userinfo id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Userinfo"
          value={currentUserinfoIDDisplayValue}
          options={userinfoIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.userinfoID?.(r),
            }))}
          isLoading={userinfoIDLoading}
          onSelect={({ id, label }) => {
            setCurrentUserinfoIDValue(id);
            setCurrentUserinfoIDDisplayValue(label);
            runValidationTasks("userinfoID", label);
          }}
          onClear={() => {
            setCurrentUserinfoIDDisplayValue("");
          }}
          defaultValue={userinfoID}
          onChange={(e) => {
            let { value } = e.target;
            fetchUserinfoIDRecords(value);
            if (errors.userinfoID?.hasError) {
              runValidationTasks("userinfoID", value);
            }
            setCurrentUserinfoIDDisplayValue(value);
            setCurrentUserinfoIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("userinfoID", currentUserinfoIDValue)
          }
          errorMessage={errors.userinfoID?.errorMessage}
          hasError={errors.userinfoID?.hasError}
          ref={userinfoIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "userinfoID")}
        ></Autocomplete>
      </ArrayField>
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
          isDisabled={!(idProp || taskModelProp)}
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
              !(idProp || taskModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
