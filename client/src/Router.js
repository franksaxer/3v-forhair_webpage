// Please sort everything alphabetically, so it fits with all other subpage related implementations.
// Import the router module.
import VueRouter from 'vue-router'

// Import the enumeration for the route RouteNames.
import * as RouteNames from './enums/RouteNames.js'

// Import all components to route.
import SubpageAboutUs from './components/subpages/AboutUs.vue'
import SubpageColors from './components/subpages/Colors.vue'
import SubpageContact from './components/subpages/Contact.vue'
import SubpageCosts from './components/subpages/Costs.vue'
import SubpageImpressum from './components/subpages/Impressum.vue'
import SubpageProducts from './components/subpages/Products.vue'
import SubpageGreeter from './components/subpages/Greeter.vue'
import SubpagePromotion from './components/subpages/Promotion.vue'
import SubpageRecension from './components/subpages/Recensions.vue'
import SubpageStaff from './components/subpages/Staff.vue'

// Import all background images.
import WallpaperAboutUs from './assets/wallpapers/background9.jpg'
import WallpaperColors from './assets/wallpapers/background1.jpg'
import WallpaperContact from './assets/wallpapers/background11.jpg'
import WallpaperCosts from './assets/wallpapers/background2.jpg'
import WallpaperGreeter from './assets/wallpapers/background6.jpg'
import WallpaperImpressum from './assets/wallpapers/background3.jpg'
import WallpaperProducts from './assets/wallpapers/background5.jpg'
import WallpaperPromotion from './assets/wallpapers/background7.jpg'
import WallpaperRecension from './assets/wallpapers/background12.jpg'
import WallpaperStaff from './assets/wallpapers/background4.jpg'

// The router object itself.
export default new VueRouter({
  routes: [
    {
      path: '/aboutus',
      name: RouteNames.ABOUT_US,
      component: SubpageAboutUs,
      meta: {
        background: WallpaperAboutUs
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
      path: '/costs',
      name: RouteNames.COSTS,
      component: SubpageCosts,
      meta: {
        background: WallpaperCosts
      }
    },
    {
      path: '/',
      name: RouteNames.GREETER,
      component: SubpageGreeter,
      meta: {
        background: WallpaperGreeter
      }
    },
    {
      path: '/impressum',
      name: RouteNames.IMPRESSUM,
      component: SubpageImpressum,
      meta: {
        background: WallpaperImpressum
      }
    },
    {
      path: '/products',
      name: RouteNames.PRODUCTS,
      component: SubpageProducts,
      meta: {
        background: WallpaperProducts
      }
    },
    {
      path: '/promotion',
      name: RouteNames.PROMOTION,
      component: SubpagePromotion,
      meta: {
        background: WallpaperPromotion
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
      path: '/staff',
      name: RouteNames.STAFF,
      component: SubpageStaff,
      meta: {
        background: WallpaperStaff
      }
    }
  ],

  scrollBehavior (to, from, savedPosition) {
    // Scroll to top on switch page.
    return { x: 0, y: 0 }
  }
})
