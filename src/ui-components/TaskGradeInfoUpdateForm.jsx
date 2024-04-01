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
import { getTaskGradeInfo, listTasks } from "../graphql/queries";
import { updateTask, updateTaskGradeInfo } from "../graphql/mutations";
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
export default function TaskGradeInfoUpdateForm(props) {
  const {
    id: idProp,
    taskGradeInfo: taskGradeInfoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    current_Grade: "",
    task_Weightage: "",
    overall_Percentage: "",
    extra_Info: "",
    time_Taken: "",
    Task: undefined,
  };
  const [current_Grade, setCurrent_Grade] = React.useState(
    initialValues.current_Grade
  );
  const [task_Weightage, setTask_Weightage] = React.useState(
    initialValues.task_Weightage
  );
  const [overall_Percentage, setOverall_Percentage] = React.useState(
    initialValues.overall_Percentage
  );
  const [extra_Info, setExtra_Info] = React.useState(initialValues.extra_Info);
  const [time_Taken, setTime_Taken] = React.useState(initialValues.time_Taken);
  const [Task, setTask] = React.useState(initialValues.Task);
  const [TaskLoading, setTaskLoading] = React.useState(false);
  const [taskRecords, setTaskRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = taskGradeInfoRecord
      ? { ...initialValues, ...taskGradeInfoRecord, Task }
      : initialValues;
    setCurrent_Grade(cleanValues.current_Grade);
    setTask_Weightage(cleanValues.task_Weightage);
    setOverall_Percentage(cleanValues.overall_Percentage);
    setExtra_Info(cleanValues.extra_Info);
    setTime_Taken(cleanValues.time_Taken);
    setTask(cleanValues.Task);
    setCurrentTaskValue(undefined);
    setCurrentTaskDisplayValue("");
    setErrors({});
  };
  const [taskGradeInfoRecord, setTaskGradeInfoRecord] = React.useState(
    taskGradeInfoModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTaskGradeInfo.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTaskGradeInfo
        : taskGradeInfoModelProp;
      const TaskRecord = record ? await record.Task : undefined;
      setTask(TaskRecord);
      setTaskGradeInfoRecord(record);
    };
    queryData();
  }, [idProp, taskGradeInfoModelProp]);
  React.useEffect(resetStateValues, [taskGradeInfoRecord, Task]);
  const [currentTaskDisplayValue, setCurrentTaskDisplayValue] =
    React.useState("");
  const [currentTaskValue, setCurrentTaskValue] = React.useState(undefined);
  const TaskRef = React.createRef();
  const getIDValue = {
    Task: (r) => JSON.stringify({ id: r?.id }),
  };
  const TaskIdSet = new Set(
    Array.isArray(Task)
      ? Task.map((r) => getIDValue.Task?.(r))
      : getIDValue.Task?.(Task)
  );
  const getDisplayValue = {
    Task: (r) => `${r?.UID ? r?.UID + " - " : ""}${r?.id}`,
  };
  const validations = {
    current_Grade: [],
    task_Weightage: [],
    overall_Percentage: [],
    extra_Info: [],
    time_Taken: [],
    Task: [],
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
  const fetchTaskRecords = async (value) => {
    setTaskLoading(true);
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
        (item) => !TaskIdSet.has(getIDValue.Task?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setTaskRecords(newOptions.slice(0, autocompleteLength));
    setTaskLoading(false);
  };
  React.useEffect(() => {
    fetchTaskRecords("");
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
          current_Grade: current_Grade ?? null,
          task_Weightage: task_Weightage ?? null,
          overall_Percentage: overall_Percentage ?? null,
          extra_Info: extra_Info ?? null,
          time_Taken: time_Taken ?? null,
          Task: Task ?? null,
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
          const taskToUnlink = await taskGradeInfoRecord.Task;
          if (taskToUnlink) {
            promises.push(
              client.graphql({
                query: updateTask.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: taskToUnlink.id,
                    taskTaskGradeInfoId: null,
                  },
                },
              })
            );
          }
          const taskToLink = modelFields.Task;
          if (taskToLink) {
            promises.push(
              client.graphql({
                query: updateTask.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: Task.id,
                    taskTaskGradeInfoId: taskGradeInfoRecord.id,
                  },
                },
              })
            );
            const taskGradeInfoToUnlink = await taskToLink.TaskGradeInfo;
            if (taskGradeInfoToUnlink) {
              promises.push(
                client.graphql({
                  query: updateTaskGradeInfo.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: taskGradeInfoToUnlink.id,
                      taskGradeInfoTaskId: null,
                    },
                  },
                })
              );
            }
          }
          const modelFieldsToSave = {
            current_Grade: modelFields.current_Grade ?? null,
            task_Weightage: modelFields.task_Weightage ?? null,
            overall_Percentage: modelFields.overall_Percentage ?? null,
            extra_Info: modelFields.extra_Info ?? null,
            time_Taken: modelFields.time_Taken ?? null,
            taskGradeInfoTaskId: modelFields?.Task?.id ?? null,
          };
          promises.push(
            client.graphql({
              query: updateTaskGradeInfo.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: taskGradeInfoRecord.id,
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
      {...getOverrideProps(overrides, "TaskGradeInfoUpdateForm")}
      {...rest}
    >
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
              current_Grade: value,
              task_Weightage,
              overall_Percentage,
              extra_Info,
              time_Taken,
              Task,
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
        label="Task weightage"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={task_Weightage}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              current_Grade,
              task_Weightage: value,
              overall_Percentage,
              extra_Info,
              time_Taken,
              Task,
            };
            const result = onChange(modelFields);
            value = result?.task_Weightage ?? value;
          }
          if (errors.task_Weightage?.hasError) {
            runValidationTasks("task_Weightage", value);
          }
          setTask_Weightage(value);
        }}
        onBlur={() => runValidationTasks("task_Weightage", task_Weightage)}
        errorMessage={errors.task_Weightage?.errorMessage}
        hasError={errors.task_Weightage?.hasError}
        {...getOverrideProps(overrides, "task_Weightage")}
      ></TextField>
      <TextField
        label="Overall percentage"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={overall_Percentage}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              current_Grade,
              task_Weightage,
              overall_Percentage: value,
              extra_Info,
              time_Taken,
              Task,
            };
            const result = onChange(modelFields);
            value = result?.overall_Percentage ?? value;
          }
          if (errors.overall_Percentage?.hasError) {
            runValidationTasks("overall_Percentage", value);
          }
          setOverall_Percentage(value);
        }}
        onBlur={() =>
          runValidationTasks("overall_Percentage", overall_Percentage)
        }
        errorMessage={errors.overall_Percentage?.errorMessage}
        hasError={errors.overall_Percentage?.hasError}
        {...getOverrideProps(overrides, "overall_Percentage")}
      ></TextField>
      <TextField
        label="Extra info"
        isRequired={false}
        isReadOnly={false}
        value={extra_Info}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              current_Grade,
              task_Weightage,
              overall_Percentage,
              extra_Info: value,
              time_Taken,
              Task,
            };
            const result = onChange(modelFields);
            value = result?.extra_Info ?? value;
          }
          if (errors.extra_Info?.hasError) {
            runValidationTasks("extra_Info", value);
          }
          setExtra_Info(value);
        }}
        onBlur={() => runValidationTasks("extra_Info", extra_Info)}
        errorMessage={errors.extra_Info?.errorMessage}
        hasError={errors.extra_Info?.hasError}
        {...getOverrideProps(overrides, "extra_Info")}
      ></TextField>
      <TextField
        label="Time taken"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={time_Taken}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              current_Grade,
              task_Weightage,
              overall_Percentage,
              extra_Info,
              time_Taken: value,
              Task,
            };
            const result = onChange(modelFields);
            value = result?.time_Taken ?? value;
          }
          if (errors.time_Taken?.hasError) {
            runValidationTasks("time_Taken", value);
          }
          setTime_Taken(value);
        }}
        onBlur={() => runValidationTasks("time_Taken", time_Taken)}
        errorMessage={errors.time_Taken?.errorMessage}
        hasError={errors.time_Taken?.hasError}
        {...getOverrideProps(overrides, "time_Taken")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              current_Grade,
              task_Weightage,
              overall_Percentage,
              extra_Info,
              time_Taken,
              Task: value,
            };
            const result = onChange(modelFields);
            value = result?.Task ?? value;
          }
          setTask(value);
          setCurrentTaskValue(undefined);
          setCurrentTaskDisplayValue("");
        }}
        currentFieldValue={currentTaskValue}
        label={"Task"}
        items={Task ? [Task] : []}
        hasError={errors?.Task?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Task", currentTaskValue)
        }
        errorMessage={errors?.Task?.errorMessage}
        getBadgeText={getDisplayValue.Task}
        setFieldValue={(model) => {
          setCurrentTaskDisplayValue(model ? getDisplayValue.Task(model) : "");
          setCurrentTaskValue(model);
        }}
        inputFieldRef={TaskRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Task"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Task"
          value={currentTaskDisplayValue}
          options={taskRecords
            .filter((r) => !TaskIdSet.has(getIDValue.Task?.(r)))
            .map((r) => ({
              id: getIDValue.Task?.(r),
              label: getDisplayValue.Task?.(r),
            }))}
          isLoading={TaskLoading}
          onSelect={({ id, label }) => {
            setCurrentTaskValue(
              taskRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTaskDisplayValue(label);
            runValidationTasks("Task", label);
          }}
          onClear={() => {
            setCurrentTaskDisplayValue("");
          }}
          defaultValue={Task}
          onChange={(e) => {
            let { value } = e.target;
            fetchTaskRecords(value);
            if (errors.Task?.hasError) {
              runValidationTasks("Task", value);
            }
            setCurrentTaskDisplayValue(value);
            setCurrentTaskValue(undefined);
          }}
          onBlur={() => runValidationTasks("Task", currentTaskDisplayValue)}
          errorMessage={errors.Task?.errorMessage}
          hasError={errors.Task?.hasError}
          ref={TaskRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Task")}
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
          isDisabled={!(idProp || taskGradeInfoModelProp)}
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
              !(idProp || taskGradeInfoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
