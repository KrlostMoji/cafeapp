import useSWR from 'swr'
import AdminLayout from "../layout/AdminLayout"
import axios from 'axios'
import Orden from '../components/Orden'
import Link from 'next/link'

export default function Admin(){

  const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100})
  // console.log(error)
  // console.log(isLoading);

  return (
    <AdminLayout 
      pagina={'Admin'}
    >
      <h1 className='text-4xl font-black'>Resumen de órdenes</h1>
      <p className='text-2xl my-10'>Revisa las órdenes realizadas en tiempo real.</p>
      <Link 
        href={'/balance'}
        className='text-xl text-amber-500 font-bold py-5'
      >Balance general</Link>
      {data && data.length 
        ?
          data.map(orden=>(
            <Orden
              key={orden.id}
              orden={orden}
            />
          ))
        : <p className='font-black text-lg mt-5'>Sin órdenes pendientes</p> }
    </AdminLayout>
  )

}