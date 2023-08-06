import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from './Table';

describe('Table', () => {
  const columns = [
    { key: 'name', header: 'Name', isVisible: true, size: 'medium' },
    { key: 'device', header: 'Device', isVisible: true, size: 'medium' },
    { key: 'path', header: 'Path', isVisible: true, size: 'large' },
    { key: 'status', header: 'Status', isVisible: true, size: 'small' },
  ];

  const data = [
    { id: 0, name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' },
    { id: 1, name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
    { id: 2, name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available' },
    { id: 3, name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled' },
    { id: 4, name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled' }
  ]

  test('renders column headers correctly', () => {
    const { container } = render(<Table data={data} columns={columns} />);
    columns.forEach((column) => {
        expect(container).toHaveTextContent(column.header);
    });    
  });

  test('renders data correctly', () => {
    const { container } = render(<Table data={data} columns={columns} />);
    data.forEach((item, index) => {
        expect(container).toHaveTextContent(item.name);
        expect(container).toHaveTextContent(item.device);
        expect(container).toHaveTextContent(item.path);
        expect(container).toHaveTextContent(item.status);
    });    
  });

  test('renders empty data correctly', () => {
    const { container } = render(<Table data={[]} columns={columns} />);
    columns.forEach((column) => {
        expect(container).toHaveTextContent(column.header);
    });    
    expect(container).toHaveTextContent("No Data Available");
  });  

});