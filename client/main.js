const submit = document.querySelector('button[type=submit]')
const namer = document.querySelector('.sname')
const schema = document.querySelector('.sschema')
const tableContainer = document.querySelector('#table-container')
let table;


schema.addEventListener('change',e=>{

    // detect schema value
    if(schema.value.length > 0 ){
        console.log(tableContainer)
        tableContainer.classList.remove('hide-section')
        let li = document.createElement('li');
        let input = document.createElement("input")
        input.type = 'text';
        console.log(input)
        li.classList.add('table-list-item');
        input.classList.add('stable');
        table = input;
        tableContainer.appendChild(li);
        input.appendChild(input);
    }
    })


// write db
submit.onclick = async e => {
    const body = {name:namer,table:table,schema:schema}
    e.preventDefault();
    await fetch('/api/db/write',{method:'POST',headers:{
        'Content-Type':'application/json'
    },
body:JSON.stringify(body)})
.then(r=>r.json())
.then(data=>console.log(data))
}