# [Building a Wiki With React and Firebase][published url]

React is a powerful and performant JavaScript library. For databse storage application use: Firebase. 

Live demo: [https://wicker-react.herokuapp.com/](https://wicker-react.herokuapp.com/)

### System variables
- `FIREBASE_URL` - reference to Firebase external url.
- `EXPRESS_SESSION_SECRET` - application session secret phrase.

### Build process 

Application using [browserify][browserify] and [babel][babel].

Build commands are: 

```bash
# Run browserify and babelify to transform javasript from es2015, react to ecmascript 5.
npm run build
```

```bash
# Tracking changes for src folder
# src folder store react components.
npm run build:watch
```

------

Thank you very much at [Andrew Burgess][instructor url] for instructor notes. 
Location of course materials: [tutsplus][published url]

[published url]: https://code.tutsplus.com/courses/building-a-wiki-with-react-and-firebase
[instructor url]: https://tutsplus.com/authors/andrew-burgess
[browserify]: http://browserify.org/
[babel]: http://babeljs.io/
