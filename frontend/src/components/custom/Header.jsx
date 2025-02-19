import React from "react";
import { Button } from "../ui/button.jsx";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex justify-between shadow-md p-3 px-5">
      <img src="/logo.svg" alt="Company Logo" width={100} height={100} />
      {isSignedIn ? (
        <div className="flex gap-4 items-center" >
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton/>
       
        </div>
      ) : (
        <div>
          <Link to={"/auth/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
