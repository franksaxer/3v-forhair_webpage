# Source Structure
Note that most of the styles and html are contained in the corresponding `.vue` file with the javascript logic itself. The vue.js has its own syntax, but once the attributes are named descriptive, additional documentation is redundant and only bloats files.

```
src
├── App.vue                              # main app file with basic configuration
├── assets                               # assets like images
│   ├── logos                            # differnt logos and standard pics
│   │   └── ...
│   ├── languages                        # the flags for the responsive languages
│   │   ├── german.png
│   │   └── english.png
│   ├── advertising                      # images for changing or static advertising
│   │   ├── new-aveda-product.png
│   │   ├── aveda-mischen.mp4
│   │   └── ...
│   ├── wallpapers                       # images that are used as (partial) wallpapers for different sub-pages
│   │   ├── landing-page.png
│   │   └── ...
│   └── ...
├── components                           # vue js components
│   ├── pages                            # different pages as vue.js components
│   │   ├── LandingPage.vue              # where the user lands, when open the root URL
│   │   └── ...
│   ├── top-menu                         # contains components for the main menu bar.
│   │   ├── menu-bar.vue                 # components that holds the menu entries and is adjustable for desktop/mobile
│   │   ├── menu-entry.vue               # a single entry inside the menu, adjustable for desktop/mobile
│   ├── Member.vue
├── data                                 # local store and static controller data
│   ├── LabelStore.js                    # store with labels in different languages
│   ├── GeneralConfig.js                 # static controller config
│   └── store
│       ├── Members.js                   # a list of all member working at 3v-forhair
│       ├── Prices.js                    # several lists with price tables
│       └── ...
├── directives                           # own vue.js directives
│   └── AutoFocus.js                     # added to a input field, when open edit mode
├── enums                                # enums, for duplication avoidance
│   └── ...
├── main.js                              # main js file, that loads Vue.js
├── objects                              # objects - contain data
│   ├── Label.js                         # abstract object that is assiated with a label in different languages
│   └── ...
├── router                               # router component for navigation per url
│   └── index.js                         # the root application that is integratied to the root page
└── style                                # style (scss) files to define look of website
    ├── 3v-forhair.css                   # General overall style sheet
    └── ...
```
