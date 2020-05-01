const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const http = require("http");
const fetch = require("node-fetch");

const port = process.env.PORT || 3128;

const server = http.createServer();

server.listen(port, (err) => {
  if (err) console.error("❌ Unable to connect the server: ", err);
  console.log(`🌍 Server listening on port ${port}`);

  cron.schedule("*/2 * * * *", function () {
    console.log("cron start");
    fetch(`https://aria-backend.glitch.me/news`, {
      method: "post",
      body: {
        country: "us",
        apikey: "c25630fff8c941ac8868742515690503",
      },
      headers: { "Content-Type": "application/json" },
    }).then(async function (response) {
      const result = await response.json();
      console.log(response);
    });
    console.log("cron end");
  });
});
