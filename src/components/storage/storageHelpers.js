export const getFromLocalStorageWithRange = (startDateRange, endDateRange) => {
  const startDate = new Date(startDateRange.replace(/\./g, "-"));
  const endDate = new Date(endDateRange.replace(/\./g, "-"));
  //여기에 이제 반복문을 사용해서, 해당 날짜들의 데이터를 가져온 후, return 값으로 반환하면 된다.
  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
};
