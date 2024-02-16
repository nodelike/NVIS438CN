const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('refresh-ports');

    // Populate dropdown list with available COM ports
    ipcRenderer.on('list-ports', (event, ports) => {
        const comPortsSelect = document.getElementById('comPorts');
        comPortsSelect.innerHTML = '';
    
        ports.forEach(port => {
            const option = document.createElement('option');
            option.value = port.path;
            option.textContent = port.path;
            comPortsSelect.appendChild(option);
        });
    });
    
    // Handle received serial data
    ipcRenderer.on('serial-data', (event, data) => {
        const values = data.split(',').map(item => item.trim());

        updateStatusAndData(values);
    });
    
    // Event listener for Start/Stop DAQ button click
    document.getElementById(`button0`).addEventListener('click', () => {
        const selectedPort = document.getElementById('comPorts').value;
        if(selectedPort == ''){
            alert("Please select a valid port")
        } else {
            ipcRenderer.send('start-daq', selectedPort);
            toggleButtonState();
        }
    });

    function toggleButtonState() {
        const button = document.getElementById(`button0`);
        if (button.textContent === 'Start DAQ') {
            button.textContent = 'Stop DAQ';
        } else {
            alert("Data acquisition has stopped.");
            button.textContent = 'Start DAQ';
        }
    }

    function updateStatusAndData(values) {
        const statCol = document.querySelector('.stat-col');
        const dataCol = document.querySelector('.data-col');
        const addressCol = document.querySelector('.address-col');
        
        // Clear existing content
        statCol.innerHTML = '';
        dataCol.innerHTML = '';
        addressCol.innerHTML = '';
    
        // Add headings
        const statHeading = document.createElement('h3');
        statHeading.textContent = 'STATUS';
        statCol.appendChild(statHeading);
    
        const dataHeading = document.createElement('h3');
        dataHeading.textContent = 'DATA';
        dataCol.appendChild(dataHeading);
    
        const addressHeading = document.createElement('h3');
        addressHeading.textContent = 'ADDRESS';
        addressCol.appendChild(addressHeading);
    
        for (let i = 0; i < 6; i++) {
            const isConnected = values[i] !== '0';
    
            // Status
            const nodeStatus = document.createElement('p');
            nodeStatus.textContent = isConnected ? 'CONNECTED' : 'DISCONNECTED';
            statCol.appendChild(nodeStatus);
    
            // Data
            const nodeData = document.createElement('p');
            nodeData.textContent = isConnected ? ('0x00 ' + values[i + 6] + ' 0x00 ' + '0x00 ' + '0x00 ' + '0x00') : 'NA';
            dataCol.appendChild(nodeData);
    
            // Address
            const nodeAddress = document.createElement('p');
            nodeAddress.textContent = isConnected ? ('0x10' + (i + 1)) : 'NA';
            addressCol.appendChild(nodeAddress);
        }
    }
    
});
