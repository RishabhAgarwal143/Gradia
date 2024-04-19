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
export declare type TaskGradeInfoUpdateFormInputValues = {
    current_Grade?: number;
    task_Weightage?: number;
    overall_Percentage?: number;
    extra_Info?: string;
    time_Taken?: string;
    Task?: any;
    syllabusgradevaluesID?: string;
};
export declare type TaskGradeInfoUpdateFormValidationValues = {
    current_Grade?: ValidationFunction<number>;
    task_Weightage?: ValidationFunction<number>;
    overall_Percentage?: ValidationFunction<number>;
    extra_Info?: ValidationFunction<string>;
    time_Taken?: ValidationFunction<string>;
    Task?: ValidationFunction<any>;
    syllabusgradevaluesID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TaskGradeInfoUpdateFormOverridesProps = {
    TaskGradeInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    current_Grade?: PrimitiveOverrideProps<TextFieldProps>;
    task_Weightage?: PrimitiveOverrideProps<TextFieldProps>;
    overall_Percentage?: PrimitiveOverrideProps<TextFieldProps>;
    extra_Info?: PrimitiveOverrideProps<TextFieldProps>;
    time_Taken?: PrimitiveOverrideProps<TextFieldProps>;
    Task?: PrimitiveOverrideProps<AutocompleteProps>;
    syllabusgradevaluesID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TaskGradeInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: TaskGradeInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    taskGradeInfo?: any;
    onSubmit?: (fields: TaskGradeInfoUpdateFormInputValues) => TaskGradeInfoUpdateFormInputValues;
    onSuccess?: (fields: TaskGradeInfoUpdateFormInputValues) => void;
    onError?: (fields: TaskGradeInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TaskGradeInfoUpdateFormInputValues) => TaskGradeInfoUpdateFormInputValues;
    onValidate?: TaskGradeInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TaskGradeInfoUpdateForm(props: TaskGradeInfoUpdateFormProps): React.ReactElement;
