(function () {
  "use strict";

  var GTA6_LAUNCH = Date.UTC(2026, 10, 19, 0, 0, 0);

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function sinceLaunch(nowMs) {
    var start = new Date(GTA6_LAUNCH);
    var end = new Date(nowMs);

    if (end.getTime() < start.getTime()) {
      return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    var years = end.getUTCFullYear() - start.getUTCFullYear();
    var anniversary = Date.UTC(
      start.getUTCFullYear() + years,
      start.getUTCMonth(),
      start.getUTCDate(),
      start.getUTCHours(),
      start.getUTCMinutes(),
      start.getUTCSeconds()
    );

    if (anniversary > end.getTime()) {
      years -= 1;
      anniversary = Date.UTC(
        start.getUTCFullYear() + years,
        start.getUTCMonth(),
        start.getUTCDate(),
        start.getUTCHours(),
        start.getUTCMinutes(),
        start.getUTCSeconds()
      );
    }

    var rem = end.getTime() - anniversary;
    var days = Math.floor(rem / 86400000);
    rem -= days * 86400000;
    var hours = Math.floor(rem / 3600000);
    rem -= hours * 3600000;
    var minutes = Math.floor(rem / 60000);
    rem -= minutes * 60000;
    var seconds = Math.floor(rem / 1000);

    return { years: years, days: days, hours: hours, minutes: minutes, seconds: seconds };
  }

  function tickClock() {
    var el = document.getElementById("clock");
    if (!el) return;
    var t = sinceLaunch(Date.now());
    el.textContent =
      t.years + " years, " +
      t.days + " days, " +
      pad(t.hours) + " hours, " +
      pad(t.minutes) + " minutes, " +
      pad(t.seconds) + " seconds";
  }

  function initMeme() {
    var input = document.getElementById("meme-input");
    var copyBtn = document.getElementById("meme-copy");
    var status = document.getElementById("meme-status");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", function () {
      var x = (input && input.value.trim()) || "isgta7out.github.io";
      var text = "We got " + x + " before GTA 7";
      function done() {
        if (status) status.textContent = "Copied.";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        done();
      }
    });
  }

  function initViews() {
    var el = document.getElementById("views-count");
    if (!el) return;
    var key = "isgta7out_github_io_views";
    var seen = false;
    try {
      seen = sessionStorage.getItem("gta7-viewed") === "1";
    } catch (e) {}
    fetch("https://countapi.mileshilliard.com/api/v1/" + (seen ? "get" : "hit") + "/" + key)
      .then(function (res) {
        if (!res.ok) throw new Error("views");
        return res.json();
      })
      .then(function (data) {
        var n = Number(data.value);
        if (!isFinite(n)) throw new Error("views");
        try {
          sessionStorage.setItem("gta7-viewed", "1");
        } catch (e) {}
        el.textContent = n.toLocaleString("en-US");
      })
      .catch(function () {
        el.textContent = "...";
      });
  }

  tickClock();
  setInterval(tickClock, 1000);
  initMeme();
  initViews();
})();
