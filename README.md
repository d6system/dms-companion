# dms-companion
A DM Server companion for PluralKit

This Discord bot can be used to create roles in your DM server for each of your alters so people can ping your alters seperately.

# How to install
Compatible with: Windows/Linux/Mac.

Requirements:
- NodeJS
- npm

1. Create a bot in the Discord Developer Portal
2. Install Node JS 18.14.2 and npm
3. Unzip the release file
4. Go into the folder with your command line and run:
```
npm i
```
5. Go to the data folder and insert your bot token to token.txt.
6. Go back to the main folder and run:
```
node bot.js
```

# Commands
```
/setsystem {argument}
This command sets your systemID from pluralkit.
Example: %setsystem exmpl
```

```
/reloadalters
This command will delete all roles that end in (alter). Then it will get your alterlist from pluralkit and create new roles with your current list.
So, when you have a new alter you do %reloadalters to recreate the list.
```
