import { shallowMount, createLocalVue } from '@vue/test-utils';
import add from '../../src/views/Addition.vue';
import minus from '../../src/views/Minus.vue';
import mul from '../../src/views/Mul.vue';
import Div from '../../src/views/Divided.vue';
import time from '../../src/views/timer.vue';
import router from '@/router';
import sinon from 'sinon';

describe('add', () => {
  it('test addition', () => {
    const wrapper = shallowMount(add, {
      data() {
        return {
          num1: 1,
          num2: 2,
        };
      },
    });
    expect(wrapper.text()).toBe('+  3');
  });
});

describe('minus', () => {
  it('test minus', () => {
    const wrapper = shallowMount(minus, {
      data() {
        return {
          num1: 5,
          num2: 2,
        };
      },
    });
    expect(wrapper.text()).toBe('-  3');
  });
});

describe('mul', () => {
  it('test mul', () => {
    const wrapper = shallowMount(mul, {
      data() {
        return {
          num1: 2,
          num2: 2,
        };
      },
    });
    expect(wrapper.text()).toBe('*  4');
  });
});

describe('Div', () => {
  it('test Div', () => {
    const wrapper = shallowMount(Div, {
      data() {
        return {
          num1: 4.88,
          num2: 2.44,
        };
      },
    });
    expect(wrapper.text()).toBe('/  2');
  });
});

describe('time', () => {

  it('test timer', () => {
    const clock = sinon.useFakeTimers();
      const wrapper: any  = shallowMount(time, {
    data() {
      return{
        second: 3
      };
    },
  });
    const button = wrapper.find('button');
    const sec :any = wrapper.find('h1');
    button.trigger('click');
    expect(wrapper.text()).toContain("倒數3秒");
    clock.tick(1000);
    expect(wrapper.text()).toContain("倒數2秒");
    clock.tick(1000);
    expect(wrapper.text()).toContain("倒數1秒");
    clock.tick(1000);
    expect(wrapper.text()).toContain("倒數0秒");
    clock.restore();
    // const input: any = wrapper.find('.sec');
    // button.trigger('click');
    // expect(input.element.value).toBe("5");
    // clock.tick(1000);
    // expect(input.element.value).toBe("4");
  })
})
