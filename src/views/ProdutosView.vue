<script setup>
import { ref, onMounted } from "vue";

const produtos = ref([]);
const loading = ref(true);

const modalAberto = ref(false);
const modoEdicao = ref(false);

const produtoForm = ref({
  id: null,
  nome: "",
  descricao: "",
  marca: "",
  preco: "",
  estoque: "",
});

async function carregarProdutos() {
  const response = await fetch("http://127.0.0.1:8000/api/produtos/listar", {
    headers: {
      token: "159357",
    },
  });

  const data = await response.json();
  produtos.value = data;
  loading.value = false;
}

function abrirModalNovo() {
  modoEdicao.value = false;

  produtoForm.value = {
    id: null,
    nome: "",
    descricao: "",
    marca: "",
    preco: "",
    estoque: "",
  };

  modalAberto.value = true;
}

function abrirModalEditar(produto) {
  modoEdicao.value = true;

  produtoForm.value = { ...produto };

  modalAberto.value = true;
}

function fecharModal() {
  modalAberto.value = false;
}

async function salvarProduto() {
  try {
    let url = "http://127.0.0.1:8000/api/produtos/criar";
    let method = "POST";

    if (modoEdicao.value) {
      url = `http://127.0.0.1:8000/api/produtos/editar/${produtoForm.value.id}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method,
      headers: {
        token: "159357",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoForm.value),
    });

    await response.json();

    fecharModal();
    carregarProdutos();
  } catch (error) {
    console.error("Erro ao salvar produto", error);
  }
}

async function excluirProduto(id) {
  if (!confirm("Deseja realmente excluir este produto?")) return;

  try {
    await fetch(`http://127.0.0.1:8000/api/produtos/excluir/${id}`, {
      method: "DELETE",
      headers: {
        token: "159357",
      },
    });

    produtos.value = produtos.value.filter((p) => p.id !== id);
  } catch (error) {
    console.error("Erro ao excluir produto", error);
  }
}

onMounted(() => {
  carregarProdutos();
});
</script>

<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="top-bar">
        <h1>Produtos</h1>
        <button class="btn-add" @click="abrirModalNovo">+ Adicionar Produto</button>
      </div>

      <table v-if="!loading" class="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Marca</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto in produtos" :key="produto.id">
            <td>{{ produto.id }}</td>
            <td>{{ produto.nome }}</td>
            <td>{{ produto.descricao }}</td>
            <td>{{ produto.marca }}</td>
            <td class="preco">R$ {{ produto.preco }}</td>
            <td>{{ produto.estoque }}</td>

            <td class="acoes">
              <button class="btn-editar" @click="abrirModalEditar(produto)">
                Editar
              </button>

              <button class="btn-excluir" @click="excluirProduto(produto.id)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- MODAL -->

      <div v-if="modalAberto" class="modal">
        <div class="modal-content">
          <h2 v-if="modoEdicao">Editar Produto</h2>
          <h2 v-else>Novo Produto</h2>

          <input v-model="produtoForm.nome" placeholder="Nome" />

          <input v-model="produtoForm.descricao" placeholder="Descrição" />

          <input v-model="produtoForm.marca" placeholder="Marca" />

          <input v-model="produtoForm.preco" placeholder="Preço" />

          <input v-model="produtoForm.estoque" placeholder="Estoque" />

          <div class="modal-actions">
            <button class="btn-salvar" @click="salvarProduto">Salvar</button>

            <button class="btn-cancelar" @click="fecharModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  width: 100vw;
  margin-left: calc(-45.6vw + 50%);
}

.container {
  padding: 40px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn-add {
  background: #22c55e;
  border: none;
  padding: 10px 16px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.tabela {
  width: 100%;
  border-collapse: collapse;
  background: #1e1e1e;
  color: white;
}

th,
td {
  padding: 14px;
  border-bottom: 1px solid #333;
}

tr:hover {
  background: #2a2a2a;
}

.preco {
  color: #4ade80;
  font-weight: bold;
}

.acoes {
  display: flex;
  gap: 10px;
}

.btn-editar {
  background: #3b82f6;
  border: none;
  padding: 6px 10px;
  color: white;
  border-radius: 5px;
}

.btn-excluir {
  background: #ef4444;
  border: none;
  padding: 6px 10px;
  color: white;
  border-radius: 5px;
}

/* MODAL */

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #1e1e1e;
  padding: 30px;
  width: 400px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-content input {
  padding: 10px;
  border-radius: 5px;
  border: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-salvar {
  background: #22c55e;
  border: none;
  padding: 8px 12px;
  color: white;
}

.btn-cancelar {
  background: #6b7280;
  border: none;
  padding: 8px 12px;
  color: white;
}
</style>
