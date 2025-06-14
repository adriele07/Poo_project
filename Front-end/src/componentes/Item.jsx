import React from "react";

const Item = () => {
  return (
    <a href="/" className="flex flex-col gap-2">
      <img
        class="aspect-square rounded-3xl object-cover"
        src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Imagem acomodação"
      />
      <div>
        <h3 className="font-semibold  text-xl">Cabo frio, Rio de janeiro</h3>
        <p className="truncate text-gray-600 text-1xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint pariatur
          minima reprehenderit amet, quasi dolor debitis dolore at eligendi.
          Quaerat quibusdam possimus ipsa nam ab doloremque quos eius eligendi
          blanditiis.
        </p>
      </div>
      <p>
        <span className="font-semibold">R$500</span> por noite
      </p>
    </a>
  );
};

export default Item;
