const xlables = [];
const yTemps =[];

chartIt();
async function chartIt() {
    const data = await getData();
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.xs,
            datasets: [{
                // label: '# of Votes',
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in Cº',
                data: data.ys,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: {
                    ticks: {
                        callback: function(value, index, values) {
                            return value + 'º';
                        }
                    }
                }
            }
        }
        
    });
}

async function getData() {

    const xs = [];
    const ys =[];

    const response = await fetch('GLB.Ts+dSST.csv');
    const data = await response.text();
    
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xs.push(year);
        const temp = columns[1];
        ys.push(parseFloat (temp));
        console.log(year, temp);
        
    })
    return  { xs, ys }
}