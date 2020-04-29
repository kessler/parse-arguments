# parse-arguments
A small lib for parsing command line arguments strings or arrays. E.g:

```['positional', '--flag', '--namedArgument', 'namedParam']```
or
```"positional --flag --namedArgument=namedParam"```

# Install
```
npm i -S @kessler/parse-arguments
```

# Example
```js
const parseArguments = require('@kessler/parse-arguments')

const { positional, named, flags, warnings } = parseArguments('positional --flag --named1 val1 --named2=val2')

// can providing an array also works
parseArguments(['positional', '--flag', '--namedArgument', 'namedParam'])
```