import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import download from 'image-downloader';
import path from 'path';
import { renameSync } from 'fs';

import { catchAsync } from '../middlewares/index';
import { SystemImageFile, CustomRequest } from '../types';
import { Accomodation } from '../models';

const uploadPhotoByLink = catchAsync(async (req: Request, res: Response) => {
  const { link } = req.body;
  const file_name = 'photo' + Date.now() + '.jpg';
  const options = {
    url: link,
    dest: path.join(__dirname, '..', '..', '/images') + `/${file_name}`, // will be saved to /path/to/dest/photo.jpg
  };

  try {
    await download.image(options);
    return res.status(StatusCodes.CREATED).json({ file_name });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `error in uploading file: ${err}`,
    });
  }
});

const uploadPhotoFromSystem = catchAsync(
  async (req: Request, res: Response) => {
    const uploaded_files = [];
    const files = (req?.files as SystemImageFile[]) ?? [];
    console.log('upload from system: ', files);

    for (let i = 0; i < files.length; i++) {
      const { path, filename, originalname } = files[i];
      const extension = originalname.split('.')[1];

      const new_file_path = path + '.' + extension;
      renameSync(path, new_file_path);
      uploaded_files.push(filename + '.' + extension);
    }

    return res.json(uploaded_files);
  }
);

const addNewAccomodation = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const {
      title,
      address,
      photos,
      description,
      has_wifi,
      has_tv,
      has_breakfast_included,
      has_terrace_club,
      has_pets_allowed,
      has_free_parking,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const amenities = [
      { name: 'has_wifi', is_available: has_wifi },
      { name: 'has_tv', is_available: has_tv },
      { name: 'has_breakfast_included', is_available: has_breakfast_included },
      { name: 'has_terrace_club', is_available: has_terrace_club },
      { name: 'has_pets_allowed', is_available: has_pets_allowed },
      { name: 'has_free_parking', is_available: has_free_parking },
    ];

    const accomodation = await Accomodation.create({
      owner: req.currentUser?._id,
      title,
      address,
      photos,
      description,
      amenities,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ accomodation, msg: 'new accomodation created' });
  }
);

const updateAccomodation = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const {
      accomodationId,
      title,
      address,
      photos,
      description,
      has_wifi,
      has_tv,
      has_breakfast_included,
      has_terrace_club,
      has_pets_allowed,
      has_free_parking,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const amenities = [
      { name: 'has_wifi', is_available: has_wifi },
      { name: 'has_tv', is_available: has_tv },
      { name: 'has_breakfast_included', is_available: has_breakfast_included },
      { name: 'has_terrace_club', is_available: has_terrace_club },
      { name: 'has_pets_allowed', is_available: has_pets_allowed },
      { name: 'has_free_parking', is_available: has_free_parking },
    ];

    const accomodation = await Accomodation.findByIdAndUpdate(accomodationId, {
      owner: req.currentUser?._id,
      title,
      address,
      photos,
      description,
      amenities,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    return res
      .status(StatusCodes.OK)
      .json({ accomodation, msg: 'accomodation data updated' });
  }
);

const getMyAccomodations = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const userId = req.currentUser?._id;
    const accomodations = await Accomodation.find({ owner: userId });
    // console.log('accomodations: ', accomodations);

    return res.json({ accomodations });
  }
);

const getAccomodationById = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const accomodationId = req.params?.accomodationId;
    const accomodation = await Accomodation.findById(accomodationId);

    return res.json({ accomodation });
  }
);

export {
  uploadPhotoByLink,
  uploadPhotoFromSystem,
  addNewAccomodation,
  updateAccomodation,
  getMyAccomodations,
  getAccomodationById,
};
