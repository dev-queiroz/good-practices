# Boas Práticas de Programação

Este repositório demonstra três princípios fundamentais de boas práticas em programação que são essenciais para desenvolver código limpo, manutenível e eficiente.

## 1. DRY (Don't Repeat Yourself - Não Se Repita)

O princípio DRY estabelece que "cada pedaço de conhecimento deve ter uma representação única, inequívoca e autoritativa dentro de um sistema".

### Exemplo:

```javascript
// Ruim (Violando DRY)
if (usuario.tipo === "admin") {
  console.log("Bem-vindo, Admin!");
  mostrarPainelAdmin();
}
if (usuario.tipo === "admin") {
  permitirAcessoTotal();
}

// Bom (Seguindo DRY)
function ehAdmin(usuario) {
  return usuario.tipo === "admin";
}

if (ehAdmin(usuario)) {
  console.log("Bem-vindo, Admin!");
  mostrarPainelAdmin();
  permitirAcessoTotal();
}
```

A ideia principal do DRY consiste em evitar a repetição de código, reduzindo a complexidade e facilitando a manutenção do código.
[Mais aqui!](https://github.com/dev-queiroz/good-practices/tree/main/dry)

## 2. KISS (Keep It Simple, Stupid - Mantenha Isso Simples, Estúpido)

KISS enfatiza que a simplicidade deve ser um objetivo fundamental no design. Soluções simples são mais fáceis de entender, manter e têm menos probabilidade de conter erros.

### Exemplo:

```python
# Ruim (Complexo demais)
def calcular_idade(data_nascimento):
    hoje = datetime.now()
    idade = hoje.year - data_nascimento.year
    if hoje.month < data_nascimento.month or \
       (hoje.month == data_nascimento.month and hoje.day < data_nascimento.day):
        idade -= 1
    return idade

# Bom (Simples e direto)
from dateutil.relativedelta import relativedelta

def calcular_idade(data_nascimento):
    return relativedelta(datetime.now(), data_nascimento).years
```

KISS enfatiza a simplicidade e a estúpidoade do código, mantendo-a simples e direta sem perder a legibilidade.
[Mais aqui!](https://github.com/dev-queiroz/good-practices/tree/main/kiss)

## 3. YAGNI (You Ain't Gonna Need It - Você Não Vai Precisar Disso)

YAGNI sugere que você não deve adicionar funcionalidades até que sejam realmente necessárias. Implementar recursos "por precaução" frequentemente resulta em código não utilizado e complexidade desnecessária.

### Exemplo:

```python
# Ruim (Violando YAGNI)
class Usuario:
    def __init__(self, nome):
        self.nome = nome
        self.preferencias = {}  # Ainda não necessário
        self.historico = []     # Ainda não necessário
        self.cache = {}         # Ainda não necessário

    def configurar_preferencias(self):  # Função não utilizada
        pass

    def limpar_historico(self):         # Função não utilizada
        pass

# Bom (Seguindo YAGNI)
class Usuario:
    def __init__(self, nome):
        self.nome = nome
```

YAGNI enfatiza a necessidade de implementar funcionalidades apenas quando elas realmente forem necessárias, reduzindo a complexidade desnecessária e economizando tempo de desenvolvimento.
[Mais aqui!](https://github.com/dev-queiroz/good-practices/tree/main/yagni)

## Benefícios da Aplicação

1. **DRY**

   - Reduz duplicação de código
   - Facilita manutenção
   - Diminui chance de erros

2. **KISS**

   - Melhora legibilidade
   - Facilita debugging
   - Simplifica manutenção

3. **YAGNI**
   - Reduz complexidade desnecessária
   - Economiza tempo de desenvolvimento
   - Mantém o código enxuto e focado

## Conclusão

Seguir estes princípios ajuda a criar código mais limpo, manutenível e eficiente. Lembre-se:

- Se você está se repetindo, aplique DRY
- Se está muito complexo, aplique KISS
- Se está implementando algo "para o futuro", considere YAGNI
