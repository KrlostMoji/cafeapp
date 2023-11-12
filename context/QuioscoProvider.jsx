import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [nombre, setNombre] = useState('')
  const [total, setTotal] = useState(0)

  const router = useRouter()

  const obtenerCategorias = async () => {
    const {data} = await axios('/api/categorias')
    setCategorias(data)
  }

  useEffect(()=>{
    obtenerCategorias()
  }, [])

  useEffect(()=>{
    setCategoriaActual(categorias[0])
  }, [categorias])

  useEffect(()=>{
    const totalFinal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
    setTotal(totalFinal)
  }, [pedido])

  const handleClickCategoria = id => {
    const categoria = categorias.filter(c=>c.id === id)
    setCategoriaActual(categoria[0])
    router.push('/')
  }

  const handleSetProducto = producto => {
    setProducto(producto)
  }

  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleAgregarPedido = ({categoriaId, ...producto}) =>{

    if(pedido.some(productoState => productoState.id === producto.id)){
      //actualizar la cantidad
      const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
      setPedido(pedidoActualizado)
      toast.success('Se actualizó el pedido')
    } else {
      setPedido([...pedido, producto])
      toast.success('Agregado al pedido')
    }

    setModal(false)
    
  }

  const handleEditarCantidades = id =>{
    const productoActualizar = pedido.filter(producto => producto.id === id)
    setProducto(productoActualizar[0])
    setModal(!modal)
  }

  const handleEliminarProducto = id =>{
    const productosRestantes = pedido.filter(producto => producto.id !== id)
    setPedido(productosRestantes)
       
  }

  const confirmarOrden = async (e) => {

    e.preventDefault()
    const fecha = Date.now()
    const fechaFormateada = new Date(fecha)

    try {
      await axios.post('/api/ordenes', {pedido, nombre, total, fecha: fechaFormateada.toDateString()})

      //Resetear la app
      setCategoriaActual(categorias[0])
      setPedido([])
      setNombre('')
      setTotal(0)

      toast.success('Tu pedido ha sido confirmado')
      setTimeout(()=>{
        router.push('/')
      }, 3000)
    
    } catch (error) {
      console.log(error);
    }

  }

  return(
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        confirmarOrden,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )

}


export {
  QuioscoProvider
}

export default QuioscoContext