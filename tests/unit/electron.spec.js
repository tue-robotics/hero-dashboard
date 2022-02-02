import testWithSpectron from 'vue-cli-plugin-electron-builder/lib/testWithSpectron'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
// eslint-disable-next-line no-undef
const spectron = __non_webpack_require__('spectron')

chai.should()
chai.use(chaiAsPromised)

describe('Application launch', function () {
  this.timeout(60000)

  before(function () {
    return testWithSpectron(spectron, { spectronOptions: { args: ['dist_electron', 'random_host.local'] } }).then((instance) => {
      this.app = instance.app
      this.stopServe = instance.stopServe
    })
  })

  before(function () {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness
  })

  after(function () {
    if (this.app && this.app.isRunning()) {
      return this.stopServe()
    }
  })

  it('Window count is one', function () {
    return this.app.client.getWindowCount().should.eventually.be.equal(1)
  })

  it('Window is not minimized', function () {
    return this.app.client.browserWindow.isMinimized().should.eventually.be.false
  })

  it('Window is visible', function () {
    return this.app.client.browserWindow.isVisible().should.eventually.be.true
  })

  it('Window bounds are correct', function () {
    return this.app.client.browserWindow.getBounds().should.eventually.include({ width: 375, height: 60 })
  })

  it('Window title is correct', function () {
    return this.app.client.browserWindow.getTitle().should.eventually.be.equal('hero-dashboard')
  })

  it('Argument passing works', function () {
    return this.app.mainProcess.argv().should.eventually.include('random_host.local')
  })
})
