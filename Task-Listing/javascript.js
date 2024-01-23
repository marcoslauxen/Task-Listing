const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-task");

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  if (input.value.trim() === "") {
    alert("Adicione uma tarefa!");
    return;
  }

  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = "";
  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = ``;

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `
        <li class="task ${item.concluida && "done"}">
          <img src="./img/checked.png" alt="" onclick="concluirTarefa(${posicao})">
          <span>${item.tarefa}</span>
          <img src="./img/trash.png" alt="" onclick="deletarItem(${posicao})">
        </li>    
      `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);
  mostrarTarefas();
}

function carregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem("lista");

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

carregarTarefas();
button.addEventListener("click", adicionarNovaTarefa);
