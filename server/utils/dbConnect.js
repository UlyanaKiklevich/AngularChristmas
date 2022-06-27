const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require("bcrypt");

const dbConnect = async () => {
  const client = new MongoClient(
    "",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    }
  )

  await client.connect()

  const loadPeople = async () => {
    const collection = await client.db("christmas").collection("people");

    return await collection.find({}).toArray()
  }

  const login = async ({ name, password }) => {
    const collection = await client.db("christmas").collection("people");
    const user = await collection.find({
      name
    }).toArray()

    if (user?.[0] && await comparePassword(password, user[0].password)) {
      return user[0]
    }

    return null
  }

  const encryptPassword = async password => {
    const SALT = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, SALT)
  }

  const comparePassword = async (dbPass, localPass) => await bcrypt.compare(dbPass, localPass)

  return {
    loadPeople,
    login
  }
}

module.exports = dbConnect

