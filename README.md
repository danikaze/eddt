# EDDT

**_Elite Dangerous Desktop Tools_** is just a small app to detect and extract changes from your running session of the game by listening to changes in the game journal.

## Installation

Since this is just an early development version, [NodeJS](https://nodejs.org/) is required to run this tool, but [providing an executable is planned](https://github.com/danikaze/eddt/issues/12) (as well as [a UI](https://github.com/danikaze/eddt/issues/11)).

For now, source code needs to be built after being downloaded

```
npm run build
```

And then it can be run like this anytime:

```
npm run start
```

## Architecture

All the processing is split in several phases.

There's a singleton [EventManager](src/ed/event-manager.ts) and a singleton [DataManager](src/ed/data-manager.ts).

- The `EventManager` is listening to the Elite Dangerous Journal file and triggers [events](src/ed/interfaces.ts) when they happen.
- The `DataManager` listens to those events through the [EventProcessors](src/event-processors) and update the _data library_, which is accessible from other parts of the code as well. When any data is updated, an event is triggered so actions can be taken.
- The next step is done by the [InfoGenerators](src/info-generators), which create texts that can be used some way (usually piped to a [file writer](src/outputters/write-file.ts) instance)
- The last step is done by the [Outputters](src/outputters), which accept strings (provided by the `InfoGenerators`) and do something with them, so they are usable by external programs (such as [OBS](https://obsproject.com/)).

### Notes

`DataManager` listen to game Events (triggered by `EventManager`), and since those Events could affect more than one data at the same time, the events triggered by the `DataManager` are done after all the updates are finished, providing as well the timestamp, so the `InfoGenerators` don't run several times for the same update.

Some `Outputters` could act as a _middle-ware_ for `Outputters` as well. (i.e. the [Rotator](src/outputters/rotator.ts) accepts several `InfoGenerators` and manages the info outputting it into only one file via another piped `Outputter`)

There are [middlewares](src/info-generators/middleware) for the `InfoGenerators` as well. They take the incoming data and can cancel the generation (by returning `undefined` or returning a modified version of the data itself)

## Is it safe?

Completely!
It reads information provided by [Frontier](https://frontier.co.uk/) in the game intended to develop third party applications like [EDMC](https://github.com/EDCD/EDMarketConnector).

It only provides game of the game universe, nothing personal.
If you are curiours, you can check the content of the `Journal` files in the directory: `C:\Users\%userprofile%\Saved Games\Frontier Developments\Elite Dangerous`

## Configuration

Yes, some settings are required to make this app work! But from version 0.5.0 this is possible to be configured using [settings.json](static/settings.json) (or `settings.js` with `module.exports` would work too).

This is the list of all settings available so far (settings without a default are required)

### Root level

| Setting           | Description                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| locale            | Language to use from an [available localization file](static/locales), as the file name without extension. Default: `en`                                     |
| displaySettings   | If `true`, settings being used will be displayed when starting the app. Default: `false`                                                                     |
| displayFinalData  | If `true`, all the available data from the events will be displayed when exiting the app. Default: `false`                                                   |
| eventManager      | Settings related to the ED Event Manager ([EventManager options](#eventmanager-options))                                                                     |
| navFilePath       | Path to the file where the navigation information will be written. If specified, the folder must exist but can left blank to not outputting this information |
| navFileOptions    | Options related to the navigation information ([WriteFileOutputter options](#writefileoutputter-options))                                                    |
| eventsFilePath    | Path to the file where the events information will be written. If specified, the folder must exist but can left blank to not outputting this information     |
| eventsFileOptions | Options related to the events information ([WriteFileOutputter options](#writefileoutputter-options))                                                        |

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
