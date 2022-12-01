var app = new Vue({
  el: '#app',
  data: {
    databases: []
  }
})

function loadSamples() {
  app.databases = ENV.generateData().toArray();
  window.Monitoring?.ping();
  setTimeout(loadSamples, ENV.timeout);
}

loadSamples()