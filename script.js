document.addEventListener('DOMContentLoaded', () => {
    const notifyBtn = document.getElementById('notifyBtn');
    const container = document.getElementById('notification-container');

    // Tenta solicitar permissão para notificações nativas ao carregar
    if ("Notification" in window) {
        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    }

    notifyBtn.addEventListener('click', () => {
        // 1. Mostrar notificação customizada (Toast)
        createToast("Sucesso!", "Sua notificação foi gerada com sucesso.");

        // 2. Tentar mostrar notificação nativa do navegador
        showNativeNotification();
    });

    function createToast(title, message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        toast.innerHTML = `
            <div class="toast-icon">✨</div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <div class="toast-progress"></div>
        `;

        container.appendChild(toast);

        // Remover após 4 segundos (tempo da animação da barra de progresso)
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }

    function showNativeNotification() {
        if (!("Notification" in window)) {
            console.log("Este navegador não suporta notificações de desktop");
            return;
        }

        if (Notification.permission === "granted") {
            new Notification("NotifyMe", {
                body: "Você clicou no botão e gerou esta notificação!",
                icon: "https://cdn-icons-png.flaticon.com/512/3119/3119338.png" // Ícone genérico de sino
            });
        }
    }
});
