const URL_BASE = "http://localhost:5001/tax-calculator"; // would put this in environment variable

export const fetchTaxData = async (taxYear: string) => {
  const url = taxYear ? `${URL_BASE}/tax-year/${taxYear}` : URL_BASE;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
