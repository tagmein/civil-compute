# Civil Compute

A platform for building software applications collaboratively.

## Running

`PORT=3344./run-server` will run the server on port 3344

Then visit http://localhost:3344/manage/ to view the management user interface

## Bot API

```
GET /

Response: {
  name: ’Bot name’,
  description: ‘Bot description’,
  keywords: [‘keyword’] // null or empty to match all messages
  config: [
    { key: string, label: string, placeholder: string, type: ‘string’|‘number’, required: boolean}
  ]
}
```

POST /install -> called when a bot is installed in a group

```
Body: {
  groupId: string,
  groupName: string,
  webhook: string,
  config: [ { key: string, value: string } ] // note that value is always a string, even if type was ‘number’
  [secret: string] // useful when needing verify bot was created by bot’s server
}
Response: { token: string } // represents a bot installed in a group
```

POST /reinstall -> called when a bot config is updated for a group

```
Authorization: Bearer <token>
Body: { config: [ { key: string, value: string } ] }
Response: 2xx OK

POST /uninstall -> called after bot was uninstalled from a group
Authorization: Bearer <token>
Response: 2xx OK

POST /message -> called when a message in the group matches the keyword(s)
Authorization: Bearer <token>
Body: { message: ‘A message ’ }
Response: { success: false|true, note: ‘Optional reason’, actions: [{ message: ‘Message to send to the group’ }] }
```

(POST is equal for the webhook for async actions)
