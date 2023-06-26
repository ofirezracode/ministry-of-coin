(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
function Fr(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const G = {},
  Et = [],
  Se = () => {},
  Ki = () => !1,
  zi = /^on[^a-z]/,
  Fn = (e) => zi.test(e),
  Ir = (e) => e.startsWith("onUpdate:"),
  se = Object.assign,
  Mr = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  qi = Object.prototype.hasOwnProperty,
  K = (e, t) => qi.call(e, t),
  U = Array.isArray,
  wt = (e) => In(e) === "[object Map]",
  mo = (e) => In(e) === "[object Set]",
  k = (e) => typeof e == "function",
  te = (e) => typeof e == "string",
  Lr = (e) => typeof e == "symbol",
  Z = (e) => e !== null && typeof e == "object",
  go = (e) => Z(e) && k(e.then) && k(e.catch),
  yo = Object.prototype.toString,
  In = (e) => yo.call(e),
  Wi = (e) => In(e).slice(8, -1),
  bo = (e) => In(e) === "[object Object]",
  jr = (e) =>
    te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  pn = Fr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Mn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Vi = /-(\w)/g,
  Ue = Mn((e) => e.replace(Vi, (t, n) => (n ? n.toUpperCase() : ""))),
  Ji = /\B([A-Z])/g,
  Nt = Mn((e) => e.replace(Ji, "-$1").toLowerCase()),
  Ln = Mn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Xn = Mn((e) => (e ? `on${Ln(e)}` : "")),
  Vt = (e, t) => !Object.is(e, t),
  Gn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  On = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Qi = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let fs;
const dr = () =>
  fs ||
  (fs =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function Br(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = te(r) ? Zi(r) : Br(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else {
    if (te(e)) return e;
    if (Z(e)) return e;
  }
}
const Yi = /;(?![^(]*\))/g,
  Xi = /:([^]+)/,
  Gi = /\/\*[^]*?\*\//g;
function Zi(e) {
  const t = {};
  return (
    e
      .replace(Gi, "")
      .split(Yi)
      .forEach((n) => {
        if (n) {
          const r = n.split(Xi);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Ur(e) {
  let t = "";
  if (te(e)) t = e;
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ur(e[n]);
      r && (t += r + " ");
    }
  else if (Z(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const el =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  tl = Fr(el);
function _o(e) {
  return !!e || e === "";
}
const Zn = (e) =>
    te(e)
      ? e
      : e == null
      ? ""
      : U(e) || (Z(e) && (e.toString === yo || !k(e.toString)))
      ? JSON.stringify(e, Eo, 2)
      : String(e),
  Eo = (e, t) =>
    t && t.__v_isRef
      ? Eo(e, t.value)
      : wt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : mo(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : Z(t) && !U(t) && !bo(t)
      ? String(t)
      : t;
let we;
class nl {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = we),
      !t && we && (this.index = (we.scopes || (we.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = we;
      try {
        return (we = this), t();
      } finally {
        we = n;
      }
    }
  }
  on() {
    we = this;
  }
  off() {
    we = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function rl(e, t = we) {
  t && t.active && t.effects.push(e);
}
function sl() {
  return we;
}
const Dr = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  wo = (e) => (e.w & rt) > 0,
  Ro = (e) => (e.n & rt) > 0,
  ol = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= rt;
  },
  il = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        wo(s) && !Ro(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~rt),
          (s.n &= ~rt);
      }
      t.length = n;
    }
  },
  hr = new WeakMap();
let kt = 0,
  rt = 1;
const pr = 30;
let Re;
const ut = Symbol(""),
  mr = Symbol("");
class kr {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      rl(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Re,
      n = tt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Re),
        (Re = this),
        (tt = !0),
        (rt = 1 << ++kt),
        kt <= pr ? ol(this) : ds(this),
        this.fn()
      );
    } finally {
      kt <= pr && il(this),
        (rt = 1 << --kt),
        (Re = this.parent),
        (tt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Re === this
      ? (this.deferStop = !0)
      : this.active &&
        (ds(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ds(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let tt = !0;
const xo = [];
function Ft() {
  xo.push(tt), (tt = !1);
}
function It() {
  const e = xo.pop();
  tt = e === void 0 ? !0 : e;
}
function ge(e, t, n) {
  if (tt && Re) {
    let r = hr.get(e);
    r || hr.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = Dr())), Oo(s);
  }
}
function Oo(e, t) {
  let n = !1;
  kt <= pr ? Ro(e) || ((e.n |= rt), (n = !wo(e))) : (n = !e.has(Re)),
    n && (e.add(Re), Re.deps.push(e));
}
function We(e, t, n, r, s, o) {
  const i = hr.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && U(e)) {
    const c = Number(r);
    i.forEach((u, a) => {
      (a === "length" || a >= c) && l.push(u);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        U(e)
          ? jr(n) && l.push(i.get("length"))
          : (l.push(i.get(ut)), wt(e) && l.push(i.get(mr)));
        break;
      case "delete":
        U(e) || (l.push(i.get(ut)), wt(e) && l.push(i.get(mr)));
        break;
      case "set":
        wt(e) && l.push(i.get(ut));
        break;
    }
  if (l.length === 1) l[0] && gr(l[0]);
  else {
    const c = [];
    for (const u of l) u && c.push(...u);
    gr(Dr(c));
  }
}
function gr(e, t) {
  const n = U(e) ? e : [...e];
  for (const r of n) r.computed && hs(r);
  for (const r of n) r.computed || hs(r);
}
function hs(e, t) {
  (e !== Re || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const ll = Fr("__proto__,__v_isRef,__isVue"),
  So = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Lr)
  ),
  cl = $r(),
  ul = $r(!1, !0),
  al = $r(!0),
  ps = fl();
function fl() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = q(this);
        for (let o = 0, i = this.length; o < i; o++) ge(r, "get", o + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(q)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Ft();
        const r = q(this)[t].apply(this, n);
        return It(), r;
      };
    }),
    e
  );
}
function dl(e) {
  const t = q(this);
  return ge(t, "has", e), t.hasOwnProperty(e);
}
function $r(e = !1, t = !1) {
  return function (r, s, o) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && o === (e ? (t ? Pl : To) : t ? Co : Po).get(r))
      return r;
    const i = U(r);
    if (!e) {
      if (i && K(ps, s)) return Reflect.get(ps, s, o);
      if (s === "hasOwnProperty") return dl;
    }
    const l = Reflect.get(r, s, o);
    return (Lr(s) ? So.has(s) : ll(s)) || (e || ge(r, "get", s), t)
      ? l
      : fe(l)
      ? i && jr(s)
        ? l
        : l.value
      : Z(l)
      ? e
        ? No(l)
        : nn(l)
      : l;
  };
}
const hl = vo(),
  pl = vo(!0);
function vo(e = !1) {
  return function (n, r, s, o) {
    let i = n[r];
    if (Ot(i) && fe(i) && !fe(s)) return !1;
    if (
      !e &&
      (!Sn(s) && !Ot(s) && ((i = q(i)), (s = q(s))), !U(n) && fe(i) && !fe(s))
    )
      return (i.value = s), !0;
    const l = U(n) && jr(r) ? Number(r) < n.length : K(n, r),
      c = Reflect.set(n, r, s, o);
    return (
      n === q(o) && (l ? Vt(s, i) && We(n, "set", r, s) : We(n, "add", r, s)), c
    );
  };
}
function ml(e, t) {
  const n = K(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && We(e, "delete", t, void 0), r;
}
function gl(e, t) {
  const n = Reflect.has(e, t);
  return (!Lr(t) || !So.has(t)) && ge(e, "has", t), n;
}
function yl(e) {
  return ge(e, "iterate", U(e) ? "length" : ut), Reflect.ownKeys(e);
}
const Ao = { get: cl, set: hl, deleteProperty: ml, has: gl, ownKeys: yl },
  bl = {
    get: al,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  _l = se({}, Ao, { get: ul, set: pl }),
  Hr = (e) => e,
  jn = (e) => Reflect.getPrototypeOf(e);
function ln(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = q(e),
    o = q(t);
  n || (t !== o && ge(s, "get", t), ge(s, "get", o));
  const { has: i } = jn(s),
    l = r ? Hr : n ? qr : Jt;
  if (i.call(s, t)) return l(e.get(t));
  if (i.call(s, o)) return l(e.get(o));
  e !== s && e.get(t);
}
function cn(e, t = !1) {
  const n = this.__v_raw,
    r = q(n),
    s = q(e);
  return (
    t || (e !== s && ge(r, "has", e), ge(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function un(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ge(q(e), "iterate", ut), Reflect.get(e, "size", e)
  );
}
function ms(e) {
  e = q(e);
  const t = q(this);
  return jn(t).has.call(t, e) || (t.add(e), We(t, "add", e, e)), this;
}
function gs(e, t) {
  t = q(t);
  const n = q(this),
    { has: r, get: s } = jn(n);
  let o = r.call(n, e);
  o || ((e = q(e)), (o = r.call(n, e)));
  const i = s.call(n, e);
  return (
    n.set(e, t), o ? Vt(t, i) && We(n, "set", e, t) : We(n, "add", e, t), this
  );
}
function ys(e) {
  const t = q(this),
    { has: n, get: r } = jn(t);
  let s = n.call(t, e);
  s || ((e = q(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && We(t, "delete", e, void 0), o;
}
function bs() {
  const e = q(this),
    t = e.size !== 0,
    n = e.clear();
  return t && We(e, "clear", void 0, void 0), n;
}
function an(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      l = q(i),
      c = t ? Hr : e ? qr : Jt;
    return (
      !e && ge(l, "iterate", ut), i.forEach((u, a) => r.call(s, c(u), c(a), o))
    );
  };
}
function fn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = q(s),
      i = wt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      u = s[e](...r),
      a = n ? Hr : t ? qr : Jt;
    return (
      !t && ge(o, "iterate", c ? mr : ut),
      {
        next() {
          const { value: h, done: m } = u.next();
          return m
            ? { value: h, done: m }
            : { value: l ? [a(h[0]), a(h[1])] : a(h), done: m };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ye(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function El() {
  const e = {
      get(o) {
        return ln(this, o);
      },
      get size() {
        return un(this);
      },
      has: cn,
      add: ms,
      set: gs,
      delete: ys,
      clear: bs,
      forEach: an(!1, !1),
    },
    t = {
      get(o) {
        return ln(this, o, !1, !0);
      },
      get size() {
        return un(this);
      },
      has: cn,
      add: ms,
      set: gs,
      delete: ys,
      clear: bs,
      forEach: an(!1, !0),
    },
    n = {
      get(o) {
        return ln(this, o, !0);
      },
      get size() {
        return un(this, !0);
      },
      has(o) {
        return cn.call(this, o, !0);
      },
      add: Ye("add"),
      set: Ye("set"),
      delete: Ye("delete"),
      clear: Ye("clear"),
      forEach: an(!0, !1),
    },
    r = {
      get(o) {
        return ln(this, o, !0, !0);
      },
      get size() {
        return un(this, !0);
      },
      has(o) {
        return cn.call(this, o, !0);
      },
      add: Ye("add"),
      set: Ye("set"),
      delete: Ye("delete"),
      clear: Ye("clear"),
      forEach: an(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = fn(o, !1, !1)),
        (n[o] = fn(o, !0, !1)),
        (t[o] = fn(o, !1, !0)),
        (r[o] = fn(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [wl, Rl, xl, Ol] = El();
function Kr(e, t) {
  const n = t ? (e ? Ol : xl) : e ? Rl : wl;
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(K(n, s) && s in r ? n : r, s, o);
}
const Sl = { get: Kr(!1, !1) },
  vl = { get: Kr(!1, !0) },
  Al = { get: Kr(!0, !1) },
  Po = new WeakMap(),
  Co = new WeakMap(),
  To = new WeakMap(),
  Pl = new WeakMap();
function Cl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Tl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Cl(Wi(e));
}
function nn(e) {
  return Ot(e) ? e : zr(e, !1, Ao, Sl, Po);
}
function Nl(e) {
  return zr(e, !1, _l, vl, Co);
}
function No(e) {
  return zr(e, !0, bl, Al, To);
}
function zr(e, t, n, r, s) {
  if (!Z(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = Tl(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? r : n);
  return s.set(e, l), l;
}
function Rt(e) {
  return Ot(e) ? Rt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ot(e) {
  return !!(e && e.__v_isReadonly);
}
function Sn(e) {
  return !!(e && e.__v_isShallow);
}
function Fo(e) {
  return Rt(e) || Ot(e);
}
function q(e) {
  const t = e && e.__v_raw;
  return t ? q(t) : e;
}
function Io(e) {
  return On(e, "__v_skip", !0), e;
}
const Jt = (e) => (Z(e) ? nn(e) : e),
  qr = (e) => (Z(e) ? No(e) : e);
function Mo(e) {
  tt && Re && ((e = q(e)), Oo(e.dep || (e.dep = Dr())));
}
function Lo(e, t) {
  e = q(e);
  const n = e.dep;
  n && gr(n);
}
function fe(e) {
  return !!(e && e.__v_isRef === !0);
}
function Fl(e) {
  return jo(e, !1);
}
function Il(e) {
  return jo(e, !0);
}
function jo(e, t) {
  return fe(e) ? e : new Ml(e, t);
}
class Ml {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : q(t)),
      (this._value = n ? t : Jt(t));
  }
  get value() {
    return Mo(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Sn(t) || Ot(t);
    (t = n ? t : q(t)),
      Vt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Jt(t)), Lo(this));
  }
}
function at(e) {
  return fe(e) ? e.value : e;
}
const Ll = {
  get: (e, t, n) => at(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return fe(s) && !fe(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function Bo(e) {
  return Rt(e) ? e : new Proxy(e, Ll);
}
class jl {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new kr(t, () => {
        this._dirty || ((this._dirty = !0), Lo(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = q(this);
    return (
      Mo(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Bl(e, t, n = !1) {
  let r, s;
  const o = k(e);
  return (
    o ? ((r = e), (s = Se)) : ((r = e.get), (s = e.set)),
    new jl(r, s, o || !s, n)
  );
}
function nt(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    Bn(o, t, n);
  }
  return s;
}
function ve(e, t, n, r) {
  if (k(e)) {
    const o = nt(e, t, n, r);
    return (
      o &&
        go(o) &&
        o.catch((i) => {
          Bn(i, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(ve(e[o], t, n, r));
  return s;
}
function Bn(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let a = 0; a < u.length; a++) if (u[a](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      nt(c, null, 10, [e, i, l]);
      return;
    }
  }
  Ul(e, n, s, r);
}
function Ul(e, t, n, r = !0) {
  console.error(e);
}
let Qt = !1,
  yr = !1;
const ae = [];
let je = 0;
const xt = [];
let Ke = null,
  lt = 0;
const Uo = Promise.resolve();
let Wr = null;
function Do(e) {
  const t = Wr || Uo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Dl(e) {
  let t = je + 1,
    n = ae.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    Yt(ae[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Vr(e) {
  (!ae.length || !ae.includes(e, Qt && e.allowRecurse ? je + 1 : je)) &&
    (e.id == null ? ae.push(e) : ae.splice(Dl(e.id), 0, e), ko());
}
function ko() {
  !Qt && !yr && ((yr = !0), (Wr = Uo.then(Ho)));
}
function kl(e) {
  const t = ae.indexOf(e);
  t > je && ae.splice(t, 1);
}
function $l(e) {
  U(e)
    ? xt.push(...e)
    : (!Ke || !Ke.includes(e, e.allowRecurse ? lt + 1 : lt)) && xt.push(e),
    ko();
}
function _s(e, t = Qt ? je + 1 : 0) {
  for (; t < ae.length; t++) {
    const n = ae[t];
    n && n.pre && (ae.splice(t, 1), t--, n());
  }
}
function $o(e) {
  if (xt.length) {
    const t = [...new Set(xt)];
    if (((xt.length = 0), Ke)) {
      Ke.push(...t);
      return;
    }
    for (Ke = t, Ke.sort((n, r) => Yt(n) - Yt(r)), lt = 0; lt < Ke.length; lt++)
      Ke[lt]();
    (Ke = null), (lt = 0);
  }
}
const Yt = (e) => (e.id == null ? 1 / 0 : e.id),
  Hl = (e, t) => {
    const n = Yt(e) - Yt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Ho(e) {
  (yr = !1), (Qt = !0), ae.sort(Hl);
  const t = Se;
  try {
    for (je = 0; je < ae.length; je++) {
      const n = ae[je];
      n && n.active !== !1 && nt(n, null, 14);
    }
  } finally {
    (je = 0),
      (ae.length = 0),
      $o(),
      (Qt = !1),
      (Wr = null),
      (ae.length || xt.length) && Ho();
  }
}
function Kl(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || G;
  let s = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in r) {
    const a = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: h, trim: m } = r[a] || G;
    m && (s = n.map((y) => (te(y) ? y.trim() : y))), h && (s = n.map(Qi));
  }
  let l,
    c = r[(l = Xn(t))] || r[(l = Xn(Ue(t)))];
  !c && o && (c = r[(l = Xn(Nt(t)))]), c && ve(c, e, 6, s);
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), ve(u, e, 6, s);
  }
}
function Ko(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!k(e)) {
    const c = (u) => {
      const a = Ko(u, t, !0);
      a && ((l = !0), se(i, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !o && !l
    ? (Z(e) && r.set(e, null), null)
    : (U(o) ? o.forEach((c) => (i[c] = null)) : se(i, o),
      Z(e) && r.set(e, i),
      i);
}
function Un(e, t) {
  return !e || !Fn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      K(e, t[0].toLowerCase() + t.slice(1)) || K(e, Nt(t)) || K(e, t));
}
let xe = null,
  zo = null;
function vn(e) {
  const t = xe;
  return (xe = e), (zo = (e && e.type.__scopeId) || null), t;
}
function mn(e, t = xe, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && Ts(-1);
    const o = vn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      vn(o), r._d && Ts(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function er(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: u,
    render: a,
    renderCache: h,
    data: m,
    setupState: y,
    ctx: E,
    inheritAttrs: O,
  } = e;
  let j, T;
  const F = vn(e);
  try {
    if (n.shapeFlag & 4) {
      const B = s || r;
      (j = Le(a.call(B, B, h, o, y, m, E))), (T = c);
    } else {
      const B = t;
      (j = Le(
        B.length > 1 ? B(o, { attrs: c, slots: l, emit: u }) : B(o, null)
      )),
        (T = t.props ? c : zl(c));
    }
  } catch (B) {
    (Kt.length = 0), Bn(B, e, 1), (j = le(Xt));
  }
  let $ = j;
  if (T && O !== !1) {
    const B = Object.keys(T),
      { shapeFlag: ce } = $;
    B.length && ce & 7 && (i && B.some(Ir) && (T = ql(T, i)), ($ = St($, T)));
  }
  return (
    n.dirs && (($ = St($)), ($.dirs = $.dirs ? $.dirs.concat(n.dirs) : n.dirs)),
    n.transition && ($.transition = n.transition),
    (j = $),
    vn(F),
    j
  );
}
const zl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Fn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  ql = (e, t) => {
    const n = {};
    for (const r in e) (!Ir(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Wl(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    u = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? Es(r, i, u) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        const m = a[h];
        if (i[m] !== r[m] && !Un(u, m)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? Es(r, i, u)
        : !0
      : !!i;
  return !1;
}
function Es(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !Un(n, o)) return !0;
  }
  return !1;
}
function Vl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Jl = (e) => e.__isSuspense;
function Ql(e, t) {
  t && t.pendingBranch
    ? U(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : $l(e);
}
const dn = {};
function gn(e, t, n) {
  return qo(e, t, n);
}
function qo(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = G
) {
  var l;
  const c = sl() === ((l = ie) == null ? void 0 : l.scope) ? ie : null;
  let u,
    a = !1,
    h = !1;
  if (
    (fe(e)
      ? ((u = () => e.value), (a = Sn(e)))
      : Rt(e)
      ? ((u = () => e), (r = !0))
      : U(e)
      ? ((h = !0),
        (a = e.some((B) => Rt(B) || Sn(B))),
        (u = () =>
          e.map((B) => {
            if (fe(B)) return B.value;
            if (Rt(B)) return _t(B);
            if (k(B)) return nt(B, c, 2);
          })))
      : k(e)
      ? t
        ? (u = () => nt(e, c, 2))
        : (u = () => {
            if (!(c && c.isUnmounted)) return m && m(), ve(e, c, 3, [y]);
          })
      : (u = Se),
    t && r)
  ) {
    const B = u;
    u = () => _t(B());
  }
  let m,
    y = (B) => {
      m = F.onStop = () => {
        nt(B, c, 4);
      };
    },
    E;
  if (Zt)
    if (
      ((y = Se),
      t ? n && ve(t, c, 3, [u(), h ? [] : void 0, y]) : u(),
      s === "sync")
    ) {
      const B = zc();
      E = B.__watcherHandles || (B.__watcherHandles = []);
    } else return Se;
  let O = h ? new Array(e.length).fill(dn) : dn;
  const j = () => {
    if (F.active)
      if (t) {
        const B = F.run();
        (r || a || (h ? B.some((ce, de) => Vt(ce, O[de])) : Vt(B, O))) &&
          (m && m(),
          ve(t, c, 3, [B, O === dn ? void 0 : h && O[0] === dn ? [] : O, y]),
          (O = B));
      } else F.run();
  };
  j.allowRecurse = !!t;
  let T;
  s === "sync"
    ? (T = j)
    : s === "post"
    ? (T = () => me(j, c && c.suspense))
    : ((j.pre = !0), c && (j.id = c.uid), (T = () => Vr(j)));
  const F = new kr(u, T);
  t
    ? n
      ? j()
      : (O = F.run())
    : s === "post"
    ? me(F.run.bind(F), c && c.suspense)
    : F.run();
  const $ = () => {
    F.stop(), c && c.scope && Mr(c.scope.effects, F);
  };
  return E && E.push($), $;
}
function Yl(e, t, n) {
  const r = this.proxy,
    s = te(e) ? (e.includes(".") ? Wo(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  k(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = ie;
  vt(this);
  const l = qo(s, o.bind(r), n);
  return i ? vt(i) : ft(), l;
}
function Wo(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function _t(e, t) {
  if (!Z(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), fe(e))) _t(e.value, t);
  else if (U(e)) for (let n = 0; n < e.length; n++) _t(e[n], t);
  else if (mo(e) || wt(e))
    e.forEach((n) => {
      _t(n, t);
    });
  else if (bo(e)) for (const n in e) _t(e[n], t);
  return e;
}
function ot(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[r];
    c && (Ft(), ve(c, n, 8, [e.el, l, e, t]), It());
  }
}
function Vo(e, t) {
  return k(e) ? (() => se({ name: e.name }, t, { setup: e }))() : e;
}
const yn = (e) => !!e.type.__asyncLoader,
  Jo = (e) => e.type.__isKeepAlive;
function Xl(e, t) {
  Qo(e, "a", t);
}
function Gl(e, t) {
  Qo(e, "da", t);
}
function Qo(e, t, n = ie) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((Dn(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      Jo(s.parent.vnode) && Zl(r, t, n, s), (s = s.parent);
  }
}
function Zl(e, t, n, r) {
  const s = Dn(t, e, r, !0);
  Yo(() => {
    Mr(r[t], s);
  }, n);
}
function Dn(e, t, n = ie, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Ft(), vt(n);
          const l = ve(t, n, e, i);
          return ft(), It(), l;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const Ve =
    (e) =>
    (t, n = ie) =>
      (!Zt || e === "sp") && Dn(e, (...r) => t(...r), n),
  ec = Ve("bm"),
  tc = Ve("m"),
  nc = Ve("bu"),
  rc = Ve("u"),
  sc = Ve("bum"),
  Yo = Ve("um"),
  oc = Ve("sp"),
  ic = Ve("rtg"),
  lc = Ve("rtc");
function cc(e, t = ie) {
  Dn("ec", e, t);
}
const Xo = "components";
function uc(e, t) {
  return fc(Xo, e, !0, t) || e;
}
const ac = Symbol.for("v-ndc");
function fc(e, t, n = !0, r = !1) {
  const s = xe || ie;
  if (s) {
    const o = s.type;
    if (e === Xo) {
      const l = $c(o, !1);
      if (l && (l === t || l === Ue(t) || l === Ln(Ue(t)))) return o;
    }
    const i = ws(s[e] || o[e], t) || ws(s.appContext[e], t);
    return !i && r ? o : i;
  }
}
function ws(e, t) {
  return e && (e[t] || e[Ue(t)] || e[Ln(Ue(t))]);
}
function Ed(e, t, n, r) {
  let s;
  const o = n && n[r];
  if (U(e) || te(e)) {
    s = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      s[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (Z(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const u = i[l];
        s[l] = t(e[u], u, l, o && o[l]);
      }
    }
  else s = [];
  return n && (n[r] = s), s;
}
const br = (e) => (e ? (li(e) ? Gr(e) || e.proxy : br(e.parent)) : null),
  Ht = se(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => br(e.parent),
    $root: (e) => br(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Jr(e),
    $forceUpdate: (e) => e.f || (e.f = () => Vr(e.update)),
    $nextTick: (e) => e.n || (e.n = Do.bind(e.proxy)),
    $watch: (e) => Yl.bind(e),
  }),
  tr = (e, t) => e !== G && !e.__isScriptSetup && K(e, t),
  dc = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let u;
      if (t[0] !== "$") {
        const y = i[t];
        if (y !== void 0)
          switch (y) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (tr(r, t)) return (i[t] = 1), r[t];
          if (s !== G && K(s, t)) return (i[t] = 2), s[t];
          if ((u = e.propsOptions[0]) && K(u, t)) return (i[t] = 3), o[t];
          if (n !== G && K(n, t)) return (i[t] = 4), n[t];
          _r && (i[t] = 0);
        }
      }
      const a = Ht[t];
      let h, m;
      if (a) return t === "$attrs" && ge(e, "get", t), a(e);
      if ((h = l.__cssModules) && (h = h[t])) return h;
      if (n !== G && K(n, t)) return (i[t] = 4), n[t];
      if (((m = c.config.globalProperties), K(m, t))) return m[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return tr(s, t)
        ? ((s[t] = n), !0)
        : r !== G && K(r, t)
        ? ((r[t] = n), !0)
        : K(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== G && K(e, i)) ||
        tr(t, i) ||
        ((l = o[0]) && K(l, i)) ||
        K(r, i) ||
        K(Ht, i) ||
        K(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : K(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Rs(e) {
  return U(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let _r = !0;
function hc(e) {
  const t = Jr(e),
    n = e.proxy,
    r = e.ctx;
  (_r = !1), t.beforeCreate && xs(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: u,
    created: a,
    beforeMount: h,
    mounted: m,
    beforeUpdate: y,
    updated: E,
    activated: O,
    deactivated: j,
    beforeDestroy: T,
    beforeUnmount: F,
    destroyed: $,
    unmounted: B,
    render: ce,
    renderTracked: de,
    renderTriggered: Pe,
    errorCaptured: ke,
    serverPrefetch: dt,
    expose: Ce,
    inheritAttrs: Je,
    components: st,
    directives: Te,
    filters: Lt,
  } = t;
  if ((u && pc(u, r, null), i))
    for (const Y in i) {
      const W = i[Y];
      k(W) && (r[Y] = W.bind(n));
    }
  if (s) {
    const Y = s.call(n, n);
    Z(Y) && (e.data = nn(Y));
  }
  if (((_r = !0), o))
    for (const Y in o) {
      const W = o[Y],
        $e = k(W) ? W.bind(n, n) : k(W.get) ? W.get.bind(n, n) : Se,
        Qe = !k(W) && k(W.set) ? W.set.bind(n) : Se,
        Ne = be({ get: $e, set: Qe });
      Object.defineProperty(r, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => Ne.value,
        set: (pe) => (Ne.value = pe),
      });
    }
  if (l) for (const Y in l) Go(l[Y], r, n, Y);
  if (c) {
    const Y = k(c) ? c.call(n) : c;
    Reflect.ownKeys(Y).forEach((W) => {
      bn(W, Y[W]);
    });
  }
  a && xs(a, e, "c");
  function re(Y, W) {
    U(W) ? W.forEach(($e) => Y($e.bind(n))) : W && Y(W.bind(n));
  }
  if (
    (re(ec, h),
    re(tc, m),
    re(nc, y),
    re(rc, E),
    re(Xl, O),
    re(Gl, j),
    re(cc, ke),
    re(lc, de),
    re(ic, Pe),
    re(sc, F),
    re(Yo, B),
    re(oc, dt),
    U(Ce))
  )
    if (Ce.length) {
      const Y = e.exposed || (e.exposed = {});
      Ce.forEach((W) => {
        Object.defineProperty(Y, W, {
          get: () => n[W],
          set: ($e) => (n[W] = $e),
        });
      });
    } else e.exposed || (e.exposed = {});
  ce && e.render === Se && (e.render = ce),
    Je != null && (e.inheritAttrs = Je),
    st && (e.components = st),
    Te && (e.directives = Te);
}
function pc(e, t, n = Se) {
  U(e) && (e = Er(e));
  for (const r in e) {
    const s = e[r];
    let o;
    Z(s)
      ? "default" in s
        ? (o = ze(s.from || r, s.default, !0))
        : (o = ze(s.from || r))
      : (o = ze(s)),
      fe(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[r] = o);
  }
}
function xs(e, t, n) {
  ve(U(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Go(e, t, n, r) {
  const s = r.includes(".") ? Wo(n, r) : () => n[r];
  if (te(e)) {
    const o = t[e];
    k(o) && gn(s, o);
  } else if (k(e)) gn(s, e.bind(n));
  else if (Z(e))
    if (U(e)) e.forEach((o) => Go(o, t, n, r));
    else {
      const o = k(e.handler) ? e.handler.bind(n) : t[e.handler];
      k(o) && gn(s, o, e);
    }
}
function Jr(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !s.length && !n && !r
      ? (c = t)
      : ((c = {}), s.length && s.forEach((u) => An(c, u, i, !0)), An(c, t, i)),
    Z(t) && o.set(t, c),
    c
  );
}
function An(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && An(e, o, n, !0), s && s.forEach((i) => An(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = mc[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const mc = {
  data: Os,
  props: Ss,
  emits: Ss,
  methods: $t,
  computed: $t,
  beforeCreate: he,
  created: he,
  beforeMount: he,
  mounted: he,
  beforeUpdate: he,
  updated: he,
  beforeDestroy: he,
  beforeUnmount: he,
  destroyed: he,
  unmounted: he,
  activated: he,
  deactivated: he,
  errorCaptured: he,
  serverPrefetch: he,
  components: $t,
  directives: $t,
  watch: yc,
  provide: Os,
  inject: gc,
};
function Os(e, t) {
  return t
    ? e
      ? function () {
          return se(
            k(e) ? e.call(this, this) : e,
            k(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function gc(e, t) {
  return $t(Er(e), Er(t));
}
function Er(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function he(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function $t(e, t) {
  return e ? se(Object.create(null), e, t) : t;
}
function Ss(e, t) {
  return e
    ? U(e) && U(t)
      ? [...new Set([...e, ...t])]
      : se(Object.create(null), Rs(e), Rs(t ?? {}))
    : t;
}
function yc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = se(Object.create(null), e);
  for (const r in t) n[r] = he(e[r], t[r]);
  return n;
}
function Zo() {
  return {
    app: null,
    config: {
      isNativeTag: Ki,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let bc = 0;
function _c(e, t) {
  return function (r, s = null) {
    k(r) || (r = se({}, r)), s != null && !Z(s) && (s = null);
    const o = Zo(),
      i = new Set();
    let l = !1;
    const c = (o.app = {
      _uid: bc++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: qc,
      get config() {
        return o.config;
      },
      set config(u) {},
      use(u, ...a) {
        return (
          i.has(u) ||
            (u && k(u.install)
              ? (i.add(u), u.install(c, ...a))
              : k(u) && (i.add(u), u(c, ...a))),
          c
        );
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), c;
      },
      component(u, a) {
        return a ? ((o.components[u] = a), c) : o.components[u];
      },
      directive(u, a) {
        return a ? ((o.directives[u] = a), c) : o.directives[u];
      },
      mount(u, a, h) {
        if (!l) {
          const m = le(r, s);
          return (
            (m.appContext = o),
            a && t ? t(m, u) : e(m, u, h),
            (l = !0),
            (c._container = u),
            (u.__vue_app__ = c),
            Gr(m.component) || m.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, a) {
        return (o.provides[u] = a), c;
      },
      runWithContext(u) {
        Pn = c;
        try {
          return u();
        } finally {
          Pn = null;
        }
      },
    });
    return c;
  };
}
let Pn = null;
function bn(e, t) {
  if (ie) {
    let n = ie.provides;
    const r = ie.parent && ie.parent.provides;
    r === n && (n = ie.provides = Object.create(r)), (n[e] = t);
  }
}
function ze(e, t, n = !1) {
  const r = ie || xe;
  if (r || Pn) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Pn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && k(t) ? t.call(r && r.proxy) : t;
  }
}
function Ec(e, t, n, r = !1) {
  const s = {},
    o = {};
  On(o, Kn, 1), (e.propsDefaults = Object.create(null)), ei(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : Nl(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function wc(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = q(s),
    [c] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        let m = a[h];
        if (Un(e.emitsOptions, m)) continue;
        const y = t[m];
        if (c)
          if (K(o, m)) y !== o[m] && ((o[m] = y), (u = !0));
          else {
            const E = Ue(m);
            s[E] = wr(c, l, E, y, e, !1);
          }
        else y !== o[m] && ((o[m] = y), (u = !0));
      }
    }
  } else {
    ei(e, t, s, o) && (u = !0);
    let a;
    for (const h in l)
      (!t || (!K(t, h) && ((a = Nt(h)) === h || !K(t, a)))) &&
        (c
          ? n &&
            (n[h] !== void 0 || n[a] !== void 0) &&
            (s[h] = wr(c, l, h, void 0, e, !0))
          : delete s[h]);
    if (o !== l) for (const h in o) (!t || !K(t, h)) && (delete o[h], (u = !0));
  }
  u && We(e, "set", "$attrs");
}
function ei(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (pn(c)) continue;
      const u = t[c];
      let a;
      s && K(s, (a = Ue(c)))
        ? !o || !o.includes(a)
          ? (n[a] = u)
          : ((l || (l = {}))[a] = u)
        : Un(e.emitsOptions, c) ||
          ((!(c in r) || u !== r[c]) && ((r[c] = u), (i = !0)));
    }
  if (o) {
    const c = q(n),
      u = l || G;
    for (let a = 0; a < o.length; a++) {
      const h = o[a];
      n[h] = wr(s, c, h, u[h], e, !K(u, h));
    }
  }
  return i;
}
function wr(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const l = K(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && k(c)) {
        const { propsDefaults: u } = s;
        n in u ? (r = u[n]) : (vt(s), (r = u[n] = c.call(null, t)), ft());
      } else r = c;
    }
    i[0] &&
      (o && !l ? (r = !1) : i[1] && (r === "" || r === Nt(n)) && (r = !0));
  }
  return r;
}
function ti(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!k(e)) {
    const a = (h) => {
      c = !0;
      const [m, y] = ti(h, t, !0);
      se(i, m), y && l.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  if (!o && !c) return Z(e) && r.set(e, Et), Et;
  if (U(o))
    for (let a = 0; a < o.length; a++) {
      const h = Ue(o[a]);
      vs(h) && (i[h] = G);
    }
  else if (o)
    for (const a in o) {
      const h = Ue(a);
      if (vs(h)) {
        const m = o[a],
          y = (i[h] = U(m) || k(m) ? { type: m } : se({}, m));
        if (y) {
          const E = Cs(Boolean, y.type),
            O = Cs(String, y.type);
          (y[0] = E > -1),
            (y[1] = O < 0 || E < O),
            (E > -1 || K(y, "default")) && l.push(h);
        }
      }
    }
  const u = [i, l];
  return Z(e) && r.set(e, u), u;
}
function vs(e) {
  return e[0] !== "$";
}
function As(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Ps(e, t) {
  return As(e) === As(t);
}
function Cs(e, t) {
  return U(t) ? t.findIndex((n) => Ps(n, e)) : k(t) && Ps(t, e) ? 0 : -1;
}
const ni = (e) => e[0] === "_" || e === "$stable",
  Qr = (e) => (U(e) ? e.map(Le) : [Le(e)]),
  Rc = (e, t, n) => {
    if (t._n) return t;
    const r = mn((...s) => Qr(t(...s)), n);
    return (r._c = !1), r;
  },
  ri = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (ni(s)) continue;
      const o = e[s];
      if (k(o)) t[s] = Rc(s, o, r);
      else if (o != null) {
        const i = Qr(o);
        t[s] = () => i;
      }
    }
  },
  si = (e, t) => {
    const n = Qr(t);
    e.slots.default = () => n;
  },
  xc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = q(t)), On(t, "_", n)) : ri(t, (e.slots = {}));
    } else (e.slots = {}), t && si(e, t);
    On(e.slots, Kn, 1);
  },
  Oc = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = G;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (se(s, t), !n && l === 1 && delete s._)
        : ((o = !t.$stable), ri(t, s)),
        (i = t);
    } else t && (si(e, t), (i = { default: 1 }));
    if (o) for (const l in s) !ni(l) && !(l in i) && delete s[l];
  };
function Rr(e, t, n, r, s = !1) {
  if (U(e)) {
    e.forEach((m, y) => Rr(m, t && (U(t) ? t[y] : t), n, r, s));
    return;
  }
  if (yn(r) && !s) return;
  const o = r.shapeFlag & 4 ? Gr(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: l, r: c } = e,
    u = t && t.r,
    a = l.refs === G ? (l.refs = {}) : l.refs,
    h = l.setupState;
  if (
    (u != null &&
      u !== c &&
      (te(u)
        ? ((a[u] = null), K(h, u) && (h[u] = null))
        : fe(u) && (u.value = null)),
    k(c))
  )
    nt(c, l, 12, [i, a]);
  else {
    const m = te(c),
      y = fe(c);
    if (m || y) {
      const E = () => {
        if (e.f) {
          const O = m ? (K(h, c) ? h[c] : a[c]) : c.value;
          s
            ? U(O) && Mr(O, o)
            : U(O)
            ? O.includes(o) || O.push(o)
            : m
            ? ((a[c] = [o]), K(h, c) && (h[c] = a[c]))
            : ((c.value = [o]), e.k && (a[e.k] = c.value));
        } else
          m
            ? ((a[c] = i), K(h, c) && (h[c] = i))
            : y && ((c.value = i), e.k && (a[e.k] = i));
      };
      i ? ((E.id = -1), me(E, n)) : E();
    }
  }
}
const me = Ql;
function Sc(e) {
  return vc(e);
}
function vc(e, t) {
  const n = dr();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: u,
      setElementText: a,
      parentNode: h,
      nextSibling: m,
      setScopeId: y = Se,
      insertStaticContent: E,
    } = e,
    O = (
      f,
      d,
      p,
      g = null,
      w = null,
      R = null,
      P = !1,
      S = null,
      v = !!d.dynamicChildren
    ) => {
      if (f === d) return;
      f && !Bt(f, d) && ((g = _(f)), pe(f, w, R, !0), (f = null)),
        d.patchFlag === -2 && ((v = !1), (d.dynamicChildren = null));
      const { type: x, ref: M, shapeFlag: N } = d;
      switch (x) {
        case kn:
          j(f, d, p, g);
          break;
        case Xt:
          T(f, d, p, g);
          break;
        case nr:
          f == null && F(d, p, g, P);
          break;
        case Me:
          st(f, d, p, g, w, R, P, S, v);
          break;
        default:
          N & 1
            ? ce(f, d, p, g, w, R, P, S, v)
            : N & 6
            ? Te(f, d, p, g, w, R, P, S, v)
            : (N & 64 || N & 128) && x.process(f, d, p, g, w, R, P, S, v, A);
      }
      M != null && w && Rr(M, f && f.ref, R, d || f, !d);
    },
    j = (f, d, p, g) => {
      if (f == null) r((d.el = l(d.children)), p, g);
      else {
        const w = (d.el = f.el);
        d.children !== f.children && u(w, d.children);
      }
    },
    T = (f, d, p, g) => {
      f == null ? r((d.el = c(d.children || "")), p, g) : (d.el = f.el);
    },
    F = (f, d, p, g) => {
      [f.el, f.anchor] = E(f.children, d, p, g, f.el, f.anchor);
    },
    $ = ({ el: f, anchor: d }, p, g) => {
      let w;
      for (; f && f !== d; ) (w = m(f)), r(f, p, g), (f = w);
      r(d, p, g);
    },
    B = ({ el: f, anchor: d }) => {
      let p;
      for (; f && f !== d; ) (p = m(f)), s(f), (f = p);
      s(d);
    },
    ce = (f, d, p, g, w, R, P, S, v) => {
      (P = P || d.type === "svg"),
        f == null ? de(d, p, g, w, R, P, S, v) : dt(f, d, w, R, P, S, v);
    },
    de = (f, d, p, g, w, R, P, S) => {
      let v, x;
      const { type: M, props: N, shapeFlag: L, transition: D, dirs: H } = f;
      if (
        ((v = f.el = i(f.type, R, N && N.is, N)),
        L & 8
          ? a(v, f.children)
          : L & 16 &&
            ke(f.children, v, null, g, w, R && M !== "foreignObject", P, S),
        H && ot(f, null, g, "created"),
        Pe(v, f, f.scopeId, P, g),
        N)
      ) {
        for (const Q in N)
          Q !== "value" &&
            !pn(Q) &&
            o(v, Q, null, N[Q], R, f.children, g, w, ue);
        "value" in N && o(v, "value", null, N.value),
          (x = N.onVnodeBeforeMount) && Ie(x, g, f);
      }
      H && ot(f, null, g, "beforeMount");
      const X = (!w || (w && !w.pendingBranch)) && D && !D.persisted;
      X && D.beforeEnter(v),
        r(v, d, p),
        ((x = N && N.onVnodeMounted) || X || H) &&
          me(() => {
            x && Ie(x, g, f), X && D.enter(v), H && ot(f, null, g, "mounted");
          }, w);
    },
    Pe = (f, d, p, g, w) => {
      if ((p && y(f, p), g)) for (let R = 0; R < g.length; R++) y(f, g[R]);
      if (w) {
        let R = w.subTree;
        if (d === R) {
          const P = w.vnode;
          Pe(f, P, P.scopeId, P.slotScopeIds, w.parent);
        }
      }
    },
    ke = (f, d, p, g, w, R, P, S, v = 0) => {
      for (let x = v; x < f.length; x++) {
        const M = (f[x] = S ? Ze(f[x]) : Le(f[x]));
        O(null, M, d, p, g, w, R, P, S);
      }
    },
    dt = (f, d, p, g, w, R, P) => {
      const S = (d.el = f.el);
      let { patchFlag: v, dynamicChildren: x, dirs: M } = d;
      v |= f.patchFlag & 16;
      const N = f.props || G,
        L = d.props || G;
      let D;
      p && it(p, !1),
        (D = L.onVnodeBeforeUpdate) && Ie(D, p, d, f),
        M && ot(d, f, p, "beforeUpdate"),
        p && it(p, !0);
      const H = w && d.type !== "foreignObject";
      if (
        (x
          ? Ce(f.dynamicChildren, x, S, p, g, H, R)
          : P || W(f, d, S, null, p, g, H, R, !1),
        v > 0)
      ) {
        if (v & 16) Je(S, d, N, L, p, g, w);
        else if (
          (v & 2 && N.class !== L.class && o(S, "class", null, L.class, w),
          v & 4 && o(S, "style", N.style, L.style, w),
          v & 8)
        ) {
          const X = d.dynamicProps;
          for (let Q = 0; Q < X.length; Q++) {
            const ee = X[Q],
              Ee = N[ee],
              gt = L[ee];
            (gt !== Ee || ee === "value") &&
              o(S, ee, Ee, gt, w, f.children, p, g, ue);
          }
        }
        v & 1 && f.children !== d.children && a(S, d.children);
      } else !P && x == null && Je(S, d, N, L, p, g, w);
      ((D = L.onVnodeUpdated) || M) &&
        me(() => {
          D && Ie(D, p, d, f), M && ot(d, f, p, "updated");
        }, g);
    },
    Ce = (f, d, p, g, w, R, P) => {
      for (let S = 0; S < d.length; S++) {
        const v = f[S],
          x = d[S],
          M =
            v.el && (v.type === Me || !Bt(v, x) || v.shapeFlag & 70)
              ? h(v.el)
              : p;
        O(v, x, M, null, g, w, R, P, !0);
      }
    },
    Je = (f, d, p, g, w, R, P) => {
      if (p !== g) {
        if (p !== G)
          for (const S in p)
            !pn(S) && !(S in g) && o(f, S, p[S], null, P, d.children, w, R, ue);
        for (const S in g) {
          if (pn(S)) continue;
          const v = g[S],
            x = p[S];
          v !== x && S !== "value" && o(f, S, x, v, P, d.children, w, R, ue);
        }
        "value" in g && o(f, "value", p.value, g.value);
      }
    },
    st = (f, d, p, g, w, R, P, S, v) => {
      const x = (d.el = f ? f.el : l("")),
        M = (d.anchor = f ? f.anchor : l(""));
      let { patchFlag: N, dynamicChildren: L, slotScopeIds: D } = d;
      D && (S = S ? S.concat(D) : D),
        f == null
          ? (r(x, p, g), r(M, p, g), ke(d.children, p, M, w, R, P, S, v))
          : N > 0 && N & 64 && L && f.dynamicChildren
          ? (Ce(f.dynamicChildren, L, p, w, R, P, S),
            (d.key != null || (w && d === w.subTree)) && oi(f, d, !0))
          : W(f, d, p, M, w, R, P, S, v);
    },
    Te = (f, d, p, g, w, R, P, S, v) => {
      (d.slotScopeIds = S),
        f == null
          ? d.shapeFlag & 512
            ? w.ctx.activate(d, p, g, P, v)
            : Lt(d, p, g, w, R, P, v)
          : ht(f, d, v);
    },
    Lt = (f, d, p, g, w, R, P) => {
      const S = (f.component = jc(f, g, w));
      if ((Jo(f) && (S.ctx.renderer = A), Bc(S), S.asyncDep)) {
        if ((w && w.registerDep(S, re), !f.el)) {
          const v = (S.subTree = le(Xt));
          T(null, v, d, p);
        }
        return;
      }
      re(S, f, d, p, w, R, P);
    },
    ht = (f, d, p) => {
      const g = (d.component = f.component);
      if (Wl(f, d, p))
        if (g.asyncDep && !g.asyncResolved) {
          Y(g, d, p);
          return;
        } else (g.next = d), kl(g.update), g.update();
      else (d.el = f.el), (g.vnode = d);
    },
    re = (f, d, p, g, w, R, P) => {
      const S = () => {
          if (f.isMounted) {
            let { next: M, bu: N, u: L, parent: D, vnode: H } = f,
              X = M,
              Q;
            it(f, !1),
              M ? ((M.el = H.el), Y(f, M, P)) : (M = H),
              N && Gn(N),
              (Q = M.props && M.props.onVnodeBeforeUpdate) && Ie(Q, D, M, H),
              it(f, !0);
            const ee = er(f),
              Ee = f.subTree;
            (f.subTree = ee),
              O(Ee, ee, h(Ee.el), _(Ee), f, w, R),
              (M.el = ee.el),
              X === null && Vl(f, ee.el),
              L && me(L, w),
              (Q = M.props && M.props.onVnodeUpdated) &&
                me(() => Ie(Q, D, M, H), w);
          } else {
            let M;
            const { el: N, props: L } = d,
              { bm: D, m: H, parent: X } = f,
              Q = yn(d);
            if (
              (it(f, !1),
              D && Gn(D),
              !Q && (M = L && L.onVnodeBeforeMount) && Ie(M, X, d),
              it(f, !0),
              N && V)
            ) {
              const ee = () => {
                (f.subTree = er(f)), V(N, f.subTree, f, w, null);
              };
              Q
                ? d.type.__asyncLoader().then(() => !f.isUnmounted && ee())
                : ee();
            } else {
              const ee = (f.subTree = er(f));
              O(null, ee, p, g, f, w, R), (d.el = ee.el);
            }
            if ((H && me(H, w), !Q && (M = L && L.onVnodeMounted))) {
              const ee = d;
              me(() => Ie(M, X, ee), w);
            }
            (d.shapeFlag & 256 ||
              (X && yn(X.vnode) && X.vnode.shapeFlag & 256)) &&
              f.a &&
              me(f.a, w),
              (f.isMounted = !0),
              (d = p = g = null);
          }
        },
        v = (f.effect = new kr(S, () => Vr(x), f.scope)),
        x = (f.update = () => v.run());
      (x.id = f.uid), it(f, !0), x();
    },
    Y = (f, d, p) => {
      d.component = f;
      const g = f.vnode.props;
      (f.vnode = d),
        (f.next = null),
        wc(f, d.props, g, p),
        Oc(f, d.children, p),
        Ft(),
        _s(),
        It();
    },
    W = (f, d, p, g, w, R, P, S, v = !1) => {
      const x = f && f.children,
        M = f ? f.shapeFlag : 0,
        N = d.children,
        { patchFlag: L, shapeFlag: D } = d;
      if (L > 0) {
        if (L & 128) {
          Qe(x, N, p, g, w, R, P, S, v);
          return;
        } else if (L & 256) {
          $e(x, N, p, g, w, R, P, S, v);
          return;
        }
      }
      D & 8
        ? (M & 16 && ue(x, w, R), N !== x && a(p, N))
        : M & 16
        ? D & 16
          ? Qe(x, N, p, g, w, R, P, S, v)
          : ue(x, w, R, !0)
        : (M & 8 && a(p, ""), D & 16 && ke(N, p, g, w, R, P, S, v));
    },
    $e = (f, d, p, g, w, R, P, S, v) => {
      (f = f || Et), (d = d || Et);
      const x = f.length,
        M = d.length,
        N = Math.min(x, M);
      let L;
      for (L = 0; L < N; L++) {
        const D = (d[L] = v ? Ze(d[L]) : Le(d[L]));
        O(f[L], D, p, null, w, R, P, S, v);
      }
      x > M ? ue(f, w, R, !0, !1, N) : ke(d, p, g, w, R, P, S, v, N);
    },
    Qe = (f, d, p, g, w, R, P, S, v) => {
      let x = 0;
      const M = d.length;
      let N = f.length - 1,
        L = M - 1;
      for (; x <= N && x <= L; ) {
        const D = f[x],
          H = (d[x] = v ? Ze(d[x]) : Le(d[x]));
        if (Bt(D, H)) O(D, H, p, null, w, R, P, S, v);
        else break;
        x++;
      }
      for (; x <= N && x <= L; ) {
        const D = f[N],
          H = (d[L] = v ? Ze(d[L]) : Le(d[L]));
        if (Bt(D, H)) O(D, H, p, null, w, R, P, S, v);
        else break;
        N--, L--;
      }
      if (x > N) {
        if (x <= L) {
          const D = L + 1,
            H = D < M ? d[D].el : g;
          for (; x <= L; )
            O(null, (d[x] = v ? Ze(d[x]) : Le(d[x])), p, H, w, R, P, S, v), x++;
        }
      } else if (x > L) for (; x <= N; ) pe(f[x], w, R, !0), x++;
      else {
        const D = x,
          H = x,
          X = new Map();
        for (x = H; x <= L; x++) {
          const ye = (d[x] = v ? Ze(d[x]) : Le(d[x]));
          ye.key != null && X.set(ye.key, x);
        }
        let Q,
          ee = 0;
        const Ee = L - H + 1;
        let gt = !1,
          cs = 0;
        const jt = new Array(Ee);
        for (x = 0; x < Ee; x++) jt[x] = 0;
        for (x = D; x <= N; x++) {
          const ye = f[x];
          if (ee >= Ee) {
            pe(ye, w, R, !0);
            continue;
          }
          let Fe;
          if (ye.key != null) Fe = X.get(ye.key);
          else
            for (Q = H; Q <= L; Q++)
              if (jt[Q - H] === 0 && Bt(ye, d[Q])) {
                Fe = Q;
                break;
              }
          Fe === void 0
            ? pe(ye, w, R, !0)
            : ((jt[Fe - H] = x + 1),
              Fe >= cs ? (cs = Fe) : (gt = !0),
              O(ye, d[Fe], p, null, w, R, P, S, v),
              ee++);
        }
        const us = gt ? Ac(jt) : Et;
        for (Q = us.length - 1, x = Ee - 1; x >= 0; x--) {
          const ye = H + x,
            Fe = d[ye],
            as = ye + 1 < M ? d[ye + 1].el : g;
          jt[x] === 0
            ? O(null, Fe, p, as, w, R, P, S, v)
            : gt && (Q < 0 || x !== us[Q] ? Ne(Fe, p, as, 2) : Q--);
        }
      }
    },
    Ne = (f, d, p, g, w = null) => {
      const { el: R, type: P, transition: S, children: v, shapeFlag: x } = f;
      if (x & 6) {
        Ne(f.component.subTree, d, p, g);
        return;
      }
      if (x & 128) {
        f.suspense.move(d, p, g);
        return;
      }
      if (x & 64) {
        P.move(f, d, p, A);
        return;
      }
      if (P === Me) {
        r(R, d, p);
        for (let N = 0; N < v.length; N++) Ne(v[N], d, p, g);
        r(f.anchor, d, p);
        return;
      }
      if (P === nr) {
        $(f, d, p);
        return;
      }
      if (g !== 2 && x & 1 && S)
        if (g === 0) S.beforeEnter(R), r(R, d, p), me(() => S.enter(R), w);
        else {
          const { leave: N, delayLeave: L, afterLeave: D } = S,
            H = () => r(R, d, p),
            X = () => {
              N(R, () => {
                H(), D && D();
              });
            };
          L ? L(R, H, X) : X();
        }
      else r(R, d, p);
    },
    pe = (f, d, p, g = !1, w = !1) => {
      const {
        type: R,
        props: P,
        ref: S,
        children: v,
        dynamicChildren: x,
        shapeFlag: M,
        patchFlag: N,
        dirs: L,
      } = f;
      if ((S != null && Rr(S, null, p, f, !0), M & 256)) {
        d.ctx.deactivate(f);
        return;
      }
      const D = M & 1 && L,
        H = !yn(f);
      let X;
      if ((H && (X = P && P.onVnodeBeforeUnmount) && Ie(X, d, f), M & 6))
        on(f.component, p, g);
      else {
        if (M & 128) {
          f.suspense.unmount(p, g);
          return;
        }
        D && ot(f, null, d, "beforeUnmount"),
          M & 64
            ? f.type.remove(f, d, p, w, A, g)
            : x && (R !== Me || (N > 0 && N & 64))
            ? ue(x, d, p, !1, !0)
            : ((R === Me && N & 384) || (!w && M & 16)) && ue(v, d, p),
          g && pt(f);
      }
      ((H && (X = P && P.onVnodeUnmounted)) || D) &&
        me(() => {
          X && Ie(X, d, f), D && ot(f, null, d, "unmounted");
        }, p);
    },
    pt = (f) => {
      const { type: d, el: p, anchor: g, transition: w } = f;
      if (d === Me) {
        mt(p, g);
        return;
      }
      if (d === nr) {
        B(f);
        return;
      }
      const R = () => {
        s(p), w && !w.persisted && w.afterLeave && w.afterLeave();
      };
      if (f.shapeFlag & 1 && w && !w.persisted) {
        const { leave: P, delayLeave: S } = w,
          v = () => P(p, R);
        S ? S(f.el, R, v) : v();
      } else R();
    },
    mt = (f, d) => {
      let p;
      for (; f !== d; ) (p = m(f)), s(f), (f = p);
      s(d);
    },
    on = (f, d, p) => {
      const { bum: g, scope: w, update: R, subTree: P, um: S } = f;
      g && Gn(g),
        w.stop(),
        R && ((R.active = !1), pe(P, f, d, p)),
        S && me(S, d),
        me(() => {
          f.isUnmounted = !0;
        }, d),
        d &&
          d.pendingBranch &&
          !d.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === d.pendingId &&
          (d.deps--, d.deps === 0 && d.resolve());
    },
    ue = (f, d, p, g = !1, w = !1, R = 0) => {
      for (let P = R; P < f.length; P++) pe(f[P], d, p, g, w);
    },
    _ = (f) =>
      f.shapeFlag & 6
        ? _(f.component.subTree)
        : f.shapeFlag & 128
        ? f.suspense.next()
        : m(f.anchor || f.el),
    C = (f, d, p) => {
      f == null
        ? d._vnode && pe(d._vnode, null, null, !0)
        : O(d._vnode || null, f, d, null, null, null, p),
        _s(),
        $o(),
        (d._vnode = f);
    },
    A = {
      p: O,
      um: pe,
      m: Ne,
      r: pt,
      mt: Lt,
      mc: ke,
      pc: W,
      pbc: Ce,
      n: _,
      o: e,
    };
  let I, V;
  return t && ([I, V] = t(A)), { render: C, hydrate: I, createApp: _c(C, I) };
}
function it({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function oi(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (U(r) && U(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let l = s[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = s[o] = Ze(s[o])), (l.el = i.el)),
        n || oi(i, l)),
        l.type === kn && (l.el = i.el);
    }
}
function Ac(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < u ? (o = l + 1) : (i = l);
      u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const Pc = (e) => e.__isTeleport,
  Me = Symbol.for("v-fgt"),
  kn = Symbol.for("v-txt"),
  Xt = Symbol.for("v-cmt"),
  nr = Symbol.for("v-stc"),
  Kt = [];
let Oe = null;
function $n(e = !1) {
  Kt.push((Oe = e ? null : []));
}
function Cc() {
  Kt.pop(), (Oe = Kt[Kt.length - 1] || null);
}
let Gt = 1;
function Ts(e) {
  Gt += e;
}
function Tc(e) {
  return (
    (e.dynamicChildren = Gt > 0 ? Oe || Et : null),
    Cc(),
    Gt > 0 && Oe && Oe.push(e),
    e
  );
}
function Hn(e, t, n, r, s, o) {
  return Tc(oe(e, t, n, r, s, o, !0));
}
function xr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Bt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Kn = "__vInternal",
  ii = ({ key: e }) => e ?? null,
  _n = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? te(e) || fe(e) || k(e)
        ? { i: xe, r: e, k: t, f: !!n }
        : e
      : null
  );
function oe(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === Me ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ii(t),
    ref: t && _n(t),
    scopeId: zo,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: xe,
  };
  return (
    l
      ? (Yr(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= te(n) ? 8 : 16),
    Gt > 0 &&
      !i &&
      Oe &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Oe.push(c),
    c
  );
}
const le = Nc;
function Nc(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === ac) && (e = Xt), xr(e))) {
    const l = St(e, t, !0);
    return (
      n && Yr(l, n),
      Gt > 0 &&
        !o &&
        Oe &&
        (l.shapeFlag & 6 ? (Oe[Oe.indexOf(e)] = l) : Oe.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Hc(e) && (e = e.__vccOpts), t)) {
    t = Fc(t);
    let { class: l, style: c } = t;
    l && !te(l) && (t.class = Ur(l)),
      Z(c) && (Fo(c) && !U(c) && (c = se({}, c)), (t.style = Br(c)));
  }
  const i = te(e) ? 1 : Jl(e) ? 128 : Pc(e) ? 64 : Z(e) ? 4 : k(e) ? 2 : 0;
  return oe(e, t, n, r, s, i, o, !0);
}
function Fc(e) {
  return e ? (Fo(e) || Kn in e ? se({}, e) : e) : null;
}
function St(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    l = t ? Ic(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && ii(l),
    ref:
      t && t.ref ? (n && s ? (U(s) ? s.concat(_n(t)) : [s, _n(t)]) : _n(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Me ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && St(e.ssContent),
    ssFallback: e.ssFallback && St(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function zt(e = " ", t = 0) {
  return le(kn, null, e, t);
}
function Le(e) {
  return e == null || typeof e == "boolean"
    ? le(Xt)
    : U(e)
    ? le(Me, null, e.slice())
    : typeof e == "object"
    ? Ze(e)
    : le(kn, null, String(e));
}
function Ze(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : St(e);
}
function Yr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (U(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Yr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(Kn in t)
        ? (t._ctx = xe)
        : s === 3 &&
          xe &&
          (xe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    k(t)
      ? ((t = { default: t, _ctx: xe }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [zt(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Ic(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = Ur([t.class, r.class]));
      else if (s === "style") t.style = Br([t.style, r.style]);
      else if (Fn(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(U(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function Ie(e, t, n, r = null) {
  ve(e, t, 7, [n, r]);
}
const Mc = Zo();
let Lc = 0;
function jc(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Mc,
    o = {
      uid: Lc++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new nl(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ti(r, s),
      emitsOptions: Ko(r, s),
      emit: null,
      emitted: null,
      propsDefaults: G,
      inheritAttrs: r.inheritAttrs,
      ctx: G,
      data: G,
      props: G,
      attrs: G,
      slots: G,
      refs: G,
      setupState: G,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Kl.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let ie = null,
  Xr,
  yt,
  Ns = "__VUE_INSTANCE_SETTERS__";
(yt = dr()[Ns]) || (yt = dr()[Ns] = []),
  yt.push((e) => (ie = e)),
  (Xr = (e) => {
    yt.length > 1 ? yt.forEach((t) => t(e)) : yt[0](e);
  });
const vt = (e) => {
    Xr(e), e.scope.on();
  },
  ft = () => {
    ie && ie.scope.off(), Xr(null);
  };
function li(e) {
  return e.vnode.shapeFlag & 4;
}
let Zt = !1;
function Bc(e, t = !1) {
  Zt = t;
  const { props: n, children: r } = e.vnode,
    s = li(e);
  Ec(e, n, s, t), xc(e, r);
  const o = s ? Uc(e, t) : void 0;
  return (Zt = !1), o;
}
function Uc(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Io(new Proxy(e.ctx, dc)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? kc(e) : null);
    vt(e), Ft();
    const o = nt(r, e, 0, [e.props, s]);
    if ((It(), ft(), go(o))) {
      if ((o.then(ft, ft), t))
        return o
          .then((i) => {
            Fs(e, i, t);
          })
          .catch((i) => {
            Bn(i, e, 0);
          });
      e.asyncDep = o;
    } else Fs(e, o, t);
  } else ci(e, t);
}
function Fs(e, t, n) {
  k(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Z(t) && (e.setupState = Bo(t)),
    ci(e, n);
}
let Is;
function ci(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Is && !r.render) {
      const s = r.template || Jr(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = r,
          u = se(se({ isCustomElement: o, delimiters: l }, i), c);
        r.render = Is(s, u);
      }
    }
    e.render = r.render || Se;
  }
  vt(e), Ft(), hc(e), It(), ft();
}
function Dc(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return ge(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function kc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Dc(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Gr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Bo(Io(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Ht) return Ht[n](e);
        },
        has(t, n) {
          return n in t || n in Ht;
        },
      }))
    );
}
function $c(e, t = !0) {
  return k(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Hc(e) {
  return k(e) && "__vccOpts" in e;
}
const be = (e, t) => Bl(e, t, Zt);
function ui(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? Z(t) && !U(t)
      ? xr(t)
        ? le(e, null, [t])
        : le(e, t)
      : le(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && xr(n) && (n = [n]),
      le(e, t, n));
}
const Kc = Symbol.for("v-scx"),
  zc = () => ze(Kc),
  qc = "3.3.4",
  Wc = "http://www.w3.org/2000/svg",
  ct = typeof document < "u" ? document : null,
  Ms = ct && ct.createElement("template"),
  Vc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? ct.createElementNS(Wc, e)
        : ct.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => ct.createTextNode(e),
    createComment: (e) => ct.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => ct.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        Ms.innerHTML = r ? `<svg>${e}</svg>` : e;
        const l = Ms.content;
        if (r) {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Jc(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Qc(e, t, n) {
  const r = e.style,
    s = te(n);
  if (n && !s) {
    if (t && !te(t)) for (const o in t) n[o] == null && Or(r, o, "");
    for (const o in n) Or(r, o, n[o]);
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = o);
  }
}
const Ls = /\s*!important$/;
function Or(e, t, n) {
  if (U(n)) n.forEach((r) => Or(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Yc(e, t);
    Ls.test(n)
      ? e.setProperty(Nt(r), n.replace(Ls, ""), "important")
      : (e[r] = n);
  }
}
const js = ["Webkit", "Moz", "ms"],
  rr = {};
function Yc(e, t) {
  const n = rr[t];
  if (n) return n;
  let r = Ue(t);
  if (r !== "filter" && r in e) return (rr[t] = r);
  r = Ln(r);
  for (let s = 0; s < js.length; s++) {
    const o = js[s] + r;
    if (o in e) return (rr[t] = o);
  }
  return t;
}
const Bs = "http://www.w3.org/1999/xlink";
function Xc(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Bs, t.slice(6, t.length))
      : e.setAttributeNS(Bs, t, n);
  else {
    const o = tl(t);
    n == null || (o && !_o(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Gc(e, t, n, r, s, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, s, o), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const u = l === "OPTION" ? e.getAttribute("value") : e.value,
      a = n ?? "";
    u !== a && (e.value = a), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean"
      ? (n = _o(n))
      : n == null && u === "string"
      ? ((n = ""), (c = !0))
      : u === "number" && ((n = 0), (c = !0));
  }
  try {
    e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function Zc(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function eu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function tu(e, t, n, r, s = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [l, c] = nu(t);
    if (r) {
      const u = (o[t] = ou(r, s));
      Zc(e, l, u, c);
    } else i && (eu(e, l, i, c), (o[t] = void 0));
  }
}
const Us = /(?:Once|Passive|Capture)$/;
function nu(e) {
  let t;
  if (Us.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Us)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Nt(e.slice(2)), t];
}
let sr = 0;
const ru = Promise.resolve(),
  su = () => sr || (ru.then(() => (sr = 0)), (sr = Date.now()));
function ou(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    ve(iu(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = su()), n;
}
function iu(e, t) {
  if (U(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const Ds = /^on[a-z]/,
  lu = (e, t, n, r, s = !1, o, i, l, c) => {
    t === "class"
      ? Jc(e, r, s)
      : t === "style"
      ? Qc(e, n, r)
      : Fn(t)
      ? Ir(t) || tu(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : cu(e, t, r, s)
        )
      ? Gc(e, t, r, o, i, l, c)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Xc(e, t, r, s));
  };
function cu(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Ds.test(t) && k(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Ds.test(t) && te(n))
    ? !1
    : t in e;
}
const uu = se({ patchProp: lu }, Vc);
let ks;
function au() {
  return ks || (ks = Sc(uu));
}
const fu = (...e) => {
  const t = au().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const s = du(r);
      if (!s) return;
      const o = t._component;
      !k(o) && !o.render && !o.template && (o.template = s.innerHTML),
        (s.innerHTML = "");
      const i = n(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function du(e) {
  return te(e) ? document.querySelector(e) : e;
}
/*!
 * vue-router v4.2.2
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const bt = typeof window < "u";
function hu(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const J = Object.assign;
function or(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = Ae(s) ? s.map(e) : e(s);
  }
  return n;
}
const qt = () => {},
  Ae = Array.isArray,
  pu = /\/$/,
  mu = (e) => e.replace(pu, "");
function ir(e, t, n = "/") {
  let r,
    s = {},
    o = "",
    i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    l < c && l >= 0 && (c = -1),
    c > -1 &&
      ((r = t.slice(0, c)),
      (o = t.slice(c + 1, l > -1 ? l : t.length)),
      (s = e(o))),
    l > -1 && ((r = r || t.slice(0, l)), (i = t.slice(l, t.length))),
    (r = _u(r ?? t, n)),
    { fullPath: r + (o && "?") + o + i, path: r, query: s, hash: i }
  );
}
function gu(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function $s(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function yu(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    At(t.matched[r], n.matched[s]) &&
    ai(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function At(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ai(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!bu(e[n], t[n])) return !1;
  return !0;
}
function bu(e, t) {
  return Ae(e) ? Hs(e, t) : Ae(t) ? Hs(t, e) : e === t;
}
function Hs(e, t) {
  return Ae(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function _u(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    s = r[r.length - 1];
  (s === ".." || s === ".") && r.push("");
  let o = n.length - 1,
    i,
    l;
  for (i = 0; i < r.length; i++)
    if (((l = r[i]), l !== "."))
      if (l === "..") o > 1 && o--;
      else break;
  return (
    n.slice(0, o).join("/") +
    "/" +
    r.slice(i - (i === r.length ? 1 : 0)).join("/")
  );
}
var en;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(en || (en = {}));
var Wt;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Wt || (Wt = {}));
function Eu(e) {
  if (!e)
    if (bt) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), mu(e);
}
const wu = /^[^#]+#/;
function Ru(e, t) {
  return e.replace(wu, "#") + t;
}
function xu(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const zn = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Ou(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = xu(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function Ks(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Sr = new Map();
function Su(e, t) {
  Sr.set(e, t);
}
function vu(e) {
  const t = Sr.get(e);
  return Sr.delete(e), t;
}
let Au = () => location.protocol + "//" + location.host;
function fi(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let l = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = s.slice(l);
    return c[0] !== "/" && (c = "/" + c), $s(c, "");
  }
  return $s(n, e) + r + s;
}
function Pu(e, t, n, r) {
  let s = [],
    o = [],
    i = null;
  const l = ({ state: m }) => {
    const y = fi(e, location),
      E = n.value,
      O = t.value;
    let j = 0;
    if (m) {
      if (((n.value = y), (t.value = m), i && i === E)) {
        i = null;
        return;
      }
      j = O ? m.position - O.position : 0;
    } else r(y);
    s.forEach((T) => {
      T(n.value, E, {
        delta: j,
        type: en.pop,
        direction: j ? (j > 0 ? Wt.forward : Wt.back) : Wt.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function u(m) {
    s.push(m);
    const y = () => {
      const E = s.indexOf(m);
      E > -1 && s.splice(E, 1);
    };
    return o.push(y), y;
  }
  function a() {
    const { history: m } = window;
    m.state && m.replaceState(J({}, m.state, { scroll: zn() }), "");
  }
  function h() {
    for (const m of o) m();
    (o = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", a);
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", a, { passive: !0 }),
    { pauseListeners: c, listen: u, destroy: h }
  );
}
function zs(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? zn() : null,
  };
}
function Cu(e) {
  const { history: t, location: n } = window,
    r = { value: fi(e, n) },
    s = { value: t.state };
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function o(c, u, a) {
    const h = e.indexOf("#"),
      m =
        h > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(h)) + c
          : Au() + e + c;
    try {
      t[a ? "replaceState" : "pushState"](u, "", m), (s.value = u);
    } catch (y) {
      console.error(y), n[a ? "replace" : "assign"](m);
    }
  }
  function i(c, u) {
    const a = J({}, t.state, zs(s.value.back, c, s.value.forward, !0), u, {
      position: s.value.position,
    });
    o(c, a, !0), (r.value = c);
  }
  function l(c, u) {
    const a = J({}, s.value, t.state, { forward: c, scroll: zn() });
    o(a.current, a, !0);
    const h = J({}, zs(r.value, c, null), { position: a.position + 1 }, u);
    o(c, h, !1), (r.value = c);
  }
  return { location: r, state: s, push: l, replace: i };
}
function Tu(e) {
  e = Eu(e);
  const t = Cu(e),
    n = Pu(e, t.state, t.location, t.replace);
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const s = J(
    { location: "", base: e, go: r, createHref: Ru.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function Nu(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    Tu(e)
  );
}
function Fu(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function di(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Xe = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  hi = Symbol("");
var qs;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(qs || (qs = {}));
function Pt(e, t) {
  return J(new Error(), { type: e, [hi]: !0 }, t);
}
function He(e, t) {
  return e instanceof Error && hi in e && (t == null || !!(e.type & t));
}
const Ws = "[^/]+?",
  Iu = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Mu = /[.+*?^${}()[\]/\\]/g;
function Lu(e, t) {
  const n = J({}, Iu, t),
    r = [];
  let s = n.start ? "^" : "";
  const o = [];
  for (const u of e) {
    const a = u.length ? [] : [90];
    n.strict && !u.length && (s += "/");
    for (let h = 0; h < u.length; h++) {
      const m = u[h];
      let y = 40 + (n.sensitive ? 0.25 : 0);
      if (m.type === 0)
        h || (s += "/"), (s += m.value.replace(Mu, "\\$&")), (y += 40);
      else if (m.type === 1) {
        const { value: E, repeatable: O, optional: j, regexp: T } = m;
        o.push({ name: E, repeatable: O, optional: j });
        const F = T || Ws;
        if (F !== Ws) {
          y += 10;
          try {
            new RegExp(`(${F})`);
          } catch (B) {
            throw new Error(
              `Invalid custom RegExp for param "${E}" (${F}): ` + B.message
            );
          }
        }
        let $ = O ? `((?:${F})(?:/(?:${F}))*)` : `(${F})`;
        h || ($ = j && u.length < 2 ? `(?:/${$})` : "/" + $),
          j && ($ += "?"),
          (s += $),
          (y += 20),
          j && (y += -8),
          O && (y += -20),
          F === ".*" && (y += -50);
      }
      a.push(y);
    }
    r.push(a);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? (s += "$") : n.strict && (s += "(?:/|$)");
  const i = new RegExp(s, n.sensitive ? "" : "i");
  function l(u) {
    const a = u.match(i),
      h = {};
    if (!a) return null;
    for (let m = 1; m < a.length; m++) {
      const y = a[m] || "",
        E = o[m - 1];
      h[E.name] = y && E.repeatable ? y.split("/") : y;
    }
    return h;
  }
  function c(u) {
    let a = "",
      h = !1;
    for (const m of e) {
      (!h || !a.endsWith("/")) && (a += "/"), (h = !1);
      for (const y of m)
        if (y.type === 0) a += y.value;
        else if (y.type === 1) {
          const { value: E, repeatable: O, optional: j } = y,
            T = E in u ? u[E] : "";
          if (Ae(T) && !O)
            throw new Error(
              `Provided param "${E}" is an array but it is not repeatable (* or + modifiers)`
            );
          const F = Ae(T) ? T.join("/") : T;
          if (!F)
            if (j)
              m.length < 2 &&
                (a.endsWith("/") ? (a = a.slice(0, -1)) : (h = !0));
            else throw new Error(`Missing required param "${E}"`);
          a += F;
        }
    }
    return a || "/";
  }
  return { re: i, score: r, keys: o, parse: l, stringify: c };
}
function ju(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Bu(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const o = ju(r[n], s[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Vs(r)) return 1;
    if (Vs(s)) return -1;
  }
  return s.length - r.length;
}
function Vs(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Uu = { type: 0, value: "" },
  Du = /[a-zA-Z0-9_]/;
function ku(e) {
  if (!e) return [[]];
  if (e === "/") return [[Uu]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(y) {
    throw new Error(`ERR (${n})/"${u}": ${y}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let o;
  function i() {
    o && s.push(o), (o = []);
  }
  let l = 0,
    c,
    u = "",
    a = "";
  function h() {
    u &&
      (n === 0
        ? o.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (c === "*" || c === "+") &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: u,
            regexp: a,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?",
          }))
        : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function m() {
    u += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (u && h(), i()) : c === ":" ? (h(), (n = 1)) : m();
        break;
      case 4:
        m(), (n = r);
        break;
      case 1:
        c === "("
          ? (n = 2)
          : Du.test(c)
          ? m()
          : (h(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case 2:
        c === ")"
          ? a[a.length - 1] == "\\"
            ? (a = a.slice(0, -1) + c)
            : (n = 3)
          : (a += c);
        break;
      case 3:
        h(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--, (a = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), h(), i(), s;
}
function $u(e, t, n) {
  const r = Lu(ku(e.path), n),
    s = J(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Hu(e, t) {
  const n = [],
    r = new Map();
  t = Ys({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(a) {
    return r.get(a);
  }
  function o(a, h, m) {
    const y = !m,
      E = Ku(a);
    E.aliasOf = m && m.record;
    const O = Ys(t, a),
      j = [E];
    if ("alias" in a) {
      const $ = typeof a.alias == "string" ? [a.alias] : a.alias;
      for (const B of $)
        j.push(
          J({}, E, {
            components: m ? m.record.components : E.components,
            path: B,
            aliasOf: m ? m.record : E,
          })
        );
    }
    let T, F;
    for (const $ of j) {
      const { path: B } = $;
      if (h && B[0] !== "/") {
        const ce = h.record.path,
          de = ce[ce.length - 1] === "/" ? "" : "/";
        $.path = h.record.path + (B && de + B);
      }
      if (
        ((T = $u($, h, O)),
        m
          ? m.alias.push(T)
          : ((F = F || T),
            F !== T && F.alias.push(T),
            y && a.name && !Qs(T) && i(a.name)),
        E.children)
      ) {
        const ce = E.children;
        for (let de = 0; de < ce.length; de++)
          o(ce[de], T, m && m.children[de]);
      }
      (m = m || T),
        ((T.record.components && Object.keys(T.record.components).length) ||
          T.record.name ||
          T.record.redirect) &&
          c(T);
    }
    return F
      ? () => {
          i(F);
        }
      : qt;
  }
  function i(a) {
    if (di(a)) {
      const h = r.get(a);
      h &&
        (r.delete(a),
        n.splice(n.indexOf(h), 1),
        h.children.forEach(i),
        h.alias.forEach(i));
    } else {
      const h = n.indexOf(a);
      h > -1 &&
        (n.splice(h, 1),
        a.record.name && r.delete(a.record.name),
        a.children.forEach(i),
        a.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(a) {
    let h = 0;
    for (
      ;
      h < n.length &&
      Bu(a, n[h]) >= 0 &&
      (a.record.path !== n[h].record.path || !pi(a, n[h]));

    )
      h++;
    n.splice(h, 0, a), a.record.name && !Qs(a) && r.set(a.record.name, a);
  }
  function u(a, h) {
    let m,
      y = {},
      E,
      O;
    if ("name" in a && a.name) {
      if (((m = r.get(a.name)), !m)) throw Pt(1, { location: a });
      (O = m.record.name),
        (y = J(
          Js(
            h.params,
            m.keys.filter((F) => !F.optional).map((F) => F.name)
          ),
          a.params &&
            Js(
              a.params,
              m.keys.map((F) => F.name)
            )
        )),
        (E = m.stringify(y));
    } else if ("path" in a)
      (E = a.path),
        (m = n.find((F) => F.re.test(E))),
        m && ((y = m.parse(E)), (O = m.record.name));
    else {
      if (((m = h.name ? r.get(h.name) : n.find((F) => F.re.test(h.path))), !m))
        throw Pt(1, { location: a, currentLocation: h });
      (O = m.record.name),
        (y = J({}, h.params, a.params)),
        (E = m.stringify(y));
    }
    const j = [];
    let T = m;
    for (; T; ) j.unshift(T.record), (T = T.parent);
    return { name: O, path: E, params: y, matched: j, meta: qu(j) };
  }
  return (
    e.forEach((a) => o(a)),
    {
      addRoute: o,
      resolve: u,
      removeRoute: i,
      getRoutes: l,
      getRecordMatcher: s,
    }
  );
}
function Js(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Ku(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: zu(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function zu(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
  return t;
}
function Qs(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function qu(e) {
  return e.reduce((t, n) => J(t, n.meta), {});
}
function Ys(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function pi(e, t) {
  return t.children.some((n) => n === e || pi(e, n));
}
const mi = /#/g,
  Wu = /&/g,
  Vu = /\//g,
  Ju = /=/g,
  Qu = /\?/g,
  gi = /\+/g,
  Yu = /%5B/g,
  Xu = /%5D/g,
  yi = /%5E/g,
  Gu = /%60/g,
  bi = /%7B/g,
  Zu = /%7C/g,
  _i = /%7D/g,
  ea = /%20/g;
function Zr(e) {
  return encodeURI("" + e)
    .replace(Zu, "|")
    .replace(Yu, "[")
    .replace(Xu, "]");
}
function ta(e) {
  return Zr(e).replace(bi, "{").replace(_i, "}").replace(yi, "^");
}
function vr(e) {
  return Zr(e)
    .replace(gi, "%2B")
    .replace(ea, "+")
    .replace(mi, "%23")
    .replace(Wu, "%26")
    .replace(Gu, "`")
    .replace(bi, "{")
    .replace(_i, "}")
    .replace(yi, "^");
}
function na(e) {
  return vr(e).replace(Ju, "%3D");
}
function ra(e) {
  return Zr(e).replace(mi, "%23").replace(Qu, "%3F");
}
function sa(e) {
  return e == null ? "" : ra(e).replace(Vu, "%2F");
}
function Cn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function oa(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(gi, " "),
      i = o.indexOf("="),
      l = Cn(i < 0 ? o : o.slice(0, i)),
      c = i < 0 ? null : Cn(o.slice(i + 1));
    if (l in t) {
      let u = t[l];
      Ae(u) || (u = t[l] = [u]), u.push(c);
    } else t[l] = c;
  }
  return t;
}
function Xs(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = na(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Ae(r) ? r.map((o) => o && vr(o)) : [r && vr(r)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
    });
  }
  return t;
}
function ia(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Ae(r)
        ? r.map((s) => (s == null ? null : "" + s))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const la = Symbol(""),
  Gs = Symbol(""),
  es = Symbol(""),
  Ei = Symbol(""),
  Ar = Symbol("");
function Ut() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function et(e, t, n, r, s) {
  const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((i, l) => {
      const c = (h) => {
          h === !1
            ? l(Pt(4, { from: n, to: t }))
            : h instanceof Error
            ? l(h)
            : Fu(h)
            ? l(Pt(2, { from: t, to: h }))
            : (o &&
                r.enterCallbacks[s] === o &&
                typeof h == "function" &&
                o.push(h),
              i());
        },
        u = e.call(r && r.instances[s], t, n, c);
      let a = Promise.resolve(u);
      e.length < 3 && (a = a.then(c)), a.catch((h) => l(h));
    });
}
function lr(e, t, n, r) {
  const s = [];
  for (const o of e)
    for (const i in o.components) {
      let l = o.components[i];
      if (!(t !== "beforeRouteEnter" && !o.instances[i]))
        if (ca(l)) {
          const u = (l.__vccOpts || l)[t];
          u && s.push(et(u, n, r, o, i));
        } else {
          let c = l();
          s.push(() =>
            c.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`)
                );
              const a = hu(u) ? u.default : u;
              o.components[i] = a;
              const m = (a.__vccOpts || a)[t];
              return m && et(m, n, r, o, i)();
            })
          );
        }
    }
  return s;
}
function ca(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Zs(e) {
  const t = ze(es),
    n = ze(Ei),
    r = be(() => t.resolve(at(e.to))),
    s = be(() => {
      const { matched: c } = r.value,
        { length: u } = c,
        a = c[u - 1],
        h = n.matched;
      if (!a || !h.length) return -1;
      const m = h.findIndex(At.bind(null, a));
      if (m > -1) return m;
      const y = eo(c[u - 2]);
      return u > 1 && eo(a) === y && h[h.length - 1].path !== y
        ? h.findIndex(At.bind(null, c[u - 2]))
        : m;
    }),
    o = be(() => s.value > -1 && da(n.params, r.value.params)),
    i = be(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        ai(n.params, r.value.params)
    );
  function l(c = {}) {
    return fa(c)
      ? t[at(e.replace) ? "replace" : "push"](at(e.to)).catch(qt)
      : Promise.resolve();
  }
  return {
    route: r,
    href: be(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l,
  };
}
const ua = Vo({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Zs,
    setup(e, { slots: t }) {
      const n = nn(Zs(e)),
        { options: r } = ze(es),
        s = be(() => ({
          [to(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [to(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : ui(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              o
            );
      };
    },
  }),
  aa = ua;
function fa(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function da(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == "string") {
      if (r !== s) return !1;
    } else if (!Ae(s) || s.length !== r.length || r.some((o, i) => o !== s[i]))
      return !1;
  }
  return !0;
}
function eo(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const to = (e, t, n) => e ?? t ?? n,
  ha = Vo({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = ze(Ar),
        s = be(() => e.route || r.value),
        o = ze(Gs, 0),
        i = be(() => {
          let u = at(o);
          const { matched: a } = s.value;
          let h;
          for (; (h = a[u]) && !h.components; ) u++;
          return u;
        }),
        l = be(() => s.value.matched[i.value]);
      bn(
        Gs,
        be(() => i.value + 1)
      ),
        bn(la, l),
        bn(Ar, s);
      const c = Fl();
      return (
        gn(
          () => [c.value, l.value, e.name],
          ([u, a, h], [m, y, E]) => {
            a &&
              ((a.instances[h] = u),
              y &&
                y !== a &&
                u &&
                u === m &&
                (a.leaveGuards.size || (a.leaveGuards = y.leaveGuards),
                a.updateGuards.size || (a.updateGuards = y.updateGuards))),
              u &&
                a &&
                (!y || !At(a, y) || !m) &&
                (a.enterCallbacks[h] || []).forEach((O) => O(u));
          },
          { flush: "post" }
        ),
        () => {
          const u = s.value,
            a = e.name,
            h = l.value,
            m = h && h.components[a];
          if (!m) return no(n.default, { Component: m, route: u });
          const y = h.props[a],
            E = y
              ? y === !0
                ? u.params
                : typeof y == "function"
                ? y(u)
                : y
              : null,
            j = ui(
              m,
              J({}, E, t, {
                onVnodeUnmounted: (T) => {
                  T.component.isUnmounted && (h.instances[a] = null);
                },
                ref: c,
              })
            );
          return no(n.default, { Component: j, route: u }) || j;
        }
      );
    },
  });
function no(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const wi = ha;
function pa(e) {
  const t = Hu(e.routes, e),
    n = e.parseQuery || oa,
    r = e.stringifyQuery || Xs,
    s = e.history,
    o = Ut(),
    i = Ut(),
    l = Ut(),
    c = Il(Xe);
  let u = Xe;
  bt &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const a = or.bind(null, (_) => "" + _),
    h = or.bind(null, sa),
    m = or.bind(null, Cn);
  function y(_, C) {
    let A, I;
    return (
      di(_) ? ((A = t.getRecordMatcher(_)), (I = C)) : (I = _), t.addRoute(I, A)
    );
  }
  function E(_) {
    const C = t.getRecordMatcher(_);
    C && t.removeRoute(C);
  }
  function O() {
    return t.getRoutes().map((_) => _.record);
  }
  function j(_) {
    return !!t.getRecordMatcher(_);
  }
  function T(_, C) {
    if (((C = J({}, C || c.value)), typeof _ == "string")) {
      const p = ir(n, _, C.path),
        g = t.resolve({ path: p.path }, C),
        w = s.createHref(p.fullPath);
      return J(p, g, {
        params: m(g.params),
        hash: Cn(p.hash),
        redirectedFrom: void 0,
        href: w,
      });
    }
    let A;
    if ("path" in _) A = J({}, _, { path: ir(n, _.path, C.path).path });
    else {
      const p = J({}, _.params);
      for (const g in p) p[g] == null && delete p[g];
      (A = J({}, _, { params: h(p) })), (C.params = h(C.params));
    }
    const I = t.resolve(A, C),
      V = _.hash || "";
    I.params = a(m(I.params));
    const f = gu(r, J({}, _, { hash: ta(V), path: I.path })),
      d = s.createHref(f);
    return J(
      { fullPath: f, hash: V, query: r === Xs ? ia(_.query) : _.query || {} },
      I,
      { redirectedFrom: void 0, href: d }
    );
  }
  function F(_) {
    return typeof _ == "string" ? ir(n, _, c.value.path) : J({}, _);
  }
  function $(_, C) {
    if (u !== _) return Pt(8, { from: C, to: _ });
  }
  function B(_) {
    return Pe(_);
  }
  function ce(_) {
    return B(J(F(_), { replace: !0 }));
  }
  function de(_) {
    const C = _.matched[_.matched.length - 1];
    if (C && C.redirect) {
      const { redirect: A } = C;
      let I = typeof A == "function" ? A(_) : A;
      return (
        typeof I == "string" &&
          ((I = I.includes("?") || I.includes("#") ? (I = F(I)) : { path: I }),
          (I.params = {})),
        J(
          { query: _.query, hash: _.hash, params: "path" in I ? {} : _.params },
          I
        )
      );
    }
  }
  function Pe(_, C) {
    const A = (u = T(_)),
      I = c.value,
      V = _.state,
      f = _.force,
      d = _.replace === !0,
      p = de(A);
    if (p)
      return Pe(
        J(F(p), {
          state: typeof p == "object" ? J({}, V, p.state) : V,
          force: f,
          replace: d,
        }),
        C || A
      );
    const g = A;
    g.redirectedFrom = C;
    let w;
    return (
      !f && yu(r, I, A) && ((w = Pt(16, { to: g, from: I })), Ne(I, I, !0, !1)),
      (w ? Promise.resolve(w) : Ce(g, I))
        .catch((R) => (He(R) ? (He(R, 2) ? R : Qe(R)) : W(R, g, I)))
        .then((R) => {
          if (R) {
            if (He(R, 2))
              return Pe(
                J({ replace: d }, F(R.to), {
                  state: typeof R.to == "object" ? J({}, V, R.to.state) : V,
                  force: f,
                }),
                C || g
              );
          } else R = st(g, I, !0, d, V);
          return Je(g, I, R), R;
        })
    );
  }
  function ke(_, C) {
    const A = $(_, C);
    return A ? Promise.reject(A) : Promise.resolve();
  }
  function dt(_) {
    const C = mt.values().next().value;
    return C && typeof C.runWithContext == "function"
      ? C.runWithContext(_)
      : _();
  }
  function Ce(_, C) {
    let A;
    const [I, V, f] = ma(_, C);
    A = lr(I.reverse(), "beforeRouteLeave", _, C);
    for (const p of I)
      p.leaveGuards.forEach((g) => {
        A.push(et(g, _, C));
      });
    const d = ke.bind(null, _, C);
    return (
      A.push(d),
      ue(A)
        .then(() => {
          A = [];
          for (const p of o.list()) A.push(et(p, _, C));
          return A.push(d), ue(A);
        })
        .then(() => {
          A = lr(V, "beforeRouteUpdate", _, C);
          for (const p of V)
            p.updateGuards.forEach((g) => {
              A.push(et(g, _, C));
            });
          return A.push(d), ue(A);
        })
        .then(() => {
          A = [];
          for (const p of _.matched)
            if (p.beforeEnter && !C.matched.includes(p))
              if (Ae(p.beforeEnter))
                for (const g of p.beforeEnter) A.push(et(g, _, C));
              else A.push(et(p.beforeEnter, _, C));
          return A.push(d), ue(A);
        })
        .then(
          () => (
            _.matched.forEach((p) => (p.enterCallbacks = {})),
            (A = lr(f, "beforeRouteEnter", _, C)),
            A.push(d),
            ue(A)
          )
        )
        .then(() => {
          A = [];
          for (const p of i.list()) A.push(et(p, _, C));
          return A.push(d), ue(A);
        })
        .catch((p) => (He(p, 8) ? p : Promise.reject(p)))
    );
  }
  function Je(_, C, A) {
    for (const I of l.list()) dt(() => I(_, C, A));
  }
  function st(_, C, A, I, V) {
    const f = $(_, C);
    if (f) return f;
    const d = C === Xe,
      p = bt ? history.state : {};
    A &&
      (I || d
        ? s.replace(_.fullPath, J({ scroll: d && p && p.scroll }, V))
        : s.push(_.fullPath, V)),
      (c.value = _),
      Ne(_, C, A, d),
      Qe();
  }
  let Te;
  function Lt() {
    Te ||
      (Te = s.listen((_, C, A) => {
        if (!on.listening) return;
        const I = T(_),
          V = de(I);
        if (V) {
          Pe(J(V, { replace: !0 }), I).catch(qt);
          return;
        }
        u = I;
        const f = c.value;
        bt && Su(Ks(f.fullPath, A.delta), zn()),
          Ce(I, f)
            .catch((d) =>
              He(d, 12)
                ? d
                : He(d, 2)
                ? (Pe(d.to, I)
                    .then((p) => {
                      He(p, 20) &&
                        !A.delta &&
                        A.type === en.pop &&
                        s.go(-1, !1);
                    })
                    .catch(qt),
                  Promise.reject())
                : (A.delta && s.go(-A.delta, !1), W(d, I, f))
            )
            .then((d) => {
              (d = d || st(I, f, !1)),
                d &&
                  (A.delta && !He(d, 8)
                    ? s.go(-A.delta, !1)
                    : A.type === en.pop && He(d, 20) && s.go(-1, !1)),
                Je(I, f, d);
            })
            .catch(qt);
      }));
  }
  let ht = Ut(),
    re = Ut(),
    Y;
  function W(_, C, A) {
    Qe(_);
    const I = re.list();
    return (
      I.length ? I.forEach((V) => V(_, C, A)) : console.error(_),
      Promise.reject(_)
    );
  }
  function $e() {
    return Y && c.value !== Xe
      ? Promise.resolve()
      : new Promise((_, C) => {
          ht.add([_, C]);
        });
  }
  function Qe(_) {
    return (
      Y ||
        ((Y = !_),
        Lt(),
        ht.list().forEach(([C, A]) => (_ ? A(_) : C())),
        ht.reset()),
      _
    );
  }
  function Ne(_, C, A, I) {
    const { scrollBehavior: V } = e;
    if (!bt || !V) return Promise.resolve();
    const f =
      (!A && vu(Ks(_.fullPath, 0))) ||
      ((I || !A) && history.state && history.state.scroll) ||
      null;
    return Do()
      .then(() => V(_, C, f))
      .then((d) => d && Ou(d))
      .catch((d) => W(d, _, C));
  }
  const pe = (_) => s.go(_);
  let pt;
  const mt = new Set(),
    on = {
      currentRoute: c,
      listening: !0,
      addRoute: y,
      removeRoute: E,
      hasRoute: j,
      getRoutes: O,
      resolve: T,
      options: e,
      push: B,
      replace: ce,
      go: pe,
      back: () => pe(-1),
      forward: () => pe(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: re.add,
      isReady: $e,
      install(_) {
        const C = this;
        _.component("RouterLink", aa),
          _.component("RouterView", wi),
          (_.config.globalProperties.$router = C),
          Object.defineProperty(_.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => at(c),
          }),
          bt &&
            !pt &&
            c.value === Xe &&
            ((pt = !0), B(s.location).catch((V) => {}));
        const A = {};
        for (const V in Xe) A[V] = be(() => c.value[V]);
        _.provide(es, C), _.provide(Ei, nn(A)), _.provide(Ar, c);
        const I = _.unmount;
        mt.add(_),
          (_.unmount = function () {
            mt.delete(_),
              mt.size < 1 &&
                ((u = Xe),
                Te && Te(),
                (Te = null),
                (c.value = Xe),
                (pt = !1),
                (Y = !1)),
              I();
          });
      },
    };
  function ue(_) {
    return _.reduce((C, A) => C.then(() => dt(A)), Promise.resolve());
  }
  return on;
}
function ma(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => At(u, l)) ? r.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((u) => At(u, c)) || s.push(c));
  }
  return [n, r, s];
}
const ts = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  ga = {},
  ya = { class: "app-header flex justify-between glass" },
  ba = oe("h2", null, "Ministry of Coin", -1),
  _a = { class: "flex" };
function Ea(e, t, n, r, s, o) {
  const i = uc("RouterLink");
  return (
    $n(),
    Hn("header", ya, [
      ba,
      oe("nav", _a, [
        le(i, { to: "/" }, { default: mn(() => [zt("Home")]), _: 1 }),
        le(
          i,
          { to: "/contact" },
          { default: mn(() => [zt("Contacts")]), _: 1 }
        ),
        le(
          i,
          { to: "/stats" },
          { default: mn(() => [zt("Statistics")]), _: 1 }
        ),
      ]),
    ])
  );
}
const wa = ts(ga, [["render", Ea]]),
  Ra = {},
  xa = { class: "glass" },
  Oa = oe(
    "div",
    { class: "footer-container flex center" },
    [
      oe("p", null, "Footer!"),
      oe("p", null, "This is a footer"),
      oe("pre", null, "Hey! im a footer"),
    ],
    -1
  ),
  Sa = [Oa];
function va(e, t, n, r, s, o) {
  return $n(), Hn("footer", xa, Sa);
}
const Aa = ts(Ra, [["render", va]]),
  Pa = {
    __name: "App",
    setup(e) {
      return (t, n) => ($n(), Hn(Me, null, [le(wa), le(at(wi)), le(Aa)], 64));
    },
  },
  Ca = "modulepreload",
  Ta = function (e) {
    return "/ministry-of-coin/" + e;
  },
  ro = {},
  hn = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName("link");
    return Promise.all(
      n.map((o) => {
        if (((o = Ta(o)), o in ro)) return;
        ro[o] = !0;
        const i = o.endsWith(".css"),
          l = i ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let a = s.length - 1; a >= 0; a--) {
            const h = s[a];
            if (h.href === o && (!i || h.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${o}"]${l}`)) return;
        const u = document.createElement("link");
        if (
          ((u.rel = i ? "stylesheet" : Ca),
          i || ((u.as = "script"), (u.crossOrigin = "")),
          (u.href = o),
          document.head.appendChild(u),
          i)
        )
          return new Promise((a, h) => {
            u.addEventListener("load", a),
              u.addEventListener("error", () =>
                h(new Error(`Unable to preload CSS for ${o}`))
              );
          });
      })
    ).then(() => t());
  };
function Ri(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: Na } = Object.prototype,
  { getPrototypeOf: ns } = Object,
  qn = ((e) => (t) => {
    const n = Na.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  De = (e) => ((e = e.toLowerCase()), (t) => qn(t) === e),
  Wn = (e) => (t) => typeof t === e,
  { isArray: Mt } = Array,
  tn = Wn("undefined");
function Fa(e) {
  return (
    e !== null &&
    !tn(e) &&
    e.constructor !== null &&
    !tn(e.constructor) &&
    _e(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const xi = De("ArrayBuffer");
function Ia(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && xi(e.buffer)),
    t
  );
}
const Ma = Wn("string"),
  _e = Wn("function"),
  Oi = Wn("number"),
  Vn = (e) => e !== null && typeof e == "object",
  La = (e) => e === !0 || e === !1,
  En = (e) => {
    if (qn(e) !== "object") return !1;
    const t = ns(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  ja = De("Date"),
  Ba = De("File"),
  Ua = De("Blob"),
  Da = De("FileList"),
  ka = (e) => Vn(e) && _e(e.pipe),
  $a = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (_e(e.append) &&
          ((t = qn(e)) === "formdata" ||
            (t === "object" &&
              _e(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  Ha = De("URLSearchParams"),
  Ka = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function rn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, s;
  if ((typeof e != "object" && (e = [e]), Mt(e)))
    for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let l;
    for (r = 0; r < i; r++) (l = o[r]), t.call(null, e[l], l, e);
  }
}
function Si(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    s;
  for (; r-- > 0; ) if (((s = n[r]), t === s.toLowerCase())) return s;
  return null;
}
const vi = (() =>
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global)(),
  Ai = (e) => !tn(e) && e !== vi;
function Pr() {
  const { caseless: e } = (Ai(this) && this) || {},
    t = {},
    n = (r, s) => {
      const o = (e && Si(t, s)) || s;
      En(t[o]) && En(r)
        ? (t[o] = Pr(t[o], r))
        : En(r)
        ? (t[o] = Pr({}, r))
        : Mt(r)
        ? (t[o] = r.slice())
        : (t[o] = r);
    };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && rn(arguments[r], n);
  return t;
}
const za = (e, t, n, { allOwnKeys: r } = {}) => (
    rn(
      t,
      (s, o) => {
        n && _e(s) ? (e[o] = Ri(s, n)) : (e[o] = s);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  qa = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Wa = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  Va = (e, t, n, r) => {
    let s, o, i;
    const l = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
        (i = s[o]), (!r || r(i, e, t)) && !l[i] && ((t[i] = e[i]), (l[i] = !0));
      e = n !== !1 && ns(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  Ja = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  Qa = (e) => {
    if (!e) return null;
    if (Mt(e)) return e;
    let t = e.length;
    if (!Oi(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  Ya = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && ns(Uint8Array)),
  Xa = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let s;
    for (; (s = r.next()) && !s.done; ) {
      const o = s.value;
      t.call(e, o[0], o[1]);
    }
  },
  Ga = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  Za = De("HTMLFormElement"),
  ef = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
      return r.toUpperCase() + s;
    }),
  so = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  tf = De("RegExp"),
  Pi = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    rn(n, (s, o) => {
      t(s, o, e) !== !1 && (r[o] = s);
    }),
      Object.defineProperties(e, r);
  },
  nf = (e) => {
    Pi(e, (t, n) => {
      if (_e(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (_e(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  rf = (e, t) => {
    const n = {},
      r = (s) => {
        s.forEach((o) => {
          n[o] = !0;
        });
      };
    return Mt(e) ? r(e) : r(String(e).split(t)), n;
  },
  sf = () => {},
  of = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  cr = "abcdefghijklmnopqrstuvwxyz",
  oo = "0123456789",
  Ci = { DIGIT: oo, ALPHA: cr, ALPHA_DIGIT: cr + cr.toUpperCase() + oo },
  lf = (e = 16, t = Ci.ALPHA_DIGIT) => {
    let n = "";
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function cf(e) {
  return !!(
    e &&
    _e(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const uf = (e) => {
    const t = new Array(10),
      n = (r, s) => {
        if (Vn(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[s] = r;
            const o = Mt(r) ? [] : {};
            return (
              rn(r, (i, l) => {
                const c = n(i, s + 1);
                !tn(c) && (o[l] = c);
              }),
              (t[s] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  af = De("AsyncFunction"),
  ff = (e) => e && (Vn(e) || _e(e)) && _e(e.then) && _e(e.catch),
  b = {
    isArray: Mt,
    isArrayBuffer: xi,
    isBuffer: Fa,
    isFormData: $a,
    isArrayBufferView: Ia,
    isString: Ma,
    isNumber: Oi,
    isBoolean: La,
    isObject: Vn,
    isPlainObject: En,
    isUndefined: tn,
    isDate: ja,
    isFile: Ba,
    isBlob: Ua,
    isRegExp: tf,
    isFunction: _e,
    isStream: ka,
    isURLSearchParams: Ha,
    isTypedArray: Ya,
    isFileList: Da,
    forEach: rn,
    merge: Pr,
    extend: za,
    trim: Ka,
    stripBOM: qa,
    inherits: Wa,
    toFlatObject: Va,
    kindOf: qn,
    kindOfTest: De,
    endsWith: Ja,
    toArray: Qa,
    forEachEntry: Xa,
    matchAll: Ga,
    isHTMLForm: Za,
    hasOwnProperty: so,
    hasOwnProp: so,
    reduceDescriptors: Pi,
    freezeMethods: nf,
    toObjectSet: rf,
    toCamelCase: ef,
    noop: sf,
    toFiniteNumber: of,
    findKey: Si,
    global: vi,
    isContextDefined: Ai,
    ALPHABET: Ci,
    generateString: lf,
    isSpecCompliantForm: cf,
    toJSONObject: uf,
    isAsyncFn: af,
    isThenable: ff,
  };
function z(e, t, n, r, s) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    s && (this.response = s);
}
b.inherits(z, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: b.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const Ti = z.prototype,
  Ni = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  Ni[e] = { value: e };
});
Object.defineProperties(z, Ni);
Object.defineProperty(Ti, "isAxiosError", { value: !0 });
z.from = (e, t, n, r, s, o) => {
  const i = Object.create(Ti);
  return (
    b.toFlatObject(
      e,
      i,
      function (c) {
        return c !== Error.prototype;
      },
      (l) => l !== "isAxiosError"
    ),
    z.call(i, e.message, t, n, r, s),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
const df = null;
function Cr(e) {
  return b.isPlainObject(e) || b.isArray(e);
}
function Fi(e) {
  return b.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function io(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (s, o) {
          return (s = Fi(s)), !n && o ? "[" + s + "]" : s;
        })
        .join(n ? "." : "")
    : t;
}
function hf(e) {
  return b.isArray(e) && !e.some(Cr);
}
const pf = b.toFlatObject(b, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Jn(e, t, n) {
  if (!b.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = b.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (O, j) {
        return !b.isUndefined(j[O]);
      }
    ));
  const r = n.metaTokens,
    s = n.visitor || a,
    o = n.dots,
    i = n.indexes,
    c = (n.Blob || (typeof Blob < "u" && Blob)) && b.isSpecCompliantForm(t);
  if (!b.isFunction(s)) throw new TypeError("visitor must be a function");
  function u(E) {
    if (E === null) return "";
    if (b.isDate(E)) return E.toISOString();
    if (!c && b.isBlob(E))
      throw new z("Blob is not supported. Use a Buffer instead.");
    return b.isArrayBuffer(E) || b.isTypedArray(E)
      ? c && typeof Blob == "function"
        ? new Blob([E])
        : Buffer.from(E)
      : E;
  }
  function a(E, O, j) {
    let T = E;
    if (E && !j && typeof E == "object") {
      if (b.endsWith(O, "{}"))
        (O = r ? O : O.slice(0, -2)), (E = JSON.stringify(E));
      else if (
        (b.isArray(E) && hf(E)) ||
        ((b.isFileList(E) || b.endsWith(O, "[]")) && (T = b.toArray(E)))
      )
        return (
          (O = Fi(O)),
          T.forEach(function ($, B) {
            !(b.isUndefined($) || $ === null) &&
              t.append(
                i === !0 ? io([O], B, o) : i === null ? O : O + "[]",
                u($)
              );
          }),
          !1
        );
    }
    return Cr(E) ? !0 : (t.append(io(j, O, o), u(E)), !1);
  }
  const h = [],
    m = Object.assign(pf, {
      defaultVisitor: a,
      convertValue: u,
      isVisitable: Cr,
    });
  function y(E, O) {
    if (!b.isUndefined(E)) {
      if (h.indexOf(E) !== -1)
        throw Error("Circular reference detected in " + O.join("."));
      h.push(E),
        b.forEach(E, function (T, F) {
          (!(b.isUndefined(T) || T === null) &&
            s.call(t, T, b.isString(F) ? F.trim() : F, O, m)) === !0 &&
            y(T, O ? O.concat(F) : [F]);
        }),
        h.pop();
    }
  }
  if (!b.isObject(e)) throw new TypeError("data must be an object");
  return y(e), t;
}
function lo(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function rs(e, t) {
  (this._pairs = []), e && Jn(e, this, t);
}
const Ii = rs.prototype;
Ii.append = function (t, n) {
  this._pairs.push([t, n]);
};
Ii.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, lo);
      }
    : lo;
  return this._pairs
    .map(function (s) {
      return n(s[0]) + "=" + n(s[1]);
    }, "")
    .join("&");
};
function mf(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function Mi(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || mf,
    s = n && n.serialize;
  let o;
  if (
    (s
      ? (o = s(t, n))
      : (o = b.isURLSearchParams(t) ? t.toString() : new rs(t, n).toString(r)),
    o)
  ) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class gf {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    b.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const co = gf,
  Li = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  yf = typeof URLSearchParams < "u" ? URLSearchParams : rs,
  bf = typeof FormData < "u" ? FormData : null,
  _f = typeof Blob < "u" ? Blob : null,
  Ef = (() => {
    let e;
    return typeof navigator < "u" &&
      ((e = navigator.product) === "ReactNative" ||
        e === "NativeScript" ||
        e === "NS")
      ? !1
      : typeof window < "u" && typeof document < "u";
  })(),
  wf = (() =>
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function")(),
  Be = {
    isBrowser: !0,
    classes: { URLSearchParams: yf, FormData: bf, Blob: _f },
    isStandardBrowserEnv: Ef,
    isStandardBrowserWebWorkerEnv: wf,
    protocols: ["http", "https", "file", "blob", "url", "data"],
  };
function Rf(e, t) {
  return Jn(
    e,
    new Be.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, s, o) {
          return Be.isNode && b.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function xf(e) {
  return b
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function Of(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++) (o = n[r]), (t[o] = e[o]);
  return t;
}
function ji(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    const l = Number.isFinite(+i),
      c = o >= n.length;
    return (
      (i = !i && b.isArray(s) ? s.length : i),
      c
        ? (b.hasOwnProp(s, i) ? (s[i] = [s[i], r]) : (s[i] = r), !l)
        : ((!s[i] || !b.isObject(s[i])) && (s[i] = []),
          t(n, r, s[i], o) && b.isArray(s[i]) && (s[i] = Of(s[i])),
          !l)
    );
  }
  if (b.isFormData(e) && b.isFunction(e.entries)) {
    const n = {};
    return (
      b.forEachEntry(e, (r, s) => {
        t(xf(r), s, n, 0);
      }),
      n
    );
  }
  return null;
}
const Sf = { "Content-Type": void 0 };
function vf(e, t, n) {
  if (b.isString(e))
    try {
      return (t || JSON.parse)(e), b.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const Qn = {
  transitional: Li,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        s = r.indexOf("application/json") > -1,
        o = b.isObject(t);
      if ((o && b.isHTMLForm(t) && (t = new FormData(t)), b.isFormData(t)))
        return s && s ? JSON.stringify(ji(t)) : t;
      if (
        b.isArrayBuffer(t) ||
        b.isBuffer(t) ||
        b.isStream(t) ||
        b.isFile(t) ||
        b.isBlob(t)
      )
        return t;
      if (b.isArrayBufferView(t)) return t.buffer;
      if (b.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let l;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return Rf(t, this.formSerializer).toString();
        if ((l = b.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData;
          return Jn(
            l ? { "files[]": t } : t,
            c && new c(),
            this.formSerializer
          );
        }
      }
      return o || s ? (n.setContentType("application/json", !1), vf(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Qn.transitional,
        r = n && n.forcedJSONParsing,
        s = this.responseType === "json";
      if (t && b.isString(t) && ((r && !this.responseType) || s)) {
        const i = !(n && n.silentJSONParsing) && s;
        try {
          return JSON.parse(t);
        } catch (l) {
          if (i)
            throw l.name === "SyntaxError"
              ? z.from(l, z.ERR_BAD_RESPONSE, this, null, this.response)
              : l;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Be.classes.FormData, Blob: Be.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
b.forEach(["delete", "get", "head"], function (t) {
  Qn.headers[t] = {};
});
b.forEach(["post", "put", "patch"], function (t) {
  Qn.headers[t] = b.merge(Sf);
});
const ss = Qn,
  Af = b.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Pf = (e) => {
    const t = {};
    let n, r, s;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            (s = i.indexOf(":")),
              (n = i.substring(0, s).trim().toLowerCase()),
              (r = i.substring(s + 1).trim()),
              !(!n || (t[n] && Af[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  uo = Symbol("internals");
function Dt(e) {
  return e && String(e).trim().toLowerCase();
}
function wn(e) {
  return e === !1 || e == null ? e : b.isArray(e) ? e.map(wn) : String(e);
}
function Cf(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const Tf = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ur(e, t, n, r, s) {
  if (b.isFunction(r)) return r.call(this, t, n);
  if ((s && (t = n), !!b.isString(t))) {
    if (b.isString(r)) return t.indexOf(r) !== -1;
    if (b.isRegExp(r)) return r.test(t);
  }
}
function Nf(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Ff(e, t) {
  const n = b.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (s, o, i) {
        return this[r].call(this, t, s, o, i);
      },
      configurable: !0,
    });
  });
}
class Yn {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(l, c, u) {
      const a = Dt(c);
      if (!a) throw new Error("header name must be a non-empty string");
      const h = b.findKey(s, a);
      (!h || s[h] === void 0 || u === !0 || (u === void 0 && s[h] !== !1)) &&
        (s[h || c] = wn(l));
    }
    const i = (l, c) => b.forEach(l, (u, a) => o(u, a, c));
    return (
      b.isPlainObject(t) || t instanceof this.constructor
        ? i(t, n)
        : b.isString(t) && (t = t.trim()) && !Tf(t)
        ? i(Pf(t), n)
        : t != null && o(n, t, r),
      this
    );
  }
  get(t, n) {
    if (((t = Dt(t)), t)) {
      const r = b.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n) return s;
        if (n === !0) return Cf(s);
        if (b.isFunction(n)) return n.call(this, s, r);
        if (b.isRegExp(n)) return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Dt(t)), t)) {
      const r = b.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || ur(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (((i = Dt(i)), i)) {
        const l = b.findKey(r, i);
        l && (!n || ur(r, r[l], l, n)) && (delete r[l], (s = !0));
      }
    }
    return b.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      s = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || ur(this, this[o], o, t, !0)) && (delete this[o], (s = !0));
    }
    return s;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      b.forEach(this, (s, o) => {
        const i = b.findKey(r, o);
        if (i) {
          (n[i] = wn(s)), delete n[o];
          return;
        }
        const l = t ? Nf(o) : String(o).trim();
        l !== o && delete n[o], (n[l] = wn(s)), (r[l] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      b.forEach(this, (r, s) => {
        r != null && r !== !1 && (n[s] = t && b.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((s) => r.set(s)), r;
  }
  static accessor(t) {
    const r = (this[uo] = this[uo] = { accessors: {} }).accessors,
      s = this.prototype;
    function o(i) {
      const l = Dt(i);
      r[l] || (Ff(s, i), (r[l] = !0));
    }
    return b.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
Yn.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
b.freezeMethods(Yn.prototype);
b.freezeMethods(Yn);
const qe = Yn;
function ar(e, t) {
  const n = this || ss,
    r = t || n,
    s = qe.from(r.headers);
  let o = r.data;
  return (
    b.forEach(e, function (l) {
      o = l.call(n, o, s.normalize(), t ? t.status : void 0);
    }),
    s.normalize(),
    o
  );
}
function Bi(e) {
  return !!(e && e.__CANCEL__);
}
function sn(e, t, n) {
  z.call(this, e ?? "canceled", z.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
b.inherits(sn, z, { __CANCEL__: !0 });
function If(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new z(
          "Request failed with status code " + n.status,
          [z.ERR_BAD_REQUEST, z.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
const Mf = Be.isStandardBrowserEnv
  ? (function () {
      return {
        write: function (n, r, s, o, i, l) {
          const c = [];
          c.push(n + "=" + encodeURIComponent(r)),
            b.isNumber(s) && c.push("expires=" + new Date(s).toGMTString()),
            b.isString(o) && c.push("path=" + o),
            b.isString(i) && c.push("domain=" + i),
            l === !0 && c.push("secure"),
            (document.cookie = c.join("; "));
        },
        read: function (n) {
          const r = document.cookie.match(
            new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
          );
          return r ? decodeURIComponent(r[3]) : null;
        },
        remove: function (n) {
          this.write(n, "", Date.now() - 864e5);
        },
      };
    })()
  : (function () {
      return {
        write: function () {},
        read: function () {
          return null;
        },
        remove: function () {},
      };
    })();
function Lf(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function jf(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ui(e, t) {
  return e && !Lf(t) ? jf(e, t) : t;
}
const Bf = Be.isStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a");
      let r;
      function s(o) {
        let i = o;
        return (
          t && (n.setAttribute("href", i), (i = n.href)),
          n.setAttribute("href", i),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
          }
        );
      }
      return (
        (r = s(window.location.href)),
        function (i) {
          const l = b.isString(i) ? s(i) : i;
          return l.protocol === r.protocol && l.host === r.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function Uf(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function Df(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let s = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (c) {
      const u = Date.now(),
        a = r[o];
      i || (i = u), (n[s] = c), (r[s] = u);
      let h = o,
        m = 0;
      for (; h !== s; ) (m += n[h++]), (h = h % e);
      if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), u - i < t)) return;
      const y = a && u - a;
      return y ? Math.round((m * 1e3) / y) : void 0;
    }
  );
}
function ao(e, t) {
  let n = 0;
  const r = Df(50, 250);
  return (s) => {
    const o = s.loaded,
      i = s.lengthComputable ? s.total : void 0,
      l = o - n,
      c = r(l),
      u = o <= i;
    n = o;
    const a = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: l,
      rate: c || void 0,
      estimated: c && i && u ? (i - o) / c : void 0,
      event: s,
    };
    (a[t ? "download" : "upload"] = !0), e(a);
  };
}
const kf = typeof XMLHttpRequest < "u",
  $f =
    kf &&
    function (e) {
      return new Promise(function (n, r) {
        let s = e.data;
        const o = qe.from(e.headers).normalize(),
          i = e.responseType;
        let l;
        function c() {
          e.cancelToken && e.cancelToken.unsubscribe(l),
            e.signal && e.signal.removeEventListener("abort", l);
        }
        b.isFormData(s) &&
          (Be.isStandardBrowserEnv || Be.isStandardBrowserWebWorkerEnv
            ? o.setContentType(!1)
            : o.setContentType("multipart/form-data;", !1));
        let u = new XMLHttpRequest();
        if (e.auth) {
          const y = e.auth.username || "",
            E = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : "";
          o.set("Authorization", "Basic " + btoa(y + ":" + E));
        }
        const a = Ui(e.baseURL, e.url);
        u.open(e.method.toUpperCase(), Mi(a, e.params, e.paramsSerializer), !0),
          (u.timeout = e.timeout);
        function h() {
          if (!u) return;
          const y = qe.from(
              "getAllResponseHeaders" in u && u.getAllResponseHeaders()
            ),
            O = {
              data:
                !i || i === "text" || i === "json"
                  ? u.responseText
                  : u.response,
              status: u.status,
              statusText: u.statusText,
              headers: y,
              config: e,
              request: u,
            };
          If(
            function (T) {
              n(T), c();
            },
            function (T) {
              r(T), c();
            },
            O
          ),
            (u = null);
        }
        if (
          ("onloadend" in u
            ? (u.onloadend = h)
            : (u.onreadystatechange = function () {
                !u ||
                  u.readyState !== 4 ||
                  (u.status === 0 &&
                    !(u.responseURL && u.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(h);
              }),
          (u.onabort = function () {
            u &&
              (r(new z("Request aborted", z.ECONNABORTED, e, u)), (u = null));
          }),
          (u.onerror = function () {
            r(new z("Network Error", z.ERR_NETWORK, e, u)), (u = null);
          }),
          (u.ontimeout = function () {
            let E = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded";
            const O = e.transitional || Li;
            e.timeoutErrorMessage && (E = e.timeoutErrorMessage),
              r(
                new z(
                  E,
                  O.clarifyTimeoutError ? z.ETIMEDOUT : z.ECONNABORTED,
                  e,
                  u
                )
              ),
              (u = null);
          }),
          Be.isStandardBrowserEnv)
        ) {
          const y =
            (e.withCredentials || Bf(a)) &&
            e.xsrfCookieName &&
            Mf.read(e.xsrfCookieName);
          y && o.set(e.xsrfHeaderName, y);
        }
        s === void 0 && o.setContentType(null),
          "setRequestHeader" in u &&
            b.forEach(o.toJSON(), function (E, O) {
              u.setRequestHeader(O, E);
            }),
          b.isUndefined(e.withCredentials) ||
            (u.withCredentials = !!e.withCredentials),
          i && i !== "json" && (u.responseType = e.responseType),
          typeof e.onDownloadProgress == "function" &&
            u.addEventListener("progress", ao(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == "function" &&
            u.upload &&
            u.upload.addEventListener("progress", ao(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((l = (y) => {
              u &&
                (r(!y || y.type ? new sn(null, e, u) : y),
                u.abort(),
                (u = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(l),
            e.signal &&
              (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
        const m = Uf(a);
        if (m && Be.protocols.indexOf(m) === -1) {
          r(new z("Unsupported protocol " + m + ":", z.ERR_BAD_REQUEST, e));
          return;
        }
        u.send(s || null);
      });
    },
  Rn = { http: df, xhr: $f };
b.forEach(Rn, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Hf = {
  getAdapter: (e) => {
    e = b.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (
      let s = 0;
      s < t && ((n = e[s]), !(r = b.isString(n) ? Rn[n.toLowerCase()] : n));
      s++
    );
    if (!r)
      throw r === !1
        ? new z(
            `Adapter ${n} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          )
        : new Error(
            b.hasOwnProp(Rn, n)
              ? `Adapter '${n}' is not available in the build`
              : `Unknown adapter '${n}'`
          );
    if (!b.isFunction(r)) throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: Rn,
};
function fr(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new sn(null, e);
}
function fo(e) {
  return (
    fr(e),
    (e.headers = qe.from(e.headers)),
    (e.data = ar.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Hf.getAdapter(e.adapter || ss.adapter)(e).then(
      function (r) {
        return (
          fr(e),
          (r.data = ar.call(e, e.transformResponse, r)),
          (r.headers = qe.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          Bi(r) ||
            (fr(e),
            r &&
              r.response &&
              ((r.response.data = ar.call(e, e.transformResponse, r.response)),
              (r.response.headers = qe.from(r.response.headers)))),
          Promise.reject(r)
        );
      }
    )
  );
}
const ho = (e) => (e instanceof qe ? e.toJSON() : e);
function Ct(e, t) {
  t = t || {};
  const n = {};
  function r(u, a, h) {
    return b.isPlainObject(u) && b.isPlainObject(a)
      ? b.merge.call({ caseless: h }, u, a)
      : b.isPlainObject(a)
      ? b.merge({}, a)
      : b.isArray(a)
      ? a.slice()
      : a;
  }
  function s(u, a, h) {
    if (b.isUndefined(a)) {
      if (!b.isUndefined(u)) return r(void 0, u, h);
    } else return r(u, a, h);
  }
  function o(u, a) {
    if (!b.isUndefined(a)) return r(void 0, a);
  }
  function i(u, a) {
    if (b.isUndefined(a)) {
      if (!b.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, a);
  }
  function l(u, a, h) {
    if (h in t) return r(u, a);
    if (h in e) return r(void 0, u);
  }
  const c = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (u, a) => s(ho(u), ho(a), !0),
  };
  return (
    b.forEach(Object.keys(Object.assign({}, e, t)), function (a) {
      const h = c[a] || s,
        m = h(e[a], t[a], a);
      (b.isUndefined(m) && h !== l) || (n[a] = m);
    }),
    n
  );
}
const Di = "1.4.0",
  os = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    os[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const po = {};
os.transitional = function (t, n, r) {
  function s(o, i) {
    return (
      "[Axios v" +
      Di +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return (o, i, l) => {
    if (t === !1)
      throw new z(
        s(i, " has been removed" + (n ? " in " + n : "")),
        z.ERR_DEPRECATED
      );
    return (
      n &&
        !po[i] &&
        ((po[i] = !0),
        console.warn(
          s(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, i, l) : !0
    );
  };
};
function Kf(e, t, n) {
  if (typeof e != "object")
    throw new z("options must be an object", z.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s],
      i = t[o];
    if (i) {
      const l = e[o],
        c = l === void 0 || i(l, o, e);
      if (c !== !0)
        throw new z("option " + o + " must be " + c, z.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new z("Unknown option " + o, z.ERR_BAD_OPTION);
  }
}
const Tr = { assertOptions: Kf, validators: os },
  Ge = Tr.validators;
class Tn {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new co(), response: new co() });
  }
  request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Ct(this.defaults, n));
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    r !== void 0 &&
      Tr.assertOptions(
        r,
        {
          silentJSONParsing: Ge.transitional(Ge.boolean),
          forcedJSONParsing: Ge.transitional(Ge.boolean),
          clarifyTimeoutError: Ge.transitional(Ge.boolean),
        },
        !1
      ),
      s != null &&
        (b.isFunction(s)
          ? (n.paramsSerializer = { serialize: s })
          : Tr.assertOptions(
              s,
              { encode: Ge.function, serialize: Ge.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let i;
    (i = o && b.merge(o.common, o[n.method])),
      i &&
        b.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          (E) => {
            delete o[E];
          }
        ),
      (n.headers = qe.concat(i, o));
    const l = [];
    let c = !0;
    this.interceptors.request.forEach(function (O) {
      (typeof O.runWhen == "function" && O.runWhen(n) === !1) ||
        ((c = c && O.synchronous), l.unshift(O.fulfilled, O.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (O) {
      u.push(O.fulfilled, O.rejected);
    });
    let a,
      h = 0,
      m;
    if (!c) {
      const E = [fo.bind(this), void 0];
      for (
        E.unshift.apply(E, l),
          E.push.apply(E, u),
          m = E.length,
          a = Promise.resolve(n);
        h < m;

      )
        a = a.then(E[h++], E[h++]);
      return a;
    }
    m = l.length;
    let y = n;
    for (h = 0; h < m; ) {
      const E = l[h++],
        O = l[h++];
      try {
        y = E(y);
      } catch (j) {
        O.call(this, j);
        break;
      }
    }
    try {
      a = fo.call(this, y);
    } catch (E) {
      return Promise.reject(E);
    }
    for (h = 0, m = u.length; h < m; ) a = a.then(u[h++], u[h++]);
    return a;
  }
  getUri(t) {
    t = Ct(this.defaults, t);
    const n = Ui(t.baseURL, t.url);
    return Mi(n, t.params, t.paramsSerializer);
  }
}
b.forEach(["delete", "get", "head", "options"], function (t) {
  Tn.prototype[t] = function (n, r) {
    return this.request(
      Ct(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
b.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, i, l) {
      return this.request(
        Ct(l || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        })
      );
    };
  }
  (Tn.prototype[t] = n()), (Tn.prototype[t + "Form"] = n(!0));
});
const xn = Tn;
class is {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](s);
      r._listeners = null;
    }),
      (this.promise.then = (s) => {
        let o;
        const i = new Promise((l) => {
          r.subscribe(l), (o = l);
        }).then(s);
        return (
          (i.cancel = function () {
            r.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, l) {
        r.reason || ((r.reason = new sn(o, i, l)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new is(function (s) {
        t = s;
      }),
      cancel: t,
    };
  }
}
const zf = is;
function qf(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Wf(e) {
  return b.isObject(e) && e.isAxiosError === !0;
}
const Nr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Nr).forEach(([e, t]) => {
  Nr[t] = e;
});
const Vf = Nr;
function ki(e) {
  const t = new xn(e),
    n = Ri(xn.prototype.request, t);
  return (
    b.extend(n, xn.prototype, t, { allOwnKeys: !0 }),
    b.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (s) {
      return ki(Ct(e, s));
    }),
    n
  );
}
const ne = ki(ss);
ne.Axios = xn;
ne.CanceledError = sn;
ne.CancelToken = zf;
ne.isCancel = Bi;
ne.VERSION = Di;
ne.toFormData = Jn;
ne.AxiosError = z;
ne.Cancel = ne.CanceledError;
ne.all = function (t) {
  return Promise.all(t);
};
ne.spread = qf;
ne.isAxiosError = Wf;
ne.mergeConfig = Ct;
ne.AxiosHeaders = qe;
ne.formToJSON = (e) => ji(b.isHTMLForm(e) ? new FormData(e) : e);
ne.HttpStatusCode = Vf;
ne.default = ne;
const ls = ne,
  Tt = {
    makeId: Jf,
    getRandomIntInclusive: Qf,
    saveToStorage: Yf,
    loadFromStorage: Xf,
    debounce: Gf,
  };
function Jf(e = 8) {
  for (
    var t = "",
      n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      r = 0;
    r < e;
    r++
  )
    t += n.charAt(Math.floor(Math.random() * n.length));
  return t;
}
function Qf(e, t) {
  return (
    (e = Math.ceil(e)),
    (t = Math.floor(t)),
    Math.floor(Math.random() * (t - e + 1)) + e
  );
}
function Yf(e, t) {
  localStorage.setItem(e, JSON.stringify(t));
}
function Xf(e) {
  const t = localStorage.getItem(e);
  return t ? JSON.parse(t) : void 0;
}
function Gf(e, t) {
  let n;
  return (...r) => {
    clearTimeout(n),
      (n = setTimeout(() => {
        e.apply(this, r);
      }, t));
  };
}
const Zf = "https://blockchain.info/tobtc?currency=USD&value=1",
  ed =
    "https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true",
  td =
    "https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true",
  $i = {
    getRate: nd,
    getAvgBlockSize: rd,
    getMarketPriceHistory: sd,
    getEmptyDataSet: id,
  };
window.bitcoinService = $i;
async function nd() {
  const e = Tt.loadFromStorage("btc-rate");
  if (e) return e;
  const t = await ls.get(Zf);
  return Tt.saveToStorage("btc-rate", t.data), t.data;
}
async function rd() {
  const e = Tt.loadFromStorage("btc-block");
  if (e) return Nn(e, "Avg block size");
  const t = await ls.get(ed);
  return Tt.saveToStorage("btc-block", t.data), Nn(t.data, "Avg block size");
}
async function sd() {
  const e = Tt.loadFromStorage("btc-history");
  if (e) return Nn(e, "Market price history");
  const t = await ls.get(td);
  return (
    Tt.saveToStorage("btc-history", t.data), Nn(t.data, "Market price history")
  );
}
function Nn(e, t) {
  const n = {
      labels: [],
      datasets: [{ label: t, backgroundColor: "#34d399", data: [] }],
    },
    r = e.values.slice(e.values.length - 10),
    s = r.map((i) => od(i.x, "en-UK")),
    o = r.map((i) => i.y);
  return (n.labels = s), (n.datasets[0].data = o), n;
}
function od(e, t) {
  e = e * 1e3;
  const n = new Date(e),
    r = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return n.toLocaleDateString(t, r);
}
function id() {
  return {
    labels: [],
    datasets: [{ label: "Empty", backgroundColor: "#34d399", data: [] }],
  };
}
const ld = { getUser: cd };
function cd() {
  return { name: "Mega user", balance: 5e3, transactions: [] };
}
const ud = {
    data() {
      return { rate: "", user: {} };
    },
    async created() {
      (this.rate = await $i.getRate()), (this.user = ld.getUser());
    },
  },
  ad = { class: "home" },
  fd = oe("h1", null, "Coins", -1),
  dd = { class: "user-info flex justify-between card" },
  hd = { class: "user-name" },
  pd = { class: "user-balance" },
  md = { class: "coin card" },
  gd = oe("h2", { class: "bitcoin" }, "Bitcoin", -1);
function yd(e, t, n, r, s, o) {
  return (
    $n(),
    Hn("main", ad, [
      fd,
      oe("div", dd, [
        oe("p", hd, Zn(s.user.name), 1),
        oe("p", pd, Zn(s.user.balance), 1),
      ]),
      oe("section", md, [
        oe("header", null, [
          gd,
          oe("p", null, [zt(" Rate: "), oe("span", null, Zn(s.rate), 1)]),
        ]),
      ]),
    ])
  );
}
const bd = ts(ud, [["render", yd]]),
  _d = pa({
    history: Nu("/ministry-of-coin/"),
    routes: [
      { path: "/", name: "home", component: bd },
      {
        path: "/contact",
        name: "contact",
        component: () =>
          hn(
            () => import("./Contacts-8b661c53.js"),
            [
              "assets/Contacts-8b661c53.js",
              "assets/contact.service.js-3e210266.js",
            ]
          ),
      },
      {
        path: "/contact",
        name: "contact",
        component: () =>
          hn(
            () => import("./Contacts-8b661c53.js"),
            [
              "assets/Contacts-8b661c53.js",
              "assets/contact.service.js-3e210266.js",
            ]
          ),
      },
      {
        path: "/contact/:id",
        name: "contact details",
        component: () =>
          hn(
            () => import("./ContactDetails-74a0f055.js"),
            [
              "assets/ContactDetails-74a0f055.js",
              "assets/contact.service.js-3e210266.js",
            ]
          ),
      },
      {
        path: "/stats",
        name: "stats",
        component: () => hn(() => import("./Statistics-355cea49.js"), []),
      },
    ],
  }),
  Hi = fu(Pa);
Hi.use(_d);
Hi.mount("#app");
export {
  Me as F,
  ts as _,
  oe as a,
  le as b,
  Hn as c,
  Ed as d,
  zt as e,
  Vo as f,
  Fl as g,
  ui as h,
  tc as i,
  sc as j,
  gn as k,
  q as l,
  Fo as m,
  $i as n,
  $n as o,
  uc as r,
  Il as s,
  Zn as t,
  Tt as u,
  qc as v,
  mn as w,
};