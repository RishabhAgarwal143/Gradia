/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SubscribedCalendarCreateFormInputValues = {
    Calendar_Name?: string;
    Calendar_URL?: string;
    userinfoID?: string;
};
export declare type SubscribedCalendarCreateFormValidationValues = {
    Calendar_Name?: ValidationFunction<string>;
    Calendar_URL?: ValidationFunction<string>;
    userinfoID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubscribedCalendarCreateFormOverridesProps = {
    SubscribedCalendarCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Calendar_Name?: PrimitiveOverrideProps<TextFieldProps>;
    Calendar_URL?: PrimitiveOverrideProps<TextFieldProps>;
    userinfoID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type SubscribedCalendarCreateFormProps = React.PropsWithChildren<{
    overrides?: SubscribedCalendarCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SubscribedCalendarCreateFormInputValues) => SubscribedCalendarCreateFormInputValues;
    onSuccess?: (fields: SubscribedCalendarCreateFormInputValues) => void;
    onError?: (fields: SubscribedCalendarCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubscribedCalendarCreateFormInputValues) => SubscribedCalendarCreateFormInputValues;
    onValidate?: SubscribedCalendarCreateFormValidationValues;
} & React.CSSProperties>;
export default function SubscribedCalendarCreateForm(props: SubscribedCalendarCreateFormProps): React.ReactElement;
