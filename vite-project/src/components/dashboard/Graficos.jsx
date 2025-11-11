import React from "react";
import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficaResenas = () => {
  const reviews = useSelector((state) => state.reviews.listaResenias);
  
  const resenias = Object.values(
    reviews.reduce((acc, r) => {
      const id = r.etiquetaId._id;
      const nombre = r.etiquetaId.nombre;

      if (!acc[id]) {
        acc[id] = { name: nombre, value: 0 };
      }
      acc[id].value += 1;

      return acc;
    }, {})
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#000',
          font: {
            size: 14,
            family: 'Poppins, sans-serif',
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Reseñas por Tipo',
        color: '#122ae0',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Poppins, sans-serif',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: '#122ae0',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000',
          font: { size: 13, family: 'Poppins, sans-serif' },
        },
        grid: { color: '#e0e0e0' },
      },
      y: {
        ticks: {
          color: '#000',
          font: { size: 13, family: 'Poppins, sans-serif' },
        },
        grid: { color: '#e0e0e0' },
      },
    },
  };

  const data = {
    labels: resenias.map(t => t.name), // aquí usamos el nombre, no el índice
    datasets: [
      {
        label: 'Cantidad',
        data: resenias.map(t => t.value),
        backgroundColor: '#122ae0',
        borderColor: '#000',
        borderWidth: 2,
        hoverBackgroundColor: '#1d39ff',
        hoverBorderColor: '#000',
      },
    ],
  };

  return (
    <div style={styles.contenedor}>
      <h2 style={styles.titulo}>Reseñas registradas</h2>
      <div style={styles.graficoContenedor}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

const styles = {
  contenedor: {
    backgroundColor: '#fff',
    border: '3px solid #000',
    borderRadius: '12px',
    boxShadow: '4px 4px 0 #000',
    padding: '1rem',
    width: '100%',
    maxWidth: '600px',
    margin: '1rem auto',
  },
  titulo: {
    color: '#122ae0',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  graficoContenedor: {
    height: '350px',
  },
};

export default GraficaResenas;
