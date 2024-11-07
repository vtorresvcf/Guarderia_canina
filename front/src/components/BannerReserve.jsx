import IconDog from "../assets/icon-dog.svg";

const BannerReserve = () => {
  return (
    <div className="bg-green-200 h-auto  grid grid-cols-1 md:grid-cols-3 items-center mx-auto   ">
      <div className="col-span-1 place-content-center flex justify-center md:justify-end my-5  ">
        <img className="max-h-[200px] " src={IconDog} />
      </div>

      <div className="text-center h-full my-3 mx-auto text-green-800 col-span-2">
        <h1 className="text-3xl my-4">Horario</h1>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <table className=" border-separate border border-green-600 border-spacing-2 ">
              <thead>
                <tr>
                  <th className="border border-green-400">Lunes a Sábado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-400">
                    Mañanas: 9:30 a 13:00
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-400">
                    Tardes: 17:30 a 19:30
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="border-separate border border-green-600 border-spacing-2">
              <thead>
                <tr>
                  <th className="border border-green-400">
                    Domingos y Festivos
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-400">
                    Mañanas: 9:30 a 13:00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerReserve;
