import { AddBoxIcon, CrossIcon } from "../Icons/SVG"
export default function AdminUser({ modelDetails, setModeltails, handleKeyDown, handleClose, preview, processingModel, fileInputRef, handleUpload, submit }) {
    console.log('Model Detailsss: ', modelDetails);
    return (
        <section>
            <div className="modal">
                <div className="details-container-white">
                    <div style={{ alignSelf: 'flex-end' }}>
                        <button className="close-btn" onClick={() => handleClose()}><CrossIcon /></button>
                    </div>
                    <div>
                        <h1>Create Model</h1>
                    </div>
                    <form className="form-data" onSubmit={
                        (e) => {

                            submit(e, 'model');

                        }
                    } style={{ display: "flex", flexDirection: "column" }}>

                        <div>
                            <div>
                                <div>
                                    <div className="modal-input">
                                        <label>Model:</label>
                                        <input
                                            value={modelDetails.model}
                                            onChange={(e) => setModeltails('model', e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-row">
                                    <div>
                                        <div>
                                            <h1>CGHL</h1>
                                        </div>
                                        <div>
                                            <div className="modal-input">
                                                <label>CGHL points:</label>
                                                <input type="number"
                                                    value={modelDetails.cghl_points}
                                                    onChange={(e) => setModeltails('cghl_points', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>CGH Target:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.cghl_om_specs?.target?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['cghl_om_specs']?.['target'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.cghl_om_specs?.target?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['cghl_om_specs']?.['target'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.cghl_om_specs?.target?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['cghl_om_specs']?.['target'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.cghl_om_specs?.target?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['cghl_om_specs']?.['target'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>CGH Max:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.cghl_om_specs?.max?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['cghl_om_specs']?.[''] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.cghl_om_specs?.max?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['cghl_om_specs']?.['max'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.cghl_om_specs?.max?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['cghl_om_specs']?.['max'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.cghl_om_specs?.max?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['cghl_om_specs']?.['max'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>CGH Min:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.cghl_om_specs?.min?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['cghl_om_specs']?.['min'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.cghl_om_specs?.min?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['cghl_om_specs']?.['min'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.cghl_om_specs?.min?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['cghl_om_specs']?.['min'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.cghl_om_specs?.min?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['cghl_om_specs']?.['min'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>CGH Specs:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.cghl_om_specs?.specs?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['cghl_om_specs']?.['specs'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.cghl_om_specs?.specs?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['cghl_om_specs']?.['specs'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.cghl_om_specs?.specs?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['cghl_om_specs']?.['specs'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.cghl_om_specs?.specs?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['cghl_om_specs']?.['specs'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>CGH Tolerance:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.cghl_om_specs?.tol?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['cghl_om_specs']?.['tol'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.cghl_om_specs?.tol?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['cghl_om_specs']?.['tol'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.cghl_om_specs?.tol?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['cghl_om_specs']?.['tol'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.cghl_om_specs?.tol?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['cghl_om_specs']?.['tol'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>CGH Perpen:</label>
                                                <div className="om-group">
                                                    <input className="om-input" type="number" placeholder="1st"
                                                        value={modelDetails.cghl_om_specs?.perpen?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['cghl_om_specs']?.['perpen'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                    <input className="om-input" type="number" placeholder="2nd"
                                                        value={modelDetails.cghl_om_specs?.perpen?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['cghl_om_specs']?.['perpen'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                    <input className="om-input" type="number" placeholder="3rd"
                                                        value={modelDetails.cghl_om_specs?.perpen?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['cghl_om_specs']?.['perpen'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                    <input className="om-input" type="number" placeholder="4th"
                                                        value={modelDetails.cghl_om_specs?.perpen?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['cghl_om_specs']?.['perpen'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>CGH Para:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.cghl_om_specs?.para?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['cghl_om_specs']?.['para'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.cghl_om_specs?.para?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['cghl_om_specs']?.['para'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.cghl_om_specs?.para?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['cghl_om_specs']?.['para'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.cghl_om_specs?.para?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['cghl_om_specs']?.['para'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>CGH Flatness:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.cghl_om_specs?.flat?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['cghl_om_specs']?.['flat'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.cghl_om_specs?.flat?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['cghl_om_specs']: {
                                                                ...(prev['cghl_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['cghl_om_specs']?.['flat'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.lapping_om_specs?.flat?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['lapping_om_specs']?.['flat'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.lapping_om_specs?.flat?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['lapping_om_specs']?.['flat'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <h1>Lapping</h1>
                                            <div className="modal-input">
                                                <label>Lapping T points:</label>
                                                <input type="number"
                                                    value={modelDetails.lapping_points}
                                                    onChange={(e) => setModeltails('lapping_points', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Lapping Target:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.lapping_om_specs?.target?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['lapping_om_specs']?.['target'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.lapping_om_specs?.target?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['lapping_om_specs']?.['target'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.lapping_om_specs?.target?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['lapping_om_specs']?.['target'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.lapping_om_specs?.target?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['lapping_om_specs']?.['target'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Lapping Max:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.lapping_om_specs?.max?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['lapping_om_specs']?.['max'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.lapping_om_specs?.max?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['lapping_om_specs']?.['max'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.lapping_om_specs?.max?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['lapping_om_specs']?.['max'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.lapping_om_specs?.max?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['lapping_om_specs']?.['max'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Lapping Min:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.lapping_om_specs?.min?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['lapping_om_specs']?.['min'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.lapping_om_specs?.min?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['lapping_om_specs']?.['min'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.lapping_om_specs?.min?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['lapping_om_specs']?.['min'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.lapping_om_specs?.min?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['lapping_om_specs']?.['min'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Lapping Tolerance:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.lapping_om_specs?.tol?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['lapping_om_specs']?.['tol'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.lapping_om_specs?.tol?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['lapping_om_specs']?.['tol'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.lapping_om_specs?.tol?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['lapping_om_specs']?.['tol'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.lapping_om_specs?.tol?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['lapping_om_specs']?.['tol'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Lapping Specs:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.lapping_om_specs?.specs?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['lapping_om_specs']?.['specs'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.lapping_om_specs?.specs?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['lapping_om_specs']?.['specs'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.lapping_om_specs?.specs?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['lapping_om_specs']?.['specs'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.lapping_om_specs?.specs?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['lapping_om_specs']?.['specs'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Lapping Perpen:</label>
                                                <div className="om-group">
                                                    <input className="om-input" type="number" placeholder="1st"
                                                        value={modelDetails.lapping_om_specs?.perpen?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['lapping_om_specs']?.['perpen'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                    <input className="om-input" type="number" placeholder="2nd"
                                                        value={modelDetails.lapping_om_specs?.perpen?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['lapping_om_specs']?.['perpen'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                    <input className="om-input" type="number" placeholder="3rd"
                                                        value={modelDetails.lapping_om_specs?.perpen?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['lapping_om_specs']?.['perpen'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                    <input className="om-input" type="number" placeholder="4th"
                                                        value={modelDetails.lapping_om_specs?.perpen?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['lapping_om_specs']?.['perpen'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Lapping Para:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.lapping_om_specs?.para?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['lapping_om_specs']?.['para'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.lapping_om_specs?.para?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['lapping_om_specs']?.['para'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.lapping_om_specs?.para?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['lapping_om_specs']?.['para'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.lapping_om_specs?.para?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['lapping_om_specs']?.['para'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Lapping Flatness:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.lapping_om_specs?.flat?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['lapping_om_specs']?.['flat'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.lapping_om_specs?.flat?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['lapping_om_specs']?.['flat'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.lapping_om_specs?.flat?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['lapping_om_specs']?.['flat'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.lapping_om_specs?.flat?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['lapping_om_specs']: {
                                                                ...(prev['lapping_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['lapping_om_specs']?.['flat'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Slicing Data*/}
                                    <div>
                                        <div>
                                            <div>
                                                <h1>Slicing</h1>
                                            </div>
                                            <div className="modal-input">
                                                    <label>Slicing points:</label>
                                                    <input type="number"
                                                        value={modelDetails.slicing_points}
                                                        onChange={(e) => setModeltails('slicing_points', e.target.value)}
                                                        onKeyDown={(e) => handleKeyDown(e)}></input>
                                                </div>
                                            <div className="modal-input">
                                                <label>Slicing Jigs:</label>
                                                <input type="number"
                                                    value={modelDetails.slicing_jigs}
                                                    onChange={(e) => setModeltails('slicing_jigs', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Row:</label>
                                                <input type="number"
                                                    value={modelDetails.slicing_row}
                                                    onChange={(e) => setModeltails('slicing_row', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Layer:</label>
                                                <input type="number"
                                                    value={modelDetails.slicing_layer}
                                                    onChange={(e) => setModeltails('slicing_layer', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Target:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.slicing_om_specs?.target?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['slicing_om_specs']?.['target'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.slicing_om_specs?.target?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['slicing_om_specs']?.['target'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.slicing_om_specs?.target?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['slicing_om_specs']?.['target'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.slicing_om_specs?.target?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['target']: {
                                                                    ...(prev['slicing_om_specs']?.['target'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Max:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.slicing_om_specs?.max?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['slicing_om_specs']?.['max'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.slicing_om_specs?.max?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['slicing_om_specs']?.['max'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.slicing_om_specs?.max?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['slicing_om_specs']?.['max'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.slicing_om_specs?.max?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['max']: {
                                                                    ...(prev['slicing_om_specs']?.['max'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Min:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.slicing_om_specs?.min?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['slicing_om_specs']?.['min'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.slicing_om_specs?.min?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['slicing_om_specs']?.['min'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.slicing_om_specs?.min?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['slicing_om_specs']?.['min'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.slicing_om_specs?.min?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['min']: {
                                                                    ...(prev['slicing_om_specs']?.['min'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Tolerance:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.slicing_om_specs?.tol?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['slicing_om_specs']?.['tol'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.slicing_om_specs?.tol?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['slicing_om_specs']?.['tol'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.slicing_om_specs?.tol?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['slicing_om_specs']?.['tol'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.slicing_om_specs?.tol?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['tol']: {
                                                                    ...(prev['slicing_om_specs']?.['tol'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Specs:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="1st"
                                                        value={modelDetails.slicing_om_specs?.specs?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['slicing_om_specs']?.['specs'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="2nd"
                                                        value={modelDetails.slicing_om_specs?.specs?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['slicing_om_specs']?.['specs'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="3rd"
                                                        value={modelDetails.slicing_om_specs?.specs?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['slicing_om_specs']?.['specs'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="text"
                                                        placeholder="4th"
                                                        value={modelDetails.slicing_om_specs?.specs?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['specs']: {
                                                                    ...(prev['slicing_om_specs']?.['specs'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Perpen:</label>
                                                <div className="om-group">
                                                    <input className="om-input" type="number" placeholder="1st"
                                                        value={modelDetails.slicing_om_specs?.perpen?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['slicing_om_specs']?.['perpen'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                    <input className="om-input" type="number" placeholder="2nd"
                                                        value={modelDetails.slicing_om_specs?.perpen?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['slicing_om_specs']?.['perpen'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                    <input className="om-input" type="number" placeholder="3rd"
                                                        value={modelDetails.slicing_om_specs?.perpen?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['slicing_om_specs']?.['perpen'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                    <input className="om-input" type="number" placeholder="4th"
                                                        value={modelDetails.slicing_om_specs?.perpen?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['perpen']: {
                                                                    ...(prev['slicing_om_specs']?.['perpen'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))} />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Para:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.slicing_om_specs?.para?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['slicing_om_specs']?.['para'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.slicing_om_specs?.para?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['slicing_om_specs']?.['para'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.slicing_om_specs?.para?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['slicing_om_specs']?.['para'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.slicing_om_specs?.para?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['para']: {
                                                                    ...(prev['slicing_om_specs']?.['para'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-input">
                                                <label>Slicing Flatness:</label>
                                                <div className="om-group">
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="1st"
                                                        value={modelDetails.slicing_om_specs?.flat?.first}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['slicing_om_specs']?.['flat'] || {}),
                                                                    first: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="2nd"
                                                        value={modelDetails.slicing_om_specs?.flat?.second}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['slicing_om_specs']?.['flat'] || {}),
                                                                    second: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="3rd"
                                                        value={modelDetails.slicing_om_specs?.flat?.third}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['slicing_om_specs']?.['flat'] || {}),
                                                                    third: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                    <input
                                                        className="om-input"
                                                        type="number"
                                                        placeholder="4th"
                                                        value={modelDetails.slicing_om_specs?.flat?.fourth}
                                                        onChange={(e) => setModeltails((prev) => ({
                                                            ...prev,
                                                            ['slicing_om_specs']: {
                                                                ...(prev['slicing_om_specs'] || {}),
                                                                ['flat']: {
                                                                    ...(prev['slicing_om_specs']?.['flat'] || {}),
                                                                    fourth: e.target.value
                                                                }
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <h1>Histogram</h1>
                                            <div className="modal-input">
                                                <label>Histogram points:</label>
                                                <input type="number"
                                                    value={modelDetails.histogram_point}
                                                    onChange={(e) => setModeltails('histogram_point', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Flatness:</label>
                                                <input type="number"
                                                    value={modelDetails.flatness_lapping}
                                                    onChange={(e) => setModeltails('flatness_lapping', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Height:</label>
                                                <input type="number"
                                                    value={modelDetails.height_lapping}
                                                    onChange={(e) => setModeltails('height_lapping', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Perpendicularity:</label>
                                                <input type="number"
                                                    value={modelDetails.perpendicularity}
                                                    onChange={(e) => setModeltails('perpendicularity', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Parallelism:</label>
                                                <input type="number"
                                                    value={modelDetails.parallelism_lapping}
                                                    onChange={(e) => setModeltails('parallelism_lapping', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                        </div>
                                    </div>
                                    {/*Barelling Data*/}
                                    <div>
                                        <div>
                                            <h1>Barelling</h1>
                                            <div className="modal-input">
                                                <label>Barelling points:</label>
                                                <input type="number"
                                                    value={modelDetails.point}
                                                    onChange={(e) => setModeltails('point', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Barelling target:</label>
                                                <input type="number"
                                                    value={modelDetails.barelling_target}
                                                    onChange={(e) => setModeltails('barelling_target', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}
                                                ></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Barelling minimum:</label>
                                                <input type="number"
                                                    value={modelDetails.barelling_min}
                                                    onChange={(e) => setModeltails('barelling_min', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}
                                                ></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Barelling maximum:</label>
                                                <input type="number"
                                                    value={modelDetails.barelling_max}
                                                    onChange={(e) => setModeltails('barelling_max', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}
                                                ></input>
                                            </div>
                                            <h1>Barelling Chamfering</h1>
                                            <div className="modal-input">
                                                <label>Chamfer Points:</label>
                                                <input type="number"
                                                    max="2"
                                                    value={modelDetails.chamfer_points}
                                                    onChange={(e) => setModeltails('chamfer_points', Number(e.target.value) <= 1 ? 1 : Number(e.target.value) > 2 ? 2 : e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <br />
                                            <p>Point 1</p>
                                            <div className="modal-input">
                                                <label>Chamfer Barell target:</label>
                                                <input type="number"
                                                    value={modelDetails.chamfer_barelling_target}
                                                    onChange={(e) => setModeltails('chamfer_barelling_target', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Chamfer Barell min</label>
                                                <input type="number"
                                                    value={modelDetails.chamfer_barelling_min}
                                                    onChange={(e) => setModeltails('chamfer_barelling_min', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Chamfer Barell max:</label>
                                                <input type="number"
                                                    value={modelDetails.chamfer_barelling_max}
                                                    onChange={(e) => setModeltails('chamfer_barelling_max', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <br />
                                            <p>Point 2</p>
                                            <div className="modal-input">
                                                <label>Chamfer Barell target:</label>
                                                <input type="number"
                                                    value={modelDetails.chamfer_barelling_target2}
                                                    onChange={(e) => setModeltails('chamfer_barelling_target2', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Chamfer Barell min</label>
                                                <input type="number"
                                                    value={modelDetails.chamfer_barelling_min2}
                                                    onChange={(e) => setModeltails('chamfer_barelling_min2', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Chamfer Barell max:</label>
                                                <input type="number"
                                                    value={modelDetails.chamfer_barelling_max2}
                                                    onChange={(e) => setModeltails('chamfer_barelling_max2', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}></input>
                                            </div>
                                            <div className="modal-input">
                                                <label>Chamfer Type:</label>
                                                <input type="number"
                                                    value={modelDetails.chamfer_type}
                                                    onChange={(e) => setModeltails('chamfer_type', e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e)}
                                                    disabled={true}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-row picture-container">
                            {
                                modelDetails && modelDetails.chamfer_points ?
                                    Array.from({ length: modelDetails.chamfer_points }).map((_, i) => (
                                        <div className="upload-container-row">
                                            <div className="drop-zone"
                                                onDragOver={(e) => e.preventDefault()}
                                                onClick={() => fileInputRef.current[`point${i + 1}`].click()}
                                                onDrop={(e) => handleDrop(e, i + 1)}>
                                                <div>
                                                    <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Chamfering Point {i + 1}</p>
                                                    <input id={`file-${i}`} ref={(el) => fileInputRef.current[`point${i + 1}`] = el} type="file" accept="image/*" className="upload-input" onChange={(e) => handleUpload(e, i + 1)} idName="fileInput" hidden />
                                                </div>
                                                <div className="upload-container">
                                                    <div className="pictures-preview" style={{ width: "13rem", height: "10rem" }}>
                                                        {
                                                            preview && preview[`chamfer_point${i + 1}_data`] && <img src={preview[`chamfer_point${i + 1}_data`]} alt="preview" style={{ width: "13rem", height: "10rem" }} />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : <div className="drop-zone" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "13rem", height: "12rem" }}> No Photo needed</div>
                            }
                        </div>
                        <button className="success-theme" style={{ alignSelf: 'flex-end' }} disabled={processingModel}>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
