import { formatearDinero } from "../helpers";

const BalanceDiario = ({balanceDiario}) => {

  const fecha = Date.now()
  const fechaFormateada = new Date(fecha)

  return (
    <>
      <div className='md:flex justify-between mt-5'>
        <h2 className='text-4xl font-bold text-red-900 uppercase'>Balance General</h2>
        <p className='text-3xl font-black text-blue-600'>{fechaFormateada.toDateString()}</p>
      </div>
      <div className='md:flex justify-center mt-5'>
        <p className='text-3xl font-bold text-gray-500'>Saldo en caja: {formatearDinero(balanceDiario)}</p>
      </div>
    </>
  );
};

export default BalanceDiario;