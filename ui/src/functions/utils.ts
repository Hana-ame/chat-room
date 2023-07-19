import { nextTick } from 'vue'
import { Message, getGroupMessages } from '@/functions/api'


export function getCookie(name: string) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');
  // console.log(cookies) // cannot get HttpOnly cookies
  for(const cookie of cookies) {
    const c = cookie.trim();
    if (c.startsWith(name + '=')) {
      return c.substring(name.length + 1);
    }
  }

  return null;
}

export class Title {
  static cnt:number = 0
  static title:string = ""
  static setTitle(title: string): string {
    Title.title = title
    Title.setTitleWithCnt()
    return Title.title
  }
  static addCnt(number: number): number {
    Title.cnt += number
    Title.setTitleWithCnt()
    return Title.cnt
  }
  static clearCnt(): number {
    Title.cnt = 0
    Title.setTitleWithCnt()
    return Title.cnt
  }
  static setTitleWithCnt() {
    if (Title.cnt > 0)
      document.title = `(${Title.cnt}) ${Title.title}`
    else
      document.title = `${Title.title}`  
  }
}


export const record: Record<string, Message[]> = {}
// export class Passer<T> {
//   static record : Record<string, Passer<any>>
//   private _o : T
//   constructor(key:string, o: T) {
//     this._o = o
//     Passer.record[key] = this
//   }
//   static get(key: string) {
//     return this._o
//   }
// }

export class CallBackMap<T> {
  map = new Map<string, (v:T)=>void>()
  // constructor(){}
  addCallBack(key: string, f: (v:T)=>void) {
    this.map.set(key, f)
  }
  removeCallBack(key: string) {
    this.map.delete(key)
  }
  forEach(f: T) {
    this.map.forEach((v,_)=>{
      v(f)
    })
  }
}


export class Group {
  static record: Record<string, Group> = {}
  private group: string
  // messages = ref<Message[]>([])
  messages : Message[] = []
  private earliestMsgID = -1
  private latestMsgID = -1
  receivedCallback = new Map<string, (ms: Message[])=>void>()
  nextTickCallback = new Map<string, ()=>void>()
  errorsCallback = new Map<string, (reason:any)=>void>()
  constructor(group: string, n: number = 1) {
    this.group = group
    // only entry for first message from group
    this.messages = []
    this.earliestMsgID = -1
    this.latestMsgID = -1
    // console.log(this)
    this.getFirstNMessages(n)
    Group.record[group] = this
  }
  private getOldMessages(){
    // console.log(this)
    // console.log("fun  getOldMessages", this.group, this.earliestMsgID)
    if (this.earliestMsgID === -1) return
    getGroupMessages(this.group, {max_id: this.earliestMsgID.toString(), n: "1"})
    .then((ms)=>{
      if (ms.length > 0) {
        this.messages = [...ms, ...this.messages]
        this.earliestMsgID = ms[0].id
        this.receivedCallback.forEach(f=>f(ms))
        setTimeout(this.getOldMessages.bind(this), 250)
      } else {
        this.earliestMsgID = -1
      }
    })
    .catch((reason)=>{
      // todo: inform error
      setTimeout(this.getOldMessages.bind(this), 250)
      this.errorsCallback.forEach(f=>f(reason))
    })
  }
  private getNewMessages(){
    // console.log(this)
    // console.log("fun  getNewMessages", this.group, this.latestMsgID)
    getGroupMessages(this.group, {min_id: this.latestMsgID.toString()})
    .then((ms)=>{
      if (ms.length > 0) {
        this.messages = [...this.messages, ...ms]
        this.latestMsgID = ms[ms.length-1].id
        this.receivedCallback.forEach(f=>f(ms))
        this.nextTickCallback.forEach(f=>{nextTick(f)})
      }
      setTimeout(this.getNewMessages.bind(this), 1000)
    })
    .catch(()=>{
      // todo: inform error
      setTimeout(this.getNewMessages.bind(this), 1000)
    })
  }
  private getFirstNMessages(n: number = 1){    
    // console.log(this)
    getGroupMessages(this.group, {n: n.toString()}) // only get one Msg
    .then((ms)=>{
      this.messages = ms
      if (ms.length > 0) {
        // prev
        this.earliestMsgID = ms[0].id
        setTimeout(this.getOldMessages.bind(this), 200)
        // next
        this.latestMsgID = ms[ms.length-1].id
        this.receivedCallback.forEach(f=>f(ms))
        this.nextTickCallback.forEach(f=>{nextTick(f)})
      } else {
        this.latestMsgID = -1
        this.earliestMsgID = -1
      }
      setTimeout(this.getNewMessages.bind(this), 500)
    })
    .catch(()=>{
      this.getFirstNMessages()
    })
  }
}