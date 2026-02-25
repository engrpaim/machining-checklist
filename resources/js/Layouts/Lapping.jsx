import { CrossIcon } from "../Icons/SVG";
export default function Lapping({data , setData,setLotContainer}){

    const numberOfrows = [1,2,3,4,5,6,7,8,9,10];
    return(
        <>
            <div className="inprocess-container">
                <div className="inprocess-details">
                     <h1>{data.model}-LAPPING (T) DIMENSION MONITORING</h1>
                     <div className='mode-container'>
                        <h3>MODEL:</h3>
                        <p>{data.model}</p>
                    </div>
                </div>
                <div className='selector-container'>
                    <div className='data-container'>
                        <div className='data-input'>
                            <label>Lot&nbsp;No:</label>
                            <input></input>
                        </div>
                        <div className='data-input' >
                            <label>Operator Name :</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Checked by :</label>
                            <input type="number"   ></input>
                        </div>
                         <div className='data-input' >
                            <label>Mahine No.:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Date :</label>
                            <input type="number"   ></input>
                        </div>
                    </div>
                    <div className='data-container'>
                        <div className='data-input' >
                            <label>Carrier Speed</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Micrometer Serial No.:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Staff/Eng:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Date:</label>
                            <input type="number"   ></input>
                        </div>

                    </div>
                </div>
                <div className='data-table'>
                    <div className='title-center'>
                        <h1>LAPPING-(T) DIMENSION MONITORING</h1>
                    </div>
                    <div className='specs-table'>
                        <div>
                            <div className='specs-details'>
                                <h2>SPECS</h2>
                                <div className='specs-max-data'>
                                    <h2>Maximum:</h2>
                                    <p></p>
                                </div>
                                <div className='specs-target-data'>
                                    <h2>Target:</h2>
                                    <p></p>
                                </div>
                                <div className='specs-min-data'>
                                    <h2>Minimum:</h2>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='specs-details'>
                                <div className='specs-max-data'>
                                    <h2>σ:</h2>
                                    <p></p>
                                </div>
                                <div className='specs-target-data'>
                                    <h2>CP:</h2>
                                    <p></p>
                                </div>
                                <div className='specs-min-data'>
                                    <h2>CPK:</h2>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='specs-table'>
                        <table className='cgh-table' border={1}>
                            <thead>
                                <tr>
                                    <th rowSpan={2}></th>
                                    <th colSpan={5} className="green-theme">DATA</th>
                                    <th colSpan={5} className="orange-theme">JUDGEMENT</th>
                                    <th rowSpan={2} className="light-green-theme">JUDGEMENT PER PIECE</th>
                                    <th rowSpan={2} className="light-green-theme">STATUS</th>
                                    <th rowSpan={2}>MIN</th>
                                    <th rowSpan={2}>MAX</th>
                                    <th rowSpan={2}>REMARKS</th>
                                    <th rowSpan={2}>WORST</th>
                                </tr>
                                <tr>
                                    <th className="green-theme" >Pt.1</th>
                                    <th className="green-theme">Pt.2</th>
                                    <th className="green-theme">Pt.3</th>
                                    <th className="gray-theme"></th>
                                    <th className="gray-theme"></th>
                                    <th className="orange-theme">Pt.1</th>
                                    <th className="orange-theme">Pt.2</th>
                                    <th className="orange-theme">Pt.3</th>
                                    <th className="gray-theme"></th>
                                    <th className="gray-theme"></th>
                                </tr>
                            </thead>
                            <tbody>



                                                    {
                                                        numberOfrows.map((row)=>{
                                                            const yellow = "light-yellow-theme";
                                                            const blue = "light-blue-theme";
                                                            const orange = "light-orange-theme";


                                                            return(
                                                            <tr key={row}>
                                                                <td className="gray-theme">{row}</td>
                                                                <td className="input-data-box"><input/></td>
                                                                <td className="input-data-box"><input/></td>
                                                                <td className="input-data-box"><input/></td>
                                                                <td className="light-gray-theme"></td>
                                                                <td className="light-gray-theme"></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td className="light-gray-theme"></td>
                                                                <td className="light-gray-theme"></td>
                                                                <td className="light-green-theme"></td>
                                                                <td className="light-green-theme"></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td className="light-green-theme"></td>
                                                            </tr>
                                                            )
                                                        })
                                                    }



                            </tbody>
                        </table>
                    </div>
                    <div className="tally-main">
                        <div className="tally-container">
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>Average</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>Maximum</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>Minimum</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>Stdev</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>Cp</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>Cpl</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>Cpu</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>Cpk</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div className="tally-container">
                            <div className="tally-group">
                                <h3>X Control Chart</h3>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>UCL</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>CL</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div className="tally-data">
                                    <p><strong>LCL</strong></p>
                                </div>
                                <div className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div  className="tally-container">
                            <div className="tally-group">
                                <h3>R Control Chart</h3>
                            </div>
                            <div className="tally-group">
                                <div  className="tally-data">
                                    <p><strong>UCL</strong></p>
                                </div>
                                <div  className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                            <div className="tally-group">
                                <div  className="tally-data">
                                    <p><strong>CL</strong></p>
                                </div>
                                <div  className="tally-data">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                     <div className='specs-bottom'>
                    <div className='specs-remarks'>
                        <div className='specs-remarks-container'>
                            <div  className="specs-requirements">
                                <p className='error-theme'><strong>- Please Complete Details!</strong></p>
                                <CrossIcon color="red"/>
                            </div>
                            <p className='success-theme'><strong>- All Lot Details Compelted!</strong></p>
                        </div>
                        <label>REMARKS:</label><input  className='specs-remarks' />
                    </div>

                        <div className='specs-remarks'>
                            <button >UPDATE</button>
                            <button>SAVE</button>
                        </div>

                </div>
            </div>
        </>
    )
}
