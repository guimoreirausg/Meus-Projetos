const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaLista = []

function adicionarNovaTarefa() {
    minhaLista.push({
        tarefa:input.value,
        concluida: false
    })
    
    input.value = ''

    mostrarTarefas()

}

function mostrarTarefas() {

    let novaLi = ''

    minhaLista.forEach ((item, i) => {
        novaLi = novaLi + `
            <li class="task ${item.concluida && "done"}">
                <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirItem(${i})"></img>
                <p> ${item.tarefa}</p>
                <img src="./img/trash.png" alt="tarefa-para-deletar" onclick="deletarItem(${i})"></img>
            </li>    
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify (minhaLista))

    
}

function concluirItem(i){
    minhaLista[i].concluida = !minhaLista[i].concluida

    mostrarTarefas()
}   

function deletarItem(i) {
    minhaLista.splice(i, 1)

    mostrarTarefas()
}   

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')
    
    if(tarefasDoLocalStorage) {
        minhaLista = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)