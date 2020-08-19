# tsh-ducks-demo

This is just a selection of files from a project I worked on called The Student Hotel.
https://www.thestudenthotel.com/

It centers around the work I did on the modals, using React portals and Redux. As there were several modal style variants (fullscreen, prompt, dialog, etc) and modal uses we needed to have different components for each and track whether they were open or not. You can try the modals out by visiting the site and changing the language in the footer.

To keep things simple I've just added a few files from the original project.

- app.js
  - This is where the modal portal is, and ensures the modal can always show on every page. It has props passed from the store.
- reducers.js
  - This is the reducer combiner.
- modules/modal.js
  - This is the "Ducks" module for the modal Redux. Here are the actions, selectors and reducers. It's pretty simple and has no side effects, however these were done with Thunks in this project.
- components/modal/modal.js
  - This is the modal factory/container. There's quite a lot going on here! But essentially it's where the correct modal variant and contents is selected against whatever action was dispatched. eg the Language modal is fullscreen and loads the `06_language-selector.js` component.
- components/modal/base/base.js
  - This is a wrapper which shares functionality across all modals (much of it to make the modal more accessible): click outside to close, disable scroll, trap the focus, overlay background, etc.
- components/modal/variants
  - Contains the style variants. These are often just simple style wrappers.