[Check on Netlity](https://js-swapi-react.netlify.app/)

To run locally: `npm install && npm start` 

# ASSIGNMENT
## Step1: Films list
Write a web app that uses the Star wars API (SWAPI) to display list of films about the StarWars universe.

The app must render a UI that displays all the movies with at least the
• Title of the movie
• Opening story ( opening_crawl )
• Release Date

Your app should display this information on a nice layout that you see fit for the purpose.

Extra Points:
• Display more film data than we expect
• Animate the opening crawl
• Make your layout fit for Step 2

## Step 2: Design UI
For Step 2 we would like you to implement Step 1, by following the mockup we provide you on the Appendix of this document. 

What you see on the Appendix in a nutshell is a design where every movie is rendered with “More info” link where in its collapsed state displays only the movie Title. When clicking on the tittle bar the description is expanded and you see the rest of the data. 
On the box were you display the data of step 1 we want you to display the characters that appear on the movie and lay them out 3 per row. 

On every box that a character is displayed we want to see
• the name of the character,
• the spieces names that he belongs to and
• the planet name he came from
• the vehicle names he used on the film
• the starship names he used on the film

Feel free to choose at least 3 of these properties with at least the name of the character

## Step 3: People search page*
1. User would like to be enter character name into search box and see filtered list of characters. No list displayed until <= 3 characters in search bar.
2. User info contains links to films the user appears in.Other info from API is also displayed, but films are important for next step.
3. Clicking on a link will allow user to see information on that film (new page? or expanding element?).
4. Mobile mode: single column list display of character information. Desktop: 3 column grid of info.

## Minimum Expectations
An application that is implementing Step 1 as close as possible to the mock-up of the appendix.
If your application is functional and shows the data we want, but not particularly follows the provided design we will judge your design ability as well.

UNIT TESTS
We want to see how well you can protect and compartmentalize your code in order to be unit testable and of course tests that can cover the most essential parts of your code.

UI
Feel free to use any UI Library you feel comfortable with. ( i.e. Material-UI, React-Bootstrap, Semantic-UI, etc.)

STATE MANAGEMENT
Feel free to use any state management library you prefer. (i.e. Redux, Mobx, etc.)