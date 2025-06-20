import React from "react";
import { Link, useParams } from "react-router-dom";
import AccProfile from "../componentes/AccProfile";

const Account = ({user}) => {
    const {subpage} = useParams();

    const buttonClass = (button) => {
        let finalClass = "bg-primary-400 hover:bg-primary-button rounded-full px-4 py-2 transition text-white cursor-pointer";
        if (button == subpage) finalClass = "bg-primary-button rounded-full px-4 py-2 text-white transition  cursor-pointer";
        return finalClass;
    };

  return (
    <section className="p-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
        <div className="flex gap-4">
          <Link to="/account/profile" className={buttonClass("profile")}>Perfil</Link>
          <Link to="/account/booking" className={buttonClass("booking")}>Reserva</Link>
          <Link to="/account/places" className={buttonClass("places")}>Anfitrião</Link>
        </div>
    
        {subpage === "profile" && <AccProfile user={user} />
        //{subpage === "booking" && <AccBooking />}
       // {subpage === "places" && <AccPlaces />}
        }
      </div>
    </section>
  );
};

export default Account;
