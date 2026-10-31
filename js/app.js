const { createApp } = Vue;

const app = createApp({

    data() {
        return {
            termoBusca: "",
            carrinho: [],
            carrinhoAberto: false,

            produtos: [
                {
                    id: 1,
                    nome: "Notebook",
                    preco: 9499.90,
                    imagem: "imagens/notebook.jpg"
                },
                {
                    id: 2,
                    nome: "Mouse",
                    preco: 289.90,
                    imagem: "imagens/mouse.jpg"
                },
                {
                    id: 3,
                    nome: "Teclado",
                    preco: 349.90,
                    imagem: "imagens/teclado.jpg"
                },
                {
                    id: 4,
                    nome: "Monitor",
                    preco: 1899.90,
                    imagem: "imagens/monitor.jpg"
                }
            ]
        };
    },

    computed: {

        produtosFiltrados() {
            const busca = this.termoBusca.toLowerCase();

            return this.produtos.filter(produto =>
                produto.nome.toLowerCase().includes(busca)
            );
        },

        quantidadeCarrinho() {
            return this.carrinho.reduce(
                (total, item) => total + item.quantidade,
                0
            );
        },

        totalCarrinho() {
            return this.carrinho.reduce(
                (total, item) =>
                    total + (item.preco * item.quantidade),
                0
            );
        }

    },

    methods: {

        adicionarAoCarrinho(produto) {

            const itemExistente = this.carrinho.find(
                item => item.id === produto.id
            );

            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                this.carrinho.push({
                    ...produto,
                    quantidade: 1
                });
            }
        },

        removerDoCarrinho(item) {

            if (item.quantidade > 1) {
                item.quantidade--;
            } else {
                this.carrinho = this.carrinho.filter(
                    produto => produto.id !== item.id
                );
            }
        },

        limparCarrinho() {
            this.carrinho = [];
        },

        abrirCarrinho() {
            this.carrinhoAberto = true;
        },

        fecharCarrinho() {
            this.carrinhoAberto = false;
        },

        formatarPreco(valor) {
            return valor.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );
        }

    }

});

app.component("product-card", {

    props: {
        id: Number,
        nome: String,
        preco: Number,
        imagem: String
    },

    emits: ["adicionar"],

    methods: {

        adicionarProduto() {
            this.$emit("adicionar", {
                id: this.id,
                nome: this.nome,
                preco: this.preco,
                imagem: this.imagem
            });
        }

    },

    template: `
        <article class="produto-card">

            <img
                :src="imagem"
                :alt="'Imagem do produto ' + nome"
                class="produto-imagem"
            >

            <div class="produto-conteudo">

                <h2>{{ nome }}</h2>

                <p class="preco">
                    {{ preco.toLocaleString(
                        'pt-BR',
                        {
                            style: 'currency',
                            currency: 'BRL'
                        }
                    ) }}
                </p>

                <button @click="adicionarProduto">
                    Adicionar ao Carrinho
                </button>

            </div>

        </article>
    `

});

app.mount("#app");