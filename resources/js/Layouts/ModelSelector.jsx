import {SettingsIcon }from '../Icons/SVG.jsx';
import { useEffect } from 'react';
export default function ModelSelector({data,setData, setManagementContainer,clearInput,modelListState,setModelListState}){

    useEffect(()=>{
        console.log('update sdddwed');
        setModelListState(setModelListState)
    },[modelListState])
    const subProcesses ={
                            "lapping":["MASSPRO" , "H-F-P"],
                            "cghl":["PERPEN (T-L)"]
                        };
    return(
        <div className='machine-selector'>
            <h1>Machining Checklist</h1>
            <button onClick={
                                (e)=>{
                                        setData('process','admin');
                                        setData('model','');
                                        setManagementContainer('manage','');
                                        clearInput();
                                    }
                            } className='machine-setting'><SettingsIcon/></button>
            <div className='selector-container'>
                <div className='selector-data'>
                    <label>Model:</label>

                    <select  value={data.model}
                              onChange={
                                (e)=>setData('model',e.target.value.toUpperCase())}>
                        <option value=""></option>

                        {
                            Object.entries(modelListState).map(([key,values])=><option value={values.model}>{values.model}</option>)
                        }
                    </select>
                </div>
                <div className='selector-data'>
                    <label>Process:</label>
                    <select value={data.process} onChange={(e)=>setData('process',e.target.value)}>
                        <option value=""></option>
                        <option value="inprocess">IN-PROCESS INSPECTION SHEET</option>
                        <option value="cghl">CGH-(L) DIMENSION MONITORING</option>
                        <option value="lapping">LAPPING-(T) DIMENSION MONITORING</option>
                        <option value="slicing">SLICING (W) MONITOR</option>
                    </select>
                </div>
            </div>
            <div className="subprocess-main">
                {
                    data && data.process && Object.keys(subProcesses).filter((key)=>key === data.process).map((key)=>
                        subProcesses[key].map((items)=>{
                            return(
                                <>
                                    <button className="subprocess-btn">{items}</button>
                                </>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}
