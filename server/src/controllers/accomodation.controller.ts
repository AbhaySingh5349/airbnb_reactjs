import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import download from 'image-downloader';
import path from 'path';
import { renameSync, readFileSync } from 'fs';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import mime from 'mime-types';

import { catchAsync } from '../middlewares/index';
import { SystemImageFile, CustomRequest } from '../types';
import { Accomodation } from '../models';
import { s3_obj } from '../config/env';

const uploadPhotoByLink = catchAsync(async (req: Request, res: Response) => {
  const { link } = req.body;
  const file_name = 'photo' + Date.now() + '.jpg';
  const options = {
    url: link,
    // dest: path.join(__dirname, '..', '..', '/images') + `/${file_name}`, // will be saved to /path/to/dest/photo.jpg
    dest: path.join(__dirname, '..', '..', '/temp_images') + `/${file_name}`,
  };

  try {
    await download.image(options);
    // return res.status(StatusCodes.CREATED).json({ file_name });

    const dest =
      path.join(__dirname, '..', '..', '/temp_images') + `/${file_name}`;

    const url = await uploadToS3(dest, file_name, mime.lookup(dest) as string);
    return res.status(StatusCodes.CREATED).json({ file_name: url });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `error in uploading file: ${err}`,
    });
  }
});

const uploadPhotoFromSystem = catchAsync(
  async (req: Request, res: Response) => {
    const uploaded_files = [] as string[];
    const files = (req?.files as SystemImageFile[]) ?? [];
    console.log('upload from system: ', files);

    for (let i = 0; i < files.length; i++) {
      /*
      const { path, filename, originalname } = files[i];
      const extension = originalname.split('.')[1];

      const new_file_path = path + '.' + extension;
      renameSync(path, new_file_path);
      uploaded_files.push(filename + '.' + extension);
      */

      const { path, originalname, mimetype } = files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploaded_files.push(url ?? '');
    }

    return res.json(uploaded_files);
  }
);

/*
aws_s3_data:  {
  '$metadata': {
    httpStatusCode: 200,
    requestId: 'DJ51EA8PCYGGCFEB',
    extendedRequestId: 'qx87U6Dvag/gFRqP05bEh9+bHe7IximgpqjnLCkv3GhFf16FGGhEzlQkSiM6sDF3ule6DhyEQEY=',
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  ETag: '"b9bf3a7a8af61c90a7fcfca962edeb29"',
  ServerSideEncryption: 'AES256'
}
*/

const uploadToS3 = async (
  temporary_filepath: string,
  originalname: string,
  mimetype: string
) => {
  const client = new S3Client({
    region: 'ap-southeast-2',
    credentials: {
      accessKeyId: s3_obj.accessKey!,
      secretAccessKey: s3_obj.secretAccessKey!,
    },
  });

  const extension = originalname.split('.')[1];
  const new_file_name = Date.now() + '.' + extension;

  console.log(
    'INSIDE uploadToS3: ',
    temporary_filepath,
    ' , new_file_name: ',
    new_file_name,
    ' , mimetype: ',
    mimetype
  );

  try {
    const aws_s3_data = await client.send(
      new PutObjectCommand({
        Bucket: s3_obj.S3_BUCKET!,
        Body: readFileSync(temporary_filepath),
        Key: new_file_name,
        ContentType: mimetype,
        ACL: 'public-read',
      })
    );

    console.log('aws_s3_data: ', aws_s3_data);
    return `https://${s3_obj.S3_BUCKET!}.s3.amazonaws.com/${new_file_name}`;
  } catch (err) {
    console.log(`ERROR in uploading to s3: ${err}`);
    throw new Error(`ERROR in uploading to s3: ${err}`);
  }
};

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

const getAccomodationById = catchAsync(async (req: Request, res: Response) => {
  const accomodationId = req.params?.accomodationId;
  const accomodation = await Accomodation.findById(accomodationId);

  return res.json({ accomodation });
});

export {
  uploadPhotoByLink,
  uploadPhotoFromSystem,
  addNewAccomodation,
  updateAccomodation,
  getMyAccomodations,
  getAccomodationById,
};
