const getNotes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');
const log = console.log;

// log(name);
// log(chalk`{bold.red.inverse Error!!!}`);

// const miles = 18;
// const calculateFeet = miles => miles * 5280;

// console.log(chalk`
// 	There are {bold 5280 feet} in a mile.
// 	In {bold.cyan ${miles} miles}, there are {magenta.bold ${calculateFeet(miles)} feet}.
// `);

// Customize the application version
yargs.version('1.1.1');

// Creating commands for add , remvoe , read and list
yargs.command({
	command: 'add',
	describe: chalk.cyan('Add a new note!'),
	builder: {
		title: {
			describe: chalk.magenta('Note Title'),
			demandOption: true,
			type: 'string'
		},
		body:{
			describe: chalk.blue('Note Body'),
			demandOption: true,
			type: 'string'
		},
		index:{
			describe: chalk.blue('Stores the index of the notes'),
			demandOption:false,
			type: 'number'
		}
	},
	handler: (argv) => {
		log(chalk.green('Title: '+ argv.title +'\n'+ chalk.blue('Body: ' +argv.body)));
		getNotes.addNotes(argv.body,argv.title);
	}

})

yargs.command({
	command: 'remove',
	describe: chalk.cyan('Removing a note from the app'),
	builder: {
		title: {
			describe: chalk.blue('Note title to be removed'),
			demandOption: true,
			type: 'string'
		}
	},
	handler: (argv) => {
		getNotes.removeNotes(argv.title);
	}
})

yargs.command({
	command: 'read',
	describe: chalk.cyan('Reading the notes from the app'),
	builder: {
		title: {
			describe: chalk.cyan('Title of the note to read from'),
			demandOption: true,
			type: 'string'
		}
	},
	handler: (argv) => {
		getNotes.readNotes(argv.title);
		log(chalk.magenta('Reading the notes from the app'))
	}
})

yargs.command({
	command : 'list',
	describe : chalk.cyan('List the notes from the app'),
	handler: () => {
		log(chalk.yellow('Notes listed!!!'));
		getNotes.listNotes();
	}
})

yargs.parse();