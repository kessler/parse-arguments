# parse-arguments
A small lib for parsing command line arguments strings or arrays. E.g:

```"positional --flag --namedArgument=namedParam"```

# Install
```
npm i -S @kessler/parse-arguments
```

# Example
```js
const parseArguments = require('@kessler/parse-arguments')

const { positional, named, warnings } = parseArguments('positional --flag --named1 val1 --named2=val2')

// an array works too:
parseArguments(['positional', '--flag', '--namedArgument', 'namedParam'])
```