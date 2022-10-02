import http from "../http";

export const signUp = (name, email, password, pic) => {
  return http.post("/user/register", { name, email, password, pic });
};

export const login = (email, password) => {
  return http.post("/user/login", { email, password });
};
