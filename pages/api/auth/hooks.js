import { createUser } from 'utils/db'

module.exports = async (req, res) => {
  const { email, name, user_id, secret } = JSON.parse(req.body)

  if (secret === process.env.AUTH0_HOOK_SECRET) {
    try {
      console.log('creating user ' + name + ' with email ' + email)
      await createUser(name, email, user_id)
      res.send({ received: true })
    } catch (err) {
      console.log(err)
      res.send({ received: true })
    }
  } else {
    console.log('You forgot to send me your secret!')
    res.send('You forgot to send me your secret!')
  }
}