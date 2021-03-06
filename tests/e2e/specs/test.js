// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Hello Vue CLI')
      // .assert.elementCount('img', 1)
      // test computed
      .click('#computed')
      .pause(1000)
      .assert.urlContains('http://localhost:8080/computed')
      // test add
      .click('#add')
      .pause(1000)
      .assert.urlContains('http://localhost:8080/computed/addition')
      .setValue('#num1', 2)
      .setValue('#num2', 1)
      .assert.containsText('p', 3)
      // .getValue('p', function (result) {
      //   this.assert.equal(result.value, 3);
      // })
      // test minus
      .url('http://localhost:8080/computed')
      .click('#minus')
      .pause(1000)
      .assert.urlContains('http://localhost:8080/computed/minus')
      .setValue('#num1', 2)
      .setValue('#num2', 1)
      .assert.containsText('p', 1)
      // test mul
      .url('http://localhost:8080/computed')
      .click('#mul')
      .pause(1000)
      .assert.urlContains('http://localhost:8080/computed/mul')
      .setValue('#num1', 3)
      .setValue('#num2', 4)
      .assert.containsText('p', 12)
      // test divided
      .url('http://localhost:8080/computed')
      .click('#divided')
      .pause(1000)
      .assert.urlContains('http://localhost:8080/computed/divided')
      .setValue('#num1', 4.88)
      .setValue('#num2', 2.44)
      .assert.containsText('p', 2)
      // test link to :id
      .url('http://localhost:8080/lobby')
      .setValue('#link', 123)
      .click('#go')
      .pause(1000)
      .assert.urlContains('http://localhost:8080/123/panel')
      .waitForElementVisible('.panel', 1000)
      .assert.containsText('h1', 'Hello 123')
      // test timer
      .url('http://localhost:8080/lobby')
      .click('#timer')
      .pause(1000)
      .assert.urlContains('http://localhost:8080/timer')
      .setValue('#sec', 3)
      .click('#start')
      .pause(1000)
      // .getValue('#sec', function (result) {
      //   this.assert.equal(result.value, 0);
      // })
      .assert.containsText('.countdown', '倒數00分03秒')
      .pause(1000)
      .assert.containsText('.countdown', '倒數00分02秒')
      .pause(1000)
      .assert.containsText('.countdown', '倒數00分01秒')
      .url('http://localhost:8080/lobby')
      //  // test lobby
      // .click('#home')
      // .pause(1000)
      // .url('http://rd2local.vir999.net:4000/')
      // .waitForElementVisible('.cards', 5000)
      // .assert.elementCount('ul li', 5)
      // .click('button:nth-of-type(13)')
      // .url('http://rd2local.vir999.net:/)
      // .assert.elementCount('#items button', 10)
      // .expect.element('#items > *:nth-child(10)').to.be.present
      // .assert.containsText('.gameName', 'LDRS')
      // .getAttribute('//*[@id="items"]/button[1]', 'class', function(result) {
      //   this.assert.equal(result.value, 'active')
      //  })
      // .setValue('#money', 5)
      // .click('#addOrder')
      // .acceptAlert()
      // .click('#items button')
      .end();
  },
};
