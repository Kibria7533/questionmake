export const enumToString = (data: any, excludeValues?: any[]): string => {
  const enumToArrayObject: any = Object?.keys(data)
    ?.filter((key) => isNaN(Number(key)))
    ?.map((key) => ({ key: key, value: data[key] }))
    ?.filter(({ value }) => !excludeValues?.includes(value));

  return enumToArrayObject?.map(({ key, value }) => key + " = " + value).join("  ||  ") ?? null;
};

export const formatBdMobileNumber = (number: string): string => {
  // Remove any non-digit characters
  number = number.replace(/\D/g, "");

  // Handling different common formats
  if (number.startsWith("008801")) {
    return "8801" + number.slice(6);
  } else if (number.startsWith("+8801")) {
    return "8801" + number.slice(5);
  } else if (number.startsWith("8801")) {
    return number;
  } else if (number.startsWith("01")) {
    return "8801" + number.slice(2);
  } else {
    return null;
  }
};
