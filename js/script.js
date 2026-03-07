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



(function() {
  document.body.style.overflow = 'hidden';
  const targetStr = "ЭтоНiЯ";
  const symbolsCount = targetStr.length;
  const randomChars = ["Х", "о", "х", "л", "ы", "?"];
  
  const container = document.getElementById('symbolsContainer');
  const spans = [];

  for (let i = 0; i < symbolsCount; i++) {
    const span = document.createElement('span');
    span.className = 'symbol';
    span.textContent = randomChars[i % randomChars.length];
    container.appendChild(span);
    spans.push(span);
  }

  const STEP_INTERVAL = 500; 
  const SHAKE_DURATION = 200; 

  for (let i = 0; i < symbolsCount; i++) {
    setTimeout(() => {
      const span = spans[i];
      span.classList.add('shaking');

      setTimeout(() => {
        span.classList.remove('shaking');
        span.textContent = targetStr[i];
        span.classList.add('final');
      }, SHAKE_DURATION);
    }, i * STEP_INTERVAL);
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        const content = document.querySelector('.content');

      if (preloader) {
        preloader.classList.add('hidden');
      }
      if (content) {
        content.classList.add('visible');
      }
    document.body.style.overflow = '';

    }, 3000);
  });
})();
