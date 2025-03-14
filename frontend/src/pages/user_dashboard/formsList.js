const getforms = async () => {
  try {
    const userID = localStorage.getItem("UserID");
    console.log(userID);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/form/user/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch {
    return [];
  }
};

export { getforms };
