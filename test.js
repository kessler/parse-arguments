const test = require('ava')
const parseArguments = require('./index')

test('parse an array with positional, named and flag arguments', t => {
	const { positional, named, flags } = parseArguments('positional --flag --named1=val1 --named2 val2')
	t.deepEqual(positional, ['positional'])
	t.deepEqual(named, { named1: 'val1', named2: 'val2' })
	t.deepEqual(flags, ['flag'])
})

test('named arguments can have spaces instead of names', t => {
	const { positional, named, flags } = parseArguments('--namedArgument namedParam')
	t.deepEqual(named, { namedArgument: 'namedParam' })
})

test('positional arguments can appear in the middle', t => {
	const { positional, named, flags } = parseArguments('positional1 --named1 val1 --named2=val2 positional2 --flag')
	t.deepEqual(named, { named1: 'val1', named2: 'val2' })
	t.deepEqual(positional, ['positional1', 'positional2'])
	t.deepEqual(flags, ['flag'])
})

test.only('some other variations', t => {
	const { positional, named, flags } = parseArguments('--named= val')
	t.deepEqual(named, { named: 'val' })
})