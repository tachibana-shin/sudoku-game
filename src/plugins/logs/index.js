let Vue = null



function isObject(value) {
  return value !== null && typeof value == "object"
}

function isArray(value) {
  return isObject(value) && "length" in value
}

function cloneObject(object) {
  const isArr = isArray(object)
  const newObject = isArr ? [] : {}

  if (isArr) {
    for (let index = 0, length = object.length; index < length; index++) {
      if (isObject(object[index])) {
        newObject[index] = cloneObject(object[index])
      } else {
        newObject[index] = object[index]
      }
    }
  } else {
    for (const index in object) {
      if (isObject(object[index])) {
        newObject[index] = cloneObject(object[index])
      } else {
        newObject[index] = object[index]
      }
    }
  }

  return newObject
}

function watcherArray(vm, value, handler, immediate) {
  if (value._isInsWatcher !== true) {
        ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(item => {
      const method = value[item]
      Object.defineProperty(value, item, {
        enumerable: false,
        configurable: false,
        writable: false,
        value(...args) {
          const result = method.call(value, ...args)
          handler.call(vm, value)
          return result
        }
      })
    })
  } else {
    Object.defineProperty(value, "_isInsWatcher", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: true
    })
  }

  if (immediate) {
    handler.call(vm, value)
  }
}


class Valuer {
  _watcher = null
  _vm = null
  _restoring = false
  _clone = false
  _values = []
  __index = -1
  get length() {
    return this.values.length
  }
  set length(e) {
    this.values = this.values.slice(0, e)
  }
  get size() {
    return this._index
  }
  get _index() {
    if (this.__index == -1) {
      return this.length - 1
    } else {
      if (this.__index > this.length - 1) {
        console.warn(`Vue logs: ${this.name} length - 1> index now (${this.__index}).`)
      }
      return this.__index
    }
  }
  set _index(val) {
    if (val < 0) {
      console.warn(`Vue logs: Can't set value (${val}) < 0 to index logs.`)
    } else if (val > this.length - 1) {
      console.warn(`Vue logs: Can't set value (${val}) > ${this.length} length - 1`)
    } else {
      this.__index = val
      //this._vm[this.name] = this.values[ val ]
    }
  }
  clear() {
    this.values = [this._vm[this.name]]
  }
  back() {
    if (this.size > 0) {
      this._restoring = true
      this._vm[this.name] = this._clone ? cloneObject(this._getter(this.values[--this._index])) : this._getter(this.values[--this._index])

    } else {
      console.warn(`Vue logs: ${this.name} empty logs. Can't restore!`)
    }
  }
  forward() {
    if (this.size < this.length - 1) {
      this._restoring = true
      this._vm[this.name] = this._clone ? cloneObject(this._getter(this.values[++this._index])) : this._getter(this.values[--this._index])
    } else {
      console.warn(`Vue logs: ${this.name} now new value. Can't forward!`)
    }
  }
  unwatch() {
    if (this._watcher) {
      this._watcher()
    }
  }
  constructor({
    deep = false,
    clone = false,
    immediate = false,
    setter = e => e,
    getter = e => e,
    storage,
    set = e => this._values = e,
    get = () => this._values
  }, nameData, vm) {
    this.name = nameData
    this._vm = vm
    this._setter = setter
    this._getter = getter
    this._clone = clone

    Object.defineProperty(this, "name", {
      get: () => nameData
    })

    if (storage) {
      this.values = typeof storage == "function" ? storage.call(vm) : storage
    } else {
      Object.defineProperty(this, "values", {
        get: () => get.call(vm),
        set(value) {
          watcherArray(vm, value, set, true)
        }
      })

      watcherArray(vm, this.values, set)
    }

    this._watcher = vm.$watch(nameData, (newVal) => {
      const value = this._clone ? cloneObject(this._setter(newVal)) : newVal

      if (!this._restoring) {
        if (this._index < this.length - 1) {
          this.values.splice(this._index + 1, this.length - this._index - 1, value)
        } else {
          this.values.push(value)
        }
        this.__index = -1
      } else {
        this._restoring = false
      }
    }, {
      deep,
      immediate
    })

    Vue.util.defineReactive(this, "values")
  }
}

class Logger {
  _vm = null
  $logs = {}

  constructor(paths = {}, vm) {
    this._vm = vm

    if (isArray(paths)) {
      const newPaths = {}
      paths.forEach(item => newPaths[item] = {})
    }
    for (const item in paths) {
      this.$logs[item] = new Valuer(paths[item], item, vm)
    }
  }
}
class VueLogs {
  static install = e => {
    Vue = e
    Vue.mixin({
      created() {
        this.$logger = new Logger(this.$options.logger, this)
        Object.defineProperty(this, "$logs", {
          get: () => this.$logger.$logs
        })
      }
    })
  }
}

export default VueLogs