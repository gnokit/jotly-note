export const getNoteImprovementPrompt = (title: string, content: string): string =>
  `Analyze the given note and provide a JSON response containing a concise, original title and richly formatted content, both in the exact same language as the input.

Instructions:
1. Evaluate the current title (<Current_Title/>):
   - If it is empty, generate a new concise and relevant title based on the content.
   - If it exists, improve or rewrite it to be distinct from the content and clearly summarize the note's main idea without repeating full phrases verbatim from the content.
   - Avoid using the exact same wording or entire sentences from the content as the title.
2. Rewrite the original content (<Current_Content/>) using rich Markdown formatting to enhance structure and readability:
   - Use Markdown headings of level 2 and level 3 (lines starting with '##' and '###'), bold, italics, and lists appropriately.
   - Do NOT use level-1 Markdown headings (lines starting with a single '#') in the content, as the title will serve as the main heading.
3. Detect the language of the input content precisely.
   - Your entire response must be in the exact same language as the detected input.
   - Do NOT translate or mix languages; maintain language consistency throughout.
   - For example: English input → English output; Traditional Chinese input → Traditional Chinese output; Japanese input → Japanese output.

Return a JSON object strictly matching this structure:
{
  "title": "concise title here",
  "content": "formatted markdown content here"
}

# Output Format

Provide a single JSON object as specified above.

- The "title" field must be a concise string that summarizes the note without repeating full content phrases verbatim.
- The "content" field must be a string containing the rewritten content with proper Markdown formatting.
- The entire response must be in the detected language without any translation or mixing of languages.

<Current_Title>
${title}
</Current_Title>

<Current_Content>
${content}
</Current_Content>`;