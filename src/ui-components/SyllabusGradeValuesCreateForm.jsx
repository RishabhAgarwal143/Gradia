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
import { listSubjects, listTaskGradeInfos } from "../graphql/queries";
import {
  createSyllabusGradeValues,
  updateTaskGradeInfo,
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
export default function SyllabusGradeValuesCreateForm(props) {
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
    category_Name: "",
    category_Grade: "",
    Tasks_associated: "",
    each_Task_weightage: "",
    subjectsID: undefined,
    TaskGradeInfos: [],
  };
  const [category_Name, setCategory_Name] = React.useState(
    initialValues.category_Name
  );
  const [category_Grade, setCategory_Grade] = React.useState(
    initialValues.category_Grade
  );
  const [Tasks_associated, setTasks_associated] = React.useState(
    initialValues.Tasks_associated
  );
  const [each_Task_weightage, setEach_Task_weightage] = React.useState(
    initialValues.each_Task_weightage
  );
  const [subjectsID, setSubjectsID] = React.useState(initialValues.subjectsID);
  const [subjectsIDLoading, setSubjectsIDLoading] = React.useState(false);
  const [subjectsIDRecords, setSubjectsIDRecords] = React.useState([]);
  const [selectedSubjectsIDRecords, setSelectedSubjectsIDRecords] =
    React.useState([]);
  const [TaskGradeInfos, setTaskGradeInfos] = React.useState(
    initialValues.TaskGradeInfos
  );
  const [TaskGradeInfosLoading, setTaskGradeInfosLoading] =
    React.useState(false);
  const [taskGradeInfosRecords, setTaskGradeInfosRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCategory_Name(initialValues.category_Name);
    setCategory_Grade(initialValues.category_Grade);
    setTasks_associated(initialValues.Tasks_associated);
    setEach_Task_weightage(initialValues.each_Task_weightage);
    setSubjectsID(initialValues.subjectsID);
    setCurrentSubjectsIDValue(undefined);
    setCurrentSubjectsIDDisplayValue("");
    setTaskGradeInfos(initialValues.TaskGradeInfos);
    setCurrentTaskGradeInfosValue(undefined);
    setCurrentTaskGradeInfosDisplayValue("");
    setErrors({});
  };
  const [currentSubjectsIDDisplayValue, setCurrentSubjectsIDDisplayValue] =
    React.useState("");
  const [currentSubjectsIDValue, setCurrentSubjectsIDValue] =
    React.useState(undefined);
  const subjectsIDRef = React.createRef();
  const [
    currentTaskGradeInfosDisplayValue,
    setCurrentTaskGradeInfosDisplayValue,
  ] = React.useState("");
  const [currentTaskGradeInfosValue, setCurrentTaskGradeInfosValue] =
    React.useState(undefined);
  const TaskGradeInfosRef = React.createRef();
  const getIDValue = {
    TaskGradeInfos: (r) => JSON.stringify({ id: r?.id }),
  };
  const TaskGradeInfosIdSet = new Set(
    Array.isArray(TaskGradeInfos)
      ? TaskGradeInfos.map((r) => getIDValue.TaskGradeInfos?.(r))
      : getIDValue.TaskGradeInfos?.(TaskGradeInfos)
  );
  const getDisplayValue = {
    subjectsID: (r) =>
      `${r?.subject_Name ? r?.subject_Name + " - " : ""}${r?.id}`,
    TaskGradeInfos: (r) =>
      `${r?.current_Grade ? r?.current_Grade + " - " : ""}${r?.id}`,
  };
  const validations = {
    category_Name: [],
    category_Grade: [],
    Tasks_associated: [],
    each_Task_weightage: [],
    subjectsID: [{ type: "Required" }],
    TaskGradeInfos: [],
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
  const fetchTaskGradeInfosRecords = async (value) => {
    setTaskGradeInfosLoading(true);
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
        (item) => !TaskGradeInfosIdSet.has(getIDValue.TaskGradeInfos?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setTaskGradeInfosRecords(newOptions.slice(0, autocompleteLength));
    setTaskGradeInfosLoading(false);
  };
  React.useEffect(() => {
    fetchSubjectsIDRecords("");
    fetchTaskGradeInfosRecords("");
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
          category_Name,
          category_Grade,
          Tasks_associated,
          each_Task_weightage,
          subjectsID,
          TaskGradeInfos,
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
            category_Name: modelFields.category_Name,
            category_Grade: modelFields.category_Grade,
            Tasks_associated: modelFields.Tasks_associated,
            each_Task_weightage: modelFields.each_Task_weightage,
            subjectsID: modelFields.subjectsID,
          };
          const syllabusGradeValues = (
            await client.graphql({
              query: createSyllabusGradeValues.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createSyllabusGradeValues;
          const promises = [];
          promises.push(
            ...TaskGradeInfos.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateTaskGradeInfo.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      syllabusgradevaluesID: syllabusGradeValues.id,
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
      {...getOverrideProps(overrides, "SyllabusGradeValuesCreateForm")}
      {...rest}
    >
      <TextField
        label="Category name"
        isRequired={false}
        isReadOnly={false}
        value={category_Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              category_Name: value,
              category_Grade,
              Tasks_associated,
              each_Task_weightage,
              subjectsID,
              TaskGradeInfos,
            };
            const result = onChange(modelFields);
            value = result?.category_Name ?? value;
          }
          if (errors.category_Name?.hasError) {
            runValidationTasks("category_Name", value);
          }
          setCategory_Name(value);
        }}
        onBlur={() => runValidationTasks("category_Name", category_Name)}
        errorMessage={errors.category_Name?.errorMessage}
        hasError={errors.category_Name?.hasError}
        {...getOverrideProps(overrides, "category_Name")}
      ></TextField>
      <TextField
        label="Category grade"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={category_Grade}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              category_Name,
              category_Grade: value,
              Tasks_associated,
              each_Task_weightage,
              subjectsID,
              TaskGradeInfos,
            };
            const result = onChange(modelFields);
            value = result?.category_Grade ?? value;
          }
          if (errors.category_Grade?.hasError) {
            runValidationTasks("category_Grade", value);
          }
          setCategory_Grade(value);
        }}
        onBlur={() => runValidationTasks("category_Grade", category_Grade)}
        errorMessage={errors.category_Grade?.errorMessage}
        hasError={errors.category_Grade?.hasError}
        {...getOverrideProps(overrides, "category_Grade")}
      ></TextField>
      <TextField
        label="Tasks associated"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Tasks_associated}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              category_Name,
              category_Grade,
              Tasks_associated: value,
              each_Task_weightage,
              subjectsID,
              TaskGradeInfos,
            };
            const result = onChange(modelFields);
            value = result?.Tasks_associated ?? value;
          }
          if (errors.Tasks_associated?.hasError) {
            runValidationTasks("Tasks_associated", value);
          }
          setTasks_associated(value);
        }}
        onBlur={() => runValidationTasks("Tasks_associated", Tasks_associated)}
        errorMessage={errors.Tasks_associated?.errorMessage}
        hasError={errors.Tasks_associated?.hasError}
        {...getOverrideProps(overrides, "Tasks_associated")}
      ></TextField>
      <TextField
        label="Each task weightage"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={each_Task_weightage}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              category_Name,
              category_Grade,
              Tasks_associated,
              each_Task_weightage: value,
              subjectsID,
              TaskGradeInfos,
            };
            const result = onChange(modelFields);
            value = result?.each_Task_weightage ?? value;
          }
          if (errors.each_Task_weightage?.hasError) {
            runValidationTasks("each_Task_weightage", value);
          }
          setEach_Task_weightage(value);
        }}
        onBlur={() =>
          runValidationTasks("each_Task_weightage", each_Task_weightage)
        }
        errorMessage={errors.each_Task_weightage?.errorMessage}
        hasError={errors.each_Task_weightage?.hasError}
        {...getOverrideProps(overrides, "each_Task_weightage")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              category_Name,
              category_Grade,
              Tasks_associated,
              each_Task_weightage,
              subjectsID: value,
              TaskGradeInfos,
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
          isRequired={true}
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
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              category_Name,
              category_Grade,
              Tasks_associated,
              each_Task_weightage,
              subjectsID,
              TaskGradeInfos: values,
            };
            const result = onChange(modelFields);
            values = result?.TaskGradeInfos ?? values;
          }
          setTaskGradeInfos(values);
          setCurrentTaskGradeInfosValue(undefined);
          setCurrentTaskGradeInfosDisplayValue("");
        }}
        currentFieldValue={currentTaskGradeInfosValue}
        label={"Task grade infos"}
        items={TaskGradeInfos}
        hasError={errors?.TaskGradeInfos?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("TaskGradeInfos", currentTaskGradeInfosValue)
        }
        errorMessage={errors?.TaskGradeInfos?.errorMessage}
        getBadgeText={getDisplayValue.TaskGradeInfos}
        setFieldValue={(model) => {
          setCurrentTaskGradeInfosDisplayValue(
            model ? getDisplayValue.TaskGradeInfos(model) : ""
          );
          setCurrentTaskGradeInfosValue(model);
        }}
        inputFieldRef={TaskGradeInfosRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Task grade infos"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TaskGradeInfo"
          value={currentTaskGradeInfosDisplayValue}
          options={taskGradeInfosRecords
            .filter(
              (r) => !TaskGradeInfosIdSet.has(getIDValue.TaskGradeInfos?.(r))
            )
            .map((r) => ({
              id: getIDValue.TaskGradeInfos?.(r),
              label: getDisplayValue.TaskGradeInfos?.(r),
            }))}
          isLoading={TaskGradeInfosLoading}
          onSelect={({ id, label }) => {
            setCurrentTaskGradeInfosValue(
              taskGradeInfosRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTaskGradeInfosDisplayValue(label);
            runValidationTasks("TaskGradeInfos", label);
          }}
          onClear={() => {
            setCurrentTaskGradeInfosDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchTaskGradeInfosRecords(value);
            if (errors.TaskGradeInfos?.hasError) {
              runValidationTasks("TaskGradeInfos", value);
            }
            setCurrentTaskGradeInfosDisplayValue(value);
            setCurrentTaskGradeInfosValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "TaskGradeInfos",
              currentTaskGradeInfosDisplayValue
            )
          }
          errorMessage={errors.TaskGradeInfos?.errorMessage}
          hasError={errors.TaskGradeInfos?.hasError}
          ref={TaskGradeInfosRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "TaskGradeInfos")}
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
