export const formatKoreanUnit = (value: number): string => {
  if (value === 0) return "0";

  const units = [
    { unit: 100000000, label: "억" },
    { unit: 10000000, label: "천" },
  ];

  let result = "";

  for (const { unit, label } of units) {
    const quotient = Math.floor(value / unit);
    if (quotient > 0) {
      result += `${quotient}${label} `;
      value -= quotient * unit;
    }
  }

  return result;
};
