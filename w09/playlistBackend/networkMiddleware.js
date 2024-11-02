export const networkConditions = {
  delay: {
    min: 1000,
    max: 1000,
    fixed: false,
  },
  loss: {
    rate: 0.1,
  },
};

export const simulateDelay = (conditions) => (req, res, next) => {
  const { delay } = conditions;
  let delayTime = delay.fixed
    ? delay.max
    : Math.random() * (delay.max - delay.min) + delay.min;

  delayTime = Math.max(delay.min, Math.min(delayTime, delay.max));

  setTimeout(() => {
    next();
  }, delayTime);
};

export const simulateLoss = (conditions) => (req, res, next) => {
  const { loss } = conditions;
  const random = Math.random();
  if (random < loss.rate) {
    res
      .status(503)
      .json({ error: "Service Unavailable (Simulated Packet Loss)" });
  } else {
    next();
  }
};
