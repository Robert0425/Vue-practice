import { shallowMount, createLocalVue } from '@vue/test-utils';
import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import {equal} from 'assert';
import game from '../../src/views/Game.vue';

// describe('getlobby axios', () => {
//   it('just for a single spec', function (done) {
//     moxios.withMock(function () {
//       let onFulfilled = sinon.spy()
//       axios.get('http://lt.vir999.net/pt/mem/ajax/bb500/lobby?data=%5B%22game_info%22%5D&timestamp=1552370214906').then(onFulfilled)

//       moxios.wait(function () {
//         let request = moxios.requests.mostRecent()
//         request.respondWith({
//           status: 200,
//         }).then(function () {
//           equal(onFulfilled.called, true)
//           done()
//         })
//       })
//     })
//   })
// })

const $store = {
  state: {
    servertime: 12156561515,
    ret: {
      odds: {
        "START:RIGHT": 1.97,
        "START:LEFT": 1.97,
        "EVEN:END": 1.97,
        "ODD:END": 1.97,
        "4:STAIRS": 1.97,
        "3:STAIRS": 1.97,
        "3:EVEN": 3.94,
        "4:ODD": 3.94,
        "4:EVEN": 3.94,
        "3:ODD": 3.94
      }
    },
  },
  getters: {
    getGameCurrentInfo: ()=>({
      close_timestamp: 12156561515
    })
  }
}

const $route = {
  params: {
    id: 'LDRS'
  }
}

describe('game', () => {
  const wrapper = shallowMount(game, {
    data() {
      return {
        money: 5,
      }
    },
    methods: {
      getColor() {}
    },
    mocks: {
      $store,
      $route,
    },
  });
  const item1 = wrapper.find('#items button:nth-of-type(1)');
  const item2 = wrapper.find('#items button:nth-of-type(2)');
  const orderNum = wrapper.find('.orderNum');
  const addOrder = wrapper.find('#addOrder');
  const allNum = wrapper.find('.allNum');
  const clearAll = wrapper.find('#clear');
  const allMoney = wrapper.find('.allMoney');
  const gametime = wrapper.find('#gametime');

  it('test while select items orderNum is correct', () => {
    item1.trigger('click');
    expect(orderNum.html()).toContain('<div class="orderNum">投注數：1</div>');
    item2.trigger('click');
    expect(orderNum.html()).toContain('<div class="orderNum">投注數：2</div>');
    addOrder.trigger('click');
    expect(orderNum.html()).toContain('<div class="orderNum">投注數：0</div>');
    clearAll.trigger('click');
  });
  
  // it('test orderlist is correct', () => {
  //   item1.trigger('click');
  //   item2.trigger('click');
  //   addOrder.trigger('click');
  //   const orderList = wrapper.find('.orderList');
  //   expect(orderList.text()).toContain('投注項目：[ [ "START:RIGHT", "START:LEFT" ], [ 1.97, 1.97 ], 5 ]');
  //   clearAll.trigger('click');
  // });

  it('test while select items and delete item allNum is correct', () => {
    item1.trigger('click');
    item2.trigger('click');
    addOrder.trigger('click');
    expect(allNum.html()).toContain('<div class="allNum">總注數：2</div>');
    item1.trigger('click');
    addOrder.trigger('click');
    expect(allNum.html()).toContain('<div class="allNum">總注數：3</div>');
    const cancel1  =wrapper.find('.delete:nth-of-type(1)');
    cancel1.trigger('click');
    expect(allNum.html()).toContain('<div class="allNum">總注數：1</div>');
    clearAll.trigger('click');
    expect(allNum.html()).toContain('<div class="allNum">總注數：</div>');
  });

  it('test while click addOrder allMoney is correct', () => {
    item1.trigger('click');
    item2.trigger('click');
    addOrder.trigger('click');
    expect(allMoney.html()).toContain('<div class="allMoney">總下注金額：10</div>');
    item1.trigger('click');
    addOrder.trigger('click');
    expect(allMoney.html()).toContain('<div class="allMoney">總下注金額：15</div>');
    const cancel1  =wrapper.find('.delete:nth-of-type(1)');
    cancel1.trigger('click');
    expect(allMoney.html()).toContain('<div class="allMoney">總下注金額：5</div>');
    clearAll.trigger('click');
    expect(allMoney.html()).toContain('<div class="allMoney">總下注金額：</div>');
  });

  // it('test betting button is correct execute', () => {
  //   item1.trigger('click');
  //   item2.trigger('click');
  //   addOrder.trigger('click');
  //   const sendOrder = wrapper.find('#betting');
  //   sendOrder.trigger('click');
  //   expect(allNum.html()).toContain('<div class="allNum">總注數：</div>');
  //   expect(allMoney.html()).toContain('<div class="allMoney">總下注金額：</div>');
  // })

  // it('test time color', () => {
  //   expect(gametime.props().color).toEqual('red');
  // })
})

