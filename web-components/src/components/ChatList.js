const template = document.createElement('template');
template.innerHTML = `
    <style>
        .container {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        
        #header {
            display: flex;
            flex: 0 1 7%;
        }
        
        .chats {
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }
        .new-chat {
            position: absolute;
            bottom: 30px;
            right: 30px;
        }
    </style>
    <div class="container"> 
        <chat-list-header id="header"></chat-list-header>
        <div class="chats"></div>
        <div class="new-chat"><img src="/src/components/images/new-chat.png" height="70px" alt=""></div>
    </div>
`;

class ChatList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$chatsList = this._shadowRoot.querySelector('.chats');
    this.$header = this._shadowRoot.querySelector('chat-list-header');

    const data = ['Общество целых бокалов',
      'Дженнифер Эшли',
      'Антон Иванов',
      'Серёга (должен 2000)',
      'Общество разбитых бокалов',
      'Сэм с Нижнего',
      'Айрат работа',
      'Кеша армия',
      'Первый курс ФПМИ-Наука 2019-2020'];

    data.sort(this.compareTime);

    for (let i = data.length - 1; i >= 0; i -= 1) {
      if(localStorage.getItem(data[i]) === null) {
        let a = [];
        localStorage.setItem(data[i], JSON.stringify(a));
      }

      const currChat = document.createElement('one-chat');
      currChat.setAll(data[i]);

      this.$chatsList.insertBefore(currChat, this.$chatsList.firstChild);
    }

    this.$chats = this._shadowRoot.querySelectorAll('one-chat');
  }

  get header() {
    return this.$header;
  }

  get chats() {
    return this.$chats;
  }

  compareTime(a, b) {
    if(localStorage.getItem(a) === null) {
      if(localStorage.getItem(b) === null) {
        return 0;
      } else {
        return 1;
      }
    } else {
      if(localStorage.getItem(b) === null) {
        return -1;
      } else {
        let aLen = JSON.parse(localStorage.getItem(a)).length;
        let bLen = JSON.parse(localStorage.getItem(b)).length;
        if(aLen > bLen) {
          return -1;
        }
        if(aLen === bLen) {
          return 0;
        }
        if(aLen < bLen) {
          return 1;
        }
      }
    }
  }
}

customElements.define('chat-list', ChatList);
