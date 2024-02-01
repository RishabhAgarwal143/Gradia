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
import { getSchedule, getUserinfo, listUserinfos } from "../graphql/queries";
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
    userinfoID: undefined,
  };
  const [SUMMARY, setSUMMARY] = React.useState(initialValues.SUMMARY);
  const [DTSTART, setDTSTART] = React.useState(initialValues.DTSTART);
  const [DTEND, setDTEND] = React.useState(initialValues.DTEND);
  const [DESCRIPTION, setDESCRIPTION] = React.useState(
    initialValues.DESCRIPTION
  );
  const [LOCATION, setLOCATION] = React.useState(initialValues.LOCATION);
  const [userinfoID, setUserinfoID] = React.useState(initialValues.userinfoID);
  const [userinfoIDLoading, setUserinfoIDLoading] = React.useState(false);
  const [userinfoIDRecords, setUserinfoIDRecords] = React.useState([]);
  const [selectedUserinfoIDRecords, setSelectedUserinfoIDRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = scheduleRecord
      ? { ...initialValues, ...scheduleRecord, userinfoID }
      : initialValues;
    setSUMMARY(cleanValues.SUMMARY);
    setDTSTART(cleanValues.DTSTART);
    setDTEND(cleanValues.DTEND);
    setDESCRIPTION(cleanValues.DESCRIPTION);
    setLOCATION(cleanValues.LOCATION);
    setUserinfoID(cleanValues.userinfoID);
    setCurrentUserinfoIDValue(undefined);
    setCurrentUserinfoIDDisplayValue("");
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
      setScheduleRecord(record);
    };
    queryData();
  }, [idProp, scheduleModelProp]);
  React.useEffect(resetStateValues, [scheduleRecord, userinfoID]);
  const [currentUserinfoIDDisplayValue, setCurrentUserinfoIDDisplayValue] =
    React.useState("");
  const [currentUserinfoIDValue, setCurrentUserinfoIDValue] =
    React.useState(undefined);
  const userinfoIDRef = React.createRef();
  const getDisplayValue = {
    userinfoID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    SUMMARY: [{ type: "Required" }],
    DTSTART: [{ type: "Required" }],
    DTEND: [{ type: "Required" }],
    DESCRIPTION: [],
    LOCATION: [],
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
          SUMMARY,
          DTSTART,
          DTEND,
          DESCRIPTION: DESCRIPTION ?? null,
          LOCATION: LOCATION ?? null,
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
            query: updateSchedule.replaceAll("__typename", ""),
            variables: {
              input: {
                id: scheduleRecord.id,
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
