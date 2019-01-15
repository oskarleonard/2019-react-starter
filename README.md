## Setup
### DEVELOPMENT
1. `npm i`
2. `npm run dev`
### PRODUCTION
1. `npm i`
2. `npm run buildscript`
2. `npm run prod`

## EDITORS
#### WEBSTORM SETUP
0. Make sure you have done `npm i`
0. eslint/prettier:
    - Go to: Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint
    - Check enable and automatic search
1. Arrange imports automatically: 
    - Go to: Preferences | Editor | Code Style | JavaScript 
    - Checking Sort imports by modules on the Import tab. https://blog.jetbrains.com/webstorm/2018/05/optimize-imports-in-webstorm/
2. Use webpack for module resolves
    - Go to: Preferences | Languages & Frameworks | JavaScript | Webpack 
    - Chose the file `/webpack/client.dev.js`
3. Set some hotkeys
    - Go to: Preferences | Keymap
    - search for "Fix ESLint Problems" and assign a hotkey for easy reformatting. I use `cmd + alt + shift + e`.
4. After you have run `npm run dev` and `npm run prod` you will have to folders: _build_dev and _build_prod
    - Right click on them and click "Mark directory as" -> "Excluded"
5. Make sure you set REACT JSX as javascript version
    - Preferences | Languages & Frameworks | JavaScript
    
#### YOUR EDITOR SETUP
If you set up using another editor please document the process here.

## Guidelines
General principles:
1. Dont overengineer your components with if else statements, rather create two components.
2. It should be easy to know which code and redux-state is shared across many components/pages/containers.
3. Use themeStyle for all html elements which is specified in the design guidelines (Titles, BreadText, Buttons, etx..).
4. Make your code as pure as possible. `pure vs impure functions javascript`. 
    - The splice method (impure) changes the original array and slice (pure) method doesn’t change the original array.
5. Use descriptive variable and function names, dont be afraid to use long names. Write a comment if you feel that the function requires a description.

### State
##### Redux Vs React
- Persistant state (which should survive browser back and forward navigation): Redux
- Global state (state between different pages): Redux
- Page specific state which should be clenaed on `componentDidUnmount`: React state 

##### React State
State in a variable or not?
```
const MOBILE_MENU_STATES = {
  NOT_RENDERED: 0,
  HIDDEN: 1,
  VISIBLE: 2,
};

class MainHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenu: MOBILE_MENU_STATES.NOT_RENDERED,
    };
  }
```
Use a variable if:
1. You need to reset the state to the initial state. Then it is easy to juse do `this.setState({ ...INITIAL_STATE })`
2. You want to explicitly show that some part of the state is a bit complex so you want to group part of that state. For example in the above code `MOBILE_MENU_STATES`, i wanted to explicitly show that the state of mobile menu can be in 3 different states, not only in `NOT_RENDERED` but also in a `HIDDEN` state. Where `NOT_RENDERED` means that it is not renderd to the DOM while in `HIDDEN` it exists in the DOM but is hidden with CSS.

### Folder Structure
Divide code logic in the below folders:

![Component Pgae illustration](https://gitlab.com/lvlsgroup/bowling-bookers-web/uploads/7f5bfb70f8fa8a53aa530dc52ea526c2/Screen_Shot_2018-11-19_at_10.56.09.png)

##### Components
- Place single __shared__ components here. If it is not shared, place it as a child folder in the using container folder instead.
- Think of these components as the ones found here (component API) https://material-ui.com/api/button/
- Should preferably not be connected to redux.
##### Connectivity
- This is where you place network requests. For example api requests.
##### Containers
- A container of components and little jsx/html.
- Think of these components(containers) as a widget or a feature.
- They might or might not be connected to redux.
- The might contain child folders with components that are specific to that container.
##### Pages
- Place all the pages here.
- Make SSR network request through a redux action inside a static method called loadData
- Pages will contain components and/or containers and/or jsx
- REDUX:
    - Use a duck file (which contains a reducer, actions and selectors) / or a module folder similar to how redux are done in the redux folder. 
    - Use module folder if there is complicated redux logic otherwise a duck file might be enough.
    - Place redux state which belongs to that page here.
##### redux
- Place redux state here which is shared between many pages. For example:
    -  Users Data (authState, sessionState, userInfo, etc.)
    -  Request Data (hostname, countryCode, isMobile, etc) 
    -  App (scrollPosition, windowSize, networkProgress)
##### shared
- Place shared stuff like: images, util functions, fonts, styles, etc here.

### Redirects
- Guidlines
    - Prefer to do them in the component. 
    - https://coderwall.com/p/a5jeha/redux-separating-side-effects-from-actions-into-components
    - https://tylermcginnis.com/react-router-programmatically-navigate/
- If you for some reason cannot do them in the component you can import the global singleton history object `history.js`

### Immutable
- Always use immutable when possible (some npm libs might force you to use regular JS objects)
- Use the helper method `valIn()` when you expect that a value exists.
- Use the helper method `getIn()` when retrieving a value which you know might or might not exist.

### Design
#### Styleguide
- Always use theme-styles.scss for elements which are defined in the design guidlines (buttons, typography, layout)
- Use padding/margin TOP for spacing of elements and `&:first-child` to remove spacing of first item (if necessary).
    - Themed class `marginTop{size}` can be found in layout.scss 
#### fonts
- Fonts sizes are set in rem. "Unlike EM, REMs always refers back to what is set for the html tag". https://engageinteractive.co.uk/blog/em-vs-rem-vs-px
#### Globals
- Themed Sass Variables, Mixins and functions are globals (NO GLOBAL CLASSES!). It means that you dont have to import those files into using scss files. It builds with webpack.

## TESTING
Use Jest for testing.
- Check `immutableUtils.test.js` for examples on how to test util functions.
- Check `image.test.js` for example test on snapshopt test

## 3rd Party Libraries
Wrap 3rd party libs in wrapper components to prevent the system (webapp) to get too entangled by 3rd-party dependencies. 
It should be easy to replace 3rd party libraries with other similar libraries and by wrapping 3rd-party libraries in a
wrapper component we have created a visible easily controllable bridge for that library to interact with our system.
So to change a borrowed feature (like an npm lib), it should be possible to do so from a single source of entry, instead
of in many places in the code.

To give a visual representation of what i mean, look at the below illustration (entangled-system vs modularized-system):

![entangled-system vs module-system](https://gitlab.com/lvlsgroup/bowling-bookers-web/uploads/04afba129859542564cf82fdbd290644/Screen_Shot_2018-11-22_at_11.14.25.png)
