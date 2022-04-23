const whitelist = /^(\.|p|ul|ol|h\d+|pre|code|carousel|flickity|spinner)/
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ['./src/**/*.html'],

  whitelistPatterns: [whitelist],
  whitelistPatternsChildren: [whitelist] 
});