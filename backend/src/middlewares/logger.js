const chalk = require('chalk');

const logger = (req, res, next) => {
  const curTime  = new Date(Date.now());
  const formattedDate = curTime.toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'});
  console.log(
    chalk.hex('#006400')("Method:"),  // Dark Green
    chalk.hex('#006400')(req.method,"   "),
    chalk.green("URL:"),
    chalk.yellow(req.url, "   "),
    chalk.green("Time:"),
    chalk.magenta(formattedDate, "   ")
  );
  next();
}


module.exports = logger;