# dms-companion
A DM Server companion for PluralKit

This Discord bot can be used to create roles in your DM server for each of your alters so people can ping your alters seperately.
It also makes you a fronters widget so you can show who the current fronters are.

You want it hosted for you? Request a quote by e-mailing sales@gotitsystems.nl
You fine using the public version of the bot? https://discord.com/oauth2/authorize?client_id=1136788436628541490&permissions=8&scope=bot

# How to install
Compatible with: Windows/Linux/Mac.

Requirements:
- NodeJS
- npm

1. Create a bot in the Discord Developer Portal (Applicationname should always be: CompanionPK, botname doesn't matter.)
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
&setupmain
This command sets up the config files and folders for you
Example: &setupmain
```

```
/setupsys
This command sets your systemID from pluralkit.
Example: /setupsys exmpl
```

```
/setupfronter
This command sets the catergory name for your fronter widget
Example: /setupfronter Fronters
```

```
/reloadalters
This command will delete all roles that end in (alter). Then it will get your alterlist from pluralkit and create new roles with your current list.
So, when you have a new alter you do /reloadalters to recreate the list.
```

```
/help
Shows the version and help page of the ValkyriaBot™ code
```
