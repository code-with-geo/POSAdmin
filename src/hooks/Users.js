export const useToken = () => {
  return window.localStorage.getItem("access_token");
};

export const apiURL = () => {
  //return "https://posserver-8ajm.onrender.com";
  return "https://localhost:7148";
};

export const useGetUserID = () => {
  return window.localStorage.getItem("UserID");
};

export const useGetLocationID = () => {
  return window.localStorage.getItem("LocationId");
};
