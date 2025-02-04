export const baseUrl = "http://localhost:3001/api";

export const sendData = async (url, data) => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (!response.ok) {
    return { error: responseData.message };
  }
  return { data: responseData };
};
export const getData = async (url) => {
  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || "Failed to fetch data");
    }

    const responseData = await response.json();
    return { data: responseData };
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export const login = async (url, data) => {
  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData?.message);
    if (!response.ok) {
      return { error: responseData?.message };
    }
    return { data: responseData };
  } catch (error) {
    throw new Error(error.message);
  }
};
