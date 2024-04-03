/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ScheduleGradeInfoUpdateFormInputValues = {
    current_Grade?: number;
    task_Weightage?: number;
    overall_Percentage?: number;
    extra_Info?: string;
    attended?: boolean;
    Schedule?: any;
};
export declare type ScheduleGradeInfoUpdateFormValidationValues = {
    current_Grade?: ValidationFunction<number>;
    task_Weightage?: ValidationFunction<number>;
    overall_Percentage?: ValidationFunction<number>;
    extra_Info?: ValidationFunction<string>;
    attended?: ValidationFunction<boolean>;
    Schedule?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScheduleGradeInfoUpdateFormOverridesProps = {
    ScheduleGradeInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    current_Grade?: PrimitiveOverrideProps<TextFieldProps>;
    task_Weightage?: PrimitiveOverrideProps<TextFieldProps>;
    overall_Percentage?: PrimitiveOverrideProps<TextFieldProps>;
    extra_Info?: PrimitiveOverrideProps<TextFieldProps>;
    attended?: PrimitiveOverrideProps<SwitchFieldProps>;
    Schedule?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type ScheduleGradeInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: ScheduleGradeInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    scheduleGradeInfo?: any;
    onSubmit?: (fields: ScheduleGradeInfoUpdateFormInputValues) => ScheduleGradeInfoUpdateFormInputValues;
    onSuccess?: (fields: ScheduleGradeInfoUpdateFormInputValues) => void;
    onError?: (fields: ScheduleGradeInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScheduleGradeInfoUpdateFormInputValues) => ScheduleGradeInfoUpdateFormInputValues;
    onValidate?: ScheduleGradeInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ScheduleGradeInfoUpdateForm(props: ScheduleGradeInfoUpdateFormProps): React.ReactElement;
