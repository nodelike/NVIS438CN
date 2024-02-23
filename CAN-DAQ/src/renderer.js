const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('refresh-ports');

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

    ipcRenderer.on('serial-data', (event, data) => {
        const values = data.split(',').map(item => item.trim());
        console.log(values);
        updateStatusAndData(values);
    });

    document.getElementById(`button0`).addEventListener('click', () => {
        const selectedPort = document.getElementById('comPorts').value;
        if(selectedPort == ''){
            alert("Please select a valid port");
        } else {
            ipcRenderer.send('start-daq', selectedPort);
            toggleButtonState();
        }
    });

    function resetStatusAndData() {
        const nodes = document.querySelectorAll('.node');
        nodes.forEach((node) => {
            // Resetting each node
            const statusDot = node.getElementsByClassName('statDot')[0];
            const statusElement = node.querySelectorAll('p')[0]; // First p element for Status
            const dataElement = node.querySelectorAll('p')[1]; // Second p element for Data
            const addressElement = node.querySelectorAll('p')[2]; // Third p element for Address
    
            if (statusElement && dataElement && addressElement) {
                dataElement.textContent = 'NA';
                statusDot.style.background = 'red';
                statusElement.textContent = 'DISCONNECTED';
                addressElement.textContent = 'NA';
            } else {
                console.error('One or more elements not found:', statusElement, dataElement, addressElement);
            }
        });
    }

    function toggleButtonState() {
        const button = document.getElementById(`button0`);
        if (button.textContent === 'Start DAQ') {
            button.textContent = 'Stop DAQ';
        } else {
            alert("Data acquisition has stopped.");
            button.textContent = 'Start DAQ';
            resetStatusAndData();
        }
    }

    function updateStatusAndData(values) {
        const nodes = document.querySelectorAll('.node');
        nodes.forEach((node, index) => {
            const isConnected = values[index] !== '0';
    
            // Here we directly target the p elements inside each .node
            const statusDot = node.getElementsByClassName('statDot')[0];
            const statusElement = node.querySelectorAll('p')[0]; // First p element for Status
            const dataElement = node.querySelectorAll('p')[1]; // Second p element for Data
            const addressElement = node.querySelectorAll('p')[2]; // Third p element for Address
    
            // Check if all elements were found
            if (statusElement && dataElement && addressElement) {
                if (index == 4){
                    dataElement.textContent = isConnected ? '0x00 ' + '0x00' + ' 0x00 ' + '0x00 ' + '0x00 ' + values[index + 6] : 'NA';
                } else {
                    dataElement.textContent = isConnected ? '0x00 ' + values[index + 6] + ' 0x00 ' + '0x00 ' + '0x00 ' + '0x00' : 'NA';
                }
                statusDot.style.background = isConnected ? 'green' : 'red';
                statusElement.textContent = isConnected ? 'CONNECTED' : 'DISCONNECTED';
                addressElement.textContent = isConnected ? '0x10' + (index + 1) : 'NA';
            } else {
                console.error('One or more elements not found:', statusElement, dataElement, addressElement);
            }
        });
    }

    document.getElementById('closeBtn').addEventListener('click', function (){
        ipcRenderer.send('closeApp');
    });

    document.getElementById('minimizeBtn').addEventListener('click', function (){
        ipcRenderer.send('minimizeApp');
    });

    document.getElementById('maximizeBtn').addEventListener('click', function (){
        ipcRenderer.send('maximizeApp');
    });
});
