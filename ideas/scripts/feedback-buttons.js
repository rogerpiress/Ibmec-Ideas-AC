document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões de navegação e o link da logo
    const navButtons = document.querySelectorAll('.feedback-nav-btn');
    const logoLink = document.querySelector('.feedback-header-content div a');

    // Adiciona eventos para a logo
    if (logoLink) {
        logoLink.addEventListener('mouseenter', function() {
            const logoImg = this.querySelector('img');
            if (logoImg) {
                logoImg.style.transform = 'scale(1.1)';
                logoImg.style.transition = 'transform 0.3s ease';
            }
        });

        logoLink.addEventListener('mouseleave', function() {
            const logoImg = this.querySelector('img');
            if (logoImg) {
                logoImg.style.transform = 'scale(1)';
            }
        });

        logoLink.addEventListener('click', function() {
            const logoImg = this.querySelector('img');
            if (logoImg) {
                logoImg.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    logoImg.style.transform = 'scale(1)';
                }, 150);
            }
        });
    }

    // Adiciona evento de hover em cada botão
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Adiciona efeito de clique
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});