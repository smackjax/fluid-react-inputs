## Input UX test
### The idea
Create blocks of data that are singled out of their surroundings when edited.
* Clicking on the darkened background(or `digitizer`) attempts save
* Only returns a new value under its key if it's been changed
* Cannot save when there is an error message
* Doesn't save by tabbing when the input is composite(made up of a few inputs)

### To check it out
1. Download repo
2. `npm install`
3. `npm start`
4. Go bananas

#### Comments
This is still in prototypal stage, but it's definitely developed enough to show the idea.
That being said, you might find a couple prop options I didn't demonstrate, or funky variable names from past versions.
Bootstrapped with `create-react-app`
