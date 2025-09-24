# Random Number Node para n8n

<p align="center">
  <em>Um nó desenvolvido para n8n que gera números aleatórios através da API do Random.org.</em>
</p>

---

## Índice

* [Descrição do Projeto](#descrição-do-projeto)
* [Pré-requisitos](#pré-requisitos)
* [Configuração e Execução](#configuração-e-execução)
* [Testando o Nó](#testando-o-nó)
* [Contato](#contato)

---

## Descrição do Projeto

Este projeto cria um **nó personalizado** para n8n que gera números aleatórios usando random.org. 

**Recursos:**

* Geração de números aleatórios
* Entrada de valores dinâmicos de outros nós
* Configuração de intervalos mínimo e máximo
* Interface intuitiva para uso no n8n

---

## Pré-requisitos

Antes de iniciar, tenha instalado:

* Git
* Node.js e npm
* Docker e Docker Compose

---

## Configuração e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/JSilva-Erick/Custom-Random-N8N.git
cd Custom-Random-N8N
```

2. **Instale dependências:**

```bash
npm install
```

3. **Compile o TypeScript:**

```bash
npm run build
```

4. **Suba o Docker:**

```bash
docker-compose up -d
```

5. **Acesse a interface do n8n:**

* `http://localhost:5678`
* Crie a conta de administrador
* Vá em `Create Workflow`
* Adicione um nó e busque por **Random**

---

## Testando o Nó

1. Crie um workflow no n8n
2. Adicione o nó **Random**
3. Configure o `Valor Mínimo` e `Valor Máximo`
4. Execute o nó e confira o resultado no painel de saída

Exemplo de saída:

```json

[
    {
        "randomNumber": 52
    }
]
```

Para entradas dinâmicas, use outro nó (ex: Set) para enviar valores e conecte ao Random.

---


## Contato

Desenvolvido por **Erick Silva**

* GitHub: [@JSilva-Erick](https://github.com/JSilva-Erick)
* LinkedIn: [Erick Silva](https://www.linkedin.com/in/erickjsilva)
* E-mail: [erick.silva@example.com](mailto:erick.silva@example.com)
