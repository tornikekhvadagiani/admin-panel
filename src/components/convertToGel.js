export const convertToGel = async (dolar) => {
  if (typeof dolar !== "number" || isNaN(dolar)) {
    console.error("Invalid amount provided for currency conversion.");
    return null;
  }

  try {
    const response = await fetch(
      `https://bankofgeorgia.ge/api/currencies/convert/USD/GEL?amountFrom=${dolar}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.amount;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
};
