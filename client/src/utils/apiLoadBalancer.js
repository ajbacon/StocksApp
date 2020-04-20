const getAlphaVantageKey = () => {
  const AV_KEYS = [
    process.env.REACT_APP_AV_API_KEY1,
    process.env.REACT_APP_AV_API_KEY2,
    process.env.REACT_APP_AV_API_KEY3,
    process.env.REACT_APP_AV_API_KEY4,
    process.env.REACT_APP_AV_API_KEY5,
    process.env.REACT_APP_AV_API_KEY6,
    process.env.REACT_APP_AV_API_KEY7,
    process.env.REACT_APP_AV_API_KEY8,
  ];

  const loadDist = Math.floor(Math.random() * AV_KEYS.length);
  console.log(loadDist);
  return `${AV_KEYS[loadDist]}`;
};

export default getAlphaVantageKey;
