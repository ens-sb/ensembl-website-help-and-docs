const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const { getOneDocument } = require('../scripts/getFromDatabase');
const databasePath = 'build/database.db';

const getOne = async (req, res) => {
  const filePath = req.query.file;
  if (!filePath) {
    res.status(400);
    return res.json({
      error: 'File parameter cannot be empty'
    });
  }

  try {
    const db = await sqlite.open({
      filename: getDbPath(),
      driver: sqlite3.Database
    });
    const match = await getOneDocument(db, filePath);

    if (match) {
      res.json({
        body: match.body,
        data: match.data,
        query: req.query
      });
    } else {
      res.status(404);
      res.json({
        error: `File ${filePath} not found`
      });
    }
    await db.close();
  } catch (error) {
    console.error('Error finding the document', error);
    res.status(500);
    res.json({
      error: 'There was an error processing your request'
    })
  }
};
