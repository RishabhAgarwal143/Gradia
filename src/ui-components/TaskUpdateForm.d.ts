/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TaskUpdateFormInputValues = {
    UID?: string;
    DTSTART?: string;
    DUE?: string;
    SUMMARY?: string;
    userinfoID?: string;
    COMPLETED?: string;
    STATUS?: string;
    PRIORITY?: number;
    DTSTAMP?: string;
    subscribedcalendarID?: string;
    DESCRIPTION?: string;
    subjectsID?: string;
    TaskGradeInfo?: any;
    LOCATION?: string;
};
export declare type TaskUpdateFormValidationValues = {
    UID?: ValidationFunction<string>;
    DTSTART?: ValidationFunction<string>;
    DUE?: ValidationFunction<string>;
    SUMMARY?: ValidationFunction<string>;
    userinfoID?: ValidationFunction<string>;
    COMPLETED?: ValidationFunction<string>;
    STATUS?: ValidationFunction<string>;
    PRIORITY?: ValidationFunction<number>;
    DTSTAMP?: ValidationFunction<string>;
    subscribedcalendarID?: ValidationFunction<string>;
    DESCRIPTION?: ValidationFunction<string>;
    subjectsID?: ValidationFunction<string>;
    TaskGradeInfo?: ValidationFunction<any>;
    LOCATION?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TaskUpdateFormOverridesProps = {
    TaskUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    UID?: PrimitiveOverrideProps<TextFieldProps>;
    DTSTART?: PrimitiveOverrideProps<TextFieldProps>;
    DUE?: PrimitiveOverrideProps<TextFieldProps>;
    SUMMARY?: PrimitiveOverrideProps<TextFieldProps>;
    userinfoID?: PrimitiveOverrideProps<AutocompleteProps>;
    COMPLETED?: PrimitiveOverrideProps<TextFieldProps>;
    STATUS?: PrimitiveOverrideProps<SelectFieldProps>;
    PRIORITY?: PrimitiveOverrideProps<TextFieldProps>;
    DTSTAMP?: PrimitiveOverrideProps<TextFieldProps>;
    subscribedcalendarID?: PrimitiveOverrideProps<AutocompleteProps>;
    DESCRIPTION?: PrimitiveOverrideProps<TextFieldProps>;
    subjectsID?: PrimitiveOverrideProps<AutocompleteProps>;
    TaskGradeInfo?: PrimitiveOverrideProps<AutocompleteProps>;
    LOCATION?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TaskUpdateFormProps = React.PropsWithChildren<{
    overrides?: TaskUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    task?: any;
    onSubmit?: (fields: TaskUpdateFormInputValues) => TaskUpdateFormInputValues;
    onSuccess?: (fields: TaskUpdateFormInputValues) => void;
    onError?: (fields: TaskUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TaskUpdateFormInputValues) => TaskUpdateFormInputValues;
    onValidate?: TaskUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TaskUpdateForm(props: TaskUpdateFormProps): React.ReactElement;
