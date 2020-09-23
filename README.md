# EDDT

**_Elite Dangerous Desktop Tools_** is just a small app to detect and extract changes from your running session of the game by listening to changes in the game journal.

## Installation

[Download](https://github.com/danikaze/eddt/releases/latest) the installer and execute it. It will automatically install the application in the `%USERPROFILE%\AppData\Local\Programs\eddt` folder and create a Desktop shortcut.

It can be uninstalled as a regular Windows application, from the `Add or remove programs` menu.

**Alternative:** Download the unpacked version, unzip it and execute it from your preferred location without installing it.

## Architecture

All the processing is split in several phases.

There's a singleton [EventManager](main/ed/event-manager.ts) and a singleton [DataManager](main/ed/data-manager.ts).

- The `EventManager` is listening to the Elite Dangerous Journal file and triggers [events](main/ed/events.ts) when they happen.
- The `DataManager` listens to those events through the [EventProcessors](main/event-processors) and update the _data library_, which is accessible from other parts of the code as well. When any data is updated, an event is triggered so actions can be taken.
- The next step is done by the [InfoGenerators](main/info-generators), which create texts that can be used some way (usually piped to a [file writer](main/outputters/write-file.ts) instance)
- The last step is done by the [Outputters](main/outputters), which accept strings (provided by the `InfoGenerators`) and do something with them, so they are usable by external programs (such as [OBS](https://obsproject.com/) with a _Text Source_ reading the contents from file).

### Notes

`DataManager` listen to game Events (triggered by `EventManager`), and since those Events could affect more than one data at the same time, the events triggered by the `DataManager` are done after all the updates are finished, providing as well the timestamp, so the `InfoGenerators` don't run several times for the same update.

Some `Outputters` could act as a _middle-ware_ for `Outputters` as well. (i.e. the [Rotator](main/outputters/rotator.ts) accepts several `InfoGenerators` and manages the info outputting it into only one file via another piped `Outputter`)

There are [middlewares](main/info-generators/middleware) for the `InfoGenerators` as well. They take the incoming data and can cancel the generation (by returning `undefined` or returning a modified version of the data itself)

## Is it safe?

Completely!
It reads information provided by [Frontier](https://frontier.co.uk/) in the game intended to develop third party applications like [EDMC](https://github.com/EDCD/EDMarketConnector).

It only provides game of the game universe, nothing personal.
If you are curiours, you can check the content of the `Journal` files in the directory: `C:\Users\%userprofile%\Saved Games\Frontier Developments\Elite Dangerous`

## Configuration

Yes, some settings are required to make this app work! But from version 0.5.0 this is possible to be configured using [settings.json](main/static/settings.json) (or `settings.js` with `module.exports` would work too). This file will be available in the `data` directory inside the application **after** its first execution.

This is the list of all settings available so far (settings without a default are required)

### Root level

| Setting             | Description                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| locale              | Language to use from an [available localization file](static/locales), as the file name without extension. Default: `en`                                     |
| displaySettings     | If `true`, settings being used will be displayed when starting the app. Default: `false`                                                                     |
| displayFinalData    | If `true`, all the available data from the events will be displayed when exiting the app. Default: `false`                                                   |
| eventManager        | Settings related to the ED Event Manager ([EventManager options](#eventmanager-options))                                                                     |
| navFilePath         | Path to the file where the navigation information will be written. If specified, the folder must exist but can left blank to not outputting this information |
| navFileOptions      | Options related to the navigation information ([WriteFileOutputter options](#writefileoutputter-options))                                                    |
| eventsFilePath      | Path to the file where the events information will be written. If specified, the folder must exist but can left blank to not outputting this information     |
| eventsFileOptions   | Options related to the events information ([WriteFileOutputter options](#writefileoutputter-options))                                                        |
| gameModeFilePath    | Path to the file where the game mode will be written. If specified, the folder must exist but can left blank to not outputting this information              |
| gameModeFileOptions | Options related to the game mode information ([WriteFileOutputter options](#writefileoutputter-options))                                                     |

### EventManager options

| Setting       | Description                                                                                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| journalFolder | Folder where `.journal` files are. Default: `C:\Users\%userprofile%\Saved Games\Frontier Developments\Elite Dangerous`                                                                                                                                     |
| verbose       | If `false`, misc. information won't be displayed. Default: `true`                                                                                                                                                                                          |
| logEvents     | Array of `'used'` or `'unused'`. Shows when one event is detected. Default: `[]`                                                                                                                                                                           |
| ignoreBefore  | Events generated more than the especified number (in milliseconds) won't generate any output. This avoid generating a big queue of events when opening the app in the middle of the game instead of opening it at the start. Default: `30000` (30 seconds) |

### WriteFileOutputter options

| Setting      | Description                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| verbose      | If `true` it will log the content being outputted to the file every time it changes. Default: `false` |
| clearOnStart | If `true`, the file will be emptied when the app is opened. Default: `true`                           |
| clearOnEnd   | If `true`, the file will be emptied when the app is closed. Default: `true`                           |

## Change log

### 0.7.0

- Provide an executable for easy execution
- Added info generator: `Distance`
- Differenciate when killing skimmers from pirates, allowing to use different texts for it

### 0.6.0

- Added info generators: `LoadData`, `Scan`, `FactionKillBond`
- Fixed: `DockingRequested`, `DockingGranted`, `DockingDenied` events not being loaded

### 0.5.0

- Added localization for messages
- Added settings file

### 0.4.0

- Add info generators for `BodiesApproached`, `BodiesLeft`, `MissionsAccepted`, `MissionsCompleted`, `MissionsFailed`, `MissionsAbandoned`, `DockingRequested`, `DockingGranted`, `DockingDenied`, `InterdictionsEscaped`, `InterdictionsLost`, `InterdictionsSubmitted`, `Bounty`, `JumpDistance`, `MaterialsCollected`, `MiningRefined`, `ProspectedAsteroids` and `LaunchedDrones`
- Refactor middleware usage for `EventManager`, `InfoGenerator` and `Outputter`
- Refactor `EventManager` to provide events even if they are old (to be able to keep track of changes), and use the new `DataManager.eventsEnabled` instead
- `DataManager` final content is shown when exiting the app

### 0.3.0

- Perform proper cleanup on exit
- Added Outputter middleware `TextSpacer`
- Fixed minor bugs introduced in 0.2.0
- OutputRotator tunning
- Added `isOld` and `middleware` options in `EventManager`
- Define which events are old so they are not processed in case the app is opened in the middle of the game (avoid over queuing old events)

### 0.2.0

- Refactor the process flow to work like `Game Events` > `Data management` > `Info generation` > `Output`
- Added new events (`Scanned`, `HeatWarning`, `Bounty`, `ShipTargeted`) rotating into `events.txt`

#### 0.2.1

- Don't use already shutdown Journal files
- Properly detect the Journal file even when the app is executed before the game is opened

### 0.1.0

- First version to test the PoC
- Available events
  - Navigation ones (`NavRoute`, `FSDJump`, `Docked`, `Undocked`, `ApproachBody`, `LeaveBody`) into `nav.txt`
