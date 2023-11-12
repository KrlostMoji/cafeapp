import Image from "next/image"; 
import { toast } from 'react-toastify'
import { formatearDinero } from "../helpers";
import axios from "axios";

const Orden = ({orden}) => {
  const { id, nombre, total, pedido } = orden

  // let balance = 0
  
  // if(orden.estado === true){
  //   balance += total
  // }

  const concluirPedido = async() => {
    console.log('Presionando botón')
    try {
      const data = await axios.post(`/api/ordenes/${id}`)
      toast.success('La orden ha sido despachada')
      console.log(data);
    } catch (error) {
      toast.error('La orden no se ha podido actualizar, vuelta a intentarlo')
    }
  }

  return (
    <>
      <div className='border p-10 space-y-5 mt-5'>
        <h3 className='text-2xl font-bold'>Órden: #{id}</h3>
        <p className='text-lg font-bold'>Usuario: {nombre}</p>
        <div>
          {pedido.map(platillo => 
              <div
                key={platillo.id}
                className='py-3 flex border-b last-of-type:border-0 items-center'
              >
                <div className='w-32'>
                  <Image 
                    width={400}
                    height={500}
                    src={`/assets/img/${platillo.imagen}.jpg`}
                    alt={`Imagen del platillo: ${platillo.nombre}`}
                  />
                </div>
                <div className='p-5 space-y-2'>
                  <h4 className='text-xl font-bold text-amber-500'>{platillo.nombre}</h4>
                  <p className='text-lg font-bold'>Cantidad: {platillo.cantidad}</p>
                </div>
              </div>
            )}
        </div>
        <div className={`md:flex md:items-center my-10 ${orden.estado === true ? 'md:justify-center' : 'md:justify-between'}`}>
          <p className='mt-5 font-black text-4xl text-amber-500'>
            Total a pagar: {formatearDinero(total)}
          </p>
          {orden.estado === false ? 
            <button
              className='bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-md'
              type='button'
              onClick={concluirPedido}
            >
              Completar Orden
            </button> : ''}
        </div>
      </div>
    </>
  );
};

export default Orden;