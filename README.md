# Moviepunk
Adobe Add-on for HackNJIT2024

## About

Moviepunks is an add-on for Adobe Express that allows users to effortlessly add probs, themes, borders, and even our own logo on their works!
- moviepunk-addon we scrapped and isn't the main project
- moviepunk is the main project!

We used the start sample code given to us by Adobe and built / expanded on to it:
https://www.youtube.com/watch?v=kSq4ykQGOdo

https://developer.adobe.com/express/add-ons/docs/guides/getting_started/

## Inspiration
Moviepunk stemmed from the thrill of Halloween movies and their amazing movie posters. We originally intended to make the add-on create movie posters that users can add images to, but we fell in love with how the add-on seamlessly fit into Adobe Express's functionality. Because of this, we expanded the project in scope and added various other helpful features.
## What it does
Moviepunk allows users to upload images, which they can integrate into their digital projects seamlessly. The add-on provides an intuitive interface for interacting with props and images, including their own images they had uploaded. Moviepunk also includes features like the ability to drag and drop images, resize images, and prepare images for use in Adobe Express. This add-on gives users a progress slider allowing them to keep track of their own progress as well as the ability to create their own checklist for their projects
## How we built it
The project was built using a combination of HTML, JavaScript, and the Adobe Express Add-On SDK. The user interface was structured using HTML, while JavaScript was utilized to handle file uploads, image processing, and user interactions. The Adobe SDK allowed us to integrate directly with Adobe’s tools, enabling features like dragging images into their projects easily.
## Challenges we ran into
Our largest challenge in Moviepunk was getting the images we had on file to initially load into the Adobe Express workspace. An additional challenge we rain into was drag-and-drop feature within the Adobe environment. We had to look at the SDK guides and tutorials in order to get the drag and drop feature to work.
## Accomplishments that we're proud of
As a team, we are proud of the work we did in creating a functional prototype that integrates well with Adobe Express. Our biggest accomplishments with Moviepunk were enabling users to upload their own custom images and implementing a checklist system to help users keep track of their tasks.
## What we learned
Throughout the development of Moviepunk, we learned a great deal in third-party SDKs especially those for Adobe Express. We gained insights into the process of making Add-ons for Adobe Express and the challenges that arises when making add-ons as a developer.
## What's next for Moviepunk
We hope to fully release this product when we are ready, and for others to enjoy the simple tool we made.

## Technology Used

-   HTML
-   TypeScript
-   CSS
-   Webpack

## Setup

1. To install the dependencies, run `npm install`.
2. To build the Add-on, run `npm run build`.
3. To start the Add-on, run `npm run start`.
