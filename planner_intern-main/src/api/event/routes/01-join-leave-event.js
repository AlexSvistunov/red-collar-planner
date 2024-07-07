module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/events/:id/join', 
      handler: 'event.join',
        config: {
        policies: ['global::is-auth']
      }
    },    
    {
      method: 'POST',
      path: '/events/:id/leave', 
      handler: 'event.leave',
        config: {
        policies: ['global::is-auth']
      }
    },
  ]
}
