import { program } from 'commander'
import {
	addContact,
	getContactById,
	listContacts,
	removeContact,
} from './contacts.js'
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone')

program.parse()

const options = program.opts()

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			const data = await listContacts()
			console.table(data)
			break

		case 'get':
			if (!id) {
				console.error('Please provide user id.')
				return
			}
			console.table(await getContactById(id))
			break

		case 'add':
			console.table(await addContact(name, email, phone))
			break

		case 'remove':
			console.table(await removeContact(id))
			break

		default:
			console.warn('\x1B[31m Unknown action type!')
	}
}

invokeAction(options)
