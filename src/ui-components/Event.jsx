/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Text, View } from "@aws-amplify/ui-react";
export default function Event(props) {
  const { task, AP, overrides, ...rest } = props;
  return (
    <Flex
      gap="0"
      direction="row"
      width="143px"
      height="68px"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      borderRadius="4px"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(14,165,233,0.1)"
      {...getOverrideProps(overrides, "Event")}
      {...rest}
    >
      <View
        width="3px"
        height="unset"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(14,165,233,1)"
        {...getOverrideProps(overrides, "Bar")}
      ></View>
      <Flex
        gap="0"
        direction="column"
        width="unset"
        height="68px"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        borderRadius="4px"
        padding="6px 6px 6px 6px"
        {...getOverrideProps(overrides, "Body")}
      >
        <Flex
          gap="4px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Time")}
        >
          <Text
            fontFamily="Inter"
            fontSize="12px"
            fontWeight="400"
            color="rgba(3,105,161,1)"
            lineHeight="16px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={task?.due_time}
            {...getOverrideProps(overrides, "End1453")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="12px"
            fontWeight="400"
            color="rgba(3,105,161,1)"
            lineHeight="16px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={AP}
            {...getOverrideProps(overrides, "AM/PM")}
          ></Text>
          <Flex
            gap="10px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            position="relative"
            borderRadius="100px"
            padding="2px 2px 2px 2px"
            backgroundColor="rgba(3,105,161,1)"
            {...getOverrideProps(overrides, "Frame 11")}
          >
            <View
              width="8px"
              height="8px"
              {...getOverrideProps(overrides, "video-camera")}
            ></View>
          </Flex>
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="12px"
          fontWeight="600"
          color="rgba(3,105,161,1)"
          lineHeight="16px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={task?.description}
          {...getOverrideProps(overrides, "End1457")}
        ></Text>
      </Flex>
    </Flex>
  );
}
