module.exports= {
    name: "Extract Time From Argument",

    description: "Extracts the Numbers from each component Example (1w5d15h20s)",

    category: "Daily's",

    inputs: [
    {
        id: "action",
        name: "Action",
        description:"you know this already",
        types: ["action"]
    },
    {
        id: "rawtime",
        name: "Raw Time",
        description: "Must be in (1w5d15h20s) Format",
        types: ["Text", "unspecified"],
        required: true
    },
    ],

    options: [],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "you must be stupid if you dont know this already",
            types: ["action"]
        },
        {
            id: "extractedtime",
            name: "In Object Form",
            description: "The extracted time in a object format like/n/r { weeks: 'number', days: 'days', hours: 'hours', seconds: 'seconds'} ",
            types: ["object"]
        },
        {
            id: "days",
            name: "Days+(Weeks) Combined",
            description: "yes",
            types: ["number", "unspecified"]
        },
        {
            id: "hours",
            name: "Hours",
            description: "yes",
            types: ["number", "unspecified"]
        },
        {
            id: "minutes",
            name: "Minutes",
            description: "yes",
            types: ["number", "unspecified"]
        },
        {
            id: "seconds",
            name: "Seconds",
            description: "yes",
            types: ["number", "unspecified"]
        }
    ],

    async code(cache) {

        
        function separateAndExtract(inputString) {
            console.log("Input string:", inputString);
            
            // Separate the input string into components
            const components = inputString.match(/[0-9]+[wdhms]/g);
            
            console.log("Components:", components);
            
            if (!components) {
                console.error("Invalid input string format");
                return;
            }
            
            // Extract numbers from each component
            const extractedNumbers = {};
            
            components.forEach(component => {
                const numberMatch = component.match(/[0-9]+/);
                const unitMatch = component.match(/[wdhms]/);
                
                if (numberMatch && unitMatch) {
                    const number = parseInt(numberMatch[0]);
                    const unit = unitMatch[0];
                    
                    switch (unit) {
                        case 'w':
                            // Convert weeks to days and add to existing days
                            extractedNumbers.days = (extractedNumbers.days || 0) + (number * 7);
                            break;
                        case 'd':
                            extractedNumbers.days = (extractedNumbers.days || 0) + number;
                            break;
                        case 'h':
                            extractedNumbers.hours = (extractedNumbers.hours || 0) + number;
                            break;
                        case 'm':
                            extractedNumbers.minutes = (extractedNumbers.minutes || 0) + number;
                            break;
                        case 's':
                            extractedNumbers.seconds = (extractedNumbers.seconds || 0) + number;
                            break;
                        default:
                            console.error(`Unknown unit: ${unit}`);
                    }
                }
            });
            
            console.log("Extracted numbers:", extractedNumbers);
            
            return extractedNumbers;
        }
        
        // Assuming this.GetInputValue retrieves the value of an input field
        const inputString = this.GetInputValue("rawtime", cache);
        console.log("Input String:", inputString);
        
        const extractedNumbers = separateAndExtract(inputString);
        
        if (extractedNumbers) {
            console.log("Extracted numbers:", extractedNumbers);
            this.StoreOutputValue(extractedNumbers, "extractedtime", cache);
            this.StoreOutputValue(extractedNumbers.days, "days", cache);
            this.StoreOutputValue(extractedNumbers.hours, "hours", cache);
            this.StoreOutputValue(extractedNumbers.minutes, "minutes", cache);
            this.StoreOutputValue(extractedNumbers.seconds, "seconds", cache);
            this.RunNextBlock("action", cache);
        }
    }
}