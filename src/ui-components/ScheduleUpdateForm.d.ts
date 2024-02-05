/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ScheduleUpdateFormInputValues = {
    SUMMARY?: string;
    DTSTART?: string;
    DTEND?: string;
    DESCRIPTION?: string;
    LOCATION?: string;
    userinfoID?: string;
    RRULE?: string;
};
export declare type ScheduleUpdateFormValidationValues = {
    SUMMARY?: ValidationFunction<string>;
    DTSTART?: ValidationFunction<string>;
    DTEND?: ValidationFunction<string>;
    DESCRIPTION?: ValidationFunction<string>;
    LOCATION?: ValidationFunction<string>;
    userinfoID?: ValidationFunction<string>;
    RRULE?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScheduleUpdateFormOverridesProps = {
    ScheduleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    SUMMARY?: PrimitiveOverrideProps<TextFieldProps>;
    DTSTART?: PrimitiveOverrideProps<TextFieldProps>;
    DTEND?: PrimitiveOverrideProps<TextFieldProps>;
    DESCRIPTION?: PrimitiveOverrideProps<TextFieldProps>;
    LOCATION?: PrimitiveOverrideProps<TextFieldProps>;
    userinfoID?: PrimitiveOverrideProps<AutocompleteProps>;
    RRULE?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ScheduleUpdateFormProps = React.PropsWithChildren<{
    overrides?: ScheduleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    schedule?: any;
    onSubmit?: (fields: ScheduleUpdateFormInputValues) => ScheduleUpdateFormInputValues;
    onSuccess?: (fields: ScheduleUpdateFormInputValues) => void;
    onError?: (fields: ScheduleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScheduleUpdateFormInputValues) => ScheduleUpdateFormInputValues;
    onValidate?: ScheduleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ScheduleUpdateForm(props: ScheduleUpdateFormProps): React.ReactElement;
