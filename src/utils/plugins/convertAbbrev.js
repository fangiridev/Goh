module.exports = (num) => {
  if (!num) return "0";

  const number = parseFloat(String(num).substr(0, num.length - 1));
  const unit = String(num).substring(-1);
  const zeros = { K: 1e3, k: 1e3, M: 1e6, m: 1e6 };

  if (!zeros[unit]) return parseFloat(num);

  num = number * zeros[unit];

  return num;
};