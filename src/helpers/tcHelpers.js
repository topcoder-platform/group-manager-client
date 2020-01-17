/**
 * TopCoder specific helpers
 */
import {
  TC_CDN_URL
} from '../config/constants'


/**
 * Get Avatar resized to specified size
 *
 * @param {String} avatarUrl Avatar URL
 * @param {Number} size Avatar Resize value
 *
 * @return {String}
 */
export const getAvatarResized = (avatarUrl, size) => {
  // we only load URL using CDN if they are absolute
  // we don't load relative URLs which lead to the images inside connect-app like Coder Bot avatar
  if (avatarUrl && /^https?:\/\//.test(avatarUrl)) {
    return `${TC_CDN_URL}/avatar/${encodeURIComponent(avatarUrl)}?size=${size}`
  }

  return avatarUrl
}

export const getFullNameWithFallback = (user) => {
  if (!user) return ''
  let userFullName = user.firstName
  if (userFullName && user.lastName) {
    userFullName += ' ' + user.lastName
  }
  userFullName = userFullName && userFullName.trim().length > 0 ? userFullName : user.handle
  userFullName = userFullName && userFullName.trim().length > 0 ? userFullName : 'Group Admin'
  return userFullName
}