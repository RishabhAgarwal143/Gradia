#!/bin/bash
set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"system\",\
\"accessKeyId\":\"AKIA32DS5VKXHOKRZOM2\",\
\"secretAccessKey\":\"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\",\
\"region\":\"us-east-2\"\
}"
AMPLIFY="{\
\"projectName\":\"headlessProjectName\",\
\"appId\":\"d3405h1te0fsy7\",\
\"envName\":\"staging\",\
\"defaultEditor\":\"code\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

amplify pull \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--yes
