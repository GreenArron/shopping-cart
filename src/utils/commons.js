function round(num, precision) {
  return +(Math.round(num + `e+${precision}`) + `e-${precision}`);
}

export { round };
