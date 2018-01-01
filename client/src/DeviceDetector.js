import DeviceTypeEnum from './enums/DeviceTypeEnum'

/*
 * The breakpoints define by which window width,
 * it is associated with the responsible device type.
 * This is a copy of the include media package.
 */
const breakpoints = {}
breakpoints[DeviceTypeEnum.phone] = 320
breakpoints[DeviceTypeEnum.tablet] = 768
breakpoints[DeviceTypeEnum.desktop] = 1024

// Define the breakpoint where to differ between mobile and desktop devices.
const breaker = DeviceTypeEnum.desktop

/**
 * Check if the current device seems to be a mobile device.
 * Use the inner window width as reference.
 *
 * @return  {Boolean} true  - if it is a mobile device
 *                    false - if not
 */
const isMobile = () => {
  return (window.innerWidth < breakpoints[breaker])
}

/**
 * Check if the current device seems to be a desktop device.
 * Use the inner window width as reference.
 *
 * @return  {Boolean} true  - if it is a desktop device
 *                    false - if not
 */
const isDesktop = () => {
  return (window.innerWidth >= breakpoints[breaker])
}

/*
 * Define the DeviceConnector.
 * Add both check functions to export.
 */
export default {
  isMobile: isMobile,
  isDesktop: isDesktop
}
