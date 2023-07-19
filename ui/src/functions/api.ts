// const API = 'https://chat.moonchan.xyz/api'
const API = '/api'

function fetchWitchPath(path: string, init?: RequestInit) {
  return fetch(API+path, init)
}

// for get user struct
// todo 
// type User = {
//   
// }

// return 302 and cookie
function getNewUser() {
  return fetchWitchPath("/user/new")
}

type MessageParams = {
  n?: string // how many messages to fetch, number
  min_id?: string
  max_id?: string
} 

type Message = {
    id:        number      ,
    createdAt: number      , // tempory string
    updatedAt: number      , // tempory string
    group:     string      ,
    poster:    string      ,
    payload:   string      ,
}

function getGroupMessages(
  group: string, 
  params?: MessageParams,
) {
  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString()
  const hasQuery = queryString !== ''
  return fetchWitchPath(
    `/group/${group}/messages${hasQuery? '?' : ''}${queryString}`, 
    {
      method: 'GET',
    }
  )
  .then(r => r.json())
  .then((arr:any) => {
    return arr.map((o:any):Message => {
      return {    
        id : o.id,
        createdAt: o.creatededAt,
        updatedAt: o.updatedAt,
        group : o.group,
        poster : o.poster,
        payload : o.payload,
      } as Message
    }) as Message[]
  })
}

function postGroupMessages(
  group: string,
  message: string,
) {
  return fetchWitchPath(
    `/group/${group}/messages`, 
    {
      method: 'POST',
      body: message,
    }
  )
}




export { fetchWitchPath, getNewUser, getGroupMessages, postGroupMessages, API }
export type { Message }