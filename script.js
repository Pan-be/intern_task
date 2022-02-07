const endpoints = [
    'https://cataas.com/cat?json=true',
    'https://httpbin.org/json',
    'https://dog.ceo/api/breeds/image/random',
    'https://api.dictionaryapi.dev/api/v2/entries/en/word',
    'https://api.thecatapi.com/v1/images/search'
];

const btnFetch = document.querySelector('#btn-fetch')
const mainTable = document.querySelector('#my-table')
const btnFilterByStatus = document.querySelector('#select-status')
const btnFilterByDomain = document.querySelector('#select-domain')
const btnReset = document.querySelector('#btn-reset')

let currentTableState = []

const fetchData = async (endpoint) => {
    const start = new Date().getTime()

    let stop, status, duration;
    try {
        const res = await fetch(endpoint)
        stop = new Date().getTime()
        status = res.status
        duration = stop - start;
    } catch (err) { }

    return {
        endpoint,
        start,
        stop,
        status,
        duration,
    }
}

const paintRow = ({
    endpoint,
    duration,
    start,
    stop,
    status
}) => {
    const row = mainTable.insertRow(1)
    row.className = 'data-row'
    const endpointCell = row.insertCell(0)
    const durationCell = row.insertCell(1)
    const startCell = row.insertCell(2)
    const stopCell = row.insertCell(3)
    const statusCell = row.insertCell(4)
    endpointCell.innerHTML = endpoint
    durationCell.innerHTML = duration
    startCell.innerHTML = start
    stopCell.innerHTML = stop
    statusCell.innerHTML = status
}

const paintTable = () => {
    currentTableState.forEach(rowData => paintRow(rowData))
}

btnFetch.addEventListener('click', async () => {
    btnFetch.disabled = true;
    btnFetch.innerHTML = 'loading...';
    const data = await Promise.all(endpoints.map(endpoint => fetchData(endpoint)))
    console.log(data);
    btnFetch.disabled = false;
    btnFetch.innerHTML = 'FETCH';
    initialState = data;
    currentTableState = data;
    paintTable()
});
