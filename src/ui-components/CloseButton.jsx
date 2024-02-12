/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Icon, Text, View } from "@aws-amplify/ui-react";
export default function CloseButton(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="46px"
      height="19px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "CloseButton")}
      {...rest}
    >
      <Icon
        width="46px"
        height="19px"
        viewBox={{ minX: 0, minY: 0, width: 46, height: 19 }}
        paths={[
          {
            d: "M0 6C0 2.68629 2.68629 0 6 0L40 0C43.3137 0 46 2.68629 46 6L46 13C46 16.3137 43.3137 19 40 19L6 19C2.68629 19 0 16.3137 0 13L0 6Z",
            fill: "rgba(158,84,84,1)",
            fillRule: "nonzero",
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        {...getOverrideProps(overrides, "Rectangle 2")}
      ></Icon>
      <Text
        fontFamily="Inter"
        fontSize="10px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="12.102272033691406px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="43px"
        height="14px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="2px"
        left="8px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Close"
        {...getOverrideProps(overrides, "Close")}
      ></Text>
    </View>
  );
}
