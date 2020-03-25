import service from '../utils/request'

export function getHomePageData () {
  return service({
    url: '/articles/getArticle',
    method: 'get'
  })
}
