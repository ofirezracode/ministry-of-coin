import { c as e } from "./contact.service.js-3e210266.js";
import {
  _ as n,
  r,
  o as i,
  c as _,
  b as l,
  w as d,
  a as t,
  t as c,
  e as h,
} from "./index-1babc2cc.js";
const p = {
    data() {
      return { contact: { name: "" } };
    },
    async created() {
      const s = this.$route.params.id;
      this.contact = await e.getContactById(s);
    },
  },
  m = { class: "contact-details" },
  u = t("h1", null, "Contact Details", -1),
  f = t("button", null, [t("span", { class: "arrow" }, "←"), h("Back")], -1),
  k = { class: "card" },
  x = { class: "contact-info" },
  B = { class: "contact-email" },
  C = { class: "contact-phone" },
  g = ["src"];
function w(s, b, v, y, o, D) {
  const a = r("RouterLink");
  return (
    i(),
    _("main", m, [
      u,
      l(a, { to: "/contact" }, { default: d(() => [f]), _: 1 }),
      t("section", k, [
        t("div", x, [
          t("h3", null, c(o.contact.name), 1),
          t("p", B, c(o.contact.email), 1),
          t("p", C, c(o.contact.phone), 1),
        ]),
        t("img", { src: `https://robohash.org/${o.contact.name}` }, null, 8, g),
      ]),
    ])
  );
}
const I = n(p, [["render", w]]);
export { I as default };
