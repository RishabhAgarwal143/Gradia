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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getScheduleGradeInfo, listSchedules } from "../graphql/queries";
import { updateSchedule, updateScheduleGradeInfo } from "../graphql/mutations";
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
export default function ScheduleGradeInfoUpdateForm(props) {
  const {
    id: idProp,
    scheduleGradeInfo: scheduleGradeInfoModelProp,
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
    attended: false,
    Schedule: undefined,
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
  const [attended, setAttended] = React.useState(initialValues.attended);
  const [Schedule, setSchedule] = React.useState(initialValues.Schedule);
  const [ScheduleLoading, setScheduleLoading] = React.useState(false);
  const [scheduleRecords, setScheduleRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = scheduleGradeInfoRecord
      ? { ...initialValues, ...scheduleGradeInfoRecord, Schedule }
      : initialValues;
    setCurrent_Grade(cleanValues.current_Grade);
    setTask_Weightage(cleanValues.task_Weightage);
    setOverall_Percentage(cleanValues.overall_Percentage);
    setExtra_Info(cleanValues.extra_Info);
    setAttended(cleanValues.attended);
    setSchedule(cleanValues.Schedule);
    setCurrentScheduleValue(undefined);
    setCurrentScheduleDisplayValue("");
    setErrors({});
  };
  const [scheduleGradeInfoRecord, setScheduleGradeInfoRecord] = React.useState(
    scheduleGradeInfoModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getScheduleGradeInfo.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getScheduleGradeInfo
        : scheduleGradeInfoModelProp;
      const ScheduleRecord = record ? await record.Schedule : undefined;
      setSchedule(ScheduleRecord);
      setScheduleGradeInfoRecord(record);
    };
    queryData();
  }, [idProp, scheduleGradeInfoModelProp]);
  React.useEffect(resetStateValues, [scheduleGradeInfoRecord, Schedule]);
  const [currentScheduleDisplayValue, setCurrentScheduleDisplayValue] =
    React.useState("");
  const [currentScheduleValue, setCurrentScheduleValue] =
    React.useState(undefined);
  const ScheduleRef = React.createRef();
  const getIDValue = {
    Schedule: (r) => JSON.stringify({ id: r?.id }),
  };
  const ScheduleIdSet = new Set(
    Array.isArray(Schedule)
      ? Schedule.map((r) => getIDValue.Schedule?.(r))
      : getIDValue.Schedule?.(Schedule)
  );
  const getDisplayValue = {
    Schedule: (r) => `${r?.SUMMARY ? r?.SUMMARY + " - " : ""}${r?.id}`,
  };
  const validations = {
    current_Grade: [],
    task_Weightage: [],
    overall_Percentage: [],
    extra_Info: [],
    attended: [],
    Schedule: [],
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
  const fetchScheduleRecords = async (value) => {
    setScheduleLoading(true);
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
        (item) => !ScheduleIdSet.has(getIDValue.Schedule?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setScheduleRecords(newOptions.slice(0, autocompleteLength));
    setScheduleLoading(false);
  };
  React.useEffect(() => {
    fetchScheduleRecords("");
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
          attended: attended ?? null,
          Schedule: Schedule ?? null,
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
          const scheduleToUnlink = await scheduleGradeInfoRecord.Schedule;
          if (scheduleToUnlink) {
            promises.push(
              client.graphql({
                query: updateSchedule.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: scheduleToUnlink.id,
                    scheduleScheduleGradeInfoId: null,
                  },
                },
              })
            );
          }
          const scheduleToLink = modelFields.Schedule;
          if (scheduleToLink) {
            promises.push(
              client.graphql({
                query: updateSchedule.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: Schedule.id,
                    scheduleScheduleGradeInfoId: scheduleGradeInfoRecord.id,
                  },
                },
              })
            );
            const scheduleGradeInfoToUnlink =
              await scheduleToLink.ScheduleGradeInfo;
            if (scheduleGradeInfoToUnlink) {
              promises.push(
                client.graphql({
                  query: updateScheduleGradeInfo.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: scheduleGradeInfoToUnlink.id,
                      scheduleGradeInfoScheduleId: null,
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
            attended: modelFields.attended ?? null,
            scheduleGradeInfoScheduleId: modelFields?.Schedule?.id ?? null,
          };
          promises.push(
            client.graphql({
              query: updateScheduleGradeInfo.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: scheduleGradeInfoRecord.id,
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
      {...getOverrideProps(overrides, "ScheduleGradeInfoUpdateForm")}
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
              attended,
              Schedule,
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
              attended,
              Schedule,
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
              attended,
              Schedule,
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
              attended,
              Schedule,
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
      <SwitchField
        label="Attended"
        defaultChecked={false}
        isDisabled={false}
        isChecked={attended}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              current_Grade,
              task_Weightage,
              overall_Percentage,
              extra_Info,
              attended: value,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.attended ?? value;
          }
          if (errors.attended?.hasError) {
            runValidationTasks("attended", value);
          }
          setAttended(value);
        }}
        onBlur={() => runValidationTasks("attended", attended)}
        errorMessage={errors.attended?.errorMessage}
        hasError={errors.attended?.hasError}
        {...getOverrideProps(overrides, "attended")}
      ></SwitchField>
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
              attended,
              Schedule: value,
            };
            const result = onChange(modelFields);
            value = result?.Schedule ?? value;
          }
          setSchedule(value);
          setCurrentScheduleValue(undefined);
          setCurrentScheduleDisplayValue("");
        }}
        currentFieldValue={currentScheduleValue}
        label={"Schedule"}
        items={Schedule ? [Schedule] : []}
        hasError={errors?.Schedule?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Schedule", currentScheduleValue)
        }
        errorMessage={errors?.Schedule?.errorMessage}
        getBadgeText={getDisplayValue.Schedule}
        setFieldValue={(model) => {
          setCurrentScheduleDisplayValue(
            model ? getDisplayValue.Schedule(model) : ""
          );
          setCurrentScheduleValue(model);
        }}
        inputFieldRef={ScheduleRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Schedule"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Schedule"
          value={currentScheduleDisplayValue}
          options={scheduleRecords
            .filter((r) => !ScheduleIdSet.has(getIDValue.Schedule?.(r)))
            .map((r) => ({
              id: getIDValue.Schedule?.(r),
              label: getDisplayValue.Schedule?.(r),
            }))}
          isLoading={ScheduleLoading}
          onSelect={({ id, label }) => {
            setCurrentScheduleValue(
              scheduleRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentScheduleDisplayValue(label);
            runValidationTasks("Schedule", label);
          }}
          onClear={() => {
            setCurrentScheduleDisplayValue("");
          }}
          defaultValue={Schedule}
          onChange={(e) => {
            let { value } = e.target;
            fetchScheduleRecords(value);
            if (errors.Schedule?.hasError) {
              runValidationTasks("Schedule", value);
            }
            setCurrentScheduleDisplayValue(value);
            setCurrentScheduleValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Schedule", currentScheduleDisplayValue)
          }
          errorMessage={errors.Schedule?.errorMessage}
          hasError={errors.Schedule?.hasError}
          ref={ScheduleRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Schedule")}
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
          isDisabled={!(idProp || scheduleGradeInfoModelProp)}
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
              !(idProp || scheduleGradeInfoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
