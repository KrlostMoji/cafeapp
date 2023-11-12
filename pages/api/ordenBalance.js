import { PrismaClient } from "@prisma/client";
import BalanceDiario from "../../components/BalanceDiario";

export default async function handler(req, res){
  
  const prisma = new PrismaClient()

  const fecha = Date.now()
  const fechaFormateada = new Date(fecha)

  
      if(req.method === 'GET'){
      //Consultar las ordenes que no han sido despachadas
      const ordenesCompletas = await prisma.orden.findMany({
        where: {
          estado: true,
          fecha: fechaFormateada.toDateString()
        }
      })
      
      // const balanceDiario = ordenesCompletas.reduce((balance, orden)=> balance + orden.total, 0) 

      res.status(200).json(ordenesCompletas)

  }
  
}