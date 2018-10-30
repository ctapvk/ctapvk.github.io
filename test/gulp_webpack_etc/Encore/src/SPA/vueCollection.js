/**
 Модуль для автоматической инициализации Vue компонентов на странице сайта
 Загружает компоненты в соответствующие элементы на странице и передает в них данные
 Например вместо блока:
 <div class="vue-component" data-component="DemoApp" data-initial='{"test": "data"}'></div>
 Будет подключен компонент DemoApp (если тот присутствует в объекте-коллекции `components`)
 и в его свойство initial будет передан JSON-объект {"test": "data"}
 */

import Vue from 'vue';
// import KabinetRouter from '../vue/router/kabinet';


export default {
  init(components, options) {

    this.options = Object.assign(this.options, options);

    const nodes = Array.from(document.querySelectorAll(this.options.selector));

    const collection = {};

    nodes.forEach((item) => {
      let initialData = item.dataset[this.options.initialDataAttr];

      if (initialData !== undefined) {
        try {
          initialData = JSON.parse(initialData);
        } catch (e) {
          logger.warn(e);
        }
      }

      if (components[item.dataset[this.options.componentDataAttr]] !==
          undefined) {
        collection[item.dataset.component] = this.createComponentInstance(
            item,
            components[item.dataset[this.options.componentDataAttr]],
            initialData,
        );
      }
    });

    return collection;
  },

  options: {
    selector: '.vue-component',
    componentDataAttr: 'component',
    initialDataAttr: 'initial',
  },

  createComponentInstance(element, component, data) {
    const args = {
      store,
      router: KabinetRouter,
      el: element,
      render(h) {
        return h(component, {
          props: {initial: data},
        });
      },
    };

    return new Vue(args);
  },
};
