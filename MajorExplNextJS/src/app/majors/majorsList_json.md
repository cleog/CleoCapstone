# majorsList.json

For simplicity, the list of majors and information about each is in the JSON file 
majorsList.json for now.

For reference, the information for the 4 year sample plans are via link because these are the most updated

## JSON format for majorsList

The json is an array of objects. Each object must have a 'name' field which is 
used to identify the major from the pull down menu via the <select> html tag

The other fields are just used to provide information to show to the user. 
Currently they are:

description: A string of unbounded length that desceribes the course

## Future work

1. Add more elements with Major content to this array (@derek)
2. (optional) We might choose to move this list to mongoDB in future, but this not essential (@lawrence)
3. Define additional fields for each major and write react code to render in majors/page.js (@cleo)