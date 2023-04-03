const express = require('express')

const app = express()

const port = 

app.set('view engine', 'ejs')
app.set('views', './templates/views')

const currentUser = {
    loggedIn: false
}

const protectedRoutes = [
    '/about',
    '/contact'
]

app.use((req, res, next) => {
    console.log(`Request made to ${req.path} at ${new Date()}`)

    if (!currentUser.loggedIn) {
        if (protectedRoutes.includes(req.path)) {
            return res.redirect('/')
        }
    }
    next()
})

app.get('/', (req, res) => {
    console.log('this is home page')
    res.render('home')
})

app.get('/about', (req, res) => {
    res.send('About Page')
})
app.get('/blog', (req, res) => {
    res.send('Blog Page')
})
app.get('/contact', (req, res) => {
    res.send('Contact Page')
})
app.get('/users', (req, res) => {
    res.send(users)
})



app.get('/user/:id', (req, res) => {
    const id = req.params.id

    for (const user of users) {
        if (user.id === id) {
            return req.send(user)
        }
    }
    res.status(404).send('404 Not Found')
})

app.get('/users/:id/:key', (req, res) => {
    const id = req.params.id
    const key = req.params.key

    const user = searchUser(id)

    if (user) {
        const value = user[key]

        if (value) {
            return res.send(value)
        } else {
            return res.status(404).send(`Key ${key} not found for user ${user.username}`)
        }
    }
})

app.listen(port, () => {
    console.log('listening on port ${port}')

})