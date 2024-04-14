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
  getUserinfo,
  listSubjects,
  listSubscribedCalendars,
  listUserWorkTims,
} from "../graphql/queries";
import {
  updateSubjects,
  updateSubscribedCalendar,
  updateUserinfo,
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
export default function UserinfoUpdateForm(props) {
  const {
    id: idProp,
    userinfo: userinfoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    email: "",
    Timezone: "",
    Schedules: [],
    Tasks: [],
    SubscribedCalendars: [],
    Subjects: [],
    UserWorkTim: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [email, setEmail] = React.useState(initialValues.email);
  const [Timezone, setTimezone] = React.useState(initialValues.Timezone);
  const [Schedules, setSchedules] = React.useState(initialValues.Schedules);
  const [SchedulesLoading, setSchedulesLoading] = React.useState(false);
  const [schedulesRecords, setSchedulesRecords] = React.useState([]);
  const [Tasks, setTasks] = React.useState(initialValues.Tasks);
  const [TasksLoading, setTasksLoading] = React.useState(false);
  const [tasksRecords, setTasksRecords] = React.useState([]);
  const [SubscribedCalendars, setSubscribedCalendars] = React.useState(
    initialValues.SubscribedCalendars
  );
  const [SubscribedCalendarsLoading, setSubscribedCalendarsLoading] =
    React.useState(false);
  const [subscribedCalendarsRecords, setSubscribedCalendarsRecords] =
    React.useState([]);
  const [Subjects, setSubjects] = React.useState(initialValues.Subjects);
  const [SubjectsLoading, setSubjectsLoading] = React.useState(false);
  const [subjectsRecords, setSubjectsRecords] = React.useState([]);
  const [UserWorkTim, setUserWorkTim] = React.useState(
    initialValues.UserWorkTim
  );
  const [UserWorkTimLoading, setUserWorkTimLoading] = React.useState(false);
  const [userWorkTimRecords, setUserWorkTimRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userinfoRecord
      ? {
          ...initialValues,
          ...userinfoRecord,
          Schedules: linkedSchedules,
          Tasks: linkedTasks,
          SubscribedCalendars: linkedSubscribedCalendars,
          Subjects: linkedSubjects,
          UserWorkTim,
        }
      : initialValues;
    setName(cleanValues.name);
    setEmail(cleanValues.email);
    setTimezone(cleanValues.Timezone);
    setSchedules(cleanValues.Schedules ?? []);
    setCurrentSchedulesValue(undefined);
    setCurrentSchedulesDisplayValue("");
    setTasks(cleanValues.Tasks ?? []);
    setCurrentTasksValue(undefined);
    setCurrentTasksDisplayValue("");
    setSubscribedCalendars(cleanValues.SubscribedCalendars ?? []);
    setCurrentSubscribedCalendarsValue(undefined);
    setCurrentSubscribedCalendarsDisplayValue("");
    setSubjects(cleanValues.Subjects ?? []);
    setCurrentSubjectsValue(undefined);
    setCurrentSubjectsDisplayValue("");
    setUserWorkTim(cleanValues.UserWorkTim);
    setCurrentUserWorkTimValue(undefined);
    setCurrentUserWorkTimDisplayValue("");
    setErrors({});
  };
  const [userinfoRecord, setUserinfoRecord] = React.useState(userinfoModelProp);
  const [linkedSchedules, setLinkedSchedules] = React.useState([]);
  const canUnlinkSchedules = false;
  const [linkedTasks, setLinkedTasks] = React.useState([]);
  const canUnlinkTasks = false;
  const [linkedSubscribedCalendars, setLinkedSubscribedCalendars] =
    React.useState([]);
  const canUnlinkSubscribedCalendars = false;
  const [linkedSubjects, setLinkedSubjects] = React.useState([]);
  const canUnlinkSubjects = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUserinfo.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUserinfo
        : userinfoModelProp;
      const linkedSchedules = record?.Schedules?.items ?? [];
      setLinkedSchedules(linkedSchedules);
      const linkedTasks = record?.Tasks?.items ?? [];
      setLinkedTasks(linkedTasks);
      const linkedSubscribedCalendars =
        record?.SubscribedCalendars?.items ?? [];
      setLinkedSubscribedCalendars(linkedSubscribedCalendars);
      const linkedSubjects = record?.Subjects?.items ?? [];
      setLinkedSubjects(linkedSubjects);
      const UserWorkTimRecord = record ? await record.UserWorkTim : undefined;
      setUserWorkTim(UserWorkTimRecord);
      setUserinfoRecord(record);
    };
    queryData();
  }, [idProp, userinfoModelProp]);
  React.useEffect(resetStateValues, [
    userinfoRecord,
    linkedSchedules,
    linkedTasks,
    linkedSubscribedCalendars,
    linkedSubjects,
    UserWorkTim,
  ]);
  const [currentSchedulesDisplayValue, setCurrentSchedulesDisplayValue] =
    React.useState("");
  const [currentSchedulesValue, setCurrentSchedulesValue] =
    React.useState(undefined);
  const SchedulesRef = React.createRef();
  const [currentTasksDisplayValue, setCurrentTasksDisplayValue] =
    React.useState("");
  const [currentTasksValue, setCurrentTasksValue] = React.useState(undefined);
  const TasksRef = React.createRef();
  const [
    currentSubscribedCalendarsDisplayValue,
    setCurrentSubscribedCalendarsDisplayValue,
  ] = React.useState("");
  const [currentSubscribedCalendarsValue, setCurrentSubscribedCalendarsValue] =
    React.useState(undefined);
  const SubscribedCalendarsRef = React.createRef();
  const [currentSubjectsDisplayValue, setCurrentSubjectsDisplayValue] =
    React.useState("");
  const [currentSubjectsValue, setCurrentSubjectsValue] =
    React.useState(undefined);
  const SubjectsRef = React.createRef();
  const [currentUserWorkTimDisplayValue, setCurrentUserWorkTimDisplayValue] =
    React.useState("");
  const [currentUserWorkTimValue, setCurrentUserWorkTimValue] =
    React.useState(undefined);
  const UserWorkTimRef = React.createRef();
  const getIDValue = {
    Schedules: (r) => JSON.stringify({ id: r?.id }),
    Tasks: (r) => JSON.stringify({ id: r?.id }),
    SubscribedCalendars: (r) => JSON.stringify({ id: r?.id }),
    Subjects: (r) => JSON.stringify({ id: r?.id }),
    UserWorkTim: (r) => JSON.stringify({ id: r?.id }),
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
  const SubscribedCalendarsIdSet = new Set(
    Array.isArray(SubscribedCalendars)
      ? SubscribedCalendars.map((r) => getIDValue.SubscribedCalendars?.(r))
      : getIDValue.SubscribedCalendars?.(SubscribedCalendars)
  );
  const SubjectsIdSet = new Set(
    Array.isArray(Subjects)
      ? Subjects.map((r) => getIDValue.Subjects?.(r))
      : getIDValue.Subjects?.(Subjects)
  );
  const UserWorkTimIdSet = new Set(
    Array.isArray(UserWorkTim)
      ? UserWorkTim.map((r) => getIDValue.UserWorkTim?.(r))
      : getIDValue.UserWorkTim?.(UserWorkTim)
  );
  const getDisplayValue = {
    Schedules: (r) =>
      `${r?.Calendar_Name ? r?.Calendar_Name + " - " : ""}${r?.id}`,
    Tasks: (r) => `${r?.Calendar_Name ? r?.Calendar_Name + " - " : ""}${r?.id}`,
    SubscribedCalendars: (r) =>
      `${r?.Calendar_Name ? r?.Calendar_Name + " - " : ""}${r?.id}`,
    Subjects: (r) =>
      `${r?.subject_Name ? r?.subject_Name + " - " : ""}${r?.id}`,
    UserWorkTim: (r) => r?.id,
  };
  const validations = {
    name: [{ type: "Required" }],
    email: [{ type: "Required" }, { type: "Email" }],
    Timezone: [],
    Schedules: [],
    Tasks: [],
    SubscribedCalendars: [],
    Subjects: [],
    UserWorkTim: [],
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
  const fetchSchedulesRecords = async (value) => {
    setSchedulesLoading(true);
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
      var loaded = result.filter(
        (item) => !TasksIdSet.has(getIDValue.Tasks?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setTasksRecords(newOptions.slice(0, autocompleteLength));
    setTasksLoading(false);
  };
  const fetchSubscribedCalendarsRecords = async (value) => {
    setSubscribedCalendarsLoading(true);
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
      var loaded = result.filter(
        (item) =>
          !SubscribedCalendarsIdSet.has(getIDValue.SubscribedCalendars?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setSubscribedCalendarsRecords(newOptions.slice(0, autocompleteLength));
    setSubscribedCalendarsLoading(false);
  };
  const fetchSubjectsRecords = async (value) => {
    setSubjectsLoading(true);
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
      var loaded = result.filter(
        (item) => !SubjectsIdSet.has(getIDValue.Subjects?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setSubjectsRecords(newOptions.slice(0, autocompleteLength));
    setSubjectsLoading(false);
  };
  const fetchUserWorkTimRecords = async (value) => {
    setUserWorkTimLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: { or: [{ id: { contains: value } }] },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listUserWorkTims.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listUserWorkTims?.items;
      var loaded = result.filter(
        (item) => !UserWorkTimIdSet.has(getIDValue.UserWorkTim?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setUserWorkTimRecords(newOptions.slice(0, autocompleteLength));
    setUserWorkTimLoading(false);
  };
  React.useEffect(() => {
    fetchSchedulesRecords("");
    fetchTasksRecords("");
    fetchSubscribedCalendarsRecords("");
    fetchSubjectsRecords("");
    fetchUserWorkTimRecords("");
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
          name,
          email,
          Timezone: Timezone ?? null,
          Schedules: Schedules ?? null,
          Tasks: Tasks ?? null,
          SubscribedCalendars: SubscribedCalendars ?? null,
          Subjects: Subjects ?? null,
          UserWorkTim: UserWorkTim ?? null,
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
                `SubscribedCalendar ${original.id} cannot be unlinked from Userinfo because userinfoID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateSubscribedCalendar.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userinfoID: null,
                  },
                },
              })
            );
          });
          schedulesToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateSubscribedCalendar.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userinfoID: userinfoRecord.id,
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
                `SubscribedCalendar ${original.id} cannot be unlinked from Userinfo because userinfoID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateSubscribedCalendar.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userinfoID: null,
                  },
                },
              })
            );
          });
          tasksToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateSubscribedCalendar.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userinfoID: userinfoRecord.id,
                  },
                },
              })
            );
          });
          const subscribedCalendarsToLink = [];
          const subscribedCalendarsToUnLink = [];
          const subscribedCalendarsSet = new Set();
          const linkedSubscribedCalendarsSet = new Set();
          SubscribedCalendars.forEach((r) =>
            subscribedCalendarsSet.add(getIDValue.SubscribedCalendars?.(r))
          );
          linkedSubscribedCalendars.forEach((r) =>
            linkedSubscribedCalendarsSet.add(
              getIDValue.SubscribedCalendars?.(r)
            )
          );
          linkedSubscribedCalendars.forEach((r) => {
            if (
              !subscribedCalendarsSet.has(getIDValue.SubscribedCalendars?.(r))
            ) {
              subscribedCalendarsToUnLink.push(r);
            }
          });
          SubscribedCalendars.forEach((r) => {
            if (
              !linkedSubscribedCalendarsSet.has(
                getIDValue.SubscribedCalendars?.(r)
              )
            ) {
              subscribedCalendarsToLink.push(r);
            }
          });
          subscribedCalendarsToUnLink.forEach((original) => {
            if (!canUnlinkSubscribedCalendars) {
              throw Error(
                `SubscribedCalendar ${original.id} cannot be unlinked from Userinfo because userinfoID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateSubscribedCalendar.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userinfoID: null,
                  },
                },
              })
            );
          });
          subscribedCalendarsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateSubscribedCalendar.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userinfoID: userinfoRecord.id,
                  },
                },
              })
            );
          });
          const subjectsToLink = [];
          const subjectsToUnLink = [];
          const subjectsSet = new Set();
          const linkedSubjectsSet = new Set();
          Subjects.forEach((r) => subjectsSet.add(getIDValue.Subjects?.(r)));
          linkedSubjects.forEach((r) =>
            linkedSubjectsSet.add(getIDValue.Subjects?.(r))
          );
          linkedSubjects.forEach((r) => {
            if (!subjectsSet.has(getIDValue.Subjects?.(r))) {
              subjectsToUnLink.push(r);
            }
          });
          Subjects.forEach((r) => {
            if (!linkedSubjectsSet.has(getIDValue.Subjects?.(r))) {
              subjectsToLink.push(r);
            }
          });
          subjectsToUnLink.forEach((original) => {
            if (!canUnlinkSubjects) {
              throw Error(
                `Subjects ${original.id} cannot be unlinked from Userinfo because userinfoID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateSubjects.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userinfoID: null,
                  },
                },
              })
            );
          });
          subjectsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateSubjects.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userinfoID: userinfoRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            email: modelFields.email,
            Timezone: modelFields.Timezone ?? null,
            userinfoUserWorkTimId: modelFields?.UserWorkTim?.id ?? null,
          };
          promises.push(
            client.graphql({
              query: updateUserinfo.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: userinfoRecord.id,
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
      {...getOverrideProps(overrides, "UserinfoUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              email,
              Timezone,
              Schedules,
              Tasks,
              SubscribedCalendars,
              Subjects,
              UserWorkTim,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email: value,
              Timezone,
              Schedules,
              Tasks,
              SubscribedCalendars,
              Subjects,
              UserWorkTim,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Timezone"
        isRequired={false}
        isReadOnly={false}
        value={Timezone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              Timezone: value,
              Schedules,
              Tasks,
              SubscribedCalendars,
              Subjects,
              UserWorkTim,
            };
            const result = onChange(modelFields);
            value = result?.Timezone ?? value;
          }
          if (errors.Timezone?.hasError) {
            runValidationTasks("Timezone", value);
          }
          setTimezone(value);
        }}
        onBlur={() => runValidationTasks("Timezone", Timezone)}
        errorMessage={errors.Timezone?.errorMessage}
        hasError={errors.Timezone?.hasError}
        {...getOverrideProps(overrides, "Timezone")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              email,
              Timezone,
              Schedules: values,
              Tasks,
              SubscribedCalendars,
              Subjects,
              UserWorkTim,
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
          placeholder="Search SubscribedCalendar"
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
              name,
              email,
              Timezone,
              Schedules,
              Tasks: values,
              SubscribedCalendars,
              Subjects,
              UserWorkTim,
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
          placeholder="Search SubscribedCalendar"
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
              name,
              email,
              Timezone,
              Schedules,
              Tasks,
              SubscribedCalendars: values,
              Subjects,
              UserWorkTim,
            };
            const result = onChange(modelFields);
            values = result?.SubscribedCalendars ?? values;
          }
          setSubscribedCalendars(values);
          setCurrentSubscribedCalendarsValue(undefined);
          setCurrentSubscribedCalendarsDisplayValue("");
        }}
        currentFieldValue={currentSubscribedCalendarsValue}
        label={"Subscribed calendars"}
        items={SubscribedCalendars}
        hasError={errors?.SubscribedCalendars?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "SubscribedCalendars",
            currentSubscribedCalendarsValue
          )
        }
        errorMessage={errors?.SubscribedCalendars?.errorMessage}
        getBadgeText={getDisplayValue.SubscribedCalendars}
        setFieldValue={(model) => {
          setCurrentSubscribedCalendarsDisplayValue(
            model ? getDisplayValue.SubscribedCalendars(model) : ""
          );
          setCurrentSubscribedCalendarsValue(model);
        }}
        inputFieldRef={SubscribedCalendarsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Subscribed calendars"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search SubscribedCalendar"
          value={currentSubscribedCalendarsDisplayValue}
          options={subscribedCalendarsRecords
            .filter(
              (r) =>
                !SubscribedCalendarsIdSet.has(
                  getIDValue.SubscribedCalendars?.(r)
                )
            )
            .map((r) => ({
              id: getIDValue.SubscribedCalendars?.(r),
              label: getDisplayValue.SubscribedCalendars?.(r),
            }))}
          isLoading={SubscribedCalendarsLoading}
          onSelect={({ id, label }) => {
            setCurrentSubscribedCalendarsValue(
              subscribedCalendarsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSubscribedCalendarsDisplayValue(label);
            runValidationTasks("SubscribedCalendars", label);
          }}
          onClear={() => {
            setCurrentSubscribedCalendarsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchSubscribedCalendarsRecords(value);
            if (errors.SubscribedCalendars?.hasError) {
              runValidationTasks("SubscribedCalendars", value);
            }
            setCurrentSubscribedCalendarsDisplayValue(value);
            setCurrentSubscribedCalendarsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "SubscribedCalendars",
              currentSubscribedCalendarsDisplayValue
            )
          }
          errorMessage={errors.SubscribedCalendars?.errorMessage}
          hasError={errors.SubscribedCalendars?.hasError}
          ref={SubscribedCalendarsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "SubscribedCalendars")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              email,
              Timezone,
              Schedules,
              Tasks,
              SubscribedCalendars,
              Subjects: values,
              UserWorkTim,
            };
            const result = onChange(modelFields);
            values = result?.Subjects ?? values;
          }
          setSubjects(values);
          setCurrentSubjectsValue(undefined);
          setCurrentSubjectsDisplayValue("");
        }}
        currentFieldValue={currentSubjectsValue}
        label={"Subjects"}
        items={Subjects}
        hasError={errors?.Subjects?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Subjects", currentSubjectsValue)
        }
        errorMessage={errors?.Subjects?.errorMessage}
        getBadgeText={getDisplayValue.Subjects}
        setFieldValue={(model) => {
          setCurrentSubjectsDisplayValue(
            model ? getDisplayValue.Subjects(model) : ""
          );
          setCurrentSubjectsValue(model);
        }}
        inputFieldRef={SubjectsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Subjects"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Subjects"
          value={currentSubjectsDisplayValue}
          options={subjectsRecords
            .filter((r) => !SubjectsIdSet.has(getIDValue.Subjects?.(r)))
            .map((r) => ({
              id: getIDValue.Subjects?.(r),
              label: getDisplayValue.Subjects?.(r),
            }))}
          isLoading={SubjectsLoading}
          onSelect={({ id, label }) => {
            setCurrentSubjectsValue(
              subjectsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSubjectsDisplayValue(label);
            runValidationTasks("Subjects", label);
          }}
          onClear={() => {
            setCurrentSubjectsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchSubjectsRecords(value);
            if (errors.Subjects?.hasError) {
              runValidationTasks("Subjects", value);
            }
            setCurrentSubjectsDisplayValue(value);
            setCurrentSubjectsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Subjects", currentSubjectsDisplayValue)
          }
          errorMessage={errors.Subjects?.errorMessage}
          hasError={errors.Subjects?.hasError}
          ref={SubjectsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Subjects")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              email,
              Timezone,
              Schedules,
              Tasks,
              SubscribedCalendars,
              Subjects,
              UserWorkTim: value,
            };
            const result = onChange(modelFields);
            value = result?.UserWorkTim ?? value;
          }
          setUserWorkTim(value);
          setCurrentUserWorkTimValue(undefined);
          setCurrentUserWorkTimDisplayValue("");
        }}
        currentFieldValue={currentUserWorkTimValue}
        label={"User work tim"}
        items={UserWorkTim ? [UserWorkTim] : []}
        hasError={errors?.UserWorkTim?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("UserWorkTim", currentUserWorkTimValue)
        }
        errorMessage={errors?.UserWorkTim?.errorMessage}
        getBadgeText={getDisplayValue.UserWorkTim}
        setFieldValue={(model) => {
          setCurrentUserWorkTimDisplayValue(
            model ? getDisplayValue.UserWorkTim(model) : ""
          );
          setCurrentUserWorkTimValue(model);
        }}
        inputFieldRef={UserWorkTimRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="User work tim"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search UserWorkTim"
          value={currentUserWorkTimDisplayValue}
          options={userWorkTimRecords
            .filter((r) => !UserWorkTimIdSet.has(getIDValue.UserWorkTim?.(r)))
            .map((r) => ({
              id: getIDValue.UserWorkTim?.(r),
              label: getDisplayValue.UserWorkTim?.(r),
            }))}
          isLoading={UserWorkTimLoading}
          onSelect={({ id, label }) => {
            setCurrentUserWorkTimValue(
              userWorkTimRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentUserWorkTimDisplayValue(label);
            runValidationTasks("UserWorkTim", label);
          }}
          onClear={() => {
            setCurrentUserWorkTimDisplayValue("");
          }}
          defaultValue={UserWorkTim}
          onChange={(e) => {
            let { value } = e.target;
            fetchUserWorkTimRecords(value);
            if (errors.UserWorkTim?.hasError) {
              runValidationTasks("UserWorkTim", value);
            }
            setCurrentUserWorkTimDisplayValue(value);
            setCurrentUserWorkTimValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("UserWorkTim", currentUserWorkTimDisplayValue)
          }
          errorMessage={errors.UserWorkTim?.errorMessage}
          hasError={errors.UserWorkTim?.hasError}
          ref={UserWorkTimRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "UserWorkTim")}
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
          isDisabled={!(idProp || userinfoModelProp)}
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
              !(idProp || userinfoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
