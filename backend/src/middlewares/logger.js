const logger = (req, res, next) => {
  const curTime  = new Date(Date.now());
  const formattedDate = curTime.toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'});
  console.log("Method:", req.method, "    ", "URL:", req.url,"     ", "Time:", formattedDate);
  next();
}


module.exports = logger;