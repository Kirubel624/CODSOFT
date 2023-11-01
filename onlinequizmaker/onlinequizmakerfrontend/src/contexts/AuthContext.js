import { useContext, createContext } from "react";

const AuthContext = createContext(null);

const AuthComponent = ({ children }) => {
  const [loginState, setLoginState] = React.useState(false);
  return (
    <AuthContext.provider value={{ loginState, setLoginState }}>
      {children}
    </AuthContext.provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthComponent;
