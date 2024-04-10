module.exports = {
    name: "Parse Message for URL",
    description: "Parses a message to get a URL from it and separates into URL and other text.",
    category: "Message Stuff",
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The input text that may contain a URL.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],
    options: [],  // Removed conversion_type option since no longer needed
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "content",
            "name": "Content",
            "description": "Type: Text\n\nDescription: The content obtained.",
            "types": ["text"]
        },
        {
            "id": "detected_url",
            "name": "Detected URL",
            "description": "Type: Text\n\nDescription: The isolated URL from the input text, if found.",
            "types": ["text"]
        }
    ],
    async code(cache) {
        const textInput = this.GetInputValue("text", cache) + "";

        // Regular expression to match URLs in the input text
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const matchedUrls = textInput.match(urlRegex);
        let content = textInput;
        let detectedUrl = null;

        if (matchedUrls && matchedUrls.length > 0) {
            // If URLs are found in the input, isolate the first URL
            const firstUrl = matchedUrls[0];
            content = content.replace(firstUrl, "").trim(); // Remove the first URL from the content
            detectedUrl = firstUrl; // Store the detected URL
        }

        // Store both content and detected URL in outputs
        this.StoreOutputValue(content, "content", cache);
        this.StoreOutputValue(detectedUrl, "detected_url", cache);

        this.RunNextBlock("action", cache);
    }
}

