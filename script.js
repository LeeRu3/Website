const mainMenuItems = [
    { label: 'Информация', page: 'information.html' },
    { label: 'Контакты', page: 'contacts.html' },
    { label: 'Скоро', page: 'soon.html' },
    { label: 'Скоро', page: 'soon.html' }
];

const subMenuItems = {
    'Старые работы': [
        { label: 'Старая работа 1', page: 'old_work1.html' },
        { label: 'Старая работа 2', page: 'old_work2.html' },
    ],
    'Новые работы': [
        { label: 'Новая работа 1', page: 'new_work1.html' },
        { label: 'Новая работа 2', page: 'new_work2.html' },
    ]
};

const menu = document.getElementById('menu');

mainMenuItems.forEach(item => {
    const menuItem = document.createElement('a');
    menuItem.textContent = item.label;
    menuItem.href = '#';
    menuItem.classList.add('menu-item');
    menuItem.addEventListener('click', async (event) => {
        event.preventDefault();
        await loadPage(item.page);
    });
    menu.appendChild(menuItem);
});

async function loadPage(page) {
    try {
        const response = await fetch(page);
        if (!response.ok) {
            throw new Error('Ошибка загрузки страницы');
        }
        const html = await response.text();
        document.getElementById('content').innerHTML = html;
        document.getElementById('content').classList.add('fade-in');
    } catch (error) {
        console.error(error);
    }
}

const subMenu = document.createElement('ul');

for (const category in subMenuItems) {
    const categoryItem = document.createElement('li');
    categoryItem.textContent = category;
    categoryItem.classList.add('sub-menu-category');

    const subMenuList = document.createElement('ul');
    subMenuItems[category].forEach(subItem => {
        const subMenuItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = subItem.label;
        link.href = '#';
        link.classList.add('sub-menu-item');
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            await loadPage(subItem.page);
        });
        subMenuItem.appendChild(link);
        subMenuList.appendChild(subMenuItem);
    });

    categoryItem.appendChild(subMenuList);
    subMenu.appendChild(categoryItem);
}

menu.appendChild(subMenu);
