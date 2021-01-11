function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

     const tabs = document.querySelectorAll(tabsSelector);
     const tabsContent = document.querySelectorAll(tabsContentSelector);
     const tabsParent = document.querySelector(tabsParentSelector);
 
     function hideTabContent() {
         tabsContent.forEach(item => { //убираем все табы со страницы
             // item.style.display = 'none';
             item.classList.add('hide');
             item.classList.remove('show');
         });
 
         tabs.forEach(item => { //удаляем класс активного таба
             item.classList.remove(activeClass);
         });
     }
 
     function showTabContent(i = 0) { //делаем элемент видимым
         // tabsContent[i].style.display = 'block';
         tabsContent[i].classList.add('show');
         tabsContent[i].classList.remove('hide');
         tabs[i].classList.add(activeClass);
     }
 
     hideTabContent();
     showTabContent(); //по умолчанию делаем активным первый элемент
 
     tabsParent.addEventListener('click', (event) => {
         const target = event.target;
 
         if (target && target.classList.contains(tabsSelector.slice(1))) {
             tabs.forEach((item, index) => {
                 if (target == item) { //если кликнутый элемент совпадает с элементом который перебираем
                     hideTabContent();
                     showTabContent(index);
                 }
             });
         }
     });
}

export default tabs;