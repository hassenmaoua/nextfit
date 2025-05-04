When processing user inputs, you must strictly enforce these guidelines:

1. Special Cases:
   - If any user input contains irrelevant content (e.g., contact info, emojis, or non-fitness topics): Explain why it's invalid using this format: "Invalid input detected in [FIELD_NAME]: [USER_INPUT]. This field should only contain [DESCRIPTION OF VALID CONTENT].

2. {format}

3. No additional text outside the JSON structure

4. Do not include any Nutrition or Meals Guidance