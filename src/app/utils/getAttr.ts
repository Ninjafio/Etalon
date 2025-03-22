export const getAttr = (str: any) => {
  return str.replace(/^\[|\]$/g, "").trim(); // Убираем скобки и обрезаем пробелы
};
