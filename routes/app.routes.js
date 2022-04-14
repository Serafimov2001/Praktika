const { Router } = require("express");
const User = require("../models/User");
const axios = require("axios");
const router = Router();
const { apiKey } = require("../config/keys");
router.post("/main", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const resAPI = await axios.get(
      `https://api.rawg.io/api/games?${req.body.params}&page_size=21&page=${req.body.count}&key=eba7b94026164b889f425dfbf7263079`
    );
    res
      .status(200)
      .json({ data: resAPI.data.results, count: user.gameList.length });
  } catch (e) {
    res.status(400).json({ message: "!!!" });
  }
});

router.post("/search", async (req, res) => {
  let urlDefault = `https://api.rawg.io/api/games?page_size=21&page=${req.body.count}&search=${req.body.params}&key=eba7b94026164b889f425dfbf7263079`;

  try {
    const resAPI = await axios.get(urlDefault);
    res.status(200).json(resAPI.data.results);
  } catch (e) {
    res.status(400).json({ message: "!!!" });
  }
});
router.post("/game/:name", async (req, res) => {
  let urlDefault = `https://api.rawg.io/api/games/${req.body.id}?key=eba7b94026164b889f425dfbf7263079`;
  try {
    const resAPI = await axios.get(urlDefault);

    res.status(200).json(resAPI.data);
  } catch (e) {
    res.status(400).json({ message: "!!!" });
  }
});
router.post("/add", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (req.body.type === "add") {
    if (user.gameList.length !== 0) {
      let findeGame = user.gameList.find((i) => i.id === req.body.data.id);
      if (findeGame === undefined) {
        user.gameList.push(req.body.data);
        res
          .status(200)
          .json({ message: "Игра добавлена", count: user.gameList.length });
      } else {
        res.status(200).json({
          message: "Игра уже есть в списке",
          count: user.gameList.length,
        });
      }
    } else {
      user.gameList.push(req.body.data);
      res
        .status(200)
        .json({ message: "Игра добавлена", count: user.gameList.length });
    }
  } else if (req.body.type === "del") {
    newList = user.gameList.filter((i) => i.id !== req.body.data.id);
    user.gameList = newList;
    res
      .status(200)
      .json({ message: "Игра удалена", count: user.gameList.length });
  }
  await user.save();
});
router.post("/get-list", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (req.body.geners === "") {
    res.status(200).json(user.gameList);
  } else {
    sortArry = user.gameList.filter((e) => {
      let a = e.genres.filter((e) => {
        if (e.slug === req.body.geners) return true;
      });
      if (a.length !== 0) return true;
    });
    res.status(200).json(sortArry);
  }
});
module.exports = router;
