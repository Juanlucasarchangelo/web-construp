<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import TrashIcon from './icons/IconTrash.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Listagem de Produtos</template>
    Na tela principal, você pode visualizar a lista de produtos disponíveis. Cada produto é exibido com seu nome, descrição e preço. Você pode clicar em um produto para ver mais detalhes ou para editá-lo. 
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Criação de Produtos</template>
    Para criar um novo produto, clique no botão "Adicionar Produto". Isso abrirá um formulário onde você pode inserir o nome, descrição e preço do produto. Após preencher as informações, clique em "Salvar" para adicionar o produto à lista.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Edição de Produtos</template>
    Para editar um produto existente, clique no produto que deseja modificar. Isso abrirá um formulário pré-preenchido com as informações atuais do produto. Faça as alterações necessárias e clique em "Salvar" para atualizar o produto na lista.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <TrashIcon />
    </template>
    <template #heading>Exclusão de Produtos</template>
    Para excluir um produto, clique no produto que deseja remover. Isso abrirá um formulário pré-preenchido com as informações atuais do produto. Clique no botão "Excluir" para remover o produto da lista.
  </WelcomeItem>
</template>
