import { createElement } from './functions/dom.js';
import { TodoList } from './components/todolist.js';

try {
  const todos = [
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
    },
    {
      userId: 1,
      id: 4,
      title: 'et porro tempora',
      completed: true,
    },
    {
      userId: 1,
      id: 5,
      title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
      completed: false,
    },
  ];
  const list = new TodoList(todos);
  list.appendTo(document.querySelector('#todolist'));
} catch (e) {
  debugger;
  const alertElement = createElement('div', {
    class: 'alert alert-danger m-2',
    role: 'alert',
  });
  alertElement.innerText = 'Impossible de charger les éléments';
  document.body.prepend(alertElement);
}
