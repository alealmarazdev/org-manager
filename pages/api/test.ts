import db from '../../utils/db'

db.connect()

export default async (req, res) => {
    res.json({test: 'test'})
}