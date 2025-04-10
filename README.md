# ErrorSquad Server - Backend do Sistema de Horários Acadêmicos
<div align="center">
  <h1>
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=30&duration=3000&pause=1000&color=4A90E2&center=true&vCenter=true&repeat=true&width=1000&lines=Interface+Web+de+Hor%C3%A1rios+Acad%C3%AAmicos+%7C+Backend+%F0%9F%92%BB" alt="Typing SVG" />

  <div align="center">
    <a href="https://www.cps.sp.gov.br/">
      <img src="https://github.com/ErrorSquad-ABP/ErrorSquad-Assets1/blob/main/Images/CPS-removebg-preview.png" height="90" alt="Logo CPS"/>
    </a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://fatecjacarei.cps.sp.gov.br/">
      <img src="https://github.com/ErrorSquad-ABP/ErrorSquad-Assets1/blob/main/Images/Fatec-removebg-preview.png" height="90" alt="Logo Fatec"/>
    </a>
  </div>
  
  <br>
  
  <div>
    <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-FF6B6B?style=for-the-badge&logo=clockify&logoColor=white"/>
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
    <img src="https://img.shields.io/badge/version-1.0.0-6C5CE7?style=for-the-badge"/>
    <img src="https://img.shields.io/badge/license-MIT-00B894?style=for-the-badge"/>
  </div>

  <br>
  
  <p align="center">
    <!-- Navegação removida para simplificar o visual -->
  </p>
</div>

## 📝 Descrição

Backend do sistema de gestão de horários acadêmicos da FATEC Jacareí, desenvolvido pela equipe Error Squad. O projeto visa automatizar o processo de divulgação e consulta de horários de aulas, substituindo o sistema manual atual por uma solução digital integrada.

### 🎯 Objetivo
Automatizar e otimizar o processo de gestão de horários acadêmicos, reduzindo erros manuais e melhorando a eficiência operacional.

### 💡 Principais Funcionalidades
- Gestão completa de cursos e horários
- API RESTful para integração com frontend
- Validação automática de conflitos
- Sistema de logs para auditoria

## 🏗️ Arquitetura

```plaintext
src/
├── controllers/    # Controladores da aplicação
├── database/      # Configuração e modelos do banco
├── lib/           # Bibliotecas e utilitários
├── routes/        # Definição de rotas
├── services/      # Lógica de negócios
├── utils/         # Funções auxiliares
└── config/        # Configurações do sistema
```

### 🔄 Fluxo de Dados
1. Requisição HTTP → Routes
2. Routes → Controllers
3. Controllers → Services
4. Services → Database
5. Database → Response

## 🛠️ Tecnologias

### Core
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **PostgreSQL**: Banco de dados relacional
- **Google BigQuery**: Analytics e relatórios

### Desenvolvimento
- **Git**: Controle de versão
- **npm**: Gerenciador de pacotes

## ⚙️ Instalação

### Pré-requisitos
- Node.js >= 14.x
- PostgreSQL >= 12
- npm >= 6.x

### Configuração
1. Clone o repositório:
```bash
git clone https://github.com/ErrorSquad-ABP/ErrorSquad-Server.git
cd ErrorSquad-Server
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=errorsquad
```

4. Inicie o servidor:
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🔌 API

### Endpoints Principais

#### Cursos
- `GET /cursos` - Lista todos os cursos
- `POST /cursos` - Cria novo curso
- `PUT /cursos/:id` - Atualiza curso
- `DELETE /cursos/:id` - Remove curso

#### Usuários
- `GET /users` - Lista todos os usuários
- `POST /users` - Cria novo usuário

#### Health Check
- `GET /health` - Status do servidor

### Exemplos de Uso

#### Criar um novo curso
```bash
curl -X POST http://localhost:3000/cursos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Análise e Desenvolvimento de Sistemas"}'
```

#### Listar todos os cursos
```bash
curl http://localhost:3000/cursos
```

## 🤝 Contribuição

### Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Siga o estilo de código existente
- Mantenha as funções pequenas e focadas
- Adicione comentários explicativos quando necessário
- Atualize a documentação quando necessário

## 👥 Equipe

<div align="center">
    <table>
        <tr>
            <td align="center"><b>Gestão</b></td>
            <td align="center"><b>Desenvolvimento</b></td>
        </tr>
        <tr>
            <td align="center">
                <table>
                    <tr>
                        <td align="center">
                            <b>Tiago Jardel Costa</b><br>
                            <i>Product Owner</i><br>
                            <a href="https://github.com/Tiago199516">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/tiago-jardel-da-costa-0b595bba/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <b>Arthur Facchinetti Peixoto</b><br>
                            <i>Scrum Master</i><br>
                            <a href="https://github.com/ArthurFacchinetti">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/arthur-facchinetti-peixoto/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
            <td align="center">
                <table>
                    <tr>
                        <td align="center">
                            <b>João Victor Lopes Rosa</b><br>
                            <a href="https://github.com/JV-L0pes">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/arthur-facchinetti-peixoto/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                        <td align="center">
                            <b>Alícia Silva Dias</b><br>
                            <a href="https://github.com/TIALICIA">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/alícia-silva-dias/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <b>Leonardo da Silva Irineu</b><br>
                            <a href="https://github.com/Leo-Slv">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/leonardo-irineu-8418b0288/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                        <td align="center">
                            <b>Felipe Ferreira Pacheco</b><br>
                            <a href="https://github.com/FelipePacheco30">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/felipe-ferreira-pacheco-621443347/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <b>Carlos Eduardo Espirito Santo</b><br>
                            <a href="https://github.com/PromptdComando">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/carlos-eduardo-espirito-santo/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                        <td align="center">
                            <b>Caio Araujo</b><br>
                            <a href="https://github.com/Caiuuutecnologico">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/caio-arauj/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>

## 👨‍🏫 Focal Point

<div align="center">
    <table>
        <tr>
            <td align="center">
                <table>
                    <tr>
                        <td align="center">
                            <b>Prof. Marcelo Sudo</b><br>
                            <i>Focal Point</i><br>
                            <a href="https://github.com/marcelosudo">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/marcelo-sudo/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

<div align="center">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=4a90e2&height=100&section=footer" width="100%"/>
</div>

