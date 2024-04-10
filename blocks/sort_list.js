module.exports = {
    name: "Sort List",

    description: "Sorts a List by a Keyword or Number",

    category: "List Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "list",
            "name": "List",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to reverse.",
            "types": ["list", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "sorttype",
            "name": "Sort Type",
            "description": "The Way you want the List sorted!",
            "type": "SELECT",
            "options": {
                "number": "By Number [1, 2, 3, ..]",
                "text": "By Text ['apple', 'banana', 'kiwi', ..]",
                "propertys": "By Property String (Requires Object List)",
                "propertyn": "By Property Number (Requires Object List)",
                "globalsort": "Globalsort (May do nothing...)"
            }
        },
        {
            "id": "property",
            "name": "Sort Property",
            "description": "The Property to sort the List, if 'By Property' is selected as Type",
            "type": "TEXT"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "list",
            "name": "List",
            "description": "Type: List\n\nDescription: The list reversed.",
            "types": ["list"]
        }
    ],

    code(cache) {
        var list = this.GetInputValue("list", cache);
        const sorttype = this.GetOptionValue("sorttype", cache);

        if (sorttype == "number") {
            list.sort((a, b) => a - b);
        } else if (sorttype == "text") {
            list.sort((a, b) => {
                const nameA = a.toUpperCase(); // ignore upper and lowercase
                const nameB = b.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        } else if (sorttype == "propertys") {
            const prop = this.GetOptionValue("property", cache);
            if (prop !== "") {
                list.sort((a, b) => {
                    const nameA = a[prop].toUpperCase(); // ignore upper and lowercase
                    const nameB = b[prop].toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });
            }
        } else if (sorttype == "propertyn") {
            const prop = this.GetOptionValue("property", cache);
            if (prop !== "") {
                list.sort((a, b) => a[prop] - b[prop]);
            }
        } else if(sorttype == "globalsort") {
            list.sort();
        }

        this.StoreOutputValue(list, "list", cache);
        this.RunNextBlock("action", cache);
    }
}