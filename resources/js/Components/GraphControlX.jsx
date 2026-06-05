import {
    Chart as ChartJS,
    PointElement,
    LineElement,
    LinearScale,
    Tooltip,
    CategoryScale,
    Legend,
    plugins,
    scales,
} from 'chart.js';

import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    PointElement,
    LineElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    annotationPlugin,
    ChartDataLabels
);

export default function GraphControlX({target,max,min,XAverage}){
    
    const xdata = [null]
    const averageX =  XAverage ? XAverage:null
    const xmerge = averageX ? [ ...xdata , ...averageX] :null
    // const targetValue = Number(model.cghl_target);
    // const minValue = Number(model.cghl_min);
    // const maxValue = Number(model.cghl_max);

    const targetValue = Number(target);
    const minValue = Number(min);
    const maxValue = Number(max);
    
    const data = {
        labels: ['Value','1', '2', '3', '4', '5','6','7','8','9','10','End'],
        datasets: [
            {
                label: 'Good',
                data: xmerge,
                textColor:'blue',
                borderWidth: 1,
                pointStyle: 'rectRot',
                pointRadius: 5,
                tension:0,
                pointBackgroundColor: (context)=>{
                    console.log(context , context.dataIndex);
                    if(context.dataIndex <= 0 )return 'blue'

                    const color = context.raw >= minValue && context.raw <= maxValue - 0.005 ? 'blue': (context.raw <= targetValue && context.raw >= minValue) || (context.raw > maxValue - 0.005 && context.raw < maxValue) ?'orange':'red'
                    return  color
                },
                segment:{
                     borderColor: (ctx) => {
                        console.log('SEGMENT' ,ctx);
                        for(let i = 0 ; i < xmerge.length ; i++){
                            if(!ctx[`p${i}`])return
                            const currentPoint = ctx[`p${i}`].raw
                            const nextPoint = ctx[`p${i+1}`].raw ? ctx[`p${i+1}`].raw : 0

                            return currentPoint >= minValue && currentPoint <= maxValue - 0.005 && (nextPoint >= minValue && nextPoint <= maxValue -0.005 || 0) ? '#142E90':'red'

                        }
                     }
                }
            },{
                label: 'Reject',
                pointStyle: 'rectRot',
                backgroundColor: 'red'
            },
            {
                label: 'Adjust',
                pointStyle: 'rectRot',
                backgroundColor: 'orange'
            },
        ],
    };

const options = {
    scales: {
        y: {
            min: minValue - 0.005,
            max: maxValue + 0.005,
        },
    },

    plugins: {
        tooltip: {
            callbacks: {
                label: (context) => {
                    return `Magnet  ${context.label}: ${context.raw}`;
                },
                title: (context) => {
                    return 'Point Average';
                },
            },
        },
        legend: {
            labels: {
                usePointStyle: true,
            },
        },
        datalabels: {
            color:(context)=>{
                    console.log('Color',context , context.dataIndex);
                    if(!xmerge) return
                    if(!context.dataIndex) return
                    const index = context.dataIndex
                    const data = xmerge[index]

                    return data >= minValue && data <= maxValue - 0.005 && data >= minValue && data <= maxValue -0.005 ? '#142E90'
                                : (context.raw < targetValue ||  context.raw > maxValue - 0.005 ) && (context.raw < maxValue || context.raw > minValue ) ?'orange'
                                :'red'
                },
            anchor: 'start',
            align: 'top',

        },
        annotation: {

            annotations: {
                minLine: {
                    type: 'box',
                    yMin: minValue,
                    yMax: targetValue,
                    borderColor: 'rgba(255, 137, 4,.1)' ,
                    backgroundColor:'rgba(255, 137, 4,.1)' ,
                    borderWidth: 2,
                    label: {
                        display: true,
                        content: 'MIN',
                        position: 'end',
                        color:'#753F00',
                       
                    },
                },
                maxLine: {
                    type: 'box',
                    yMin: maxValue,
                    yMax:targetValue ,
                    borderColor: 'rgba(255, 137, 4,.1)' ,
                    backgroundColor:'rgba(255, 137, 4,.1)' ,
                    borderWidth: 2,
                    label: {
                        display: true,
                        content: 'MAX',
                      
                        color:'#753F00',
                        position: 'start',
                    },
                },
                targetLine: {
                    type: 'box',
                    yMin: maxValue - 0.005,
                    yMax: Number(min) + 0.01,
                    borderColor: 'green',
                    backgroundColor:'rgba(5, 223, 114,.1)',
                    borderDash: [6, 6],
                    index:1000,
                    borderWidth: 2,
                    label: {
                        display: true,
                        content: 'TARGET',
                        position: 'start',
                        color:'#011912'
                    },
                },
            },
        },
    },
};


    return(
        <>
           <div  style={{ display:'flex',justifyContent:'center',flexDirection:'column',width:'40vw',minWidth:'fit-content', height:'40vh',padding:'2rem' , background:'white',borderRadius:'1rem'}}>
                <h1 style={{ justifySelf:'start' ,color: '#19232e'}}>X Graph</h1>
                <Line data={data} options={options} style={{ width:'40vw' ,height:'35vh' }} />
           </div>
        </>
    )
}
