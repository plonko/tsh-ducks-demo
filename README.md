# tsh-ducks-demo

This is just a selection of files from a project I worked on called The Student Hotel.
https://www.thestudenthotel.com/

It centers around the work I did on the modals, using React portals and Redux. As there were several modal style variants (fullscreen, prompt, dialog, etc) and modal uses we needed to have different components for each and track whether they were open or not.

Specifically, the there were two variations of the language selection modal -
1. A _dialog modal_ to be shown on page load if a language could not be set automatically.
1. A _fullscreen modal_ to be shown when the user clicked a button in the footer to manually set the language.

You can try the fullscreen modal out by visiting the live site and changing the language in the footer.

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
- components/c01.09_footer/site-footer-renderer.js
  - This component is a container for the footer component, and passes down as a prop the click handler to dispatch the action which opens the Language selection modal when the language selection button is clicked in the footer.
- modules/global.js
  - This is another Redux Ducks module, to set all the global site data. I've stripped out everything except the language setting code. In summary, it makes several checks to determine which language to set the site to, if it can't be determined it will show a language selector modal. Once a language has been selected it sets this in localstorage for next time. It uses Thunks to set the language.
  The checks include:
    - check localstorage,
    - check the url path for a valid language the site is supported in
    - check the browser language against the same list
- routes.js
  - The set language action is called here if there is a language in the url path