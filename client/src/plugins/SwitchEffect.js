// Enum like object to define on which side the animation should be done.
const SIDE_ENUM = {
  left: '4bfefcb229e3166c281a919e64e8bb51',
  right: '130d5a3ef22509a0158c158e66782fa2'
}

/**
 * Helper functions for generic usage.
 */

/**
 * Prepare the given element for the switch effect.
 * For this it add some specific classes and do a backup of the state.
 * Differs between by the given side, to if the effect should be for the left or right.
 *
 * @param   el
 *          The HTML object to manipulate.
 *
 * @param   side
 *          The side defined by the SIDE_ENUM.
 */
function addEffect (el, side) {
  // Add the basic class which is used for the effect.
  el.className += ' switch-effect'

  // Differ between the sides.
  if (side === SIDE_ENUM.left) {
    el.className += ' left'
  } else if (side === SIDE_ENUM.right) {
    el.className += ' right'
  } else {
    throw new Error('Unknown side for the switch effect: ' + side)
  }

  // Backup the current classes.
  el.classNameBackup = el.className

  // Set initially to incative.
  el.className += ' inactive'
}

/**
 * Start the switch effect for the given component.
 *
 * @param   el
 *          The HTML object to animate.
 */
function startEffect (el) {
  // For some reason this zero timout is necessary to get the effect working.
  setTimeout(() => { el.className = el.classNameBackup }, 0)
}

/**
 * The Plugin itself.
 */
const SwitchEffect = {
  install: function (Vue, options) {
    // Left
    Vue.directive('switchLeftEffect', {
      bind (el) {
        addEffect(el, SIDE_ENUM.left)
      },

      inserted (el) {
        startEffect(el)
      }
    })

    // Right
    Vue.directive('switchRightEffect', {
      bind (el) {
        addEffect(el, SIDE_ENUM.right)
      },

      inserted (el) {
        startEffect(el)
      }
    })
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SwitchEffect)
}

// Define exports.
export default SwitchEffect
