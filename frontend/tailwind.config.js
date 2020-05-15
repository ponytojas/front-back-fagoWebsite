module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./public/**/*.html", "./src/**/*.vue"]
  },
  theme: {
    container: {
      center: true
    },
    extend: {}
  },
  variants: {},
  plugins: []
};
