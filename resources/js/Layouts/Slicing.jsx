import { CrossIcon } from "../Icons/SVG";
export default function SlicingMachine({data , setData,setLotContainer}){
    const motherRows = [1, 2, 3];
    const numberOfrows = [1,2,3,4,5,6];
    return(
        <>
            <div className="inprocess-container">
                <div className="inprocess-details">
                     <h1>{data.model}-SLICING (W) MONITORING</h1>
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
                            <label>Mahine No.:</label>
                            <input type="number"   ></input>
                        </div>
                         <div className='data-input' >
                            <label>Date:</label>
                            <input type="number"   ></input>
                        </div>
                         <div className='data-input' >
                            <label>Shift:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Operator Name :</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Checked by :</label>
                            <input type="number"   ></input>
                        </div>
                    </div>
                    <div className='data-container'>
                        <div className='data-input' >
                            <label>Pattern:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Carrier Speed:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>No. of pass:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Motor Load:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Staff/Engr:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>Micrometer Serial No.:</label>
                            <input type="number"   ></input>
                        </div>
                    </div>
                    <div className='data-container'>
                        <div className='data-input' >
                            <label>Checking Condition:</label>
                            <input type="number"   ></input>
                        </div>
                        <div className='data-input' >
                            <label>No. of TB/CYCLE:</label>
                            <input type="number"   ></input>
                        </div>
                    </div>
                </div>
                <div className='data-table'>
                    <div className='title-center'>
                        <h1>SLICING (W) MONITORING</h1>
                    </div>
                    <div className='specs-table'>
                        <div>
                            <div className='specs-details'>
                                <h2>WIDTH SPECS</h2>
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
                    </div>
                    <div className='specs-table'>
                    <table className='cgh-table' border={1}>
                            <thead>
                                <tr>
                                    <th colSpan={3}></th>
                                    <th >100% Checking</th>
                                    <th >Critical Limit</th>
                                    <th colSpan={6} style={{ background:'black' , color:'white' }}>GOOD</th>
                                    <th >Critical Limit</th>
                                    <th >100% Checking</th>
                                    <th ></th>

                                </tr>
                                <tr>
                                    <th>Row</th>
                                    <th>No</th>
                                    <th>LW</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>HW</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    motherRows.map((items)=>{
                                        let previous;
                                        let newRow = 0;
                                        return(
                                            <>
                                                {
                                                    numberOfrows.map((row)=>{
                                                    const yellow = "sky-yellow-theme";
                                                    const blue = "sky-blue-theme";
                                                    const orange = "sky-orange-theme";
                                                    const theme =  items === 1 ?yellow:items ===2 ?blue:items===3?orange:null;
                                                    previous = newRow > 0 && previous !== newRow ? true:false;
                                                    newRow =  newRow !== items ? items :newRow;

                                                    return(
                                                        <tr key={row}>
                                                            {!previous && <td rowSpan={6} className="gray-theme vertical-text">Row #{newRow}</td>}
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                            <td className={theme}></td>
                                                        </tr>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    })

                                }
                            </tbody>
                        </table>
                        <table className='cgh-table' border={1}>
                            <thead>
                                <tr>
                                    <th colSpan={9}>ACTUAL MEASURMENT</th>
                                </tr>
                                <tr>
                                    <th>Row</th>
                                    <th>No</th>
                                    <th className="green-theme" >Pt.1</th>
                                    <th className="green-theme">Pt.2</th>
                                    <th className="green-theme">Pt.3</th>
                                    <th className="orange-theme">Max</th>
                                    <th className="orange-theme">Min</th>
                                    <th className="yellow-theme">Worst</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    motherRows.map((items)=>{
                                        let previous;
                                        let newRow = 0;
                                        return(
                                            <>
                                                {
                                                    numberOfrows.map((row)=>{
                                                    const yellow = "light-yellow-theme";
                                                    const blue = "light-blue-theme";
                                                    const orange = "light-orange-theme";
                                                    console.log( 'items' ,items , 'newrow',newRow);
                                                    console.log(newRow ,items);
                                                    previous = newRow > 0 && previous !== newRow ? true:false;
                                                    newRow =  newRow !== items ? items :newRow;
                                                    console.log('set new' , previous);

                                                    return(
                                                        <tr key={row}>
                                                            {!previous && <td rowSpan={6} className="gray-theme vertical-text">Row #{newRow}</td>}
                                                            <td className="gray-theme">{row}</td>
                                                            <td className="input-data-box"><input/></td>
                                                            <td className="input-data-box"><input/></td>
                                                            <td className="input-data-box"><input/></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                        )
                                                    })
                                                }
                                            </>
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
