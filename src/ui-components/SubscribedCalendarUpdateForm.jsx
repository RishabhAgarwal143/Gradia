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
  getSubscribedCalendar,
  getUserinfo,
  listSchedules,
  listTasks,
  listUserinfos,
} from "../graphql/queries";
import {
  updateSchedule,
  updateSubscribedCalendar,
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
export default function SubscribedCalendarUpdateForm(props) {
  const {
    id: idProp,
    subscribedCalendar: subscribedCalendarModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Calendar_Name: "",
    Calendar_URL: "",
    userinfoID: undefined,
    Schedules: [],
    Tasks: [],
    LAST_MODIFIED: "",
  };
  const [Calendar_Name, setCalendar_Name] = React.useState(
    initialValues.Calendar_Name
  );
  const [Calendar_URL, setCalendar_URL] = React.useState(
    initialValues.Calendar_URL
  );
  const [userinfoID, setUserinfoID] = React.useState(initialValues.userinfoID);
  const [userinfoIDLoading, setUserinfoIDLoading] = React.useState(false);
  const [userinfoIDRecords, setUserinfoIDRecords] = React.useState([]);
  const [selectedUserinfoIDRecords, setSelectedUserinfoIDRecords] =
    React.useState([]);
  const [Schedules, setSchedules] = React.useState(initialValues.Schedules);
  const [SchedulesLoading, setSchedulesLoading] = React.useState(false);
  const [schedulesRecords, setSchedulesRecords] = React.useState([]);
  const [Tasks, setTasks] = React.useState(initialValues.Tasks);
  const [TasksLoading, setTasksLoading] = React.useState(false);
  const [tasksRecords, setTasksRecords] = React.useState([]);
  const [LAST_MODIFIED, setLAST_MODIFIED] = React.useState(
    initialValues.LAST_MODIFIED
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = subscribedCalendarRecord
      ? {
          ...initialValues,
          ...subscribedCalendarRecord,
          userinfoID,
          Schedules: linkedSchedules,
          Tasks: linkedTasks,
        }
      : initialValues;
    setCalendar_Name(cleanValues.Calendar_Name);
    setCalendar_URL(cleanValues.Calendar_URL);
    setUserinfoID(cleanValues.userinfoID);
    setCurrentUserinfoIDValue(undefined);
    setCurrentUserinfoIDDisplayValue("");
    setSchedules(cleanValues.Schedules ?? []);
    setCurrentSchedulesValue(undefined);
    setCurrentSchedulesDisplayValue("");
    setTasks(cleanValues.Tasks ?? []);
    setCurrentTasksValue(undefined);
    setCurrentTasksDisplayValue("");
    setLAST_MODIFIED(cleanValues.LAST_MODIFIED);
    setErrors({});
  };
  const [subscribedCalendarRecord, setSubscribedCalendarRecord] =
    React.useState(subscribedCalendarModelProp);
  const [linkedSchedules, setLinkedSchedules] = React.useState([]);
  const canUnlinkSchedules = true;
  const [linkedTasks, setLinkedTasks] = React.useState([]);
  const canUnlinkTasks = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSubscribedCalendar.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSubscribedCalendar
        : subscribedCalendarModelProp;
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
      const linkedSchedules = record?.Schedules?.items ?? [];
      setLinkedSchedules(linkedSchedules);
      const linkedTasks = record?.Tasks?.items ?? [];
      setLinkedTasks(linkedTasks);
      setSubscribedCalendarRecord(record);
    };
    queryData();
  }, [idProp, subscribedCalendarModelProp]);
  React.useEffect(resetStateValues, [
    subscribedCalendarRecord,
    userinfoID,
    linkedSchedules,
    linkedTasks,
  ]);
  const [currentUserinfoIDDisplayValue, setCurrentUserinfoIDDisplayValue] =
    React.useState("");
  const [currentUserinfoIDValue, setCurrentUserinfoIDValue] =
    React.useState(undefined);
  const userinfoIDRef = React.createRef();
  const [currentSchedulesDisplayValue, setCurrentSchedulesDisplayValue] =
    React.useState("");
  const [currentSchedulesValue, setCurrentSchedulesValue] =
    React.useState(undefined);
  const SchedulesRef = React.createRef();
  const [currentTasksDisplayValue, setCurrentTasksDisplayValue] =
    React.useState("");
  const [currentTasksValue, setCurrentTasksValue] = React.useState(undefined);
  const TasksRef = React.createRef();
  const getIDValue = {
    Schedules: (r) => JSON.stringify({ id: r?.id }),
    Tasks: (r) => JSON.stringify({ id: r?.id }),
  };
  const SchedulesIdSet = new Set(
    Array.isArray(Schedules)
      ? Schedules.map((r) => getIDValue.Schedules?.(r))
      : getIDValue.Schedules?.(Schedules)
  );
  const TasksIdSet = new Set(
    Array.isArray(Tasks)
      ? Tasks.map((r) => getIDValue.Tasks?.(r))
      : getIDValue.Tasks?.(Tasks)
  );
  const getDisplayValue = {
    userinfoID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Schedules: (r) => `${r?.SUMMARY ? r?.SUMMARY + " - " : ""}${r?.id}`,
    Tasks: (r) => `${r?.UID ? r?.UID + " - " : ""}${r?.id}`,
  };
  const validations = {
    Calendar_Name: [],
    Calendar_URL: [{ type: "URL" }],
    userinfoID: [{ type: "Required" }],
    Schedules: [],
    Tasks: [],
    LAST_MODIFIED: [],
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
  React.useEffect(() => {
    fetchUserinfoIDRecords("");
    fetchSchedulesRecords("");
    fetchTasksRecords("");
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
          Calendar_Name: Calendar_Name ?? null,
          Calendar_URL: Calendar_URL ?? null,
          userinfoID,
          Schedules: Schedules ?? null,
          Tasks: Tasks ?? null,
          LAST_MODIFIED: LAST_MODIFIED ?? null,
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
                `Schedule ${original.id} cannot be unlinked from SubscribedCalendar because subscribedcalendarID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateSchedule.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    subscribedcalendarID: null,
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
                    subscribedcalendarID: subscribedCalendarRecord.id,
                  },
                },
              })
            );
          });
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
                `Task ${original.id} cannot be unlinked from SubscribedCalendar because subscribedcalendarID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateTask.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    subscribedcalendarID: null,
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
                    subscribedcalendarID: subscribedCalendarRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            Calendar_Name: modelFields.Calendar_Name ?? null,
            Calendar_URL: modelFields.Calendar_URL ?? null,
            userinfoID: modelFields.userinfoID,
            LAST_MODIFIED: modelFields.LAST_MODIFIED ?? null,
          };
          promises.push(
            client.graphql({
              query: updateSubscribedCalendar.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: subscribedCalendarRecord.id,
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
      {...getOverrideProps(overrides, "SubscribedCalendarUpdateForm")}
      {...rest}
    >
      <TextField
        label="Calendar name"
        isRequired={false}
        isReadOnly={false}
        value={Calendar_Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Calendar_Name: value,
              Calendar_URL,
              userinfoID,
              Schedules,
              Tasks,
              LAST_MODIFIED,
            };
            const result = onChange(modelFields);
            value = result?.Calendar_Name ?? value;
          }
          if (errors.Calendar_Name?.hasError) {
            runValidationTasks("Calendar_Name", value);
          }
          setCalendar_Name(value);
        }}
        onBlur={() => runValidationTasks("Calendar_Name", Calendar_Name)}
        errorMessage={errors.Calendar_Name?.errorMessage}
        hasError={errors.Calendar_Name?.hasError}
        {...getOverrideProps(overrides, "Calendar_Name")}
      ></TextField>
      <TextField
        label="Calendar url"
        isRequired={false}
        isReadOnly={false}
        value={Calendar_URL}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Calendar_Name,
              Calendar_URL: value,
              userinfoID,
              Schedules,
              Tasks,
              LAST_MODIFIED,
            };
            const result = onChange(modelFields);
            value = result?.Calendar_URL ?? value;
          }
          if (errors.Calendar_URL?.hasError) {
            runValidationTasks("Calendar_URL", value);
          }
          setCalendar_URL(value);
        }}
        onBlur={() => runValidationTasks("Calendar_URL", Calendar_URL)}
        errorMessage={errors.Calendar_URL?.errorMessage}
        hasError={errors.Calendar_URL?.hasError}
        {...getOverrideProps(overrides, "Calendar_URL")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Calendar_Name,
              Calendar_URL,
              userinfoID: value,
              Schedules,
              Tasks,
              LAST_MODIFIED,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Calendar_Name,
              Calendar_URL,
              userinfoID,
              Schedules: values,
              Tasks,
              LAST_MODIFIED,
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
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Calendar_Name,
              Calendar_URL,
              userinfoID,
              Schedules,
              Tasks: values,
              LAST_MODIFIED,
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
      <TextField
        label="Last modified"
        isRequired={false}
        isReadOnly={false}
        value={LAST_MODIFIED}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Calendar_Name,
              Calendar_URL,
              userinfoID,
              Schedules,
              Tasks,
              LAST_MODIFIED: value,
            };
            const result = onChange(modelFields);
            value = result?.LAST_MODIFIED ?? value;
          }
          if (errors.LAST_MODIFIED?.hasError) {
            runValidationTasks("LAST_MODIFIED", value);
          }
          setLAST_MODIFIED(value);
        }}
        onBlur={() => runValidationTasks("LAST_MODIFIED", LAST_MODIFIED)}
        errorMessage={errors.LAST_MODIFIED?.errorMessage}
        hasError={errors.LAST_MODIFIED?.hasError}
        {...getOverrideProps(overrides, "LAST_MODIFIED")}
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
          isDisabled={!(idProp || subscribedCalendarModelProp)}
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
              !(idProp || subscribedCalendarModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
