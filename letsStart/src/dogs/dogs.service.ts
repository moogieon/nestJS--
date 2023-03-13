import { Request, Response } from "express";
import { Dog } from "./dogs.model";

export const readAlldog = (req: Request, res: Response) => {
  try {
    const dogs = Dog;
    res.status(200).send({
      success: true,
      data: {
        dogs,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

export const readdog = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const creatDog = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
