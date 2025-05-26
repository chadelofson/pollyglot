import express, { Request, Response } from "express";
import {getTranslation} from "../../models/translate.model";

export async function httpGetTranslation(req: Request, res: Response) {
  const { sentence, language } = req.body
  console.log(req.body)
  if (typeof sentence !== "string" || typeof language !== "string") {
    res.status(400).json({ error: "Invalid input" })
    return
  }

  const translation = await getTranslation(sentence, language)

  res.status(200).json({ translation })
}