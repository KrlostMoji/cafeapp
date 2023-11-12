import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import ResumenPedido from "../components/ResumenPedido"

export default function Resumen() {
  
  const { pedido } = useQuiosco()

  return(
    <Layout pagina='Resumen'>
      <h1 
        className='text-4xl font-black'
      >
        Resumen
      </h1>
      <p
        className='text-2xl my-10'
      >
        Revisa los datos de tu pedido.
      </p>
      {pedido.length === 0 ? (
        <p className='text-center text-2xl'>No has agregado nada al pedido.</p>
      ):(
        pedido.map(producto=>
          <ResumenPedido 
            key={producto.id}
            producto={producto}
          />
        ))
      }
    </Layout>
  )
  
}