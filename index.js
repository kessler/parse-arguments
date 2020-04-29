const { isString } = require('util')

module.exports = parseArguments

/**
 *    
 *    @param  {String|Array<String>} args
 *    @param  {Object} result - internal 
 *    @return {Object}
 */
function parseArguments(
	args,
	result = {
		warnings: [],
		positional: [],
		named: {},
		flags: []
	}) {

	if (isString(args)) {
		args = args.split(' ')
	}
	console.log(args)
	if (args.length === 0) return result

	let part = args[0]
	if (!isNamedArgumentPart(part)) {
		result.positional.push(part)
		return parseArguments(args.slice(1), result)
	}

	if (part.startsWith('--')) {
		part = part.substr(2)
	} else {
		part = part.substr(1) // starts with just one hyphen ( - )
	}
	
	if (part.includes('=')) {
		let [name, value] = part.split('=')
		if (value === '') {
			warnings.push(`the named argument "${name} was declared with an equal sign but a value was not detected`)
		}
		result.named[name] = value
		return parseArguments(args.slice(1), result)
	}

	const nextPart = args[1]
	if (!nextPart || isNamedArgumentPart(nextPart)) {
		result.flags.push(part)
		return parseArguments(args.slice(1), result)
	}

	result.named[part] = nextPart
	return parseArguments(args.slice(2), result)
}

function isNamedArgumentPart(part) {
	return part.startsWith('-')
}
