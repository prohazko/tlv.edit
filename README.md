tlv.edit
========

Very basic TLV editor written in TypeScript and Angular.js.

It doesn't support (now) any existing structure parsing or tag recognition

Dependencies
------------
* jQuery
* Angular.js
* TypeScript typings

Paste following in VS Package Manager Console to install dependencies:

`([xml](cat packages.config)).packages.package | %{  Install-Package -id $_.id -version $_.version ; Update-Package -reinstall -id $_.id }`

Yeah, I know ...
