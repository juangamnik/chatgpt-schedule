#!/bin/bash

you=0
chatgpt=0
prompts=0
line_num=0
count_mode=""

# check if file was provided as first argument
if [ -z "$1" ]; then
  echo "Please provide a file as the first argument"
  exit 1
fi

# check if file exists
if [ ! -f "$1" ]; then
  echo "File not found"
  exit 1
fi

while read -r line
do
  if [[ $line == "#### You:"* ]]; then
    # switch to counting "you" lines and increment prompts
    count_mode="you"
    ((prompts++))
    continue
  elif [[ $line == "#### ChatGPT:"* ]]; then
    # switch to counting "chatgpt" lines
    count_mode="chatgpt"
    continue
  fi

  if [[ $count_mode == "you" ]]; then
    ((you++))
  elif [[ $count_mode == "chatgpt" ]]; then
    ((chatgpt++))
  fi

  ((line_num++))

done < "$1"

echo "Prompts: $prompts"
echo "Lines you wrote: $you"
echo "Lines ChatGPT wrote: $chatgpt"

