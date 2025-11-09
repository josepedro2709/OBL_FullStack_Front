import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from "react-redux";


const GraficaResenas = () => {
  const reviews = useSelector((state) => state.reviews.listaResenias);
  console.log("reviews en grafica", reviews);
  
  const data = [
    { name: "Critica", value: reviews.filter(r => r.etiquetaId._id  === "68e1b1b90cac8b39d1263ff3").length },
    { name: "Comentario", value: reviews.filter(r => r.etiquetaId._id  === "68e1b1b90cac8b39d1263ff5").length },
    { name: "Recomendacion", value: reviews.filter(r => r.etiquetaId._id === "68e1b1b90cac8b39d1263ff4").length },
    { name: "Resumen", value: reviews.filter(r => r.etiquetaId._id  === "68e1b1b90cac8b39d1263ff7").length },
  ];
  const COLORS = ["#FF4500", "#FF6347", "#FF8C00", "#FFA500"];
  console.log("data", data);
  return ( 
    
    <div style={{ width: "100%", height: 300, background:"#8884d8"}}>
      <PieChart width="100%" height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="80%"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default GraficaResenas;

