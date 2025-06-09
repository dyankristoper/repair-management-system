export function getDefaultCheckValues(editValues = {}) {
  return {
    simtray: editValues.simtray ?? false,
    simcard: editValues.simcard ?? false,
    memorycard: editValues.memorycard ?? false,
    spen: editValues.spen ?? false,
    charger: editValues.charger ?? false,
    brokenScreen: editValues.brokenScreen ?? false,
    bulgedBattery: editValues.bulgedBattery ?? false,
    brokenChargingpin: editValues.brokenChargingpin ?? false,
    brokenBackcover: editValues.brokenBackcover ?? false,
    ...editValues,
  };
}
