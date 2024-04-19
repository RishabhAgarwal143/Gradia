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
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import {
  getSubjects,
  getSubscribedCalendar,
  getTask,
  getUserinfo,
  listSubjects,
  listSubscribedCalendars,
  listTaskGradeInfos,
  listUserinfos,
} from "../graphql/queries";
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
    UID: "",
    DTSTART: "",
    DUE: "",
    SUMMARY: "",
    userinfoID: undefined,
    COMPLETED: "",
    STATUS: "",
    PRIORITY: "",
    DTSTAMP: "",
    subscribedcalendarID: undefined,
    DESCRIPTION: "",
    subjectsID: undefined,
    TaskGradeInfo: undefined,
    LOCATION: "",
  };
  const [UID, setUID] = React.useState(initialValues.UID);
  const [DTSTART, setDTSTART] = React.useState(initialValues.DTSTART);
  const [DUE, setDUE] = React.useState(initialValues.DUE);
  const [SUMMARY, setSUMMARY] = React.useState(initialValues.SUMMARY);
  const [userinfoID, setUserinfoID] = React.useState(initialValues.userinfoID);
  const [userinfoIDLoading, setUserinfoIDLoading] = React.useState(false);
  const [userinfoIDRecords, setUserinfoIDRecords] = React.useState([]);
  const [selectedUserinfoIDRecords, setSelectedUserinfoIDRecords] =
    React.useState([]);
  const [COMPLETED, setCOMPLETED] = React.useState(initialValues.COMPLETED);
  const [STATUS, setSTATUS] = React.useState(initialValues.STATUS);
  const [PRIORITY, setPRIORITY] = React.useState(initialValues.PRIORITY);
  const [DTSTAMP, setDTSTAMP] = React.useState(initialValues.DTSTAMP);
  const [subscribedcalendarID, setSubscribedcalendarID] = React.useState(
    initialValues.subscribedcalendarID
  );
  const [subscribedcalendarIDLoading, setSubscribedcalendarIDLoading] =
    React.useState(false);
  const [subscribedcalendarIDRecords, setSubscribedcalendarIDRecords] =
    React.useState([]);
  const [
    selectedSubscribedcalendarIDRecords,
    setSelectedSubscribedcalendarIDRecords,
  ] = React.useState([]);
  const [DESCRIPTION, setDESCRIPTION] = React.useState(
    initialValues.DESCRIPTION
  );
  const [subjectsID, setSubjectsID] = React.useState(initialValues.subjectsID);
  const [subjectsIDLoading, setSubjectsIDLoading] = React.useState(false);
  const [subjectsIDRecords, setSubjectsIDRecords] = React.useState([]);
  const [selectedSubjectsIDRecords, setSelectedSubjectsIDRecords] =
    React.useState([]);
  const [TaskGradeInfo, setTaskGradeInfo] = React.useState(
    initialValues.TaskGradeInfo
  );
  const [TaskGradeInfoLoading, setTaskGradeInfoLoading] = React.useState(false);
  const [taskGradeInfoRecords, setTaskGradeInfoRecords] = React.useState([]);
  const [LOCATION, setLOCATION] = React.useState(initialValues.LOCATION);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = taskRecord
      ? {
          ...initialValues,
          ...taskRecord,
          userinfoID,
          subscribedcalendarID,
          subjectsID,
          TaskGradeInfo,
        }
      : initialValues;
    setUID(cleanValues.UID);
    setDTSTART(cleanValues.DTSTART);
    setDUE(cleanValues.DUE);
    setSUMMARY(cleanValues.SUMMARY);
    setUserinfoID(cleanValues.userinfoID);
    setCurrentUserinfoIDValue(undefined);
    setCurrentUserinfoIDDisplayValue("");
    setCOMPLETED(cleanValues.COMPLETED);
    setSTATUS(cleanValues.STATUS);
    setPRIORITY(cleanValues.PRIORITY);
    setDTSTAMP(cleanValues.DTSTAMP);
    setSubscribedcalendarID(cleanValues.subscribedcalendarID);
    setCurrentSubscribedcalendarIDValue(undefined);
    setCurrentSubscribedcalendarIDDisplayValue("");
    setDESCRIPTION(cleanValues.DESCRIPTION);
    setSubjectsID(cleanValues.subjectsID);
    setCurrentSubjectsIDValue(undefined);
    setCurrentSubjectsIDDisplayValue("");
    setTaskGradeInfo(cleanValues.TaskGradeInfo);
    setCurrentTaskGradeInfoValue(undefined);
    setCurrentTaskGradeInfoDisplayValue("");
    setLOCATION(cleanValues.LOCATION);
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
      const subscribedcalendarIDRecord = record
        ? record.subscribedcalendarID
        : undefined;
      const subscribedCalendarRecord = subscribedcalendarIDRecord
        ? (
            await client.graphql({
              query: getSubscribedCalendar.replaceAll("__typename", ""),
              variables: { id: subscribedcalendarIDRecord },
            })
          )?.data?.getSubscribedCalendar
        : undefined;
      setSubscribedcalendarID(subscribedcalendarIDRecord);
      setSelectedSubscribedcalendarIDRecords([subscribedCalendarRecord]);
      const subjectsIDRecord = record ? record.subjectsID : undefined;
      const subjectsRecord = subjectsIDRecord
        ? (
            await client.graphql({
              query: getSubjects.replaceAll("__typename", ""),
              variables: { id: subjectsIDRecord },
            })
          )?.data?.getSubjects
        : undefined;
      setSubjectsID(subjectsIDRecord);
      setSelectedSubjectsIDRecords([subjectsRecord]);
      const TaskGradeInfoRecord = record
        ? await record.TaskGradeInfo
        : undefined;
      setTaskGradeInfo(TaskGradeInfoRecord);
      setTaskRecord(record);
    };
    queryData();
  }, [idProp, taskModelProp]);
  React.useEffect(resetStateValues, [
    taskRecord,
    userinfoID,
    subscribedcalendarID,
    subjectsID,
    TaskGradeInfo,
  ]);
  const [currentUserinfoIDDisplayValue, setCurrentUserinfoIDDisplayValue] =
    React.useState("");
  const [currentUserinfoIDValue, setCurrentUserinfoIDValue] =
    React.useState(undefined);
  const userinfoIDRef = React.createRef();
  const [
    currentSubscribedcalendarIDDisplayValue,
    setCurrentSubscribedcalendarIDDisplayValue,
  ] = React.useState("");
  const [
    currentSubscribedcalendarIDValue,
    setCurrentSubscribedcalendarIDValue,
  ] = React.useState(undefined);
  const subscribedcalendarIDRef = React.createRef();
  const [currentSubjectsIDDisplayValue, setCurrentSubjectsIDDisplayValue] =
    React.useState("");
  const [currentSubjectsIDValue, setCurrentSubjectsIDValue] =
    React.useState(undefined);
  const subjectsIDRef = React.createRef();
  const [
    currentTaskGradeInfoDisplayValue,
    setCurrentTaskGradeInfoDisplayValue,
  ] = React.useState("");
  const [currentTaskGradeInfoValue, setCurrentTaskGradeInfoValue] =
    React.useState(undefined);
  const TaskGradeInfoRef = React.createRef();
  const getIDValue = {
    TaskGradeInfo: (r) => JSON.stringify({ id: r?.id }),
  };
  const TaskGradeInfoIdSet = new Set(
    Array.isArray(TaskGradeInfo)
      ? TaskGradeInfo.map((r) => getIDValue.TaskGradeInfo?.(r))
      : getIDValue.TaskGradeInfo?.(TaskGradeInfo)
  );
  const getDisplayValue = {
    userinfoID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    subscribedcalendarID: (r) =>
      `${r?.Calendar_Name ? r?.Calendar_Name + " - " : ""}${r?.id}`,
    subjectsID: (r) =>
      `${r?.subject_Name ? r?.subject_Name + " - " : ""}${r?.id}`,
    TaskGradeInfo: (r) =>
      `${r?.current_Grade ? r?.current_Grade + " - " : ""}${r?.id}`,
  };
  const validations = {
    UID: [],
    DTSTART: [],
    DUE: [{ type: "Required" }],
    SUMMARY: [],
    userinfoID: [{ type: "Required" }],
    COMPLETED: [],
    STATUS: [],
    PRIORITY: [],
    DTSTAMP: [],
    subscribedcalendarID: [],
    DESCRIPTION: [],
    subjectsID: [],
    TaskGradeInfo: [],
    LOCATION: [],
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
  const fetchSubscribedcalendarIDRecords = async (value) => {
    setSubscribedcalendarIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { Calendar_Name: { contains: value } },
            { id: { contains: value } },
          ],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listSubscribedCalendars.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listSubscribedCalendars?.items;
      var loaded = result.filter((item) => subscribedcalendarID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setSubscribedcalendarIDRecords(newOptions.slice(0, autocompleteLength));
    setSubscribedcalendarIDLoading(false);
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
  const fetchTaskGradeInfoRecords = async (value) => {
    setTaskGradeInfoLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { current_Grade: { contains: value } },
            { id: { contains: value } },
          ],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listTaskGradeInfos.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTaskGradeInfos?.items;
      var loaded = result.filter(
        (item) => !TaskGradeInfoIdSet.has(getIDValue.TaskGradeInfo?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setTaskGradeInfoRecords(newOptions.slice(0, autocompleteLength));
    setTaskGradeInfoLoading(false);
  };
  React.useEffect(() => {
    fetchUserinfoIDRecords("");
    fetchSubscribedcalendarIDRecords("");
    fetchSubjectsIDRecords("");
    fetchTaskGradeInfoRecords("");
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
          UID: UID ?? null,
          DTSTART: DTSTART ?? null,
          DUE,
          SUMMARY: SUMMARY ?? null,
          userinfoID,
          COMPLETED: COMPLETED ?? null,
          STATUS: STATUS ?? null,
          PRIORITY: PRIORITY ?? null,
          DTSTAMP: DTSTAMP ?? null,
          subscribedcalendarID: subscribedcalendarID ?? null,
          DESCRIPTION: DESCRIPTION ?? null,
          subjectsID: subjectsID ?? null,
          TaskGradeInfo: TaskGradeInfo ?? null,
          LOCATION: LOCATION ?? null,
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
          const taskGradeInfoToUnlink = await taskRecord.TaskGradeInfo;
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
          const taskGradeInfoToLink = modelFields.TaskGradeInfo;
          if (taskGradeInfoToLink) {
            promises.push(
              client.graphql({
                query: updateTaskGradeInfo.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: TaskGradeInfo.id,
                    taskGradeInfoTaskId: taskRecord.id,
                  },
                },
              })
            );
            const taskToUnlink = await taskGradeInfoToLink.Task;
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
          }
          const modelFieldsToSave = {
            UID: modelFields.UID ?? null,
            DTSTART: modelFields.DTSTART ?? null,
            DUE: modelFields.DUE,
            SUMMARY: modelFields.SUMMARY ?? null,
            userinfoID: modelFields.userinfoID,
            COMPLETED: modelFields.COMPLETED ?? null,
            STATUS: modelFields.STATUS ?? null,
            PRIORITY: modelFields.PRIORITY ?? null,
            DTSTAMP: modelFields.DTSTAMP ?? null,
            subscribedcalendarID: modelFields.subscribedcalendarID ?? null,
            DESCRIPTION: modelFields.DESCRIPTION ?? null,
            subjectsID: modelFields.subjectsID ?? null,
            taskTaskGradeInfoId: modelFields?.TaskGradeInfo?.id ?? null,
            LOCATION: modelFields.LOCATION ?? null,
          };
          promises.push(
            client.graphql({
              query: updateTask.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: taskRecord.id,
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
      {...getOverrideProps(overrides, "TaskUpdateForm")}
      {...rest}
    >
      <TextField
        label="Uid"
        isRequired={false}
        isReadOnly={false}
        value={UID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UID: value,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
              UID,
              DTSTART: value,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
              UID,
              DTSTART,
              DUE: value,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
              UID,
              DTSTART,
              DUE,
              SUMMARY: value,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID: value,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
      <TextField
        label="Completed"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={COMPLETED && convertToLocal(new Date(COMPLETED))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED: value,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={STATUS}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS: value,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
      >
        <option
          children="Needs action"
          value="NEEDS_ACTION"
          {...getOverrideProps(overrides, "STATUSoption0")}
        ></option>
        <option
          children="Completed"
          value="COMPLETED"
          {...getOverrideProps(overrides, "STATUSoption1")}
        ></option>
        <option
          children="In process"
          value="IN_PROCESS"
          {...getOverrideProps(overrides, "STATUSoption2")}
        ></option>
        <option
          children="Cancelled"
          value="CANCELLED"
          {...getOverrideProps(overrides, "STATUSoption3")}
        ></option>
      </SelectField>
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
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY: value,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP: value,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID: value,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
            };
            const result = onChange(modelFields);
            value = result?.subscribedcalendarID ?? value;
          }
          setSubscribedcalendarID(value);
          setCurrentSubscribedcalendarIDValue(undefined);
        }}
        currentFieldValue={currentSubscribedcalendarIDValue}
        label={"Subscribedcalendar id"}
        items={subscribedcalendarID ? [subscribedcalendarID] : []}
        hasError={errors?.subscribedcalendarID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "subscribedcalendarID",
            currentSubscribedcalendarIDValue
          )
        }
        errorMessage={errors?.subscribedcalendarID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.subscribedcalendarID(
                subscribedcalendarIDRecords.find((r) => r.id === value) ??
                  selectedSubscribedcalendarIDRecords.find(
                    (r) => r.id === value
                  )
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentSubscribedcalendarIDDisplayValue(
            value
              ? getDisplayValue.subscribedcalendarID(
                  subscribedcalendarIDRecords.find((r) => r.id === value) ??
                    selectedSubscribedcalendarIDRecords.find(
                      (r) => r.id === value
                    )
                )
              : ""
          );
          setCurrentSubscribedcalendarIDValue(value);
          const selectedRecord = subscribedcalendarIDRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedSubscribedcalendarIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={subscribedcalendarIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Subscribedcalendar id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search SubscribedCalendar"
          value={currentSubscribedcalendarIDDisplayValue}
          options={subscribedcalendarIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.subscribedcalendarID?.(r),
            }))}
          isLoading={subscribedcalendarIDLoading}
          onSelect={({ id, label }) => {
            setCurrentSubscribedcalendarIDValue(id);
            setCurrentSubscribedcalendarIDDisplayValue(label);
            runValidationTasks("subscribedcalendarID", label);
          }}
          onClear={() => {
            setCurrentSubscribedcalendarIDDisplayValue("");
          }}
          defaultValue={subscribedcalendarID}
          onChange={(e) => {
            let { value } = e.target;
            fetchSubscribedcalendarIDRecords(value);
            if (errors.subscribedcalendarID?.hasError) {
              runValidationTasks("subscribedcalendarID", value);
            }
            setCurrentSubscribedcalendarIDDisplayValue(value);
            setCurrentSubscribedcalendarIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "subscribedcalendarID",
              currentSubscribedcalendarIDValue
            )
          }
          errorMessage={errors.subscribedcalendarID?.errorMessage}
          hasError={errors.subscribedcalendarID?.hasError}
          ref={subscribedcalendarIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "subscribedcalendarID")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={DESCRIPTION}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION: value,
              subjectsID,
              TaskGradeInfo,
              LOCATION,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID: value,
              TaskGradeInfo,
              LOCATION,
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
          isRequired={false}
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
          defaultValue={subjectsID}
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo: value,
              LOCATION,
            };
            const result = onChange(modelFields);
            value = result?.TaskGradeInfo ?? value;
          }
          setTaskGradeInfo(value);
          setCurrentTaskGradeInfoValue(undefined);
          setCurrentTaskGradeInfoDisplayValue("");
        }}
        currentFieldValue={currentTaskGradeInfoValue}
        label={"Task grade info"}
        items={TaskGradeInfo ? [TaskGradeInfo] : []}
        hasError={errors?.TaskGradeInfo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("TaskGradeInfo", currentTaskGradeInfoValue)
        }
        errorMessage={errors?.TaskGradeInfo?.errorMessage}
        getBadgeText={getDisplayValue.TaskGradeInfo}
        setFieldValue={(model) => {
          setCurrentTaskGradeInfoDisplayValue(
            model ? getDisplayValue.TaskGradeInfo(model) : ""
          );
          setCurrentTaskGradeInfoValue(model);
        }}
        inputFieldRef={TaskGradeInfoRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Task grade info"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TaskGradeInfo"
          value={currentTaskGradeInfoDisplayValue}
          options={taskGradeInfoRecords
            .filter(
              (r) => !TaskGradeInfoIdSet.has(getIDValue.TaskGradeInfo?.(r))
            )
            .map((r) => ({
              id: getIDValue.TaskGradeInfo?.(r),
              label: getDisplayValue.TaskGradeInfo?.(r),
            }))}
          isLoading={TaskGradeInfoLoading}
          onSelect={({ id, label }) => {
            setCurrentTaskGradeInfoValue(
              taskGradeInfoRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTaskGradeInfoDisplayValue(label);
            runValidationTasks("TaskGradeInfo", label);
          }}
          onClear={() => {
            setCurrentTaskGradeInfoDisplayValue("");
          }}
          defaultValue={TaskGradeInfo}
          onChange={(e) => {
            let { value } = e.target;
            fetchTaskGradeInfoRecords(value);
            if (errors.TaskGradeInfo?.hasError) {
              runValidationTasks("TaskGradeInfo", value);
            }
            setCurrentTaskGradeInfoDisplayValue(value);
            setCurrentTaskGradeInfoValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "TaskGradeInfo",
              currentTaskGradeInfoDisplayValue
            )
          }
          errorMessage={errors.TaskGradeInfo?.errorMessage}
          hasError={errors.TaskGradeInfo?.hasError}
          ref={TaskGradeInfoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "TaskGradeInfo")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={LOCATION}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UID,
              DTSTART,
              DUE,
              SUMMARY,
              userinfoID,
              COMPLETED,
              STATUS,
              PRIORITY,
              DTSTAMP,
              subscribedcalendarID,
              DESCRIPTION,
              subjectsID,
              TaskGradeInfo,
              LOCATION: value,
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
