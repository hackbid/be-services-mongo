"use strict";

const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

const getCollection = (collectionName) => {
  return getDb().collection(collectionName);
};

module.exports = {
  getItemImages: async (req, res, next) => {
    try {
      const { id } = req.params;
      const collection = getCollection("itemImages");
      const result = await collection.findOne({ _id: new ObjectId(id) });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  postImage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { images } = req.body;
      const collection = getCollection("itemImages");
      images.forEach(async (image) => {
        return await collection.updateOne(
          { _id: new ObjectId(id) },
          { $push: { images: image } }
        );
      });
      res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
      next(error);
    }
  },

  getItemHistory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const collection = getCollection("itemHistories");
      const result = await collection.findOne({ _id: new ObjectId(id) });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  postChat: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, chatValue, isSeller } = req.body;
      const collection = getCollection("itemHistories");
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            chatHistories: {
              username,
              chatValue,
              isSeller,
              date: new Date(),
            },
          },
        }
      );
      res.status(200).json({ message: "Chat added successfully" });
    } catch (error) {
      next(error);
    }
  },
  postBid: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { UserId, username, bidValue } = req.body;
      const collection = getCollection("itemHistories");
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            bidHistories: {
              UserId,
              username,
              bidValue,
              date: new Date(),
            },
          },
        }
      );
      res.status(200).json({ message: "Bid added successfully" });
    } catch (error) {
      next(error);
    }
  },
  getReporting: async (req, res, next) => {
    try {
      const collection = getCollection("reports");
      const result = await collection.find().toArray();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  postReporting: async (req, res, next) => {
    try {
      const { UserId, username, itemId, itemName, reason } = req.body;
      const collection = getCollection("reports");
      const result = await collection.insertOne({
        UserId,
        username,
        itemId,
        itemName,
        reason,
        date: new Date(),
      });
      res.status(200).json({ message: "Report added successfully" });
    } catch (error) {
      next(error);
    }
  },
  deleteReporting: async (req, res, next) => {
    try {
      const { id } = req.params;
      const collection = getCollection("reports");
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount == 0) throw { name: "NotFound" };
      res.status(200).json({ message: "delete Successfully" });
    } catch (error) {
      next(error);
    }
  },
};
