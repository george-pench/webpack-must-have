import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignInButton() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <Button variant="contained" onClick={handleSignInClick}>
      Sign In
    </Button>
  );
}

export default SignInButton;
