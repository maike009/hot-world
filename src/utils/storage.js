// 通用的键名
const USER_LOGIN_KEY = 'USER_LOGIN_KEY'

export const getInfo = () => {
  const result = localStorage.getItem(USER_LOGIN_KEY)
  const defaultToken = ''
  return result ? JSON.parse(result) : defaultToken
}
// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(USER_LOGIN_KEY, JSON.stringify(obj))
}
// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(USER_LOGIN_KEY)
}
const HISTORY_KEY = 'hot_history_info'
export const getHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
export const setHistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
