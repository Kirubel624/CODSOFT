export const saveData = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  localStorage.setItem("userID", data.userID);
  localStorage.setItem("role", data.role);

};

export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userID");
  localStorage.removeItem("persist:root");
  localStorage.removeItem("role");

};
