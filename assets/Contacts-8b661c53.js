import { c as p } from "./contact.service.js-3e210266.js";
import {
  _,
  r as d,
  o as r,
  c as i,
  a as c,
  t as f,
  b as u,
  w as C,
  F as y,
  d as $,
  u as B,
} from "./index-1babc2cc.js";
const v = {
    props: { contact: { type: Object, required: !0 } },
    emits: ["deleteContact"],
    methods: {
      deleteContact(t) {
        this.$emit("deleteContact", t);
      },
    },
  },
  b = { class: "contact-preview card" },
  g = { class: "contact-email" },
  w = { class: "contact-phone" },
  x = { class: "button-container flex" },
  U = c("button", null, "Details", -1);
function D(t, n, e, m, s, o) {
  const a = d("RouterLink");
  return (
    r(),
    i("article", b, [
      c("h3", null, f(e.contact.name), 1),
      c("p", g, f(e.contact.email), 1),
      c("p", w, f(e.contact.phone), 1),
      c("div", x, [
        u(
          a,
          { to: `/contact/${e.contact._id}` },
          { default: C(() => [U]), _: 1 },
          8,
          ["to"]
        ),
        c(
          "button",
          { onClick: n[0] || (n[0] = (l) => o.deleteContact(e.contact._id)) },
          "Delete"
        ),
      ]),
    ])
  );
}
const F = _(v, [["render", D]]),
  L = {
    props: { contacts: { type: Array, default: [] } },
    emits: ["deleteContact"],
    components: { ContactPreview: F },
    methods: {
      deleteContact(t) {
        this.$emit("deleteContact", t);
      },
    },
  },
  k = { class: "contact-list" };
function S(t, n, e, m, s, o) {
  const a = d("ContactPreview");
  return (
    r(),
    i("ul", k, [
      (r(!0),
      i(
        y,
        null,
        $(
          e.contacts,
          (l) => (
            r(),
            i("li", null, [
              u(a, { onDeleteContact: o.deleteContact, contact: l }, null, 8, [
                "onDeleteContact",
                "contact",
              ]),
            ])
          )
        ),
        256
      )),
    ])
  );
}
const P = _(L, [["render", S]]),
  N = {
    props: ["filterBy"],
    emits: ["update:filterBy", "termUpdated"],
    created() {
      this.debouncedUpdate = B.debounce(this.update, 400);
    },
    methods: {
      update(t) {
        this.$emit("update:filterBy", { term: t.target.value }),
          this.$emit("termUpdated");
      },
    },
  },
  R = { class: "contact-filter card" },
  T = ["value"];
function V(t, n, e, m, s, o) {
  return (
    r(),
    i("form", R, [
      c(
        "input",
        {
          onInput:
            n[0] ||
            (n[0] = (...a) => t.debouncedUpdate && t.debouncedUpdate(...a)),
          value: e.filterBy.term,
          type: "text",
          name: "text",
          placeholder: "Search for...",
        },
        null,
        40,
        T
      ),
    ])
  );
}
const j = _(N, [["render", V]]),
  q = {
    data() {
      return { contacts: [], filterBy: { term: "" } };
    },
    components: { ContactList: P, ContactFilter: j },
    async created() {
      this.contacts = await p.getContacts();
    },
    methods: {
      async getFilteredContacts() {
        (this.contacts = await p.getContacts(this.filterBy)),
          console.log("this.contacts", this.contacts);
      },
      async deleteContact(t) {
        (this.contacts = await p.deleteContact(t)),
          console.log("this.contacts", this.contacts);
      },
    },
  },
  A = { class: "contacts" },
  E = c("h1", null, "Contacts", -1);
function I(t, n, e, m, s, o) {
  const a = d("ContactFilter"),
    l = d("ContactList");
  return (
    r(),
    i("main", A, [
      E,
      u(
        a,
        {
          onTermUpdated: o.getFilteredContacts,
          filterBy: s.filterBy,
          "onUpdate:filterBy": n[0] || (n[0] = (h) => (s.filterBy = h)),
        },
        null,
        8,
        ["onTermUpdated", "filterBy"]
      ),
      u(
        l,
        { onDeleteContact: o.deleteContact, contacts: s.contacts },
        null,
        8,
        ["onDeleteContact", "contacts"]
      ),
    ])
  );
}
const G = _(q, [["render", I]]);
export { G as default };
