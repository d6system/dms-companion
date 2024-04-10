module.exports = {
    name: "Apply Queue Filter",

    description: "Applies a Audio Filter to the Queue",

    category: ".Audio V2",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "guild",
            "name": "Server",
            "description": "Acceptable Types: Object\n\nDescription: The Server Queue of which you want to get Infos from.",
            "types": ["object", "undefined"],
            "required": true
        }
    ],

    options: [
        {
            "id": "preset",
            "name": "Filter Preset",
            "description": "Description: The Filter to apply to the Queue Audio",
            "type": "SELECT",
            "options": {
                1: "Rock",
                2: "Party",
                3: "Pop",
                4: "Techno",
                5: "Headphones",
                6: "Full Bass",
                7: "Full Bass Treble",
                8: "Full Treble",
                9: "Dance",
                10: "Club",
                11: "Classical",
                12: "Flat (None)",
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const preset = parseInt(this.GetOptionValue("preset", cache));
        const guild = this.GetInputValue("guild", cache);
        const { useQueue } = require("discord-player");
        const queue = useQueue(guild.id);
        const { EqualizerConfigurationPreset } = require("discord-player");

        switch (preset) {
            case 1:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Rock)
                break;
            case 2:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Party)
                break;
            case 3:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Pop)
                break;
            case 4:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Techno)
                break;
            case 5:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Headphones)
                break;
            case 6:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.FullBass)
                break;
            case 7:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.FullBassTreble)
                break;
            case 8:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.FullTreble)
                break;
            case 9:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Dance)
                break;
            case 10:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Club)
                break;
            case 11:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Classical)
                break;
            case 12:
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Flat)
                break;
        }

        this.RunNextBlock("action", cache);
    }
}