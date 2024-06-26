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
export declare type SubscribedCalendarUpdateFormInputValues = {
    Calendar_Name?: string;
    Calendar_URL?: string;
    userinfoID?: string;
    Schedules?: any[];
    Tasks?: any[];
    LAST_MODIFIED?: string;
};
export declare type SubscribedCalendarUpdateFormValidationValues = {
    Calendar_Name?: ValidationFunction<string>;
    Calendar_URL?: ValidationFunction<string>;
    userinfoID?: ValidationFunction<string>;
    Schedules?: ValidationFunction<any>;
    Tasks?: ValidationFunction<any>;
    LAST_MODIFIED?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubscribedCalendarUpdateFormOverridesProps = {
    SubscribedCalendarUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Calendar_Name?: PrimitiveOverrideProps<TextFieldProps>;
    Calendar_URL?: PrimitiveOverrideProps<TextFieldProps>;
    userinfoID?: PrimitiveOverrideProps<AutocompleteProps>;
    Schedules?: PrimitiveOverrideProps<AutocompleteProps>;
    Tasks?: PrimitiveOverrideProps<AutocompleteProps>;
    LAST_MODIFIED?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SubscribedCalendarUpdateFormProps = React.PropsWithChildren<{
    overrides?: SubscribedCalendarUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    subscribedCalendar?: any;
    onSubmit?: (fields: SubscribedCalendarUpdateFormInputValues) => SubscribedCalendarUpdateFormInputValues;
    onSuccess?: (fields: SubscribedCalendarUpdateFormInputValues) => void;
    onError?: (fields: SubscribedCalendarUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubscribedCalendarUpdateFormInputValues) => SubscribedCalendarUpdateFormInputValues;
    onValidate?: SubscribedCalendarUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SubscribedCalendarUpdateForm(props: SubscribedCalendarUpdateFormProps): React.ReactElement;
