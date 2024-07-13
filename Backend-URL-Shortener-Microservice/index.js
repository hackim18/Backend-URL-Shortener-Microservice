require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ optionsSuccessStatus: 200 }));

try {
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  console.log(err);
}

const schema = new mongoose.Schema({
  original: { type: String, required: true },
  short: { type: Number, required: true },
});
const Url = mongoose.model("Url", schema);

app.use("/public", express.static(__dirname + "/public/"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/shorturl", async (req, res) => {
  const bodyUrl = req.body.url;
  let urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/);
  if (!bodyUrl.match(urlRegex)) {
    return res.json({ error: "Invalid URL" });
  }

  dns.lookup(new URL(bodyUrl).hostname, async (err) => {
    if (err) {
      return res.json({ error: "Invalid URL" });
    }

    try {
      let index = 1;
      const latestUrl = await Url.findOne({}).sort({ short: "desc" }).exec();
      if (latestUrl) {
        index = latestUrl.short + 1;
      }

      const newUrl = new Url({ original: bodyUrl, short: index });
      await newUrl.save();

      res.json({ original_url: bodyUrl, short_url: index });
    } catch (error) {
      console.error("Error saving URL:", error);
      res.json({ error: "Error saving URL" });
    }
  });
});

app.get("/api/shorturl/:short_url", async (req, res) => {
  const shortUrl = req.params.short_url;

  try {
    const shortUrlNumber = parseInt(shortUrl);
    const url = await Url.findOne({ short: shortUrlNumber }).exec();

    if (!url) {
      return res.json({ error: "URL NOT FOUND" });
    }

    res.redirect(url.original);
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.json({ error: "Error retrieving URL" });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + this.address().port);
});
