const express = require('express');
const { DateTime } = require('luxon');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const { promisify } = require('util');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/info', async (req, res) => {
  try {
    const slackName = req.query.slackName;
    const track = req.query.track;

    const currentDayOfWeek = DateTime.utc().toFormat('cccc');
    const utcNow = DateTime.utc();
    const isValidUtc = Math.abs(utcNow.diffNow('hours').hours) <= 2;

    if (!isValidUtc) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'UTC time is not within +/-2 hours.' });
    }

    const codeFileUrl = 'https://github.com/Tope-stack/HngXTask1/blob/master/Controllers/InfoController.cs';
    const sourceCodeUrl = 'https://github.com/Tope-stack/HngXTask1';

    const response = {
      SlackName: slackName,
      DayOfWeek: currentDayOfWeek,
      UTCTime: utcNow.toISO(),
      Track: track,
      CodeFileUrl: codeFileUrl,
      SourceCodeUrl: sourceCodeUrl,
    };

    return res.status(HttpStatus.OK).json(response);
  } catch (ex) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: ex.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});