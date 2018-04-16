// Import the router module.
import VueRouter from 'vue-router'

// Import the enumeration for the route RouteNames.
import * as RouteNames from './enums/RouteNames.js'

// Import all components to route.
import SubpageGreeter from './components/subpages/Greeter.vue'
import SubpageRecension from './components/subpages/Rezensionen.vue'
import SubpageAboutUs from './components/subpages/AboutUs.vue'
import SubpageStaff from './components/subpages/Stylisten.vue'
import SubpageCosts from './components/subpages/Preise.vue'
// TODO: Products page
import SubpageColors from './components/subpages/Farben.vue'
import SubpageContact from './components/footer/Kontakt.vue'
import SubpageImpressum from './components/footer/Impressum.vue'

// Import all background images.
import WallpaperGreeter from './assets/wallpapers/background6.jpg'
import WallpaperRecension from './assets/wallpapers/background12.jpg'
import WallpaperAboutUs from './assets/wallpapers/background9.jpg'
import WallpaperStaff from './assets/wallpapers/background4.jpg'
import WallpaperCosts from './assets/wallpapers/background2.jpg'
import WallpaperProducts from './assets/wallpapers/background5.jpg'
import WallpaperColors from './assets/wallpapers/background1.jpg'
import WallpaperContact from './assets/wallpapers/background11.jpg'
import WallpaperImpressum from './assets/wallpapers/background3.jpg'

// The router object itself.
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: RouteNames.GREETER,
      component: SubpageGreeter,
      meta: {
        background: WallpaperGreeter
      }
    },
    {
      path: '/recension',
      name: RouteNames.RECENSION,
      component: SubpageRecension,
      meta: {
        background: WallpaperRecension
      }
    },
    {
      path: '/aboutus',
      name: RouteNames.ABOUT_US,
      component: SubpageAboutUs,
      meta: {
        background: WallpaperAboutUs
      }
    },
    {
      path: '/staff',
      name: RouteNames.STAFF,
      component: SubpageStaff,
      meta: {
        background: WallpaperStaff
      }
    },
    {
      path: '/costs',
      name: RouteNames.COSTS,
      component: SubpageCosts,
      meta: {
        background: WallpaperCosts
      }
    },
    {
      path: '/products',
      name: RouteNames.PRODUCTS,
      component: SubpageGreeter,
      meta: {
        background: WallpaperProducts
      }
    },
    {
      path: '/colors',
      name: RouteNames.COLORS,
      component: SubpageColors,
      meta: {
        background: WallpaperColors
      }
    },
    {
      path: '/contact',
      name: RouteNames.CONTACT,
      component: SubpageContact,
      meta: {
        background: WallpaperContact
      }
    },
    {
      path: '/impressum',
      name: RouteNames.IMPRESSUM,
      component: SubpageImpressum,
      meta: {
        background: WallpaperImpressum
      }
    }
  ],

  scrollBehavior (to, from, savedPosition) {
    // Scroll to top on switch page.
    return { x: 0, y: 0 }
  }
})
