;(function () {
   var KEY = 'swagger_bearer_token'
   function init() {
      try {
         var system = window.ui && window.ui.getSystem && window.ui.getSystem()
         var authActions = system && system.authActions
         if (!authActions) return
         var origAuthorize = authActions.authorize
         authActions.authorize = function (payload) {
            try {
               if (payload && payload.bearerAuth && payload.bearerAuth.value) {
                  var token = payload.bearerAuth.value
                  localStorage.setItem(KEY, token)
               }
            } catch (e) {}
            return origAuthorize(payload)
         }
         // Auto-authorize from stored token
         var stored = localStorage.getItem(KEY)
         if (stored) {
            try {
               authActions.authorize({
                  bearerAuth: {
                     name: 'bearerAuth',
                     schema: { type: 'http', scheme: 'bearer' },
                     value: stored,
                  },
               })
            } catch (e) {}
         }
      } catch (e) {}
   }
   var t = setInterval(function () {
      if (
         window.ui &&
         window.ui.getSystem &&
         window.ui.getSystem().authActions
      ) {
         clearInterval(t)
         init()
      }
   }, 300)
})()
