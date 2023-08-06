import React from 'react';
import './App.css';
import Table from './Table';

let data = [
  { name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' },
  { name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
  { name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available' },
  { name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled' },
  { name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled' }
]
function updateData(){
  data = data.map((current, index) => {
    if(!current.id){
      current.id=index
    }
    return current
  })
}
updateData()

const columns = [
  { header: 'Name', key: 'name', isVisible: true, isSortable: true, size: 'small' },
  { header: 'Device', key: 'device', isVisible: true, isSortable: true, size: 'medium'  },
  { header: 'Path', key: 'path', isVisible: true, isSortable: true, size: 'large', renderer: (path) => {return (<span> {path}</span>)}  },
  {
    header: 'Status',
    key: 'status',
    isVisible: true,
    size: 'small',
    renderer: (status) => {
      const statusClass = status === 'available' ? status : '';
      return (<span ><span className={`circle ${statusClass}`}></span> { status.slice(0,1).toUpperCase() + status.slice(1)}
        </span>);
    },
  }
];


function App() {
  return (
    <div className="app">
      <h1>File List</h1>
      <Table data={data} columns={columns} />
    </div>
  );
}

export default App;
