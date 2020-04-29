const test = require('ava')
const parseArguments = require('./index')

test('parse an array with positional, named and flag arguments', t => {
	const { positional, named } = parseArguments('positional --flag --named1=val1 --named2 val2')
	t.deepEqual(positional, ['positional'])
	t.deepEqual(named, { named1: 'val1', named2: 'val2', flag: true })
})

test('named arguments can have spaces instead of names', t => {
	const { positional, named } = parseArguments('--namedArgument namedParam')
	t.deepEqual(named, { namedArgument: 'namedParam' })
})

test('positional arguments can appear in the middle', t => {
	const { positional, named } = parseArguments('positional1 --named1 val1 --named2=val2 positional2 --flag')
	t.deepEqual(named, { named1: 'val1', named2: 'val2', flag: true })
	t.deepEqual(positional, ['positional1', 'positional2'])
})

test('some other variations', t => {
	const { positional, named, warnings } = parseArguments('--named= val')
	t.is(warnings.length, 1)
})