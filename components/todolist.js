import { createElement } from '../functions/dom.js';
import { cloneTemplate } from '../functions/dom.js';
/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {bool} completed
 */

export class TodoList {
  /** @type  {Todo[]}*/
  #todos = [];

  /** @type  {HTMLUListElement}*/
  #listElement = [];

  /**
   * @param {Todo[]} todos
   */
  constructor(todos) {
    this.#todos = todos;
  }
  /**
   * @param {HTMLElement} element
   */
  appendTo(element) {
    element.append(cloneTemplate('todolist-layout'));
    this.#listElement = element.querySelector('.list-group');
    for (let todo of this.#todos) {
      const t = new TodoListItem(todo);
      this.#listElement.append(t.element);
    }
    element
      .querySelector('form')
      .addEventListener('submit', (e) => this.#onSubmit(e));
    element.querySelectorAll('.btn-group button').forEach((button) => {
      button.addEventListener('click', (e) => this.#toggleFilter(e));
    });
  }

  /**
   * @param {SubmitEvent} e
   */
  #onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const title = new FormData(form).get('title').toString().trim();
    if (title === '') {
      return;
    }
    const todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    const item = new TodoListItem(todo);
    this.#listElement.prepend(item.element);
    form.reset();
  }

  /**
   * @param {PointerEvent} e
   */
  #toggleFilter(e) {
    e.preventDefault();
    const filter = e.currentTarget.getAttribute('data-filter');
    e.currentTarget.parentElement
      .querySelector('.active')
      .classList.remove('active');
    e.currentTarget.classList.add('active');
    if (filter === 'todo') {
      this.#listElement.classList.add('hide-completed');
      this.#listElement.classList.remove('hide-todo');
    } else if (filter === 'done') {
      this.#listElement.classList.add('hide-todo');
      this.#listElement.classList.remove('hide-completed');
    } else {
      this.#listElement.classList.remove('hide-todo');
      this.#listElement.classList.remove('hide-completed');
    }
  }
}

class TodoListItem {
  #element;
  #todo;
  /** @type {Todo} */
  constructor(todo) {
    this.#todo = todo;
    const id = `todo-${todo.id}`;
    const li = cloneTemplate('todolist-item').firstElementChild;
    this.#element = li;
    const checkbox = li.querySelector('input');
    checkbox.setAttribute('id', id);
    if (todo.completed) {
      checkbox.setAttribute('checked', '');
    }
    const label = li.querySelector('label');
    label.setAttribute('for', id);
    label.innerText = todo.title;
    const button = li.querySelector('button');
    button.innerHTML = '<i class="bi-trash"></i>';
    li.append(checkbox);
    li.append(label);
    li.append(button);
    this.toggle(checkbox);
    button.addEventListener('click', (e) => this.remove(e));
    checkbox.addEventListener('change', (e) => this.toggle(e.currentTarget));
  }
  /**
   * @param {HTMLElement} element
   */
  get element() {
    return this.#element;
  }
  /**
   * @param {PointEvent} e
   */
  remove(e) {
    e.preventDefault();
    this.#element.remove();
  }
  /**
   * Change état (à faire/fait) de la tâche
   * @param {HTMLInputElement} checkbox
   */
  toggle(checkbox) {
    if (checkbox.checked) {
      this.#element.classList.add('is-completed');
    } else {
      this.#element.classList.remove('is-completed');
    }
  }
}
