/**
 * Created by wenwang on 2018/6/23.
 */

const globe_cache = new Map()
export const ModuleCache = {
  get(nm, key){
    return this.getModule(nm).get(key)
  },
  getAndClear(nm, key){
    let ret = this.get(nm, key)
    this.clear(nm)
    return ret
  },
  getAndDelete(nm, key){
    let ret = this.get(nm, key)
    this.delete(nm, key)
    return ret
  },
  set(nm, key, val) {
    this.getModule(nm).set(key, val)
  },
  clear(nm){
    this.getModule(nm).clear()
    globe_cache.delete(nm)
  },
  delete(nm, key){
    this.getModule(nm).delete(key)
  },
  has(nm, key){
    this.getModule(nm).has(key)
  },
  getModule(nm) {
    let row = globe_cache.get(nm);
    if (!hasVal(row)) {
      globe_cache.set(nm, new Map());
    }
    return globe_cache.get(nm)
  }
}
