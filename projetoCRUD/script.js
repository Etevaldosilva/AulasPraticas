const modalContainer = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const btnSalvar = document.getElementById("btnSalvar");

const nome = document.getElementById("m-nome");
const funcao = document.getElementById("m-funcao");
const salario = document.getElementById("m-salario");

let funcionarios = [];
let editIndex = null;

// Abrir modal
function openModal(edit = false, index = null) {
  modalContainer.classList.add("active");

  if (edit) {
    nome.value = funcionarios[index].nome;
    funcao.value = funcionarios[index].funcao;
    salario.value = funcionarios[index].salario;
    editIndex = index;
  } else {
    nome.value = "";
    funcao.value = "";
    salario.value = "";
    editIndex = null;
  }
}

// Fechar modal ao clicar fora
modalContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-container")) {
    modalContainer.classList.remove("active");
  }
});

// Salvar dados
btnSalvar.addEventListener("click", (e) => {
  e.preventDefault();

  const funcionario = {
    nome: nome.value,
    funcao: funcao.value,
    salario: salario.value,
  };

  if (editIndex !== null) {
    funcionarios[editIndex] = funcionario;
  } else {
    funcionarios.push(funcionario);
  }

  modalContainer.classList.remove("active");
  renderTable();
});

nome.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // impede envio do formulário
    funcao.focus(); // move o foco para o próximo campo
  }
});

funcao.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    salario.focus(); // move o foco para o campo salário
  }
});


// Renderizar tabela
function renderTable() {
  tbody.innerHTML = "";
  funcionarios.forEach((f, i) => {
    const row = `
      <tr>
        <td>${f.nome}</td>
        <td>${f.funcao}</td>
        <td>${f.salario}</td>
        <td class="acao">
          <button class="btn-editar" onclick="openModal(true, ${i})" title="Editar">
            <i class='bx bx-edit'></i>
          </button>
        </td>
        <td class="acao">
          <button class="btn-excluir" onclick="deleteFuncionario(${i})" title="Excluir">
            <i class='bx bx-trash'></i>
          </button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}


// Excluir funcionário
function deleteFuncionario(index) {
  funcionarios.splice(index, 1);
  renderTable();
}
