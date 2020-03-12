module.exports = {
  pwa: {
    name: "EMS",
    themeColor: "#4DBA87",
    manifestOptions: {
      orientation: "portrait",
      icons: [
        {
          src: "manifest-icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable any"
        },
        {
          src: "manifest-icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable any"
        }
      ]
    },
    appleMobileWebAppCapable: "yes"
  }
};
