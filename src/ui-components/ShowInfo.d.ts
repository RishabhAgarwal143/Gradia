/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ShowInfoInputValues = {
    SUMMARY?: string;
    DTSTART?: string;
    DTEND?: string;
    DESCRIPTION?: string;
    LOCATION?: string;
    userinfoID?: string;
    RRULE?: string;
    UID?: string;
    CATEGORIES?: string;
    DTSTAMP?: string;
};
export declare type ShowInfoValidationValues = {
    SUMMARY?: ValidationFunction<string>;
    DTSTART?: ValidationFunction<string>;
    DTEND?: ValidationFunction<string>;
    DESCRIPTION?: ValidationFunction<string>;
    LOCATION?: ValidationFunction<string>;
    userinfoID?: ValidationFunction<string>;
    RRULE?: ValidationFunction<string>;
    UID?: ValidationFunction<string>;
    CATEGORIES?: ValidationFunction<string>;
    DTSTAMP?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShowInfoOverridesProps = {
    ShowInfoGrid?: PrimitiveOverrideProps<GridProps>;
    SUMMARY?: PrimitiveOverrideProps<TextFieldProps>;
    DTSTART?: PrimitiveOverrideProps<TextFieldProps>;
    DTEND?: PrimitiveOverrideProps<TextFieldProps>;
    DESCRIPTION?: PrimitiveOverrideProps<TextFieldProps>;
    LOCATION?: PrimitiveOverrideProps<TextFieldProps>;
    userinfoID?: PrimitiveOverrideProps<TextFieldProps>;
    RRULE?: PrimitiveOverrideProps<TextAreaFieldProps>;
    UID?: PrimitiveOverrideProps<TextFieldProps>;
    CATEGORIES?: PrimitiveOverrideProps<TextFieldProps>;
    DTSTAMP?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ShowInfoProps = React.PropsWithChildren<{
    overrides?: ShowInfoOverridesProps | undefined | null;
} & {
    id?: string;
    schedule?: any;
    onSubmit?: (fields: ShowInfoInputValues) => ShowInfoInputValues;
    onSuccess?: (fields: ShowInfoInputValues) => void;
    onError?: (fields: ShowInfoInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ShowInfoInputValues) => ShowInfoInputValues;
    onValidate?: ShowInfoValidationValues;
} & React.CSSProperties>;
export default function ShowInfo(props: ShowInfoProps): React.ReactElement;
