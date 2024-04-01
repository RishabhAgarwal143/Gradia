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
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import {
  getSchedule,
  getSubjects,
  getSubscribedCalendar,
  listSubjects,
  listSubscribedCalendars,
} from "../graphql/queries";
import { updateSchedule } from "../graphql/mutations";
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
export default function ScheduleUpdateForm(props) {
  const {
    id: idProp,
    schedule: scheduleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    SUMMARY: "",
    DTSTART: "",
    DTEND: "",
    DESCRIPTION: "",
    LOCATION: "",
    userinfoID: "",
    RRULE: "",
    UID: "",
    DTSTAMP: "",
    subscribedcalendarID: undefined,
    subjectsID: undefined,
  };
  const [SUMMARY, setSUMMARY] = React.useState(initialValues.SUMMARY);
  const [DTSTART, setDTSTART] = React.useState(initialValues.DTSTART);
  const [DTEND, setDTEND] = React.useState(initialValues.DTEND);
  const [DESCRIPTION, setDESCRIPTION] = React.useState(
    initialValues.DESCRIPTION
  );
  const [LOCATION, setLOCATION] = React.useState(initialValues.LOCATION);
  const [userinfoID, setUserinfoID] = React.useState(initialValues.userinfoID);
  const [RRULE, setRRULE] = React.useState(initialValues.RRULE);
  const [UID, setUID] = React.useState(initialValues.UID);
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
  const [subjectsID, setSubjectsID] = React.useState(initialValues.subjectsID);
  const [subjectsIDLoading, setSubjectsIDLoading] = React.useState(false);
  const [subjectsIDRecords, setSubjectsIDRecords] = React.useState([]);
  const [selectedSubjectsIDRecords, setSelectedSubjectsIDRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = scheduleRecord
      ? {
          ...initialValues,
          ...scheduleRecord,
          subscribedcalendarID,
          subjectsID,
        }
      : initialValues;
    setSUMMARY(cleanValues.SUMMARY);
    setDTSTART(cleanValues.DTSTART);
    setDTEND(cleanValues.DTEND);
    setDESCRIPTION(cleanValues.DESCRIPTION);
    setLOCATION(cleanValues.LOCATION);
    setUserinfoID(cleanValues.userinfoID);
    setRRULE(
      typeof cleanValues.RRULE === "string" || cleanValues.RRULE === null
        ? cleanValues.RRULE
        : JSON.stringify(cleanValues.RRULE)
    );
    setUID(cleanValues.UID);
    setDTSTAMP(cleanValues.DTSTAMP);
    setSubscribedcalendarID(cleanValues.subscribedcalendarID);
    setCurrentSubscribedcalendarIDValue(undefined);
    setCurrentSubscribedcalendarIDDisplayValue("");
    setSubjectsID(cleanValues.subjectsID);
    setCurrentSubjectsIDValue(undefined);
    setCurrentSubjectsIDDisplayValue("");
    setErrors({});
  };
  const [scheduleRecord, setScheduleRecord] = React.useState(scheduleModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSchedule.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSchedule
        : scheduleModelProp;
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
      setScheduleRecord(record);
    };
    queryData();
  }, [idProp, scheduleModelProp]);
  React.useEffect(resetStateValues, [
    scheduleRecord,
    subscribedcalendarID,
    subjectsID,
  ]);
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
  const getDisplayValue = {
    subscribedcalendarID: (r) =>
      `${r?.Calendar_Name ? r?.Calendar_Name + " - " : ""}${r?.id}`,
    subjectsID: (r) =>
      `${r?.subject_Name ? r?.subject_Name + " - " : ""}${r?.id}`,
  };
  const validations = {
    SUMMARY: [{ type: "Required" }],
    DTSTART: [{ type: "Required" }],
    DTEND: [{ type: "Required" }],
    DESCRIPTION: [],
    LOCATION: [],
    userinfoID: [{ type: "Required" }],
    RRULE: [{ type: "JSON" }],
    UID: [],
    DTSTAMP: [],
    subscribedcalendarID: [],
    subjectsID: [],
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
  React.useEffect(() => {
    fetchSubscribedcalendarIDRecords("");
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
          SUMMARY,
          DTSTART,
          DTEND,
          DESCRIPTION: DESCRIPTION ?? null,
          LOCATION: LOCATION ?? null,
          userinfoID,
          RRULE: RRULE ?? null,
          UID: UID ?? null,
          DTSTAMP: DTSTAMP ?? null,
          subscribedcalendarID: subscribedcalendarID ?? null,
          subjectsID: subjectsID ?? null,
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
          const modelFieldsToSave = {
            SUMMARY: modelFields.SUMMARY,
            DTSTART: modelFields.DTSTART,
            DTEND: modelFields.DTEND,
            DESCRIPTION: modelFields.DESCRIPTION ?? null,
            LOCATION: modelFields.LOCATION ?? null,
            userinfoID: modelFields.userinfoID,
            UID: modelFields.UID ?? null,
            DTSTAMP: modelFields.DTSTAMP ?? null,
            subscribedcalendarID: modelFields.subscribedcalendarID ?? null,
            subjectsID: modelFields.subjectsID ?? null,
            RRULE: modelFields.RRULE
              ? JSON.parse(modelFields.RRULE)
              : modelFields.RRULE,
          };
          await client.graphql({
            query: updateSchedule.replaceAll("__typename", ""),
            variables: {
              input: {
                id: scheduleRecord.id,
                ...modelFieldsToSave,
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
      {...getOverrideProps(overrides, "ScheduleUpdateForm")}
      {...rest}
    >
      <TextField
        label="Summary"
        isRequired={true}
        isReadOnly={false}
        value={SUMMARY}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY: value,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
              UID,
              DTSTAMP,
              subscribedcalendarID,
              subjectsID,
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
      <TextField
        label="Dtstart"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={DTSTART && convertToLocal(new Date(DTSTART))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART: value,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
              UID,
              DTSTAMP,
              subscribedcalendarID,
              subjectsID,
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
        label="Dtend"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={DTEND && convertToLocal(new Date(DTEND))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND: value,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
              UID,
              DTSTAMP,
              subscribedcalendarID,
              subjectsID,
            };
            const result = onChange(modelFields);
            value = result?.DTEND ?? value;
          }
          if (errors.DTEND?.hasError) {
            runValidationTasks("DTEND", value);
          }
          setDTEND(value);
        }}
        onBlur={() => runValidationTasks("DTEND", DTEND)}
        errorMessage={errors.DTEND?.errorMessage}
        hasError={errors.DTEND?.hasError}
        {...getOverrideProps(overrides, "DTEND")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={DESCRIPTION}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION: value,
              LOCATION,
              userinfoID,
              RRULE,
              UID,
              DTSTAMP,
              subscribedcalendarID,
              subjectsID,
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
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={LOCATION}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION: value,
              userinfoID,
              RRULE,
              UID,
              DTSTAMP,
              subscribedcalendarID,
              subjectsID,
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
      <TextField
        label="Userinfo id"
        isRequired={true}
        isReadOnly={false}
        value={userinfoID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID: value,
              RRULE,
              UID,
              DTSTAMP,
              subscribedcalendarID,
              subjectsID,
            };
            const result = onChange(modelFields);
            value = result?.userinfoID ?? value;
          }
          if (errors.userinfoID?.hasError) {
            runValidationTasks("userinfoID", value);
          }
          setUserinfoID(value);
        }}
        onBlur={() => runValidationTasks("userinfoID", userinfoID)}
        errorMessage={errors.userinfoID?.errorMessage}
        hasError={errors.userinfoID?.hasError}
        {...getOverrideProps(overrides, "userinfoID")}
      ></TextField>
      <TextAreaField
        label="Rrule"
        isRequired={false}
        isReadOnly={false}
        value={RRULE}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE: value,
              UID,
              DTSTAMP,
              subscribedcalendarID,
              subjectsID,
            };
            const result = onChange(modelFields);
            value = result?.RRULE ?? value;
          }
          if (errors.RRULE?.hasError) {
            runValidationTasks("RRULE", value);
          }
          setRRULE(value);
        }}
        onBlur={() => runValidationTasks("RRULE", RRULE)}
        errorMessage={errors.RRULE?.errorMessage}
        hasError={errors.RRULE?.hasError}
        {...getOverrideProps(overrides, "RRULE")}
      ></TextAreaField>
      <TextField
        label="Uid"
        isRequired={false}
        isReadOnly={false}
        value={UID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
              UID: value,
              DTSTAMP,
              subscribedcalendarID,
              subjectsID,
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
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
              UID,
              DTSTAMP: value,
              subscribedcalendarID,
              subjectsID,
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
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
              UID,
              DTSTAMP,
              subscribedcalendarID: value,
              subjectsID,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              SUMMARY,
              DTSTART,
              DTEND,
              DESCRIPTION,
              LOCATION,
              userinfoID,
              RRULE,
              UID,
              DTSTAMP,
              subscribedcalendarID,
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
          isDisabled={!(idProp || scheduleModelProp)}
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
              !(idProp || scheduleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
