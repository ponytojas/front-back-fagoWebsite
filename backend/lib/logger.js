const arrayColor = [
  "\x1b[34m%s\x1b[0m",
  "\x1b[32m%s\x1b[0m",
  "\x1b[33m%s\x1b[0m",
  "\x1b[31m%s\x1b[0m",
  "\x1b[35m%s\x1b[0m",
];
const typeLog = ["[INFO]", "[CORRECT]", "[WARNING]", "[ERROR]", "[DEBUG]"];

const log = function (message, level) {
  let datetime = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  console.log(
    arrayColor[level],
    "" + typeLog[level] + " => " + message + " => " + datetime
  );
};

module.exports = {
  log,
};
