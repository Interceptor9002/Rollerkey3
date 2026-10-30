export default {
  async fetch(req) {
    const cors = {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS"
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const t = new URL(req.url).searchParams.get("u");
    if (!t) return new Response("missing ?u=", { status: 400, headers: cors });
    const r = await fetch(t, {
      method: req.method, headers: req.headers,
      body: req.method === "GET" ? null : await req.text()
    });
    const h = new Headers(r.headers);
    Object.entries(cors).forEach(([k, v]) => h.set(k, v));
    return new Response(r.body, { status: r.status, headers: h });
  }
};