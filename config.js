// =====================================================================
//  Cuentas Claras · Configuración del servidor (tarjetas compartidas)
//  La completa el titular UNA sola vez y la sube a GitHub junto a index.html.
//  La app te genera este contenido listo: Ajustes → Tarjetas compartidas →
//  Configurar servidor → "Copiar config.js".
//  Mientras esté vacío, la app funciona igual pero sin compartir.
// =====================================================================
window.CC_CONFIG = {
  supabaseUrl: "https://gdfmahriakbxbdtidkbi.supabase.co/rest/v1/",   // ej: "https://abcdefgh.supabase.co"
  supabaseKey: "sb_publishable_FI66OEXUjmwIvXgMEHh1xg_tY7NIkkN",   // la "Publishable key" (o "anon public key") del proyecto
  vapidPublic: ""    // clave PÚBLICA de notificaciones (la genera la app)
};
