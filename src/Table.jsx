import React, { useState } from 'react';
import './Table.css';
import { STATUS, DOWNLOAD_IMAGE_SRC, NO_DATA } from './constants';

const Table = ({ data, columns }) => {
    const [selectedRows, setSelectedRows] = useState([]);  

    const handleSelectRow = (rowIndex) => {
        if (selectedRows.includes(rowIndex)) {
            setSelectedRows(selectedRows.filter((index) => index !== rowIndex));
        } else {
            setSelectedRows([...selectedRows, rowIndex]);
        }
    };



    const handleCheckboxChange = (id, status) => {
        if(status === STATUS.AVAILABLE){
            setSelectedRows((prevSelectedRows) => {
                if (!prevSelectedRows.includes(id)) {
                    return [...prevSelectedRows, id];
                } else {
                    return prevSelectedRows.filter((rowId) => rowId !== id);
                }
            });
        }
    };

    const handleRowClick = (id, status) => {
        handleCheckboxChange(id, status);    
    };      


    return (
    <div className="table" role="table" aria-label="Data Table">
        <div className="header-row download-row"  role="row">
            <div className="checkbox-cell">
                <input
                    type="checkbox"
                    checked={selectedRows.length === data.filter(item => item.status == STATUS.AVAILABLE).length}
                    onChange={() =>{
                        let availableRows  =  data.filter(item => item.status == STATUS.AVAILABLE)
                        setSelectedRows(selectedRows.length === availableRows.length ? [] : availableRows.map((row, i) => row.id))
                    }
                    }
                />
            </div>
            <div className='label-selected'>
                <label> {selectedRows.length ? `Selected ${selectedRows.length}` : 'None Selected'}</label>
            </div>
            <div  className='label-download'>
                <a href="#" onClick={(event)=>{
                    event.preventDefault();
                    const selectedDownloads = data.filter((item) => selectedRows.includes(item.id))                    
                    const selectedDownloadsHTML = selectedDownloads.map((item, index)=> `\n ${index} ${item.path} ${item.device}`)
                    alert("Downloading Selected: \n" + selectedDownloadsHTML.toString())
                }
                }>
                    <img src={DOWNLOAD_IMAGE_SRC} />            
                    <label> Download Selected</label>
                </a>
            </div>
        </div>  
        <div className="header-row columns"  role="row">
            <div className="checkbox-cell">
                <span className="empty-checkbox"></span>
            </div>
                {
                    columns.map((column, index) =>
                        column.isVisible ? (
                            <span
                                key={index}
                                className={`column-header ${column.size}`}
                            >
                                {column.header}
                            </span>
                        ) : null
                    )
                }
        </div>
        <div className="data-list">
        {
            data.map((item) => (
                <div 
                    className={`data-row ${selectedRows.includes(item.id) ? 'selected' : ''}`}
                    key={item.id} 
                    onClick={() => handleRowClick(item.id, item.status)}
                    role="row"
                    tabIndex="0"
                    aria-selected={selectedRows.includes(item.id)}
                >

                    <div className="checkbox-cell" role="cell">
                        <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                            aria-label={`Select Row ${item.id}`}
                        />
                    </div>
                    {
                        columns.map((column, index) => (
                            column.isVisible ? (            
                            <div className={`data-cell ${column.size}`} key={`${item.id}-${index}`} role="cell">
                                {column.renderer ? column.renderer(item[column.key]) : item[column.key]}
                            </div>
                            ) : null
                        ))
                    }
                </div>
                )
            )
        }
        { data.length ==0  && (<section className='no-data'>{NO_DATA}</section>)}
        </div>
    </div>
    );
};

export default Table;
