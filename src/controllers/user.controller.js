import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import slugifyImageName from '../utils/slugifyImageName.js';

const registerUser = asyncHandler(async (req, res) => {
  // get user info from request
  // validation - for empty fields
  // check if user exists - by unique fields like email/username
  // check for images - if required avatar is missing
  // upload the image file to cloudinary, get image url
  // create a user object - to create an entity in db
  // check for user creation operation response
  // remove password and refresh token from response
  // return response

  const { username, email, fullName, password } = req.body;
  const normalizedUsername = username?.toLowerCase();
  if (
    [username, email, fullName, password].some((field) => field?.trim() === '')
  ) {
    throw new ApiError(400, 'All fields are required');
  }
  // add new check for valid email with regex and move on to next

  // check if user exists
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, 'User already exists');
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar file is required');
  }

  const avatarResponse = await uploadOnCloudinary(
    avatarLocalPath,
    slugifyImageName(req.files?.avatar[0]?.originalname)
  );
  const coverImageResponse = await uploadOnCloudinary(
    coverImageLocalPath,
    slugifyImageName(req.files?.coverImage[0]?.originalname)
  );

  if (!avatarResponse) {
    throw new ApiError(400, 'Avatar file is required');
  }

  const user = await User.create({
    username: normalizedUsername,
    email,
    password,
    fullName,
    avatar: avatarResponse?.url,
    coverImage: coverImageResponse?.url || '',
  });

  const createdUser = await User.findById(user?._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(501, 'Something went wrong while registering the user');
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, 'User Registered Successfully'));
});

export { registerUser };
