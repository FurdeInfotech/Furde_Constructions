import React from "react";

function MahaRera() {
  return (
    <div className="flex flex-col mt-4 px-4 max-w-full pb-10">
      <h2 className="text-3xl font-bold mb-2"> Rera Registration</h2>
      <p className="text-sm text-gray-600 mb-4">
      
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
        <div className="aspect-[4/3] p-4">
          <img
            src={`/maharera.png`}
            alt={`Maha Rera`}
            className="w-full h-full object-contain rounded-2xl aspect-[4/3]"
          />
          <p className="text-sm text-center mt-2 text-gray-600 mb-4">Rera no - P52600031553</p>
        </div>

        <img
          src={`/FH_rera.png`}
          alt={`Furde Heights Rera`}
          className="w-full h-full object-contain rounded-2xl aspect-[4/3]"
        />
      </div>
    </div>
  );
}

export default MahaRera;
