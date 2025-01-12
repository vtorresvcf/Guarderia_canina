const Admin = () => {
  return (
    <div className="min-h-full bg-gray-200">
      <div className=" h-28 flex justify-center items-center text-5xl font-extrabold bg-gradient-to-r  from-gray-700  via-gray-600  to-gray-400 text-transparent bg-clip-text ">
        Administrador
      </div>

      <div className="flex h-screen">
        <div className=" bg-slate-500 text-white w-1/4">Lateral</div>
        <div className="bg-orange-200 w-3/4">Central</div>
      </div>
    </div>
  );
};

export default Admin;
