module.exports = {
    name: "Render Minecraft Skin",

    description: "Renders Minecraft:Java Edition Skin",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "username",
            "name": "Username",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The username to render the skin.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "size",
            "name": "Size",
            "description": "Acceptable Types: Number\n\nDescription: The Size of The Render (in pixels). Default is 256.",
            "types": ["number"]
        },
        {
            "id": "type",
            "name": "Slim?",
            "description": "Acceptable Types: Boolean, Text\n\nDescription: Is Skin Slim (Alex)?",
            "types": ["boolean", "text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "rendertype",
            "name": "Render Type",
            "description": "Description: The Render Tyoe.",
            "type": "SELECT",
            "options": {
                1: "2D Face",
                2: "2D Front",
                3: "2D Full",
                4: "3D Head",
                5: "3D Bust",
                6: "3D Full"
            }
        },
        {
            "id": "username",
            "name": "Username",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The username to render the skin.",
            "type": "text"
        },
        {
            "id": "size",
            "name": "Size",
            "description": "Acceptable Types: Number\n\nDescription: The Size of The Render (in pixels). Default is 256.",
            "type": "text"
        },
        {
            "id": "angle",
            "name": "Angle",
            "description": "Acceptable Types: Number\n\nDescription: The Angle of The Render (in degrees). Default is 0. Max 360.",
            "type": "number"
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
            "id": "output",
            "name": "Render URL",
            "description": "Type: Unspecified, List, Number, Text, Boolean\n\nDescription: The Render URL.",
            "types": ["unspecified", "list", "number", "text", "boolean"]
        }
    ],

    code(cache) {
        const username = this.GetInputValue("username", cache, false, undefined) || this.GetOptionValue("username", cache, false, undefined);
		const size = this.GetInputValue("size", cache, false, undefined) || this.GetOptionValue("size", cache, false, undefined) || 256;
		const angle = this.GetOptionValue("angle", cache, false, 0);
        const option = parseInt(this.GetOptionValue("rendertype", cache));
        const type = this.GetInputValue("type", cache);
		const skintype = type!=undefined ? type : true;
		const skintypen = type ? '&wide' : '&slim';
        let result;
        switch(option) {
            case 1:
                result = "https://visage.surgeplay.com/face/";
                break;
            case 2:
                result = "https://visage.surgeplay.com/front/";
                break;
            case 3:
                result = "https://visage.surgeplay.com/full/";
                break;
            case 4:
                result = "https://visage.surgeplay.com/head/";
                break;
            case 5:
                result = "https://visage.surgeplay.com/bust/";
                break;
            case 6:
                result = "https://visage.surgeplay.com/full/";
                break;
        }
		result = result+size+"/"+username+"?y="+angle+skintypen;
		this.StoreOutputValue(result, "output", cache);
        this.RunNextBlock("action", cache);
    }
}