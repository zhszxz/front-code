// 本地存储

const HM_SHOPPING_USER_KEY = 'hm-shopping-user'

export const setUserInfo = (userInfo) => {
  localStorage.setItem(HM_SHOPPING_USER_KEY, JSON.stringify(userInfo))
}

export const getUserInfo = () => {
  if (!localStorage.getItem(HM_SHOPPING_USER_KEY)) {
    return {
      userId: '',
      token: ''
    }
  }
  return JSON.parse(localStorage.getItem(HM_SHOPPING_USER_KEY))
}

export const removeUserInfo = () => {
  localStorage.removeItem(HM_SHOPPING_USER_KEY)
}

const HM_SHOPPING_SEARCH_HISTORY_KEY = 'hm-shopping-search-history'

export const setSearchHistory = (list) => {
  localStorage.setItem(HM_SHOPPING_SEARCH_HISTORY_KEY, JSON.stringify(list))
}

export const getSearchHistory = () => {
  const list = localStorage.getItem(HM_SHOPPING_SEARCH_HISTORY_KEY)
  return list ? JSON.parse(list) : []
}

export const clearSearchHistory = () => {
  localStorage.removeItem(HM_SHOPPING_SEARCH_HISTORY_KEY)
}
