import useSWR from 'swr'
import AdminLayout from "../layout/AdminLayout"
import axios from 'axios'
import Orden from '../components/Orden'
import BalanceDiario from '../components/BalanceDiario';

const Balance = () => {

  const fetcher = () => axios('/api/ordenBalance').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/ordenBalance', fetcher, {refreshInterval: 100})
  
  const balanceDiario = data.reduce((balance, orden)=> balance + orden.total, 0)


  return (
    <AdminLayout
      pagina={'Balance diario.'}
    >
      <BalanceDiario
        balanceDiario = {balanceDiario}
      >
      </BalanceDiario>
      {data && data.length 
        ?
          
          data.map(orden=>(
            <Orden
              key={orden.id}
              orden={orden}
            />
          ))
        : <p className='font-black text-lg mt-5'>No se ha completado ninguna órden</p>
      }
    </AdminLayout>
    
  );
};

export default Balance;