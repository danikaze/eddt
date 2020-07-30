# ed-tools

**_Elite Dangerous Tools_** is just a small app to detect and extract changes from your running session of the game by listening to changes in the game journal.

## Installation

Since this is just an early development version, [NodeJS](https://nodejs.org/) is required to run this tool, but [providing an executable is planned](https://github.com/danikaze/ed-tools/issues/12) (as well as [a UI](https://github.com/danikaze/ed-tools/issues/11)).

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

## Is it safe?

Completely!
It reads information provided by [Frontier](https://frontier.co.uk/) in the game intended to develop third party applications like [EDMC](https://github.com/EDCD/EDMarketConnector).

It only provides game of the game universe, nothing personal.
If you are curiours, you can check the content of the `Journal` files in the directory: `C:\Users\%userprofile%\Saved Games\Frontier Developments\Elite Dangerous`

## Change log

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
