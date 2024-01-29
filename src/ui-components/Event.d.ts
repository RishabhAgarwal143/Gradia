/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type EventOverridesProps = {
    Event?: PrimitiveOverrideProps<FlexProps>;
    Bar?: PrimitiveOverrideProps<ViewProps>;
    Body?: PrimitiveOverrideProps<FlexProps>;
    Time?: PrimitiveOverrideProps<FlexProps>;
    End1453?: PrimitiveOverrideProps<TextProps>;
    "AM/PM"?: PrimitiveOverrideProps<TextProps>;
    "Frame 11"?: PrimitiveOverrideProps<FlexProps>;
    "video-camera"?: PrimitiveOverrideProps<ViewProps>;
    End1457?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type EventProps = React.PropsWithChildren<Partial<FlexProps> & {
    task?: any;
    AP?: String;
} & {
    overrides?: EventOverridesProps | undefined | null;
}>;
export default function Event(props: EventProps): React.ReactElement;
