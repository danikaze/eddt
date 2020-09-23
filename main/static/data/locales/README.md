# Message Localization

This folder allow to provide translations for the messages generated based on the information of the game.

The syntax for each message is based on the [messageformat library](https://messageformat.github.io/messageformat/page-guide) but because it could be a bit complex, this document tries to provide a small summary on how to customize the translation messages.

First, is how the documents are organized:

- There's one file per language
- There's one string per info generator (Sometimes more than one can be used to provide multiple output based on the same input. See below)
- Each file is a [JSON](https://www.json.org/json-en.html) file like `{ key: translation }`, where the key is determined by the `InfoGenerator` and the translation can use the provided values. There's no detailed list for those values, since it could get out of sync with the code really quick, but test cases including all possible values are provided in [this file](../../scripts/test-locale/data.ts).

## Return values

Usually the given translation will be used to provide a single text for the event, but there are other options:

- An empty string can be used to ignore the event
- A simple text can be used to show information
- Multiple texts can be provided to simulate several outputs with the same input data. This is done appending a cardinal (starting on `1`) to the translation key.

i.e. if the key is called `bounty` we can provide `bounty1` and `bounty2` translation messages. Note that even if `bounty4` exists, it won't be used if `bounty3` is not present.

## Localization Example

Let's use a complex case like `bounty` as example because it provides several variables we can use. This message is triggered when the user destroys a _wanted_ ship providing a bounty. The provided data is the one in the following table:

| Data                        | Example         | Description                                 |
| --------------------------- | --------------- | ------------------------------------------- |
| `lastBountyReward`          | `45678`         | Numeric value of the reward in credits      |
| `sessionTotalBounty`        | `12345678`      | Numeric value of the session total rewards  |
| `cr`                        | `45,678 Cr`     | Formatted reward                            |
| `totalCr`                   | `12,345,678 Cr` | Formatted session total rewards             |
| `sessionTotalPiratesKilled` | `8`             | Total number of pirates killed this session |
| `lastBountyShip`            | `Krait MK-II`   | Name of the destroyed ship                  |

We can provide the following line in the [en.json](./en.json) file to show a simple message:

```
"bounty": "Pirate destroyed!"
```

But what if we want to show the data? We can enclose the variable name into brackets like this: `{variable}` to display its value:

```
"bounty": "We got {cr} for destroying that {lastBountyShip}!"
```

Sometimes if we want to show a message like this:

```
"bounty": "We have destroyed {sessionTotalPiratesKilled} pirates today"
```

we will confront the _pluralization problem_. That is, the previous string usually works well because it will show something like `We have destroyed 3 pirates today` but when the count is 1, we would like to display the word `pirate` instead of `pirates`.

That we can do using the following syntax: `{variableName, plural, one{translation for singular} other{translation for plural}}`.

Inside each translation we can use `#` to display the variable value.

And our previous example will result in the following result like this:

```
"bounty": "We have destroyed {sessionTotalPiratesKilled, plural, one{one pirate} other{# pirates}} today"
```

Following this sintax, we also have `selectordinal` instead of plural to do things like:

```
"bounty": "This is our {sessionTotalPiratesKilled, selectordinal, =1{1st} =2{2nd} =3{3rd} other{#th}} hunt of the day"
```

And given this possibilities, we are not limited to translating numbers. We can provide custom whole translations depending on the quantity like this:

```
"bounty": {sessionTotalPiratesKilled, plural, one{This is our first hunt today} other{We have destroyed # pirates already}}
```

For more examples, check the [default translation files](./en.json) and the [messageformat library documentation](https://messageformat.github.io/messageformat/page-guide).
