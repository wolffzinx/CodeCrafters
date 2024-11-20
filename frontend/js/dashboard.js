// Função para verificar se o usuário é professor ou aluno
async function checkUserRole() {
    // Aqui você deve implementar uma chamada à API para verificar o usuário logado
    // Simulando que o usuário é professor para testes
    const role = 'teacher'; // Alterar para 'student' para simular aluno

    if (role === 'teacher') {
        document.getElementById('teacherSection').style.display = 'block';
        loadClasses(); // Carregar salas do professor
    } else {
        document.getElementById('studentSection').style.display = 'block';
        loadJoinedClasses(); // Carregar salas que o aluno está participando
    }
}

// Carregar salas do professor
async function loadClasses() {
    const response = await fetch('http://localhost:5000/api/class', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token // Use o token de autenticação
        }
    });
    const classes = await response.json();
    const classList = document.getElementById('classList');
    classList.innerHTML = '';

    classes.forEach(c => {
        const div = document.createElement('div');
        div.innerHTML = `<p>${c.subject} (Código: ${c.code})</p>`;
        classList.appendChild(div);
    });
}

// Criar uma nova sala
document.getElementById('createClassForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const code = document.getElementById('classCode').value;
    const subject = document.getElementById('subject').value;
    const questionsText = document.getElementById('questions').value;
    const questions = questionsText.split('\n').map(q => ({
        questionText: q,
        options: [], // Inicialmente, sem opções
        correctAnswer: '' // Inicialmente, sem resposta correta
    }));

    const response = await fetch('http://localhost:5000/api/class/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Use o token de autenticação
        },
        body: JSON.stringify({ code, subject, questions }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Sala criada com sucesso!');
        document.getElementById('createClassForm').reset();
        loadClasses(); // Atualiza a lista de classes
    } else {
        alert(data.message);
    }
});

// Entrar na sala
document.getElementById('joinClassButton').addEventListener('click', async () => {
    const code = document.getElementById('joinClassCode').value;

    const response = await fetch(`http://localhost:5000/api/class/${code}`, {
        method: 'GET',
    });

    if (response.ok) {
        const classData = await response.json();
        alert(`Você entrou na sala: ${classData.subject}`);
        // Aqui você pode redirecionar o aluno para o quiz ou atividade
    } else {
        alert('Código da sala inválido.');
    }
});

// Inicia a verificação do usuário
checkUserRole();

