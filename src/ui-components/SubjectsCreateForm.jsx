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
import {
  listLetterGrades,
  listSchedules,
  listSyllabusGradeValues,
  listTasks,
  listUserinfos,
} from "../graphql/queries";
import {
  createSubjects,
  updateLetterGrade,
  updateSchedule,
  updateSyllabusGradeValues,
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
export default function SubjectsCreateForm(props) {
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
    subject_Name: "",
    current_Grade: "",
    target_Grade: "",
    Tasks: [],
    Schedules: [],
    userinfoID: undefined,
    subject_Difficulty: "",
    SyllabusGradeValues: [],
    LetterGrades: [],
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
  const [userinfoID, setUserinfoID] = React.useState(initialValues.userinfoID);
  const [userinfoIDLoading, setUserinfoIDLoading] = React.useState(false);
  const [userinfoIDRecords, setUserinfoIDRecords] = React.useState([]);
  const [selectedUserinfoIDRecords, setSelectedUserinfoIDRecords] =
    React.useState([]);
  const [subject_Difficulty, setSubject_Difficulty] = React.useState(
    initialValues.subject_Difficulty
  );
  const [SyllabusGradeValues, setSyllabusGradeValues] = React.useState(
    initialValues.SyllabusGradeValues
  );
  const [SyllabusGradeValuesLoading, setSyllabusGradeValuesLoading] =
    React.useState(false);
  const [syllabusGradeValuesRecords, setSyllabusGradeValuesRecords] =
    React.useState([]);
  const [LetterGrades, setLetterGrades] = React.useState(
    initialValues.LetterGrades
  );
  const [LetterGradesLoading, setLetterGradesLoading] = React.useState(false);
  const [letterGradesRecords, setLetterGradesRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSubject_Name(initialValues.subject_Name);
    setCurrent_Grade(initialValues.current_Grade);
    setTarget_Grade(initialValues.target_Grade);
    setTasks(initialValues.Tasks);
    setCurrentTasksValue(undefined);
    setCurrentTasksDisplayValue("");
    setSchedules(initialValues.Schedules);
    setCurrentSchedulesValue(undefined);
    setCurrentSchedulesDisplayValue("");
    setUserinfoID(initialValues.userinfoID);
    setCurrentUserinfoIDValue(undefined);
    setCurrentUserinfoIDDisplayValue("");
    setSubject_Difficulty(initialValues.subject_Difficulty);
    setSyllabusGradeValues(initialValues.SyllabusGradeValues);
    setCurrentSyllabusGradeValuesValue(undefined);
    setCurrentSyllabusGradeValuesDisplayValue("");
    setLetterGrades(initialValues.LetterGrades);
    setCurrentLetterGradesValue(undefined);
    setCurrentLetterGradesDisplayValue("");
    setErrors({});
  };
  const [currentTasksDisplayValue, setCurrentTasksDisplayValue] =
    React.useState("");
  const [currentTasksValue, setCurrentTasksValue] = React.useState(undefined);
  const TasksRef = React.createRef();
  const [currentSchedulesDisplayValue, setCurrentSchedulesDisplayValue] =
    React.useState("");
  const [currentSchedulesValue, setCurrentSchedulesValue] =
    React.useState(undefined);
  const SchedulesRef = React.createRef();
  const [currentUserinfoIDDisplayValue, setCurrentUserinfoIDDisplayValue] =
    React.useState("");
  const [currentUserinfoIDValue, setCurrentUserinfoIDValue] =
    React.useState(undefined);
  const userinfoIDRef = React.createRef();
  const [
    currentSyllabusGradeValuesDisplayValue,
    setCurrentSyllabusGradeValuesDisplayValue,
  ] = React.useState("");
  const [currentSyllabusGradeValuesValue, setCurrentSyllabusGradeValuesValue] =
    React.useState(undefined);
  const SyllabusGradeValuesRef = React.createRef();
  const [currentLetterGradesDisplayValue, setCurrentLetterGradesDisplayValue] =
    React.useState("");
  const [currentLetterGradesValue, setCurrentLetterGradesValue] =
    React.useState(undefined);
  const LetterGradesRef = React.createRef();
  const getIDValue = {
    Tasks: (r) => JSON.stringify({ id: r?.id }),
    Schedules: (r) => JSON.stringify({ id: r?.id }),
    SyllabusGradeValues: (r) => JSON.stringify({ id: r?.id }),
    LetterGrades: (r) => JSON.stringify({ id: r?.id }),
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
  const SyllabusGradeValuesIdSet = new Set(
    Array.isArray(SyllabusGradeValues)
      ? SyllabusGradeValues.map((r) => getIDValue.SyllabusGradeValues?.(r))
      : getIDValue.SyllabusGradeValues?.(SyllabusGradeValues)
  );
  const LetterGradesIdSet = new Set(
    Array.isArray(LetterGrades)
      ? LetterGrades.map((r) => getIDValue.LetterGrades?.(r))
      : getIDValue.LetterGrades?.(LetterGrades)
  );
  const getDisplayValue = {
    Tasks: (r) => `${r?.UID ? r?.UID + " - " : ""}${r?.id}`,
    Schedules: (r) => `${r?.SUMMARY ? r?.SUMMARY + " - " : ""}${r?.id}`,
    userinfoID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    SyllabusGradeValues: (r) =>
      `${r?.category_Name ? r?.category_Name + " - " : ""}${r?.id}`,
    LetterGrades: (r) =>
      `${r?.LetterValue ? r?.LetterValue + " - " : ""}${r?.id}`,
  };
  const validations = {
    subject_Name: [],
    current_Grade: [],
    target_Grade: [],
    Tasks: [],
    Schedules: [],
    userinfoID: [{ type: "Required" }],
    subject_Difficulty: [],
    SyllabusGradeValues: [],
    LetterGrades: [],
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
  const fetchSyllabusGradeValuesRecords = async (value) => {
    setSyllabusGradeValuesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { category_Name: { contains: value } },
            { id: { contains: value } },
          ],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listSyllabusGradeValues.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listSyllabusGradeValues?.items;
      var loaded = result.filter(
        (item) =>
          !SyllabusGradeValuesIdSet.has(getIDValue.SyllabusGradeValues?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setSyllabusGradeValuesRecords(newOptions.slice(0, autocompleteLength));
    setSyllabusGradeValuesLoading(false);
  };
  const fetchLetterGradesRecords = async (value) => {
    setLetterGradesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { LetterValue: { contains: value } },
            { id: { contains: value } },
          ],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listLetterGrades.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listLetterGrades?.items;
      var loaded = result.filter(
        (item) => !LetterGradesIdSet.has(getIDValue.LetterGrades?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setLetterGradesRecords(newOptions.slice(0, autocompleteLength));
    setLetterGradesLoading(false);
  };
  React.useEffect(() => {
    fetchTasksRecords("");
    fetchSchedulesRecords("");
    fetchUserinfoIDRecords("");
    fetchSyllabusGradeValuesRecords("");
    fetchLetterGradesRecords("");
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
          subject_Name,
          current_Grade,
          target_Grade,
          Tasks,
          Schedules,
          userinfoID,
          subject_Difficulty,
          SyllabusGradeValues,
          LetterGrades,
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
          const modelFieldsToSave = {
            subject_Name: modelFields.subject_Name,
            current_Grade: modelFields.current_Grade,
            target_Grade: modelFields.target_Grade,
            userinfoID: modelFields.userinfoID,
            subject_Difficulty: modelFields.subject_Difficulty,
          };
          const subjects = (
            await client.graphql({
              query: createSubjects.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createSubjects;
          const promises = [];
          promises.push(
            ...Tasks.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateTask.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      subjectsID: subjects.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...Schedules.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateSchedule.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      subjectsID: subjects.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...SyllabusGradeValues.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateSyllabusGradeValues.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      subjectsID: subjects.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...LetterGrades.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateLetterGrade.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      subjectsID: subjects.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "SubjectsCreateForm")}
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
              userinfoID,
              subject_Difficulty,
              SyllabusGradeValues,
              LetterGrades,
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
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              subject_Name,
              current_Grade: value,
              target_Grade,
              Tasks,
              Schedules,
              userinfoID,
              subject_Difficulty,
              SyllabusGradeValues,
              LetterGrades,
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
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              subject_Name,
              current_Grade,
              target_Grade: value,
              Tasks,
              Schedules,
              userinfoID,
              subject_Difficulty,
              SyllabusGradeValues,
              LetterGrades,
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
              userinfoID,
              subject_Difficulty,
              SyllabusGradeValues,
              LetterGrades,
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
              userinfoID,
              subject_Difficulty,
              SyllabusGradeValues,
              LetterGrades,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              subject_Name,
              current_Grade,
              target_Grade,
              Tasks,
              Schedules,
              userinfoID: value,
              subject_Difficulty,
              SyllabusGradeValues,
              LetterGrades,
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
      <TextField
        label="Subject difficulty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={subject_Difficulty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              subject_Name,
              current_Grade,
              target_Grade,
              Tasks,
              Schedules,
              userinfoID,
              subject_Difficulty: value,
              SyllabusGradeValues,
              LetterGrades,
            };
            const result = onChange(modelFields);
            value = result?.subject_Difficulty ?? value;
          }
          if (errors.subject_Difficulty?.hasError) {
            runValidationTasks("subject_Difficulty", value);
          }
          setSubject_Difficulty(value);
        }}
        onBlur={() =>
          runValidationTasks("subject_Difficulty", subject_Difficulty)
        }
        errorMessage={errors.subject_Difficulty?.errorMessage}
        hasError={errors.subject_Difficulty?.hasError}
        {...getOverrideProps(overrides, "subject_Difficulty")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              subject_Name,
              current_Grade,
              target_Grade,
              Tasks,
              Schedules,
              userinfoID,
              subject_Difficulty,
              SyllabusGradeValues: values,
              LetterGrades,
            };
            const result = onChange(modelFields);
            values = result?.SyllabusGradeValues ?? values;
          }
          setSyllabusGradeValues(values);
          setCurrentSyllabusGradeValuesValue(undefined);
          setCurrentSyllabusGradeValuesDisplayValue("");
        }}
        currentFieldValue={currentSyllabusGradeValuesValue}
        label={"Syllabus grade values"}
        items={SyllabusGradeValues}
        hasError={errors?.SyllabusGradeValues?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "SyllabusGradeValues",
            currentSyllabusGradeValuesValue
          )
        }
        errorMessage={errors?.SyllabusGradeValues?.errorMessage}
        getBadgeText={getDisplayValue.SyllabusGradeValues}
        setFieldValue={(model) => {
          setCurrentSyllabusGradeValuesDisplayValue(
            model ? getDisplayValue.SyllabusGradeValues(model) : ""
          );
          setCurrentSyllabusGradeValuesValue(model);
        }}
        inputFieldRef={SyllabusGradeValuesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Syllabus grade values"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search SyllabusGradeValues"
          value={currentSyllabusGradeValuesDisplayValue}
          options={syllabusGradeValuesRecords
            .filter(
              (r) =>
                !SyllabusGradeValuesIdSet.has(
                  getIDValue.SyllabusGradeValues?.(r)
                )
            )
            .map((r) => ({
              id: getIDValue.SyllabusGradeValues?.(r),
              label: getDisplayValue.SyllabusGradeValues?.(r),
            }))}
          isLoading={SyllabusGradeValuesLoading}
          onSelect={({ id, label }) => {
            setCurrentSyllabusGradeValuesValue(
              syllabusGradeValuesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSyllabusGradeValuesDisplayValue(label);
            runValidationTasks("SyllabusGradeValues", label);
          }}
          onClear={() => {
            setCurrentSyllabusGradeValuesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchSyllabusGradeValuesRecords(value);
            if (errors.SyllabusGradeValues?.hasError) {
              runValidationTasks("SyllabusGradeValues", value);
            }
            setCurrentSyllabusGradeValuesDisplayValue(value);
            setCurrentSyllabusGradeValuesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "SyllabusGradeValues",
              currentSyllabusGradeValuesDisplayValue
            )
          }
          errorMessage={errors.SyllabusGradeValues?.errorMessage}
          hasError={errors.SyllabusGradeValues?.hasError}
          ref={SyllabusGradeValuesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "SyllabusGradeValues")}
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
              Schedules,
              userinfoID,
              subject_Difficulty,
              SyllabusGradeValues,
              LetterGrades: values,
            };
            const result = onChange(modelFields);
            values = result?.LetterGrades ?? values;
          }
          setLetterGrades(values);
          setCurrentLetterGradesValue(undefined);
          setCurrentLetterGradesDisplayValue("");
        }}
        currentFieldValue={currentLetterGradesValue}
        label={"Letter grades"}
        items={LetterGrades}
        hasError={errors?.LetterGrades?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("LetterGrades", currentLetterGradesValue)
        }
        errorMessage={errors?.LetterGrades?.errorMessage}
        getBadgeText={getDisplayValue.LetterGrades}
        setFieldValue={(model) => {
          setCurrentLetterGradesDisplayValue(
            model ? getDisplayValue.LetterGrades(model) : ""
          );
          setCurrentLetterGradesValue(model);
        }}
        inputFieldRef={LetterGradesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Letter grades"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LetterGrade"
          value={currentLetterGradesDisplayValue}
          options={letterGradesRecords
            .filter((r) => !LetterGradesIdSet.has(getIDValue.LetterGrades?.(r)))
            .map((r) => ({
              id: getIDValue.LetterGrades?.(r),
              label: getDisplayValue.LetterGrades?.(r),
            }))}
          isLoading={LetterGradesLoading}
          onSelect={({ id, label }) => {
            setCurrentLetterGradesValue(
              letterGradesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentLetterGradesDisplayValue(label);
            runValidationTasks("LetterGrades", label);
          }}
          onClear={() => {
            setCurrentLetterGradesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchLetterGradesRecords(value);
            if (errors.LetterGrades?.hasError) {
              runValidationTasks("LetterGrades", value);
            }
            setCurrentLetterGradesDisplayValue(value);
            setCurrentLetterGradesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("LetterGrades", currentLetterGradesDisplayValue)
          }
          errorMessage={errors.LetterGrades?.errorMessage}
          hasError={errors.LetterGrades?.hasError}
          ref={LetterGradesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "LetterGrades")}
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
