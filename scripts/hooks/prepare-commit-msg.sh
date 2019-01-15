#!/bin/bash
# This way you can customize which branches should be skipped when
# prepending commit message.
COMMIT_MSG_FILE=$1
if [ -z "$BRANCHES_TO_SKIP" ]; then
  BRANCHES_TO_SKIP=(master development test)
fi
BRANCH_NAME=$(git symbolic-ref --short HEAD)
BRANCH_NAME="${BRANCH_NAME##*/}"
PREFIX_REGEX='s|^(?:.*)([0-9]*)(.*)|$1|g'
CLEAN_NAME=$(echo $BRANCH_NAME | perl -p -e $PREFIX_REGEX)
BRANCH_EXCLUDED=$(printf "%s\n" "${BRANCHES_TO_SKIP[@]}" | grep -c "^$BRANCH_NAME$")
BRANCH_IN_COMMIT=$(grep -c "\[$BRANCH_NAME\]" $COMMIT_MSG_FILE)
if [ -n "$BRANCH_NAME" ] && ! [[ $BRANCH_EXCLUDED -eq 1 ]] && ! [[ $BRANCH_IN_COMMIT -ge 1 ]]; then
  sed -i.bak -e "1s/^/[$CLEAN_NAME] /" $COMMIT_MSG_FILE
fi
