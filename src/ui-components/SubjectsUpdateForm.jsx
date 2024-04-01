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
import { getSubjects, listSchedules, listTasks } from "../graphql/queries";
import {
  updateSchedule,
  updateSubjects,
  updateTask,
} from "../graphql/mutations";
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
export default function SubjectsUpdateForm(props) {
  const {
    id: idProp,
    subjects: subjectsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    subject_Name: "",
    current_Grade: "",
    target_Grade: "",
    Tasks: [],
    Schedules: [],
  };
  const [subject_Name, setSubject_Name] = React.useState(
    initialValues.subject_Name
  );
  const [current_Grade, setCurrent_Grade] = React.useState(
    initialValues.current_Grade
  );
  const [target_Grade, setTarget_Grade] = React.useState(
    initialValues.target_Grade
  );
  const [Tasks, setTasks] = React.useState(initialValues.Tasks);
  const [TasksLoading, setTasksLoading] = React.useState(false);
  const [tasksRecords, setTasksRecords] = React.useState([]);
  const [Schedules, setSchedules] = React.useState(initialValues.Schedules);
  const [SchedulesLoading, setSchedulesLoading] = React.useState(false);
  const [schedulesRecords, setSchedulesRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = subjectsRecord
      ? {
          ...initialValues,
          ...subjectsRecord,
          Tasks: linkedTasks,
          Schedules: linkedSchedules,
        }
      : initialValues;
    setSubject_Name(cleanValues.subject_Name);
    setCurrent_Grade(cleanValues.current_Grade);
    setTarget_Grade(cleanValues.target_Grade);
    setTasks(cleanValues.Tasks ?? []);
    setCurrentTasksValue(undefined);
    setCurrentTasksDisplayValue("");
    setSchedules(cleanValues.Schedules ?? []);
    setCurrentSchedulesValue(undefined);
    setCurrentSchedulesDisplayValue("");
    setErrors({});
  };
  const [subjectsRecord, setSubjectsRecord] = React.useState(subjectsModelProp);
  const [linkedTasks, setLinkedTasks] = React.useState([]);
  const canUnlinkTasks = true;
  const [linkedSchedules, setLinkedSchedules] = React.useState([]);
  const canUnlinkSchedules = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSubjects.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSubjects
        : subjectsModelProp;
      const linkedTasks = record?.Tasks?.items ?? [];
      setLinkedTasks(linkedTasks);
      const linkedSchedules = record?.Schedules?.items ?? [];
      setLinkedSchedules(linkedSchedules);
      setSubjectsRecord(record);
    };
    queryData();
  }, [idProp, subjectsModelProp]);
  React.useEffect(resetStateValues, [
    subjectsRecord,
    linkedTasks,
    linkedSchedules,
  ]);
  const [currentTasksDisplayValue, setCurrentTasksDisplayValue] =
    React.useState("");
  const [currentTasksValue, setCurrentTasksValue] = React.useState(undefined);
  const TasksRef = React.createRef();
  const [currentSchedulesDisplayValue, setCurrentSchedulesDisplayValue] =
    React.useState("");
  const [currentSchedulesValue, setCurrentSchedulesValue] =
    React.useState(undefined);
  const SchedulesRef = React.createRef();
  const getIDValue = {
    Tasks: (r) => JSON.stringify({ id: r?.id }),
    Schedules: (r) => JSON.stringify({ id: r?.id }),
  };
  const TasksIdSet = new Set(
    Array.isArray(Tasks)
      ? Tasks.map((r) => getIDValue.Tasks?.(r))
      : getIDValue.Tasks?.(Tasks)
  );
  const SchedulesIdSet = new Set(
    Array.isArray(Schedules)
      ? Schedules.map((r) => getIDValue.Schedules?.(r))
      : getIDValue.Schedules?.(Schedules)
  );
  const getDisplayValue = {
    Tasks: (r) => `${r?.UID ? r?.UID + " - " : ""}${r?.id}`,
    Schedules: (r) => `${r?.SUMMARY ? r?.SUMMARY + " - " : ""}${r?.id}`,
  };
  const validations = {
    subject_Name: [],
    current_Grade: [],
    target_Grade: [],
    Tasks: [],
    Schedules: [],
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
  const fetchTasksRecords = async (value) => {
    setTasksLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ UID: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listTasks.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTasks?.items;
      var loaded = result.filter(
        (item) => !TasksIdSet.has(getIDValue.Tasks?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setTasksRecords(newOptions.slice(0, autocompleteLength));
    setTasksLoading(false);
  };
  const fetchSchedulesRecords = async (value) => {
    setSchedulesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ SUMMARY: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listSchedules.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listSchedules?.items;
      var loaded = result.filter(
        (item) => !SchedulesIdSet.has(getIDValue.Schedules?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setSchedulesRecords(newOptions.slice(0, autocompleteLength));
    setSchedulesLoading(false);
  };
  React.useEffect(() => {
    fetchTasksRecords("");
    fetchSchedulesRecords("");
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
          subject_Name: subject_Name ?? null,
          current_Grade: current_Grade ?? null,
          target_Grade: target_Grade ?? null,
          Tasks: Tasks ?? null,
          Schedules: Schedules ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const promises = [];
          const tasksToLink = [];
          const tasksToUnLink = [];
          const tasksSet = new Set();
          const linkedTasksSet = new Set();
          Tasks.forEach((r) => tasksSet.add(getIDValue.Tasks?.(r)));
          linkedTasks.forEach((r) => linkedTasksSet.add(getIDValue.Tasks?.(r)));
          linkedTasks.forEach((r) => {
            if (!tasksSet.has(getIDValue.Tasks?.(r))) {
              tasksToUnLink.push(r);
            }
          });
          Tasks.forEach((r) => {
            if (!linkedTasksSet.has(getIDValue.Tasks?.(r))) {
              tasksToLink.push(r);
            }
          });
          tasksToUnLink.forEach((original) => {
            if (!canUnlinkTasks) {
              throw Error(
                `Task ${original.id} cannot be unlinked from Subjects because subjectsID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateTask.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    subjectsID: null,
                  },
                },
              })
            );
          });
          tasksToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateTask.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    subjectsID: subjectsRecord.id,
                  },
                },
              })
            );
          });
          const schedulesToLink = [];
          const schedulesToUnLink = [];
          const schedulesSet = new Set();
          const linkedSchedulesSet = new Set();
          Schedules.forEach((r) => schedulesSet.add(getIDValue.Schedules?.(r)));
          linkedSchedules.forEach((r) =>
            linkedSchedulesSet.add(getIDValue.Schedules?.(r))
          );
          linkedSchedules.forEach((r) => {
            if (!schedulesSet.has(getIDValue.Schedules?.(r))) {
              schedulesToUnLink.push(r);
            }
          });
          Schedules.forEach((r) => {
            if (!linkedSchedulesSet.has(getIDValue.Schedules?.(r))) {
              schedulesToLink.push(r);
            }
          });
          schedulesToUnLink.forEach((original) => {
            if (!canUnlinkSchedules) {
              throw Error(
                `Schedule ${original.id} cannot be unlinked from Subjects because subjectsID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateSchedule.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    subjectsID: null,
                  },
                },
              })
            );
          });
          schedulesToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateSchedule.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    subjectsID: subjectsRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            subject_Name: modelFields.subject_Name ?? null,
            current_Grade: modelFields.current_Grade ?? null,
            target_Grade: modelFields.target_Grade ?? null,
          };
          promises.push(
            client.graphql({
              query: updateSubjects.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: subjectsRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "SubjectsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Subject name"
        isRequired={false}
        isReadOnly={false}
        value={subject_Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject_Name: value,
              current_Grade,
              target_Grade,
              Tasks,
              Schedules,
            };
            const result = onChange(modelFields);
            value = result?.subject_Name ?? value;
          }
          if (errors.subject_Name?.hasError) {
            runValidationTasks("subject_Name", value);
          }
          setSubject_Name(value);
        }}
        onBlur={() => runValidationTasks("subject_Name", subject_Name)}
        errorMessage={errors.subject_Name?.errorMessage}
        hasError={errors.subject_Name?.hasError}
        {...getOverrideProps(overrides, "subject_Name")}
      ></TextField>
      <TextField
        label="Current grade"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={current_Grade}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              subject_Name,
              current_Grade: value,
              target_Grade,
              Tasks,
              Schedules,
            };
            const result = onChange(modelFields);
            value = result?.current_Grade ?? value;
          }
          if (errors.current_Grade?.hasError) {
            runValidationTasks("current_Grade", value);
          }
          setCurrent_Grade(value);
        }}
        onBlur={() => runValidationTasks("current_Grade", current_Grade)}
        errorMessage={errors.current_Grade?.errorMessage}
        hasError={errors.current_Grade?.hasError}
        {...getOverrideProps(overrides, "current_Grade")}
      ></TextField>
      <TextField
        label="Target grade"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={target_Grade}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              subject_Name,
              current_Grade,
              target_Grade: value,
              Tasks,
              Schedules,
            };
            const result = onChange(modelFields);
            value = result?.target_Grade ?? value;
          }
          if (errors.target_Grade?.hasError) {
            runValidationTasks("target_Grade", value);
          }
          setTarget_Grade(value);
        }}
        onBlur={() => runValidationTasks("target_Grade", target_Grade)}
        errorMessage={errors.target_Grade?.errorMessage}
        hasError={errors.target_Grade?.hasError}
        {...getOverrideProps(overrides, "target_Grade")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              subject_Name,
              current_Grade,
              target_Grade,
              Tasks: values,
              Schedules,
            };
            const result = onChange(modelFields);
            values = result?.Tasks ?? values;
          }
          setTasks(values);
          setCurrentTasksValue(undefined);
          setCurrentTasksDisplayValue("");
        }}
        currentFieldValue={currentTasksValue}
        label={"Tasks"}
        items={Tasks}
        hasError={errors?.Tasks?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Tasks", currentTasksValue)
        }
        errorMessage={errors?.Tasks?.errorMessage}
        getBadgeText={getDisplayValue.Tasks}
        setFieldValue={(model) => {
          setCurrentTasksDisplayValue(
            model ? getDisplayValue.Tasks(model) : ""
          );
          setCurrentTasksValue(model);
        }}
        inputFieldRef={TasksRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Tasks"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Task"
          value={currentTasksDisplayValue}
          options={tasksRecords
            .filter((r) => !TasksIdSet.has(getIDValue.Tasks?.(r)))
            .map((r) => ({
              id: getIDValue.Tasks?.(r),
              label: getDisplayValue.Tasks?.(r),
            }))}
          isLoading={TasksLoading}
          onSelect={({ id, label }) => {
            setCurrentTasksValue(
              tasksRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTasksDisplayValue(label);
            runValidationTasks("Tasks", label);
          }}
          onClear={() => {
            setCurrentTasksDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchTasksRecords(value);
            if (errors.Tasks?.hasError) {
              runValidationTasks("Tasks", value);
            }
            setCurrentTasksDisplayValue(value);
            setCurrentTasksValue(undefined);
          }}
          onBlur={() => runValidationTasks("Tasks", currentTasksDisplayValue)}
          errorMessage={errors.Tasks?.errorMessage}
          hasError={errors.Tasks?.hasError}
          ref={TasksRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Tasks")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              subject_Name,
              current_Grade,
              target_Grade,
              Tasks,
              Schedules: values,
            };
            const result = onChange(modelFields);
            values = result?.Schedules ?? values;
          }
          setSchedules(values);
          setCurrentSchedulesValue(undefined);
          setCurrentSchedulesDisplayValue("");
        }}
        currentFieldValue={currentSchedulesValue}
        label={"Schedules"}
        items={Schedules}
        hasError={errors?.Schedules?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Schedules", currentSchedulesValue)
        }
        errorMessage={errors?.Schedules?.errorMessage}
        getBadgeText={getDisplayValue.Schedules}
        setFieldValue={(model) => {
          setCurrentSchedulesDisplayValue(
            model ? getDisplayValue.Schedules(model) : ""
          );
          setCurrentSchedulesValue(model);
        }}
        inputFieldRef={SchedulesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Schedules"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Schedule"
          value={currentSchedulesDisplayValue}
          options={schedulesRecords
            .filter((r) => !SchedulesIdSet.has(getIDValue.Schedules?.(r)))
            .map((r) => ({
              id: getIDValue.Schedules?.(r),
              label: getDisplayValue.Schedules?.(r),
            }))}
          isLoading={SchedulesLoading}
          onSelect={({ id, label }) => {
            setCurrentSchedulesValue(
              schedulesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSchedulesDisplayValue(label);
            runValidationTasks("Schedules", label);
          }}
          onClear={() => {
            setCurrentSchedulesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchSchedulesRecords(value);
            if (errors.Schedules?.hasError) {
              runValidationTasks("Schedules", value);
            }
            setCurrentSchedulesDisplayValue(value);
            setCurrentSchedulesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Schedules", currentSchedulesDisplayValue)
          }
          errorMessage={errors.Schedules?.errorMessage}
          hasError={errors.Schedules?.hasError}
          ref={SchedulesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Schedules")}
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
          isDisabled={!(idProp || subjectsModelProp)}
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
              !(idProp || subjectsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
