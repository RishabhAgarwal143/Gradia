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
export declare type TaskGradeInfoCreateFormInputValues = {
    current_Grade?: number;
    task_Weightage?: number;
    overall_Percentage?: number;
    extra_Info?: string;
    time_Taken?: string;
    Task?: any;
};
export declare type TaskGradeInfoCreateFormValidationValues = {
    current_Grade?: ValidationFunction<number>;
    task_Weightage?: ValidationFunction<number>;
    overall_Percentage?: ValidationFunction<number>;
    extra_Info?: ValidationFunction<string>;
    time_Taken?: ValidationFunction<string>;
    Task?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TaskGradeInfoCreateFormOverridesProps = {
    TaskGradeInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    current_Grade?: PrimitiveOverrideProps<TextFieldProps>;
    task_Weightage?: PrimitiveOverrideProps<TextFieldProps>;
    overall_Percentage?: PrimitiveOverrideProps<TextFieldProps>;
    extra_Info?: PrimitiveOverrideProps<TextFieldProps>;
    time_Taken?: PrimitiveOverrideProps<TextFieldProps>;
    Task?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TaskGradeInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: TaskGradeInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TaskGradeInfoCreateFormInputValues) => TaskGradeInfoCreateFormInputValues;
    onSuccess?: (fields: TaskGradeInfoCreateFormInputValues) => void;
    onError?: (fields: TaskGradeInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TaskGradeInfoCreateFormInputValues) => TaskGradeInfoCreateFormInputValues;
    onValidate?: TaskGradeInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function TaskGradeInfoCreateForm(props: TaskGradeInfoCreateFormProps): React.ReactElement;
