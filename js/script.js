document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initCopyLinks();
    initModal();
});

function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            const content = accordionItem.querySelector('.accordion-content');
            const isActive = this.classList.contains('active');

            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('show'));

            if (!isActive) {
                this.classList.add('active');
                content.classList.add('show');
            }
        });
    });
}

function initCopyLinks() {
    document.querySelectorAll('.link-item').forEach(item => {
        item.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            copyToClipboard(textToCopy);

            const originalBg = this.style.backgroundColor;
            this.style.backgroundColor = 'rgba(255, 165, 0, 0.2)';

            setTimeout(() => {
                this.style.backgroundColor = originalBg;
            }, 300);
        });
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showNotification())
        .catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification();
        });
}

function showNotification() {
    const notification = document.querySelector('.copy-notification');
    
    // Проверяем, существует ли элемент уведомления
    if (!notification) {
        console.warn('Элемент .copy-notification не найден на странице');
        return;
    }
    
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function initModal() {
    const openButton = document.querySelector('.open-btn');
    const closeButton = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');

    // Проверяем, существуют ли все элементы модального окна
    if (!openButton || !closeButton || !overlay || !modal) {
        console.warn('Не все элементы модального окна найдены');
        return;
    }

    function openModal() {
        overlay.style.display = 'block';
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.style.display = 'none';
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    openButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', event => {
        if ((event.key === 'Escape' || event.key === 'Esc') && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// Находим все элементы, которые хотим анимировать
const elements = document.querySelectorAll('.fade-in');

// Создаём наблюдатель Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Если элемент появился в области видимости
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Можно отключить наблюдение после первого появления, чтобы не тратить ресурсы
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2 // Элемент считается видимым, когда 20% его показалось в окне
});

// Начинаем наблюдать за каждым элементом
elements.forEach(el => observer.observe(el));