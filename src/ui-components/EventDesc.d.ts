/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventDescOverridesProps = {
    EventDesc?: PrimitiveOverrideProps<ViewProps>;
    Vector11543?: PrimitiveOverrideProps<IconProps>;
    "Team Meeting"?: PrimitiveOverrideProps<TextProps>;
    Group?: PrimitiveOverrideProps<ViewProps>;
    "Desc:"?: PrimitiveOverrideProps<TextProps>;
    "Group 2"?: PrimitiveOverrideProps<ViewProps>;
    Vector115410?: PrimitiveOverrideProps<IconProps>;
    Vector115411?: PrimitiveOverrideProps<IconProps>;
    Edit?: PrimitiveOverrideProps<TextProps>;
    "Group 1"?: PrimitiveOverrideProps<ViewProps>;
    Vector115413?: PrimitiveOverrideProps<IconProps>;
    Delete?: PrimitiveOverrideProps<TextProps>;
    Vector115415?: PrimitiveOverrideProps<IconProps>;
    Vector115414?: PrimitiveOverrideProps<IconProps>;
    Time11564?: PrimitiveOverrideProps<TextProps>;
    Time11599?: PrimitiveOverrideProps<TextProps>;
    "Location:"?: PrimitiveOverrideProps<TextProps>;
    Location?: PrimitiveOverrideProps<TextProps>;
    "A 2 line desc"?: PrimitiveOverrideProps<TextProps>;
    "-"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type EventDescProps = React.PropsWithChildren<Partial<ViewProps> & {
    schedule?: any;
} & {
    overrides?: EventDescOverridesProps | undefined | null;
}>;
export default function EventDesc(props: EventDescProps): React.ReactElement;
