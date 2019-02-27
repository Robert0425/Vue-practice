import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

  // it('test increment', () => {
  //   const wrapper = shallowMount(HelloWorld);
  //   const vm = wrapper.vm;
  //   wrapper.find('button').trigger('click');
  //   expect(wrapper.vm.count).toBe(1);
  // });
});
