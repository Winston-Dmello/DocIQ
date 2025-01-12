// const winston = require('winston');

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'app.log' }),
//   ],
// });

const logger = (req, res, next) => {
  const curTime  = new Date(Date.now());
  const formattedDate = curTime.toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'});
  console.log("Method:", req.method, "    ", "URL:", req.url,"     ", "Time:", formattedDate);
  next();
}


module.exports = logger;