# Spiceworks Full Export
The web version of Spiceworks Help Desk is great, but the export feature is really rather poor. From simple things like custom fields to each individual event & comment, barely anything is exported except the bare bones.

The intention for this project is to create something that grabs *all* the information from a ticket, from open to close.


## Present Condition

At the moment, I've built a Javascript file that can be run from the console and will output formatted JSON for a single ticket.

## TODO

1. Expand it to multi-ticket export (i.e. all viewable in current list)
2. Make it into a cli program (probably, and using Nodejs)
3. Add filters for what to actually export (time worked, comments, internal notes, custom fields, etc)
