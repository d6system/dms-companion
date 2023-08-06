module.exports = {
    name: "Rich Presence Update [Event]",

    description: "When a rich presence is updated, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "old_member",
            "name": "Old Member",
            "description": "Type: Object\n\nDescription: The member before its rich presence update.",
            "types": ["object"]
        },
        {
            "id": "new_member",
            "name": "New Member",
            "description": "Type: Object\n\nDescription: The member after its rich presence update.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("presenceUpdate", (old_presence, new_presence) => {
            const member1 = old_presence.member;
            this.StoreOutputValue(Object.defineProperty(Object.assign(Object.create(member1), member1), "presence", {value: old_presence, writable: false}), "old_member", cache);
			this.StoreOutputValue(new_presence.member, "new_presence", cache);
            this.RunNextBlock("action", cache);
        });
    }
}