// Aguarde o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Função para o registro de usuário
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            const profilePicture = document.getElementById('profilePicture').value;

            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role, profilePicture }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuário registrado com sucesso!');
                // Redirecionar para a página de login
                window.location.href = 'login.html';
            } else {
                alert(data.message);
            }
        });
    }

    // Função para o login de usuário
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Verifica o papel do usuário e redireciona para a página correta
                if (data.role === 'student') {
                    window.location.href = 'student_dashboard.html'; // Página do aluno
                } else if (data.role === 'teacher') {
                    window.location.href = 'teacher_dashboard.html'; // Página do professor
                }
            } else {
                alert(data.message);
            }
        });
    } else {
        console.error('Elemento loginForm não encontrado!');
    }
});
