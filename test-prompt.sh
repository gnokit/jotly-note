#!/bin/bash

# test-prompt.sh - Test Ollama prompts for Jotly note enhancement
# Usage: ./test-prompt.sh [title] [content]

set -e

# Default values
DEFAULT_TITLE="Meeting Notes Q3 Planning"
DEFAULT_CONTENT="We need to improve our product roadmap for Q3. Focus on user feedback integration and performance optimization. Key areas: mobile app responsiveness, API response times, and new feature rollout strategy. Timeline is tight with only 8 weeks left. Team resources are stretched thin."

# Use provided arguments or defaults
TITLE="${1:-$DEFAULT_TITLE}"
CONTENT="${2:-$DEFAULT_CONTENT}"

# Model to use
MODEL="gemma3:4b-it-qat"

echo "📝 Testing Ollama prompt for note enhancement..."
echo "📋 Title: $TITLE"
echo "📄 Content: $CONTENT"
echo "🤖 Model: $MODEL"
echo ""

# Create the prompt with improved language preservation
PROMPT="
Analyze the given note and provide a JSON response containing a concise, original title and richly formatted content, both in the exact same language as the input.

Instructions:
1. Evaluate the current title (<Current_Title/>):
   - If it is empty, generate a new concise and relevant title based on the content.
   - If it exists, improve or rewrite it to be distinct from the content and clearly summarize the note’s main idea without repeating full phrases verbatim from the content.
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
  \"title\": \"concise title here\",
  \"content\": \"formatted markdown content here\"
}

# Output Format

Provide a single JSON object as specified above.

- The "title" field must be a concise string that summarizes the note without repeating full content phrases verbatim.
- The "content" field must be a string containing the rewritten content with proper Markdown formatting.
- The entire response must be in the detected language without any translation or mixing of languages.

<Current_Title>
$TITLE
</Current_Title>

<Current_Content>
$CONTENT
</Current_Content>
"

# Check if ollama is available
if ! command -v ollama &> /dev/null; then
    echo "❌ Error: ollama command not found. Please install Ollama first."
    echo "   Visit: https://ollama.com/download"
    exit 1
fi

# Check if model is available
if ! ollama list | grep -q "$MODEL"; then
    echo "❌ Error: Model '$MODEL' not found."
    echo "   Run: ollama pull $MODEL"
    exit 1
fi

echo "🔄 Querying Ollama..."
echo ""

# Run ollama and format the output
RESPONSE=$(ollama run "$MODEL" "$PROMPT")

echo "✅ Response received:"
echo ""
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

echo ""
echo "🎯 Test complete!"
echo ""
echo "💡 To test with custom values:"
echo "   ./test-prompt.sh \"Custom Title\" \"Custom content here...\""