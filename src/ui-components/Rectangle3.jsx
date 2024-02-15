/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
export default function Rectangle3(props) {
  const { task, overrides, ...rest } = props;
  return (
    <View
      width="322px"
      height="45px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Rectangle3")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="16.94318199157715px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="322px"
        height="44px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="0%"
        bottom="2.22%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={task?.SUMMARY}
        {...getOverrideProps(overrides, "Task 1")}
      ></Text>
    </View>
  );
}
